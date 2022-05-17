from fastapi import FastAPI
from app.v1.endpoints.todo import router as todoRouter

app = FastAPI()

app.include_router(todoRouter, tags=["todo"], prefix="/todo")

@app.get("/", tags=["root"])
async def read_root():
    """Test endpoint."""
    return {"message": "All good pal"}

