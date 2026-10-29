import { useEffect, useState } from "react";

/**
 * EnterpriseEcosystem
 * ------------------------------------------------------------------
 * Accordion section modeled on the reference: left column of
 * disclosure items with an indicator rail, right column a tinted
 * card that swaps with the active item and shows tool-logo chips.
 *
 * Behavior:
 *  - Tap/click a title to open it (one open at a time)
 *  - Auto-advances every AUTOPLAY_MS; the accent rail on the active
 *    item fills up as a progress indicator
 *  - Pauses while hovered or keyboard-focused
 *  - prefers-reduced-motion: no autoplay, no animations
 *
 * Logos:
 *  - Drop official SVGs into /public/logos/ (e.g. /logos/tableau.svg)
 *    and set `logo` on each tool. Until then a monogram chip renders,
 *    so the section works with zero assets.
 *  - Each tool has a `description` field reserved for the per-tool
 *    disclosure you'll design later (tooltip / popover / detail card).
 */

const AUTOPLAY_MS = 6000;

/* ------------------------- track icons -------------------------- */

const icon = {
  // =========================================================
  // ENTERPRISE CLOUD
  // =========================================================

  cloud: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 18.5a4.5 4.5 0 0 0 .42-8.98 6 6 0 0 0-11.7 1.62A3.75 3.75 0 0 0 7 18.5Z" />
    </svg>
  ),


  // =========================================================
  // ENTERPRISE AI PLATFORMS
  // =========================================================

  ai: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3.5 13.4 8.6 18.5 10l-5.1 1.4L12 16.5l-1.4-5.1L5.5 10l5.1-1.4L12 3.5Z" />
      <path d="m19 3 .5 1.8L21.5 5.5l-2 .7L19 8l-.5-1.8-2-.7 2-.7L19 3Z" />
      <path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" />
    </svg>
  ),


  // =========================================================
  // AI ENGINEERING
  // =========================================================

  chip: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="6" width="12" height="12" rx="2.5" />
      <rect x="10" y="10" width="4" height="4" rx="1" />

      <path d="M9 2.5v3.5" />
      <path d="M15 2.5v3.5" />
      <path d="M9 18v3.5" />
      <path d="M15 18v3.5" />

      <path d="M2.5 9h3.5" />
      <path d="M2.5 15h3.5" />
      <path d="M18 9h3.5" />
      <path d="M18 15h3.5" />
    </svg>
  ),


  // =========================================================
  // DATA ENGINEERING & ANALYTICS
  // =========================================================

  database: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="7.5" ry="3" />

      <path d="M4.5 5v7c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V5" />

      <path d="M4.5 12v7c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-7" />
    </svg>
  ),


  // =========================================================
  // CYBERSECURITY
  // =========================================================

  shield: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21.5c-4.5-1.7-7.5-5-7.5-10V6l7.5-2.75L19.5 6v5.5c0 5-3 8.3-7.5 10Z" />
      <path d="m9 11.5 2 2 4-4.5" />
    </svg>
  ),


  // =========================================================
  // DEVOPS & PLATFORM ENGINEERING
  // =========================================================

  devops: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="12" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />

      <path d="M8.3 7.2 15.7 10.8" />
      <path d="M15.7 13.2 8.3 16.8" />
    </svg>
  ),


  // =========================================================
  // ENTERPRISE APPLICATIONS
  // =========================================================

  applications: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />

      <path d="M3.5 9h17" />
      <path d="M9 9v11.5" />

      <path d="M13 12.5h4" />
      <path d="M13 16h4" />
    </svg>
  ),
};
/* --------------------------- content ---------------------------- */



