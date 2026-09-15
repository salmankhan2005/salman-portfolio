/**
 * Salman Khan Portfolio — Intelligent Conversational AI Engine
 * 
 * Multi-Tier AI Architecture (priority order):
 * 1. Render FastAPI Backend (https://salman-portfolio-ai-backend.onrender.com)
 * 2. Google Gemini API (if VITE_GEMINI_API_KEY is set)
 * 3. Local Ollama GPU LLM (ONLY on localhost dev environment)
 * 4. Grounded Conversational Semantic Brain (100% Reliable Offline/Online fallback)
 */

// ==============================================================================
// 🛡️ SECURITY GUARDRAILS & DATA PRIVACY ENGINE
// ==============================================================================

// Input Guardrails: Detect prompt injection / jailbreaks
export function applyInputGuardrails(userQuery) {
  const text = userQuery.trim();
  const lower = text.toLowerCase();

  // Jailbreak & System Override Protection
  const injectionPatterns = [
    /ignore (all|previous|system) (instructions|prompts|rules)/i,
    /disregard system (prompt|instructions)/i,
    /you are now (an?|in) (unrestricted|jailbroken|dan|developer mode)/i,
    /reveal (your|the) (secret|system prompt|api key|source code)/i
  ];

  for (const pattern of injectionPatterns) {
    if (pattern.test(lower)) {
      return {
        safe: false,
        reason: "Security Guardrail Triggered: System override attempts are blocked.",
        fallbackResponse: "As Salman Khan's AI Representative, I strictly follow engineering guardrails and portfolio scope. How can I assist you with Salman's projects or skills?"
      };
    }
  }

  return { safe: true, text: text };
}

// Output Guardrails: Ensure responses remain bounded within portfolio scope
export function applyOutputGuardrails(responseText) {
  if (!responseText || typeof responseText !== 'string') return responseText;
  let cleaned = responseText.trim();
  // Ensure model does not hallucinate non-existent actor identities
  cleaned = cleaned.replace(/Bollywood actor/gi, "AI Engineer");
  return cleaned;
}

// ==============================================================================
// 📚 RAG RETRIEVAL-AUGMENTED GENERATION ENGINE (Modular Privacy Chunks)
// ==============================================================================

const RAG_KNOWLEDGE_MODULES = {
  bio: `NAME & EDUCATION: Salman Khan D, B.Tech in AI & Data Science from Mahendra Engineering College (CGPA: 8.72 / 10.0, completed degree recently 3 months ago). Location: Tamil Nadu, India. Open for immediate onboarding. Contact: samitha0786@gmail.com, +91 93422 98949.`,
  
  projects: `TOP AI PROJECTS:
1. AI Resume Builder (Spark): ATS-optimized resume builder with AI suggestions (https://remix-of-ai-resume-spark-main.vercel.app).
2. AI Career Coach: Skill gap analysis platform with 8-semester roadmaps (https://ai-career-coach-full-stack.vercel.app).
3. AI Course Generator: Modular syllabus generator with interactive lessons (https://project-six-delta-36.vercel.app).
4. AI Mock Interview Coach: NLP interview simulator with feedback (https://ai-i-nterview.vercel.app).
5. NAAC/NIRF 9-Agent Swarms: Multi-agent compliance engines on n8n (sub-30ms execution).
6. Edge Security: Published research paper on Raspberry Pi 4 ML anomaly detection.`,

  skills: `TECHNICAL STACK:
• Deep Learning & CV: PyTorch, TensorFlow, OpenCV, YOLOv8 object detection, CNNs, Anomaly Detection.
• LLMs & Agents: Prompt engineering, Function Calling, RAG, n8n Orchestration (30+ workflows).
• Full-Stack: React.js, Vite, Next.js, Node.js, Python FastAPI, PostgreSQL, Supabase, Tailwind CSS.`,

  experience: `PROFESSIONAL EXPERIENCE:
• Machine Learning Intern @ Yellowmatics: Trained predictive ML and Computer Vision models using PyTorch & Flask.
• Freelance Tech Lead @ Strikkerz Team: Led React full-stack applications, UI/UX systems, Vercel deployments.
• Published AI Researcher: Author of peer-reviewed paper on IoT Edge ML anomaly detection on Raspberry Pi 4.`
};

// RAG Retriever: Selects ONLY the relevant knowledge chunks for the user prompt
export function retrieveRAGContext(userQuery) {
  const lower = userQuery.toLowerCase();
  const selectedModules = [];

  // Default always includes basic bio
  selectedModules.push(RAG_KNOWLEDGE_MODULES.bio);

  if (
    lower.includes('project') || lower.includes('built') || lower.includes('work') ||
    lower.includes('app') || lower.includes('spark') || lower.includes('n8n') ||
    lower.includes('resume') || lower.includes('career') || lower.includes('course') || lower.includes('interview')
  ) {
    selectedModules.push(RAG_KNOWLEDGE_MODULES.projects);
  }

  if (
    lower.includes('skill') || lower.includes('stack') || lower.includes('tech') ||
    lower.includes('pytorch') || lower.includes('python') || lower.includes('react') ||
    lower.includes('fastapi') || lower.includes('yolo') || lower.includes('opencv') || lower.includes('rag')
  ) {
    selectedModules.push(RAG_KNOWLEDGE_MODULES.skills);
  }

  if (
    lower.includes('experience') || lower.includes('intern') || lower.includes('yellowmatics') ||
    lower.includes('strikkerz') || lower.includes('paper') || lower.includes('research')
  ) {
    selectedModules.push(RAG_KNOWLEDGE_MODULES.experience);
  }

  return selectedModules.join("\n\n");
}

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

