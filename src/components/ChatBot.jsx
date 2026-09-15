import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, X, Send, Sparkles, Terminal, RotateCcw, 
  ExternalLink, Mail, CheckCircle, AlertCircle, Bot, User, ArrowRight
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { getAIChatResponse, extractContactEntities } from '../services/aiAgent';

const BACKEND_URL = import.meta.env.VITE_AI_BACKEND_URL || 'http://127.0.0.1:8000';

const INITIAL_MESSAGE = {
  id: 'init-1',
  role: 'assistant',
  content: `👋 Hello! I'm Salman Khan's personal AI Representative.\n\nI can walk you through his **15+ production AI applications**, explain his **deep learning and multi-agent systems**, or help you connect with him directly for engineering roles and collaborations.\n\nWhat would you like to explore today?`,
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
  const [modelName, setModelName] = useState('Salman AI Brain');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // EmailJS Configuration from .env
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const PRIMARY_EMAIL = import.meta.env.VITE_CONTACT_RECEIVER_EMAIL || 'samitha0786@gmail.com';

  // Check Backend Health & Environment Model
  useEffect(() => {
    if (import.meta.env.VITE_GEMINI_API_KEY && import.meta.env.VITE_GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY') {
      setModelName('Google Gemini 2.0');
    }

    async function checkHealth() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/health`, { method: 'GET' });
        if (res.ok) {
          const data = await res.json();
          setBackendOnline(true);
          if (!import.meta.env.VITE_GEMINI_API_KEY) {
            setModelName(`Neural Agent (${data.device?.toUpperCase() || 'LIVE'})`);
          }
        } else {
          setBackendOnline(false);
        }
      } catch (err) {
        setBackendOnline(false);
      }
    }
    checkHealth();
    const interval = setInterval(checkHealth, 20000);
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

    // Check if user is confirming a pending email draft
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
      const { name: extractedName, email: extractedEmail } = extractContactEntities(textToSend);

      let updatedName = extractedName || pendingMsg.action_card.sender_name || userContact.name || '';
      let updatedEmail = extractedEmail || pendingMsg.action_card.sender_email || userContact.email || '';

      if (extractedEmail) {
        setUserContact(prev => ({ ...prev, email: updatedEmail }));
        localStorage.setItem('sk_visitor_email', updatedEmail);
      }
      if (extractedName) {
        setUserContact(prev => ({ ...prev, name: updatedName }));
        localStorage.setItem('sk_visitor_name', updatedName);
      }

      // Update the pending action card with any newly discovered details
      if (extractedEmail || extractedName) {
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
            content: `I have your email draft ready for Salman Khan! 📬\n\nPlease enter your **Name** and **Email address** in the card above (or reply here: *"My name is [Your Name], my email is [Your Email]"*) so Salman knows who to reply to, then click **Confirm & Send Email**.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, botGuidance]);
          return;
        }
      }
    }

    setIsLoading(true);

    try {
      // Generate intelligent conversational AI response
      const aiResult = await getAIChatResponse(textToSend, messages, userContact);
      
      if (aiResult) {
        let card = aiResult.action_card;
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

        if (aiResult.model) {
          setModelName(aiResult.model);
        }

        streamBotMessage(aiResult.reply, aiResult.tool_call || null, card);
        return;
      }
    } catch (err) {
      console.warn("AI Chat processing error:", err);
      streamBotMessage(
        `I'm here to assist you! Feel free to ask about Salman's **15+ AI projects**, his **deep learning & computer vision stack**, or say *"Send Salman an email"* to reach out directly!`
      );
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
    }, 25);
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
          content: `✅ **Email Successfully Sent to Salman Khan!**\n\n• **Recipient:** \`${PRIMARY_EMAIL}\`\n• **From:** \`${cardData.sender_name} <${cardData.sender_email}>\`\n• **Subject:** *${cardData.subject}*\n\nYour message was transmitted to Salman's inbox. He receives instant notification and will get back to \`${cardData.sender_email}\` promptly!`,
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
          <div className="ai-avatar-trigger" onClick={() => setIsOpen(true)} title="Chat with Salman's AI Assistant">
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
                <span className="header-mode-tag">{modelName}</span>
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
              placeholder="Ask about projects, skills, or say 'send an email'..."
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
