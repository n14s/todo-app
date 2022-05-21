from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.v1.endpoints.todo import router as todoRouter



app = FastAPI()

origins = ["http://localhost"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(todoRouter, tags=["todo"], prefix="/todo")

@app.get("/", tags=["root"])
async def read_root():
    """Test endpoint."""
    return {"message": "All good pal"}