// 1. Local Offline GPU LLM Direct Client (uses downloaded Qwen 2.5)
async function queryLocalOllama(userMessage, history, customUrl = null) {
  const endpoints = customUrl 
    ? [`${customUrl}/api/chat`]
    : isLocalhostEnv()
      ? ['/ollama-api/api/chat', 'http://127.0.0.1:11434/api/chat', 'http://localhost:11434/api/chat']
      : [];

  if (endpoints.length === 0) return null;

  const ragContext = retrieveRAGContext(userMessage);
  const systemPrompt = `You are Salman Khan D's personal, intelligent AI Representative on his engineering portfolio website.\n\nRELEVANT RAG KNOWLEDGE:\n${ragContext}`;

  const messages = [{ role: 'system', content: systemPrompt }];
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

  for (const endpoint of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'bypass-tunnel-reminder': 'true',
          'Bypass-Tunnel-Reminder': 'true'
        },
        signal: controller.signal,
        body: payload
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const content = data.message?.content?.trim();
        if (content && content.length > 5) {
          return { text: applyOutputGuardrails(content), model: 'Qwen 2.5 (Local GPU LLM)' };
        }
      }
    } catch (err) {
      // Try next endpoint
    }
  }
  return null;
}

// 2. Groq Cloud Ultra-Fast LLM API Client (Qwen 3.8 / Llama 3) with RAG & Privacy Guardrails
async function queryGroqAPI(userMessage, history, apiKey) {
  const ragContext = retrieveRAGContext(userMessage);
  const systemPrompt = `You are Salman Khan D's personal, intelligent AI Representative on his engineering portfolio website.\n\nRELEVANT RAG KNOWLEDGE:\n${ragContext}`;

  const formattedMessages = [{ role: 'system', content: systemPrompt }];
  
  if (history && history.length > 0) {
    for (const h of history.slice(-6)) {
      formattedMessages.push({
        role: h.role === 'assistant' ? 'assistant' : 'user',
        content: h.content || ''
      });
    }
  }
  formattedMessages.push({ role: 'user', content: userMessage });

  const models = ['qwen/qwen3.8-27b', 'groq/compound', 'openai/gpt-oss-120b'];
  
  for (const model of models) {
    try {
      const endpoint = 'https://api.groq.com/openai/v1/chat/completions';
      const payload = {
        model: model,
        messages: formattedMessages,
        temperature: 0.65,
        max_tokens: 450
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.trim()}`
        },
        signal: controller.signal,
        body: JSON.stringify(payload)
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content?.trim();
        if (content && content.length > 5) {
          return {
            text: applyOutputGuardrails(content),
            model: `Groq Cloud (${model})`
          };
        }
      }
    } catch (e) {
      // Try next model
    }
  }
  return null;
}

// 3. Render FastAPI Backend Client (primary cloud AI source)
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
// Query Vercel Serverless Function (/api/chat - reads GROQ_API_KEY securely on Vercel server)
async function queryVercelAPI(userMessage, history) {
  if (isLocalhostEnv()) return null;
  try {
    const historyPayload = (history || []).slice(-6).map(m => ({
      role: m.role,
      content: m.content
    }));

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        message: userMessage,
        history: historyPayload
      })
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.reply) {
        return {
          text: data.reply,
          tool_call: data.tool_call || null,
          action_card: data.action_card || null,
          model: data.model || 'Vercel Serverless AI'
        };
      }
    }
  } catch (err) {
    // Vercel serverless unavailable
  }
  return null;
}

export async function getAIChatResponse(userMessage, history = [], userContact = {}) {
  // 🛡️ Security Guardrails Check
  const guardrailCheck = applyInputGuardrails(userMessage);
  if (!guardrailCheck.safe) {
    return {
      reply: guardrailCheck.fallbackResponse,
      tool_call: null,
      action_card: null,
      model: 'Security Guardrail'
    };
  }

  const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : (typeof process !== 'undefined' && process.env ? process.env : {});
  const groqKey = env.VITE_GROQ_API_KEY || env.GROQ_API_KEY;
  const geminiKey = env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY;
  const backendUrl = env.VITE_AI_BACKEND_URL || 'http://127.0.0.1:8000';
  const qwenTunnelUrl = env.VITE_QWEN_TUNNEL_URL || env.VITE_QWEN_URL;

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

  // 1. If on deployed Vercel site, Query Vercel Serverless Function (/api/chat) FIRST
  if (!isLocalhostEnv()) {
    try {
      const vercelRes = await queryVercelAPI(userMessage, history);
      if (vercelRes && vercelRes.text) {
        return {
          reply: vercelRes.text,
          tool_call: vercelRes.tool_call,
          action_card: vercelRes.action_card || emailActionCard,
          model: vercelRes.model
        };
      }
    } catch (e) {
      // Vercel serverless unavailable
    }
  }

  // 2. Try Groq Cloud Ultra-Fast LLM API
  if (groqKey && groqKey.trim() !== '') {
    try {
      const groqRes = await queryGroqAPI(userMessage, history, groqKey);
      if (groqRes && groqRes.text) {
        return {
          reply: groqRes.text,
          tool_call: null,
          action_card: emailActionCard,
          model: groqRes.model
        };
      }
    } catch (e) {
      // Groq offline — fall through
    }
  }

  // 1. Try FastAPI Backend (http://127.0.0.1:8000/api/chat or Render) FIRST
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
    // Backend offline — try direct Ollama
  }

  // 2. Localhost Environment: Query Local Downloaded Qwen 2.5 GPU LLM directly
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
      // Local Ollama offline
    }
  }

  // 2. Query Render FastAPI Backend
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
