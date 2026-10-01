/*
 * Bridge Impact Monitoring System
 * --------------------------------
 * Team: Thorpe Watch
 * Hackathon Project
 *
 * Hardware:
 * - ESP32
 * - KY-031 Shock Sensor
 *
 * Description:
 * Detects significant vibration events that simulate a
 * bridge impact incident. When an impact is detected,
 * the ESP32 reports the event to Supabase and waits
 * for acknowledgment from the web dashboard.
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <time.h>

// ==================================================
// HARDWARE CONFIGURATION
// ==================================================

constexpr uint8_t VIBRATION_PIN = 22;
constexpr bool VIBRATION_ACTIVE_STATE = LOW;

// ==================================================
// DETECTION SETTINGS
// ==================================================

constexpr unsigned long DETECTION_WINDOW_MS = 300;
constexpr int IMPACT_THRESHOLD = 1;
constexpr unsigned long ACK_CHECK_INTERVAL_MS = 3000;

// ==================================================
// WIFI CONFIGURATION
// ==================================================

const char* WIFI_SSID = "SO4";
const char* WIFI_PASSWORD = "p1234567";

// ==================================================
// SUPABASE CONFIGURATION
// ==================================================

const char* SUPABASE_URL =
    "https://ydmqylyzeqyoywbwkbvh.supabase.co";

const char* SUPABASE_KEY =
    "sb_publishable_AIaFnnXHIMxaCn_ayUd2yQ_3mbgv53E";

// ==================================================
// SYSTEM STATE
// ==================================================

struct SystemState {
    int pulseCount = 0;
    bool previousSensorState = false;
    bool waitingForAcknowledgement = false;

    unsigned long windowStart = 0;
    unsigned long lastAckCheck = 0;
};

SystemState systemState;

// ==================================================
// LOGGING
// ==================================================

void logInfo(const String& message) {
    Serial.print("[INFO] ");
    Serial.println(message);
}

void logWarning(const String& message) {
    Serial.print("[WARNING] ");
    Serial.println(message);
}

void logError(const String& message) {
    Serial.print("[ERROR] ");
    Serial.println(message);
}

// ==================================================
// WIFI
// ==================================================

void connectWiFi() {

    if (WiFi.status() == WL_CONNECTED) {
        return;
    }

    Serial.print("Connecting to WiFi");

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    int retryCount = 0;

    while (WiFi.status() != WL_CONNECTED &&
           retryCount < 30) {

        delay(500);
        Serial.print(".");
        retryCount++;
    }

    Serial.println();

    if (WiFi.status() == WL_CONNECTED) {
        logInfo("WiFi connected successfully.");
    } else {
        logError("Failed to connect to WiFi.");
    }
}

// ==================================================
// TIME
// ==================================================

String getTimestamp() {

    struct tm timeInfo;

    if (getLocalTime(&timeInfo)) {

        char buffer[40];

        strftime(
            buffer,
            sizeof(buffer),
            "%Y-%m-%dT%H:%M:%SZ",
            &timeInfo
        );

        return String(buffer);
    }

    return "unknown";
}

// ==================================================
// SENSOR
// ==================================================

bool isVibrationDetected() {
    return digitalRead(VIBRATION_PIN)
           == VIBRATION_ACTIVE_STATE;
}

void resetMonitoringState() {

    systemState.pulseCount = 0;
    systemState.previousSensorState = false;
    systemState.windowStart = millis();
}

// ==================================================
// SUPABASE - SEND IMPACT
// ==================================================

bool sendImpact() {

    connectWiFi();

    if (WiFi.status() != WL_CONNECTED) {
        return false;
    }

    HTTPClient http;

    String url =
        String(SUPABASE_URL) +
        "/rest/v1/bridge_status?id=eq.1";

    http.begin(url);

    http.addHeader(
        "Content-Type",
        "application/json"
    );

    http.addHeader(
        "apikey",
        SUPABASE_KEY
    );

    http.addHeader(
        "Authorization",
        "Bearer " + String(SUPABASE_KEY)
    );

    String body =
        "{\"status\":\"IMPACT_DETECTED\","
        "\"impact_time\":\"" +
        getTimestamp() +
        "\","
        "\"acknowledged\":false}";

    logWarning("Uploading impact report...");

    int httpCode = http.PATCH(body);

    Serial.print("HTTP Status: ");
    Serial.println(httpCode);

    http.end();

    if (httpCode >= 200 &&
        httpCode < 300) {

        logInfo("Impact uploaded successfully.");
        return true;
    }

    logError("Impact upload failed.");
    return false;
}

// ==================================================
// SUPABASE - CHECK ACK
// ==================================================

bool checkAcknowledgement() {

    connectWiFi();

    if (WiFi.status() != WL_CONNECTED) {
        return false;
    }

    HTTPClient http;

    String url =
        String(SUPABASE_URL) +
        "/rest/v1/bridge_status?id=eq.1&select=acknowledged";

    http.begin(url);

    http.addHeader(
        "apikey",
        SUPABASE_KEY
    );

    http.addHeader(
        "Authorization",
        "Bearer " + String(SUPABASE_KEY)
    );

    int httpCode = http.GET();

    String response =
        http.getString();

    Serial.print("ACK HTTP: ");
    Serial.println(httpCode);

    Serial.print("Response: ");
    Serial.println(response);

    http.end();

    return httpCode == 200 &&
           response.indexOf(
               "\"acknowledged\":true"
           ) >= 0;
}

// ==================================================
// SUPABASE - CLEAR EVENT
// ==================================================

void clearImpactStatus() {

    connectWiFi();

    if (WiFi.status() != WL_CONNECTED) {
        return;
    }

    HTTPClient http;

    String url =
        String(SUPABASE_URL) +
        "/rest/v1/bridge_status?id=eq.1";

    http.begin(url);

    http.addHeader(
        "Content-Type",
        "application/json"
    );

    http.addHeader(
        "apikey",
        SUPABASE_KEY
    );

    http.addHeader(
        "Authorization",
        "Bearer " + String(SUPABASE_KEY)
    );

    int httpCode = http.PATCH(
        "{\"status\":\"NO_IMPACT\",\"acknowledged\":true}"
    );

    Serial.print("CLEAR HTTP: ");
    Serial.println(httpCode);

    http.end();
}

// ==================================================
// IMPACT DETECTION
// ==================================================

void processImpactDetection() {

    bool vibrationDetected =
        isVibrationDetected();

    if (vibrationDetected &&
        !systemState.previousSensorState) {

        systemState.pulseCount++;

        Serial.print("Vibration Pulse: ");
        Serial.println(
            systemState.pulseCount
        );
    }

    systemState.previousSensorState =
        vibrationDetected;

    if (
        millis() -
        systemState.windowStart <
        DETECTION_WINDOW_MS
    ) {
        return;
    }

    Serial.print("Pulses in Window: ");
    Serial.println(
        systemState.pulseCount
    );

    if (
        systemState.pulseCount >=
        IMPACT_THRESHOLD
    ) {

        logWarning(
            "Bridge impact detected."
        );

        if (
            !systemState
                 .waitingForAcknowledgement
        ) {

            if (sendImpact()) {

                systemState
                    .waitingForAcknowledgement =
                    true;

                systemState.lastAckCheck =
                    millis();

                logInfo(
                    "Waiting for dashboard acknowledgement."
                );
            }

        } else {

            logWarning(
                "Previous impact event still awaiting acknowledgement."
            );
        }
    }

    systemState.pulseCount = 0;
    systemState.windowStart =
        millis();
}

// ==================================================
// ACKNOWLEDGEMENT HANDLER
// ==================================================

void processAcknowledgement() {

    if (
        !systemState
             .waitingForAcknowledgement
    ) {
        return;
    }

    if (
        millis() -
        systemState.lastAckCheck <
        ACK_CHECK_INTERVAL_MS
    ) {
        return;
    }

    systemState.lastAckCheck =
        millis();

    logInfo(
        "Checking for acknowledgement..."
    );

    if (checkAcknowledgement()) {

        logInfo(
            "Acknowledgement received."
        );

        systemState
            .waitingForAcknowledgement =
            false;

        resetMonitoringState();

        clearImpactStatus();

        logInfo(
            "System ready for next event."
        );
    }
}

// ==================================================
// SETUP
// ==================================================

void setup() {

    Serial.begin(115200);

    pinMode(
        VIBRATION_PIN,
        INPUT
    );

    connectWiFi();

    configTime(
        0,
        0,
        "pool.ntp.org",
        "time.nist.gov"
    );

    delay(2000);

    systemState.windowStart =
        millis();

    Serial.println();
    Serial.println("=================================");
    Serial.println(" BRIDGE IMPACT MONITORING SYSTEM ");
    Serial.println("=================================");
    Serial.println("Status: NO IMPACT");
}

// ==================================================
// MAIN LOOP
// ==================================================

void loop() {

    processAcknowledgement();

    processImpactDetection();

    delay(2);
}
