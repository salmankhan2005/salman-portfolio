import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, X, Send, Sparkles, Terminal, RotateCcw, 
  ExternalLink, Mail, CheckCircle, AlertCircle, Bot, User, ArrowRight
} from 'lucide-react';
import emailjs from '@emailjs/browser';

const BACKEND_URL = 'http://127.0.0.1:8000';

const INITIAL_MESSAGE = {
  id: 'init-1',
  role: 'assistant',
  content: `👋 Hello! I'm Salman Khan's AI Assistant, powered by an open-source neural model.\n\nI can walk you through his **production AI applications**, discuss his **deep learning and agentic systems**, or help you connect with him directly for engineering roles and collaborations.\n\nWhat would you like to explore today?`,
  tool_call: null,
  action_card: null,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

const SUGGESTIONS = [
  "What projects has Salman built?",
  "What are his core AI & ML skills?",
  "Tell me about his experience",
  "Send Salman an email",
  "Where can I get his resume?"
];

export default function ChatBot({ onShowToast }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [backendOnline, setBackendOnline] = useState(false);
  const [modelName, setModelName] = useState('FunctionGemma 270M');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // EmailJS Configuration from .env
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const PRIMARY_EMAIL = import.meta.env.VITE_CONTACT_RECEIVER_EMAIL || 'samitha0786@gmail.com';

  // Check Backend Health
  useEffect(() => {
    async function checkHealth() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/health`, { method: 'GET' });
        if (res.ok) {
          const data = await res.json();
          setBackendOnline(true);
          if (data.model_loaded) {
            setModelName(`FunctionGemma 270M (${data.device?.toUpperCase() || 'CUDA'})`);
          }
        } else {
          setBackendOnline(false);
        }
      } catch (err) {
        setBackendOnline(false);
      }
    }
    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  const [userContact, setUserContact] = useState(() => ({
    name: localStorage.getItem('sk_visitor_name') || '',
    email: localStorage.getItem('sk_visitor_email') || ''
  }));

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Handle User Message Submission
  async function handleSendMessage(overrideText = null) {
    const textToSend = (overrideText || inputText).trim();
    if (!textToSend || isLoading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Check if user is confirming a pending email draft by typing "send", "send it", "confirm", "send mail", etc.
    const lower = textToSend.toLowerCase();
    const confirmKeywords = [
      'send', 'send it', 'send email', 'send mail', 'confirm', 'yes send', 'yes please',
      'send now', 'transmit', 'send the mail', 'send the email', 'please send', 'mail it',
      'send to salman', 'send this', 'send message'
    ];
    const isConfirmSend = confirmKeywords.some(kw => lower === kw || lower.startsWith(kw + ' ') || lower.endsWith(' ' + kw));
    const pendingMsg = [...messages].reverse().find(m => m.action_card && !m.action_card.sent && !m.action_card.cancelled);

    if (pendingMsg) {
      // Check if user provided email or name in this message
      const emailMatch = textToSend.match(/[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/);
      const nameMatch = textToSend.match(/(?:from|name is|i am|i'm)\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)/i);

      let updatedName = pendingMsg.action_card.sender_name || userContact.name || '';
      let updatedEmail = pendingMsg.action_card.sender_email || userContact.email || '';

      if (emailMatch) {
        updatedEmail = emailMatch[0];
        setUserContact(prev => ({ ...prev, email: updatedEmail }));
        localStorage.setItem('sk_visitor_email', updatedEmail);
      }
      if (nameMatch) {
        updatedName = nameMatch[1];
        setUserContact(prev => ({ ...prev, name: updatedName }));
        localStorage.setItem('sk_visitor_name', updatedName);
      }

      // Update the pending action card with any newly discovered details
      if (emailMatch || nameMatch) {
        setMessages(prev => prev.map(m => {
          if (m.id === pendingMsg.id) {
            return {
              ...m,
              action_card: {
                ...m.action_card,
                sender_name: updatedName,
                sender_email: updatedEmail,
                error: null
              }
            };
          }
          return m;
        }));
      }

      if (isConfirmSend) {
        const card = {
          ...pendingMsg.action_card,
          sender_name: updatedName,
          sender_email: updatedEmail
        };

        if (card.sender_email && card.sender_name) {
          handleConfirmEmail(card, pendingMsg.id);
          return;
        } else {
          // Guide the user specifically
          const botGuidance = {
            id: `bot-guide-${Date.now()}`,
            role: 'assistant',
            content: `I have your email draft ready for Salman Khan! 📬\n\nPlease fill in your **Name** and **Email address** in the card above (or reply here: *"My name is [Your Name], my email is [Your Email]"*) so Salman knows who to reply to, then click **Confirm & Send Email**.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, botGuidance]);
          return;
        }
      }
    }

    setIsLoading(true);

    try {
      // 1. Try Backend API
      const historyPayload = messages.slice(-6).map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload
        })
      });

      if (res.ok) {
        const data = await res.json();
        let card = data.action_card;
        if (card) {
          // Pre-fill with saved contact or extracted contact
          if (!card.sender_name && userContact.name) card.sender_name = userContact.name;
          if (!card.sender_email && userContact.email) card.sender_email = userContact.email;
          if (card.sender_name) {
            setUserContact(prev => ({ ...prev, name: card.sender_name }));
            localStorage.setItem('sk_visitor_name', card.sender_name);
          }
          if (card.sender_email) {
            setUserContact(prev => ({ ...prev, email: card.sender_email }));
            localStorage.setItem('sk_visitor_email', card.sender_email);
          }
        }

        streamBotMessage(data.reply, data.tool_call, card);
        return;
      }
      throw new Error("Backend response error");
    } catch (err) {
      console.warn("Backend chat unavailable, using built-in client fallback:", err);
      // Fallback Client Orchestrator
      handleClientFallback(textToSend);
    }
  }

  // Stream assistant message with typewriter effect
  function streamBotMessage(fullText, toolCall = null, actionCard = null) {
    const msgId = `bot-${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [
      ...prev,
      {
        id: msgId,
        role: 'assistant',
        content: '',
        isTyping: true,
        tool_call: toolCall,
        action_card: null,
        timestamp
      }
    ]);
    setIsLoading(false);

    // Stream words progressively
    const words = fullText.split(' ');
    let wordIdx = 0;
    let accumulated = '';

    const streamInterval = setInterval(() => {
      if (wordIdx < words.length) {
        const nextWords = words.slice(wordIdx, wordIdx + 2).join(' ');
        accumulated += (accumulated ? ' ' : '') + nextWords;
        wordIdx += 2;

        setMessages(prev => prev.map(m => {
          if (m.id === msgId) {
            return { ...m, content: accumulated };
          }
          return m;
        }));
      } else {
        clearInterval(streamInterval);
        setMessages(prev => prev.map(m => {
          if (m.id === msgId) {
            return {
              ...m,
              content: fullText,
              isTyping: false,
              action_card: actionCard
            };
          }
          return m;
        }));
      }
    }, 30);
  }

  // Client Fallback if backend is warming up
  function handleClientFallback(text) {
    const t = text.toLowerCase();
    let reply = "";
    let action_card = null;

    // Extract email or name if present in text
    const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
    const nameMatch = text.match(/(?:from|name is|i am|i'm)\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)/i);
    const extractedEmail = emailMatch ? emailMatch[0] : userContact.email;
    const extractedName = nameMatch ? nameMatch[1] : userContact.name;

    if (t.includes('email') || t.includes('hire') || t.includes('contact') || t.includes('message') || t.includes('reach out')) {
      action_card = {
        action_required: "USER_CONFIRMATION",
        action_type: "email_confirmation",
        recipient: PRIMARY_EMAIL,
        subject: "Inquiry regarding AI Engineering / Opportunities for Salman",
        message: `Hi Salman,\n\nI reviewed your portfolio and would like to discuss an opportunity regarding: "${text}".`,
        sender_name: extractedName || "",
        sender_email: extractedEmail || ""
      };
      reply = `I would be thrilled to help you connect with Salman! 📬\n\nSalman is actively open to **full-time AI Engineer**, **ML**, and **Full-Stack** roles.\n\nI've prepared a direct message preview below. Fill in your details and click **🚀 Confirm & Send Email** to send your note straight to his inbox (\`${PRIMARY_EMAIL}\`).`;
    } else if (t.includes('project') || t.includes('built') || t.includes('app') || t.includes('spark') || t.includes('coach')) {
      reply = `Salman has engineered over **15 production AI applications** and **30+ autonomous agent workflows**! Here are the core highlights you can explore:\n\n• **[AI Resume Builder (Spark)](https://remix-of-ai-resume-spark-main.vercel.app)**: Real-time ATS resume scoring with dynamic AI suggestions.\n• **[AI Career Coach](https://ai-career-coach-full-stack.vercel.app)**: Skill gap analysis platform with personalized learning roadmaps.\n• **[AI Course Generator](https://project-six-delta-36.vercel.app)**: Generates structured modular syllabi and interactive lesson content.\n• **30+ Autonomous n8n Agents**: Institutional accreditation pipelines (NAAC & NIRF) and lead qualification.\n\nWhich of these would you like to explore further?`;
    } else if (t.includes('skill') || t.includes('stack') || t.includes('tech') || t.includes('pytorch')) {
      reply = `Salman's engineering stack spans deep learning, modern LLMs, and high-performance full-stack web architectures:\n\n• **Deep Learning & CV:** PyTorch, TensorFlow, OpenCV, YOLO object detection.\n• **LLMs & Multi-Agent:** FunctionGemma, GPT-4o, Claude 3.5, RAG architectures, n8n orchestration.\n• **Full-Stack:** React.js, Vite, Node.js, Python FastAPI, RESTful microservices.\n• **Edge & IoT:** Raspberry Pi 4, edge AI anomaly detection.\n\nHe specializes in turning complex deep learning models into production-grade software.`;
    } else if (t.includes('resume') || t.includes('cv')) {
      reply = `Salman's official verified resume is available for review:\n\n🔗 **[View & Download Salman's Official PDF Resume](https://drive.google.com/file/d/1wTKMmKdFuPWwoiJqUITRqckhVwdTBYDn/view)**\n\nIt highlights his 8.72 CGPA in B.Tech AI & Data Science, ML internship at Yellowmatics, and his 15+ production applications. Let me know if you'd like to reach out to him directly!`;
    } else if (t.includes('experience') || t.includes('intern')) {
      reply = `Here is an overview of Salman's industry background:\n\n• **Machine Learning Intern at Yellowmatics:** Trained and optimized predictive ML models and CV pipelines using PyTorch and Flask for real-time inference.\n• **Freelance Tech Lead at Strikkerz Team:** Led full-stack client applications, React architectures, and workflow automations.\n• **Published AI Researcher:** Author of an academic publication on ML-based IoT anomaly detection.\n\nWould you like to discuss potential roles or project collaborations?`;
    } else {
      reply = `Hello! 👋 I'm Salman Khan's AI representative.\n\nSalman is a final-year B.Tech AI & Data Science engineer (CGPA: 8.72) with 15+ production AI applications and 30+ autonomous n8n workflows. He is actively seeking full-time AI Engineer and developer roles.\n\nFeel free to ask about his projects, deep learning stack, or say *"Send Salman an email"* to get in touch directly!`;
    }

    setTimeout(() => {
      streamBotMessage(reply, null, action_card);
    }, 350);
  }

  // Handle Email Card Dispatch via EmailJS + Server logging
  async function handleConfirmEmail(cardData, msgId) {
    if (!cardData.sender_email || !cardData.sender_name) {
      setMessages(prev => prev.map(m => {
        if (m.id === msgId) {
          return {
            ...m,
            action_card: {
              ...m.action_card,
              error: "Please enter your Name and Email address in the fields above."
            }
          };
        }
        return m;
      }));
      if (onShowToast) onShowToast("Please enter your name and email address to send.");
      return;
    }

    // Save contact info for future use
    setUserContact({ name: cardData.sender_name, email: cardData.sender_email });
    localStorage.setItem('sk_visitor_name', cardData.sender_name);
    localStorage.setItem('sk_visitor_email', cardData.sender_email);

    // Mark card transmitting state
    setMessages(prev => prev.map(m => {
      if (m.id === msgId) {
        return { ...m, action_card: { ...m.action_card, sending: true, error: null } };
      }
      return m;
    }));

    const templateParams = {
      subject: cardData.subject || `Inquiry from ${cardData.sender_name} via AI Assistant`,
      name: cardData.sender_name,
      from_name: cardData.sender_name,
      email: cardData.sender_email,
      from_email: cardData.sender_email,
      scope: 'AI Assistant Inbound Dispatch',
      engagement_scope: 'AI Assistant Inbound Dispatch',
      message: cardData.message,
      to_email: PRIMARY_EMAIL,
      reply_to: cardData.sender_email
    };

    try {
      if (serviceId && templateId && publicKey) {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
        if (autoReplyTemplateId) {
          emailjs.send(serviceId, autoReplyTemplateId, templateParams, publicKey).catch(() => {});
        }
      }

      // Also notify backend logger asynchronously if online
      fetch(`${BACKEND_URL}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to_email: PRIMARY_EMAIL,
          from_name: cardData.sender_name,
          from_email: cardData.sender_email,
          subject: cardData.subject || `Inquiry from ${cardData.sender_name} via AI Assistant`,
          message: cardData.message
        })
      }).catch(() => {});

      // Update card to sent
      setMessages(prev => [
        ...prev.map(m => {
          if (m.id === msgId) {
            return {
              ...m,
              action_card: { ...m.action_card, sending: false, sent: true }
            };
          }
          return m;
        }),
        {
          id: `bot-sent-${Date.now()}`,
          role: 'assistant',
          content: `✅ **Email Successfully Sent to Salman Khan!**\n\n• **Recipient:** \`${PRIMARY_EMAIL}\`\n• **From:** \`${cardData.sender_name} <${cardData.sender_email}>\`\n• **Subject:** *${cardData.subject}*\n\nYour message was successfully transmitted via SMTP gateway. Salman receives instant notification and will reply to \`${cardData.sender_email}\` within 24 hours.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      if (onShowToast) onShowToast("✓ Email successfully transmitted to Salman Khan!");
    } catch (err) {
      console.error("EmailJS dispatch failed:", err);
      setMessages(prev => prev.map(m => {
        if (m.id === msgId) {
          return {
            ...m,
            action_card: { ...m.action_card, sending: false, error: "Transmission error. You can also click 'Open in Mail App ↗' below." }
          };
        }
        return m;
      }));
      if (onShowToast) onShowToast("Transmission issue. You can use 'Open in Mail App ↗'.");
    }
  }

  function handleCancelEmail(msgId) {
    setMessages(prev => prev.map(m => {
      if (m.id === msgId) {
        return {
          ...m,
          action_card: { ...m.action_card, cancelled: true }
        };
      }
      return m;
    }));
  }

  function handleUpdateEmailDraft(msgId, field, val) {
    setMessages(prev => prev.map(m => {
      if (m.id === msgId && m.action_card) {
        return {
          ...m,
          action_card: { ...m.action_card, [field]: val }
        };
      }
      return m;
    }));
  }

  function renderFormattedContent(text) {
    // Basic Markdown Parser for headings, bold, bullet points, and links
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="ai-md-h3">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('• ') || line.startsWith('- ')) {
        const itemText = line.replace(/^[•\-]\s*/, '');
        return (
          <div key={idx} className="ai-md-bullet">
            <span className="bullet-dot">•</span>
            <span>{parseInlineMarkdown(itemText)}</span>
          </div>
        );
      }
      if (line.trim() === '') {
        return <div key={idx} style={{ height: '6px' }} />;
      }
      return <p key={idx} className="ai-md-p">{parseInlineMarkdown(line)}</p>;
    });
  }

  function parseInlineMarkdown(str) {
    // Parse links [label](url), bold **text**, inline `code`
    const elements = [];
    let remaining = str;
    let keyIdx = 0;

    const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|`.*?`)/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(str)) !== null) {
      if (match.index > lastIndex) {
        elements.push(str.substring(lastIndex, match.index));
      }
      const matchText = match[0];
      if (matchText.startsWith('[') && matchText.includes('](')) {
        const label = matchText.substring(1, matchText.indexOf(']('));
        const url = matchText.substring(matchText.indexOf('](') + 2, matchText.length - 1);
        elements.push(
          <a key={keyIdx++} href={url} target="_blank" rel="noreferrer" className="ai-md-link">
            {label} <ExternalLink size={11} style={{ display: 'inline', verticalAlign: 'baseline' }} />
          </a>
        );
      } else if (matchText.startsWith('**') && matchText.endsWith('**')) {
        elements.push(<strong key={keyIdx++}>{matchText.substring(2, matchText.length - 2)}</strong>);
      } else if (matchText.startsWith('`') && matchText.endsWith('`')) {
        elements.push(<code key={keyIdx++} className="ai-md-code">{matchText.substring(1, matchText.length - 1)}</code>);
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < str.length) {
      elements.push(str.substring(lastIndex));
    }

    return elements.length > 0 ? elements : str;
  }

  return (
    <>
      {/* 1. Fixed Trigger — Standing Avatar with Wave */}
      <div className="ai-chatbot-trigger-container" id="ai-chatbot-trigger">

        {!isOpen && (
          <div className="ai-avatar-trigger" onClick={() => setIsOpen(true)} title="Chat with Salman's AI">
            {/* Hi speech bubble */}
            <div className="ai-hi-bubble">
              <span>Hi! 👋</span>
            </div>
            {/* Standing character */}
            <div className="ai-avatar-standing">
              <img src="/ai-wave.png" alt="Salman AI" className="ai-avatar-standing-img" />
            </div>
            {/* Online dot */}
            <span className="ai-avatar-online-dot" />
          </div>
        )}

        {isOpen && (
          <button
            className="ai-chatbot-trigger-btn active"
            onClick={() => setIsOpen(false)}
            aria-label="Close AI Assistant"
            title="Close AI Assistant"
          >
            <X size={22} />
          </button>
        )}
      </div>

      {/* 2. Floating Fixed Chat Window at Bottom-Left */}
      {isOpen && (
        <div className="ai-chatbot-window" id="ai-chatbot-window">
          {/* Header */}
          <div className="ai-chatbot-header">
            <div className="header-info">
              <div className="header-title-row">
                <img src="/ai-wave.png" alt="Salman AI" className="header-avatar-img" />
                <span className="header-title">SALMAN AI ORCHESTRATOR</span>
              </div>
              <div className="header-subtitle-row">
                <span className="header-mode-tag">AI Assistant</span>
              </div>
            </div>

            <div className="header-actions">
              <button 
                className="header-action-btn"
                title="Reset conversation"
                onClick={() => setMessages([INITIAL_MESSAGE])}
              >
                <RotateCcw size={15} />
              </button>
              <button 
                className="header-action-btn close"
                title="Close chat"
                onClick={() => setIsOpen(false)}
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Messages Viewport */}
          <div className="ai-chatbot-body">
            {messages.map((msg) => (
              <div key={msg.id} className={`ai-message-row ${msg.role}`}>
                {msg.role === 'assistant' && (
                  <div className="message-avatar bot">
                    <img src="/ai-wave.png" alt="AI" className="msg-avatar-img" />
                  </div>
                )}

                <div className="message-content-wrapper">
                  {/* Message Bubble */}
                  <div className={`ai-message-bubble ${msg.role}`}>
                    {renderFormattedContent(msg.content)}
                    {msg.isTyping && <span className="ai-typing-cursor">▊</span>}
                  </div>

                  {/* Interactive Email Confirmation Card */}
                  {msg.action_card && msg.action_card.action_type === 'email_confirmation' && (
                    <div className="ai-action-card email-card">
                      <div className="card-header">
                        <Mail size={15} className="card-icon" />
                        <span className="card-title">Interactive Email Preview</span>
                      </div>

                      {msg.action_card.sent ? (
                        <div className="email-sent-confirmation">
                          <CheckCircle size={24} className="success-icon" />
                          <div>
                            <strong>Email Transmitted to Salman Khan!</strong>
                            <p>Destination: {msg.action_card.recipient}</p>
                          </div>
                        </div>
                      ) : msg.action_card.cancelled ? (
                        <div className="email-cancelled-notice">
                          <span>Email draft cancelled.</span>
                        </div>
                      ) : (
                        <div className="card-fields">
                          <div className="card-field-row">
                            <span className="field-label">To:</span>
                            <span className="field-value highlight">{msg.action_card.recipient}</span>
                          </div>

                          <div className="card-input-group">
                            <label>Your Name:</label>
                            <input 
                              type="text"
                              placeholder="e.g. Sarah Jenkins (Recruiter / Client)"
                              value={msg.action_card.sender_name || ''}
                              onChange={(e) => handleUpdateEmailDraft(msg.id, 'sender_name', e.target.value)}
                            />
                          </div>

                          <div className="card-input-group">
                            <label>Your Email (for response):</label>
                            <input 
                              type="email"
                              placeholder="e.g. sarah@company.com"
                              value={msg.action_card.sender_email || ''}
                              onChange={(e) => handleUpdateEmailDraft(msg.id, 'sender_email', e.target.value)}
                            />
                          </div>

                          <div className="card-input-group">
                            <label>Subject:</label>
                            <input 
                              type="text"
                              value={msg.action_card.subject || ''}
                              onChange={(e) => handleUpdateEmailDraft(msg.id, 'subject', e.target.value)}
                            />
                          </div>

                          <div className="card-input-group">
                            <label>Message Content:</label>
                            <textarea 
                              rows={3}
                              value={msg.action_card.message || ''}
                              onChange={(e) => handleUpdateEmailDraft(msg.id, 'message', e.target.value)}
                            />
                          </div>

                          {msg.action_card.error && (
                            <div className="card-error-text">
                              <AlertCircle size={13} />
                              <span>{msg.action_card.error}</span>
                            </div>
                          )}

                          <div className="card-actions">
                            <button 
                              type="button"
                              className="card-btn-cancel"
                              onClick={() => handleCancelEmail(msg.id)}
                            >
                              Cancel
                            </button>
                            <a
                              href={`mailto:${msg.action_card.recipient}?subject=${encodeURIComponent(msg.action_card.subject || '')}&body=${encodeURIComponent(msg.action_card.message || '')}`}
                              className="card-btn-mailto"
                              title="Send using your native email app"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Open in Mail App ↗
                            </a>
                            <button 
                              type="button"
                              className="card-btn-confirm"
                              disabled={msg.action_card.sending}
                              onClick={() => handleConfirmEmail(msg.action_card, msg.id)}
                            >
                              {msg.action_card.sending ? "Transmitting..." : "🚀 Confirm & Send Email"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <span className="message-timestamp">{msg.timestamp}</span>
                </div>

                {msg.role === 'user' && (
                  <div className="message-avatar user">
                    <User size={14} />
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="ai-message-row assistant">
                <div className="message-avatar bot">
                  <img src="/ai-wave.png" alt="AI" className="msg-avatar-img" />
                </div>
                <div className="ai-message-bubble assistant loading">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="loading-text">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="ai-chatbot-chips">
            {SUGGESTIONS.map((chip, idx) => (
              <button 
                key={idx} 
                className="ai-chip"
                onClick={() => handleSendMessage(chip)}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form 
            className="ai-chatbot-input-area"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input 
              ref={inputRef}
              type="text"
              className="ai-chat-input"
              placeholder="Ask about projects or say 'send an email'..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="ai-chat-send-btn"
              disabled={!inputText.trim() || isLoading}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
