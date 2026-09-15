/**
 * Salman Khan Portfolio — Intelligent Conversational AI Engine
 * 
 * Multi-Tier AI Architecture (priority order):
 * 1. Render FastAPI Backend (https://salman-portfolio-ai-backend.onrender.com)
 * 2. Google Gemini API (if VITE_GEMINI_API_KEY is set)
 * 3. Local Ollama GPU LLM (ONLY on localhost dev environment)
 * 4. Grounded Conversational Semantic Brain (100% Reliable Offline/Online fallback)
 */

const GROUNDED_CONTEXT = `### CONTEXT ABOUT THIS PORTFOLIO OWNER:
Name: Salman Khan D (AI Engineer & Full-Stack Developer)
Preferred Name: Salman Khan
Location: Tamil Nadu, India
Education: B.Tech Graduate in Artificial Intelligence & Data Science from Mahendra Engineering College (CGPA: 8.72 / 10.0, recently completed degree 3 months ago).
Core Skills: PyTorch, TensorFlow, OpenCV, YOLOv8, Transformers, LLMs, RAG, n8n Orchestration (30+ workflows), React.js, Vite, Next.js, Node.js, Python FastAPI, PostgreSQL, Supabase, Raspberry Pi 4 Edge ML.
Experience:
• Machine Learning & Data Science Intern at Yellowmatics (Trained predictive ML and Computer Vision models using PyTorch & Flask for real-time inference APIs).
• Freelance Tech & Creative Lead at Strikkerz Team (Led React applications, UI/UX systems, and cloud deployments on Vercel).
• Published AI Researcher: Author of a peer-reviewed research paper on IoT Edge ML home security & anomaly detection on Raspberry Pi 4.
Top Production Projects Built:
1. AI Resume Builder (Spark): ATS-optimized resume builder with AI suggestions. Live demo: https://remix-of-ai-resume-spark-main.vercel.app
2. AI Career Coach: Skill gap analysis platform with personalized learning roadmaps. Live demo: https://ai-career-coach-full-stack.vercel.app
3. AI Course Generator: Modular syllabus generator with interactive lessons. Live demo: https://project-six-delta-36.vercel.app
4. AI Mock Interview Coach: NLP-powered audio/text mock interview feedback. Live demo: https://ai-i-nterview.vercel.app
5. AI Adaptive Learning Platform: Personalized e-learning paths. Live demo: https://coure-brown.vercel.app
6. NAAC & NIRF 9-Agent Multi-Agent Swarm on n8n: Automated institutional compliance & ranking engines.
7. ML Home Security & Anomaly Detection: Edge AI on Raspberry Pi with published research.
8. Finova: Intelligent financial analytics & cash flow manager.
Availability: Graduated & Actively open for immediate full-time onboarding (AI Engineer, ML Engineer, Full-Stack Developer roles).
Contact: Email: samitha0786@gmail.com, Phone: +91 93422 98949.
Resume Link: https://drive.google.com/file/d/1wTKMmKdFuPWwoiJqUITRqckhVwdTBYDn/view

### INSTRUCTIONS:
You are Salman Khan's personal, intelligent AI Representative on his engineering portfolio website.
Always refer to Salman Khan D (the AI & Data Science engineer from Mahendra Engineering College), NOT any actor.
Speak warmly, conversationally, and accurately in first-person representative voice ("Salman...", "He...", "We...").
Answer questions directly and naturally. If asked to send an email or contact him, encourage connecting directly!`;

// Helper: Check if running on localhost
function isLocalhostEnv() {
  if (typeof window === 'undefined') return true; // Node.js test environment
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0' || host === '';
}

