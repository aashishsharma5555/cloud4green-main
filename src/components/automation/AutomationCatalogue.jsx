import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

import Container from "@/components/layout/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import {
  CUE,
  DURATION,
  EASE as REVEAL_EASE,
  RISE,
  STAGGER,
  VIEWPORT,
} from "@/components/motion/reveal-tokens";

/* Automation catalogue — the n8n-style workflow browser. The capabilities
   section above says what we do; this one lets a visitor picture it:
   search or filter, scan the tool chain on each card, open the workflow.

   Each entry is written so the same object can later feed the workflow's
   detail page (trigger, steps, outputs, prerequisites…). `type` separates
   a ready-to-deploy template from a custom build that needs discovery and
   engineering, and every card says which one it is.

   Export it so the detail page can import the same list:
     import { WORKFLOWS } from "@/components/sections/Automation/AutomationCatalogue"; */

const CATEGORIES = ["All", "Cloud", "DevOps", "IT Operations", "Security", "AI & Data"];

export const WORKFLOWS = [
  {
    slug: "cloud-cost-anomaly-detection",
    title: "Cloud cost anomaly detection",
    category: "Cloud",
    type: "template",
    tools: ["AWS", "Cost Explorer", "Teams"],
    summary: "Detect unusual cloud spending, investigate anomalies and notify the appropriate team.",
  },
  {
    slug: "standard-environment-provisioning",
    title: "Standard environment provisioning",
    category: "Cloud",
    type: "custom",
    tools: ["ServiceNow", "Terraform", "AWS"],
    summary: "Turn an approved request into a tagged, policy-compliant AWS environment.",
  },
  {
    slug: "idle-resource-cleanup",
    title: "Idle resource cleanup",
    category: "Cloud",
    type: "template",
    tools: ["AWS Config", "Lambda", "Slack"],
    summary: "Find unused volumes, IPs and instances, ask the owner, then stop or delete what nobody claims.",
  },
  {
    slug: "pull-request-preview-environments",
    title: "Preview environment per pull request",
    category: "DevOps",
    type: "custom",
    tools: ["GitHub", "Kubernetes", "Slack"],
    summary: "Spin up a temporary environment for every pull request and tear it down on merge.",
  },
  {
    slug: "cicd-security-checks",
    title: "Automated CI/CD security",
    category: "DevOps",
    type: "template",
    tools: ["GitHub", "SonarQube", "Jenkins"],
    summary: "Run code and security checks before deploying approved changes.",
  },
  {
    slug: "release-approval-gate",
    title: "Release approval gate",
    category: "DevOps",
    type: "template",
    tools: ["Jira", "Actions", "Slack"],
    summary: "Hold a production release until the linked ticket is approved, then deploy and announce it.",
  },
  {
    slug: "intelligent-incident-response",
    title: "Intelligent incident response",
    category: "IT Operations",
    type: "custom",
    tools: ["Prometheus", "AI", "ServiceNow"],
    summary: "Analyse infrastructure alerts, enrich incidents and route them to responders.",
  },
  {
    slug: "disk-space-auto-remediation",
    title: "Disk-space auto-remediation",
    category: "IT Operations",
    type: "template",
    tools: ["Datadog", "Ansible", "Slack"],
    summary: "Clear logs and expand volumes when a disk alert fires, and post what was done.",
  },
  {
    slug: "security-alert-triage",
    title: "Security alert triage",
    category: "Security",
    type: "custom",
    tools: ["SIEM", "AI", "Jira"],
    summary: "Classify security findings and escalate alerts for investigation.",
  },
  {
    slug: "quarterly-access-review",
    title: "Quarterly access review",
    category: "Security",
    type: "template",
    tools: ["Entra ID", "Outlook", "Jira"],
    summary: "Send each manager their team's access list, collect decisions and revoke what's rejected.",
  },
  {
    slug: "ai-document-processing",
    title: "AI document processing",
    category: "AI & Data",
    type: "custom",
    tools: ["Document AI", "LLM", "SharePoint"],
    summary: "Extract, validate and route information from business documents.",
  },
  {
    slug: "expense-approval",
    title: "Expense approval",
    category: "AI & Data",
    type: "template",
    tools: ["Portal", "Document AI", "ERP"],
    summary: "Read a submitted receipt, check it against policy and approve or escalate it automatically.",
  },
];


/* The accent follows the workflow's type: green for a template that's
   ready to go, brand blue for a custom build. Only the lit nodes, the
   flowing connector and the type dot wear it. Full class strings so the
   compiler finds every one. */
