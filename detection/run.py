from engine import DetectionEngine
from rules.ssh_bruteforce import SSHBruteForceRule
import time

def print_banner():
    print()
    print("╔══════════════════════════════════════════════════════╗")
    print("║              SENTINELAI DETECTION ENGINE             ║")
    print("║            Rule-Based Security Detection             ║")
    print("╚══════════════════════════════════════════════════════╝")
    print()
    time.sleep(0.2)
    print("[✓] Detection engine initialized")
    time.sleep(0.2)
    print("[✓] Rule engine loaded")
    time.sleep(0.2)
    print("[✓] Event pipeline ready")
    time.sleep(0.2)
    print()

def main():
    print_banner()
    print("[*] Fetching normalized events...")
    
    rules = [
        SSHBruteForceRule()
    ]

    engine = DetectionEngine(rules)

    detections = engine.run()

    for detection in detections :
        print(detection)

        print()
        print("=" * 60)
        print("🚨  SECURITY ALERT")
        print("=" * 60)

        print(f"  Rule          : {detection['rule']}")
        print(f"  Attack Type   : {detection['attack_type']}")
        print(f"  Severity      : {detection['severity']}")
        print(f"  Source IP     : {detection['source_ip']}")
        print(f"  Failed Attempts: {detection['failed_attempts']}")

        print(f"!!! Immediately block this IP: {detection['source_ip']}")    
        print("=" * 60)
        print("[✓] Detection cycle completed")
        print()

if __name__ == "__main__":
    main()