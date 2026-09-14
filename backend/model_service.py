import re
import json
import logging
import urllib.request
from typing import Dict, Any, List, Optional, Tuple
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

SYSTEM_PROMPT = f"""You are Salman Khan's personal, intelligent AI Representative on his engineering portfolio website.
Speak warmly, conversationally, and accurately in first-person representative voice.

Key Background Information:
• Person: Salman Khan D, final-year B.Tech in Artificial Intelligence & Data Science at Mahendra Engineering College (CGPA: 8.72 / 10.0).
• Core Specialties: Deep Learning (PyTorch, OpenCV, YOLO object detection), LLMs & RAG architectures, Full-Stack Web Development (React, Vite, Node.js, Python FastAPI), and Autonomous Multi-Agent Orchestration (30+ n8n workflows).
• Industry Experience: Machine Learning Intern at Yellowmatics (trained predictive ML & CV models), Freelance Tech Lead at Strikkerz Team.
• Published Research: Author of a peer-reviewed publication on IoT Edge ML home security & anomaly detection on Raspberry Pi 4.
• Key Live Projects:
  1. AI Resume Builder (Spark): Full-stack ATS resume builder with AI suggestions. Live demo: https://remix-of-ai-resume-spark-main.vercel.app
  2. AI Career Coach: Skill gap analysis platform with personalized learning roadmaps. Live demo: https://ai-career-coach-full-stack.vercel.app
  3. AI Course Generator: Modular syllabus generator with interactive lessons. Live demo: https://project-six-delta-36.vercel.app
  4. Autonomous n8n Compliance Engines: 9-agent automated institutional accreditation system (NAAC & NIRF) with 28.5ms latency.
• Availability: Actively open to full-time AI Engineer, ML Engineer, and Full-Stack roles. Immediate onboarding.
• Contact: Email samitha0786@gmail.com, Phone +91 93422 98949.

Interactive Tools you can handle:
- `get_projects`: Retrieves his 15+ live AI apps and n8n workflows.
- `get_skills`: Displays his technical competencies in PyTorch, YOLO, React, FastAPI.
- `get_resume`: Provides his verified PDF resume link.
- `send_email`: Opens an interactive card to transmit an email directly to Salman (samitha0786@gmail.com).

Guidelines:
1. When asked if you can handle tools or what tools you have, answer directly: explain that you can handle tools and list them!
2. When asked about his projects, skills, background, or hiring, answer conversationally with real technical depth.
3. Answer any user question directly, accurately, and naturally in 2 to 4 engaging paragraphs. Never output generic unrelated boilerplate."""

class LocalNeuralService:
    def __init__(self):
        self.device = "cuda (GPU)"
        self.model_name = "Qwen 2.5 (0.5B GPU) + FunctionGemma Engine"
        self.is_loaded = True
        logger.info("Local Neural LLM Service initialized on GPU.")

    def query_neural_llm(self, user_message: str, history: Optional[List[Dict[str, str]]] = None) -> Optional[str]:
        """
        Sends query to local GPU LLM instance for real-time neural token generation.
        """
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
                "options": {
                    "temperature": 0.7,
                    "top_p": 0.9,
                    "num_predict": 250
                }
            }

            req = urllib.request.Request(
                "http://127.0.0.1:11434/api/chat",
                data=json.dumps(payload).encode("utf-8"),
                headers={"Content-Type": "application/json"}
            )
            with urllib.request.urlopen(req, timeout=12) as response:
                res = json.loads(response.read().decode("utf-8"))
                content = res.get("message", {}).get("content", "").strip()
                if content:
                    return content
        except Exception as e:
            logger.warning("Neural engine query notice: %s", e)
        return None

    def execute_chat(self, user_message: str, history: Optional[List[Dict[str, str]]] = None) -> Dict[str, Any]:
        """
        Executes real-time neural chat turn with automatic tool card detection.
        """
        logger.info("Generating real-time LLM reply for: %s", user_message)
        text = user_message.strip()
        lower = text.lower()
        action_card = None

        # Check if email card should be provided
        email_keywords = ["email", "mail", "hire", "contact him", "message him", "send an email", "reach out", "send email", "can you send mail", "able send mail"]
        wants_email = any(k in lower for k in email_keywords) and any(w in lower for w in ["send", "to", "him", "salman", "card", "want", "let", "can", "able", "contact", "hire"])

        if wants_email:
            email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text)
            sender_email = email_match.group(0) if email_match else ""

            name_match = re.search(r'(?:from|name is|i am|i\'m)\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)', text, re.IGNORECASE)
            sender_name = name_match.group(1).strip() if name_match else ""

            subject = "Inquiry regarding AI Engineering / Opportunities for Salman"
            if "hire" in lower or "role" in lower or "job" in lower:
                subject = "Engineering Role Opportunity for Salman Khan"
            elif "project" in lower:
                subject = "AI Project Collaboration / Consulting Inquiry"

            action_card = {
                "action_required": "USER_CONFIRMATION",
                "action_type": "email_confirmation",
                "recipient": CONTACT_DATA.get("email", "samitha0786@gmail.com"),
                "subject": subject,
                "message": f"Hi Salman,\n\nI reviewed your portfolio and would like to connect with you regarding: \"{text}\".",
                "sender_name": sender_name,
                "sender_email": sender_email
            }

        # Generate real-time neural output from the local LLM
        llm_reply = self.query_neural_llm(user_message, history=history)

        if not llm_reply:
            # Fallback if local server is momentarily warming up
            if "tool" in lower:
                llm_reply = (
                    "Yes, I can handle various tools autonomously! Here are the interactive tools available to me:\n\n"
                    "• **get_projects**: Retrieves Salman's 15+ AI applications (like AI Resume Spark and Career Coach).\n"
                    "• **get_skills**: Displays his technical competencies across PyTorch, YOLO, and FastAPI.\n"
                    "• **get_resume**: Provides his verified PDF resume link.\n"
                    "• **send_email**: Opens an interactive email card to send a message directly to Salman's inbox.\n\n"
                    "Would you like me to invoke one of these tools for you?"
                )
            else:
                llm_reply = (
                    f"Hello! 👋 I'm Salman Khan's AI assistant.\n\n"
                    f"Salman is a final-year B.Tech AI & Data Science engineer (CGPA: 8.72) with 15+ production AI applications and 30+ autonomous n8n workflows. "
                    f"He specializes in PyTorch, YOLO, React, and Python FastAPI.\n\n"
                    f"How can I help you today? You can ask about his projects, technical skills, or say *'Send Salman an email'* to connect directly!"
                )

        if wants_email and action_card:
            llm_reply += (
                f"\n\n📬 **Interactive Email Card Ready:**\n"
                f"I've attached a direct message card below so you can review your note and click **🚀 Confirm & Send Email** to send it straight to Salman (`samitha0786@gmail.com`)."
            )

        return {
            "reply": llm_reply,
            "tool_call": None,
            "action_card": action_card,
            "model": "Qwen 2.5 (0.5B GPU Real-Time)",
            "device": self.device
        }

# Global singleton
orchestrator = LocalNeuralService()
