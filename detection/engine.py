# from agent.sql.data import get_events
import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).resolve().parents[1] / "agent" / "sql" / "SentinelAI.db"


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


class DetectionEngine:

    def __init__(self,rules):
        self.rules = rules

    def run(self):
        events = get_events(DB_PATH)

        if not events :
            print("No events found.")
            return []
        
        detections =[]

        for rule in self.rules :
            results = rule.evalute(events)

            if results :
                detections.extend(results)
        return detections