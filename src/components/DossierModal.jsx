import React from 'react';
import { Download, X, ExternalLink, Mail, Phone, MapPin, Briefcase, Award, GraduationCap, CheckCircle2, Sparkles, FileText } from 'lucide-react';

export default function DossierModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="system-modal-backdrop active" onClick={onClose}>
      <div className="modal-container dossier-expanded-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', fontWeight: 700 }}>
              VERIFIED TECHNICAL DOSSIER &bull; RESUME
            </span>
            <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--ink-muted)' }}>
              // SALMAN KHAN D
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">

          {/* Top Profile Strip */}
          <div className="dossier-profile-strip">
            <div>
              <div className="dossier-status-pill">
                <span className="live-dot pulse"></span>
                <span>ACTIVELY SEEKING INDUSTRY OPPORTUNITIES &bull; READY TO JOIN</span>
              </div>
              <h3 className="dossier-candidate-name">
                SALMAN KHAN D
              </h3>
              <p className="dossier-candidate-role">
                AI Engineer &bull; Full-Stack Builder &bull; Multi-Agent Systems Architect
              </p>
              <div className="dossier-contact-quick-row">
                <span><MapPin size={12} /> Tamil Nadu, India</span>
                <a href="tel:+919342298949"><Phone size={12} /> +91 93422 98949</a>
                <a href="mailto:samitha0786@gmail.com"><Mail size={12} /> samitha0786@gmail.com</a>
              </div>
            </div>

            {/* Resume Download Buttons */}
            <div className="dossier-download-actions">
              <a 
                href="/assets/Salman_Khan_Resume.pdf" 
                download="Salman_Khan_Resume.pdf" 
                className="btn-download-pdf-primary"
              >
                <Download size={14} />
                <span>DOWNLOAD RESUME (PDF)</span>
              </a>
              <a 
                href="/assets/Salman_Khan_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-view-pdf-secondary"
              >
                <FileText size={13} />
                <span>OPEN PDF IN NEW TAB</span>
              </a>
            </div>
          </div>

          {/* Industry Opportunity Highlight Callout */}
          <div className="dossier-opportunity-banner">
            <div className="opp-banner-header">
              <Sparkles size={16} className="opp-sparkle" />
              <span className="opp-title">INDUSTRY READINESS &amp; IMMEDIATE AVAILABILITY</span>
            </div>
            <p className="opp-text">
              “I am eagerly seeking full-time opportunities to work in the industry as an <strong>AI Engineer, Generative AI / LLM Developer, or Full-Stack Engineer</strong>. With hands-on experience across the entire ML lifecycle (TensorFlow, PyTorch, Flask REST APIs), 25+ autonomous n8n agent workflows, and 15+ production full-stack web deployments on Vercel, I am ready to deliver immediate, measurable impact to high-velocity engineering teams.”
            </p>
          </div>

          {/* Technical Skills Grid */}
          <div className="dossier-section-block">
            <h4 className="dossier-block-title">
              <Briefcase size={14} />
              <span>TECHNICAL CORE SKILLS</span>
            </h4>
            <div className="dossier-skills-grid">
              <div className="skill-group-card">
                <span className="skill-group-name">PROGRAMMING</span>
                <p className="skill-group-items">Python, Java, JavaScript, C++, SQL, HTML/CSS</p>
              </div>
              <div className="skill-group-card">
                <span className="skill-group-name">AI &amp; MACHINE LEARNING</span>
                <p className="skill-group-items">Machine Learning, Deep Learning, Computer Vision, NLP, Model Training &amp; Evaluation</p>
              </div>
              <div className="skill-group-card">
                <span className="skill-group-name">GENERATIVE AI &amp; AGENTS</span>
                <p className="skill-group-items">GPT-4, Gemini, Prompt &amp; Context Engineering, n8n Multi-Agent Swarms, Claude Skills, Custom GPTs</p>
              </div>
              <div className="skill-group-card">
                <span className="skill-group-name">FRAMEWORKS &amp; LIBRARIES</span>
                <p className="skill-group-items">TensorFlow, PyTorch, OpenCV, YOLO, Transformers, Flask</p>
              </div>
              <div className="skill-group-card">
                <span className="skill-group-name">WEB &amp; FULL STACK</span>
                <p className="skill-group-items">React.js, Next.js, Node.js, WordPress, Vercel Edge</p>
              </div>
              <div className="skill-group-card">
                <span className="skill-group-name">CLOUD, TOOLS &amp; IOT</span>
                <p className="skill-group-items">Vercel, Firebase, GitHub, Git, Raspberry Pi, Supabase, Airtable</p>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="dossier-section-block">
            <h4 className="dossier-block-title">
              <Briefcase size={14} />
              <span>PROFESSIONAL EXPERIENCE</span>
            </h4>
            
            <div className="dossier-exp-item">
              <div className="exp-top-row">
                <span className="exp-role">Machine Learning &amp; Data Science Intern</span>
                <span className="exp-meta">YELLOWMATICS &bull; INTERNSHIP</span>
              </div>
              <ul className="exp-bullets">
                <li>Built and optimized computer vision and predictive machine learning models using TensorFlow and PyTorch for real-world prediction and classification tasks.</li>
                <li>Owned the end-to-end ML lifecycle — data preprocessing, model training, evaluation, and REST API deployment via Flask for production-facing model integration.</li>
              </ul>
            </div>

            <div className="dossier-exp-item">
              <div className="exp-top-row">
                <span className="exp-role">Freelance Tech &amp; Creative Lead</span>
                <span className="exp-meta">STRIKKERZ TEAM &bull; CLIENT DEPLOYMENTS</span>
              </div>
              <ul className="exp-bullets">
                <li>Developed and deployed React.js and WordPress-based web applications, owning UI/UX design and content strategy.</li>
                <li>Managed end-to-end deployment pipelines using GitHub and Vercel for client-facing production releases.</li>
              </ul>
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="dossier-section-block">
            <h4 className="dossier-block-title">
              <GraduationCap size={14} />
              <span>EDUCATION &amp; CERTIFICATIONS</span>
            </h4>
            
            <div className="dossier-edu-card">
              <div className="edu-main">
                <span className="edu-degree">B.Tech in Artificial Intelligence &amp; Data Science</span>
                <span className="edu-school">Mahendra Engineering College, Tamil Nadu &bull; Final Year</span>
              </div>
              <div className="edu-badge">
                <span className="badge-num">8.72</span>
                <span className="badge-lbl">CGPA / 10</span>
              </div>
            </div>

            <div className="dossier-certs-row">
              <div className="cert-chip">
                <CheckCircle2 size={13} className="cert-icon" />
                <span>NPTEL &bull; Cloud Computing</span>
              </div>
              <div className="cert-chip">
                <CheckCircle2 size={13} className="cert-icon" />
                <span>NPTEL &bull; Java Programming</span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="dossier-section-block">
            <h4 className="dossier-block-title">
              <Award size={14} />
              <span>KEY ACHIEVEMENTS &amp; LEADERSHIP</span>
            </h4>
            <ul className="dossier-achieve-list">
              <li><strong>Hackathon Finalist:</strong> MSME Hackathon, SAP Hackathon, CATCH 2024 &amp; 2025, EDU-HACK INSPIRE.</li>
              <li><strong>Published Research:</strong> Authored &amp; presented research paper on ML-based IoT anomaly detection at an academic symposium.</li>
              <li><strong>Leadership:</strong> Event Core Member at AInnovat Innovators Club &bull; Anti-Ragging Campaign Leader.</li>
            </ul>
          </div>

          {/* Bottom Action Footer */}
          <div className="dossier-modal-footer">
            <div className="footer-recruiter-contact">
              <span>Ready for immediate interviews:</span>
              <a href="mailto:samitha0786@gmail.com" className="recruiter-email-link">
                samitha0786@gmail.com
              </a>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a 
                href="/assets/Salman_Khan_Resume.pdf" 
                download="Salman_Khan_Resume.pdf" 
                className="btn-download-pdf-primary"
              >
                <Download size={13} />
                <span>DOWNLOAD CV</span>
              </a>
              <button className="btn-system-secondary" onClick={onClose}>
                <span>CLOSE</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
