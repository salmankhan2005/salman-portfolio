import React from 'react';

const pillars = [
  {
    id: 'SYS.01',
    status: '30+ WORKFLOWS',
    name: 'AUTONOMOUS MULTI-AGENT ORCHESTRATION',
    desc: 'Engineering multi-agent ecosystems on n8n & Python with Master Orchestrator routing, parallel sub-agent reasoning (NAAC, NIRF, NBA), and multi-modal tool calling.',
    techs: [
      { name: 'n8n Enterprise & Multi-Agent Swarms', tier: 'PROD' },
      { name: 'NAAC / NIRF 9-Sub-Agent Orchestrator', tier: 'ENTERPRISE' },
      { name: 'Multimodal WhatsApp Agent ("Sam")', tier: 'GPT-4o' },
      { name: 'Document RAG & Supabase Vector Store', tier: 'TIER 1' },
      { name: 'Telegram Invoice OCR & Financial Pipeline', tier: 'TIER 1' }
    ]
  },
  {
    id: 'SYS.02',
    status: 'PRODUCTION APPS',
    name: 'FULL-STACK SYSTEMS & CLOUD APIS',
    desc: 'Architecting end-to-end web applications with type-safe state pipelines, responsive UI/UX architecture, persistent databases, and zero-downtime CI/CD on Vercel.',
    techs: [
      { name: 'React.js, Next.js 14, Vite & Tailwind', tier: 'TIER 1' },
      { name: 'Node.js, Express & Python Flask APIs', tier: 'TIER 1' },
      { name: 'PostgreSQL, Neon, Supabase & Firebase', tier: 'TIER 1' },
      { name: 'ATS Resume Engine & Career Roadmap AST', tier: 'LIVE' },
      { name: 'Antigravity Full-Stack AI Toolchains', tier: 'EXPERT' }
    ]
  },
  {
    id: 'SYS.03',
    status: 'INDUSTRY RIGOR',
    name: 'MACHINE LEARNING & COMPUTER VISION',
    desc: 'Industrial ML experience from Yellowmatics: end-to-end model development, data preprocessing, model evaluation, and low-latency REST microservice inference.',
    techs: [
      { name: 'Yellowmatics ML & Computer Vision Intern', tier: 'EXPERIENCE' },
      { name: 'PyTorch, TensorFlow & Scikit-Learn', tier: 'TIER 1' },
      { name: 'YOLOv8 Real-Time Object Telemetry', tier: 'TIER 1' },
      { name: 'OpenCV Video Analytics Pipelines', tier: 'TIER 1' },
      { name: 'Lightweight Flask REST Inference APIs', tier: 'PROD' }
    ]
  },
  {
    id: 'SYS.04',
    status: 'ACADEMIC RIGOR',
    name: 'EDGE IOT & RESEARCH PUBLICATION',
    desc: 'Peer-reviewed research and hardware sensor telemetry. Authored published research on edge anomaly detection deployed on low-power IoT microcomputers.',
    techs: [
      { name: 'B.Tech AI & Data Science (8.72 CGPA)', tier: 'MAHENDRA' },
      { name: 'Published Research: IoT Anomaly Detection', tier: 'PAPER' },
      { name: 'Raspberry Pi & Hardware Sensor Telemetry', tier: 'TIER 1' },
      { name: 'NPTEL Cloud Computing (Elite Score)', tier: 'GOVT. IN' },
      { name: 'MSME, SAP & CATCH Hackathon Finalist', tier: 'AWARDS' }
    ]
  }
];

export default function SystemsMatrix() {
  return (
    <section className="system-section" id="systems">
      <div className="system-container">
        
        <div className="section-head">
          <div className="section-index-wrapper">
            <span className="section-num">01.</span>
            <span className="section-tagline">CORE CAPABILITIES MATRIX</span>
          </div>
          <div className="section-heading-row">
            <h2 className="section-title">THE SYSTEMS I ARCHITECT</h2>
            <p className="section-lead">
              Structured capabilities backed by 15+ live production web deployments, 30+ autonomous n8n agent workflows, and published machine learning research.
            </p>
          </div>
        </div>

        <div className="systems-matrix">
          {pillars.map(pillar => (
            <div className="system-pillar-card gold-shimmer-card" key={pillar.id} id={`pillar-${pillar.id.toLowerCase()}`}>
              <div>
                <div className="pillar-top-meta">
                  <span className="pillar-id">{pillar.id}</span>
                  <span className="pillar-status">{pillar.status}</span>
                </div>
                <h3 className="pillar-name">{pillar.name}</h3>
                <p className="pillar-desc">{pillar.desc}</p>
              </div>

              <ul className="pillar-tech-list">
                {pillar.techs.map((t, idx) => (
                  <li className="pillar-tech-item" key={idx}>
                    <span className="tech-name">{t.name}</span>
                    <span className="tech-tier">{t.tier}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
