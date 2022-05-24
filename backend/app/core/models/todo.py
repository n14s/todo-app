from dataclasses import asdict
from datetime import datetime
import cuid

class Todo:
    def __init__(self, text):
        self.uid = cuid.cuid()
        self.created_at = datetime.now()
        self.done = False
        self.text = text

    def as_dict(self):
        return {"uid": self.uid, "created_at": self.created_at, "done": self.done, "text": self.text}