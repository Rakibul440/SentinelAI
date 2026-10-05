from rules.rule import Rule
import time

class SSHBruteForceRule(Rule):

    name = "SSH Brute Force"

    def evaluate(self, events):

        failed_attempts = {}
        detections = []

        for event in events:

            if event.get("event_type") != "authentication_failure":
                continue

            source_ip = event.get("source_ip")

            print(f"IP : {source_ip}")

            if not source_ip:
                continue

            failed_attempts[source_ip] = (
                failed_attempts.get(source_ip, 0) + 1
            )

            time.sleep(0.2)

        for source_ip, count in failed_attempts.items():

            if count >= 3:
                detections.append({
                    "rule": self.name,
                    "attack_type": "SSH_BRUTE_FORCE",
                    "severity": "HIGH",
                    "source_ip": source_ip,
                    "failed_attempts": count
                })

        return detections