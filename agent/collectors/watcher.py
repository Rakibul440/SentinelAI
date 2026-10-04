<<<<<<< HEAD
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
=======
from parsers.base import AuthLogParse
from collectors.loader import load_config
from collectors.linux import read_log_file
from sql.storage import save_event
import time


AUTH_LOG_PATH = load_config()
logs = read_log_file(AUTH_LOG_PATH["logs"]["auth"])

parser = AuthLogParse()

with open(AUTH_LOG_PATH["logs"]["auth"],"r") as file:
    file.seek(0,2)

    while True :
        line = file.readline()

        if(line) :
            event = parser.parse(line)
            if event :
                print(f"RAW LOG : {line}")
                print(event)
                print(" AUTH LOG ".center(40, "="))
                print("\n")
                save_event(event)
        else :
            time.sleep(0.2)
>>>>>>> origin/feat/agent-v.0
