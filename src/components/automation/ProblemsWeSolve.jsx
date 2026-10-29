// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// import Container from "@/components/layout/Container";

// /* "Problems we solve" — an open two-column list hanging off a thin
//    vertical thread, in the house style: asterisk eyebrow, Recoleta
//    headline with the blue full stop, cream ground.

//    Nothing is collapsed: a visitor should recognise their problem at a
//    glance, not open five boxes to find it. Every problem is a link to the
//    matching solution and its example workflows, so the section works as a
//    menu, not just a list. Edit the copy, examples and links in PROBLEMS
//    below; the markup never needs to change.

//    Five problems in two columns leave a hole, so the sixth cell is the
//    "not on the list?" prompt, set as an ink card — the closing line
//    becomes part of the grid instead of trailing under it. */

// const EASE = [0.22, 1, 0.36, 1];

// const PROBLEMS = [
//   {
//     slug: "repetitive-tasks",
//     title: "Too many repetitive tasks",
//     body: "Automate recurring activities, approvals, reporting and operational workflows.",
//     examples: ["Expense approvals", "Weekly ops reports", "Employee onboarding"],
//   },
//   {
//     slug: "disconnected-systems",
//     title: "Disconnected enterprise systems",
//     body: "Connect cloud platforms, business applications and IT tools through integrated workflows.",
//     examples: ["CRM → ERP sync", "Jira ↔ ServiceNow", "Cloud cost → Finance"],
//   },
//   {
//     slug: "incident-response",
//     title: "Slow incident response",
//     body: "Automate alert enrichment, incident classification, routing and remediation.",
//     examples: ["Alert enrichment", "Auto-triage & routing", "Self-healing restarts"],
//   },
//   {
//     slug: "infrastructure-management",
//     title: "Manual infrastructure management",
//     body: "Automate provisioning, configuration, scaling and lifecycle operations.",
//     examples: ["Environment provisioning", "Auto-scaling rules", "Patch & lifecycle"],
//   },
//   {
//     slug: "operational-visibility",
//     title: "Lack of operational visibility",
//     body: "Monitor workflows, track execution and surface failures or bottlenecks.",
//     examples: ["Run history & audit", "SLA breach alerts", "Bottleneck reports"],
//   },
// ];

// /* Where each problem leads. For now it's an anchor further down this
//    page; when each solution gets its own page, change this one line
//    (e.g. `/services/automation/${slug}`). */
// const solutionHref = (slug) => `#${slug}`;

// /** The brand asterisk, as it appears on every section eyebrow. */
// function Asterisk({ className = "h-3.5 w-3.5", stroke = "stroke-[#0B5CFF]" }) {
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       aria-hidden="true"
//       fill="none"
//       strokeWidth="2.4"
//       strokeLinecap="round"
//       className={`shrink-0 ${stroke} ${className}`}
//     >
//       <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
//     </svg>
//   );
// }

// /** The arrow that trails every link in the house style; it slides on the
//     parent's hover. */
// function Arrow() {
//   return (
//     <svg
//       viewBox="0 0 16 16"
//       aria-hidden="true"
//       fill="none"
//       strokeWidth="1.6"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className="h-3.5 w-3.5 shrink-0 stroke-current transition-transform duration-300 group-hover:translate-x-1"
//     >
//       <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
//     </svg>
//   );
// }

// function Reveal({ children, delay = 0, className }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.25 }}
//       transition={{ duration: 0.55, ease: EASE, delay }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// }

// /* The shine sweep every card on the site answers a hover with (here only
//    the ink card uses it). Its transition is declared only on hover, so on
//    leave it snaps back instead of sweeping backwards across the item. */
// function Shine() {
//   return (
//     <span
//       aria-hidden="true"
//       className="pointer-events-none absolute inset-0 z-20 -translate-x-[140%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:translate-x-[140%] group-hover:opacity-100 group-hover:transition-transform group-hover:duration-[900ms] group-hover:ease-out"
//     />
//   );
// }

// function ProblemItem({ problem, index }) {
//   const number = String(index + 1).padStart(2, "0");

//   return (
//     /* Right-hand column items arrive a beat later, so a row reads left
//        then right instead of both at once. */
//     <Reveal delay={index % 2 ? 0.07 : 0} className="h-full">
//       <Link
//         to={solutionHref(problem.slug)}
//         className="group relative flex h-full flex-col px-5 py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5CFF] sm:p-6 lg:p-7"
//       >
//         {/* The hover tell: no card, just a blue quote rule that draws down
//             the left edge, like a pull quote. */}
//         <span
//           aria-hidden="true"
//           className="pointer-events-none absolute bottom-6 left-0 top-6 w-[2px] origin-top scale-y-0 rounded-full bg-[#0B5CFF] transition-transform duration-500 ease-out group-hover:scale-y-100 group-focus-visible:scale-y-100 lg:bottom-7 lg:top-7"
//         />