// Helper: Extract name and email from text if present
export function extractContactEntities(text) {
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/);
  const nameMatch = text.match(/(?:from|name is|i am|i'm|this is|my name is)\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)/i);
  return {
    email: emailMatch ? emailMatch[0] : null,
    name: nameMatch ? nameMatch[1].trim() : null
  };
}

// 1. Local Offline GPU LLM Direct Client (ONLY on localhost dev — never in production)
async function queryLocalOllama(userMessage, history) {
  if (!isLocalhostEnv()) return null; // Hard guard: never attempt on deployed cloud sites

  // Only use the Vite proxy path (avoids CORS entirely)
  const endpoint = '/ollama-api/api/chat';

  const messages = [{ role: 'system', content: GROUNDED_CONTEXT }];
  if (history && history.length > 0) {
    for (const h of history.slice(-6)) {
      messages.push({
        role: h.role === 'assistant' ? 'assistant' : 'user',
        content: h.content || ''
      });
    }
  }
  messages.push({ role: 'user', content: userMessage });

  const payload = JSON.stringify({
    model: 'qwen2.5:0.5b',
    messages: messages,
    stream: false,
    options: {
      temperature: 0.65,
      top_p: 0.85,
      num_predict: 220
    }
  });

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: payload
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const content = data.message?.content?.trim();
      if (content && content.length > 5) {
        return { text: content, model: 'Qwen 2.5 (Local GPU LLM)' };
      }
    }
  } catch (err) {
    // Ollama not running locally
  }
  return null;
}

// 2. Render FastAPI Backend Client (primary cloud AI source)
async function queryBackendAPI(userMessage, history, backendUrl) {
  // On localhost, also try the Vite proxy path as fallback
  const endpoints = isLocalhostEnv()
    ? [`${backendUrl}/api/chat`, '/backend-api/api/chat']
    : [`${backendUrl}/api/chat`];

  const historyPayload = (history || []).slice(-6).map(m => ({
    role: m.role,
    content: m.content
  }));

  const payload = JSON.stringify({
    message: userMessage,
    history: historyPayload
  });

  for (const endpoint of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: payload
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          return {
            text: data.reply,
            tool_call: data.tool_call || null,
            action_card: data.action_card || null,
            model: data.model || 'Backend AI Engine'
          };
        }
      }
    } catch (err) {
      // Try next
    }
  }
  return null;
}

// 4. Google Gemini Cloud LLM Direct Client (Optional)
async function queryGeminiAPI(userMessage, history, apiKey) {
  const formattedContents = [];
  
  if (history && history.length > 0) {
    for (const h of history.slice(-6)) {
      if (h.role === 'user') {
        formattedContents.push({ role: 'user', parts: [{ text: h.content }] });
      } else if (h.role === 'assistant' && h.content) {
        formattedContents.push({ role: 'model', parts: [{ text: h.content }] });
      }
    }
  }
  
  formattedContents.push({ role: 'user', parts: [{ text: userMessage }] });

  const models = ['gemini-2.0-flash', 'gemini-1.5-flash'];
  
  for (const model of models) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload = {
        system_instruction: {
          parts: [{ text: GROUNDED_CONTEXT }]
        },
        contents: formattedContents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
          topP: 0.95
        }
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidate) {
          return {
            text: candidate.trim(),
            model: `Google Gemini (${model})`
          };
        }
      }
    } catch (e) {
      // Fall through
    }
  }
  return null;
}

