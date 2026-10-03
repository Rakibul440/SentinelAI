import time
from collectors.loader import load_config
from parsers.base import AuthLogParse


def watch_log(path, interval=0.5):
    parser = AuthLogParse()

    with open(path, "r", encoding="utf-8", errors="replace") as log_file:
        # Skip existing entries.
        log_file.seek(0, 2)

        while True:
            position = log_file.tell()
            line = log_file.readline()

            # Wait until a complete new entry is available.
            if not line.endswith("\n"):
                log_file.seek(position)
                time.sleep(interval)
                continue

            event = parser.parse(line=line)

            if event is not None:
                print(event, flush=True)
                print(" AUTH LOG ".center(40, "="), flush=True)


if __name__ == "__main__":
    config = load_config()
    auth_log_path = config["logs"]["auth"]

    print(f"Watching: {auth_log_path}", flush=True)

    try:
        watch_log(auth_log_path)
    except KeyboardInterrupt:
        print("\nWatcher stopped.")