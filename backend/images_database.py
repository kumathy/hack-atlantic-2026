# SQLite storage for images and their dates.

import sqlite3
from pathlib import Path

DATABASE = Path(__file__).with_name("images.db")

def get_connection():
    # Return a row-enabled connection to the images database.
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection

def init_db():
    # Create the images table if it does not already exist.
    with get_connection() as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS images (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image TEXT NOT NULL,
                date TEXT NOT NULL DEFAULT (datetime('now'))
            )
        """)

def add_image(image, date=None):
    # Save an image and return its new ID. Date defaults to UTC now.
    with get_connection() as connection:
        cursor = connection.execute(
            "INSERT INTO images (image, date) VALUES (?, COALESCE(?, datetime('now'))) ",
            (image, date),
        )
        return cursor.lastrowid
