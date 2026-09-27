import threading
import time

from flask import Flask, jsonify, request
from flask_cors import CORS
from supabase_client import supabase
from email_service import send_confirmation_email
from notification_service import send_impact_alert
from profiles_database import (
    init_db as init_profiles_db,
    get_profile_by_email,
    subscribe_email,
    unsubscribe_email
)

from data_taken import (
    init_db as init_vibration_db,
    save_critical_vibration,
    get_critical_vibrations
)

app = Flask(__name__)
CORS(app)

init_profiles_db()
init_vibration_db()

# GET DATA FROM SUPABASE
def get_supabase_bridge_status():
    response = (
        supabase
        .table("bridge_status")
        .select("*")
        .eq("id", 1)
        .execute()
    )
    return response.data

# GET CURRENT BRIDGE STATUS
@app.route("/api/bridge-status", methods=["GET"])
def bridge_status():
    data = get_supabase_bridge_status()
    return jsonify(data)

# SAVE SUPABASE DATA INTO SQLITE
@app.route("/api/save-vibration", methods=["POST"])
def save_vibration():
    data = get_supabase_bridge_status()

    if not data:
        return jsonify({
            "success": False,
            "message": "No data found in Supabase"
        }), 404

    bridge = data[0]

    # Only store Critical Vibration events
    if bridge["status"] != "IMPACT_DETECTED":
        return jsonify({
            "success": False,
            "message": "No critical vibration detected",
            "status": bridge["status"]
        }), 200

    # 1. Save new vibration to vibration.db
    save_critical_vibration(
        event_id=bridge["id"],
        status=bridge["status"],
        impact_time=bridge["impact_time"],
        acknowledged=bridge["acknowledged"]
    )

    print("New vibration added to vibration.db")

    # 2. Send email to subscribers
    send_impact_alert(impact_time=bridge["impact_time"])

    print("Alert emails sent")

    # 3. PATCH Supabase after successful processing
    response = (
        supabase
        .table("bridge_status")
        .update({
            "status": "NO_IMPACT",
            "acknowledged": True,
            "impact_time": None
        })
        .eq("id", 1)
        .execute()
    )

    print("Supabase updated:")
    print(response.data)

    return jsonify({
        "success": True,
        "message": "Vibration saved and Supabase updated",
        "data": bridge
    }), 200
    
# GET DATA FROM SQLITE
@app.route("/api/vibrations", methods=["GET"])
def vibrations():
    data = get_critical_vibrations()
    return jsonify(data)

# RESET SUPABASE
@app.route("/api/bridge-status/reset", methods=["PATCH"])
def reset_bridge_status():
    response = (
        supabase
        .table("bridge_status")
        .update({
            "status": "NO_IMPACT",
            "acknowledged": True,
            "impact_time": None
        })
        .eq("id", 1)
        .execute()
    )

    return jsonify({
        "success": True,
        "data": response.data
    })

@app.route("/api/subscribe", methods=["POST"])
def subscribe():
    data = request.get_json(silent=True) or {}

    raw_email = data.get("email", "")
    email = raw_email.strip() if isinstance(raw_email, str) else ""

    if not email:
        return jsonify({
            "success": False,
            "message": "Email is required"
        }), 400

    try:
        existing_profile = get_profile_by_email(email)
        if existing_profile and existing_profile["send_sub"]:
            return jsonify({
                "success": True,
                "status": "already-subscribed"
            }), 200

        # Add email to profiles.db and set send_sub = 1
        subscribe_email(email)

        # Send confirmation email
        send_confirmation_email(email)

        return jsonify({
            "success": True,
            "status": "subscribed"
        }), 200

    except Exception as e:
        print("Subscribe error:", e)
        return jsonify({
            "success": False,
            "message": "Failed to subscribe"
        }), 500

@app.route("/api/unsubscribe", methods=["GET"])
def unsubscribe():
    email = request.args.get("email", "").strip()

    if not email:
        return "Email is required", 400

    try:
        unsubscribe_email(email)

        return """
        <html>
            <body>
                <h2>You have been unsubscribed.</h2>
                <p>You will no longer receive bridge incident alerts.</p>
            </body>
        </html>
        """, 200

    except Exception as e:
        print("Unsubscribe error:", e)

        return """
        <html>
            <body>
                <h2>Unsubscribe failed.</h2>
                <p>Please try again later.</p>
            </body>
        </html>
        """, 500

def monitor_bridge():
    print("Bridge monitor started.")

    while True:
        try:
            data = get_supabase_bridge_status()

            if data:
                bridge = data[0]

                if bridge["status"] == "IMPACT_DETECTED":
                    print("🚨 IMPACT DETECTED!")

                    # Save event
                    save_critical_vibration(
                        event_id=bridge["id"],
                        status=bridge["status"],
                        impact_time=bridge["impact_time"],
                        acknowledged=bridge["acknowledged"]
                    )

                    print("[X] Saved to vibration.db")

                    # Send notifications
                    send_impact_alert(
                        impact_time=bridge["impact_time"]
                    )

                    print("[X] Notifications processed")

                    # Automatically reset Supabase
                    supabase.table("bridge_status").update({
                        "status": "NO_IMPACT",
                        "acknowledged": True,
                        "impact_time": None
                    }).eq("id", 1).execute()

                    print("[X] Supabase automatically reset to NO_IMPACT")

        except Exception as e:
            print("MONITOR ERROR:", repr(e))
        time.sleep(2)

if __name__ == "__main__":
    monitor_thread = threading.Thread(
        target=monitor_bridge,
        daemon=True
    )

    monitor_thread.start()
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True,
        use_reloader=False
    )
