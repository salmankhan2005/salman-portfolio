import json
from pathlib import Path
from typing import Dict, Any, Optional

DATA_DIR = Path(__file__).resolve().parent / "data"

def _load_json(filename: str) -> Any:
    path = DATA_DIR / filename
    if not path.exists():
        return {}
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def get_profile() -> Dict[str, Any]:
    """Retrieve personal biography, titles, education summary, and core focus areas."""
    return _load_json("profile.json")

def get_projects() -> Any:
    """Retrieve full portfolio project archive with live demo URLs and tech stacks."""
    return _load_json("projects.json")

def get_project(query: str) -> Dict[str, Any]:
    """Retrieve details for a specific project matching the name or keyword."""
    projects = _load_json("projects.json")
    if not isinstance(projects, list):
        return {"error": "Projects not found"}
    q = query.lower()
    for p in projects:
        if q in p.get("name", "").lower() or q in p.get("id", "").lower() or q in p.get("description", "").lower():
            return p
    return {"message": f"No specific project matching '{query}' found. Salman has built AI Resume Builder, AI Career Coach, AI Course Generator, and 30+ n8n workflows."}

def get_experience() -> Any:
    """Retrieve professional experience, internships, and leadership roles."""
    return _load_json("experience.json")

def get_skills() -> Any:
    """Retrieve categorized technical competencies in AI/ML, Full-Stack, Computer Vision, and IoT."""
    return _load_json("skills.json")

def get_education() -> Any:
    """Retrieve academic degree, institution, CGPA (8.72), and certifications."""
    return _load_json("education.json")

def get_contact() -> Any:
    """Retrieve official contact channels including direct email, phone, LinkedIn, and GitHub."""
    return _load_json("contact.json")

def get_resume() -> Dict[str, Any]:
    """Retrieve official resume download link and summary credentials."""
    contact = _load_json("contact.json")
    profile = _load_json("profile.json")
    return {
        "resume_pdf_url": contact.get("resume_pdf_url"),
        "name": profile.get("name"),
        "title": profile.get("title"),
        "institution": "Mahendra Engineering College (CGPA: 8.72)",
        "message": "Salman's official ATS-optimized resume can be accessed directly or downloaded."
    }

def prepare_email(
    subject: Optional[str] = None,
    message: Optional[str] = None,
    sender_name: Optional[str] = None,
    sender_email: Optional[str] = None
) -> Dict[str, Any]:
    """Prepare an email draft for user confirmation before sending."""
    contact = _load_json("contact.json")
    clean_subject = subject.strip() if subject else "Project Discussion / Hiring Inquiry"
    clean_message = message.strip() if message else "Hi Salman,\n\nI reviewed your portfolio and would love to connect regarding an engineering opportunity."
    
    return {
        "action_required": "USER_CONFIRMATION",
        "action_type": "email_confirmation",
        "recipient": contact.get("email", "samitha0786@gmail.com"),
        "subject": clean_subject,
        "message": clean_message,
        "sender_name": sender_name or "",
        "sender_email": sender_email or "",
        "prompt": "I've drafted your email to Salman Khan. Please review, edit if necessary, and click 'Confirm & Send Email' below."
    }

TOOL_REGISTRY = {
    "get_profile": get_profile,
    "get_projects": get_projects,
    "get_project": get_project,
    "get_experience": get_experience,
    "get_skills": get_skills,
    "get_education": get_education,
    "get_contact": get_contact,
    "get_resume": get_resume,
    "prepare_email": prepare_email,
    "send_email": prepare_email # Route send_email requests through confirmation card
}
