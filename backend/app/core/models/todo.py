from datetime import datetime
import cuid

class Todo:
    def __init__(self, text):
        self.uid = cuid.cuid()
        self.created_at = datetime.now()
        self.done = False
        self.text = text