const TYPE_LABEL = {
  template: {
    text: "Ready-to-deploy template",
    dot: "bg-[#0E9F6E]",
    node: "group-hover/card:border-[#0E9F6E]/45 group-hover/card:bg-[#0E9F6E]/[0.07] group-hover/card:text-[#0A7A54]",
    role: "group-hover/card:text-[#0E9F6E]",
    flow: "bg-[#0E9F6E]",
    tone: "text-[#0A7A54]",
  },
  custom: {
    text: "Custom build",
    dot: "bg-[#0B5CFF]",
    node: "group-hover/card:border-[#0B5CFF]/45 group-hover/card:bg-[#0B5CFF]/[0.07] group-hover/card:text-[#0B5CFF]",
    role: "group-hover/card:text-[#0B5CFF]",
    flow: "bg-[#0B5CFF]",
    tone: "text-[#0B5CFF]",
  },
};

/* Hovering a card "runs" its workflow: each node lights in turn and each
   connector fills after the node before it. These are the hover-only
   delays for each step of that run, node, connector, node… — listed out
   in full so Tailwind sees every class. The transition lives only in the
   hover state, so on leave the run resets at once instead of unwinding. */
const RUN_STEP = [
  "group-hover/card:[transition-delay:0ms]",
  "group-hover/card:[transition-delay:120ms]",
  "group-hover/card:[transition-delay:300ms]",
  "group-hover/card:[transition-delay:420ms]",
  "group-hover/card:[transition-delay:600ms]",
  "group-hover/card:[transition-delay:720ms]",
  "group-hover/card:[transition-delay:900ms]",
];
const runStep = (k) => RUN_STEP[Math.min(k, RUN_STEP.length - 1)];

const roleOf = (i, count) => (i === 0 ? "Trigger" : i === count - 1 ? "Output" : "Step");

const workflowHref = (slug) => `/services/automation/workflows/${slug}`;

/* Search matches title, summary, category and every tool, so "aws",
   "jira" or "incident" all find something. */
