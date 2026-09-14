import React from 'react';

const credentials = [
  {
    category: 'ACADEMIC EXCELLENCE',
    title: 'B.Tech in Artificial Intelligence & Data Science',
    org: 'Mahendra Engineering College • 8.72 CGPA',
    detail: 'Rigorous curriculum spanning Deep Learning, Computer Vision, Distributed Systems, Data Structures & Algorithms, and Object-Oriented Design.'
  },
  {
    category: 'RESEARCH PUBLICATION',
    title: 'ML-Based IoT Home Security & Anomaly Detection',
    org: 'Presented at National Technical Symposium',
    detail: 'Authored and presented original research detailing edge anomaly detection algorithms deployed on low-power IoT microcomputers with real-time cloud alerting.'
  },
  {
    category: 'HACKATHON FINALIST',
    title: 'MSME & SAP National Hackathons',
    org: 'Finalist • 2024 & 2025',
    detail: 'Multi-time finalist across competitive hackathons including MSME Hackathon, SAP Hackathon, CATCH 2024 & 2025, and EDU-HACK INSPIRE.'
  },
  {
    category: 'NPTEL CERTIFICATION',
    title: 'Cloud Computing (Elite Score)',
    org: 'Ministry of Education, Govt. of India',
    detail: 'Comprehensive certification in cloud infrastructure, virtualization, container orchestration, and serverless compute paradigms.'
  },
  {
    category: 'NPTEL CERTIFICATION',
    title: 'Core Java Programming',
    org: 'IIT Kharagpur / NPTEL',
    detail: 'Formal verification of OOP foundations, memory management, multi-threading, concurrency, and enterprise design patterns.'
  },
  {
    category: 'AI SYSTEMS MASTERY',
    title: 'LLMs, LangChain & n8n Enterprise Workflows',
    org: 'Self-Directed & Industry Applied',
    detail: 'Hands-on mastery of autonomous agent architectures, multi-tenant conversational interfaces, and RAG document ingestion systems.'
  }
];

export default function Credentials() {
  return (
    <section className="system-section" id="credentials">
      <div className="system-container">
        
        <div className="section-head">
          <div className="section-index-wrapper">
            <span className="section-num">05.</span>
            <span className="section-tagline">VALIDATION &amp; RECOGNITION</span>
          </div>
          <div className="section-heading-row">
            <h2 className="section-title">CREDENTIALS &amp; RESEARCH</h2>
            <p className="section-lead">
              Academic pedigree, peer-reviewed publications, and competitive hackathon achievements validating problem-solving aptitude under intense constraints.
            </p>
          </div>
        </div>

        <div className="credentials-grid">
          {credentials.map((cred, idx) => (
            <div className="credential-card" key={idx}>
              <span className="cred-category">{cred.category}</span>
              <h3 className="cred-title">{cred.title}</h3>
              <span className="cred-org">{cred.org}</span>
              <p className="cred-detail">{cred.detail}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
