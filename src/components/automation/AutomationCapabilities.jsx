// import { useEffect, useState } from "react";

// import Container from "@/components/layout/Container";

// /* Automation capabilities — the core of the page. Same build as the
//    Enterprise Learning "6 Pillars" section: a head (eyebrow, title, lede)
//    over a 3 × 2 grid of tall image cards. Each card shows its icon, number
//    and title at rest; on hover or keyboard focus the panel opens to show
//    what's in scope and one concrete example.

//    All copy lives in CAPABILITIES below. To add photos, import them at the
//    top and set `image` on each entry, e.g.
//      import cloudImg from "@/assets/images/automation/cloud.webp";
//      { ..., image: cloudImg }
//    Without an image a card falls back to a dark gradient, so the section
//    already works before the photos exist. */

// const CAPABILITIES = [
//   {
//     slug: "cloud-infrastructure",
//     title: "Cloud & infrastructure automation",
//     scope: "Provisioning, infrastructure as code, resource scaling, configuration management and cloud cost optimisation.",
//     example: "Automatically provision a standardised AWS environment following an approved request.",
//     icon: "cloud",
//     image: null,
//   },
//   {
//     slug: "devops-deployment",
//     title: "DevOps & deployment automation",
//     scope: "CI/CD pipelines, automated testing, release orchestration, GitOps and infrastructure deployment.",
//     example: "Run automated security checks and deploy approved application changes.",
//     icon: "branch",
//     image: null,
//   },
//   {
//     slug: "it-operations-incident",
//     title: "IT operations & incident automation",
//     scope: "Event correlation, incident routing, automated remediation, ticketing and service management.",
//     example: "Detect an infrastructure issue and create an enriched ServiceNow incident.",
//     icon: "pulse",
//     image: null,
//   },
//   {
//     slug: "security-compliance",
//     title: "Security & compliance automation",
//     scope: "Vulnerability workflows, access reviews, security alert triage, policy enforcement and compliance reporting.",
//     example: "Route high-priority security findings for review and remediation.",
//     icon: "shield",
//     image: null,
//   },
//   {
//     slug: "data-ai",
//     title: "Data & AI automation",
//     scope: "Data pipelines, workflow scheduling, AI-assisted classification, document processing and intelligent agents.",
//     example: "Extract information from incoming documents and route exceptions for human approval.",
//     icon: "spark",
//     image: null,
//   },
//   {
//     slug: "business-process",
//     title: "Business process automation",
//     scope: "Multi-system approvals, employee onboarding, notifications, document workflows and repetitive back-office processes.",
//     example: "Coordinate an employee onboarding workflow across HR, identity and IT systems.",
//     icon: "flow",
//     image: null,
//   },
// ];

// /* Line icons drawn on the same 30 × 30 grid and 1.25 stroke as the
//    pillar icons, so the two sections read as one family. */
// const ICONS = {
//   cloud: (
//     <>
//       <path d="M8.6 20.4h13.2a4.4 4.4 0 0 0 .5-8.8 6.4 6.4 0 0 0-12.3-1.5 4.9 4.9 0 0 0-1.4 10.3Z" />
//       <path d="M11 25h8M15 20.4V25" />
//     </>
//   ),
//   branch: (
//     <>
//       <circle cx="9" cy="6.6" r="2.6" />
//       <circle cx="9" cy="23.4" r="2.6" />
//       <circle cx="21" cy="11.4" r="2.6" />
//       <path d="M9 9.2v11.6M21 14c0 4.6-3.8 5.6-8.6 6.6" />
//     </>
//   ),
//   pulse: (
//     <>
//       <rect x="3.4" y="5.4" width="23.2" height="16.4" rx="2" />
//       <path d="M11 25.4h8M15 21.8v3.6" />
//       <path d="M6.8 14h3.6l2-4.4 3.2 8 2.2-5.2 1.6 1.6h3.8" />
//     </>
//   ),
//   shield: (
//     <>
//       <path d="M15 3.8 5.6 7.4v6.8c0 5.8 4 10 9.4 12 5.4-2 9.4-6.2 9.4-12V7.4L15 3.8Z" />
//       <path d="m10.8 15 3 3 5.6-6.2" />
//     </>
//   ),
//   spark: (
//     <>
//       <path d="M13 4.6c.6 4.8 2.6 6.8 7.4 7.4-4.8.6-6.8 2.6-7.4 7.4-.6-4.8-2.6-6.8-7.4-7.4 4.8-.6 6.8-2.6 7.4-7.4Z" />
//       <path d="M22.4 17.8c.3 2.4 1.3 3.4 3.7 3.7-2.4.3-3.4 1.3-3.7 3.7-.3-2.4-1.3-3.4-3.7-3.7 2.4-.3 3.4-1.3 3.7-3.7Z" />
//     </>
//   ),
//   flow: (
//     <>
//       <rect x="3.6" y="4.4" width="9.2" height="7.2" rx="1.6" />
//       <rect x="17.2" y="18.4" width="9.2" height="7.2" rx="1.6" />
//       <path d="M8.2 11.6v5.2a2 2 0 0 0 2 2h7" />
//       <path d="m14.8 16.4 2.4 2.4-2.4 2.4" />
//     </>
//   ),
// };