// 5. Intelligent Grounded Conversational Neural Brain
export function generateSemanticResponse(userMessage, history = [], userContact = {}) {
  const text = userMessage.trim();
  const lower = text.toLowerCase();
  const words = lower.split(/\s+/);
  
  // Extract contact info if user typed it
  const { name: extractedName, email: extractedEmail } = extractContactEntities(text);
  const senderName = extractedName || userContact.name || '';
  const senderEmail = extractedEmail || userContact.email || '';

  let action_card = null;
  let reply = '';
  const primaryEmail = 'samitha0786@gmail.com';

  // Check if intent is email / contact / hire
  const isEmailIntent = (
    lower.includes('email') || lower.includes('mail') || lower.includes('hire') ||
    lower.includes('contact') || lower.includes('message') || lower.includes('reach out') ||
    lower.includes('touch') || lower.includes('connect with salman') || lower.includes('schedule') ||
    lower.includes('interview him') || lower.includes('call') || lower.includes('opportunity')
  );

  // 1. Email & Contact Intent
  if (isEmailIntent) {
    let subject = "Inquiry regarding AI Engineering / Opportunities for Salman";
    if (lower.includes('hire') || lower.includes('job') || lower.includes('role') || lower.includes('recruiter') || lower.includes('interview')) {
      subject = "Engineering Role Opportunity for Salman Khan";
    } else if (lower.includes('freelance') || lower.includes('project') || lower.includes('consulting') || lower.includes('collab')) {
      subject = "AI Project Collaboration / Consulting Inquiry for Salman";
    }

    action_card = {
      action_required: "USER_CONFIRMATION",
      action_type: "email_confirmation",
      recipient: primaryEmail,
      subject: subject,
      message: `Hi Salman,\n\nI reviewed your portfolio and would like to connect regarding: "${text}".`,
      sender_name: senderName,
      sender_email: senderEmail
    };

    const greetings = [
      "I'd be delighted to help you connect directly with Salman! 📬",
      "That's great! Salman is actively open to engineering roles and collaborations. 🚀",
      "Awesome! Let's get your message straight to Salman's inbox. ✉️"
    ];
    const pickedGreeting = greetings[Math.floor(Math.random() * greetings.length)];

    reply = `${pickedGreeting}\n\nSalman is currently looking for **Full-Time AI Engineer**, **Machine Learning Engineer**, and **Full-Stack Developer** roles (immediate joining).\n\nI have generated an interactive email draft below. You can customize the details and click **🚀 Confirm & Send Email** to send it directly to \`${primaryEmail}\`!`;

    return { reply, action_card, model: 'Salman AI Brain' };
  }

  // 2. Greetings & Conversational Chit-Chat
  const isGreeting = (
    /^(hi|hello|hey|hey\s+there|hiya|hola|namaste|vanakkam|howdy|yo|good\s+morning|good\s+afternoon|good\s+evening)\b/i.test(lower) ||
    lower === 'hi' || lower === 'hello' || lower === 'hey'
  );

  const isHowAreYou = (
    lower.includes('how are you') || lower.includes('how r u') || lower.includes('how are u') ||
    lower.includes("how's it going") || lower.includes('how do you do') || lower.includes("how's your day")
  );

  if (isHowAreYou) {
    const responses = [
      "I'm doing fantastic, thank you for asking! 😊 I'm fully primed and ready to share everything about Salman's AI applications, machine learning research, and full-stack projects. How's your day going, and what would you like to explore?",
      "Doing great! 🚀 Always excited to chat about Salman's engineering work—from his 15+ production AI web apps to his 30+ autonomous n8n agent workflows. What brings you by today?",
      "I'm feeling energized and ready to assist! 💡 Whether you're curious about Salman's ATS resume builder, his deep learning experience at Yellowmatics, or looking to discuss job opportunities, I'm here to help. What's on your mind?"
    ];
    reply = responses[Math.floor(Math.random() * responses.length)];
    return { reply, action_card, model: 'Salman AI Brain' };
  }

  if (isGreeting && words.length <= 4) {
    const greetingResponses = [
      `Hey there! 👋 Wonderful to meet you! I'm Salman Khan's personal AI Assistant.\n\nI can walk you through his **15+ production AI applications**, discuss his **PyTorch & YOLO deep learning stack**, review his **30+ autonomous n8n agent pipelines**, or help you schedule a chat with him.\n\nWhat would you like to dive into?`,
      `Hello! 👋 Welcome to Salman Khan's portfolio! I'm his AI representative, ready to answer questions about his AI engineering projects, Yellowmatics internship, published research, or availability for full-time roles.\n\nHow can I help you today?`,
      `Hi there! 🌟 Great to have you here. Salman is a B.Tech AI & Data Science graduate (recently completed degree with 8.72 CGPA) with hands-on experience building full-stack LLM apps and multi-agent workflows.\n\nFeel free to ask me anything about his work, or let me know if you'd like to reach out to him directly!`
    ];
    reply = greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
    return { reply, action_card, model: 'Salman AI Brain' };
  }

  // 3. Identity / "Who are you?" / "Who made you?"
  if (
    lower.includes('who are you') || lower.includes('what are you') || lower.includes('what is your name') ||
    lower.includes('who made you') || lower.includes('who built you') || lower.includes('who created you')
  ) {
    reply = `I am **Salman Khan's AI Representative**! 🤖✨\n\nI was designed to represent Salman's technical portfolio, demonstrate his AI engineering capabilities, and provide an interactive way for recruiters, engineering leads, and clients to explore his work.\n\nI have complete knowledge of his:\n• **15+ Live AI/ML Web Applications**\n• **30+ Autonomous n8n Workflow Automations**\n• **Yellowmatics ML & Data Science Internship**\n• **Published Research in IoT Edge Machine Learning**\n\nFeel free to ask me anything about his skills, projects, or say *"Send Salman an email"* to get in touch!`;
    return { reply, action_card, model: 'Salman AI Brain' };
  }

  // 4. "Tell me a joke" / Humor
  if (lower.includes('joke') || lower.includes('funny') || lower.includes('make me laugh')) {
    const jokes = [
      `Here's an AI developer classic for you! 😄\n\n*Why do neural networks make terrible secret keepers?*\n... Because they're always backpropagating! 🧠💻\n\nNeed to see some real neural network architectures? Ask me about Salman's deep learning projects!`,
      `Here's one! 🤖\n\n*Why did the developer go broke using LLMs?*\n... Because they kept paying for high context windows when all they needed was a single prompt! 💸\n\nSpeaking of optimization, Salman builds latency-optimized AI pipelines with sub-30ms execution. Want to check them out?`,
      `Here you go! 🚀\n\n*There are 10 types of people in the world:*\nThose who understand binary, and those who don't! 😂\n\nWant to see how Salman applies code to real-world AI applications? Just ask!`
    ];
    reply = jokes[Math.floor(Math.random() * jokes.length)];
    return { reply, action_card, model: 'Salman AI Brain' };
  }

  // 5. "Why hire Salman?" / Elevator Pitch / Strengths
  if (
    lower.includes('why hire') || lower.includes('why should') || lower.includes('strengths') ||
    lower.includes('why salman') || lower.includes('pitch') || lower.includes('stand out') || lower.includes('value')
  ) {
    reply = `Here is why **Salman Khan** stands out as a high-impact engineering hire: 🌟\n\n1. **Proven Production Velocity (15+ Shipped AI Apps)**:\n   Unlike theorists, Salman ships end-to-end products—from ATS resume analyzers to multi-agent accreditation engines deployed on Vercel and cloud microservices.\n\n2. **Deep Learning + Modern Agentic AI Mastery**:\n   Solid foundation in PyTorch, TensorFlow, OpenCV, and YOLOv8 computer vision combined with state-of-the-art LLM orchestration (RAG, Function Calling, n8n multi-agent swarms).\n\n3. **Strong Academic & Research Track Record**:\n   Graduated with a stellar **8.72 / 10.0 CGPA** in B.Tech AI & Data Science and has a **published peer-reviewed research paper** on IoT Edge ML anomaly detection.\n\n4. **Industry & Leadership Experience**:\n   Hands-on experience as a Machine Learning Intern at Yellowmatics and Tech Lead for freelance production deployments.\n\nSalman has completed his degree and is ready for **immediate full-time onboarding**. Would you like to review his resume or send him an interview invite?`;
    return { reply, action_card, model: 'Salman AI Brain' };
  }

  // 6. Projects Inquiry & Deep Dives
  if (
    lower.includes('project') || lower.includes('built') || lower.includes('portfolio') ||
    lower.includes('work') || lower.includes('app') || lower.includes('application') ||
    lower.includes('resume builder') || lower.includes('career coach') || lower.includes('course generator') ||
    lower.includes('spark') || lower.includes('finova') || lower.includes('n8n') || lower.includes('naac')
  ) {
    if (lower.includes('resume') || lower.includes('spark') || lower.includes('ats')) {
      reply = `### 📄 AI Resume Builder (Spark)\n**[🔗 Open Live Demo](https://remix-of-ai-resume-spark-main.vercel.app)**\n\n• **Core Purpose:** Empowers candidates to generate ATS-optimized, beautifully formatted resumes in minutes.\n• **Key Features:** Real-time ATS keyword matching, AI content suggestions, multi-template auto-formatting, and instant PDF generation.\n• **Tech Stack:** React, Python FastAPI / Node.js, LLM API integration, Tailwind CSS, deployed on Vercel.\n• **Impact:** Reduces resume crafting time from hours to under 5 minutes with higher ATS passing scores.\n\nWould you like to explore his AI Career Coach or Course Generator next?`;
      return { reply, action_card, model: 'Salman AI Brain' };
    }

    if (lower.includes('career coach') || lower.includes('career')) {
      reply = `### 🎯 AI Career Coach & Path Architect\n**[🔗 Open Live Demo](https://ai-career-coach-full-stack.vercel.app)**\n\n• **Core Purpose:** An intelligent full-stack career advisor that identifies skill gaps and generates tailored learning roadmaps.\n• **Key Features:** Interactive conversational career coaching, resume gap analysis, 8-semester milestone roadmaps, and targeted job role matching.\n• **Tech Stack:** React, Next.js, FastAPI, Transformers, Persistent User Sessions.\n• **Impact:** Provides students and job seekers with clear, actionable career direction instead of generic advice.\n\nWould you like to hear about his AI Interview Simulator or Course Generator?`;
      return { reply, action_card, model: 'Salman AI Brain' };
    }

    if (lower.includes('course') || lower.includes('curriculum')) {
      reply = `### 📚 AI Course Generator\n**[🔗 Open Live Demo](https://project-six-delta-36.vercel.app)**\n\n• **Core Purpose:** Automatically synthesizes comprehensive, modular courses and interactive lesson plans from any topic prompt.\n• **Key Features:** Generates structured syllabi, lesson summaries, quizzes, and self-paced milestone checkpoints.\n• **Tech Stack:** React, Next.js, Gemini / Groq LLMs, Vercel.\n• **Impact:** Enables educators and learners to create full educational curricula in seconds.\n\nShall I tell you about his AI Mock Interview Coach as well?`;
      return { reply, action_card, model: 'Salman AI Brain' };
    }

    if (lower.includes('interview') || lower.includes('mock')) {
      reply = `### 🎙️ AI Mock Interview Coach\n**[🔗 Open Live Demo](https://ai-i-nterview.vercel.app)**\n\n• **Core Purpose:** An NLP-powered interview simulation platform that questions candidates in real-time.\n• **Key Features:** Audio/text response evaluation, confidence and tone assessment, technical accuracy scoring, and actionable improvement tips.\n• **Tech Stack:** React, Web Speech API, NLP Sentiment & Intent Models, Python FastAPI.\n• **Impact:** Helps job candidates build interview confidence through low-stakes, repeatable practice.`;
      return { reply, action_card, model: 'Salman AI Brain' };
    }

    if (lower.includes('n8n') || lower.includes('naac') || lower.includes('nirf') || lower.includes('swarm') || lower.includes('automation')) {
      reply = `### ⚡ Autonomous n8n Multi-Agent Swarms\n\nSalman has engineered **30+ production n8n workflows**, featuring complex multi-agent architectures:\n\n1. **NAAC Accreditation 9-Agent Swarm**:\n   • Uses 9 specialized agents coordinated by a master supervisor to automate document collation, metric scoring, and compliance auditing for college accreditation.\n   • Reduces weeks of manual paperwork to automated batch runs.\n\n2. **NIRF Ranking Automation Agent**:\n   • Gathers data across 10+ college departments to compute the 5 complex NIRF ranking parameters automatically.\n\n3. **AI Internship & Cold Outreach Scraper**:\n   • An automated pipeline that monitors LinkedIn and job boards for specialized Data & AI roles, qualifying leads and preparing outreach.\n\nWould you like to know more about the architecture or his full-stack stack?`;
      return { reply, action_card, model: 'Salman AI Brain' };
    }

    if (lower.includes('security') || lower.includes('iot') || lower.includes('raspberry') || lower.includes('anomaly')) {
      reply = `### 🛡️ ML-Based IoT Smart Home Security System\n*Published Peer-Reviewed Research*\n\n• **Core Purpose:** Real-time edge surveillance system with on-device machine learning for anomaly and intrusion detection.\n• **Tech Stack:** Raspberry Pi 4, Python, OpenCV, YOLO, MQTT Protocol, IoT Sensor Array.\n• **Key Achievement:** Authored and published an academic paper on edge anomaly detection with sub-second alert dispatch.\n\nWould you like to discuss his deep learning skills or other computer vision applications?`;
      return { reply, action_card, model: 'Salman AI Brain' };
    }

    // Default overview of all featured projects
    reply = `Salman has engineered and deployed **15+ production AI applications** and **30+ autonomous agent pipelines**! Here are the flagship highlights:\n\n1. **[AI Resume Builder (Spark)](https://remix-of-ai-resume-spark-main.vercel.app)** — ATS-optimized resume builder with AI suggestions.\n2. **[AI Career Coach](https://ai-career-coach-full-stack.vercel.app)** — Skill gap analysis & 8-semester roadmap generator.\n3. **[AI Course Generator](https://project-six-delta-36.vercel.app)** — Topic-to-course curriculum generator.\n4. **[AI Mock Interview Coach](https://ai-i-nterview.vercel.app)** — Real-time NLP simulation with tone & accuracy feedback.\n5. **[Adaptive Learning Platform](https://coure-brown.vercel.app)** — Intelligent e-learning management.\n6. **NAAC & NIRF 9-Agent Swarm** — Multi-agent institutional compliance engines on n8n.\n7. **ML IoT Home Security** — Published research on Raspberry Pi 4 edge anomaly detection.\n\nWhich project would you like to explore in detail?`;
    return { reply, action_card, model: 'Salman AI Brain' };
  }

  // 7. Skills & Technical Stack
  if (
    lower.includes('skill') || lower.includes('stack') || lower.includes('tech') ||
    lower.includes('pytorch') || lower.includes('python') || lower.includes('react') ||
    lower.includes('fastapi') || lower.includes('yolo') || lower.includes('opencv') ||
    lower.includes('rag') || lower.includes('llm') || lower.includes('tools')
  ) {
    reply = `Salman's technical competencies span deep learning, modern LLMs, and high-performance full-stack architectures:\n\n• **🧠 Deep Learning & Computer Vision:**\n  PyTorch, TensorFlow, OpenCV, YOLOv8 (object detection), CNNs, Anomaly Detection.\n\n• **🤖 LLMs, Agents & RAG:**\n  Prompt Engineering, Function Calling, Multi-Agent Swarms, n8n Orchestration (30+ workflows), Gemini, Qwen, GPT-4o, Claude.\n\n• **💻 Full-Stack Web Development:**\n  React.js, Vite, Next.js, Node.js, Python FastAPI, Express, REST APIs, Tailwind CSS, HTML5/CSS3.\n\n• **🗄️ Databases & Cloud:**\n  PostgreSQL, Supabase, Firebase, Git/GitHub, Vercel, Docker, Linux.\n\n• **⚙️ Edge AI & IoT:**\n  Raspberry Pi 4, MQTT, Embedded Sensor Integration.\n\n• **📚 Core CS Fundamentals:**\n  Data Structures & Algorithms, OOP, Database Management Systems, Operating Systems.\n\nHe excels at bridging deep learning algorithms with polished, responsive web user interfaces!`;
    return { reply, action_card, model: 'Salman AI Brain' };
  }

  // 8. Experience & Background
  if (
    lower.includes('experience') || lower.includes('intern') || lower.includes('yellowmatics') ||
    lower.includes('strikkerz') || lower.includes('background') || lower.includes('career')
  ) {
    reply = `Here is a summary of Salman's professional experience:\n\n• **Machine Learning & Data Science Intern @ Yellowmatics**:\n  - Developed and trained computer vision and predictive ML models using TensorFlow, PyTorch, and Flask.\n  - Handled the end-to-end ML lifecycle: dataset preprocessing, feature engineering, model training, evaluation, and RESTful API deployment.\n\n• **Freelance Tech & Creative Lead @ Strikkerz Team**:\n  - Led end-to-end full-stack web applications using React.js and modern JavaScript.\n  - Managed UI/UX architectures, cloud deployments on Vercel, and custom client workflows.\n\n• **Published AI Researcher**:\n  - Author of a peer-reviewed research paper on IoT Edge ML anomaly detection on Raspberry Pi 4.\n\n• **Hackathon Finalist**:\n  - Finalist in MSME Hackathon, SAP Hackathon, CATCH 2024 & 2025, and EDU-HACK INSPIRE.\n\nWould you like to see his resume or discuss potential roles?`;
    return { reply, action_card, model: 'Salman AI Brain' };
  }

  // 9. Education & College & CGPA
  if (
    lower.includes('education') || lower.includes('college') || lower.includes('cgpa') ||
    lower.includes('degree') || lower.includes('b.tech') || lower.includes('marks') || lower.includes('university')
  ) {
    reply = `### 🎓 Salman's Academic Credentials\n\n• **Degree:** B.Tech in Artificial Intelligence & Data Science (Completed / Graduated 3 months ago)\n• **Institution:** Mahendra Engineering College, Tamil Nadu, India\n• **CGPA:** **8.72 / 10.0** (Top Academic Tier)\n• **Key Coursework:** Deep Learning, Machine Learning, Computer Vision, Natural Language Processing, Data Structures & Algorithms, Database Systems, Cloud Computing.\n• **Extracurriculars:** Event Core Member of AInnovat Innovators Club & Anti-Ragging Campaign Leader.\n\nSalman has successfully graduated and is available for immediate full-time onboarding!`;
    return { reply, action_card, model: 'Salman AI Brain' };
  }

  // 10. Resume / CV Request
  if (lower.includes('resume') || lower.includes('cv') || lower.includes('download')) {
    reply = `### 📄 Salman Khan's Official Resume\n\nYou can view and download his verified PDF resume here:\n\n🔗 **[View & Download Salman Khan's PDF Resume](https://drive.google.com/file/d/1wTKMmKdFuPWwoiJqUITRqckhVwdTBYDn/view)**\n\n**Highlights Included:**\n• Graduated with 8.72 CGPA in B.Tech AI & Data Science\n• Machine Learning Internship at Yellowmatics\n• 15+ Production AI Applications & 30+ n8n Workflows\n• Published IoT Edge ML Research Paper\n\nWould you like to send him an email or invite him for an interview?`;
    return { reply, action_card, model: 'Salman AI Brain' };
  }

  // 11. Polite Thank You / Goodbye
  if (lower.includes('thank') || lower.includes('thanks') || lower.includes('appreciate') || lower.includes('awesome') || lower.includes('great')) {
    const thankResponses = [
      "You're very welcome! 😊 It's my absolute pleasure. If there's anything else about Salman's projects, skills, or if you'd like to get in touch with him, just let me know!",
      "Glad I could help! 🚀 Salman is always excited to connect with new teams and collaborators. Let me know if you want to drop him a message!",
      "Happy to assist! 🌟 Feel free to ask more questions or say *'Send Salman an email'* whenever you're ready."
    ];
    reply = thankResponses[Math.floor(Math.random() * thankResponses.length)];
    return { reply, action_card, model: 'Salman AI Brain' };
  }

  if (lower.includes('bye') || lower.includes('goodbye') || lower.includes('see you') || lower.includes('cya')) {
    reply = `Goodbye! 👋 Thank you for visiting Salman Khan's portfolio. Don't hesitate to reach out via email at \`${primaryEmail}\` or explore his live AI applications anytime! Have a fantastic day! 🌟`;
    return { reply, action_card, model: 'Salman AI Brain' };
  }

  // 12. Context-Aware Fallback
  reply = `I understand you're asking about: *"${text}"*.\n\nAs Salman Khan's AI Representative, here is what I can share:\n• **Engineering Profile:** Salman is a recently graduated B.Tech AI & Data Science engineer (CGPA: 8.72) with 15+ production AI applications and 30+ autonomous n8n workflows.\n• **Technical Strengths:** Deep Learning (PyTorch, YOLO, OpenCV), LLM Orchestration, and Full-Stack React/FastAPI architectures.\n• **Direct Contact:** If you have a specific inquiry, opportunity, or custom project in mind, I can help you transmit a message directly to Salman's inbox (\`${primaryEmail}\`).\n\nWould you like to explore his **featured projects**, review his **skills**, or **send him an email**?`;

  return { reply, action_card, model: 'Salman AI Brain' };
}

