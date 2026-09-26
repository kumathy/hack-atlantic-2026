import sqlite3
from pathlib import Path

DATABASE = Path(__file__).with_name("profiles.db")

def get_connection():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection

def init_db():
    with get_connection() as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS profiles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                image TEXT,
                date TEXT NOT NULL DEFAULT (datetime('now')),
                send_sub BOOLEAN NOT NULL DEFAULT 0
            )
        """)

def add_profile(name, email, image=None, date=None, send_sub=False):
    with get_connection() as connection:
        cursor = connection.execute(
            """
            INSERT INTO profiles
                (name, email, image, date, send_sub)
            VALUES
                (?, ?, ?, COALESCE(?, datetime('now')), ?)
            """,
            (name, email, image, date, send_sub),
        )

        return cursor.lastrowid

def get_profile_by_email(email):
    with get_connection() as connection:
        row = connection.execute(
            """
            SELECT *
            FROM profiles
            WHERE email = ?
            """,
            (email,),
        ).fetchone()

        return dict(row) if row else None

def subscribe_email(email):
    with get_connection() as connection:
        existing = connection.execute(
            """
            SELECT id
            FROM profiles
            WHERE email = ?
            """,
            (email,),
        ).fetchone()

        if existing:
            connection.execute(
                """
                UPDATE profiles
                SET send_sub = 1
                WHERE email = ?
                """,
                (email,),
            )

            return existing["id"]

        cursor = connection.execute(
            """
            INSERT INTO profiles
                (name, email, image, send_sub)
            VALUES
                (?, ?, ?, ?)
            """,
            ("Anonymous", email, None, 1),
        )

        return cursor.lastrowid

def unsubscribe_email(email):
    with get_connection() as connection:
        connection.execute(
            """
            DELETE FROM profiles
            WHERE email = ?
            """,
            (email,),
        )

def get_subscribed_profiles():
    with get_connection() as connection:
        rows = connection.execute(
            """
            SELECT *
            FROM profiles
            WHERE send_sub = 1
            ORDER BY date DESC
            """
        ).fetchall()
        return [dict(row) for row in rows]