// function Icon({ name }) {
//   return (
//     <svg viewBox="0 0 30 30" aria-hidden="true" className="h-[30px] w-[30px]">
//       <g fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
//         {ICONS[name]}
//       </g>
//     </svg>
//   );
// }

// /* The eyebrow's asterisk, from the pillars head. */
// function Asterisk() {
//   return (
//     <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 text-[#0B5CFF]">
//       <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//     </svg>
//   );
// }

// function CapabilityCard({ item, index }) {
//   const number = String(index + 1).padStart(2, "0");

//   return (
//     /* `group` drives every hover state inside; `isolate` keeps the image,
//        scrim and panel stacking to this card. On hover screens the column
//        has a fixed height and every card shares it equally (basis-0 grow);
//        the open card takes a double share, so its neighbours above and below
//        shrink to make room and the grid's outline never moves. On touch
//        screens the detail is always open and the cards size to content. */
//     <article
//       tabIndex={0}
//       className="group relative isolate flex flex-col justify-between overflow-hidden rounded-[22px] bg-[#101418] text-white transition-[flex-grow] duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5CFF] [@media(hover:none)]:min-h-(--rest) [@media(hover:hover)]:min-h-0 [@media(hover:hover)]:grow [@media(hover:hover)]:basis-0 hover:grow-[2] focus-within:grow-[2]"
//     >
//       {/* ---- background: photo if there is one, gradient if not */}
//       {item.image ? (
//         <img
//           src={item.image}
//           alt=""
//           loading="lazy"
//           className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
//         />
//       ) : (
//         <div
//           aria-hidden="true"
//           className="absolute inset-0 -z-20 bg-[radial-gradient(120%_80%_at_85%_0%,rgba(11,92,255,0.55),transparent_60%),radial-gradient(90%_70%_at_0%_100%,rgba(21,147,90,0.35),transparent_60%)] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
//         />
//       )}

//       {/* The scrim: dark at the foot where the words sit, clear at the top
//           so the photo still reads. It deepens on hover as the panel grows. */}
//       <span
//         aria-hidden="true"
//         className="absolute inset-0 -z-10 bg-gradient-to-t from-[#101418]/90 via-[#101418]/35 to-[#101418]/5 transition-opacity duration-500 group-hover:opacity-100 [@media(hover:hover)]:opacity-90"
//       />

//       {/* ---- top row: icon + number */}
//       <div className="flex items-start justify-between p-6 lg:p-7">
//         <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm">
//           <Icon name={item.icon} />
//         </span>
//         <span className="font-mono text-[13px] tracking-[0.08em] text-white/70">{number}</span>
//       </div>

//       {/* ---- bottom panel: title always, detail on hover/focus */}
//       <div className="p-6 pt-0 lg:p-7 lg:pt-0">
//         <h3 className="max-w-[20ch] text-[21px] font-semibold leading-[1.2] tracking-[-0.01em] lg:text-[22px]">
//           {item.title}
//         </h3>

//         {/* The rule grows from a stub to full width as the card opens. */}
//         <span
//           aria-hidden="true"
//           className="mt-4 block h-px w-10 bg-[#0B5CFF] transition-all duration-500 group-hover:w-full group-focus-within:w-full"
//         />

//         {/* The reveal: a 0fr → 1fr grid row animates to the content's real
//             height, which max-height tricks can't. On touch screens (no
//             hover) it simply stays open, so nothing is hidden on a phone. */}
//         <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-focus-within:grid-rows-[1fr]">
//           <div className="overflow-hidden">
//             <p className="pt-4 text-[14.5px] leading-6 text-white/80">{item.scope}</p>

