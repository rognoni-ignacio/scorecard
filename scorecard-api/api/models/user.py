import os
import sqlite3

# Default path for SQLite database file
DB_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "users.db"
)


class User:
    def __init__(self, id, email, password_hash, name):
        self.id = id
        self.email = email
        self.password_hash = password_hash
        self.name = name

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "password_hash": self.password_hash,
            "name": self.name,
        }


def create_users_table(db_path: str = DB_PATH) -> None:
    """Create the users table if it doesn't already exist."""
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            name TEXT NOT NULL
        )
        """
    )
    connection.commit()
    connection.close()


if __name__ == "__main__":
    create_users_table()
