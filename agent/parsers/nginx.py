from parsers.base import NGINX_ACCESS_LOG, NginxLogParse


def read_nginx_logs(file_path: str = NGINX_ACCESS_LOG):
    parser = NginxLogParse()
    with open(file_path, encoding="utf-8") as f:
        for line in f:
            if event := parser.parse(line):
                print(event)


read_nginx_logs()