from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder
#from app.core.models.database import getTodos
from app.core.models.todo import Todo


todos = [Todo("aufräumen"), Todo("schlafen")]

router = APIRouter()

@router.get("/", response_description="todos retrieved")
async def getTodos():
    return jsonable_encoder(todos)