//             <p className="mt-4 rounded-xl border border-white/15 bg-white/10 p-3.5 text-[13.5px] leading-[1.5] text-white/90 backdrop-blur-sm">
//               <span className="mb-1 block font-mono text-[11px] uppercase tracking-[0.12em] text-[#8FB2FF]">
//                 Example workflow
//               </span>
//               {item.example}
//             </p>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }

// /* How many columns the cards sit in, following Tailwind's sm / lg
//    breakpoints: 1 on phones, 2 from 640px, 3 from 1024px. */
// const COLUMN_QUERIES = [
//   ["(min-width: 1024px)", 3],
//   ["(min-width: 640px)", 2],
// ];

// function getColumnCount() {
//   if (typeof window === "undefined") return 3;
//   const match = COLUMN_QUERIES.find(([query]) => window.matchMedia(query).matches);
//   return match ? match[1] : 1;
// }

// function useColumnCount() {
//   const [count, setCount] = useState(getColumnCount);

//   useEffect(() => {
//     const lists = COLUMN_QUERIES.map(([query]) => window.matchMedia(query));
//     const update = () => setCount(getColumnCount());
//     lists.forEach((list) => list.addEventListener("change", update));
//     return () => lists.forEach((list) => list.removeEventListener("change", update));
//   }, []);

//   return count;
// }

// export default function AutomationCapabilities() {
//   const columnCount = useColumnCount();
//   const columns = Array.from({ length: columnCount }, () => []);
//   CAPABILITIES.forEach((item, index) => columns[index % columnCount].push({ item, index }));

//   return (
//     <section
//       id="capabilities"
//       aria-labelledby="capabilities-title"
//       className="relative border-b border-[#101418]/8 bg-[#FAFAF7] py-20 lg:py-28"
//     >
//       <Container>
//         {/* ---------------------------------------------- the head */}
//         <div className="max-w-[920px]">
//           <p className="flex items-center gap-2 text-[12.5px] font-medium uppercase tracking-[0.14em] text-[#4A5261]">
//             <Asterisk />
//             Automation capabilities
//           </p>

//           <h2
//             id="capabilities-title"
//             className="mt-3 font-recoleta text-[2rem] font-medium uppercase leading-[1.06] tracking-[-0.02em] text-[#101418] sm:text-[2.4rem] lg:text-[2.75rem]"
//           >
//             What would you like to automate
//             <span className="text-[#0B5CFF]">?</span>
//           </h2>

//           <p className="mt-4 max-w-[600px] text-[15px] leading-6 text-[#4A5261] lg:text-[16px] lg:leading-7">
//             Each one is delivered as a managed engagement: we design the workflow, build it on your stack and run it
//             with you — so you get working automations, not a list of tools.
//           </p>
//         </div>

//         {/* ---------------------------------------------- the grid
//             Independent columns rather than grid rows: an opening card only
//             trades height with the cards in its own column, not the whole
//             next row. Each column is locked to `rows × --rest` plus its gaps,
//             so the grid keeps one fixed outline while cards open and close.
//             Cards are dealt across columns (0,1,2 / 3,4,5) so they still read
//             in order left to right. */}
//         <div className="mt-12 flex items-start gap-(--gap) [--gap:1.25rem] [--rest:300px] lg:mt-14 lg:[--gap:1.5rem] lg:[--rest:320px]">
//           {columns.map((column, c) => (
//             <div
//               key={c}
//               style={{ "--rows": column.length }}
//               className="flex min-w-0 flex-1 flex-col gap-(--gap) [@media(hover:hover)]:h-[calc(var(--rows)_*_var(--rest)_+_(var(--rows)_-_1)_*_var(--gap))]"
//             >
//               {column.map(({ item, index }) => (
//                 <CapabilityCard key={item.slug} item={item} index={index} />
//               ))}
//             </div>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }

import { Link } from "react-router-dom";

import Container from "@/components/layout/Container";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";

