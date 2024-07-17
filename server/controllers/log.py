from server.core.crud import CRUDBase
from server.models.system import Log
from server.schemas.logs import LogCreate, LogUpdate


class LogController(CRUDBase[Log, LogCreate, LogUpdate]):
    def __init__(self):
        super().__init__(model=Log)


log_controller = LogController()
