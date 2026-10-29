

"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import Container from "@/components/layout/Container";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import {
  CUE,
  DURATION,
  EASE as REVEAL_EASE,
  RISE,
  STAGGER,
  VIEWPORT,
} from "@/components/motion/reveal-tokens";


/** Cards shown per page, and per "Load more results" click. */
const PAGE = 9;

/* ==================================================================
   DATA  (unchanged from the previous CatalogueSection)

   `tech` lists named technologies only — platforms, products, tools,
   frameworks. Deliberately excluded: practices ("purple team
   exercises"), patterns ("landing zones"), methodologies
   ("Well-Architected / CAF") and engagements ("multi-cloud
   migration"). Capped at eight per domain; the portfolio carries more.

   Three domains — 16, 27, 28 — are framework- and practice-based and
   have no vendor technology behind them. They carry `standards`
   instead. Cards built from those domains are badged "Framework"
   rather than "Technology"; see buildCards below.
================================================================== */
const domains = [
  { name: "Cloud & Platform Engineering", tech: ["AWS","Microsoft Azure","Google Cloud","Oracle Cloud","Azure Local"] },
  { name: "Containers, Kubernetes & Platform Engineering", tech: ["Kubernetes","Docker","Red Hat OpenShift","Istio","Rancher","VMware Tanzu","Helm","Backstage"] },
  { name: "DevOps, DevSecOps & GitOps", tech: ["Terraform","Ansible","GitHub Actions","GitLab CI","Jenkins","ArgoCD","HashiCorp Vault","Pulumi"] },
  { name: "Observability, SRE & FinOps", tech: ["Prometheus","Grafana","Datadog","Dynatrace","New Relic","OpenTelemetry","Elastic Stack","Kubecost"] },
  { name: "Data Engineering & Lakehouse", tech: ["Databricks","Snowflake","Apache Kafka","Apache Spark","Apache Airflow","dbt","BigQuery","Power BI"] },
  { name: "Machine Learning & MLOps", tech: ["PyTorch","TensorFlow","Amazon SageMaker","Azure Machine Learning","Vertex AI","MLflow","Kubeflow","Ray"] },
  { name: "Generative AI, RAG & Agentic AI", tech: ["Claude","GPT","Gemini","Llama","Mistral","LangChain","LlamaIndex","LangGraph"] },
  { name: "Enterprise Copilots & AI Platforms", tech: ["Microsoft 365 Copilot","Copilot Studio","Amazon Bedrock","Azure AI Foundry","Gemini Enterprise","Claude for Enterprise","Salesforce Agentforce","ServiceNow AI Agents"] },
  { name: "AI Infrastructure & GPU Computing", tech: ["NVIDIA CUDA","NVIDIA NIM","NVIDIA NeMo","RAPIDS","vLLM","Ollama","Triton Inference Server","TensorRT-LLM"] },
  { name: "Cybersecurity Operations & SOC", tech: ["Splunk","Microsoft Sentinel","IBM QRadar","Google SecOps","CrowdStrike","SentinelOne","Cortex XSOAR","Wazuh"] },
  { name: "Offensive Security & Red Team", tech: ["Kali Linux","Metasploit","Burp Suite","Nmap","Nessus"] },
  { name: "Zero Trust, SASE & Identity", tech: ["Zscaler","Cloudflare One","Microsoft Entra ID","Okta","Netskope","Prisma Access","CyberArk","SailPoint"] },
  { name: "Cloud Security, CNAPP & AI Security", tech: ["Wiz","Microsoft Defender for Cloud","Prisma Cloud","Orca Security","Aqua Security","Falco"] },
  { name: "Networking & Network Automation", tech: ["Cisco SD-WAN","Fortinet SD-WAN","Palo Alto NGFW","Arista EOS","Cisco ISE","pfSense","NetBox","Batfish"] },
  { name: "Virtualization, Private & Sovereign Cloud", tech: ["VMware vSphere","VMware NSX","vSAN","Nutanix AHV","Proxmox","Hyper-V","KVM","OpenStack"] },
  { name: "AI Governance, Risk & Compliance", standards: ["ISO/IEC 42001","ISO/IEC 27001 & 27701","NIST AI RMF","NIST CSF 2.0","EU AI Act","India DPDP Act 2023","PCI DSS 4.0","DORA"] },
  { name: "Enterprise Applications & Low-Code", tech: ["SAP S/4HANA","ServiceNow","Salesforce","Microsoft Power Platform","Dynamics 365","Workday","OutSystems","UiPath"] },
  { name: "Emerging & Sustainable Technology", tech: ["Qiskit","Amazon Braket","Azure Quantum","Claroty","Nozomi Networks","NVIDIA Jetson"] },
  { name: "Software Engineering & API Development", tech: ["Java & Spring Boot","C# / .NET","Python","Go","Node.js & TypeScript","React / Next.js","GraphQL","Kong / Apigee"] },
  { name: "Quality Engineering & Test Automation", tech: ["Playwright","Selenium","Cypress","Postman","k6","JMeter","Appium","Pact"] },
  { name: "Databases & Data Platforms", tech: ["PostgreSQL","Microsoft SQL Server","Oracle Database","MySQL / MariaDB","MongoDB","Redis / Valkey","Cassandra / ScyllaDB","Couchbase"] },
  { name: "Storage, Backup & Cyber Resilience", tech: ["NetApp ONTAP","Veeam Backup & Replication","Cohesity DataProtect","Acronis Cyber Protect","Arctera NetBackup","Ctera","DDN","Velero"] },
  { name: "Operating Systems & Enterprise Directory", tech: ["Red Hat Enterprise Linux","Ubuntu Server","Windows Server","Active Directory","PowerShell","Microsoft Intune","Microsoft Entra ID","Bash"] },
  { name: "Digital Workplace & End-User Computing", tech: ["Azure Virtual Desktop","Windows 365 Cloud PC","Citrix DaaS","Omnissa Horizon","Microsoft Intune","Microsoft 365","AvePoint","BitTitan"] },
  { name: "Mainframe & Legacy Modernisation", tech: ["IBM z/OS","IBM i / AS-400","COBOL","JCL","CICS","IBM Db2","Zowe","VSAM"] },
  { name: "Embedded, Real-Time & Simulation", tech: ["Wind River VxWorks","AUTOSAR","Autodesk","Unity","Snaptrude","Embedded C"] },
  { name: "AI Fluency for the Workforce", standards: ["Prompt fundamentals","Copilot daily workflows","Role playbooks","Acceptable use & responsible AI","Hallucination checks","Adoption metrics"] },
  { name: "Agile, ITIL & Ways of Working", standards: ["Scrum & Kanban","SAFe","ITIL 4","Value stream mapping","OKRs","Team topologies","Product discovery","Delivery governance"] },
];

