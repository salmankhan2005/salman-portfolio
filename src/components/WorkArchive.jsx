import React from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

const featuredStripItems = [
  {
    id: 'interview',
    num: '01',
    title: 'AI MOCK INTERVIEW COACH',
    desc: 'Simulates real interviews with real-time vocal telemetry, cadence analytics and rubric scoring.',
    tech: 'REACT.JS / SPEECH API / NLP / VERCEL',
    visualText: 'Low-Stakes Practice. High Impact.',
    image: '/assets/images/work_interview_laptop.jpg',
    liveUrl: 'https://ai-i-nterview.vercel.app'
  },
  {
    id: 'career-coach',
    num: '02',
    title: 'AI CAREER COACH & ROADMAPS',
    desc: 'Resume AST gap identification, 8-semester milestone roadmaps, and conversational guidance.',
    tech: 'NEXT.JS 14 / GEMINI API / NODE.JS',
    visualText: 'Guidance Made Simple.',
    image: '/assets/images/work_whatsapp_pay.jpg',
    liveUrl: 'https://ai-career-coach-full-stack.vercel.app'
  },
  {
    id: 'naac-agent',
    num: '03',
    title: 'NAAC / NIRF MULTI-AGENT SWARM',
    desc: 'Autonomous n8n engine with 9 GPT-4o sub-agents handling compliance data collection and score prediction.',
    tech: 'n8n ENTERPRISE / GPT-4o / AIRTABLE',
    visualText: 'Automate What Matters.',
    image: '/assets/images/work_ai_automation.jpg',
    liveUrl: null
  },
  {
    id: 'resume-builder',
    num: '04',
    title: 'AI RESUME BUILDER (ATS)',
    desc: 'Transforms raw bullets into quantified, impact-oriented statements with ATS vector PDF export.',
    tech: 'REACT.JS / CONTEXT PHRASING / VERCEL',
    visualText: 'Systems for Tomorrow.',
    image: '/assets/images/work_fullstack_arch.jpg',
    liveUrl: 'https://remix-of-ai-resume-spark-main.vercel.app'
  }
];

const moreProductionProjects = [
  {
    title: 'AI Course Generator',
    desc: 'Auto-generates structured lessons & module hierarchies from any topic.',
    url: 'https://project-six-delta-36.vercel.app',
    tag: 'REACT + LLM'
  },
  {
    title: 'Adaptive E-Learning Platform',
    desc: 'Personalized course delivery adapting to individual student mastery.',
    url: 'https://coure-brown.vercel.app',
    tag: 'FULL-STACK VERCEL'
  },
  {
    title: 'Medical Image Diagnosis Assistant',
    desc: 'Deep learning preliminary radiological screening and abnormality detector.',
    url: null,
    tag: 'TENSORFLOW + OPENCV'
  },
  {
    title: 'Finova Personal Finance System',
    desc: 'Intelligent expense categorization, cashflow forecasting, and budget telemetry.',
    url: null,
    tag: 'REACT + NODE API'
  },
  {
    title: 'Logistics Operations & Dispatch',
    desc: 'End-to-end delivery shipment routing, driver telemetry, and live order tracking.',
    url: null,
    tag: 'REST API + MAPS'
  },
  {
    title: 'Complete WhatsApp Multimodal Agent ("Sam")',
    desc: 'Accepts voice, text, and image inputs with persistent memory and tool routing.',
    url: null,
    tag: 'n8n + GPT-4o'
  }
];

export default function WorkArchive({ onOpenProject }) {
  return (
    <section className="featured-work-strip-section" id="featured-work">
      <div className="page-container">
        
        <div className="strip-layout-wrapper">
          
          {/* Left Vertical Label */}
          <div className="strip-left-label">
            <h2 className="strip-label-title">FEATURED<br />WORK</h2>
            <p className="strip-label-sub">
              15+ PRODUCTION APPS.<br />
              30+ AGENTS ARCHITECTED.<br />
              MEASURABLE RESULTS.
            </p>
          </div>

          {/* 4 Horizontally Arranged Columns */}
          <div className="strip-four-columns">
            {featuredStripItems.map(item => (
              <div 
                className="strip-card gold-shimmer-card" 
                key={item.id}
                onClick={() => onOpenProject(item.id)}
              >
                <div className="strip-card-top">
                  <div className="strip-num-arrow">
                    <span className="strip-num">{item.num}</span>
                    <ArrowUpRight size={18} className="strip-arrow" />
                  </div>
                  <h3 className="strip-proj-title">{item.title}</h3>
                  <p className="strip-proj-tagline">{item.desc}</p>
                  <div className="strip-tech-pill-row">{item.tech}</div>
                </div>

                <div className="strip-card-visual-box">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="strip-visual-img"
                  />
                  <div className="strip-visual-overlay">
                    <span className="visual-box-overlay-text">{item.visualText}</span>
                  </div>
                </div>

                <div className="card-live-link-pill" onClick={(e) => e.stopPropagation()}>
                  {item.liveUrl ? (
                    <a href={item.liveUrl} target="_blank" rel="noopener noreferrer">
                      <span>OPEN LIVE APP</span>
                      <ExternalLink size={10} />
                    </a>
                  ) : (
                    <span className="pill-system-tag">
                      <span>SYS // AUTONOMOUS SWARM</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Link */}
          <div className="strip-right-link">
            <a href="#more-projects">EXPANDED ARCHIVE →</a>
          </div>

        </div>

        {/* Secondary Extended Production Systems Grid */}
        <div className="extended-projects-grid" id="more-projects">
          <div className="extended-grid-head">
            <span className="extended-tag">ADDITIONAL PRODUCTION SYSTEMS &amp; AGENTS</span>
            <span className="extended-sub">DEEP TECHNICAL IMPLEMENTATIONS FROM CONTEXT</span>
          </div>

          <div className="extended-cards-row">
            {moreProductionProjects.map((proj, idx) => (
              <div className="extended-proj-card gold-shimmer-card" key={idx}>
                <div className="ext-top">
                  <span className="ext-tag">{proj.tag}</span>
                  {proj.url && (
                    <a href={proj.url} target="_blank" rel="noopener noreferrer" className="ext-link-icon">
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
                <h4 className="ext-title">{proj.title}</h4>
                <p className="ext-desc">{proj.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
