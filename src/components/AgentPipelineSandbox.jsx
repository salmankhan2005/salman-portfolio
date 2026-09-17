import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Terminal, 
  Cpu, 
  Database, 
  Sparkles, 
  CheckCircle2, 
  Activity, 
  Copy, 
  Check, 
  ArrowRight, 
  Zap, 
  Code2, 
  FileText, 
  Sliders, 
  ShieldCheck, 
  Workflow,
  Clock,
  Layers,
  Bot
} from 'lucide-react';

const agentPipelines = [
  {
    id: 'naac_swarm',
    badge: 'FLAGSHIP ENTERPRISE SWARM',
    title: 'Institutional Accreditation AI Swarm (NAAC & NIRF)',
    description: 'Autonomous 9-sub-agent orchestration on n8n that ingests complex academic criteria, queries evidence vector embeddings, and generates audit-ready compliance dossiers with verifiable citation trails.',
    metrics: {
      nodes: 4,
      avgLatency: '1,120 ms',
      costEstimate: '$0.0038',
      accuracy: '99.4%'
    },
    sampleInput: {
      institution_code: "MAHENDRA-AUTONOMOUS-2026",
      criteria_target: "NAAC-CRITERION-3: RESEARCH, INNOVATIONS & EXTENSION",
      evidence_docs_count: 18,
      compliance_benchmark: "A++ Grade Institutional Standard"
    },
    nodes: [
      {
        id: 'node_1',
        step: '01 / TRIGGER',
        title: 'Criterion AST Router',
        type: 'Webhook Gateway',
        tech: 'n8n + FastAPI',
        duration: 180,
        statusLabel: 'Parsed Criterion Schema AST',
        details: 'Validates inbound JSON schema against NAAC manual guidelines, extracts 7 key performance indicators, and initiates parallel worker threads.',
        payloadSnippet: {
          event: "INGEST_CRITERION_PAYLOAD",
          schema_version: "2026.1",
          criteria_parsed: 7,
          status: "ROUTED_TO_WORKERS"
        }
      },
      {
        id: 'node_2',
        step: '02 / VECTOR RETRIEVAL',
        title: 'Evidence Vector RAG',
        type: 'Semantic Search',
        tech: 'Supabase pgvector',
        duration: 290,
        statusLabel: 'Retrieved 14 Evidence Chunks',
        details: 'Executes 1,536-dimensional cosine similarity search across institutional publications, patents, and faculty grant records with >0.89 relevance cutoff.',
        payloadSnippet: {
          vector_store: "supabase_pgvector",
          embedding_model: "text-embedding-3-small",
          chunks_retrieved: 14,
          top_similarity_score: 0.942
        }
      },
      {
        id: 'node_3',
        step: '03 / NEURAL SYNTHESIS',
        title: '9-Sub-Agent Swarm',
        type: 'LLM Reasoning',
        tech: 'GPT-4o Swarm',
        duration: 510,
        statusLabel: 'Multi-Agent Consensus Reached',
        details: '9 specialized sub-agents cross-examine evidence against NAAC sub-metrics, evaluate quantitative benchmarks, and detect data discrepancies.',
        payloadSnippet: {
          sub_agents_active: 9,
          llm_model: "gpt-4o-2024-08-06",
          reasoning_tokens: 1420,
          consensus_score: "99.4%"
        }
      },
      {
        id: 'node_4',
        step: '04 / PAYLOAD EMISSION',
        title: 'Compliance Schema & PDF',
        type: 'Dossier Engine',
        tech: 'JSON Schema + Telemetry',
        duration: 140,
        statusLabel: 'Audit Dossier Synthesized',
        details: 'Emits structured JSON payload, generates downloadable compliance summary, and dispatches automated webhook alerts to the institutional steering committee.',
        payloadSnippet: {
          accreditation_grade_projected: "A++ (3.78 CGPA)",
          compliance_status: "VERIFIED_AUDIT_READY",
          generated_dossier_id: "DOSSIER-NAAC-88392",
          dispatch_latency: "1,120 ms"
        }
      }
    ],
    terminalLogs: [
      "[00:00.00] [SYSTEM] Initializing n8n Autonomous Workflow: Institutional Accreditation Swarm",
      "[00:00.18] [TRIGGER] Webhook payload ingested (ID: MAHENDRA-AUTONOMOUS-2026 | Criterion 3)",
      "[00:00.22] [TRIGGER] AST Parser validated 7 criteria benchmarks with 0 schema violations",
      "[00:00.47] [VECTOR_DB] Connected to Supabase pgvector instance (1,536 dims)",
      "[00:00.48] [VECTOR_DB] Top-k cosine search executed: 14 verified publication chunks retrieved (similarity: 0.942)",
      "[00:00.75] [LLM_SWARM] Spawning 9 parallel reasoning sub-agents (NIRF, NAAC-3.1 to 3.7)",
      "[00:00.98] [LLM_SWARM] GPT-4o completed multi-criteria cross-verification (1,420 tokens consumed)",
      "[00:01.05] [CONSENSUS] Sub-agent consensus reached: A++ accreditation benchmark satisfied",
      "[00:01.12] [OUTPUT] Emitting structured compliance payload and PDF synthesis hook",
      "[00:01.12] [PIPELINE_COMPLETE] Total execution runtime: 1,120 ms | Status: SUCCESS"
    ]
  },
  {
    id: 'market_intel',
    badge: 'REAL-TIME AUTONOMOUS SCOUT',
    title: 'Autonomous Market & Competitor Intelligence Scout',
    description: 'Scheduled multi-source crawler that extracts competitor release notes, analyzes architectural shifts using vector similarity, and synthesizes executive strategic briefings.',
    metrics: {
      nodes: 4,
      avgLatency: '940 ms',
      costEstimate: '$0.0024',
      accuracy: '98.9%'
    },
    sampleInput: {
      target_industry: "Applied AI / Developer Tooling",
      tracked_competitors: ["Perplexity", "Cursor", "LangChain"],
      crawl_depth: "Deep Release Logs & API Changes",
      alert_channel: "Telegram Strategic Dispatch"
    },
    nodes: [
      {
        id: 'node_1',
        step: '01 / TRIGGER',
        title: 'Cron Webhook Trigger',
        type: 'Event Listener',
        tech: 'n8n Scheduler',
        duration: 120,
        statusLabel: 'Scheduled Trigger Fired',
        details: 'Fires every 4 hours or upon real-time GitHub release webhooks from monitored developer repositories.',
        payloadSnippet: {
          trigger_source: "github_release_webhook",
          target_repos: 12,
          status: "DISPATCHING_CRAWLERS"
        }
      },
      {
        id: 'node_2',
        step: '02 / RECONNAISSANCE',
        title: 'Web & API Crawler',
        type: 'Extractor',
        tech: 'Tavily + Cheerio',
        duration: 310,
        statusLabel: 'Parsed 32 Diff Changelogs',
        details: 'Scrapes documentation updates, pricing tiers, and API schemas, stripping noise into clean markdown ASTs.',
        payloadSnippet: {
          pages_scraped: 32,
          content_tokens: 8450,
          cleaning_stage: "MARKDOWN_AST"
        }
      },
      {
        id: 'node_3',
        step: '03 / STRATEGIC LLM',
        title: 'Moat Threat Analyzer',
        type: 'Neural Reasoning',
        tech: 'GPT-4o Deep Reasoner',
        duration: 390,
        statusLabel: 'Competitive Moat Evaluated',
        details: 'Synthesizes pricing delta, feature overlaps, and architecture advantages over existing solutions.',
        payloadSnippet: {
          key_findings: ["New Agent API endpoint released", "Pricing reduced by 20%"],
          threat_level: "LOW_TACTICAL",
          strategic_recommendation: "Deploy complementary integration"
        }
      },
      {
        id: 'node_4',
        step: '04 / BROADCAST',
        title: 'Executive Telegram Dispatch',
        type: 'Notification Hook',
        tech: 'Telegram Bot API + JSON',
        duration: 120,
        statusLabel: 'Strategic Briefing Pushed',
        details: 'Formats high-priority intelligence brief with interactive inline action buttons and payload export.',
        payloadSnippet: {
          broadcast_status: "DELIVERED",
          channel: "Telegram / Lead Architect",
          total_latency: "940 ms"
        }
      }
    ],
    terminalLogs: [
      "[00:00.00] [SYSTEM] Autonomous Market Intelligence Scout initialized",
      "[00:00.12] [TRIGGER] Scheduled cron trigger fired (Target: Applied AI Ecosystem)",
      "[00:00.28] [CRAWLER] Ingesting Tavily web data across 32 changelogs and API endpoints",
      "[00:00.43] [AST_CLEAN] Stripping HTML boilerplate, normalized 8,450 tokens to structured Markdown",
      "[00:00.58] [VECTOR_STORE] Comparing feature delta against previous snapshot embeddings",
      "[00:00.72] [LLM_REASON] GPT-4o analyzing competitive moat impact & strategic opportunities",
      "[00:00.82] [SYNTHESIS] Executive summary created with 3 key actionable takeaways",
      "[00:00.94] [DISPATCH] Telegram Bot API delivery confirmed (Message ID: 94821)",
      "[00:00.94] [PIPELINE_COMPLETE] Total execution runtime: 940 ms | Status: SUCCESS"
    ]
  },
  {
    id: 'code_security',
    badge: 'DEVSECOPS PIPELINE',
    title: 'Autonomous Code Review & Security Auditor',
    description: 'Pull request automated agent that inspects AST syntax diffs, scans for hardcoded secrets, benchmarks algorithmic complexity, and posts inline suggestions directly to GitHub PRs.',
    metrics: {
      nodes: 4,
      avgLatency: '860 ms',
      costEstimate: '$0.0019',
      accuracy: '99.8%'
    },
    sampleInput: {
      repository: "salmankhan2005/finova-ai-engine",
      pull_request_id: "#42",
      files_changed: 6,
      audit_type: "Full AST Security & Complexity Scan"
    },
    nodes: [
      {
        id: 'node_1',
        step: '01 / TRIGGER',
        title: 'GitHub PR Webhook',
        type: 'Git Ingest',
        tech: 'GitHub API Webhook',
        duration: 110,
        statusLabel: 'PR #42 Diff Extracted',
        details: 'Ingests unified diffs for 6 files, filtering for Python backend services and React frontend hooks.',
        payloadSnippet: {
          pr_number: 42,
          lines_added: 248,
          lines_deleted: 32,
          status: "DIFF_READY"
        }
      },
      {
        id: 'node_2',
        step: '02 / AST ANALYSIS',
        title: 'Static & Security AST Scan',
        type: 'Rule Engine',
        tech: 'Bandit + AST Parser',
        duration: 210,
        statusLabel: '0 Critical Vulnerabilities',
        details: 'Scans AST tree for OWASP Top 10 vulnerabilities, SQL injections, and environment secret leaks.',
        payloadSnippet: {
          secrets_detected: 0,
          sql_injection_risk: "ZERO",
          cyclomatic_complexity_max: 6
        }
      },
      {
        id: 'node_3',
        step: '03 / NEURAL AUDITOR',
        title: 'LLM Refactoring Reviewer',
        type: 'Code Intelligence',
        tech: 'Claude 3.5 Sonnet',
        duration: 410,
        statusLabel: '2 Optimization Hints Generated',
        details: 'Evaluates asynchronous concurrency patterns, suggests memoization optimizations for React components, and writes unit tests.',
        payloadSnippet: {
          perf_score: "96/100",
          suggestions: [
            "Use useMemo for expensive vector calculations on line 48",
            "Add timeout handler to external LLM fetch"
          ]
        }
      },
      {
        id: 'node_4',
        step: '04 / CI COMMENT',
        title: 'GitHub PR Inline Comments',
        type: 'PR Injection',
        tech: 'GitHub REST API',
        duration: 130,
        statusLabel: 'CI Check Passed & Comments Posted',
        details: 'Posts markdown-formatted review with line-by-line diff suggestions and green CI checkmark status.',
        payloadSnippet: {
          ci_status: "SUCCESS",
          comments_posted: 2,
          mergeability: "RECOMMENDED_FOR_MERGE"
        }
      }
    ],
    terminalLogs: [
      "[00:00.00] [SYSTEM] Autonomous Code Review & Security Auditor initialized",
      "[00:00.11] [TRIGGER] GitHub webhook received: Pull Request #42 opened (6 files changed)",
      "[00:00.22] [DIFF_PARSE] Unified git diff processed: +248 / -32 lines",
      "[00:00.32] [STATIC_SCAN] AST analysis running: 0 hardcoded keys, 0 unsafe evals",
      "[00:00.51] [LLM_AUDIT] Claude 3.5 Sonnet reviewing code quality, type safety, and latency",
      "[00:00.73] [OPTIMIZE] 2 non-blocking micro-optimizations detected (memoization & timeouts)",
      "[00:00.86] [GITHUB_API] Posting inline code suggestions & CI check status to GitHub PR #42",
      "[00:00.86] [PIPELINE_COMPLETE] Total execution runtime: 860 ms | Status: SUCCESS"
    ]
  },
  {
    id: 'whatsapp_sam',
    badge: 'MULTIMODAL PRODUCTION AGENT',
    title: 'Multimodal WhatsApp Invoice OCR & ERP Sync ("Sam")',
    description: 'Autonomous financial agent that receives real-world customer receipts and invoices over WhatsApp, extracts structured line items via Vision OCR, and syncs directly with accounting ERPs.',
    metrics: {
      nodes: 4,
      avgLatency: '1,040 ms',
      costEstimate: '$0.0031',
      accuracy: '99.6%'
    },
    sampleInput: {
      sender_phone: "+91 9840X XXXXX",
      media_type: "image/jpeg (Invoice Receipt)",
      currency: "INR (Rs.)",
      destination_erp: "PostgreSQL Financial Ledger"
    },
    nodes: [
      {
        id: 'node_1',
        step: '01 / INBOUND',
        title: 'Twilio Media Webhook',
        type: 'Media Stream',
        tech: 'Twilio / WhatsApp API',
        duration: 140,
        statusLabel: 'Received Invoice Image (1.8MB)',
        details: 'Decrypts incoming WhatsApp media payload, validates sender credentials, and converts image buffer to base64.',
        payloadSnippet: {
          sender: "VERIFIED_CLIENT",
          media_url: "https://media.twilio.com/invoices/inv_9921.jpg",
          image_format: "JPEG"
        }
      },
      {
        id: 'node_2',
        step: '02 / VISION OCR',
        title: 'GPT-4o Vision OCR',
        type: 'Multimodal OCR',
        tech: 'GPT-4o Vision API',
        duration: 480,
        statusLabel: 'Extracted 8 Itemized Rows',
        details: 'Performs spatial vision parsing, identifying vendor GST numbers, tax breakdowns, item prices, and payment stamps.',
        payloadSnippet: {
          vendor_name: "Apex Cloud Services Pvt Ltd",
          gst_number: "33AABCA1234D1ZX",
          total_amount: 14850.00,
          currency: "INR"
        }
      },
      {
        id: 'node_3',
        step: '03 / LEDGER SYNC',
        title: 'ERP Ledger Validation',
        type: 'Database Ingest',
        tech: 'PostgreSQL + Prisma',
        duration: 260,
        statusLabel: 'Ledger Entry #8820 Created',
        details: 'Validates duplicate invoice prevention, verifies mathematical totals against tax rules, and commits ACID transaction.',
        payloadSnippet: {
          duplicate_check: "PASSED (NEW INVOICE)",
          tax_compliance: "CGST+SGST 18% MATCHED",
          db_tx_status: "COMMITTED"
        }
      },
      {
        id: 'node_4',
        step: '04 / CONFIRMATION',
        title: 'WhatsApp Confirmation Push',
        type: 'Outbound Message',
        tech: 'WhatsApp Bot Response',
        duration: 160,
        statusLabel: 'Receipt Push Delivered to User',
        details: 'Sends instant WhatsApp message confirming invoice approval with breakdown summary and PDF link.',
        payloadSnippet: {
          msg_delivered: true,
          confirmation_text: "Invoice #9921 for Rs. 14,850 recorded into ERP successfully.",
          total_latency: "1,040 ms"
        }
      }
    ],
    terminalLogs: [
      "[00:00.00] [SYSTEM] WhatsApp Financial Agent ('Sam') initialized",
      "[00:00.14] [TWILIO_INBOUND] Inbound WhatsApp media received from verified client (+91 9840X XXXXX)",
      "[00:00.28] [IMAGE_PARSE] Buffer downloaded & normalized to high-res base64 stream (1.8 MB)",
      "[00:00.48] [VISION_OCR] GPT-4o-Vision processing tabular invoice typography & GST numbers",
      "[00:00.68] [TAX_MATH] Vendor identified: Apex Cloud Services | Amount: Rs. 14,850.00 (Tax Validated)",
      "[00:00.82] [DATABASE] Deduplication check passed, committing to PostgreSQL Financial Ledger",
      "[00:00.92] [ERP_COMMIT] Transaction ID #8820 saved with ACID compliance",
      "[00:01.04] [WHATSAPP_REPLY] Outbound confirmation receipt delivered back to client WhatsApp",
      "[00:01.04] [PIPELINE_COMPLETE] Total execution runtime: 1,040 ms | Status: SUCCESS"
    ]
  }
];

