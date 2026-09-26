import requests
from data_taken import get_critical_vibrations, init_db
API_BASE_URL = "http://127.0.0.1:5000"

def main():
    # Ensure the local table exists, then display its current contents.
    init_db()
    print("Current local vibration records:")
    for row in get_critical_vibrations():
        print(row)

    # Pull the current Supabase state into SQLite if it is a critical event.
    save_response = requests.post(f"{API_BASE_URL}/api/save-vibration", timeout=10)
    print("SAVE STATUS:", save_response.status_code)
    print("SAVE RESPONSE:", save_response.text)

    # Reset the bridge status after the save request, matching the original flow.
    reset_response = requests.patch(
        f"{API_BASE_URL}/api/bridge-status/reset", timeout=10
    )
    print("RESET STATUS:", reset_response.status_code)
    print("RESET RESPONSE:", reset_response.text)

if __name__ == "__main__":
    main()
