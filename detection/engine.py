from agent.sql.data import get_events
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent / "SentinelAI.db"

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