from data_taken import get_todays_critical_vibrations
from profiles_database import get_subscribed_profiles
from email_service import send_impact_alert_email

from profiles_database import get_subscribed_profiles
from email_service import send_impact_alert_email


def send_impact_alert(impact_time):
    print("📧 Starting notification service...")

    subscribers = get_subscribed_profiles()

    print(f"Subscribers found: {len(subscribers)}")

    if not subscribers:
        print("No subscribed users.")
        return

    for profile in subscribers:
        email = profile["email"]

        print(f"📨 Sending alert to: {email}")

        try:
            send_impact_alert_email(
                recipient=email,
                impact_time=impact_time
            )

            print(f"[X] Alert sent to {email}")

        except Exception as e:
            print(f"❌ Failed to send alert to {email}: {repr(e)}")