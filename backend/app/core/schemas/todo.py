from typing import Union
from pydantic import BaseModel
from datetime import datetime

class TodoBase(BaseModel):
    text: str 

class TodoDel(BaseModel):
    uid: str 

class TodoIn (TodoBase):
    pass

class TodoPatch (TodoBase):
    done: Union[bool, None]
    uid: str

class TodoDB (TodoBase):
    created_at: datetime
    done: bool

class TodoOut (TodoBase):
    created_at: datetime
    done: bool
    uid: str