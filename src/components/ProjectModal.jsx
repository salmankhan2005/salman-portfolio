import React from 'react';
import { ExternalLink, X } from 'lucide-react';

const projectDatabase = {
  'interview': {
    id: 'SYS-01',
    title: 'AI Mock Interview Platform & Real-Time Vocal Analytics',
    category: 'AI & NATURAL LANGUAGE PROCESSING',
    role: 'Lead Architect & Full-Stack Engineer',
    liveUrl: 'https://ai-i-nterview.vercel.app',
    status: 'Live Production // Vercel',
    tech: ['React.js', 'NLP Pipeline', 'Speech Recognition API', 'Vercel Edge', 'Node.js'],
    problem: 'Job applicants face high anxiety and lack objective, repetitive feedback on speech cadence, technical depth, and answer structure prior to high-stakes interviews.',
    solution: 'Constructed an automated mock interview simulator that presents domain-specific prompts, ingests microphone stream or transcribed input, and evaluates answers against rubrics with sub-second feedback on clarity, filler words, and technical precision.',
    architecture: [
      'Client Audio/Text Stream -> Speech Processing Unit',
      'NLP Scoring Pipeline -> Rubric Evaluation Engine',
      'Instant Feedback Visualizer & Performance Metric Generator'
    ]
  },
  'career-coach': {
    id: 'SYS-02',
    title: 'Full-Stack AI Career Coach & Strategic Roadmap Engine',
    category: 'GENERATIVE AI & WORKFORCE INTELLIGENCE',
    role: 'Full-Stack Developer & AI Integrator',
    liveUrl: 'https://ai-career-coach-full-stack.vercel.app',
    status: 'Live Production // Vercel',
    tech: ['Next.js 14', 'OpenAI / Gemini API', 'Node Backend', 'Persistent Sessions', 'CSS Modules'],
    problem: 'Students and early-career engineers struggle to bridge the gap between generic academic coursework and role-specific industry competencies.',
    solution: 'Engineered an interactive conversational career coach that performs resume AST analysis, detects specific technical blind spots, recommends concrete open-source milestones, and generates an 8-semester roadmap for tech roles.',
    architecture: [
      'User Profile & Resume Ingestion -> AST Parser',
      'LLM Prompt Chains -> Gap Analysis & Role Benchmark Matrix',
      'Dynamic Roadmap Renderer -> Client-Side State'
    ]
  },
  'naac-agent': {
    id: 'SYS-03',
    title: 'NAAC & NIRF Accreditation Multi-Agent Pipeline',
    category: 'AUTONOMOUS MULTI-AGENT SYSTEMS',
    role: 'Enterprise Automation Architect',
    liveUrl: null,
    status: 'Enterprise Deployed // Higher Ed',
    tech: ['n8n Enterprise', 'GPT-4o Sub-Agents', 'Webhook Gateways', 'Airtable / Postgres', 'Document Generation'],
    problem: 'College accreditation workflows (NAAC/NIRF/NBA) require manual data collection across 10+ disparate departments, manual metric computations, and weeks of report compilation.',
    solution: 'Built an orchestrated n8n automation engine utilizing 9 specialized GPT-4o sub-agents coordinated by a Master Orchestrator. The system verifies compliance criteria, benchmarks syllabus data against IITs/NITs, and predicts accreditation audit scores automatically.',
    architecture: [
      'Department Ingestion Webhooks -> Master Orchestrator',
      'Parallel Sub-Agents: Auditor, Benchmarker, Advisor, Score Predictor',
      'Consolidated Audit Dossier & Automated PDF/Spreadsheet Output'
    ]
  },
  'resume-builder': {
    id: 'SYS-04',
    title: 'AI Resume Builder (ATS-Optimized Formatting)',
    category: 'PRODUCT UTILITY & ATS PARSING',
    role: 'Frontend Architect & AI Integrator',
    liveUrl: 'https://remix-of-ai-resume-spark-main.vercel.app',
    status: 'Live Production // Vercel',
    tech: ['React.js', 'Context-Aware Phrasing', 'Vercel', 'Export Pipeline', 'Modular CSS'],
    problem: 'Candidates often fail initial recruitment screenings due to unparsable resume layouts and vague impact descriptions.',
    solution: 'Developed an ATS-friendly builder that takes bullet points and converts them into quantified, impact-oriented statements using targeted action verbs and clean typography.',
    architecture: [
      'Raw Input Fields -> Context Optimization Transformer',
      'ATS Pre-flight Linting -> Formatting Sandbox',
      'Direct Vector PDF Export Engine'
    ]
  },
  'course-generator': {
    id: 'SYS-05',
    title: 'AI Course & Structured Curriculum Generator',
    category: 'KNOWLEDGE SYSTEMS & E-LEARNING',
    role: 'Lead Developer',
    liveUrl: 'https://project-six-delta-36.vercel.app',
    status: 'Live Production // Vercel',
    tech: ['React.js', 'LLM Prompt Engineering', 'Vercel', 'Markdown Parser'],
    problem: 'Educators and self-directed learners spend excessive hours manually organizing topics into modular lessons and hands-on exercises.',
    solution: 'Created an intelligent application that decomposes any subject topic into structured pedagogical modules, generating conceptual overviews, code snippets, and assessment questions in real-time.',
    architecture: [
      'Topic Input -> Hierarchy Decomposer',
      'Module-by-Module Generation Stream',
      'Interactive Quiz & Milestone Assessment Builder'
    ]
  },
  'yolo-detection': {
    id: 'SYS-06',
    title: 'Real-Time YOLO & OpenCV Visual Analytics System',
    category: 'COMPUTER VISION & EDGE COMPUTING',
    role: 'Lead ML Engineer',
    liveUrl: null,
    status: 'Research Prototype // Python',
    tech: ['YOLOv8', 'OpenCV', 'Python', 'Flask REST API', 'Bounding Box Telemetry'],
    problem: 'Human surveillance of camera feeds is error-prone and labor-intensive for security and high-density tracking.',
    solution: 'Implemented a lightweight real-time object detection and classification pipeline that identifies spatial anomalies, counts items, and generates live telemetry logs with 60% reduction in manual oversight.',
    architecture: [
      'Video Frame Feed -> Preprocessing & Tensor Normalization',
      'YOLOv8 Inference Engine -> Coordinate Bounding Boxes',
      'Anomaly Flagging & Automated Log Dispatch'
    ]
  },
  'iot-security': {
    id: 'SYS-07',
    title: 'IoT Home Security System & ML Anomaly Detection',
    category: 'HARDWARE & EDGE EMBEDDED ML',
    role: 'Hardware & ML Researcher',
    liveUrl: null,
    status: 'Published Conference Paper',
    tech: ['Raspberry Pi', 'Python', 'IoT PIR/Camera Sensors', 'Edge Classifier', 'Cloud Alert Gateway'],
    problem: 'Conventional home alarm systems trigger excessive false alarms from pet movement and environmental shifts.',
    solution: 'Designed an edge security hub that pairs low-power microcontrollers with a localized machine learning anomaly filter, providing instant verified intrusion alerts with remote push notifications.',
    architecture: [
      'Hardware Sensor Matrix -> Edge Preprocessing',
      'Embedded Machine Learning Anomaly Scorer',
      'Cloud Telemetry Hub -> Remote Alert Dispatch'
    ]
  },
  'freelance-finova': {
    id: 'CLIENT-01',
    title: 'Finova: Next-Gen AI Wealth & Cashflow Telemetry Platform',
    category: 'FINTECH & FINANCIAL MACHINE LEARNING',
    role: 'Lead Architect & Full-Stack Engineer (Freelance Client Delivery)',
    liveUrl: null,
    status: 'Client Production Deployed // SaaS',
    tech: ['React.js', 'Node.js / Express', 'Time-Series ML Models', 'Chart.js', 'PostgreSQL', 'Tailored Dark Theme CSS'],
    problem: 'SMEs and individual portfolio managers struggle to track volatile cashflow, predict multi-month runway, and aggregate disparate banking APIs into cohesive real-time actionable dashboards.',
    solution: 'Designed and deployed Finova, an enterprise financial analytics suite featuring automated expense classification, predictive monthly burn models, and AES-256 encrypted multi-account telemetry with sub-100ms dashboard refreshes.',
    architecture: [
      'Banking Webhook Streams & Ledger Ingestion -> Normalization Layer',
      'Time-Series Predictive ML Engine -> Cashflow & Burn Forecast Matrix',
      'Encrypted Real-Time Telemetry & Glassmorphic Analytics Dashboard'
    ]
  },
  'freelance-logistics': {
    id: 'CLIENT-02',
    title: 'FleetFlow: Global Supply Chain & Dispatch Operations Center',
    category: 'LOGISTICS & REAL-TIME DISPATCH',
    role: 'Systems Architect & Backend Lead (Freelance Enterprise Delivery)',
    liveUrl: null,
    status: 'Client Operations Center // Live Enterprise',
    tech: ['Next.js', 'Mapbox GL / Leaflet', 'Node.js WebSockets', 'Redis Streams', 'REST APIs', 'Docker Containers'],
    problem: 'Freight operations centers suffer from fragmented driver communication, high route calculation latencies, and delayed warehouse stock reorder alerts.',
    solution: 'Engineered a centralized real-time logistics operations hub featuring interactive GPS vehicle tracking, automated lowest-cost route calculation, driver load assignment queues, and predictive warehouse threshold alerts.',
    architecture: [
      'IoT Vehicle Telemetry & GPS Stream -> Redis Geo Streams Buffer',
      'Route Optimization Solver -> Dispatch Queue & ETA Predictor',
      'Real-Time WebSocket Broadcast -> Operations Operations Center UI'
    ]
  },
  'freelance-mealplan': {
    id: 'CLIENT-03',
    title: 'MealPlan Pro: AI Gourmet Nutrition & Personalized Meal Architect',
    category: 'FOOD-TECH & CULINARY AI',
    role: 'Full-Stack AI Developer & UI Engineer (Freelance Startup Delivery)',
    liveUrl: null,
    status: 'Production Web App // Health & Wellness',
    tech: ['React.js', 'LLM / Gemini API', 'FastAPI / Python Backend', 'Nutrient Macro AST', 'Tailored Responsive CSS'],
    problem: 'Fitness and dietary clients frequently abandon meal plans due to rigid generic menus, lack of ingredient flexibility, and time-consuming manual grocery preparation.',
    solution: 'Constructed an adaptive food-tech web application that turns caloric targets, macro split constraints, and personal dietary preferences into customized 7-day culinary calendars with dynamic ingredient substitution and one-click grocery lists.',
    architecture: [
      'Biometric Target & Allergy Ingestion -> Macro Constraint Solver',
      'LLM Culinary Reasoning Pipeline -> 7-Day Recipe Schedule Generator',
      'Interactive Recipe Spotlight, Caloric Telemetry & Grocery Consolidator'
    ]
  }
};

