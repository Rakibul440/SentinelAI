import sqlite3
import json

DB_PATH = 'sql/SentinelAI.db'

def save_event(event):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()


    cursor.execute("""
        INSERT INTO EVENTS (
            timestamp,
            event_type,
            source,
            source_ip,
            username,
            port,
            message
        )
        VALUES (?,?,?,?,?,?,?)
    """,(
        event.timestamp,
        event.event_type,
        event.source,
        event.source_ip,
        event.username,
        event.port,
        event.message
    ))

    conn.commit()
    conn.close()




