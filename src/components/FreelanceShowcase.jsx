import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ExternalLink, 
  TrendingUp, 
  Truck, 
  UtensilsCrossed, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  CheckCircle2,
  Cpu,
  Zap,
  Globe
} from 'lucide-react';

const freelanceProjects = [
  {
    id: 'freelance-finova',
    num: '01',
    name: 'FINOVA',
    tagline: 'Next-Gen AI Wealth & Predictive Cashflow Telemetry Platform',
    badge: 'FINTECH & FINANCIAL ML',
    clientTag: 'Enterprise Client Delivery // SaaS',
    icon: TrendingUp,
    accentColor: '#D4AF37',
    image: '/assets/images/freelance_finova.jpg',
    summary: 'Architected an ultra-fast fintech dashboard providing automated expense classification, cashflow projections, and multi-tier asset allocation metrics with sub-second ML analytics.',
    metrics: [
      { label: 'Forecast Accuracy', value: '+38%' },
      { label: 'Latency', value: '< 95ms' },
      { label: 'Asset Volume', value: '$1.8M+' }
    ],
    highlights: [
      'Automated time-series predictive modeling for monthly burn and runway projections',
      'Real-time transaction webhook pipeline with automatic categorization heuristics',
      'High-security biometric session management with AES-256 encrypted payload telemetry'
    ],
    tech: ['React.js', 'Node.js / Express', 'Time-Series ML', 'Chart.js', 'PostgreSQL', 'Tailored CSS'],
    liveUrl: null,
    scope: 'Full-Stack Architecture + Financial ML Engine + Dashboard UI'
  },
  {
    id: 'freelance-logistics',
    num: '02',
    name: 'FLEETFLOW LOGISTICS',
    tagline: 'Intelligent Real-Time Supply Chain & Fleet Dispatch Hub',
    badge: 'LOGISTICS & REAL-TIME IOT',
    clientTag: 'Logistics Enterprise Client // Operations Hub',
    icon: Truck,
    accentColor: '#F59E0B',
    image: '/assets/images/freelance_logistics.jpg',
    summary: 'Engineered a centralized operations center for multi-hub freight dispatching, live GPS route telemetry, dynamic warehouse stock tracking, and driver assignment automation.',
    metrics: [
      { label: 'Active Shipments', value: '1,420+' },
      { label: 'Route Efficiency', value: '+35%' },
      { label: 'On-Time Rate', value: '94%' }
    ],
    highlights: [
      'Interactive global route tracking map with real-time waypoint progression telemetry',
      'Smart dispatch optimizer computing lowest-cost freight routes and carrier assignments',
      'Instant low-stock predictive threshold alerts across cross-docking warehouses'
    ],
    tech: ['Next.js', 'Mapbox / Leaflet', 'Node.js WebSockets', 'Redis Streams', 'REST APIs', 'Docker'],
    liveUrl: null,
    scope: 'End-to-End Dispatch System + Map Telemetry + High-Concurrency API'
  },
  {
    id: 'freelance-mealplan',
    num: '03',
    name: 'MEALPLAN PRO',
    tagline: 'AI-Powered Gourmet Nutrition & Personalized Meal Architect',
    badge: 'FOOD-TECH & CULINARY AI',
    clientTag: 'Health & Wellness Startup // Consumer Web App',
    icon: UtensilsCrossed,
    accentColor: '#10B981',
    image: '/assets/images/freelance_mealplan.jpg',
    summary: 'Built a personalized dietary planning engine that analyzes caloric targets, macro ratios, and food preferences to generate structured weekly culinary calendars with smart grocery lists.',
    metrics: [
      { label: 'Macro Precision', value: '99.4%' },
      { label: 'Meal Variety', value: '100+ Diets' },
      { label: 'Prep Time Saved', value: '5 hrs/wk' }
    ],
    highlights: [
      'Targeted macro-nutrient optimizer calculating exact protein, carb, and healthy fat distribution',
      'Dynamic ingredient checklist that automatically consolidates grocery shopping lists',
      'Custom recipe recommendation pipeline tailored to allergies, keto, vegan, and athletic profiles'
    ],
    tech: ['React.js', 'LLM / Gemini API', 'Python / FastAPI', 'Tailored CSS', 'Nutrition Algorithms'],
    liveUrl: null,
    scope: 'AI Nutrition Pipeline + Interactive Planner UI + Recipe Engine'
  }
];

