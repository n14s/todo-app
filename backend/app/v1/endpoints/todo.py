from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder
#from app.core.models.database import getTodos
from app.core.models.todo import Todo
from app.core.schemas.todo import TodoIn, TodoOut



todos = [Todo("aufräumen"), Todo("schlafen")]

router = APIRouter()

@router.get("/", response_description="todos retrieved")
async def getTodos():
    return jsonable_encoder(todos)

@router.post("/", status_code=201, response_model=TodoOut, response_description="todo posted")
async def postTodo(todo_in: TodoIn):
    new_todo = Todo(**todo_in.dict())
    todos.append(new_todo)
    return TodoOut(**new_todo.as_dict())

@router.delete("/", status_code=200, response_model=TodoOut, response_description="todo deleted")
async def deleteTodo(todo_in: TodoIn):
    pass
