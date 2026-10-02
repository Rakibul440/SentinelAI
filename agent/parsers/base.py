from abc import ABC,abstractmethod
from model.event import Event

class BaseClass(ABC):
    @abstractmethod
    def parse(self,line : str) -> Event | None:
        pass