/* Our solutions — the three-tier offering, laid out as a progression
   rather than three equal boxes: rule-based work on the left, judgment
   in the middle, orchestration on the right. A connecting arrow sits in
   each gap on desktop (a down-arrow on mobile, where the cards stack),
   so the section reads left-to-right the way the headline says it:
   simple automation → intelligent execution.

   Copy is written to be read by a buyer deciding what to ask for, not
   skimmed — each tier says what kind of work it fits and what it's made
   of, and closes with the same dot-separated capability line the brief
   gave, kept as plain text rather than turned into pill chips (the
   catalogue and capabilities sections already use that pattern; this
   one reads more like a spec line, which suits three items better than
   six or twelve). Edit SOLUTIONS below; the markup never needs to
   change.

   Set on navy so it breaks up the run of cream sections around it: the
   house asterisk eyebrow and Recoleta headline, over glassy cards with a
   ghosted tier number and a blue top edge that draws in on hover. The
   whole card is the link; there's no separate CTA line at the foot. */

const SOLUTIONS = [
  {
    slug: "workflow-automation",
    kicker: "Rule-based",
    title: "Workflow Automation",
    body: "Connects your applications and carries out repeatable, well-defined work exactly the way you'd do it yourself — every time, without exception.",
    capabilities: ["Process automation", "System integration", "Approval workflows", "RPA"],
    icon: "workflow",
  },
  {
    slug: "ai-agents",
    kicker: "Judgment-based",
    title: "AI Agents",
    body: "Goal-oriented assistants that read the situation, reach into your enterprise tools, and complete tasks you'd otherwise hand to a person.",
    capabilities: ["Knowledge agents", "Task agents", "Research agents", "Multi-agent workflows"],
    icon: "agent",
  },
  {
    slug: "agentic-automation",
    kicker: "Orchestrated",
    title: "Agentic Automation",
    body: "Pairs AI reasoning with dependable workflow execution to run complex, multi-step processes end to end — with people kept in the loop where it matters.",
    capabilities: ["Agent orchestration", "Human approvals", "Enterprise integrations", "Monitoring"],
    icon: "agentic",
  },
];

const solutionHref = (slug) => `/services/automation/${slug}`;

/* Three icons on a shared 24-viewBox / 1.5-stroke grid: a simple wired
   connection for rule-based work, a single reasoning point for an agent,
   and a small hub-and-spoke for orchestration across several of them. */
const ICONS = {
  workflow: (
    <>
      <rect x="2.75" y="4.25" width="6.5" height="6.5" rx="1.5" />
      <rect x="14.75" y="13.25" width="6.5" height="6.5" rx="1.5" />
      <path d="M9.25 7.5h3a2 2 0 0 1 2 2v4.25" />
    </>
  ),
  agent: (
    <>
      <circle cx="12" cy="12" r="7.75" />
      <path d="M12 8.5v3.5l2.4 1.4" />
    </>
  ),
  agentic: (
    <>
      <circle cx="12" cy="5.25" r="2" />
      <circle cx="5.5" cy="17.5" r="2" />
      <circle cx="18.5" cy="17.5" r="2" />
      <path d="M12 7.25v3l-4.7 5.4M15 10.25l3.5 7.25" />
    </>
  ),
};

/** The brand asterisk, as it appears on every section eyebrow. */
function Asterisk({ className = "h-3.5 w-3.5", stroke = "stroke-[#0B5CFF]" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      strokeWidth="2.4"
      strokeLinecap="round"
      className={`shrink-0 ${stroke} ${className}`}
    >
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
    </svg>
  );
}

/* The reveal is the house one (components/motion/Reveal.jsx) — this file
   used to carry its own IntersectionObserver fade on different numbers. */

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {ICONS[name]}
      </g>
    </svg>
  );
}

/* The arrow that sits in the gap between tiers — a right chevron on
   desktop where the row runs left to right, a down chevron on mobile
   where the cards stack. Decorative only: the tiers aren't a required
   sequence, so it isn't read aloud as one. */
function Connector() {
  return (
    <div aria-hidden="true" className="relative flex items-center justify-center py-3 lg:py-0">
      {/* A dashed wire across the gap, like a link on a circuit diagram. */}
      <span className="absolute h-full border-l border-dashed border-[#8FB2FF]/30 lg:h-0 lg:w-full lg:border-l-0 lg:border-t" />
      <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#8FB2FF]/30 bg-[#0A1730] text-[#8FB2FF] shadow-[0_0_0_4px_rgba(11,92,255,0.10),0_0_18px_rgba(11,92,255,0.35)]">
        <svg viewBox="0 0 16 16" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 stroke-current lg:-rotate-90">
          <path d="M8 3v10M4 9.5 8 13l4-3.5" />
        </svg>
      </span>
    </div>
  );
}

