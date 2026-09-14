import os
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any

from model_service import orchestrator
from tools import get_contact

app = FastAPI(
    title="Salman Khan Portfolio AI Chatbot Backend",
    description="FunctionGemma 270M Tool-Calling & Intent Orchestration Engine",
    version="1.0.0"
)

# CORS configuration to allow local Vite dev server and production domains
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://modern-portfo-ygiv.vercel.app",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []

class SendEmailRequest(BaseModel):
    to_email: Optional[str] = "samitha0786@gmail.com"
    from_name: str
    from_email: str
    subject: str
    message: str

@app.api_route("/", methods=["GET", "HEAD"])
async def root():
    return {
        "status": "online",
        "service": "Salman Portfolio AI Assistant Backend",
        "model": orchestrator.model_name if hasattr(orchestrator, 'model_name') else "FunctionGemma Hybrid Engine",
        "device": getattr(orchestrator, 'device', 'CPU/GPU')
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": orchestrator.is_loaded,
        "device": orchestrator.device,
        "model_path": "E:/model",
        "available_tools": [
            "get_profile",
            "get_projects",
            "get_project",
            "get_skills",
            "get_experience",
            "get_education",
            "get_contact",
            "get_resume",
            "send_email"
        ]
    }

@app.post("/api/chat")
async def chat_endpoint(payload: ChatRequest):
    user_msg = payload.message.strip()
    if not user_msg:
        raise HTTPException(status_code=400, detail="Empty message")

    history_dicts = [{"role": m.role, "content": m.content} for m in payload.history] if payload.history else []
    result = orchestrator.execute_chat(user_msg, history=history_dicts)
    return result

@app.post("/api/send-email")
async def send_email_endpoint(payload: SendEmailRequest):
    """
    Fallback server-side logger / dispatcher for confirmed email requests.
    Note: Client-side EmailJS is the primary delivery relay.
    """
    contact = get_contact()
    receiver = contact.get("email", "samitha0786@gmail.com")
    
    # In production, this can also hook into an SMTP or Resend/SendGrid API
    return {
        "status": "queued_for_delivery",
        "recipient": receiver,
        "from": f"{payload.from_name} <{payload.from_email}>",
        "subject": payload.subject,
        "message_length": len(payload.message),
        "note": "Email confirmation acknowledged and logged for dispatch."
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
