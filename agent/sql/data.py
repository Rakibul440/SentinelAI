import sqlite3

DB_PATH = 'sql/SentinelAI.db'

def get_events(PATH):
    conn = sqlite3.connect(PATH)
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM EVENTS
        ORDER BY timestamp ASC
    """)

    events = [dict(row) for row in cursor.fetchall()]

    conn.close()

    return events

events = get_events(DB_PATH)
for event in events :
    print(event)