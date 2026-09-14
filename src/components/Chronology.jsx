import React from 'react';

const experiences = [
  {
    period: '2024 — PRESENT',
    periodSub: 'ACTIVE ROLE',
    role: 'Freelance Tech & Creative Lead',
    org: 'STRIKKERZ TEAM // CLIENT CONTRACTS',
    impacts: [
      'Directing end-to-end full-stack development using React.js, WordPress, and Firebase for clients across education and small enterprise domains.',
      'Architecting UI/UX design systems, branding collaterals, and high-impact digital content strategies to boost organic customer engagement.',
      'Overseeing automated deployment pipelines on GitHub and Vercel with zero downtime.'
    ],
    tech: ['React.js', 'Firebase', 'Vercel', 'Canva']
  },
  {
    period: 'OCT 2024 — JUN 2025',
    periodSub: 'COMPLETED',
    role: 'Machine Learning & Data Science Intern',
    org: 'YELLOWMATICS // TAMIL NADU, IN',
    impacts: [
      'Engineered and tuned predictive machine learning and computer vision models using TensorFlow, PyTorch, and Python.',
      'Executed the complete lifecycle: raw dataset cleansing, feature engineering, model validation, and deployment as lightweight Flask REST APIs.',
      'Optimized model inference latency for real-time visual analytics workflows.'
    ],
    tech: ['PyTorch', 'TensorFlow', 'Flask', 'REST APIs']
  },
  {
    period: '2023 — PRESENT',
    periodSub: 'LEADERSHIP',
    role: 'Core Innovator & AI Evangelist',
    org: 'AINNOVAT INNOVATORS CLUB // MAHENDRA ENGG',
    impacts: [
      'Organized and conducted peer workshops on Prompt Engineering, LLM Integration, and Full-Stack development for 300+ students.',
      'Mentored competitive hackathon teams and represented the college in state & national level engineering symposiums.',
      'Served as Anti-Ragging Campaign Leader, enforcing campus safety and community ethics.'
    ],
    tech: ['AI Evangelism', 'Tech Mentorship', 'Hackathons']
  }
];

export default function Chronology() {
  return (
    <section className="system-section" id="chronology">
      <div className="system-container">
        
        <div className="section-head">
          <div className="section-index-wrapper">
            <span className="section-num">03.</span>
            <span className="section-tagline">PROFESSIONAL TRAJECTORY</span>
          </div>
          <div className="section-heading-row">
            <h2 className="section-title">CHRONOLOGY &amp; IMPACT</h2>
            <p className="section-lead">
              A high-scannability timeline designed for recruiters and engineering leads. Every role highlights tangible technical ownership and measurable impact.
            </p>
          </div>
        </div>

        <div className="experience-timeline">
          {experiences.map((exp, idx) => (
            <div className="exp-entry" key={idx}>
              <div className="exp-period mono">
                {exp.period}<br />
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{exp.periodSub}</span>
              </div>
              
              <div className="exp-role-group">
                <h3 className="exp-role-title">{exp.role}</h3>
                <span className="exp-org-name">{exp.org}</span>
              </div>

              <ul className="exp-impact-list">
                {exp.impacts.map((impact, i) => (
                  <li className="exp-impact-item" key={i}>{impact}</li>
                ))}
              </ul>

              <div className="exp-tech-stack">
                {exp.tech.map((t, i) => (
                  <span className="stack-tag" key={i}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
