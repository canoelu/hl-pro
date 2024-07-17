from server.core.crud import CRUDBase
from server.models.system import Api
from server.schemas.apis import ApiCreate, ApiUpdate


class ApiController(CRUDBase[Api, ApiCreate, ApiUpdate]):
    def __init__(self):
        super().__init__(model=Api)


api_controller = ApiController()
