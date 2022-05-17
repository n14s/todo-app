from fastapi import APIRouter, Body
#from app.core.models.database import getTodos

router = APIRouter()

@router.get("/", response_description="todos retrieved")
async def getTodos():
    return {"message": "get Todos"}