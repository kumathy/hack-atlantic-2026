import os
import smtplib
from email.message import EmailMessage
from urllib.parse import quote

from dotenv import load_dotenv

load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_EMAIL = os.getenv("SMTP_EMAIL")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000").rstrip("/")


def get_unsubscribe_url(recipient):
    return f"{FRONTEND_URL}/api/unsubscribe?email={quote(recipient)}"


def send_confirmation_email(recipient):
    message = EmailMessage()

    message["Subject"] = "You're subscribed to Bridge Incident Alerts"
    message["From"] = SMTP_EMAIL
    message["To"] = recipient

    unsubscribe_url = get_unsubscribe_url(recipient)

    message.set_content(f"""
You're subscribed!

You will receive an email when a critical vibration
is detected on the bridge.

Thank you for subscribing to Bridge Incident Alerts.

Unsubscribe from alerts:
{unsubscribe_url}
""")

    html = f"""
    <html>
        <body>
            <h2>You're subscribed!</h2>

            <p>
                You will receive an email when a critical
                vibration is detected on the bridge.
            </p>

            <p>
                Thank you for subscribing to
                <strong>Bridge Incident Alerts</strong>.
            </p>

            <p>
                <a href="{unsubscribe_url}">
                    Unsubscribe from alerts
                </a>
            </p>
        </body>
    </html>
    """

    message.add_alternative(html, subtype="html")

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_EMAIL, SMTP_PASSWORD)
        server.send_message(message)

    print(f"Confirmation email sent to {recipient}")


def send_impact_alert_email(recipient, impact_time):
    message = EmailMessage()

    message["Subject"] = "⚠️ Critical Bridge Impact Detected"
    message["From"] = SMTP_EMAIL
    message["To"] = recipient

    unsubscribe_url = get_unsubscribe_url(recipient)

    message.set_content(f"""
Critical Bridge Impact Detected

A critical vibration event has been detected on the bridge.

Impact time:
{impact_time}

Please check the bridge monitoring system for more information.

Unsubscribe from alerts:
{unsubscribe_url}
""")

    html = f"""
    <html>
        <body>
            <h2>⚠️ Critical Bridge Impact Detected</h2>

            <p>
                A <strong>critical vibration event</strong>
                has been detected on the bridge.
            </p>

            <p>
                <strong>Impact time:</strong><br>
                {impact_time}
            </p>

            <p>
                Please check the bridge monitoring system
                for more information.
            </p>

            <hr>

            <p style="font-size: 12px;">
                <a href="{unsubscribe_url}">
                    Unsubscribe from alerts
                </a>
            </p>
        </body>
    </html>
    """

    message.add_alternative(html, subtype="html")

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_EMAIL, SMTP_PASSWORD)
        server.send_message(message)

    print(f"Impact alert sent to {recipient}")
