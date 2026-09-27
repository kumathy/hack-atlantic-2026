import sqlite3
from pathlib import Path

DATABASE = Path(__file__).with_name("vibration.db")

def get_connection():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection

def init_db():
    with get_connection() as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS critical_vibrations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                supabase_id INTEGER,
                status TEXT NOT NULL,
                impact_time TEXT,
                acknowledged BOOLEAN NOT NULL
            )
        """)

def save_critical_vibration(
    event_id,
    status,
    impact_time,
    acknowledged
):
    with get_connection() as connection:
        cursor = connection.execute(
            """
            INSERT INTO critical_vibrations
                (supabase_id, status, impact_time, acknowledged)
            VALUES
                (?, ?, ?, ?)
            """,
            (
                event_id,
                status,
                impact_time,
                acknowledged
            )
        )

        return cursor.lastrowid


def get_critical_vibrations():
    with get_connection() as connection:
        rows = connection.execute("""
            SELECT *
            FROM critical_vibrations
            ORDER BY impact_time DESC
        """).fetchall()

        return [dict(row) for row in rows]
    
def get_todays_critical_vibrations():
    with get_connection() as connection:
        rows = connection.execute("""
            SELECT *
            FROM critical_vibrations
            WHERE date(impact_time) = date('now', 'localtime')
            ORDER BY impact_time DESC
        """).fetchall()

        return [dict(row) for row in rows]