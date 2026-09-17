import React, { useState } from 'react';
import { 
  ExternalLink, 
  X, 
  Layers, 
  FileText, 
  Cpu, 
  ShieldCheck, 
  Activity, 
  Zap, 
  ArrowRight,
  Code2,
  Database,
  Globe
} from 'lucide-react';

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
    ],
    architectureNodes: [
      {
        id: 'node-1',
        title: 'Client Audio & Stream Ingestion',
        layer: 'Edge Input Layer',
        tech: 'Web Audio API • React 18',
        icon: Globe,
        latency: '< 15ms',
        security: 'WSS / TLS 1.3 Stream',
        payload: { stream: 'PCM Audio Buffer', sampleRate: '44.1kHz', channels: 1, chunkSize: '256KB' },
        details: 'Captures high-fidelity vocal stream, applies client-side noise suppression, and converts audio stream to raw PCM buffers for tokenization.'
      },
      {
        id: 'node-2',
        title: 'NLP Speech Processing Gateway',
        layer: 'Processing Gateway',
        tech: 'Vercel Edge Function • Node.js',
        icon: Zap,
        latency: '< 35ms',
        security: 'JWT Session Token • CORS Guard',
        payload: { promptId: 'sys-int-04', vocalCadence: '142 wpm', fillerCount: 2, confidence: 0.96 },
        details: 'Normalizes speech transcripts, calculates cadence/filler ratios, and formats question context into structured rubric matrices.'
      },
      {
        id: 'node-3',
        title: 'LLM Scoring & Rubric Engine',
        layer: 'AI Intelligence Engine',
        tech: 'LLM Reasoning • Semantic Matcher',
        icon: Cpu,
        latency: '< 45ms',
        security: 'AES-256 Payload Tokenization',
        payload: { technicalScore: 92, clarityScore: 88, depthEvaluation: 'Senior Grade', weaknesses: ['Edge Cases'] },
        details: 'Evaluates answer semantics against domain rubrics, detecting technical accuracy, depth, and actionable improvement recommendations.'
      },
      {
        id: 'node-4',
        title: 'Real-Time Telemetry & Metric UI',
        layer: 'Client Presentation',
        tech: 'Canvas Visualizer • Chart.js',
        icon: Activity,
        latency: '< 10ms',
        security: 'Stateless Client State',
        payload: { finalGrade: 'A-', recommendationsCount: 3, speechGraph: [12, 18, 24, 21, 19] },
        details: 'Renders sub-second visual analytics, radar skill charts, and personalized vocal pacing suggestions for the candidate.'
      }
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
    ],
    architectureNodes: [
      {
        id: 'node-1',
        title: 'Resume & Profile AST Ingestion',
        layer: 'Client Ingestion Layer',
        tech: 'Next.js 14 • PDF AST Parser',
        icon: Globe,
        latency: '< 25ms',
        security: 'Client-side In-Memory Parsing',
        payload: { candidateRole: 'AI Engineer', extractedSkills: ['PyTorch', 'Next.js', 'n8n'], yoe: 1 },
        details: 'Parses uploaded resumes or prompt profiles into structured Abstract Syntax Trees with skill categorization.'
      },
      {
        id: 'node-2',
        title: 'Industry Role Benchmark Matrix',
        layer: 'Benchmarking Pipeline',
        tech: 'Vector Embeddings • Role Database',
        icon: Database,
        latency: '< 40ms',
        security: 'Cached Role Embeddings',
        payload: { benchmarkTarget: 'Junior AI/ML Engineer', requiredCompetencies: 8, matchedCompetencies: 6 },
        details: 'Compares candidate profile vectors with current industry job description matrices from top tier tech companies.'
      },
      {
        id: 'node-3',
        title: 'LLM Prompt Chaining & Gap Synthesizer',
        layer: 'AI Reasoning Core',
        tech: 'OpenAI GPT-4o • Custom Heuristics',
        icon: Cpu,
        latency: '< 60ms',
        security: 'Rate-Limited API Gateway',
        payload: { detectedGaps: ['Distributed Systems', 'Vector Search'], suggestedMilestones: 4 },
        details: 'Computes actionable learning pathways, recommending curated open-source projects and industry-standard certifications.'
      },
      {
        id: 'node-4',
        title: 'Dynamic Semester Roadmap Visualizer',
        layer: 'Interactive UI Layer',
        tech: 'React Flow • Tailwind Architecture',
        icon: Activity,
        latency: '< 15ms',
        security: 'Persistent Local Storage',
        payload: { totalSemesters: 8, completedMilestones: 12, exportFormat: 'JSON/PDF' },
        details: 'Generates a customizable 8-semester career roadmap with milestone checklists and trackable progress bars.'
      }
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
    ],
    architectureNodes: [
      {
        id: 'node-1',
        title: 'Multi-Department Webhook Gateways',
        layer: 'Ingestion Layer',
        tech: 'n8n REST Webhooks • Ingestion Queue',
        icon: Globe,
        latency: '< 20ms',
        security: 'HMAC Webhook Signatures',
        payload: { departmentCount: 8, facultySubmissions: 142, complianceCycle: '2024-2025' },
        details: 'Collects structured departmental inputs, faculty research publications, and curriculum logs into centralized staging queues.'
      },
      {
        id: 'node-2',
        title: 'Master Agent Orchestrator',
        layer: 'Autonomous Decision Hub',
        tech: 'n8n Enterprise • Python Workers',
        icon: Zap,
        latency: '< 45ms',
        security: 'Role-Based Access Control',
        payload: { activeSubAgents: 9, executionMode: 'Parallel Async', priorityLevel: 'P0' },
        details: 'Coordinates 9 specialized sub-agents, orchestrating parallel data evaluation, dependency checks, and validation passes.'
      },
      {
        id: 'node-3',
        title: 'Parallel Compliance & Benchmark Sub-Agents',
        layer: 'Multi-Agent Execution Layer',
        tech: 'GPT-4o Sub-Agents • Vector Benchmarks',
        icon: Cpu,
        latency: '< 90ms',
        security: 'Zero-Data-Retention Protocol',
        payload: { syllabusScore: 94.2, auditPassRate: '98%', predictedGrade: 'A++' },
        details: 'Specialized sub-agents perform syllabus benchmarking against premier institutions (IITs/NITs) and forecast audit scores.'
      },
      {
        id: 'node-4',
        title: 'Consolidated Dossier & Report Dispatcher',
        layer: 'Output Delivery Layer',
        tech: 'Automated PDF Engine • Google Cloud',
        icon: Database,
        latency: '< 50ms',
        security: 'AES-256 Storage Encryption',
        payload: { generatedPages: 86, auditDossierReady: true, notificationDispatched: true },
        details: 'Generates comprehensive compliance dossiers, executive summary spreadsheets, and alert dispatches for institutional leadership.'
      }
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
    ],
    architectureNodes: [
      {
        id: 'node-1',
        title: 'Bullet Point Ingestion & Semantic Parser',
        layer: 'Input Parsing',
        tech: 'React 18 State • AST Parser',
        icon: Globe,
        latency: '< 10ms',
        security: 'In-Browser Stateless',
        payload: { rawExperienceCount: 4, rawBullets: 12, targetIndustry: 'Software' },
        details: 'Ingests unpolished experience descriptions and tokenizes key verbs, metrics, and technical contributions.'
      },
      {
        id: 'node-2',
        title: 'Action-Verb & Impact Transformer',
        layer: 'NLP Optimization Core',
        tech: 'LLM Prompt Heuristics',
        icon: Zap,
        latency: '< 40ms',
        security: 'Encrypted Request Pipeline',
        payload: { quantificationBoost: '+42%', actionVerbScore: 98, readabilityIndex: 11.2 },
        details: 'Restructures passive text into high-impact XYZ format (Accomplished X by doing Y as measured by Z).'
      },
      {
        id: 'node-3',
        title: 'ATS Pre-flight Linter & Compatibility Scorer',
        layer: 'Verification Engine',
        tech: 'ATS Simulator • Keyword Density Analyzer',
        icon: ShieldCheck,
        latency: '< 20ms',
        security: 'Standardized Font & Layout Filter',
        payload: { atsCompatibilityScore: '99/100', parsingErrors: 0, layoutSafety: 'Guaranteed' },
        details: 'Verifies typography, single-column alignment, and heading hierarchy against modern enterprise ATS systems.'
      },
      {
        id: 'node-4',
        title: 'Vector PDF Engine & Instant Export',
        layer: 'Document Generation',
        tech: 'PDF-Kit / React-PDF Engine',
        icon: Database,
        latency: '< 30ms',
        security: 'Client-side Blob Generator',
        payload: { pageCount: 1, exportSize: '118KB', printReady: true },
        details: 'Renders crisp vector PDF files ready for one-click submission to job applications.'
      }
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
    ],
    architectureNodes: [
      {
        id: 'node-1',
        title: 'Topic Ingestion & Hierarchy Decomposer',
        layer: 'Curriculum Planning Layer',
        tech: 'React UI • Recursive Decomposer',
        icon: Globe,
        latency: '< 20ms',
        security: 'Input Sanitization',
        payload: { topic: 'Autonomous AI Agents', difficulty: 'Advanced', moduleCount: 6 },
        details: 'Analyzes target domain and decomposes broad concepts into prerequisite-ordered syllabus trees.'
      },
      {
        id: 'node-2',
        title: 'Real-Time Streaming Generation Engine',
        layer: 'AI Generation Core',
        tech: 'Edge Streaming API • LLM Chaining',
        icon: Zap,
        latency: '< 50ms',
        security: 'Token Streaming Rate Limiter',
        payload: { streamChunks: 128, tokensPerSec: 42, codeExamples: true },
        details: 'Streams modular lesson content, conceptual code sandboxes, and architecture diagrams into the client.'
      },
      {
        id: 'node-3',
        title: 'Assessment & Interactive Quiz Generator',
        layer: 'Pedagogical Evaluation',
        tech: 'Automated MCQ & Coding Rubric Generator',
        icon: Cpu,
        latency: '< 35ms',
        security: 'Deterministic Answer Hashing',
        payload: { questionsPerModule: 5, difficultyCurve: 'Progressive', codeChallenges: 2 },
        details: 'Synthesizes knowledge-check checkpoints and coding challenges to test conceptual mastery.'
      },
      {
        id: 'node-4',
        title: 'Interactive Course Reader & Markdown Sandbox',
        layer: 'Client Presentation',
        tech: 'Prism.js • Markdown Component Tree',
        icon: Activity,
        latency: '< 10ms',
        security: 'Sandboxed Execution Mode',
        payload: { readingTime: '45 mins', syntaxHighlighting: 'Active', progressState: 'Persistent' },
        details: 'Provides a clean dark-mode reader with live code copy, milestone checkboxes, and progress tracking.'
      }
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
    ],
    architectureNodes: [
      {
        id: 'node-1',
        title: 'Multi-Bank Webhook Streams & Ledger Normalization',
        layer: 'Financial Ingestion Layer',
        tech: 'Node.js Express • Webhook Worker',
        icon: Globe,
        latency: '< 25ms',
        security: 'Mutual TLS • AES-256 Encryption',
        payload: { ledgerEvents: 'Batch 500 txn/sec', currency: 'USD', validation: 'Strict Schema' },
        details: 'Ingests raw banking payloads, cleans categorical anomalies, and maps transactions into normalized ledger streams.'
      },
      {
        id: 'node-2',
        title: 'Time-Series Predictive ML Modeling Engine',
        layer: 'Machine Learning Analytics',
        tech: 'Python ML Service • Time-Series Models',
        icon: Cpu,
        latency: '< 65ms',
        security: 'Zero-Knowledge PII Anonymization',
        payload: { forecastRunway: '14.2 Months', confidenceInterval: '95%', anomalyFlag: false },
        details: 'Executes forward time-series regressions to predict burn rates, seasonal revenue dips, and liquidity runways.'
      },
      {
        id: 'node-3',
        title: 'High-Throughput PostgreSQL & Cache Layer',
        layer: 'Data Storage & Persistence',
        tech: 'PostgreSQL • Redis In-Memory Cache',
        icon: Database,
        latency: '< 15ms',
        security: 'Encrypted at Rest & in Transit',
        payload: { activeAccounts: '1.2k+', cacheHitRate: '96.4%', dbReplication: 'Active' },
        details: 'Maintains low-latency financial state with sub-millisecond query caches for high-concurrency dashboards.'
      },
      {
        id: 'node-4',
        title: 'Glassmorphic Telemetry Analytics Dashboard',
        layer: 'Presentation Layer',
        tech: 'React.js • Chart.js • Custom CSS',
        icon: Activity,
        latency: '< 8ms',
        security: 'Biometric Session Guard',
        payload: { assetVolume: '$1.8M+', renderFPS: '60 FPS', mobileOptimized: true },
        details: 'Visualizes asset distribution, dynamic cashflow curves, and automated tax bracket projections in real time.'
      }
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
    ],
    architectureNodes: [
      {
        id: 'node-1',
        title: 'IoT Vehicle Telemetry & GPS Geo-Streaming',
        layer: 'IoT Ingestion Layer',
        tech: 'MQTT • Node.js Ingestion Gateway',
        icon: Globe,
        latency: '< 18ms',
        security: 'Device Token Authentication',
        payload: { activeTrucks: 1420, gpsFrequency: '1 Hz', geoCoordinates: '[37.7749, -122.4194]' },
        details: 'Streams continuous GPS coordinates, fuel telemetry, and driver status metrics from cross-country freight fleets.'
      },
      {
        id: 'node-2',
        title: 'Redis Streams High-Throughput Buffer',
        layer: 'Real-Time Message Bus',
        tech: 'Redis Geo Streams • Pub/Sub',
        icon: Zap,
        latency: '< 5ms',
        security: 'Private VPC Network',
        payload: { throughput: '4.8k msgs/sec', retentionWindow: '24 Hours', latencyBuffer: 'Zero Loss' },
        details: 'Buffers real-time location vectors and dispatches geographical proximity events for active freight corridors.'
      },
      {
        id: 'node-3',
        title: 'Route Optimization Solver & ETA Predictor',
        layer: 'Algorithmic Optimization Core',
        tech: 'Dijkstra / Heuristic Solver • Python',
        icon: Cpu,
        latency: '< 30ms',
        security: 'Deterministic API Gateway',
        payload: { fuelEfficiencyGain: '+35%', calculatedETA: '3 hrs 12 mins', lowestCostRoute: 'Selected' },
        details: 'Calculates shortest and most cost-effective transit routes, adjusting dynamically for traffic and toll costs.'
      },
      {
        id: 'node-4',
        title: 'Interactive Operations Hub Dashboard',
        layer: 'Operations Center UI',
        tech: 'Next.js • Mapbox GL • WebSockets',
        icon: Activity,
        latency: '< 12ms',
        security: 'Role-Based Dispatcher Auth',
        payload: { onTimeRate: '94%', liveWaypoints: 48, warehouseAlerts: 'Active' },
        details: 'Visualizes live fleet progression on interactive map canvases with one-click driver re-dispatching.'
      }
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
    ],
    architectureNodes: [
      {
        id: 'node-1',
        title: 'Biometric & Caloric Constraint Ingestion',
        layer: 'Nutritional Ingestion Layer',
        tech: 'React State • Macro AST Validator',
        icon: Globe,
        latency: '< 10ms',
        security: 'HIPAA-compliant Local Session',
        payload: { dailyCalories: 2400, proteinSplit: '35%', dietaryConstraints: ['High-Protein', 'Gluten-Free'] },
        details: 'Ingests user fitness goals, daily caloric requirements, macro splits, and allergy exclusions into strict constraint sets.'
      },
      {
        id: 'node-2',
        title: 'Macro Constraint Solver & Nutrient Balance Core',
        layer: 'Nutrient Optimization Core',
        tech: 'Python FastAPI • Linear Optimizer',
        icon: Zap,
        latency: '< 25ms',
        security: 'JWT Session Token',
        payload: { macroPrecision: '99.4%', mealFrequency: '4 meals/day', micronutrientBalance: 'Optimal' },
        details: 'Computes exact ingredient weight distributions to satisfy macro and micronutrient targets without repetitive meals.'
      },
      {
        id: 'node-3',
        title: 'LLM Culinary Reasoning & Recipe Generator',
        layer: 'AI Culinary Pipeline',
        tech: 'Google Gemini API • Recipe Templates',
        icon: Cpu,
        latency: '< 55ms',
        security: 'Sanitized Output Parser',
        payload: { sevenDayPlanReady: true, customRecipesGenerated: 28, prepTimeMax: '30 mins' },
        details: 'Generates gourmet, chef-inspired recipes with preparation steps, cooking times, and flavor profile pairings.'
      },
      {
        id: 'node-4',
        title: 'Smart Grocery Consolidator & Calorie HUD',
        layer: 'Interactive Client UI',
        tech: 'React 18 • Responsive Tailored CSS',
        icon: Activity,
        latency: '< 8ms',
        security: 'Client-side Local Storage',
        payload: { groceryItemsCount: 38, aisleSorted: true, oneClickExport: 'Active' },
        details: 'Consolidates multi-day recipes into categorized supermarket grocery checklists with dynamic ingredient substitution.'
      }
    ]
  }
};

