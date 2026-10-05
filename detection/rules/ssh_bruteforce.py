from rule import Rule

class SSHBruteForceRule(Rule):

    name = "SSH Brute Force"

    def evaluate(self, events):
        failed_attempts = {}

        for event in events :

            if event.get("event_type") != "authentication_failure":
                continue

            source_ip = event.get("source_ip")

            if not source_ip:
                continue

            failed_attempts[source_ip] = (
                failed_attempts.get(source_ip,0) + 1
            )

            detections = []

            for source_ip, count in failed_attempts.items():

                if count >= 3 : 
                    detections.append({
                        'rule' : self.name,
                        'attack_type' : 'SSH_BRUTE_FORCE',
                        'serverity' : 'HIGH',
                        'source_ip' : source_ip,
                        'failed_attempts' : count
                    })
            return detections