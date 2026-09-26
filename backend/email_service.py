import os
import smtplib
from email.message import EmailMessage
from urllib import response
from dotenv import load_dotenv

load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_EMAIL = os.getenv("SMTP_EMAIL")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

def send_confirmation_email(recipient):
    message = EmailMessage()

    message["Subject"] = "Bridge Incident Alerts — Subscription Confirmed"
    message["From"] = SMTP_EMAIL
    message["To"] = recipient

    message.set_content("""
Hello,

Your email has been successfully subscribed to Bridge Incident Alerts.

We'll notify you if our bridge monitoring system detects a critical truck impact.

You can unsubscribe at any time.

— Bridge Monitoring Team
""")

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_EMAIL, SMTP_PASSWORD)
        server.send_message(message)
        print("SMTP response:", response)
        print(f"Email sent successfully to {recipient}")