const TRACKS = [
  {
    id: "cloud",
    title: "Enterprise Cloud",
    blurb:
      "Build and operate modern cloud environments with hands-on experience across the platforms enterprises rely on to scale securely and efficiently.",
    accent: "#4092f0",
    tint: "linear-gradient(150deg, #eef3ff 0%, #dce7ff 100%)",
    icon: icon.cloud,

    tools: [
      {
        name: "Microsoft",
        logo: "",
        description:
          "Azure, Azure Arc, Landing Zones, governance, FinOps, and cloud migration.",
      },
      {
        name: "Amazon Web Services",
        logo: "",
        description:
          "AWS Cloud, Landing Zones, Organizations, Control Tower, migration, and FinOps.",
      },
      {
        name: "Google Cloud",
        logo: "",
        description:
          "Google Cloud Platform, Landing Zones, cloud governance, and cloud migration.",
      },
      {
        name: "Oracle",
        logo: "",
        description:
          "Oracle Cloud Infrastructure (OCI) for enterprise cloud workloads and infrastructure.",
      },
    ],
  },

  {
    id: "ai-platforms",
    title: "Enterprise AI Platforms",
    blurb:
      "Explore the AI platforms powering modern enterprises — from foundation models and APIs to enterprise AI assistants and infrastructure.",
    accent: "#384ae7",
    tint: "linear-gradient(150deg, #f2efff 0%, #e3ddfb 100%)",
    icon: icon.ai,

    tools: [
      {
        name: "OpenAI",
        logo: "",
        description:
          "ChatGPT, GPT models, APIs, Responses API, Agents SDK, and enterprise AI.",
      },
      {
        name: "Anthropic",
        logo: "",
        description:
          "Claude, Claude Enterprise, Claude API, Claude Code, and computer-use capabilities.",
      },
      {
        name: "NVIDIA",
        logo: "",
        description:
          "NVIDIA AI Enterprise, NIM, and NeMo for enterprise AI infrastructure and development.",
      },
      {
        name: "Meta",
        logo: "",
        description:
          "Llama models and the open AI ecosystem powering enterprise generative AI applications.",
      },
    ],
  },

  {
    id: "ai-engineering",
    title: "AI Engineering",
    blurb:
      "Turn AI capabilities into production-ready systems with practical experience across agents, RAG, model orchestration, and modern AI engineering.",
    accent: "#178ff1",
    tint: "linear-gradient(150deg, #f5f1ff 0%, #e8e0ff 100%)",
    icon: icon.chip,

    tools: [
      {
        name: "LangChain",
        logo: "",
        description:
          "Build applications powered by language models, tools, retrieval, and structured workflows.",
      },
      {
        name: "LangGraph",
        logo: "",
        description:
          "Design stateful, controllable agent workflows and multi-step AI applications.",
      },
      {
        name: "CrewAI",
        logo: "",
        description:
          "Build collaborative multi-agent systems where specialized AI agents work together.",
      },
      {
        name: "LlamaIndex",
        logo: "",
        description:
          "Connect enterprise data with LLM applications through retrieval and data-aware AI systems.",
      },
    ],
  },

  {
    id: "data",
    title: "Data Engineering & Analytics",
    blurb:
      "Build modern data platforms, pipelines, and analytics solutions across the technologies enterprises use to turn data into decisions.",
    accent: "#1493ce",
    tint: "linear-gradient(150deg, #ecfaf7 0%, #d3f1ea 100%)",
    icon: icon.database,

    tools: [
      {
        name: "Databricks",
        logo: "",
        description:
          "A unified data and AI platform for engineering, analytics, machine learning, and lakehouse architectures.",
      },
      {
        name: "Snowflake",
        logo: "",
        description:
          "Snowflake Data Cloud for modern data warehousing, analytics, and enterprise data workloads.",
      },
      {
        name: "Microsoft",
        logo: "",
        description:
          "Microsoft Fabric, Azure Synapse Analytics, and Power BI for integrated data and analytics.",
      },
      {
        name: "Apache",
        logo: "",
        description:
          "Apache Spark, Kafka, Iceberg, and Superset for large-scale data processing and analytics.",
      },
    ],
  },

  {
    id: "cybersecurity",
    title: "Cybersecurity",
    blurb:
      "Develop practical security skills across cloud, identity, threat detection, and enterprise security operations.",
    accent: "#69ade6",
    tint: "linear-gradient(150deg, #edfaf2 0%, #d8f2e2 100%)",
    icon: icon.shield,

    tools: [
      {
        name: "Palo Alto Networks",
        logo: "",
        description:
          "Next-generation firewalls and Prisma Cloud for network and cloud security.",
      },
      {
        name: "Microsoft",
        logo: "",
        description:
          "Microsoft Defender, Sentinel, and Entra for threat protection, security operations, and identity.",
      },
      {
        name: "CrowdStrike",
        logo: "",
        description:
          "Falcon Platform for enterprise endpoint protection, threat detection, and response.",
      },
      {
        name: "Fortinet",
        logo: "",
        description:
          "FortiGate and Fortinet Security Fabric for integrated enterprise network security.",
      },
    ],
  },

  {
    id: "devops",
    title: "DevOps & Platform Engineering",
    blurb:
      "Build reliable delivery pipelines and modern platforms with hands-on practice across containers, automation, infrastructure, and CI/CD.",
    accent: "#2563eb",
    tint: "linear-gradient(150deg, #eff6ff 0%, #dbeafe 100%)",
    icon: icon.devops,

    tools: [
      {
        name: "Docker",
        logo: "",
        description:
          "Containerize applications and create consistent environments across development and deployment.",
      },
      {
        name: "Kubernetes",
        logo: "",
        description:
          "Orchestrate containerized applications and operate scalable cloud-native platforms.",
      },
      {
        name: "Red Hat",
        logo: "",
        description:
          "OpenShift and Ansible for enterprise Kubernetes platforms and infrastructure automation.",
      },
      {
        name: "HashiCorp",
        logo: "",
        description:
          "Terraform, Vault, and Consul for infrastructure provisioning, secrets, and service networking.",
      },
    ],
  },

  {
    id: "enterprise-applications",
    title: "Enterprise Applications",
    blurb:
      "Modernize enterprise workflows with platforms for business applications, automation, low-code development, and intelligent operations.",
    accent: "#155580",
    tint: "linear-gradient(150deg, #effbf3 0%, #d9f4e2 100%)",
    icon: icon.applications,

    tools: [
      {
        name: "Microsoft",
        logo: "",
        description:
          "Power Platform, Power Apps, Power Automate, Power BI, and Copilot Studio.",
      },
      {
        name: "ServiceNow",
        logo: "",
        description:
          "ServiceNow Platform for enterprise workflows, IT operations, and business process automation.",
      },
      {
        name: "Salesforce",
        logo: "",
        description:
          "Salesforce Platform and Agentforce for CRM, enterprise applications, and AI-powered workflows.",
      },
      {
        name: "UiPath",
        logo: "",
        description:
          "UiPath Automation Platform for intelligent automation and enterprise process transformation.",
      },
    ],
  },
];