//         {/* Number and a hairline that runs to the edge — the row's rule,
//             and the item's hover tell: the line fills blue from the left. */}
//         <div className="flex items-center gap-4">
//           <span className="text-[11px] font-bold tabular-nums tracking-[0.16em] text-[#0B5CFF]">{number}</span>
//           <span aria-hidden="true" className="relative h-px flex-1 bg-[#101418]/10">
//             <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#0B5CFF] via-[#0B5CFF]/50 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100" />
//           </span>
//         </div>

//         {/* Recoleta ships as a single Medium file, so font-medium. */}
//         <h3 className="mt-5 font-recoleta text-[1.45rem] font-medium leading-[1.15] tracking-[-0.015em] text-[#101418] lg:text-[1.6rem]">
//           {problem.title}
//         </h3>

//         <p className="mt-3 max-w-[46ch] text-[15px] leading-6 text-[#4A5261]">{problem.body}</p>

//         {/* Example workflows: the concrete version of the sentence above,
//             so someone scanning for "Jira" or "onboarding" finds it. */}
//         <ul className="mt-5 flex flex-wrap gap-2" aria-label="Example workflows">
//           {problem.examples.map((example) => (
//             <li
//               key={example}
//               className="rounded-full border border-[#101418]/10 bg-white px-3 py-1 text-[12.5px] text-[#4A5261] transition-colors duration-300 group-hover:border-[#0B5CFF]/20 group-hover:text-[#101418]"
//             >
//               {example}
//             </li>
//           ))}
//         </ul>

//         {/* mt-auto pins the link, so items in a row line up at the bottom. */}
//         <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[14px] font-semibold text-[#0B5CFF]">
//           See the solution
//           <Arrow />
//         </span>
//       </Link>
//     </Reveal>
//   );
// }

// /* The sixth cell: the section's closing prompt as an ink card, the same
//    ink as the site's primary buttons. */
// function NotListed() {
//   return (
//     <Reveal delay={0.07} className="h-full">
//       <Link
//         to="/contact"
//         className="group relative isolate flex h-full min-h-[260px] flex-col overflow-hidden rounded-[18px] bg-[#101418] p-6 text-white transition-[background-color,box-shadow] duration-300 ease-out hover:bg-[#0B5CFF] hover:shadow-[0_24px_56px_-30px_rgba(11,92,255,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5CFF] lg:p-7"
//       >
//         <Shine />

//         {/* A soft disc of blue parked in the corner; it fades out once the
//             whole card turns blue on hover. */}
//         <span
//           aria-hidden="true"
//           className="pointer-events-none absolute -right-20 -top-20 -z-10 h-56 w-56 rounded-full bg-[#0B5CFF]/35 blur-[50px] transition-opacity duration-300 group-hover:opacity-0"
//         />

//         <Asterisk className="h-5 w-5 transition-transform duration-700 ease-out group-hover:rotate-90" stroke="stroke-white" />

//         <p className="mt-auto pt-10 font-recoleta text-[1.6rem] font-medium leading-[1.15] tracking-[-0.015em]">
//           Not on the list?
//         </p>
//         <p className="mt-3 max-w-[40ch] text-[15px] leading-6 text-white/70">
//           Most projects start with a problem like one of these and grow from there.
//         </p>

//         <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold">
//           Tell us about yours
//           <Arrow />
//         </span>
//       </Link>
//     </Reveal>
//   );
// }

// export default function ProblemsWeSolve() {
//   return (
//     <section
//       id="problems"
//       aria-labelledby="problems-title"
//       className="relative scroll-mt-24 border-b border-[#101418]/8 bg-[#FAFAF7] py-20 lg:py-28"
//     >
//       <Container>
//         <div className="relative lg:pl-16">
//           {/* The thread the list hangs from: the brand asterisk at the top
//               and a line that fades as it runs down. Decorative only, and
//               hidden on small screens where there is no gutter for it. */}
//           <div aria-hidden="true" className="pointer-events-none absolute bottom-2 left-2 top-1 hidden w-4 lg:block">
//             <Asterisk className="h-4 w-4" />
//             <span className="absolute bottom-0 left-[7.5px] top-7 w-px bg-gradient-to-b from-[#0B5CFF]/40 to-[#0B5CFF]/0" />
//           </div>