export default function FreelanceShowcase({ onOpenProject }) {
  const [activeTab, setActiveTab] = useState(0);
  const current = freelanceProjects[activeTab];

  return (
    <section className="freelance-section" id="freelance">
      <div className="page-container">
        
        {/* Section Header */}
        <div className="freelance-header-block">
          <div className="freelance-header-left">
            <div className="freelance-badge-row">
              <span className="freelance-kicker">
                <BriefcaseIcon size={12} />
                <span>FREELANCE &amp; CLIENT DELIVERIES</span>
              </span>
              <span className="freelance-counter-pill">
                <Sparkles size={11} />
                <span>3 BESPOKE PRODUCTION BUILDS</span>
              </span>
            </div>
            <h2 className="freelance-main-title">
              COMMISSIONED SYSTEMS &amp; FREELANCE BUILDS
            </h2>
            <p className="freelance-subtitle">
              High-impact, production-tested software engineered for client organizations — spanning <strong>Fintech Analytics</strong>, <strong>Logistics Operations</strong>, and <strong>Food-Tech AI</strong>.
            </p>
          </div>

          <div className="freelance-header-stats">
            <div className="freelance-stat-card">
              <span className="stat-big-num">100%</span>
              <span className="stat-label">Client Delivery Success</span>
            </div>
            <div className="freelance-stat-card">
              <span className="stat-big-num">Full-Stack</span>
              <span className="stat-label">Architecture to Deploy</span>
            </div>
          </div>
        </div>

        {/* Interactive Tab Navigator */}
        <div className="freelance-tabs-bar">
          {freelanceProjects.map((proj, idx) => {
            const IconComp = proj.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={proj.id}
                className={`freelance-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(idx)}
              >
                <div className="tab-left-indicator">
                  <span className="tab-num">{proj.num}</span>
                  <IconComp size={15} className="tab-icon" />
                </div>
                <div className="tab-text-info">
                  <span className="tab-proj-name">{proj.name}</span>
                  <span className="tab-proj-badge">{proj.badge}</span>
                </div>
                {isActive && <div className="tab-active-glow" />}
              </button>
            );
          })}
        </div>

        {/* Featured Showcase Card for Current Selection */}
        <div className="freelance-featured-showcase">
          <div className="freelance-showcase-grid">
            
            {/* Left Column: Visual Mockup Showcase */}
            <div className="freelance-visual-col">
              <div 
                className="freelance-image-frame"
                onClick={() => onOpenProject && onOpenProject(current.id)}
                title="Click to view deep dive system schematic"
              >
                <div className="frame-browser-bar">
                  <div className="frame-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                  <span className="frame-url-tag">https://client-production.{current.name.toLowerCase().replace(/\s+/g, '')}.app</span>
                  <span className="frame-live-indicator">
                    <span className="live-pulse"></span>
                    <span>PRODUCTION CLIENT BUILD</span>
                  </span>
                </div>

                <div className="freelance-img-wrapper">
                  <img 
                    src={current.image} 
                    alt={current.name} 
                    className="freelance-mockup-img"
                    loading="lazy"
                  />
                  <div className="freelance-img-overlay">
                    <span className="overlay-inspect-btn">
                      <span>INSPECT SYSTEM DOSSIER</span>
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </div>

              {/* Metrics Row */}
              <div className="freelance-metrics-strip">
                {current.metrics.map((m, mIdx) => (
                  <div className="metric-chip" key={mIdx}>
                    <span className="metric-val">{m.value}</span>
                    <span className="metric-lbl">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Deep Specifications & Details */}
            <div className="freelance-details-col">
              
              <div className="details-header-meta">
                <span className="client-tag-pill">
                  <ShieldCheck size={12} />
                  <span>{current.clientTag}</span>
                </span>
                <span className="scope-tag-pill">
                  <Zap size={11} />
                  <span>{current.scope}</span>
                </span>
              </div>

              <h3 className="details-project-title">
                {current.name}
              </h3>
              <p className="details-tagline">{current.tagline}</p>

              <p className="details-summary-text">
                {current.summary}
              </p>

              {/* Engineering Highlights */}
              <div className="details-section-box">
                <span className="box-section-title">
                  <Layers size={13} />
                  <span>KEY ARCHITECTURAL HIGHLIGHTS</span>
                </span>
                <ul className="highlights-list">
                  {current.highlights.map((item, hIdx) => (
                    <li key={hIdx} className="highlight-item">
                      <CheckCircle2 size={14} className="check-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Matrix */}
              <div className="details-tech-block">
                <span className="tech-block-label">
                  <Cpu size={12} />
                  <span>TECHNOLOGIES &amp; PROTOCOLS</span>
                </span>
                <div className="tech-tags-wrap">
                  {current.tech.map((t, tIdx) => (
                    <span key={tIdx} className="freelance-tech-pill">{t}</span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="details-actions-row">
                <button 
                  className="btn-freelance-dossier"
                  onClick={() => onOpenProject && onOpenProject(current.id)}
                >
                  <span>VIEW FULL ARCHITECTURE DOSSIER</span>
                  <ArrowUpRight size={15} />
                </button>
                <a 
                  href="#contact" 
                  className="btn-freelance-commission"
                >
                  <span>COMMISSION SIMILAR SYSTEM</span>
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* 3-Card Summary Grid for Quick Overview */}
        <div className="freelance-cards-triplet">
          {freelanceProjects.map((proj, idx) => (
            <div 
              key={proj.id} 
              className={`freelance-triplet-card ${activeTab === idx ? 'current-active' : ''}`}
              onClick={() => {
                setActiveTab(idx);
                const el = document.getElementById('freelance');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="triplet-thumb-wrap">
                <img src={proj.image} alt={proj.name} className="triplet-thumb-img" />
                <span className="triplet-num-badge">{proj.num}</span>
              </div>
              <div className="triplet-info">
                <span className="triplet-badge">{proj.badge}</span>
                <h4 className="triplet-title">{proj.name}</h4>
                <p className="triplet-desc">{proj.tagline}</p>
                <div className="triplet-footer">
                  <span className="triplet-view-label">
                    <span>Explore Build</span>
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function BriefcaseIcon({ size = 14 }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  );
}