/* the ten added in the 2026.1 coverage extension */
const NEW_FROM = 18;

/* ==================================================================
   CARDS

   One card per item. Duplicates across domains are intentional and
   kept — "Microsoft Intune" appears under both Operating Systems and
   Digital Workplace because it genuinely belongs to both, and the
   domain shown on the card is what gives it context. The composite
   key keeps React happy.
================================================================== */
function buildCards(list) {
  return list.flatMap((d, di) =>
    (d.tech || d.standards).map((name, ii) => ({
      id: `${di}-${ii}`,
      name,
      domain: d.name,
      domainIndex: di,
      kind: d.tech ? "Technology" : "Framework",
      isNew: di >= NEW_FROM,
      lead: ii === 0,
    }))
  );
}

/* Deterministic shuffle. Seeded on purpose: a Math.random() order would
   differ between the server and client render and trip a hydration
   mismatch, and would reshuffle the grid on every re-render. Change the
   seed to change the arrangement. */
function seededShuffle(arr, seed = 0x5f3a) {
  let s = seed >>> 0;
  const rand = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/* ================================================================== */

/* The local fade-up that used to live here ran on its own numbers (0.55s,
   20px, the UI curve); the section now uses the house reveal, imported
   above, so it arrives on the same pulse as the rest of the site. */

/** The brand asterisk, as it appears on the hero and in the closing CTA. */
function Asterisk({ className = "h-3.5 w-3.5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      strokeWidth="2.4"
      strokeLinecap="round"
      className={`shrink-0 stroke-[#0B5CFF] ${className}`}
    >
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
    </svg>
  );
}

/** Section eyebrow: asterisk, then a tracked-out label in accent blue. */
function Eyebrow({ children }) {
  return (
    <p className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0B5CFF]">
      <Asterisk />
      {children}
    </p>
  );
}