//           {/* ---------------------------------------------- the intro */}
//           <Reveal className="max-w-[760px]">
//             <p className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0B5CFF]">
//               <Asterisk className="h-3.5 w-3.5 lg:hidden" />
//               Problems we solve
//             </p>

//             <h2
//               id="problems-title"
//               className="mt-5 font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-[#101418] sm:text-[2.3rem] lg:text-[2.6rem]"
//             >
//               Five problems we hear
//               <br className="hidden sm:block" /> before anything gets automated
//               <span className="text-[#0B5CFF]">.</span>
//             </h2>

//             <p className="mt-5 max-w-[560px] text-[15px] leading-7 text-[#4A5261] lg:text-[16px]">
//               Start with the one that sounds like your week. Each opens the fix we build for it and the workflows
//               we've already shipped.
//             </p>
//           </Reveal>

//           {/* ---------------------------------------------- the list */}
//           {/* Two open columns from md up. The negative margin gives each
//               item's hover quote rule a gutter to sit in, while the words
//               themselves stay aligned with the heading above. */}
//           <ul className="-mx-6 mt-12 grid gap-3 md:grid-cols-2 md:gap-x-6 md:gap-y-4 lg:-mx-7 lg:mt-14">
//             {PROBLEMS.map((problem, index) => (
//               <li key={problem.slug}>
//                 <ProblemItem problem={problem} index={index} />
//               </li>
//             ))}
//             <li>
//               <NotListed />
//             </li>
//           </ul>
//         </div>
//       </Container>
//     </section>
//   );
// }

import { Link } from "react-router-dom";

import Container from "@/components/layout/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CUE, STAGGER } from "@/components/motion/reveal-tokens";

/* Business challenges — six problems in an open two-column list hanging
   off a thin vertical thread. Same build as before (IntersectionObserver
   reveal, no framer-motion), rephrased and expanded from five items to
   six after comparing against the client's own "Business challenges"
   copy (Manual processes / Disconnected systems / Limited scalability /
   Operational errors):

     - "Manual processes" absorbed into the existing repetitive-tasks
       item, retitled "Manual, repetitive processes".
     - "Disconnected systems" already existed under that name — kept.
     - "Limited scalability" is new, and takes over the provisioning /
       scaling ground the old "Manual infrastructure management" item
       covered, so that item was retired rather than kept alongside it.
     - "Operational errors" is new: manual handoffs, inconsistency and
       compliance risk, distinct from "slow incident response".
     - "Slow incident response" and "Lack of operational visibility" are
       unchanged — nothing in the new copy overlapped them.

   The closing "Not on the list?" CTA line has been removed, so the
   section now ends with the grid. The example-workflow chips and the
   "See the solution" link are gone too — each item is now just a number,
   title and one line, and the hover tell is a blue quote rule down the
   left edge plus the row's hairline filling blue, not a card. Edit
   PROBLEMS below; the markup never needs to change. */

const PROBLEMS = [
  {
    slug: "manual-processes",
    title: "Manual, repetitive processes",
    body: "Automate recurring tasks, approvals and reporting so your team stops spending hours on work a workflow can handle.",
  },
  {
    slug: "disconnected-systems",
    title: "Disconnected enterprise systems",
    body: "Connect cloud platforms, business applications and IT tools so information moves between them without manual re-entry.",
  },
  {
    slug: "limited-scalability",
    title: "Limited scalability",
    body: "Automate provisioning, configuration and scaling so growing workloads don't demand more manual time and coordination.",
  },
  {
    slug: "operational-errors",
    title: "Operational errors",
    body: "Remove the manual handoffs between teams and systems that create delays, inconsistencies and compliance risk.",
  },
  {
    slug: "incident-response",
    title: "Slow incident response",
    body: "Automate alert enrichment, incident classification, routing and remediation so issues get resolved faster.",
  },
  {
    slug: "operational-visibility",
    title: "Lack of operational visibility",
    body: "Monitor workflows, track execution and surface failures or bottlenecks before they become incidents.",
  },
];

/* Where each problem leads. For now it's an anchor further down this
   page; when each solution gets its own page, change this one line
   (e.g. `/services/automation/${slug}`). */
const solutionHref = (slug) => `#${slug}`;

/* The reveal is the house one (components/motion/Reveal.jsx). This file
   used to run its own IntersectionObserver fade at 0.7s / 12px on a plain
   ease-out, a beat out of step with every other section on the site. */

