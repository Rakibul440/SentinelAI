from engine import DetectionEngine
from rules.ssh_bruteforce import SSHBruteForceRule

def main():
    rules = [
        SSHBruteForceRule()
    ]

    engine = DetectionEngine(rules)

    detections = engine.run()

    for detection in detections :
        print(detection)


if __name__ == "__main__":
    main()