export default function AgentPipelineSandbox() {
  const [selectedWorkflowId, setSelectedWorkflowId] = useState('naac_swarm');
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeNodeIndex, setActiveNodeIndex] = useState(-1);
  const [completedNodes, setCompletedNodes] = useState([]);
  const [logs, setLogs] = useState([]);
  const [selectedInspectorNode, setSelectedInspectorNode] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [liveLatency, setLiveLatency] = useState(0);
  const [viewMode, setViewMode] = useState('pipeline'); // 'pipeline' | 'payload' | 'logs'
  const logContainerRef = useRef(null);

  const activeWorkflow = agentPipelines.find(p => p.id === selectedWorkflowId) || agentPipelines[0];

  // Auto scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Set default inspector node when changing pipeline
  useEffect(() => {
    setSelectedInspectorNode(activeWorkflow.nodes[0]);
    resetPipeline();
  }, [selectedWorkflowId]);

  const resetPipeline = () => {
    setIsExecuting(false);
    setActiveNodeIndex(-1);
    setCompletedNodes([]);
    setLogs([]);
    setLiveLatency(0);
  };

  const runPipeline = () => {
    if (isExecuting) return;
    
    resetPipeline();
    setIsExecuting(true);
    setLogs([`[00:00.00] ⚡ Triggering pipeline: ${activeWorkflow.title}...`]);

    let accumulatedTime = 0;
    const nodeCount = activeWorkflow.nodes.length;

    // Stream logs and progress through nodes
    activeWorkflow.nodes.forEach((node, idx) => {
      // Start node execution
      setTimeout(() => {
        setActiveNodeIndex(idx);
        setSelectedInspectorNode(node);
        setLiveLatency(prev => prev + node.duration);
        
        // Add log
        const logEntry = activeWorkflow.terminalLogs[idx * 2 + 1] || `[NODE_${idx+1}] Executing ${node.title}...`;
        setLogs(prev => [...prev, logEntry]);
      }, accumulatedTime);

      accumulatedTime += node.duration;

      // Complete node execution
      setTimeout(() => {
        setCompletedNodes(prev => [...prev, idx]);
        const completeLog = activeWorkflow.terminalLogs[idx * 2 + 2] || `[NODE_${idx+1}] Completed in ${node.duration}ms`;
        setLogs(prev => [...prev, completeLog]);

        // If last node finishes
        if (idx === nodeCount - 1) {
          setTimeout(() => {
            setIsExecuting(false);
            setActiveNodeIndex(-1);
            setLogs(prev => [
              ...prev, 
              `[00:01.${Math.floor(accumulatedTime/100)}] ✅ Autonomous pipeline completed successfully in ${accumulatedTime} ms!`
            ]);
          }, 150);
        }
      }, accumulatedTime);
    });
  };

  const copyPayload = () => {
    const text = JSON.stringify(
      selectedInspectorNode ? selectedInspectorNode.payloadSnippet : activeWorkflow.nodes[3].payloadSnippet,
      null, 
      2
    );
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section className="agent-sandbox-section" id="agent-sandbox">
      <div className="page-container">
        
        {/* Section Header */}
        <div className="section-head">
          <div className="section-index-wrapper">
            <span className="section-num">01.5</span>
            <span className="section-tagline">INTERACTIVE MULTI-AGENT RUNTIME</span>
          </div>
          <div className="section-heading-row">
            <h2 className="section-title">
              AUTONOMOUS AI AGENT <br />
              <span className="gold-shimmer-text">PIPELINE SANDBOX</span>
            </h2>
            <p className="section-lead">
              Experience tangible, real-time proof of my 30+ production n8n multi-agent architectures. Select an autonomous agent workflow below and trigger live node-to-node execution with interactive telemetry.
            </p>
          </div>
        </div>

        {/* Main Sandbox Interactive Terminal Wrapper */}
        <div className="sandbox-card-chassis gold-shimmer-card">
          
          {/* Top Control Bar: Workflow Preset Switcher */}
          <div className="sandbox-top-presets-bar">
            <div className="presets-label">
              <Bot size={13} className="gold-pulse-icon" />
              <span>SELECT WORKFLOW PRESET:</span>
            </div>

            <div className="presets-tabs-scroll">
              {agentPipelines.map((pipeline) => (
                <button
                  key={pipeline.id}
                  className={`preset-tab-btn ${selectedWorkflowId === pipeline.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedWorkflowId(pipeline.id)}
                >
                  <span className="preset-pill-tag">{pipeline.badge.split(' ')[0]}</span>
                  <span className="preset-name">{pipeline.title.split('(')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Workflow Header & Execution Trigger */}
          <div className="sandbox-workflow-header">
            <div className="workflow-title-block">
              <div className="workflow-badge-row">
                <span className="gold-status-badge">{activeWorkflow.badge}</span>
                <span className="workflow-nodes-badge">
                  <Workflow size={12} />
                  {activeWorkflow.metrics.nodes} Nodes Connected
                </span>
                <span className="workflow-latency-badge">
                  <Clock size={12} />
                  Avg Latency: {activeWorkflow.metrics.avgLatency}
                </span>
              </div>
              <h3 className="workflow-active-title">{activeWorkflow.title}</h3>
              <p className="workflow-active-desc">{activeWorkflow.description}</p>
            </div>

            {/* Run Button Action */}
            <div className="workflow-action-box">
              <button 
                className={`btn-run-agent-main gold-shimmer-button ${isExecuting ? 'is-running' : ''}`}
                onClick={runPipeline}
                disabled={isExecuting}
                title="Trigger Real-Time Autonomous Execution"
              >
                {isExecuting ? (
                  <>
                    <Activity size={15} className="spin-icon" />
                    <span>EXECUTING SWARM...</span>
                  </>
                ) : (
                  <>
                    <Play size={14} />
                    <span>RUN AUTONOMOUS AGENT</span>
                  </>
                )}
              </button>

              <button 
                className="btn-reset-agent"
                onClick={resetPipeline}
                title="Reset Execution State"
              >
                <RotateCcw size={13} />
                <span>RESET</span>
              </button>
            </div>
          </div>

          {/* Interactive Visual Node Pipeline Graph */}
          <div className="sandbox-visual-graph-wrapper">
            <div className="graph-header-bar">
              <div className="graph-label">
                <Layers size={13} />
                <span>NODE-TO-NODE REAL-TIME EXECUTION FLOW</span>
              </div>
              <div className="graph-metrics-live">
                <span className="live-metric-item">
                  <Activity size={12} className="live-icon" />
                  PIPELINE RUNTIME: <strong>{liveLatency > 0 ? `${liveLatency} ms` : activeWorkflow.metrics.avgLatency}</strong>
                </span>
                <span className="live-metric-sep">|</span>
                <span className="live-metric-item">
                  ACCURACY: <strong>{activeWorkflow.metrics.accuracy}</strong>
                </span>
              </div>
            </div>

            {/* Nodes Container */}
            <div className="sandbox-nodes-flow-track">
              {activeWorkflow.nodes.map((node, idx) => {
                const isCurrentActive = activeNodeIndex === idx;
                const isCompleted = completedNodes.includes(idx);
                const isSelected = selectedInspectorNode?.id === node.id;

                return (
                  <React.Fragment key={node.id}>
                    <div 
                      className={`pipeline-node-box ${isCurrentActive ? 'is-active' : ''} ${isCompleted ? 'is-completed' : ''} ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => setSelectedInspectorNode(node)}
                      title={`Click to inspect node: ${node.title}`}
                    >
                      {/* Node Step Pill */}
                      <div className="node-top-row">
                        <span className="node-step-pill">{node.step}</span>
                        {isCompleted && <CheckCircle2 size={13} className="node-check-icon" />}
                        {isCurrentActive && <Activity size={13} className="node-spin-icon" />}
                      </div>

                      {/* Title & Type */}
                      <h4 className="node-box-title">{node.title}</h4>
                      <span className="node-type-label">{node.type}</span>

                      {/* Tech & Latency Footer */}
                      <div className="node-bottom-meta">
                        <span className="node-tech-tag">{node.tech}</span>
                        <span className="node-latency-pill">+{node.duration}ms</span>
                      </div>
                    </div>

                    {/* Connecting Animated Pulse Cable */}
                    {idx < activeWorkflow.nodes.length - 1 && (
                      <div className={`node-flow-wire ${isCompleted || isCurrentActive ? 'wire-active' : ''}`}>
                        <div className="wire-line">
                          {(isCurrentActive || isCompleted) && <span className="wire-pulse-particle"></span>}
                        </div>
                        <ArrowRight size={13} className="wire-arrow-icon" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Lower Dual Panel: Real-Time Step Logs HUD & Node Inspector Drawer */}
          <div className="sandbox-dual-dock">
            
            {/* Left Column: Live Terminal Execution Logs */}
            <div className="sandbox-logs-panel">
              <div className="panel-top-tab">
                <div className="panel-tab-title">
                  <Terminal size={13} />
                  <span>STEP LOGS TELEMETRY CONSOLE</span>
                </div>
                <div className="panel-status-tag">
                  <span className={`pulse-indicator-dot ${isExecuting ? 'running' : 'idle'}`}></span>
                  <span>{isExecuting ? 'STREAMING STREAM...' : 'SYSTEM READY'}</span>
                </div>
              </div>

              <div className="terminal-logs-window" ref={logContainerRef}>
                {logs.length === 0 ? (
                  <div className="terminal-placeholder">
                    <p className="dimmed-text">// Click "RUN AUTONOMOUS AGENT" above to trigger real-time pipeline execution.</p>
                    <p className="dimmed-text">// Live step logs, token counts, and latency telemetries will stream here.</p>
                  </div>
                ) : (
                  logs.map((log, index) => (
                    <div key={index} className="terminal-log-line">
                      <span className="log-caret">&gt;</span>
                      <span className="log-text">{log}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Column: Node Inspector & Payload Viewer */}
            <div className="sandbox-inspector-panel">
              <div className="panel-top-tab">
                <div className="panel-tab-title">
                  <Code2 size={13} />
                  <span>INSPECT NODE: <strong>{selectedInspectorNode?.title || 'Output Payload'}</strong></span>
                </div>
                
                <button 
                  className="btn-copy-payload" 
                  onClick={copyPayload}
                  title="Copy JSON Payload to Clipboard"
                >
                  {isCopied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{isCopied ? 'COPIED!' : 'COPY JSON'}</span>
                </button>
              </div>

              {selectedInspectorNode && (
                <div className="inspector-content-box">
                  <div className="inspector-desc-line">
                    <span className="desc-badge">OPERATION:</span>
                    <span className="desc-text">{selectedInspectorNode.details}</span>
                  </div>

                  <div className="inspector-json-view">
                    <div className="json-box-label">INTERMEDIATE NODE PAYLOAD SCHEMA:</div>
                    <pre className="json-pre-code">
                      {JSON.stringify(selectedInspectorNode.payloadSnippet, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Bottom Highlights Footer */}
          <div className="sandbox-bottom-banner">
            <div className="banner-badge-item">
              <ShieldCheck size={14} className="gold-pulse-icon" />
              <span>PRODUCTION VALIDATED: Engineered on n8n Enterprise, Python FastAPI & Supabase pgvector</span>
            </div>
            <a href="#contact" className="banner-link-cta">
              <span>DISCUSS CUSTOM AI AGENT WORKFLOWS</span>
              <ArrowRight size={13} />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