function SolutionCard({ solution, index }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <Link
      to={solutionHref(solution.slug)}
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 ease-out hover:border-[#8FB2FF]/40 hover:bg-white/[0.06] hover:shadow-[0_24px_60px_-30px_rgba(11,92,255,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FB2FF] lg:p-8"
    >
      {/* A blue edge along the top that draws in from the left on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#0B5CFF] via-[#8FB2FF] to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      {/* The tier number, set large and ghosted into the top-right corner;
          it brightens a little on hover. Recoleta ships as a single
          Medium file, so font-medium. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-4 font-recoleta text-[4.5rem] font-medium leading-none text-white/[0.06] transition-colors duration-500 group-hover:text-[#8FB2FF]/[0.16] lg:right-7"
      >
        {number}
      </span>

      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#8FB2FF]/25 bg-[#0B5CFF]/15 text-[#8FB2FF] transition-colors duration-300 group-hover:border-[#0B5CFF] group-hover:bg-[#0B5CFF] group-hover:text-white">
        <Icon name={solution.icon} />
      </span>

      <p className="mt-7 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8FB2FF]">
        <span aria-hidden="true" className="h-px w-4 bg-[#8FB2FF]" />
        {solution.kicker}
      </p>

      <h3 className="mt-3 font-recoleta text-[1.5rem] font-medium leading-[1.15] tracking-[-0.015em] text-white lg:text-[1.65rem]">
        {solution.title}
      </h3>

      <p className="mt-3 text-[15px] leading-6 text-white/65">{solution.body}</p>

      {/* The capability line, kept as the brief's dot-separated list
          rather than broken into pills — a spec, not a set of tags.
          mt-auto pins it, so the three cards line up at the foot. */}
      <p className="mt-auto pt-7">
        <span className="block border-t border-white/10 pt-5 text-[12.5px] leading-5 text-white/55 transition-colors duration-300 group-hover:text-white/85">
          {solution.capabilities.join(" · ")}
        </span>
      </p>
    </Link>
  );
}

export default function OurSolutions() {
  return (
    <section
      id="solutions"
      aria-labelledby="solutions-title"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[#0A1730] py-20 text-white lg:py-28"
    >
      {/* The navy ground: a faint blueprint grid that fades out toward the
          edges, and a blue glow rising from behind the tiers. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(143,178,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(143,178,255,0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 left-1/2 -z-10 h-[460px] w-[1000px] -translate-x-1/2 rounded-full bg-[#0B5CFF]/25 blur-[120px]"
      />

      <Container>
        {/* ---------------------------------------------- the head */}
        <RevealGroup delay={CUE.lead} className="max-w-[760px]">
          <RevealItem as="p" className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8FB2FF]">
            <Asterisk stroke="stroke-[#8FB2FF]" />
            Our solutions
          </RevealItem>

          <RevealItem
            as="h2"
            id="solutions-title"
            className="mt-5 font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-white sm:text-[2.3rem] lg:text-[2.6rem]"
          >
            From simple automation{" "}
            <em className="not-italic text-[#8FB2FF]">to intelligent execution.</em>
          </RevealItem>

          <RevealItem as="p" className="mt-5 max-w-[600px] text-[15px] leading-7 text-white/65 lg:text-[16px]">
            Three ways to take work off your team's plate, in order of how much judgment it needs. Start with rules
            — add reasoning only where the process calls for it.
          </RevealItem>
        </RevealGroup>

        {/* ---------------------------------------------- the tiers */}
        {/* Each tier arrives a beat after the one before, so the row reads
            left to right the way the headline does — and the connectors are
            beats of their own, so each arrow lands between the two tiers it
            joins. */}
        <RevealGroup delay={CUE.follow} className="mt-12 grid grid-cols-1 items-stretch gap-0 lg:mt-14 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-x-5">
          <RevealItem className="h-full">
            <SolutionCard solution={SOLUTIONS[0]} index={0} />
          </RevealItem>
          <RevealItem className="grid">
            <Connector />
          </RevealItem>
          <RevealItem className="h-full">
            <SolutionCard solution={SOLUTIONS[1]} index={1} />
          </RevealItem>
          <RevealItem className="grid">
            <Connector />
          </RevealItem>
          <RevealItem className="h-full">
            <SolutionCard solution={SOLUTIONS[2]} index={2} />
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}