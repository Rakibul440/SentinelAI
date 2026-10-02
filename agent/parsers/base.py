from abc import ABC,abstractmethod
from model.event import Event
from collectors.loader import load_patterns
import re
import ipaddress


AUTH_PATTERNS = 'config/auth_patterns.yaml'
patterns = load_patterns(AUTH_PATTERNS)["patterns"]

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