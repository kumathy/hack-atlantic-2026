import os
import smtplib
from email.message import EmailMessage
from urllib import response
from urllib.parse import quote
from dotenv import load_dotenv

load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_EMAIL = os.getenv("SMTP_EMAIL")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

def send_confirmation_email(recipient):
    message = EmailMessage()

    message["Subject"] = "You're subscribed to Bridge Incident Alerts"
    message["From"] = SMTP_EMAIL
    message["To"] = recipient

    # Plain-text version
    message.set_content(f"""
You're subscribed!

You will receive an email when a truck impact
is detected on the bridge.

Thank you for subscribing to Bridge Incident Alerts.

Unsubscribe:
http://127.0.0.1:5000/api/unsubscribe?email={quote(recipient)}
""")

    # HTML version
    unsubscribe_url = (
        f"http://127.0.0.1:5000/api/unsubscribe"
        f"?email={quote(recipient)}"
    )

    html = f"""
    <html>
        <body>
            <p>You're subscribed!</p>

            <p>
                You will receive an email when a truck impact
                is detected on the bridge.
            </p>

            <p>
                Thank you for subscribing to Bridge Incident Alerts.
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
        print("SMTP response:", response)
        print(f"Email sent successfully to {recipient}")