export default function ProjectModal({ projectId, onClose }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'architecture'
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0);

  if (!projectId) return null;
  const data = projectDatabase[projectId];
  if (!data) return null;

  const nodes = data.architectureNodes || [];
  const selectedNode = nodes[selectedNodeIndex] || nodes[0];

  return (
    <div className="system-modal-backdrop active" onClick={onClose}>
      <div className="modal-container gold-shimmer-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Header Bar */}
        <div className="modal-header">
          <div className="modal-header-left">
            <span className="mono modal-id-badge">
              {data.id}
            </span>
            <span className="mono modal-schematic-tag">
              // PRODUCTION BLUEPRINT
            </span>
          </div>

          {/* View Tab Switcher */}
          <div className="modal-tab-switcher">
            <button 
              className={`modal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <FileText size={13} />
              <span>Overview</span>
            </button>
            <button 
              className={`modal-tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
              onClick={() => setActiveTab('architecture')}
            >
              <Layers size={13} />
              <span>System Architecture Flow</span>
            </button>
          </div>

          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          
          {/* Project Title Header */}
          <div className="modal-project-title-block">
            <span className="mono modal-cat-tag">
              {data.category}
            </span>
            <h3 className="modal-main-title">
              {data.title}
            </h3>
            <div className="mono modal-meta-tags">
              <span>ROLE: {data.role}</span>
              <span>•</span>
              <span className="status-gold">STATUS: {data.status}</span>
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="modal-tab-content-fade">
              
              <div className="modal-info-box">
                <div className="mono modal-box-lbl">
                  PROBLEM STATEMENT
                </div>
                <p className="modal-box-txt">
                  {data.problem}
                </p>
              </div>

              <div className="modal-info-box">
                <div className="mono modal-box-lbl">
                  ENGINEERING SOLUTION
                </div>
                <p className="modal-box-txt">
                  {data.solution}
                </p>
              </div>

              <div className="modal-section-group">
                <div className="mono modal-section-lbl">
                  HIGH-LEVEL PIPELINE STEPS
                </div>
                <ul className="modal-pipeline-list">
                  {data.architecture.map((step, idx) => (
                    <li key={idx} className="modal-pipeline-item">
                      <span className="step-num">0{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-section-group">
                <div className="mono modal-section-lbl">
                  STACK APPLIED
                </div>
                <div className="modal-stack-tags">
                  {data.tech.map((t, idx) => (
                    <span className="stack-tag" key={idx}>{t}</span>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SYSTEM ARCHITECTURE FLOW VISUALIZER */}
          {activeTab === 'architecture' && (
            <div className="modal-tab-content-fade arch-visualizer-container">
              
              <div className="arch-visualizer-header">
                <div className="arch-header-meta">
                  <Cpu size={14} className="gold-accent" />
                  <span>INTERACTIVE END-TO-END PIPELINE (CLICK NODES TO INSPECT TELEMETRY)</span>
                </div>
              </div>

              {/* Node Graph Flow */}
              <div className="arch-nodes-flow-grid">
                {nodes.map((node, idx) => {
                  const NodeIcon = node.icon || Zap;
                  const isSelected = selectedNodeIndex === idx;
                  return (
                    <React.Fragment key={node.id}>
                      <div 
                        className={`arch-node-card ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => setSelectedNodeIndex(idx)}
                        role="button"
                        tabIndex={0}
                      >
                        <div className="arch-node-top">
                          <span className="arch-node-step">0{idx + 1}</span>
                          <NodeIcon size={14} className="arch-node-icon" />
                        </div>
                        <div className="arch-node-title">{node.title}</div>
                        <div className="arch-node-layer">{node.layer}</div>
                        <div className="arch-node-tech">{node.tech}</div>
                        <div className="arch-node-latency">
                          <Activity size={10} />
                          <span>{node.latency}</span>
                        </div>
                      </div>

                      {idx < nodes.length - 1 && (
                        <div className="arch-flow-connector">
                          <div className="connector-line">
                            <span className="flow-pulse-particle"></span>
                          </div>
                          <ArrowRight size={13} className="connector-arrow" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Selected Node Deep-Dive Telemetry Inspector */}
              {selectedNode && (
                <div className="arch-node-inspector gold-shimmer-card">
                  <div className="inspector-top-bar">
                    <div className="inspector-badge">
                      <Zap size={13} className="gold-accent" />
                      <span>TELEMETRY INSPECT // NODE 0{selectedNodeIndex + 1}: {selectedNode.title.toUpperCase()}</span>
                    </div>
                    <span className="inspector-latency-pill">{selectedNode.latency} LATENCY</span>
                  </div>

                  <p className="inspector-details-text">
                    {selectedNode.details}
                  </p>

                  <div className="inspector-specs-grid">
                    <div className="inspector-spec-box">
                      <div className="spec-lbl">LAYER / ROLE</div>
                      <div className="spec-val">{selectedNode.layer}</div>
                    </div>
                    <div className="inspector-spec-box">
                      <div className="spec-lbl">TECHNOLOGY STACK</div>
                      <div className="spec-val">{selectedNode.tech}</div>
                    </div>
                    <div className="inspector-spec-box">
                      <div className="spec-lbl">SECURITY / AUTH</div>
                      <div className="spec-val">{selectedNode.security}</div>
                    </div>
                  </div>

                  {/* Payload JSON Schema */}
                  <div className="inspector-payload-box">
                    <div className="payload-box-header">
                      <Code2 size={12} className="gold-accent" />
                      <span>SAMPLE REQUEST / RESPONSE TELEMETRY SCHEMA</span>
                    </div>
                    <pre className="payload-json-code">
                      <code>{JSON.stringify(selectedNode.payload, null, 2)}</code>
                    </pre>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Footer Actions */}
          <div className="modal-footer-actions">
            {data.liveUrl ? (
              <a href={data.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-system-primary gold-shimmer-button">
                <span>VISIT LIVE DEPLOYMENT</span>
                <ExternalLink size={13} />
              </a>
            ) : (
              <span className="mono modal-specs-note">
                ENTERPRISE SYSTEM SPECS &amp; CODE REPO AVAILABLE ON REQUEST
              </span>
            )}
            <button className="btn-system-secondary" onClick={onClose}>
              <span>CLOSE</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
