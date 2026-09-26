from flask import Flask, jsonify, request
from flask_cors import CORS
from supabase_client import supabase
from email_service import send_confirmation_email

from data_taken import (
    init_db,
    save_critical_vibration,
    get_critical_vibrations
)

app = Flask(__name__)
CORS(app)

init_db()

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
            "message": "Holy Sheet!!! It's coming!",
            "status": bridge["status"]
        }), 200

    save_critical_vibration(
        event_id=bridge["id"],
        status=bridge["status"],
        impact_time=bridge["impact_time"],
        acknowledged=bridge["acknowledged"]
    )

    return jsonify({
        "success": True,
        "message": "Critical vibration saved to SQLite",
        "data": bridge
    })

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
    data = request.get_json()

    email = data.get("email", "").strip()

    if not email:
        return jsonify({
            "success": False,
            "message": "Email is required"
        }), 400

    try:
        send_confirmation_email(email)

        return jsonify({
            "success": True,
            "status": "subscribed"
        }), 200

    except Exception as e:
        print("Email error:", e)

        return jsonify({
            "success": False,
            "message": "Failed to send confirmation email"
        }), 500

if __name__ == "__main__":
    app.run(debug=True)