function matches(workflow, query) {
  if (!query) return true;
  const haystack = [workflow.title, workflow.summary, workflow.category, ...workflow.tools].join(" ").toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

/** The arrow on the card's "Open workflow" line; it slides on hover. */
function LinkArrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 shrink-0 stroke-current transition-transform duration-300 group-hover/card:translate-x-1"
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

/* The canvas at the top of every card: the workflow's tools as nodes on a
   dotted grid, the way they'd sit in the builder. Equal-width nodes so
   every card's chain lines up with its neighbours. */
function WorkflowCanvas({ tools, type }) {
  return (
    <div
      className="relative isolate overflow-hidden rounded-[14px] border border-[#101828]/[0.06] bg-gradient-to-b from-[#F9FAFB] to-[#F1F3F6] px-4 pb-4 pt-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
    >
      {/* A plain circle parked in the top-right corner that, on hover,
          swells from there until it floods the whole panel. Scaled rather
          than resized, so it stays a crisp circle the whole way. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 -z-10 h-20 w-20 rounded-full bg-[#0B5CFF]/[0.12] transition-[transform,background-color] duration-[2400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[12] group-hover/card:bg-[#0B5CFF]/[0.06]"
      />
      <ol className="flex items-start" aria-label={`Tools: ${tools.join(", then ")}`}>
        {tools.map((tool, i) => (
          <li key={tool} className="contents">
            {i > 0 && (
              // The connector: a hairline track with a fill that runs along
              // it once the node before it has lit.
              <span aria-hidden="true" className="relative mt-[17px] h-[2px] w-4 shrink-0 rounded-full bg-[#101418]/12 sm:w-5">
                <span
                  className={`absolute inset-0 origin-left scale-x-0 rounded-full group-hover/card:scale-x-100 group-hover/card:transition-transform group-hover/card:duration-200 group-hover/card:ease-out ${type.flow} ${runStep(i * 2 - 1)}`}
                />
              </span>
            )}

            <span className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <span
                className={`w-full truncate rounded-[10px] border border-[#101828]/[0.08] bg-white px-2 py-2 text-center text-[12px] font-medium text-[#101418] shadow-[0_1px_2px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.04)] group-hover/card:transition-colors group-hover/card:duration-200 ${type.node} ${runStep(i * 2)}`}
              >
                {tool}
              </span>
              <span
                className={`text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#8A93A3] group-hover/card:transition-colors group-hover/card:duration-200 ${type.role} ${runStep(i * 2)}`}
              >
                {roleOf(i, tools.length)}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function WorkflowCard({ workflow, index }) {
  const type = TYPE_LABEL[workflow.type];

  return (
    /* The house reveal on the scroll trigger: each row arrives as it comes
       into view, its three columns one STAGGER apart. A card that mounts
       already in view (a filter change) plays straight away. */
    <motion.li
      initial={{ opacity: 0, y: RISE }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION, ease: REVEAL_EASE, delay: (index % 3) * STAGGER }}
    >
      <Link
        to={workflowHref(workflow.slug)}
        className="group/card relative isolate flex h-full flex-col overflow-hidden rounded-[20px] border border-[#101418]/10 bg-white p-2 transition-[border-color,box-shadow,background-color] duration-300 ease-out hover:border-[#101418]/10 hover:bg-[#F3F1ED] hover:shadow-[0_20px_48px_-32px_rgba(16,32,74,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5CFF]"
      >
        {/* The shine sweep. It rides above the content so a white pass has
            something to brighten, and its transition is declared only on
            hover, so on leave it snaps back instead of sweeping backwards. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 -translate-x-[140%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover/card:translate-x-[140%] group-hover/card:opacity-100 group-hover/card:transition-transform group-hover/card:duration-[900ms] group-hover/card:ease-out"
        />

        <WorkflowCanvas tools={workflow.tools} type={type} />

        <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
          <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${type.tone}`}>{workflow.category}</p>

          {/* Recoleta ships as a single Medium file, so font-medium. */}
          <h3 className="mt-2 font-recoleta text-[1.3rem] font-medium leading-[1.2] tracking-[-0.015em] text-[#101418]">
            {workflow.title}
          </h3>

          <p className="mt-2.5 text-[14px] leading-[1.6] text-[#4A5261]">{workflow.summary}</p>

          {/* mt-auto pins the footer, so a card with a short summary still
              lines up with a long one. */}
          <div className="mt-auto flex items-center gap-3 pt-6 text-[12.5px]">
            <span className="flex items-center gap-2 text-[#4A5261]">
              <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${type.dot}`} />
              {type.text}
            </span>

            <span className="ml-auto inline-flex items-center gap-1.5 font-semibold text-[#101418] transition-colors duration-300 group-hover/card:text-[#0B5CFF]">
              Open
              <LinkArrow />
            </span>
          </div>
        </div>
      </Link>
    </motion.li>
  );
}

/** The brand asterisk, as it appears on every section eyebrow. */
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

/* The reveal is the house one (components/motion/Reveal.jsx), imported
   above, rather than a local fade on its own numbers. */

export default function AutomationCatalogue() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const results = useMemo(
    () => WORKFLOWS.filter((w) => (category === "All" || w.category === category) && matches(w, query.trim())),
    [query, category],
  );

  const clear = () => {
    setQuery("");
    setCategory("All");
  };

  const filtered = category !== "All" || query.trim() !== "";

  return (
    <section
      id="catalogue"
      aria-labelledby="catalogue-title"
      className="relative isolate scroll-mt-24 overflow-hidden border-b border-[#101418]/8 bg-[#FAFAF7] py-20 lg:py-28"
    >
      {/* Ambient blue wash behind the grid — the section's only colour
          outside the cards, the same device the Enterprise Labs catalogue
          uses to carry into the next section. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 -z-10 h-[460px] w-[960px] -translate-x-1/2 rounded-full bg-[#0B5CFF]/[0.05] blur-[100px]"
      />

      <Container>
        {/* ---------------------------------------------- the head */}
        {/* Wide/narrow split, as on the certification tracks: title and deck
            on the left, the type key dropped onto the deck's last line on
            the right. Stacks on a phone. */}
        <RevealGroup delay={CUE.lead} className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div className="max-w-[760px]">
            <RevealItem as="p" className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0B5CFF]">
              <Asterisk />
              Automation catalogue
            </RevealItem>

            {/* Recoleta ships as a single Medium file, so font-medium. */}
            <RevealItem
              as="h2"
              id="catalogue-title"
              className="mt-5 font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-[#101418] sm:text-[2.3rem] lg:text-[2.6rem]"
            >
              Explore automation solutions
              <span className="text-[#0B5CFF]">.</span>
            </RevealItem>

            <RevealItem as="p" className="mt-5 text-[15px] leading-7 text-[#4A5261] lg:text-[16px]">
              Search by tool, team or problem. Each workflow shows what triggers it, what it connects and whether it's a
              ready-to-deploy template or a custom build.
            </RevealItem>
          </div>

          {/* The key for the dot on every card's footer. */}
          <RevealItem>
            <ul className="flex flex-col gap-2.5 text-[13px] text-[#4A5261]">
              {Object.entries(TYPE_LABEL).map(([key, t]) => (
                <li key={key} className="flex items-center gap-2.5">
                  <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
                  {t.text}
                </li>
              ))}
            </ul>
          </RevealItem>
        </RevealGroup>

        {/* ---------------------------------------------- the filter bar */}
        {/* The Enterprise Labs catalogue's bar: ruled top and bottom, a
            tracked "Filter" label, the chips, and an underline search
            pushed to the right edge. */}
        <Reveal delay={CUE.follow} className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-3 border-y border-[#101418]/8 py-4">
          <span className="hidden items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8A93A3] sm:flex">
            <Asterisk className="h-3 w-3" />
            Filter
          </span>

          {/* Buttons with aria-pressed, so assistive tech hears which one
              is on. */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {CATEGORIES.map((c) => {
              const active = c === category;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(c)}
                  className={`rounded-[8px] border px-4 py-2 text-[13.5px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5CFF] ${
                    active
                      ? "border-[#0B5CFF] bg-[#0B5CFF]/[0.06] text-[#0B5CFF]"
                      : "border-[#101418]/12 text-[#4A5261] hover:border-[#0B5CFF]/40 hover:text-[#101418]"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          <div className="flex w-full items-center gap-2 border-b border-[#101418]/20 transition-colors focus-within:border-[#0B5CFF] lg:ml-auto lg:w-[280px]">
            <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-[#8A93A3]" />
            <label htmlFor="catalogue-search" className="sr-only">
              Search workflows
            </label>
            <input
              id="catalogue-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              className="h-[42px] min-w-0 flex-1 bg-transparent text-[13.5px] text-[#101418] outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="text-[12px] text-[#8A93A3] transition-colors hover:text-[#101418]"
              >
                Clear
              </button>
            )}
          </div>
        </Reveal>

        {/* Result count, announced politely as the list changes, with a way
            back once anything is narrowed. */}
        <div className="mt-5 flex items-center gap-3 text-[13px] tabular-nums text-[#8A93A3]">
          <p aria-live="polite">
            {results.length} {results.length === 1 ? "workflow" : "workflows"}
            {category !== "All" && ` in ${category}`}
            {query.trim() && ` matching “${query.trim()}”`}
          </p>
          {filtered && (
            <button
              type="button"
              onClick={clear}
              className="font-medium text-[#4A5261] underline underline-offset-4 transition-colors hover:text-[#0B5CFF]"
            >
              Clear all
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((w, i) => (
              <WorkflowCard key={w.slug} workflow={w} index={i} />
            ))}
          </ul>
        ) : (
          <div className="mt-6 flex flex-col items-center rounded-[20px] border border-[#101418]/8 bg-white px-6 py-14 text-center shadow-[0_18px_44px_-34px_rgba(16,32,74,0.45)]">
            <Asterisk className="h-5 w-5" />
            <p className="mt-5 font-recoleta text-[1.4rem] font-medium leading-tight text-[#101418]">
              No workflow matches that yet<span className="text-[#0B5CFF]">.</span>
            </p>
            <p className="mt-2 max-w-[420px] text-[14px] leading-6 text-[#4A5261]">
              If it isn't here, it's a build, not a no.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="rounded-full bg-[#101418] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#0B5CFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5CFF]"
              >
                Describe what you need
              </Link>
              <button
                type="button"
                onClick={clear}
                className="rounded-full border border-[#101418]/15 px-6 py-3 text-[14px] font-medium text-[#101418] transition-colors hover:border-[#0B5CFF]/40 hover:text-[#0B5CFF]"
              >
                Clear the filters
              </button>
            </div>
          </div>
        )}

        {/* Honest footnote: these are illustrations until real case
            studies replace them. Remove once they're real. */}
        <p className="mt-10 flex items-center gap-2 border-t border-[#101418]/8 pt-5 text-[12.5px] text-[#8A93A3]">
          <span aria-hidden="true" className="h-px w-3 bg-[#0B5CFF]" />
          Illustrative workflows, not claims about existing Cloud4Green implementations.
        </p>
      </Container>
    </section>
  );
}
