from .loader import load_config

config = load_config()
authLogsPath = config['logs']['auth']


def read_log_file(path):
    with open(path, "r") as file:
        return file.readlines()

logs = read_log_file(authLogsPath)

print(logs[-1])