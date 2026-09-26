# SQLite storage for named user profiles.

import sqlite3
from pathlib import Path

DATABASE = Path(__file__).with_name("profiles.db")

def get_connection():
    # Return a row-enabled connection to the profiles database.
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection

def init_db():
    # Create the profiles table if it does not already exist.
    with get_connection() as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS profiles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                image TEXT,
                date TEXT NOT NULL DEFAULT (datetime('now'))
            )
        """)

def add_profile(name, email, image=None, date=None):
    # Save a profile and return its new ID. Date defaults to UTC now.
    with get_connection() as connection:
        cursor = connection.execute(
            "INSERT INTO profiles (name, email, image, date) VALUES (?, ?, ?, COALESCE(?, datetime('now')))",
            (name, email, image, date),
        )
        return cursor.lastrowid
