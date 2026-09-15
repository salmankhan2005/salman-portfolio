import os
import re
import json
import logging
import urllib.request
from typing import Dict, Any, List, Optional
from pathlib import Path

from tools import (
    TOOL_REGISTRY,
    get_profile,
    get_projects,
    get_project,
    get_skills,
    get_experience,
    get_education,
    get_contact,
    get_resume,
    prepare_email
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("model_service")

DATA_DIR = Path(__file__).resolve().parent / "data"

def load_json_data(filename: str) -> Any:
    filepath = DATA_DIR / filename
    if filepath.exists():
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}

PROFILE_DATA = load_json_data("profile.json")
PROJECTS_DATA = load_json_data("projects.json")
SKILLS_DATA = load_json_data("skills.json")
EXPERIENCE_DATA = load_json_data("experience.json")
EDUCATION_DATA = load_json_data("education.json")
CONTACT_DATA = load_json_data("contact.json")

SYSTEM_PROMPT = f"""You are Salman Khan D's personal, intelligent, and articulate AI Representative on his engineering portfolio website.
Speak warmly, conversationally, and accurately in first-person representative voice ("Salman...", "We...", "He...").

Key Background Information:
• Person: Salman Khan D, B.Tech Graduate in Artificial Intelligence & Data Science from Mahendra Engineering College (CGPA: 8.72 / 10.0, recently completed degree 3 months ago).
• Core Specialties: Deep Learning (PyTorch, OpenCV, YOLO object detection), LLMs & RAG architectures, Full-Stack Web Development (React, Vite, Next.js, Node.js, Python FastAPI), and Autonomous Multi-Agent Orchestration (30+ n8n workflows).
• Industry Experience:
  - Machine Learning & Data Science Intern at Yellowmatics (trained predictive ML & CV models with PyTorch & Flask).
  - Freelance Tech Lead at Strikkerz Team (React applications, UI/UX systems, Vercel deployments).
• Published Research: Author of a peer-reviewed research paper on IoT Edge ML home security & anomaly detection on Raspberry Pi 4.
• Key Live Projects:
  1. AI Resume Builder (Spark): Full-stack ATS resume builder with AI suggestions. Live demo: https://remix-of-ai-resume-spark-main.vercel.app
  2. AI Career Coach: Skill gap analysis platform with personalized learning roadmaps. Live demo: https://ai-career-coach-full-stack.vercel.app
  3. AI Course Generator: Modular syllabus generator with interactive lessons. Live demo: https://project-six-delta-36.vercel.app
  4. AI Mock Interview Coach: NLP interview simulation platform. Live demo: https://ai-i-nterview.vercel.app
  5. NAAC/NIRF Multi-Agent Swarms: Automated institutional compliance systems on n8n.
• Availability: Graduated & Actively open for immediate full-time onboarding (AI Engineer, ML Engineer, and Full-Stack roles).
• Contact: Email samitha0786@gmail.com, Phone +91 93422 98949.

Always answer questions naturally and conversationally, matching the tone and context of the user's inquiry."""