function Caret({ open }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Plus when unchecked, cross when checked — the Kyndryl option affordance. */
function OptionIcon({ on }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-3.5 w-3.5 shrink-0">
      <path
        d={on ? "M5 5l10 10M15 5L5 15" : "M10 4v12M4 10h12"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------
   The Products dropdown. Multi-select, like Kyndryl's Topics.
------------------------------------------------------------------ */
function ProductsDropdown({ options, selected, onToggle, onClear }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const panelId = useId().replace(/:/g, "") + "-products";

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className={`flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-[14px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5CFF] ${
          open || selected.size
            ? "border-[#0B5CFF] bg-[#0B5CFF]/[0.06] text-[#0B5CFF]"
            : "border-[#101418]/15 text-[#101418] hover:border-[#0B5CFF]/40"
        }`}
      >
        <span className="font-medium">Products</span>
        {selected.size > 0 && (
          <span className="rounded-full bg-[#0B5CFF] px-1.5 py-px text-[11px] font-semibold tabular-nums text-white">
            {selected.size}
          </span>
        )}
        <Caret open={open} />
      </button>

      {open && (
        <div
          id={panelId}
          className="absolute left-0 z-30 mt-2 w-[min(92vw,44rem)] rounded-2xl border border-[#101418]/10 bg-white p-5 shadow-[0_24px_60px_-24px_rgba(16,20,24,0.35)] max-sm:fixed max-sm:inset-x-3 max-sm:bottom-3 max-sm:top-auto max-sm:mt-0 max-sm:w-auto"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#8A93A3]">
            Products
          </p>

          <div className="max-h-[min(52vh,26rem)] overflow-y-auto pr-1">
            <div className="flex flex-wrap gap-2">
              {options.map((name, i) => {
                const on = selected.has(i);
                return (
                  <label
                    key={name}
                    className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#0B5CFF] ${
                      on
                        ? "border-[#0B5CFF] bg-[#0B5CFF]/[0.08] text-[#0B5CFF]"
                        : "border-[#101418]/12 text-[#4A5261] hover:border-[#0B5CFF]/40 hover:text-[#101418]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={on}
                      onChange={() => onToggle(i)}
                    />
                    <span>{name}</span>
                    <OptionIcon on={on} />
                  </label>
                );
              })}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-[#101418]/8 pt-4">
            <button
              type="button"
              onClick={onClear}
              disabled={selected.size === 0}
              className="text-[13px] font-medium text-[#4A5261] underline underline-offset-4 transition-colors hover:text-[#0B5CFF] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-[#4A5261]"
            >
              Clear all filters
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                btnRef.current?.focus();
              }}
              className="rounded-full bg-[#101418] px-5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#0B5CFF]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------
   One result card.
------------------------------------------------------------------ */
// function ResultCard({ card, index, onPickDomain }) {
//   return (
//     <motion.article
//       initial={{ opacity: 0, y: 14 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, ease: EASE, delay: (index % PAGE) * 0.035 }}
//       className="group flex h-full flex-col rounded-2xl border border-[#101418]/10 bg-white p-6 transition-colors duration-200 hover:border-[#0B5CFF]/45 hover:shadow-xl"
//     >
//       <button
//         type="button"
//         onClick={() => onPickDomain(card.domainIndex)}
//         className="mb-4 self-start text-left text-[10.5px] font-semibold uppercase leading-tight tracking-[0.14em] text-[#0B5CFF]/75 underline-offset-4 transition-colors hover:text-[#0B5CFF] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5CFF]"
//       >
//         {card.domain}
//       </button>

//       <h3 className="mb-8 font-recoleta text-[1.6rem] leading-[1.15] tracking-[-0.015em] text-[#101418]">
//         {card.name}
//       </h3>

//       <div className="mt-auto flex items-center gap-3 border-t border-[#101418]/8 pt-4 text-[12px] text-[#8A93A3]">
//         <span className="flex items-center gap-2">
//           <span aria-hidden="true" className="h-px w-3 bg-[#0B5CFF]" />
//           {card.kind}
//         </span>
//         {card.isNew && (
//           <span className="ml-auto rounded-md bg-[#0B5CFF]/10 px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.1em] text-[#0B5CFF]">
//             New
//           </span>
//         )}
//       </div>
//     </motion.article>
//   );
// }

function ResultCard({ card, index, onPickDomain }) {
  return (
    /* The house reveal, on the scroll trigger: each row arrives as it comes
       into view, its three columns one STAGGER apart. A card that mounts
       already in view (a filter change) plays straight away. */
    <motion.article
      initial={{ opacity: 0, y: RISE }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{
        duration: DURATION,
        ease: REVEAL_EASE,
        delay: (index % 3) * STAGGER,
      }}
      className="
  group
  relative
  isolate
  flex
  min-h-[200px]
  sm:min-h-[280px]
  overflow-hidden
  rounded-[22px]
  border
  border-[#101418]/10
  bg-white
  p-6
  transition-all
  duration-500
  hover:-translate-y-1
  hover:border-[#101418]/10
  hover:bg-[#F3F1ED]
  hover:shadow-[0_24px_55px_-25px_rgba(16,20,24,0.22)]
"
    >
      {/* ================================================================ */}
      {/* BLUE CORNER CIRCLE                                               */}
      {/* ================================================================ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          z-0
          h-36
          w-36
          rounded-full
          bg-[#0B5CFF]/[0.10]
          blur-[2px]
          transition-all
          duration-700
          ease-out
          group-hover:-right-12
          group-hover:-top-12
          group-hover:h-56
          group-hover:w-56
          group-hover:bg-[#0B5CFF]/[0.16]
        "
      />

      {/* Soft glow around the blue circle */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          z-0
          h-44
          w-44
          rounded-full
          bg-[#0B5CFF]/[0.045]
          blur-[25px]
          transition-all
          duration-700
          ease-out
          group-hover:-right-14
          group-hover:-top-14
          group-hover:h-64
          group-hover:w-64
          group-hover:bg-[#0B5CFF]/[0.10]
        "
      />

      {/* ================================================================ */}
      {/* HOVER SHINE                                                      */}
      {/* ================================================================ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-20
          -translate-x-[140%]
          skew-x-[-18deg]
          bg-gradient-to-r
          from-transparent
          via-white/40
          to-transparent
          opacity-0
          group-hover:translate-x-[140%]
          group-hover:opacity-100
          group-hover:transition-transform
          group-hover:duration-[900ms]
          group-hover:ease-out
        "
      />

      {/* ================================================================ */}
      {/* CONTENT                                                           */}
      {/* ================================================================ */}

      <div className="relative z-10 flex h-full w-full flex-col">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <button
            type="button"
            onClick={() => onPickDomain(card.domainIndex)}
            className="
              inline-flex
              max-w-[85%]
              rounded-full
              border
              border-[#0B5CFF]/15
              bg-[#0B5CFF]/[0.045]
              px-3
              py-1.5
              text-left
              text-[9.5px]
              font-bold
              uppercase
              leading-tight
              tracking-[0.15em]
              text-[#0B5CFF]
              transition-all
              duration-300
              hover:border-[#0B5CFF]/30
              hover:bg-[#0B5CFF]/[0.08]
            "
          >
            {card.domain}
          </button>

          <span
            className="
              text-[10px]
              font-bold
              tracking-[0.16em]
              text-[#101418]/15
            "
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Technology */}
        <div className="mt-auto">
          <h3
            className="
              max-w-[290px]
              font-recoleta
              text-[1.7rem]
              font-medium
              leading-[1.1]
              tracking-[-0.025em]
              text-[#101418]
              transition-colors
              duration-300
              group-hover:text-[#101418]
            "
          >
            {card.name}
          </h3>

          {/* Bottom meta */}
          <div
            className="
              mt-7
              flex
              items-center
              gap-3
              border-t
              border-[#101418]/[0.08]
              pt-4
              text-[12px]
              text-[#8A93A3]
              transition-colors
              duration-500
              group-hover:border-[#101418]/[0.12]
            "
          >
            <span className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="
                  h-[4px]
                  w-[4px]
                  rounded-full
                  bg-[#0B5CFF]
                  shadow-[0_0_8px_rgba(11,92,255,0.45)]
                "
              />

              {card.kind}
            </span>

            {card.isNew && (
              <span
                className="
                  ml-auto
                  rounded-full
                  bg-[#0B5CFF]/[0.07]
                  px-2
                  py-1
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-[#0B5CFF]
                "
              >
                New
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* SUBTLE BLUE CORNER DETAIL                                        */}
      {/* ================================================================ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-5
          top-5
          z-10
          h-1.5
          w-1.5
          rounded-full
          bg-[#0B5CFF]/40
          opacity-0
          shadow-[0_0_14px_4px_rgba(11,92,255,0.16)]
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />
    </motion.article>
  );
}

/* ================================================================== */


export default function CatalogueSection() {
  const [selected, setSelected] = useState(() => new Set());
  const [visible, setVisible] = useState(PAGE);
  const [searchQuery, setSearchQuery] = useState("");

  const allCards = useMemo(() => buildCards(domains), []);

  /*
   * Nothing selected:
   * show one lead card per domain, shuffled.
   */
  const defaultCards = useMemo(
    () => seededShuffle(allCards.filter((c) => c.lead)),
    [allCards]
  );

  /*
   * Normal Products filter.
   *
   * No domain selected:
   *   show the default lead cards.
   *
   * Domains selected:
   *   show all technologies belonging to those domains.
   */
  const results = useMemo(
    () =>
      selected.size === 0
        ? defaultCards
        : allCards.filter((c) => selected.has(c.domainIndex)),
    [selected, allCards, defaultCards]
  );

  /*
   * Product search.
   *
   * When the user searches:
   * - Search ALL technologies if no domain filter is selected.
   * - Search only inside the selected domains if a filter is active.
   *
   * This is what allows:
   * AWS
   * Claude
   * Kubernetes
   * Python
   * GPT
   * NVIDIA
   * etc.
   */
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    // No search → use the normal catalogue results
    if (!query) {
      return results;
    }

    // When searching, search the complete catalogue,
    // unless the user has selected specific domains.
    const searchableCards =
      selected.size === 0
        ? allCards
        : allCards.filter((card) => selected.has(card.domainIndex));

    return searchableCards.filter((card) =>
      card.name.toLowerCase().includes(query)
    );
  }, [searchQuery, selected, allCards, results]);

  /*
   * A new filter or search means a new result set, so pagination goes
   * back to the first page. Adjusted during render rather than in an
   * effect — an effect would paint one frame of the new results at the
   * old page size before resetting.
   */
  const resultKey = `${[...selected].sort((a, b) => a - b).join(",")}|${searchQuery
    .trim()
    .toLowerCase()}`;

  const [prevResultKey, setPrevResultKey] = useState(resultKey);

  if (prevResultKey !== resultKey) {
    setPrevResultKey(resultKey);
    setVisible(PAGE);
  }

  const toggle = useCallback((i) => {
    setSelected((prev) => {
      const next = new Set(prev);

      next.has(i) ? next.delete(i) : next.add(i);

      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setSelected(new Set());
  }, []);

  /*
   * Cards currently visible on the page.
   */
  const shown = searchResults.slice(0, visible);

  const more = searchResults.length - shown.length;

  /*
   * Domain names used by the Products dropdown.
   */
  const names = useMemo(
    () => domains.map((d) => d.name),
    []
  );

  return (
    <section
      id="catalogue"
      className="relative z-10 scroll-mt-24 overflow-x-clip overflow-y-visible catalouge py-20 lg:py-28"
    >

    {/* Continuation glow into WhoItsFor */}
<div
  aria-hidden="true"
  className="pointer-events-none absolute -bottom-48 left-1/2 z-0 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-[#0B5CFF]/[0.045] blur-[100px]"
/>

<div
  aria-hidden="true"
  className="pointer-events-none absolute -bottom-32 left-1/2 z-0 h-[420px] w-[900px] -translate-x-1/2 opacity-[0.25]"
  style={{
    backgroundImage:
      "radial-gradient(circle, rgba(11,92,255,0.22) 1.3px, transparent 1.3px)",
    backgroundSize: "9px 9px",
    maskImage:
      "radial-gradient(ellipse at center, black 10%, transparent 70%)",
    WebkitMaskImage:
      "radial-gradient(ellipse at center, black 10%, transparent 70%)",
  }}
/>

      <Container>
        <RevealGroup delay={CUE.lead} className="max-w-2xl">
          <RevealItem>
            <Eyebrow>Catalogue</Eyebrow>
          </RevealItem>

          <RevealItem as="h2" className="mt-5 font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.015em] text-[#101418] sm:text-[2.3rem]">
            Twenty-eight domains,
            <br className="hidden sm:block" /> 415 technologies
            <span className="text-[#0B5CFF]">.</span>
          </RevealItem>

          <RevealItem as="p" className="mt-6 text-[15px] leading-7 text-[#4A5261]">
            A sample of where teams start. If your stack runs something that
            isn't here, it's a build, not a no.
          </RevealItem>
        </RevealGroup>

        {/* ------------------------- filter bar ------------------------- */}

        <Reveal delay={CUE.follow} className="mt-12 flex flex-wrap items-center gap-4 border-y border-[#101418]/8 py-4">
          {/* Filter label */}
          <span className="hidden items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8A93A3] sm:flex">
            <Asterisk className="h-3 w-3" />
            Filter
          </span>

          {/* Domain / Products filter */}
          <ProductsDropdown
            options={names}
            selected={selected}
            onToggle={toggle}
            onClear={clear}
          />

          {/* Result count */}
          <p
            aria-live="polite"
            className="hidden text-[13px] tabular-nums text-[#8A93A3] sm:block"
          >
            {searchQuery.trim()
              ? `${searchResults.length} ${
                  searchResults.length === 1
                    ? "result"
                    : "results"
                }`
              : selected.size === 0
              ? `One from each of ${domains.length} domains`
              : `${results.length} ${
                  results.length === 1
                    ? "result"
                    : "results"
                }`}
          </p>

          {/* Product search */}
          <ProductSearch
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </Reveal>

        {/* ----------------------- selected filters ---------------------- */}

        {selected.size > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {[...selected]
              .sort((a, b) => a - b)
              .map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggle(i)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#0B5CFF]/30 bg-[#0B5CFF]/[0.06] px-3.5 py-1.5 text-[12.5px] text-[#0B5CFF] transition-colors hover:bg-[#0B5CFF]/[0.12] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5CFF]"
                >
                  {names[i]}

                  <OptionIcon on />

                  <span className="sr-only">
                    Remove filter
                  </span>
                </button>
              ))}

            <button
              type="button"
              onClick={clear}
              className="ml-1 text-[12.5px] font-medium text-[#4A5261] underline underline-offset-4 transition-colors hover:text-[#0B5CFF]"
            >
              Clear all
            </button>
          </div>
        )}

        {/* --------------------------- results --------------------------- */}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((card, i) => (
            <ResultCard
              key={card.id}
              card={card}
              index={i}
              onPickDomain={(di) =>
                setSelected(new Set([di]))
              }
            />
          ))}
        </div>

        {/* No search results */}
        {searchQuery.trim() && searchResults.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-[14px] text-[#8A93A3]">
              No products found for{" "}
              <span className="font-medium text-[#101418]">
                "{searchQuery}"
              </span>
            </p>
          </div>
        )}

        {/* Load more */}
        {more > 0 && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() =>
                setVisible((v) => v + PAGE)
              }
              className="rounded-full bg-[#101418] px-7 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-[#0B5CFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5CFF]"
            >
              Load more results

              <span className="ml-2 tabular-nums opacity-60">
                {more}
              </span>
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}

function ProductSearch({ value, onChange }) {
  return (
    <div className="ml-auto flex w-full items-center gap-2 border-b border-[#101418]/20 transition-colors focus-within:border-[#0B5CFF] sm:w-[260px]">
      <Search className="h-4 w-4 shrink-0 text-[#8A93A3]" />

      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
        className="h-[42px] min-w-0 flex-1 bg-transparent text-[13px] text-[#101418] outline-none placeholder:text-[#8A93A3]"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="text-[12px] text-[#8A93A3] transition-colors hover:text-[#101418]"
        >
          Clear
        </button>
      )}
    </div>
  );
}