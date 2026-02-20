# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import bird_recognition
from database.db import init_db

app = FastAPI(title="Bird Recognition API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    await init_db()

app.include_router(bird_recognition.router, prefix="/api/v1", tags=["Bird Recognition"])

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model_loaded": True}