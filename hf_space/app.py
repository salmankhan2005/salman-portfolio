import os
import json
import gradio as gr
import urllib.request

SYSTEM_PROMPT = """You are Salman Khan's personal, intelligent AI Representative on his engineering portfolio website.
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
• Contact: Email samitha0786@gmail.com, Phone +91 93422 98949."""

def respond(user_message, history):
    if not user_message.strip():
        return ""
    
    text = user_message.strip().lower()
    
    # Tool call simulation / Intent detection
    if "project" in text or "build" in text or "work" in text:
        return (
            "Here are Salman's top featured production AI applications:\n\n"
            "1. **AI Resume Builder**: ATS-optimized resume generator. Demo: https://remix-of-ai-resume-spark-main.vercel.app\n"
            "2. **AI Career Coach**: 8-semester skill gap roadmap. Demo: https://ai-career-coach-full-stack.vercel.app\n"
            "3. **AI Course Generator**: Interactive lesson synthesizer. Demo: https://project-six-delta-36.vercel.app\n"
            "4. **NAAC/NIRF 9-Agent Swarm**: Multi-agent compliance engine on n8n."
        )
    elif "skill" in text or "tech" in text or "stack" in text:
        return (
            "Salman's core technical stack includes:\n\n"
            "• **Artificial Intelligence / ML**: PyTorch, TensorFlow, OpenCV, YOLOv8, Qwen 2.5, FunctionGemma.\n"
            "• **Autonomous Agents**: n8n Enterprise (30+ workflows), Multi-Agent Orchestration, Tool Calling.\n"
            "• **Full-Stack Web**: React.js, Next.js 14, Python FastAPI, Node.js, Express, Tailwind CSS, PostgreSQL, Supabase.\n"
            "• **Edge IoT**: Raspberry Pi 4 edge anomaly detection."
        )
    elif "email" in text or "contact" in text or "hire" in text:
        return (
            "You can contact Salman directly via:\n\n"
            "• **Email**: samitha0786@gmail.com\n"
            "• **Phone**: +91 93422 98949\n"
            "• **Portfolio**: https://modern-portfo-ygiv.vercel.app\n\n"
            "He is actively seeking full-time AI Engineering & Full-Stack roles!"
        )
    else:
        return (
            f"Hello! I am Salman Khan's AI Representative.\n\n"
            f"Salman is a B.Tech AI & Data Science engineer (CGPA 8.72) with 15+ live AI apps and 30+ autonomous n8n workflows. "
            f"How can I assist you with his background, skills, or projects?"
        )

# Gradio UI Interface
demo = gr.ChatInterface(
    fn=respond,
    title="Salman Khan — AI Model & Tool Orchestrator Demo",
    description="Interactive Hugging Face Space demonstration for Salman's local AI model assistant.",
    examples=[
        "Tell me about Salman's AI projects.",
        "What are his core technical skills?",
        "How can I contact or hire Salman?"
    ]
)

if __name__ == "__main__":
    demo.launch()
