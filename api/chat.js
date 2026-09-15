// Vercel Serverless Function: /api/chat
// Provides server-side AI conversation for public visitors on Vercel deployments

const SYSTEM_KNOWLEDGE = `### CONTEXT ABOUT THIS PORTFOLIO OWNER:
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
Always speak warmly, conversationally, concisely, and accurately in first-person representative voice ("Salman...", "He...", "We...").
Answer visitor questions directly and naturally. Never output generic robotic boilerplate.`;

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const groqApiKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (groqApiKey) {
    const formattedMessages = [{ role: 'system', content: SYSTEM_KNOWLEDGE }];
    if (Array.isArray(history)) {
      for (const h of history.slice(-6)) {
        formattedMessages.push({
          role: h.role === 'assistant' ? 'assistant' : 'user',
          content: h.content || ''
        });
      }
    }
    formattedMessages.push({ role: 'user', content: message });

    const groqModels = ['qwen/qwen3.8-27b', 'groq/compound', 'openai/gpt-oss-120b'];
    for (const model of groqModels) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${groqApiKey.trim()}`
          },
          body: JSON.stringify({
            model: model,
            messages: formattedMessages,
            temperature: 0.7,
            max_tokens: 500
          })
        });

        if (response.ok) {
          const data = await response.json();
          const replyText = data.choices?.[0]?.message?.content;
          if (replyText) {
            return res.status(200).json({
              reply: replyText.trim(),
              model: `Groq Cloud (${model})`
            });
          }
        }
      } catch (err) {
        // Try next
      }
    }
  }

  if (apiKey) {
    const formattedContents = [];
    if (Array.isArray(history)) {
      for (const h of history.slice(-6)) {
        if (h.role === 'user') {
          formattedContents.push({ role: 'user', parts: [{ text: h.content }] });
        } else if (h.role === 'assistant' && h.content) {
          formattedContents.push({ role: 'model', parts: [{ text: h.content }] });
        }
      }
    }
    formattedContents.push({ role: 'user', parts: [{ text: message }] });

    const models = ['gemini-2.0-flash', 'gemini-1.5-flash'];
    for (const model of models) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_KNOWLEDGE }] },
            contents: formattedContents,
            generationConfig: { temperature: 0.7, maxOutputTokens: 500, topP: 0.95 }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            return res.status(200).json({
              reply: candidateText.trim(),
              model: `Google Gemini (${model})`
            });
          }
        }
      } catch (err) {
        console.error(`Error with model ${model}:`, err);
      }
    }
  }

  // Fallback if no Gemini key on Vercel
  return res.status(200).json({
    reply: `Hello! 👋 I'm Salman Khan's AI Representative.\n\nSalman is a B.Tech AI & Data Science graduate (recently completed degree with 8.72 CGPA) with 15+ production AI applications and 30+ autonomous n8n workflows.\n\nFeel free to ask about his **featured projects**, **PyTorch/Deep Learning skills**, **Yellowmatics internship**, or say *"Send Salman an email"* to connect directly!`,
    model: 'Salman Cloud AI'
  });
}
