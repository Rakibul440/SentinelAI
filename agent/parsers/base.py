from abc import ABC,abstractmethod
from model.event import Event
from collectors.loader import load_patterns
import re
import ipaddress
from typing import Optional, Dict, Any

AUTH_PATTERNS = 'config/auth_patterns.yaml'
NGINX_ACCESS_LOG = "/var/log/nginx/access.log"

patterns = load_patterns(AUTH_PATTERNS)["patterns"]

NGINX_LOG_RE = re.compile(
    r'^(?P<source_ip>\S+) \S+ (?P<username>\S+) '
    r'\[(?P<timestamp>[^\]]+)\] '
    r'"(?P<method>\S+) (?P<request_path>\S+)(?: (?P<protocol>\S+))?" '
    r'(?P<status_code>\d{3}) (?P<bytes_sent>\d+|-)'
    r'(?: "(?P<referrer>[^"]*)" "(?P<user_agent>[^"]*)")?'
)


NGINX_PATTERNS = [
    {"pattern": "/admin", "event_type": "admin_access"},
    {"pattern": "/login", "event_type": "login_attempt"},
    {"pattern": "/api/", "event_type": "api_request"},
]
HEADER_RE = re.compile(
    r"^(?P<timestamp>\S+)\s+"
    r"(?P<source>\S+)\s+"
    r"(?P<process>[^\s\[]+)"
    r"(?:\[(?P<pid>\d+)\])?:\s*"
    r"(?P<message>.*)$"
)
def extract_ip(text):
    for match in re.finditer(r'(?<![\w:])[\da-fA-F:.]+(?![\w:])', text):
        try:
            return str(ipaddress.ip_address(match.group()))
        except ValueError:
            continue

    return None

def extract_port(text):
    match = re.search(r'\bport\s+(\d+)\b', text, re.IGNORECASE)

    if match:
        return int(match.group(1))

    return None

def extract_username(text):
    patterns = [
        r'invalid user\s+(\S+)',
        r'failed password for\s+(\S+)',
        r'accepted password for\s+(\S+)',
        r'accepted publickey for\s+(\S+)',
        r'session opened for user\s+(\S+)',
    ]

    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)

        if match:
            return match.group(1)

    return None


class BaseParser(ABC):
    @abstractmethod
    def parse(self,line : str) -> Event | None:
        pass

class AuthLogParse(BaseParser):
    def parse(self, line : str) -> Event | None:
        for rule in patterns :
            if rule["pattern"].lower() in line.lower() :

                header = HEADER_RE.match(line)
                if not header :
                    continue
                data = header.groupdict()
                message = data["message"]

                return Event(
                    timestamp=data["timestamp"],
                    source=data["source"],
                    event_type=rule["event_type"],

                    username=extract_username(message),
                    source_ip=extract_ip(message),
                    port=extract_port(message),
                    message=message,
                    metadata={}
                )
        return None



class NginxLogParse(BaseParser):
    def parse(self, line: str) -> Optional[Event]:
        if not (m := NGINX_LOG_RE.match(line)):
            return None
        d = m.groupdict()
        path, status = d["request_path"], int(d["status_code"])
        status_map = {401: "authentication_failure", 403: "forbidden_request", 404: "not_found_request"}
        event_type = status_map.get(status) or next((r["event_type"] for r in NGINX_PATTERNS if r["pattern"].lower() in path.lower()), "http_request")
        return Event(
            timestamp=d["timestamp"], source="nginx", event_type=event_type,
            username=d["username"] if d["username"] != "-" else None,
            source_ip=d["source_ip"], port=None, message=line.strip(),
            metadata={
                "method": d["method"], "request_path": path, "protocol": d.get("protocol"),
                "status_code": status, "bytes_sent": int(d["bytes_sent"]) if d["bytes_sent"] != "-" else 0,
                "user_agent": d.get("user_agent"), "referrer": d.get("referrer")
            }
        )