function ProblemItem({ problem, index }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    /* Right-hand column items trail by one STAGGER, so a row arrives left
       then right instead of both at once. */
    <Reveal delay={index % 2 ? STAGGER : 0} className="h-full">
      <Link
        to={solutionHref(problem.slug)}
        className="group relative flex h-full flex-col px-5 py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5CFF] sm:p-6 lg:p-7"
      >
        {/* The hover tell: no card, just a blue quote rule that draws down
            the left edge, like a pull quote. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 left-0 top-6 w-[2px] origin-top scale-y-0 rounded-full bg-[#0B5CFF] transition-transform duration-500 ease-out group-hover:scale-y-100 group-focus-visible:scale-y-100 lg:bottom-7 lg:top-7"
        />

        {/* Number and a hairline that runs to the edge — the row's rule,
            and the item's hover tell: the line fills blue from the left. */}
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-bold tabular-nums tracking-[0.16em] text-[#0B5CFF]">{number}</span>
          <span aria-hidden="true" className="relative h-px flex-1 bg-[#101418]/10">
            <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#0B5CFF] via-[#0B5CFF]/50 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </span>
        </div>

        <h3 className="mt-5 font-recoleta text-[1.45rem] font-medium leading-[1.15] tracking-[-0.015em] text-[#101418] lg:text-[1.6rem]">
          {problem.title}
        </h3>

        <p className="mt-3 max-w-[46ch] text-[15px] leading-6 text-[#4A5261]">{problem.body}</p>
      </Link>
    </Reveal>
  );
}

export default function ProblemsWeSolve() {
  return (
    <section
      id="problems"
      aria-labelledby="problems-title"
      className="relative border-b border-[#101418]/8 bg-[#FAFAF7] py-20 lg:py-28"
    >
      <Container>
        <div className="relative lg:pl-16">
          {/* The thread the list hangs from — the reference's ::before: a
              glowing bead at the top and a line that fades as it runs down.
              Decorative only, and hidden on small screens where there is no
              gutter for it. */}
          <div aria-hidden="true" className="pointer-events-none absolute bottom-2 left-3 top-2 hidden w-[7px] lg:block">
            <span className="absolute left-0 top-0 h-[7px] w-[7px] rounded-full bg-[#0B5CFF] shadow-[0_0_0_4px_rgba(11,92,255,0.12),0_0_16px_rgba(11,92,255,0.5)]" />
            <span className="absolute bottom-0 left-[3px] top-[14px] w-px bg-gradient-to-b from-[#0B5CFF]/40 to-[#0B5CFF]/0" />
          </div>

          {/* ---------------------------------------------- the intro */}
          {/* One trigger for the three, so they arrive on the stagger rather
              than on however far apart they happen to sit. */}
          <RevealGroup delay={CUE.lead}>
            <RevealItem as="p" className="text-[12.5px] font-medium uppercase tracking-[0.14em] text-[#4A5261]">
              Business challenges
            </RevealItem>

            <RevealItem
              as="h2"
              id="problems-title"
              className="mt-3 max-w-[22ch] font-recoleta text-[2rem] font-medium uppercase leading-[1.06] tracking-[-0.02em] text-[#101418] sm:text-[2.4rem] lg:text-[2.75rem]"
            >
              Your teams deserve better{" "}
              {/* The reference's <em>: the second half of the line in a
                  softer voice, so the heading reads as a statement and a
                  turn. */}
              <em className="not-italic text-[#0B5CFF]">than repetitive work.</em>
            </RevealItem>

            <RevealItem as="p" className="mt-4 max-w-[560px] text-[15px] leading-6 text-[#4A5261] lg:text-[16px] lg:leading-7">
              Before we talk about automation, here's what's usually getting in the way. Start with the one that
              sounds like your week — each opens the fix we build for it and the workflows we've already shipped.
            </RevealItem>
          </RevealGroup>

          {/* ---------------------------------------------- the list */}
          {/* Two open columns from md up. The negative margin gives each
              item's hover quote rule a gutter to sit in, while the words
              themselves stay aligned with the heading above. It matches the
              Container's own padding at each width (px-5 on phones), so the
              list never reaches past the edge of the screen. Six items fill
              the grid evenly at three rows, so no closing CTA cell is
              needed. */}
          <ul className="-mx-5 mt-12 grid gap-3 sm:-mx-6 md:grid-cols-2 md:gap-x-6 md:gap-y-4 lg:-mx-7 lg:mt-14">
            {PROBLEMS.map((problem, index) => (
              <li key={problem.slug}>
                <ProblemItem problem={problem} index={index} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}