/**
 * Main Unified Chat Router:
 * 1. Localhost: Local Offline GPU LLM (Ollama - Qwen 2.5) -> ZERO API KEYS!
 * 2. Vercel / Cloud: Serverless Function (/api/chat) & Gemini
 * 3. Grounded Semantic Conversational Brain
 */
export async function getAIChatResponse(userMessage, history = [], userContact = {}) {
  const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : (typeof process !== 'undefined' && process.env ? process.env : {});
  const geminiKey = env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY;
  const backendUrl = env.VITE_AI_BACKEND_URL || 'http://127.0.0.1:8000';

  // Extract contact info if present in message
  const { name: extractedName, email: extractedEmail } = extractContactEntities(userMessage);
  const contactState = {
    name: extractedName || userContact.name || '',
    email: extractedEmail || userContact.email || ''
  };

  // Check if message requires email action card
  const lower = userMessage.toLowerCase();
  const wantsEmail = (
    lower.includes('email') || lower.includes('mail') || lower.includes('hire') ||
    lower.includes('contact') || lower.includes('message') || lower.includes('reach out') ||
    lower.includes('connect with salman') || lower.includes('schedule')
  );

  let emailActionCard = null;
  if (wantsEmail) {
    let subject = "Inquiry regarding AI Engineering / Opportunities for Salman";
    if (lower.includes('hire') || lower.includes('job') || lower.includes('role') || lower.includes('recruiter') || lower.includes('interview')) {
      subject = "Engineering Role Opportunity for Salman Khan";
    } else if (lower.includes('freelance') || lower.includes('project') || lower.includes('consulting') || lower.includes('collab')) {
      subject = "AI Project Collaboration / Consulting Inquiry for Salman";
    }

    emailActionCard = {
      action_required: "USER_CONFIRMATION",
      action_type: "email_confirmation",
      recipient: "samitha0786@gmail.com",
      subject: subject,
      message: `Hi Salman,\n\nI reviewed your portfolio and would like to connect regarding: "${userMessage}".`,
      sender_name: contactState.name,
      sender_email: contactState.email
    };
  }

  // 1. Try Render FastAPI Backend FIRST (primary AI source — works on all environments)
  try {
    const backendRes = await queryBackendAPI(userMessage, history, backendUrl);
    if (backendRes && backendRes.text) {
      return {
        reply: backendRes.text,
        tool_call: backendRes.tool_call,
        action_card: backendRes.action_card || emailActionCard,
        model: backendRes.model
      };
    }
  } catch (e) {
    // Backend offline or cold-starting — continue to next tier
  }

  // 2. Try Direct Gemini API (if key is set in .env / Vercel env vars)
  if (geminiKey && geminiKey.trim() !== '' && geminiKey !== 'YOUR_GEMINI_API_KEY') {
    try {
      const geminiRes = await queryGeminiAPI(userMessage, history, geminiKey);
      if (geminiRes && geminiRes.text) {
        return {
          reply: geminiRes.text,
          tool_call: null,
          action_card: emailActionCard,
          model: geminiRes.model
        };
      }
    } catch (e) {
      // Gemini offline
    }
  }

  // 3. Localhost only: try local Ollama GPU LLM
  if (isLocalhostEnv()) {
    try {
      const localRes = await queryLocalOllama(userMessage, history);
      if (localRes && localRes.text) {
        return {
          reply: localRes.text,
          tool_call: null,
          action_card: emailActionCard,
          model: localRes.model
        };
      }
    } catch (e) {
      // Local Ollama not running
    }
  }

  // 4. Grounded Semantic Neural Brain (100% Reliable Offline/Online fallback)
  return generateSemanticResponse(userMessage, history, contactState);
}