/* --------------------------- helpers ---------------------------- */

function monogram(name) {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2);
  return (words[0][0] + words[1][0]).toUpperCase();
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
    return () =>
      mq.removeEventListener ? mq.removeEventListener("change", onChange) : mq.removeListener(onChange);
  }, []);
  return reduced;
}

function ToolChip({ tool, accent, delay }) {
  const [imgOk, setImgOk] = useState(Boolean(tool.logo));
  return (
    /* Later: turn this into a button/popover using tool.description */
    <div className="c4g-eco-chip" style={{ animationDelay: delay }} title={tool.name}>
      {imgOk ? (
        <img src={tool.logo} alt="" onError={() => setImgOk(false)} />
      ) : (
        <span
          className="c4g-eco-mono"
          style={{ background: `${accent}14`, color: accent }}
          aria-hidden="true"
        >
          {monogram(tool.name)}
        </span>
      )}
      <span className="c4g-eco-chipname">{tool.name}</span>
    </div>
  );
}

/* --------------------------- component -------------------------- */

export default function EnterpriseEcosystem() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const track = TRACKS[active];

  useEffect(() => {
    if (paused || reduced) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % TRACKS.length), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [active, paused, reduced]);

  return (
    <section
      className="c4g-eco"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <style>{`
        .c4g-eco { padding: 96px 0; }
        .c4g-eco-head { max-width: 640px; margin-bottom: 56px; }
        .c4g-eco-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: #64748b; margin-bottom: 16px;
        }
        .c4g-eco-eyebrow::before {
          content: ""; width: 8px; height: 8px; border-radius: 9999px; background: #2f52ec;
        }
        .c4g-eco-h2 {
          font-size: clamp(28px, 4vw, 44px); line-height: 1.1;
          font-weight: 600; letter-spacing: -0.02em; color: #0f172a;
        }
        .c4g-eco-sub { margin-top: 16px; font-size: 17px; line-height: 1.6; color: #64748b; }

        .c4g-eco-grid2 {
          display: grid; grid-template-columns: minmax(0, 1fr); gap: 48px; align-items: center;
        }
        .c4g-eco-grid2 > * { min-width: 0; }
        @media (min-width: 1024px) {
          .c4g-eco-grid2 { grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: 80px; }
        }

        /* ------------ accordion ------------ */
        .c4g-eco-item { position: relative; }
        .c4g-eco-btn {
          all: unset; box-sizing: border-box; cursor: pointer; display: block;
          width: 100%; padding: 18px 16px 18px 24px; position: relative;
        }
        .c4g-eco-btn:focus-visible { outline: 2px solid #2f52ec; outline-offset: 2px; border-radius: 8px; }
        .c4g-eco-title {
          font-size: 19px; font-weight: 600; color: #0f172a; letter-spacing: -0.01em;
          transition: color 0.25s ease;
        }
        .c4g-eco-item:not(.open) .c4g-eco-btn:hover .c4g-eco-title { color: #2f52ec; }

        /* rail + progress */
        .c4g-eco-rail {
          position: absolute; left: 0; top: 10px; bottom: 10px; width: 3px;
          border-radius: 9999px; background: #e2e8f0; overflow: hidden;
        }
        .c4g-eco-item.open .c4g-eco-rail { top: 6px; bottom: 6px; }
        .c4g-eco-progress {
          position: absolute; inset: 0; border-radius: 9999px;
          background: var(--c4g-eco-accent, #2f52ec);
          transform-origin: top; transform: scaleY(0);
          animation: c4g-eco-fill linear forwards;
        }
        .c4g-eco-progress.static { animation: none; transform: scaleY(1); }

        /* expanding body (grid-rows trick) */
        .c4g-eco-body {
          display: grid; grid-template-rows: 0fr;
          transition: grid-template-rows 0.45s cubic-bezier(0.3, 0.7, 0.3, 1);
        }
        .c4g-eco-item.open .c4g-eco-body { grid-template-rows: 1fr; }
        .c4g-eco-bodyin { overflow: hidden; }
        .c4g-eco-blurb {
          margin: 0; padding: 0 16px 6px 24px;
          font-size: 15px; line-height: 1.65; color: #64748b; max-width: 44ch;
        }
        .c4g-eco-link {
          display: inline-flex; align-items: center; gap: 6px;
          margin: 10px 16px 20px 24px; font-size: 14px; font-weight: 600;
          color: #2f52ec; cursor: pointer; text-decoration: none;
        }
        .c4g-eco-link:hover { text-decoration: underline; }

        /* ------------ visual card ------------ */
        /* ------------ visual card ------------ */

.c4g-eco-visual {
  position: relative;
  padding: 32px 0 0 32px;
}

.c4g-eco-card {
  position: relative;
  border-radius: 32px;
  padding: 64px 48px 48px;
  min-height: 520px;
  display: flex;
  align-items: center;

  animation: c4g-eco-cardin 0.5s cubic-bezier(0.3, 0.7, 0.3, 1) both;
}
        .c4g-eco-badge {
          position: absolute; top: -24px; left: -24px; width: 72px; height: 72px;
          border-radius: 9999px; background: #fff;
          box-shadow: 0 12px 32px rgba(15, 42, 85, 0.14), 0 2px 8px rgba(15, 42, 85, 0.08);
          display: flex; align-items: center; justify-content: center;
          animation: c4g-eco-cardin 0.5s cubic-bezier(0.3, 0.7, 0.3, 1) both;
        }
        .c4g-eco-badge svg { width: 34px; height: 34px; }

        .c4g-eco-tools {
          display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 14px; width: 100%; min-width: 0;
        }
        .c4g-eco-chip {
          display: flex; align-items: center; gap: 12px; min-width: 0;
          background: #fff; border: 1px solid rgba(15, 42, 85, 0.08);
          border-radius: 16px; padding: 16px 18px;
          box-shadow: 0 4px 14px rgba(15, 42, 85, 0.06);
          animation: c4g-eco-chipin 0.45s cubic-bezier(0.3, 0.7, 0.3, 1) both;
        }
        .c4g-eco-chip img { width: 28px; height: 28px; object-fit: contain; flex: none; }
        .c4g-eco-mono {
          width: 28px; height: 28px; border-radius: 8px; flex: none;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; letter-spacing: 0.02em;
        }
        .c4g-eco-chipname {
          font-size: 15px; font-weight: 600; color: #0f172a; letter-spacing: -0.01em;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        @media (max-width: 640px) {
          .c4g-eco { padding: 64px 0; }
          .c4g-eco-visual { padding: 24px 0 0 8px; }
          .c4g-eco-card { padding: 44px 16px 16px; min-height: 0; }
          .c4g-eco-chip { padding: 12px 12px; border-radius: 14px; gap: 8px; }
          .c4g-eco-chip img, .c4g-eco-mono { width: 24px; height: 24px; }
          .c4g-eco-chipname { font-size: 12.5px; white-space: normal; line-height: 1.25; }
        }

        @keyframes c4g-eco-fill { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes c4g-eco-cardin {
          from { opacity: 0; transform: translateY(14px) scale(0.985); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes c4g-eco-chipin {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .c4g-eco-body { transition: none; }
          .c4g-eco-card, .c4g-eco-badge, .c4g-eco-chip { animation: none; }
        }
      `}</style>

      {/* section header */}
      <div className="c4g-eco-head">
        <span className="c4g-eco-eyebrow">Learning Tracks</span>
        <h2 className="c4g-eco-h2">Real tools. Real environments.</h2>
        <p className="c4g-eco-sub">
          Every track is built around the platforms your teams work with every
          day — practiced hands-on, not just explained.
        </p>
      </div>

      <div className="c4g-eco-grid2">
        {/* left — accordion */}
        <div>
          {TRACKS.map((t, i) => {
            const open = i === active;
            return (
              <div key={t.id} className={open ? "c4g-eco-item open" : "c4g-eco-item"}>
                <button
                  type="button"
                  className="c4g-eco-btn"
                  aria-expanded={open}
                  aria-controls={`c4g-eco-panel-${t.id}`}
                  onClick={() => setActive(i)}
                >
                  <span className="c4g-eco-rail" style={{ "--c4g-eco-accent": t.accent }}>
                    {open &&
                      (reduced ? (
                        <span className="c4g-eco-progress static" />
                      ) : (
                        <span
                          className="c4g-eco-progress"
                          style={{
                            animationDuration: `${AUTOPLAY_MS}ms`,
                            animationPlayState: paused ? "paused" : "running",
                          }}
                        />
                      ))}
                  </span>
                  <span className="c4g-eco-title">{t.title}</span>
                </button>

                <div id={`c4g-eco-panel-${t.id}`} className="c4g-eco-body" role="region" aria-label={t.title}>
                  <div className="c4g-eco-bodyin">
                    <p className="c4g-eco-blurb">{t.blurb}</p>
                    <a className="c4g-eco-link" href="#contact">
                      Explore {t.title}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* right — swapping visual card */}
        <div className="c4g-eco-visual">
          <div key={track.id} className="c4g-eco-card" style={{ background: track.accent }}>
            <div className="c4g-eco-badge" style={{ color: track.accent }}>
              {track.icon}
            </div>
            <div className="c4g-eco-tools">
              {track.tools.map((tool, j) => (
                <ToolChip key={tool.name} tool={tool} accent={track.accent} delay={`${0.06 * j + 0.12}s`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}