from collectors.loader import load_config
from collectors.linux import read_log_file
from parsers.base import AuthLogParse

AUTH_LOG_PATH = load_config()
logs = read_log_file(AUTH_LOG_PATH["logs"]["auth"])

print(f"AUTH_LOG_PATH :\n{AUTH_LOG_PATH["logs"]["auth"]}")


parser = AuthLogParse()

for log in logs[-20:-1]:
    event = parser.parse(line=log)
    print(event)
    print(" AUTH LOG ".center(40, "="))
    print("\n")
