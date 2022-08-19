from typing import Any, Dict, List, Union
from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder
from app.core.models.todo import Todo
from app.core.schemas.todo import TodoIn, TodoOut, TodoDel, TodoPatch

todos = [Todo("plant tree"), Todo("sleep")]

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
async def deleteTodo(todo_del: TodoDel):
    for todo in todos:
        if (todo.uid == todo_del.uid):
            deleted_todo = todos.pop(todos.index(todo))
    return TodoOut(**deleted_todo.as_dict())

@router.patch("/", status_code=200, response_model=TodoOut, response_description="todo updated")
async def updateTodo(todo_patch: TodoPatch):
    for todo in todos:
        if (todo.uid == todo_patch.uid):
            if (todo_patch.text == ""):
                todo.done = todo_patch.done
            else:
                todo.text = todo_patch.text
    return TodoOut(**todo.as_dict())