class LocalNeuralService:
    def __init__(self):
        self.device = "cloud/gpu"
        self.model_name = "Salman AI Conversational Engine"
        self.is_loaded = True
        logger.info("Conversational Neural AI Service initialized.")

    def query_groq_api(self, user_message: str, history: Optional[List[Dict[str, str]]] = None) -> Optional[str]:
        api_key = os.environ.get("GROQ_API_KEY") or os.environ.get("VITE_GROQ_API_KEY")
        if not api_key:
            return None

        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        if history:
            for h in history[-4:]:
                messages.append({"role": h.get("role", "user"), "content": h.get("content", "")})
        messages.append({"role": "user", "content": user_message})

        for model in ["qwen/qwen3.8-27b", "groq/compound", "openai/gpt-oss-120b"]:
            try:
                payload = {
                    "model": model,
                    "messages": messages,
                    "temperature": 0.7,
                    "max_tokens": 500
                }
                req = urllib.request.Request(
                    "https://api.groq.com/openai/v1/chat/completions",
                    data=json.dumps(payload).encode("utf-8"),
                    headers={
                        "Content-Type": "application/json",
                        "Authorization": f"Bearer {api_key.strip()}",
                        "User-Agent": "Mozilla/5.0"
                    }
                )
                with urllib.request.urlopen(req, timeout=10) as response:
                    res = json.loads(response.read().decode("utf-8"))
                    text = res.get("choices", [{}])[0].get("message", {}).get("content", "")
                    if text:
                        return text.strip()
            except Exception as e:
                logger.warning(f"Groq API attempt error ({model}): {e}")
        return None

    def query_gemini_api(self, user_message: str, history: Optional[List[Dict[str, str]]] = None) -> Optional[str]:
        api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("VITE_GEMINI_API_KEY")
        if not api_key:
            return None

        for model in ["gemini-2.0-flash", "gemini-1.5-flash"]:
            try:
                endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
                contents = []
                if history:
                    for h in history[-4:]:
                        role = "model" if h.get("role") == "assistant" else "user"
                        contents.append({"role": role, "parts": [{"text": h.get("content", "")}]})
                contents.append({"role": "user", "parts": [{"text": user_message}]})

                payload = {
                    "system_instruction": {"parts": [{"text": SYSTEM_PROMPT}]},
                    "contents": contents,
                    "generationConfig": {"temperature": 0.7, "maxOutputTokens": 600}
                }

                req = urllib.request.Request(
                    endpoint,
                    data=json.dumps(payload).encode("utf-8"),
                    headers={"Content-Type": "application/json"}
                )
                with urllib.request.urlopen(req, timeout=10) as response:
                    res = json.loads(response.read().decode("utf-8"))
                    text = res.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
                    if text:
                        return text.strip()
            except Exception as e:
                logger.warning(f"Gemini API attempt error ({model}): {e}")
        return None

    def query_ollama_llm(self, user_message: str, history: Optional[List[Dict[str, str]]] = None) -> Optional[str]:
        try:
            messages = [{"role": "system", "content": SYSTEM_PROMPT}]
            if history:
                for h in history[-4:]:
                    messages.append({"role": h.get("role", "user"), "content": h.get("content", "")})
            messages.append({"role": "user", "content": user_message})

            payload = {
                "model": "qwen2.5:0.5b",
                "messages": messages,
                "stream": False,
                "options": {"temperature": 0.7, "num_predict": 250}
            }

            req = urllib.request.Request(
                "http://127.0.0.1:11434/api/chat",
                data=json.dumps(payload).encode("utf-8"),
                headers={"Content-Type": "application/json"}
            )
            with urllib.request.urlopen(req, timeout=30) as response:
                res = json.loads(response.read().decode("utf-8"))
                content = res.get("message", {}).get("content", "").strip()
                if content:
                    return content
        except Exception:
            pass
        return None

    def execute_chat(self, user_message: str, history: Optional[List[Dict[str, str]]] = None) -> Dict[str, Any]:
        logger.info("Executing chat for: %s", user_message)
        text = user_message.strip()
        lower = text.lower()
        action_card = None

        # Check for email / contact intent
        email_keywords = ["email", "mail", "hire", "contact him", "message him", "send an email", "reach out", "send email"]
        wants_email = any(k in lower for k in email_keywords)

        if wants_email:
            email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text)
            sender_email = email_match.group(0) if email_match else ""

            name_match = re.search(r'(?:from|name is|i am|i\'m)\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)', text, re.IGNORECASE)
            sender_name = name_match.group(1).strip() if name_match else ""

            subject = "Inquiry regarding AI Engineering / Opportunities for Salman"
            if "hire" in lower or "role" in lower or "job" in lower:
                subject = "Engineering Role Opportunity for Salman Khan"
            elif "project" in lower or "collab" in lower:
                subject = "AI Project Collaboration Inquiry for Salman"

            action_card = {
                "action_required": "USER_CONFIRMATION",
                "action_type": "email_confirmation",
                "recipient": CONTACT_DATA.get("email", "samitha0786@gmail.com"),
                "subject": subject,
                "message": f"Hi Salman,\n\nI reviewed your portfolio and would like to connect regarding: \"{text}\".",
                "sender_name": sender_name,
                "sender_email": sender_email
            }

        # 1. Try Groq Cloud Ultra-Fast LLM API FIRST (qwen/qwen3.8-27b)
        llm_reply = self.query_groq_api(user_message, history=history)

        # 2. Try Local Ollama GPU LLM
        if not llm_reply:
            llm_reply = self.query_ollama_llm(user_message, history=history)

        # 3. Try Gemini Cloud LLM
        if not llm_reply:
            llm_reply = self.query_gemini_api(user_message, history=history)

        # 3. Conversational Semantic Fallback
        if not llm_reply:
            if lower in ["hi", "hello", "hey", "hola", "namaste", "vanakkam"] or len(lower.split()) <= 2 and any(w in lower for w in ["hi", "hello", "hey"]):
                llm_reply = (
                    "Hey there! 👋 Wonderful to meet you! I'm Salman Khan's AI Representative.\n\n"
                    "I can walk you through his **15+ production AI applications**, discuss his **PyTorch & YOLO deep learning stack**, "
                    "review his **30+ autonomous n8n agent workflows**, or help you schedule a chat with him.\n\n"
                    "What would you like to explore today?"
                )
            elif "how are you" in lower or "how's it going" in lower:
                llm_reply = (
                    "I'm doing fantastic, thanks for asking! 😊 I'm fully primed and ready to assist you with Salman's projects, "
                    "deep learning research, and full-stack work. What brings you to Salman's portfolio today?"
                )
            elif "joke" in lower:
                llm_reply = (
                    "Here's one! 😄\n\n"
                    "*Why do neural networks make terrible secret keepers?*\n"
                    "... Because they're always backpropagating! 🧠💻"
                )
            elif "project" in lower or "built" in lower or "app" in lower:
                llm_reply = (
                    "Salman has engineered over **15 production AI applications** and **30+ autonomous agent workflows**! Here are the core highlights:\n\n"
                    "• **[AI Resume Builder (Spark)](https://remix-of-ai-resume-spark-main.vercel.app)**: Real-time ATS resume scoring & AI suggestions.\n"
                    "• **[AI Career Coach](https://ai-career-coach-full-stack.vercel.app)**: 8-semester skill gap analysis & personalized roadmap.\n"
                    "• **[AI Course Generator](https://project-six-delta-36.vercel.app)**: Auto-synthesizes modular lesson plans.\n"
                    "• **[AI Mock Interview Coach](https://ai-i-nterview.vercel.app)**: NLP interview simulator with confidence feedback.\n"
                    "• **NAAC & NIRF 9-Agent Swarms**: Multi-agent compliance engines on n8n.\n\n"
                    "Which project would you like to explore in detail?"
                )
            elif "skill" in lower or "stack" in lower or "pytorch" in lower:
                llm_reply = (
                    "Salman's engineering stack spans deep learning, modern LLMs, and high-performance full-stack web architectures:\n\n"
                    "• **Deep Learning & CV:** PyTorch, TensorFlow, OpenCV, YOLOv8 object detection, CNNs.\n"
                    "• **LLMs & Multi-Agent:** Prompt engineering, Function Calling, RAG, n8n orchestration (30+ workflows).\n"
                    "• **Full-Stack:** React.js, Vite, Next.js, Node.js, Python FastAPI, PostgreSQL, Supabase.\n"
                    "• **Edge & IoT:** Raspberry Pi 4, edge AI anomaly detection.\n\n"
                    "He excels at turning complex models into production-grade software."
                )
            elif "resume" in lower or "cv" in lower:
                llm_reply = (
                    "Salman's verified PDF resume is available for review:\n\n"
                    "🔗 **[View & Download Salman's Resume](https://drive.google.com/file/d/1wTKMmKdFuPWwoiJqUITRqckhVwdTBYDn/view)**\n\n"
                    "It covers his 8.72 CGPA in B.Tech AI & Data Science, ML internship at Yellowmatics, and his 15+ live applications."
                )
            elif "experience" in lower or "intern" in lower or "yellowmatics" in lower:
                llm_reply = (
                    "Here is an overview of Salman's industry background:\n\n"
                    "• **Machine Learning Intern at Yellowmatics:** Trained and optimized predictive ML and CV models using PyTorch and Flask for real-time inference.\n"
                    "• **Freelance Tech Lead at Strikkerz Team:** Led full-stack client applications, React architectures, and workflow automations.\n"
                    "• **Published AI Researcher:** Author of an academic publication on ML-based IoT anomaly detection on Raspberry Pi 4."
                )
            else:
                llm_reply = (
                    f"Hello! 👋 I'm Salman Khan's AI Representative.\n\n"
                    f"Salman is a B.Tech AI & Data Science graduate (CGPA: 8.72, recently completed degree) with 15+ production AI applications and 30+ autonomous n8n workflows. "
                    f"He is actively seeking full-time AI Engineer, ML, and Full-Stack roles.\n\n"
                    f"How can I help you? You can ask about his projects, technical stack, experience, or say *'Send Salman an email'* to connect directly!"
                )

        if wants_email and action_card:
            llm_reply += (
                f"\n\n📬 **Interactive Email Card Ready:**\n"
                f"I've attached a direct message preview below. Fill in your details and click **🚀 Confirm & Send Email** to send it directly to Salman (`samitha0786@gmail.com`)."
            )

        return {
            "reply": llm_reply,
            "tool_call": None,
            "action_card": action_card,
            "model": "Salman AI Brain",
            "device": self.device
        }

# Global singleton
orchestrator = LocalNeuralService()
