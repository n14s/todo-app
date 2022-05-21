from pydantic import BaseModel
from datetime import datetime

class TodoBase(BaseModel):
    text: str 

class TodoIn (TodoBase):
    pass

class TodoDB (TodoBase):
    created_at: datetime
    done: bool

class TodoOut (TodoBase):
    created_at: datetime
    done: bool
    id: str