export default function ProjectModal({ projectId, onClose }) {
  if (!projectId) return null;
  const data = projectDatabase[projectId];
  if (!data) return null;

  return (
    <div className="system-modal-backdrop active" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', fontWeight: 700 }}>
              {data.id}
            </span>
            <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
              // SYSTEM SCHEMATIC
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div>
              <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--gold-primary)', letterSpacing: '0.05em', fontWeight: 600 }}>
                {data.category}
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.6rem', lineHeight: 1.25, marginTop: '0.35rem', color: 'var(--text-primary)' }}>
                {data.title}
              </h3>
              <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <span>ROLE: {data.role}</span>
                <span>STATUS: {data.status}</span>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-hairline)' }}>
              <div className="mono" style={{ fontSize: '0.68rem', color: 'var(--gold-primary)', textTransform: 'uppercase', marginBottom: '0.35rem', fontWeight: 600 }}>
                PROBLEM STATEMENT
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {data.problem}
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-hairline)' }}>
              <div className="mono" style={{ fontSize: '0.68rem', color: 'var(--gold-primary)', textTransform: 'uppercase', marginBottom: '0.35rem', fontWeight: 600 }}>
                ENGINEERING SOLUTION
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {data.solution}
              </p>
            </div>

            <div>
              <div className="mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                SYSTEM ARCHITECTURE PIPELINE
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {data.architecture.map((step, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-primary)', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-hairline)', padding: '0.6rem 0.85rem', borderRadius: '2px' }}>
                    <span style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>0{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                STACK APPLIED
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {data.tech.map((t, idx) => (
                  <span className="stack-tag" key={idx}>{t}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.25rem', borderTop: '1px solid var(--border-hairline)', marginTop: '0.5rem' }}>
              {data.liveUrl ? (
                <a href={data.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-system-primary">
                  <span>VISIT LIVE DEPLOYMENT</span>
                  <ExternalLink size={13} />
                </a>
              ) : (
                <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  CODE &amp; SYSTEM SPECS ON REQUEST
                </span>
              )}
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
