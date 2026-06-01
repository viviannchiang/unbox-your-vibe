from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import quiz, og

app = FastAPI(title="unbox your vibe API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://unbox-your-vibe.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(quiz.router)
app.include_router(og.router)


@app.get("/health")
def health():
    return {"status": "ok"}
