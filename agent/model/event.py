from dataclasses import dataclass,field
from typing import Optional

@dataclass
class Event :
    timestamp : str
    source : str
    event_type : str

    username : Optional[str] = None
    source_ip : Optional[str] = None
    port : Optional[int] = None

    message : str = ""
    metadata : dict = field(default_factory=dict)

    def __str__(self):
        return (
            f"Event: {self.event_type}\n"
            f"Time: {self.timestamp}\n"
            f"Source: {self.source}\n"
            f"User: {self.username}\n"
            f"IP: {self.source_ip}\n"
            f"Port: {self.port}\n"
            f"Message: {self.message}"
        )