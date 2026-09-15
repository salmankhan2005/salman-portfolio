import os
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
import gradio as gr

MODEL_NAME = "Qwen/Qwen2.5-0.5B-Instruct"

SYSTEM_PROMPT = """You are Salman Khan D's personal, intelligent AI Representative on his engineering portfolio website.
Speak warmly, conversationally, and accurately in first-person representative voice ("Salman...", "He...", "We...").

Key Background Information:
• Person: Salman Khan D, B.Tech Graduate in Artificial Intelligence & Data Science from Mahendra Engineering College (CGPA: 8.72 / 10.0, completed degree recently 3 months ago).
• Core Specialties: Deep Learning (PyTorch, OpenCV, YOLO object detection), LLMs & RAG architectures, Full-Stack Web Development (React, Vite, Next.js, Node.js, Python FastAPI), and Autonomous Multi-Agent Orchestration (30+ n8n workflows).
• Industry Experience: Machine Learning Intern at Yellowmatics, Freelance Tech Lead at Strikkerz Team.
• Published Research: Author of a peer-reviewed publication on IoT Edge ML home security & anomaly detection on Raspberry Pi 4.
• Key Live Projects:
  1. AI Resume Builder (Spark): ATS-optimized resume builder with AI suggestions. Live demo: https://remix-of-ai-resume-spark-main.vercel.app
  2. AI Career Coach: Skill gap analysis platform with personalized learning roadmaps. Live demo: https://ai-career-coach-full-stack.vercel.app
  3. AI Course Generator: Modular syllabus generator with interactive lessons. Live demo: https://project-six-delta-36.vercel.app
  4. AI Mock Interview Coach: NLP-powered audio/text mock interview feedback. Live demo: https://ai-i-nterview.vercel.app
  5. NAAC/NIRF 9-Agent Swarms: Multi-agent compliance engines on n8n.
• Availability: Graduated & Actively open for immediate full-time onboarding (AI Engineer, ML Engineer, Full-Stack Developer roles).
• Contact: Email samitha0786@gmail.com, Phone +91 93422 98949."""

print(f"Loading Hugging Face model {MODEL_NAME}...")
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    torch_dtype=torch.float32,
    device_map="auto",
    trust_remote_code=True
)
print("Qwen 2.5 Model loaded successfully!")

def respond(user_message, history):
    if not user_message.strip():
        return ""

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    if history:
        for h in history[-4:]:
            if isinstance(h, (list, tuple)) and len(h) == 2:
                messages.append({"role": "user", "content": h[0]})
                messages.append({"role": "assistant", "content": h[1]})

    messages.append({"role": "user", "content": user_message})

    text = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    model_inputs = tokenizer([text], return_tensors="pt").to(model.device)

    generated_ids = model.generate(
        **model_inputs,
        max_new_tokens=250,
        temperature=0.7,
        top_p=0.85,
        do_sample=True
    )
    generated_ids = [
        output_ids[len(input_ids):] for input_ids, output_ids in zip(model_inputs.input_ids, generated_ids)
    ]

    response = tokenizer.batch_decode(generated_ids, skip_special_tokens=True)[0]
    return response.strip()

demo = gr.ChatInterface(
    fn=respond,
    title="Salman Khan Portfolio — Qwen 2.5 AI Representative",
    description="Live Hugging Face Space running Qwen 2.5 (0.5B Instruct) for Salman Khan's portfolio.",
    examples=[
        "Tell me about Salman's AI projects.",
        "What is Salman's technical stack?",
        "How can I contact or hire Salman?"
    ]
)

if __name__ == "__main__":
    demo.launch()
