from parsers.base import AuthLogParse
from collectors.loader import load_config
from collectors.linux import read_log_file
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
                print(event)
                print(" AUTH LOG ".center(40, "="))
                print("\n")
        else :
            time.sleep(0.2)