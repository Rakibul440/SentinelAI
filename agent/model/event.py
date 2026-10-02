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