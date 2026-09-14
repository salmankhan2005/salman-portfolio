import React, { useState } from 'react';
import { Send, Copy, ArrowUpRight, Check, Mail, Phone, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function ContactDispatch({ onShowToast }) {
  const [copied, setCopied] = useState(false);
  const [transmitting, setTransmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorNotice, setErrorNotice] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    scope: 'fulltime',
    message: ''
  });

  const PRIMARY_EMAIL = import.meta.env.VITE_CONTACT_RECEIVER_EMAIL || 'samitha0786@gmail.com';
  const PRIMARY_PHONE = '+91 93422 98949';

  // EmailJS Configuration from .env
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const isConfigured = Boolean(serviceId && templateId && publicKey);

  function handleCopyEmail() {
    navigator.clipboard.writeText(PRIMARY_EMAIL).then(() => {
      setCopied(true);
      onShowToast(`Copied ${PRIMARY_EMAIL} to clipboard`);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTransmitting(true);
    setErrorNotice(null);

    // Template parameters for EmailJS (including common aliases and pre-computed subject)
    const formattedScope = formData.scope === 'fulltime' ? 'Full-Time Role' : formData.scope;
    const templateParams = {
      subject: `Inquiry from ${formData.name || 'Recruiter'} [${formattedScope}]`,
      name: formData.name,
      from_name: formData.name,
      email: formData.email,
      from_email: formData.email,
      scope: formattedScope,
      engagement_scope: formattedScope,
      message: formData.message,
      to_email: PRIMARY_EMAIL,
      reply_to: formData.email
    };

    if (isConfigured) {
      try {
        // 1. Send primary notification to Salman Khan
        const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
        
        // 2. Send automated receipt acknowledgment back to visitor (if configured)
        if (autoReplyTemplateId) {
          emailjs.send(serviceId, autoReplyTemplateId, templateParams, publicKey).catch(err => {
            console.warn('Auto-reply trigger status:', err);
          });
        }

        if (response.status === 200 || response.text === 'OK') {
          setTransmitting(false);
          setSubmitted(true);
          onShowToast(`Dispatch delivered successfully to Salman Khan via EmailJS!`);
          setFormData({ name: '', email: '', scope: 'fulltime', message: '' });
        } else {
          throw new Error(`EmailJS responded with status ${response.status}`);
        }
      } catch (err) {
        console.error('EmailJS transmission error:', err);
        setTransmitting(false);
        setErrorNotice(
          'EmailJS encountered an issue. Please verify your service/template keys in .env, or use the direct mailto button below.'
        );
        onShowToast('Transmission error. Direct email link available.');
      }
    } else {
      // Setup Mode Simulation: Keys not configured in .env yet
      setTimeout(() => {
        setTransmitting(false);
        setSubmitted(true);
        setErrorNotice('SETUP_NOTICE');
        onShowToast(`Form verified! Add your EmailJS keys in .env to activate live SMTP delivery.`);
      }, 700);
    }
  }

  return (
    <section className="person-section" id="contact" style={{ backgroundColor: 'var(--bg-sand-light)' }}>
      <div className="page-container">
        
        <div className="section-head" style={{ marginBottom: '2rem' }}>
          <div className="section-index-wrapper">
            <span className="font-mono" style={{ fontSize: '0.78rem', fontWeight: 700 }}>06.</span>
            <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              COMMUNICATION DISPATCH &bull; SMTP GATEWAY
            </span>
          </div>
          <h2 className="person-big-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)' }}>
            LET'S BUILD SOMETHING MEANINGFUL.
          </h2>
        </div>

        <div className="contact-editorial-layout">

          {/* Left Column: Direct Channels & Opportunities */}
          <div>
            <div className="contact-status-highlight">
              <span className="live-dot pulse"></span>
              <span>ACTIVELY SEEKING INDUSTRY OPPORTUNITIES &bull; IMMEDIATE ONBOARDING</span>
            </div>

            <p className="person-p" style={{ marginBottom: '2rem' }}>
              Whether you are looking to hire a dedicated <strong>AI Engineer</strong>, orchestrate autonomous agentic workflows (n8n, GPT-4o), or build a resilient full-stack application from scratch—my inbox is monitored directly.
            </p>

            <div className="direct-channels-list">
              
              {/* Direct Primary Email Card with One-Click Copy */}
              <div className="channel-card">
                <div className="channel-info">
                  <span className="channel-label">PRIMARY EMAIL // RECRUITMENT</span>
                  <a href={`mailto:${PRIMARY_EMAIL}`} className="channel-val" style={{ textDecoration: 'none' }}>
                    {PRIMARY_EMAIL}
                  </a>
                </div>
                <button className="copy-btn" onClick={handleCopyEmail} id="copy-email-btn">
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>

              {/* Direct Phone / WhatsApp Card */}
              <div className="channel-card">
                <div className="channel-info">
                  <span className="channel-label">PHONE // WHATSAPP DIRECT</span>
                  <a href="tel:+919342298949" className="channel-val" style={{ textDecoration: 'none' }}>
                    {PRIMARY_PHONE}
                  </a>
                </div>
                <Phone size={14} style={{ color: 'var(--gold-primary)' }} />
              </div>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/salmankhan2005" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="channel-card"
              >
                <div className="channel-info">
                  <span className="channel-label">PROFESSIONAL NETWORK</span>
                  <span className="channel-val">linkedin.com/in/salmankhan2005</span>
                </div>
                <ArrowUpRight size={16} />
              </a>

              {/* GitHub */}
              <a 
                href="https://github.com/salmankhan2005" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="channel-card"
              >
                <div className="channel-info">
                  <span className="channel-label">SOURCE REPOSITORY</span>
                  <span className="channel-val">github.com/salmankhan2005</span>
                </div>
                <ArrowUpRight size={16} />
              </a>

            </div>
          </div>

          {/* Right Column: Direct Inquiry Form powered by EmailJS */}
          <div className="inquiry-form-card">
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.25rem' }}>
                Direct Transmission
              </h4>
              <span className={`emailjs-badge ${isConfigured ? 'live' : 'setup'}`}>
                <span className="badge-dot"></span>
                <span>{isConfigured ? 'EMAILJS SMTP ACTIVE' : 'EMAILJS READY (.ENV)'}</span>
              </span>
            </div>

            <p className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginBottom: '1.25rem' }}>
              DISPATCHES DELIVERED DIRECTLY TO INBOX &bull; RESPONSE &lt; 24H
            </p>

            {submitted ? (
              <div className="form-success-container">
                <CheckCircle2 size={36} className="success-icon" />
                <h5 className="success-title">Transmission Received</h5>
                <p className="success-desc">
                  Thank you for reaching out. Your inquiry has been dispatched to <strong>{PRIMARY_EMAIL}</strong>. Salman will review and respond promptly.
                </p>

                {errorNotice === 'SETUP_NOTICE' && (
                  <div className="setup-help-box">
                    <div className="help-head">
                      <Sparkles size={14} />
                      <span>EMAILJS SETUP QUICK GUIDE</span>
                    </div>
                    <p className="help-text">
                      To activate live client-side delivery, fill in your 3 keys in <code>.env</code>:
                    </p>
                    <pre className="help-code">
                      VITE_EMAILJS_SERVICE_ID=service_xxxx{'\n'}
                      VITE_EMAILJS_TEMPLATE_ID=template_xxxx{'\n'}
                      VITE_EMAILJS_PUBLIC_KEY=xxxx_xxxx
                    </pre>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                  <a 
                    href={`mailto:${PRIMARY_EMAIL}?subject=${encodeURIComponent(`Inquiry from ${formData.name || 'Client'}`)}&body=${encodeURIComponent(formData.message || 'Hello Salman,')}`}
                    className="btn-editorial-primary"
                    style={{ fontSize: '0.72rem', padding: '0.55rem 1rem' }}
                  >
                    <span>OPEN DIRECT EMAIL</span>
                    <Mail size={12} />
                  </a>
                  <button 
                    className="btn-editorial-secondary" 
                    onClick={() => { setSubmitted(false); setErrorNotice(null); }}
                    style={{ fontSize: '0.72rem', padding: '0.55rem 1rem' }}
                  >
                    <span>SEND ANOTHER DISPATCH</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="contact-form">
                
                {errorNotice && errorNotice !== 'SETUP_NOTICE' && (
                  <div className="form-error-banner">
                    <AlertCircle size={14} />
                    <span>{errorNotice}</span>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" htmlFor="form-name">YOUR NAME / ORGANIZATION</label>
                  <input 
                    type="text" 
                    id="form-name" 
                    className="form-input" 
                    placeholder="e.g. Alex Rivera // TechCorp" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="form-email">EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    id="form-email" 
                    className="form-input" 
                    placeholder="alex@company.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="form-topic">ENGAGEMENT SCOPE</label>
                  <select 
                    id="form-topic" 
                    className="form-input" 
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  >
                    <option value="fulltime">Full-Time AI / Full-Stack Role (Immediate Hire)</option>
                    <option value="contract">Autonomous Agent System Architecture (n8n / LLMs)</option>
                    <option value="freelance">Custom Web Application / Production Engineering</option>
                    <option value="advisory">Technical Interview / Advisory Consultation</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="form-msg">MESSAGE</label>
                  <textarea 
                    id="form-msg" 
                    className="form-textarea" 
                    placeholder="Describe the opportunity, role requirements, project goals, or scheduling details..." 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn-editorial-primary" 
                  style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }} 
                  disabled={transmitting}
                  id="submit-inquiry-btn"
                >
                  <span>{transmitting ? 'TRANSMITTING VIA EMAILJS...' : 'TRANSMIT DISPATCH'}</span>
                  <Send size={14} />
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
