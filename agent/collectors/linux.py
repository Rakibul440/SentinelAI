PATH = "/var/log/auth.log"

def read_log_file(path):
    with open(path, "r") as file:
        return file.readlines()

logs = read_log_file(PATH)

print(logs)