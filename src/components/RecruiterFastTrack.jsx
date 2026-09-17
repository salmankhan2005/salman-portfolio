import React, { useEffect } from 'react';
import { 
  Zap, 
  X, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Copy, 
  Mail, 
  GraduationCap, 
  Code2, 
  Cpu, 
  Layers, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

export default function RecruiterFastTrack({ isOpen, onClose, onOpenDossier, onShowToast }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKey);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copyEmail = () => {
    navigator.clipboard.writeText('salmankhan2005sd@gmail.com');
    if (onShowToast) onShowToast('Email copied to clipboard (salmankhan2005sd@gmail.com)');
  };

  const productionApps = [
    {
      name: 'AI Mock Interview',
      tagline: 'Real-time speech analysis & automated rubric scoring',
      url: 'https://ai-i-nterview.vercel.app',
      latency: '< 85ms',
      tech: 'React • NLP • Speech API'
    },
    {
      name: 'AI Career Coach',
      tagline: 'Resume AST parsing & dynamic semester roadmapping',
      url: 'https://ai-career-coach-full-stack.vercel.app',
      latency: '< 110ms',
      tech: 'Next.js 14 • OpenAI • Node'
    },
    {
      name: 'AI Resume Spark',
      tagline: 'ATS-optimized phrasing transformer & instant PDF export',
      url: 'https://remix-of-ai-resume-spark-main.vercel.app',
      latency: '< 65ms',
      tech: 'React • ATS Engine • Vercel'
    },
    {
      name: 'AI Course Generator',
      tagline: 'Hierarchical curriculum decomposition & quiz builder',
      url: 'https://project-six-delta-36.vercel.app',
      latency: '< 95ms',
      tech: 'React • LLM Streams • Edge'
    }
  ];

  const skillCompetencies = [
    { label: 'Autonomous AI Multi-Agents (n8n, GPT-4o, Sub-Agents)', level: 96 },
    { label: 'Production Full-Stack Architecture (React, Next.js, Node.js)', level: 94 },
    { label: 'Applied ML & Computer Vision (PyTorch, YOLOv8, OpenCV)', level: 90 },
    { label: 'Real-Time Systems & APIs (WebSockets, Redis, PostgreSQL)', level: 92 },
    { label: 'Prompt Engineering & Context Optimization', level: 98 }
  ];

  return (
    <div className="recruiter-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="recruiter-modal-box gold-shimmer-card" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="recruiter-modal-header">
          <div className="recruiter-header-badge">
            <Zap size={14} className="gold-pulse-icon" />
            <span>RECRUITER FAST-TRACK // 30-SECOND EXECUTIVE SKIM</span>
          </div>
          <button className="recruiter-close-btn" onClick={onClose} title="Close (Esc)">
            <X size={18} />
          </button>
        </div>

        {/* Executive Summary Snapshot Card */}
        <div className="recruiter-snapshot-card">
          <div className="recruiter-profile-mini">
            <div className="recruiter-avatar-wrap">
              <img 
                src="/assets/images/salman_recruiter_face_hd.png" 
                alt="Salman Khan D" 
                className="recruiter-avatar"
              />
            </div>
            <div className="recruiter-meta-block">
              <h2 className="recruiter-name">SALMAN KHAN D</h2>
              <div className="recruiter-title-tag">
                AI ENGINEER • PRODUCT BUILDER • FULL-STACK ARCHITECT
              </div>
              <div className="recruiter-status-pill">
                <span className="live-dot pulse"></span>
                <span>AVAILABLE IMMEDIATELY FOR FULL-TIME / HIGH-IMPACT ROLES</span>
              </div>
            </div>
          </div>

          <div className="recruiter-metrics-grid">
            <div className="recruiter-metric-item">
              <div className="r-metric-val">8.72</div>
              <div className="r-metric-lbl">CGPA • B.Tech AI &amp; DS</div>
            </div>
            <div className="recruiter-metric-item">
              <div className="r-metric-val">30+</div>
              <div className="r-metric-lbl">n8n Autonomous Agents</div>
            </div>
            <div className="recruiter-metric-item">
              <div className="r-metric-val">15+</div>
              <div className="r-metric-lbl">Deployed Production Apps</div>
            </div>
            <div className="recruiter-metric-item">
              <div className="r-metric-val">300+</div>
              <div className="r-metric-lbl">Engineers Trained in AI</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid: Live Apps & Competency Radar */}
        <div className="recruiter-content-grid">
          
          {/* Left: Top 4 Live Production Apps */}
          <div className="recruiter-section-col">
            <div className="recruiter-col-title">
              <Code2 size={15} />
              <span>LIVE PRODUCTION APPS (1-CLICK TEST)</span>
            </div>

            <div className="recruiter-apps-list">
              {productionApps.map((app, idx) => (
                <a 
                  key={idx} 
                  href={app.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="recruiter-app-card"
                >
                  <div className="r-app-top">
                    <span className="r-app-name">{app.name}</span>
                    <span className="r-app-latency">{app.latency}</span>
                  </div>
                  <p className="r-app-desc">{app.tagline}</p>
                  <div className="r-app-bottom">
                    <span className="r-app-tech">{app.tech}</span>
                    <span className="r-app-link">Launch App <ArrowUpRight size={12} /></span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Technical Competencies & Education */}
          <div className="recruiter-section-col">
            <div className="recruiter-col-title">
              <Cpu size={15} />
              <span>TECHNICAL COMPETENCY BENCHMARK</span>
            </div>

            <div className="recruiter-skills-block">
              {skillCompetencies.map((skill, idx) => (
                <div key={idx} className="r-skill-row">
                  <div className="r-skill-info">
                    <span className="r-skill-name">{skill.label}</span>
                    <span className="r-skill-pct">{skill.level}%</span>
                  </div>
                  <div className="r-skill-bar-track">
                    <div 
                      className="r-skill-bar-fill" 
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="recruiter-edu-box">
              <div className="r-edu-header">
                <GraduationCap size={15} className="gold-accent" />
                <span className="r-edu-title">EDUCATION &amp; INTERNSHIP</span>
              </div>
              <p className="r-edu-text">
                <strong>B.Tech in Artificial Intelligence &amp; Data Science</strong><br />
                Mahendra Engineering College (2022 – 2026) • <strong>8.72 CGPA</strong>
              </p>
              <p className="r-edu-subtext">
                <strong>Machine Learning Intern</strong> @ Yellowmatics (Computer Vision &amp; Deep Learning)
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Fast-Action Dock */}
        <div className="recruiter-action-dock">
          <a 
            href="/assets/Salman_Khan_Resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="r-btn-primary gold-shimmer-button"
          >
            <Download size={14} />
            <span>DOWNLOAD OFFICIAL RESUME (PDF)</span>
          </a>

          <button onClick={copyEmail} className="r-btn-secondary">
            <Copy size={13} />
            <span>COPY EMAIL</span>
          </button>

          <a 
            href="https://www.linkedin.com/in/salman-khan-d/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="r-btn-secondary"
          >
            <ExternalLink size={13} />
            <span>LINKEDIN</span>
          </a>

          <a 
            href="https://github.com/salmankhan2005" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="r-btn-secondary"
          >
            <ExternalLink size={13} />
            <span>GITHUB</span>
          </a>

          <a 
            href="#contact" 
            onClick={onClose} 
            className="r-btn-accent"
          >
            <Mail size={13} />
            <span>HIRE SALMAN</span>
          </a>
        </div>

      </div>
    </div>
  );
}
