import React from 'react';
import { ArrowDown, Cpu, Activity, ExternalLink, FileText, Download, Sparkles, Mail } from 'lucide-react';

export default function Hero({ onOpenDossier }) {
  return (
    <section className="hero-editorial-section" id="hero">
      <div className="page-container">
        <div className="hero-editorial-grid">

          {/* Left Column: Giant Editorial Typography & Mission */}
          <div className="hero-left-editorial">
            
            {/* Actively Seeking Industry Opportunities Live Badge */}
            <div className="hero-opportunity-badge gold-glint-badge">
              <span className="live-dot pulse"></span>
              <span className="opp-badge-text">ACTIVELY SEEKING INDUSTRY OPPORTUNITIES &bull; READY TO JOIN</span>
            </div>

            <h1 className="hero-giant-title">
              SALMAN<br />
              <span className="gold-shimmer-text">KHAN</span>
            </h1>

            <div className="hero-role-subhead">
              AI ENGINEER • PRODUCT BUILDER<br />
              FULL-STACK DEVELOPER
            </div>

            <p className="hero-role-caption">
              Eager to work in the industry and contribute applied ML engineering, autonomous agent workflows (n8n, GPT-4o), and production-grade full-stack delivery to forward-thinking engineering teams.
            </p>

            {/* Direct Resume Download & Dossier Actions */}
            <div className="hero-action-buttons-row">
              <a 
                href="/assets/Salman_Khan_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-hero-resume-primary gold-shimmer-button"
              >
                <FileText size={13} />
                <span>OFFICIAL RESUME (PDF)</span>
                <Download size={12} />
              </a>
              <button 
                onClick={onOpenDossier} 
                className="btn-hero-dossier-secondary gold-shimmer-button"
              >
                <span>FULL DOSSIER</span>
              </button>
            </div>

            <div className="hero-stats-quick-bar">
              <div className="quick-stat-item">
                <span className="stat-num">30+</span>
                <span className="stat-lbl">n8n AI Agents</span>
              </div>
              <div className="quick-stat-sep">/</div>
              <div className="quick-stat-item">
                <span className="stat-num">15+</span>
                <span className="stat-lbl">Deployed Apps</span>
              </div>
              <div className="quick-stat-sep">/</div>
              <div className="quick-stat-item">
                <span className="stat-num">8.72</span>
                <span className="stat-lbl">B.Tech CGPA</span>
              </div>
            </div>

            <a href="#featured-work" className="hero-scroll-cue">
              <span className="line-bar"></span>
              <span>SCROLL TO EXPLORE ARCHIVE</span>
              <ArrowDown size={13} />
            </a>
          </div>

          {/* Center Column: 8K Seamless Portrait with Animated 3D Torus Sculpture Background */}
          <div className="hero-center-portrait">
            <div className="portrait-organic-wrap">
              
              {/* Animated 3D Torus Sculpture & Ambient Breathing Light Aura */}
              <div className="sculpture-ambient-backdrop">
                <div className="torus-glow-pulse"></div>
                <img 
                  src="/assets/images/hero_torus_sculpture_transparent.png"
                  alt="3D Architectural Torus Sculpture"
                  className="torus-sculpture-img"
                />
              </div>

              {/* Master 8K Editorial Portrait with Complete Arms & Hands Resting on Baseline */}
              <img 
                src="/assets/images/salman_hero_shadow_grounded.png?v=3" 
                alt="Salman Khan — AI Engineer & Product Builder"
                className="portrait-cutout-img"
                onError={(e) => {
                  e.target.src = '/assets/images/salman_gemini_master.jpg';
                }}
              />
              
              {/* Architectural Studio Desk Plinth & Contact Baseline */}
              <div className="hero-desk-plinth">
                <div className="plinth-contact-shadow"></div>
                <div className="plinth-hairline"></div>
                <div className="plinth-content">
                  <span className="plinth-label">[ SYS.SURFACE // CALIBRATED BASELINE ]</span>
                  <span className="plinth-status">STUDIO DESK PLANE &bull; 0.00</span>
                </div>
              </div>
              
              {/* Handwritten Note near Shoulder */}
              <div className="portrait-cursive-note font-handwriting">
                Ideas<br />
                Systems<br />
                People<br />
                Impact
              </div>

            </div>
          </div>

          {/* Right Column: High-Tech Engineering Telemetry & Production Systems */}
          <div className="hero-right-editorial">
            
            {/* Top Engineering Card: Autonomous Multi-Agent Telemetry */}
            <div className="hero-tech-card gold-shimmer-card">
              <div className="tech-card-header">
                <div className="tech-card-badge">
                  <span className="live-dot"></span>
                  <span>SYS.AGENTIC // n8n + GPT-4o</span>
                </div>
                <span className="tech-card-meta">28.5ms LATENCY</span>
              </div>

              <div className="tech-card-visual-frame">
                <img 
                  src="/assets/images/hero_tech_agent_telemetry.jpg" 
                  alt="Autonomous Multi-Agent Orchestration Telemetry" 
                  className="tech-telemetry-img"
                />
                <div className="tech-frame-overlay">
                  <div className="overlay-pill">9 SUB-AGENTS ACTIVE</div>
                  <div className="overlay-desc">NAAC &amp; NIRF Autonomous Compliance Engine</div>
                </div>
              </div>
            </div>

            {/* Middle Manifesto Quote */}
            <div className="hero-quote-block">
              <div className="quote-index">01 / 04</div>
              <blockquote className="quote-lead">
                “A more human internet is possible.”
              </blockquote>
              <p className="quote-body-manifesto">
                — I BUILD PRODUCTS, AUTOMATE IDEAS AND TURN COMPLEX PROBLEMS INTO SIMPLE EXPERIENCES.
              </p>
            </div>

            {/* Bottom Tech Card: Live Production Deployments & Direct Links */}
            <div className="hero-deploy-card gold-shimmer-card">
              <div className="deploy-card-top">
                <span className="deploy-tag">LIVE PRODUCTION APPS</span>
                <span className="deploy-status">VERCEL &amp; EDGE DEPLOYED</span>
              </div>

              <div className="deploy-links-grid">
                <a 
                  href="https://ai-i-nterview.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="deploy-chip"
                >
                  <span className="chip-name">AI Mock Interview</span>
                  <ExternalLink size={11} />
                </a>

                <a 
                  href="https://ai-career-coach-full-stack.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="deploy-chip"
                >
                  <span className="chip-name">AI Career Coach</span>
                  <ExternalLink size={11} />
                </a>

                <a 
                  href="https://remix-of-ai-resume-spark-main.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="deploy-chip"
                >
                  <span className="chip-name">AI Resume Spark</span>
                  <ExternalLink size={11} />
                </a>

                <a 
                  href="https://project-six-delta-36.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="deploy-chip"
                >
                  <span className="chip-name">AI Course Generator</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hero-btn-row">
              <button className="btn-editorial-primary gold-shimmer-button" onClick={onOpenDossier}>
                <span>VIEW DOSSIER / CV</span>
              </button>
              <a href="#contact" className="btn-editorial-secondary gold-shimmer-button">
                <span>GET IN TOUCH</span>
              </a>
            </div>

          </div>

        </div>

        {/* Architectural Tech Partner Strip */}
        <div className="hero-partner-strip">
          <div className="partner-strip-tag">CORE PLATFORMS &amp; INFRASTRUCTURE</div>
          <div className="partner-badges-group">
            <span className="partner-badge">OpenAI</span>
            <span className="partner-badge">n8n Enterprise</span>
            <span className="partner-badge">Google Cloud</span>
            <span className="partner-badge">Next.js</span>
            <span className="partner-badge">Vercel</span>
            <span className="partner-badge">Supabase</span>
            <span className="partner-badge">PyTorch</span>
          </div>
          <div className="partner-strip-quote">
            “15+ Deployed Systems • 30+ Autonomous Multi-Agent Workflows”
          </div>
        </div>

      </div>
    </section>
  );
}
