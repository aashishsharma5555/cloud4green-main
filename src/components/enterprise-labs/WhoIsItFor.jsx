// import { useEffect, useRef, useState } from "react";
// import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// import Container from "@/components/layout/Container";
// import wif1 from "@/assets/images/visualImage.png";

// const EASE = [0.22, 1, 0.36, 1];

// /* Reveal, Asterisk and Eyebrow are declared here for the same reason they are
//    in <CatalougeSection> and <EnterpriseLabs>: there is no shared primitives
//    module in this project yet, so each section carries its own copy. Keep the
//    timing and the markup identical to those two if you change them. */

// /** Scroll-triggered entrance, matching <CtaSection>'s timing. */
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

// /** The brand asterisk, as it appears on the hero and in the closing CTA. */
// function Asterisk({ className = "h-3.5 w-3.5" }) {
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       aria-hidden="true"
//       strokeWidth="2.4"
//       strokeLinecap="round"
//       className={`shrink-0 stroke-[#0B5CFF] ${className}`}
//     >
//       <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
//     </svg>
//   );
// }

// /** Section eyebrow: asterisk, then a tracked-out label in accent blue. */
// function Eyebrow({ children }) {
//   return (
//     <p className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0B5CFF]">
//       <Asterisk />
//       {children}
//     </p>
//   );
// }

// /* ------------------------------------------------------------------ *
//  * Copy lives here. Each tab owns its lede and its four cards, so
//  * editing the section never means touching the markup.
//  *
//  * `image` is optional — give a tab one and that panel becomes a two
//  * column layout with the cards on the left; leave it off and the cards
//  * take the full width. Mixing the two across tabs is fine.
//  * ------------------------------------------------------------------ */
// const TABS = [
//   {
//     id: "enterprise",
//     label: "Enterprise",
//     lede:
//       "Give your engineers real cloud accounts, guided tasks that are checked as they work, and a record of what each person can actually do.",
//     // image: { src: enterpriseImg, alt: "" },
//     image: {src: wif1},
//     cards: [
//       {
//         title: "Onboarding that ends in competence",
//         body:
//           "New hires start in a provisioned environment on day one and finish with evidence of what they can run — not a completion certificate.",
//       },
//       {
//         title: "Certification without the cram",
//         body:
//           "Structured paths to AWS, Azure and GCP certification, with practice that happens in the console rather than in a question bank.",
//       },
//       {
//         title: "Skill gaps you can see",
//         body:
//           "Dashboards that show where a team is strong, where it stalls, and which tasks are failing validation across the org.",
//       },
//       {
//         title: "Sandboxes that mirror production",
//         body:
//           "Scenario environments built around your architecture, with guardrails and spend caps, so people can break things safely.",
//       },
//     ],
//   },
//   {
//     id: "universities",
//     label: "Universities",
//     lede:
//       "Run practical cloud and AI coursework without asking a department to operate its own infrastructure.",
//     cards: [
//       {
//         title: "A lab per student, not per session",
//         body:
//           "Each student gets an isolated environment that provisions in seconds and tears itself down on a schedule you set.",
//       },
//       {
//         title: "Coursework that grades itself",
//         body:
//           "Tasks are validated against the live environment, so marking is evidence-based and lands the moment the work does.",
//       },
//       {
//         title: "No end-of-term bill surprises",
//         body:
//           "Per-cohort budgets, automatic expiry and hard spend caps, all visible before the term starts.",
//       },
//       {
//         title: "Curriculum you can adapt",
//         body:
//           "Start from our AWS, Azure, Kubernetes and AI tracks, then edit the tasks until they match your syllabus.",
//       },
//     ],
//   },
//   {
//     id: "providers",
//     label: "Training providers",
//     lede:
//       "Put real environments behind the catalogue you already sell, without building a lab platform to do it.",
//     cards: [
//       {
//         title: "Labs under your brand",
//         body:
//           "White-label environments on your domain, in your look — learners never leave your product to reach them.",
//       },
//       {
//         title: "Plugs into what you already run",
//         body:
//           "SSO, LTI and a REST API, so labs slot into the LMS your customers are already logging into.",
//       },
//       {
//         title: "Sell outcomes, not video",
//         body:
//           "Validated hands-on work gives learners something to show and your sales team something to prove.",
//       },
//       {
//         title: "Scale without an ops team",
//         body:
//           "Provisioning, cleanup and cost control are ours. The curriculum and the customer stay yours.",
//       },
//     ],
//   },
// ];

// export default function WhoItsFor() {
//   const [active, setActive] = useState(0);
//   const reduce = useReducedMotion();

//   const listRef = useRef(null);
//   const tabRefs = useRef([]);

//   /* Arrow keys move between tabs and Home/End jump to the ends — the
//      behaviour a tablist is supposed to have. Paired with the roving
//      tabindex below, the whole row is one tab stop rather than three. */
//   const onKeyDown = (e) => {
//     const last = TABS.length - 1;
//     let next = null;
//     if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
//     else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
//     else if (e.key === "Home") next = 0;
//     else if (e.key === "End") next = last;
//     if (next === null) return;

//     e.preventDefault();
//     setActive(next);
//     tabRefs.current[next]?.focus();
//   };

//   /* Keep the selected tab in view when the row scrolls on a phone.
//      Deliberately NOT scrollIntoView: that walks up the tree and will
//      scroll the page as well as the row. Setting scrollLeft on the row
//      itself is the only thing that can move here. */
//   useEffect(() => {
//     const list = listRef.current;
//     const el = tabRefs.current[active];
//     if (!list || !el) return;

//     const target = el.offsetLeft - (list.clientWidth - el.offsetWidth) / 2;
//     list.scrollTo({
//       left: Math.max(0, target),
//       behavior: reduce ? "auto" : "smooth",
//     });
//   }, [active, reduce]);

//   const tab = TABS[active];

//   return (
//     <section
//       id="who-its-for"
//       className="scroll-mt-24 border-t border-[#101418]/8 bg-white py-20 lg:py-28"
//     >
//       <Container>
//         <Reveal className="max-w-2xl">
//           <Eyebrow>Who it's for</Eyebrow>

//           <h2 className="mt-5 font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.015em] text-[#101418] sm:text-[2.3rem]">
//             Built for the teams
//             <br className="hidden sm:block" /> doing the work
//             <span className="text-[#0B5CFF]">.</span>
//           </h2>
//         </Reveal>

//         {/* ── tabs ───────────────────────────────────────────────── */}
//         <Reveal className="mt-12">
//           <div
//             ref={listRef}
//             className="scrollbar-hide -mb-px overflow-x-auto border-b border-[#101418]/10"
//           >
//             <div
//               role="tablist"
//               aria-label="Who Enterprise Labs is for"
//               onKeyDown={onKeyDown}
//               className="flex w-max min-w-full gap-8 sm:gap-12"
//             >
//               {TABS.map((t, i) => {
//                 const selected = i === active;
//                 return (
//                   <button
//                     key={t.id}
//                     ref={(el) => (tabRefs.current[i] = el)}
//                     id={`tab-${t.id}`}
//                     role="tab"
//                     type="button"
//                     aria-selected={selected}
//                     aria-controls={`panel-${t.id}`}
//                     tabIndex={selected ? 0 : -1}
//                     onClick={() => setActive(i)}
//                     className={`relative whitespace-nowrap pb-4 text-[15px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5CFF]/40 focus-visible:ring-offset-4 ${
//                       selected
//                         ? "font-medium text-[#101418]"
//                         : "text-[#4A5261] hover:text-[#101418]"
//                     }`}
//                   >
//                     {t.label}

//                     {/* One indicator, not one per tab: layoutId hands the
//                         slide to Framer, so it tracks the real button
//                         widths instead of a hard-coded offset. */}
//                     {selected && (
//                       <motion.span
//                         layoutId="whoItsForUnderline"
//                         aria-hidden="true"
//                         className="absolute inset-x-0 bottom-0 h-[2px] bg-[#0B5CFF]"
//                         transition={
//                           reduce
//                             ? { duration: 0 }
//                             : { type: "spring", stiffness: 420, damping: 38 }
//                         }
//                       />
//                     )}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         </Reveal>

//         {/* ── panel ──────────────────────────────────────────────── */}
//         {/* `relative` matters: popLayout takes the outgoing panel out of
//             flow, and it anchors to the nearest positioned ancestor. It is
//             also what stops the section collapsing to zero height mid-swap
//             the way mode="wait" does. */}
//         <div className="relative mt-12">
//           <AnimatePresence mode="popLayout" initial={false}>
//             <motion.div
//               key={tab.id}
//               id={`panel-${tab.id}`}
//               role="tabpanel"
//               aria-labelledby={`tab-${tab.id}`}
//               tabIndex={0}
//               initial={reduce ? false : { opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
//               transition={{ duration: reduce ? 0.12 : 0.28, ease: EASE }}
//               className="focus-visible:outline-none"
//             >
//               <p className="max-w-3xl text-[15.5px] leading-8 text-[#101418]">
//                 {tab.lede}
//               </p>

//               <div
//                 className={
//                   tab.image
//                     ? "mt-10 grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1fr)_400px]"
//                     : "mt-10"
//                 }
//               >
//                 <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
//                   {tab.cards.map((c) => (
//                     <div
//                       key={c.title}
//                       className="border-t border-[#101418]/10 pt-6"
//                     >
//                       <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-[#101418]">
//                         {c.title}
//                       </h3>
//                       <p className="mt-3 max-w-md text-[14.5px] leading-7 text-[#4A5261]">
//                         {c.body}
//                       </p>
//                     </div>
//                   ))}
//                 </div>

//                 {tab.image && (
//                   <div className="order-first lg:order-none">
//                     <img
//                       src={tab.image.src}
//                       alt={tab.image.alt}
//                       loading="lazy"
//                       decoding="async"
//                       className="h-full w-full rounded-[6px] object-cover"
//                     />
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </Container>
//     </section>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

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
import wif1 from "@/assets/images/visualImage.png";

const EASE = [0.22, 1, 0.36, 1];

/* -------------------------------------------------------------------------- */
/* Reveal                                                                     */
/* -------------------------------------------------------------------------- */

/* The house reveal (components/motion/Reveal.jsx), imported above. This file
   used to carry its own at 0.6s / 20px on the UI curve, which put the section
   a beat out of step with the catalogue above it and the homepage. */

/* -------------------------------------------------------------------------- */
/* Brand Asterisk                                                             */
/* -------------------------------------------------------------------------- */

/* The default size and the stroke weight are <CatalogueSection>'s, so the mark
   in this section's eyebrow is the same mark at the same weight as the one in
   that section's — the callers that pass their own className still override the
   size. */
function Asterisk({ className = "h-3.5 w-3.5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      strokeWidth="2.4"
      strokeLinecap="round"
      className={`shrink-0 stroke-[#0B5CFF] ${className}`}
    >
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Small feature icons                                                        */
/* -------------------------------------------------------------------------- */

function FeatureIcon({ type }) {
  const common =
    "h-5 w-5 stroke-[#0B5CFF]";

  if (type === "students") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={common}
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }

  if (type === "labs") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={common}
      >
        <path d="m12 3 8.5 5v8L12 21l-8.5-5V8L12 3Z" />
        <path d="m3.5 8 8.5 5 8.5-5M12 13v8" />
      </svg>
    );
  }

  if (type === "sandbox") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={common}
      >
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
        <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={common}
    >
      <path d="M4 19V9" />
      <path d="M10 19V5" />
      <path d="M16 19v-8" />
      <path d="M22 19V3" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const TABS = [
  {
    id: "enterprise",
    label: "Enterprise",
    eyebrow: "FOR ENTERPRISE TEAMS",
    lede:
      "Give your engineers real cloud accounts, guided tasks that are checked as they work, and a record of what each person can actually do.",
    image: {
      src: wif1,
      alt: "Learners working together on practical technology projects",
    },
    cards: [
      {
        icon: "students",
        title: "Onboarding that ends in competence",
        body:
          "New hires start in a provisioned environment on day one and finish with evidence of what they can run — not a completion certificate.",
      },
      {
        icon: "labs",
        title: "Certification without the cram",
        body:
          "Structured paths to AWS, Azure and GCP certification, with practice that happens in the console rather than in a question bank.",
      },
      {
        icon: "sandbox",
        title: "Skill gaps you can see",
        body:
          "Dashboards that show where a team is strong, where it stalls, and which tasks are failing validation across the org.",
      },
      {
        icon: "skills",
        title: "Sandboxes that mirror production",
        body:
          "Scenario environments built around your architecture, with guardrails and spend caps, so people can break things safely.",
      },
    ],
  },

  {
    id: "universities",
    label: "Universities",
    eyebrow: "FOR UNIVERSITIES",
    lede:
      "For universities offering niche cloud and emerging technology programs, Whizlabs acts as an extended learning partner, providing deeper practical exposure alongside academic instruction.",
    image: {
      src: wif1,
      alt: "Students collaborating during a practical technology learning session",
    },
    cards: [
      {
        icon: "students",
        title: "Seamless Student Onboarding",
        body:
          "Students experience a clear, intuitive onboarding process that helps them get started and stay engaged throughout their learning journey.",
      },
      {
        icon: "labs",
        title: "Hands-On Labs Across Skill Levels",
        body:
          "From fundamental concepts to specialised domains, guided hands-on labs enable students to explore cloud technologies in a real-time, practice-first environment.",
      },
      {
        icon: "sandbox",
        title: "Custom Sandbox Environments",
        body:
          "Sandboxes are tailored to custom curricula, enabling students to learn, experiment, and build capstone projects aligned directly with the course objectives.",
      },
      {
        icon: "skills",
        title: "Job-Ready Skill Development",
        body:
          "Equip your scholars with real-world, hands-on experience that strengthens employability and ready to meet industry expectations with confidence.",
      },
    ],
  },

  {
    id: "providers",
    label: "Ed-Tech Companies",
    eyebrow: "FOR ED-TECH COMPANIES",
    lede:
      "Put real environments behind the catalogue you already sell, without building a lab platform to do it.",
    image: {
      src: wif1,
      alt: "Learners using hands-on technology training environments",
    },
    cards: [
      {
        icon: "students",
        title: "Labs under your brand",
        body:
          "White-label environments on your domain, in your look — learners never leave your product to reach them.",
      },
      {
        icon: "labs",
        title: "Plugs into what you already run",
        body:
          "SSO, LTI and a REST API, so labs slot into the LMS your customers are already logging into.",
      },
      {
        icon: "sandbox",
        title: "Sell outcomes, not video",
        body:
          "Validated hands-on work gives learners something to show and your sales team something to prove.",
      },
      {
        icon: "skills",
        title: "Scale without an ops team",
        body:
          "Provisioning, cleanup and cost control are ours. The curriculum and the customer stay yours.",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Decorative background                                                      */
/* -------------------------------------------------------------------------- */

function BackgroundPattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* subtle technical grid */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(11,92,255,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(11,92,255,0.055) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* dotted atmosphere */}
      <div
        className="absolute -top-28 left-1/2 h-[460px] w-[900px] -translate-x-1/2 opacity-[0.32]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(11,92,255,0.22) 1.4px, transparent 1.4px)",
          backgroundSize: "9px 9px",
          maskImage:
            "radial-gradient(ellipse at center, black 10%, transparent 68%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 10%, transparent 68%)",
        }}
      />

      {/* soft blue glow */}
      <div className="absolute left-1/2 top-20 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-[#0B5CFF]/[0.035] blur-3xl" />

      {/* Side labels, in the gutter beside the column.
       *
       * They only fit when there IS a gutter. <Container> is max-w-7xl with
       * lg:px-8, so the content column starts at (viewport - 1280) / 2 + 32 —
       * which is 112px at 1440, and these sit at left-8 and run 120px wide.
       * That was invisible while the heading was centred inside a narrower
       * max-w-5xl; flush left, the headline's second line runs straight through
       * "FOR A BETTER TOMORROW".
       *
       * 1700px is where the gutter clears them with room to spare (242px against
       * their 152px), and below it they are simply gone. A breakpoint and not a
       * nudge: no amount of moving them down helps, because the panel below the
       * heading occupies the same column all the way to the foot of the section.
       */}
      <div className="absolute left-8 top-40 hidden max-w-[120px] min-[1700px]:block">
        <div className="mb-3 h-px w-10 bg-[#0B5CFF]/30" />
        <p className="text-[10px] font-semibold uppercase leading-[1.6] tracking-[0.22em] text-[#101418]/35">
          Cloud
          <br />
          Skills
          <br />
          For A Better
          <br />
          Tomorrow
        </p>
      </div>

      <div className="absolute right-8 top-40 hidden max-w-[120px] text-right min-[1700px]:block">
        <div className="mb-3 ml-auto h-px w-10 bg-[#0B5CFF]/30" />
        <p className="text-[10px] font-semibold uppercase leading-[1.6] tracking-[0.22em] text-[#101418]/35">
          Practical
          <br />
          Learning
          <br />
          Real Outcomes
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function WhoItsFor() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  const listRef = useRef(null);
  const tabRefs = useRef([]);

  const onKeyDown = (e) => {
    const last = TABS.length - 1;
    let next = null;

    if (e.key === "ArrowRight") {
      next = active === last ? 0 : active + 1;
    } else if (e.key === "ArrowLeft") {
      next = active === 0 ? last : active - 1;
    } else if (e.key === "Home") {
      next = 0;
    } else if (e.key === "End") {
      next = last;
    }

    if (next === null) return;

    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  useEffect(() => {
    const list = listRef.current;
    const el = tabRefs.current[active];

    if (!list || !el) return;

    const target =
      el.offsetLeft - (list.clientWidth - el.offsetWidth) / 2;

    list.scrollTo({
      left: Math.max(0, target),
      behavior: reduce ? "auto" : "smooth",
    });
  }, [active, reduce]);

  const tab = TABS[active];

  return (
    <section
      id="who-its-for"
      className="relative scroll-mt-24 overflow-hidden bg-[#FCFBF8] py-24 lg:py-32"
    >
      {/* <BackgroundPattern /> */}

      <Container className="relative z-10">
        {/* ---------------------------------------------------------------- */}
        {/* Heading                                                          */}
        {/* ---------------------------------------------------------------- */}

        {/* Set exactly as <CatalogueSection>'s heading is — same eyebrow, same
            two type sizes, same measure, flush left. The three sections read as
            one page only if they agree on this block, and this one had drifted:
            centred in a max-w-5xl, an eyebrow at 11px on 0.28em, and a size ramp
            that ran 2.8rem -> 2rem at sm -> 3rem at lg, so the headline got
            SMALLER on the first breakpoint up from a phone.

            max-w-2xl and not 5xl: the measure is what makes a flush-left heading
            read as a column rather than as a line of text with a ragged end. */}
        <RevealGroup delay={CUE.lead} className="max-w-2xl">
          <RevealItem as="p" className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0B5CFF]">
            <Asterisk />
            Built for impact
          </RevealItem>

          <RevealItem as="h2" className="mt-5 font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.015em] text-[#101418] sm:text-[2.3rem]">
            Turn learning investments
            <br className="hidden sm:block" /> into team capabilities
            <span className="text-[#0B5CFF]">.</span>
          </RevealItem>
        </RevealGroup>

        {/* ---------------------------------------------------------------- */}
        {/* Tabs                                                             */}
        {/* ---------------------------------------------------------------- */}

        {/* Flush left and full width, on the same mt-12 as the filter bar under
            <CatalogueSection>'s heading. Centred in a max-w-3xl it was hanging
            off the middle of a heading that no longer sits there — and the rule
            under it stopped short of the column the panel below occupies, which
            reads as a stray line rather than as the edge of the tab row.

            w-max min-w-full is what lets the row scroll on a phone: it fills the
            container when the tabs fit and grows past it when they don't. */}
        <Reveal delay={CUE.follow} className="mt-12">
          <div
            ref={listRef}
            className="scrollbar-hide -mb-px overflow-x-auto border-b border-[#101418]/10"
          >
            <div
              role="tablist"
              aria-label="Who Enterprise Labs is for"
              onKeyDown={onKeyDown}
              className="flex w-max min-w-full gap-8 sm:gap-12"
            >
              {TABS.map((t, i) => {
                const selected = i === active;

                return (
                  <button
                    key={t.id}
                    ref={(el) => (tabRefs.current[i] = el)}
                    id={`tab-${t.id}`}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    aria-controls={`panel-${t.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={`relative whitespace-nowrap pb-4 pt-1 text-[15px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5CFF]/30 ${
                      selected
                        ? "font-semibold text-[#0B5CFF]"
                        : "font-medium text-[#101418]/55 hover:text-[#101418]"
                    }`}
                  >
                    {t.label}

                    {selected && (
                      <motion.span
                        layoutId="whoItsForUnderline"
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-[2px] bg-[#0B5CFF]"
                        transition={
                          reduce
                            ? { duration: 0 }
                            : {
                                type: "spring",
                                stiffness: 420,
                                damping: 38,
                              }
                        }
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ---------------------------------------------------------------- */}
        {/* Main panel                                                       */}
        {/* ---------------------------------------------------------------- */}

        <div className="relative mt-10 lg:mt-12">
          <AnimatePresence
            mode="popLayout"
            initial={false}
          >
            <motion.div
              key={tab.id}
              id={`panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab.id}`}
              tabIndex={0}
              initial={
                reduce
                  ? false
                  : {
                      opacity: 0,
                      y: 12,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={
                reduce
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: -8,
                    }
              }
              transition={{
                duration: reduce ? 0.12 : 0.32,
                ease: EASE,
              }}
              className="focus-visible:outline-none"
            >
              {/* ---------------------------------------------------------- */}
              {/* Premium container                                           */}
              {/* ---------------------------------------------------------- */}

              <div className="relative overflow-hidden rounded-[28px] border border-[#101418]/[0.09] bg-white/80 p-6 shadow-[0_24px_80px_rgba(16,20,24,0.07)] backdrop-blur-xl sm:p-8 lg:p-10">
                {/* inner technical line */}
                <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0B5CFF]/30 to-transparent" />

                {/* subtle corner glow */}
                <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#0B5CFF]/[0.045] blur-3xl" />

                <div className="relative">
                  {/* ------------------------------------------------------ */}
                  {/* Intro                                                     */}
                  {/* ------------------------------------------------------ */}

                  <Reveal>
                    <div className="mb-8 flex items-center gap-3">
                      <span className="h-px w-8 bg-[#0B5CFF]" />

                      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#0B5CFF]">
                        {tab.eyebrow}
                      </p>
                    </div>

                    <p className="max-w-4xl text-[1.15rem] font-medium leading-[1.55] tracking-[-0.015em] text-[#101418] sm:text-[1.3rem] lg:text-[1.4rem]">
                      {tab.lede}
                    </p>
                  </Reveal>

                  {/* ------------------------------------------------------ */}
                  {/* Content grid                                             */}
                  {/* ------------------------------------------------------ */}

                  <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.9fr)] lg:items-stretch">
                    {/* ---------------------------------------------------- */}
                    {/* Feature cards                                          */}
                    {/* ---------------------------------------------------- */}

                    <div className="grid gap-4 sm:grid-cols-2">
                      {tab.cards.map((card, index) => (
                        <motion.div
                          key={card.title}
                          /* On the scroll trigger, not on mount: the panel
                             mounts with the page, far below the fold, so an
                             on-mount entrance played to nobody. A tab switch
                             mounts the cards already in view, so they still
                             play straight away there. */
                          initial={
                            reduce
                              ? false
                              : {
                                  opacity: 0,
                                  y: RISE,
                                }
                          }
                          whileInView={{
                            opacity: 1,
                            y: 0,
                          }}
                          viewport={VIEWPORT}
                          transition={{
                            duration: DURATION,
                            ease: REVEAL_EASE,
                            delay: reduce ? 0 : index * STAGGER,
                          }}
                          className="group relative overflow-hidden rounded-2xl border border-[#101418]/[0.08] bg-[#FCFBF8] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0B5CFF]/20 hover:shadow-[0_18px_45px_rgba(16,20,24,0.08)]"
                        >
                          {/* number */}
                          <div className="absolute right-5 top-5 text-[10px] font-bold tracking-[0.18em] text-[#101418]/15">
                            0{index + 1}
                          </div>

                          {/* icon */}
                          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[#0B5CFF]/10 bg-[#0B5CFF]/[0.07]">
                            <FeatureIcon type={card.icon} />
                          </div>

                          <h3 className="max-w-[260px] text-[17px] font-semibold leading-[1.25] tracking-[-0.015em] text-[#101418]">
                            {card.title}
                          </h3>

                          <p className="mt-3 max-w-md text-[14px] leading-6 text-[#4A5261]">
                            {card.body}
                          </p>

                          {/* hover accent */}
                          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#0B5CFF] transition-all duration-300 group-hover:w-full" />
                        </motion.div>
                      ))}
                    </div>

                    {/* ---------------------------------------------------- */}
                    {/* Image                                                   */}
                    {/* ---------------------------------------------------- */}

                    <Reveal
                      delay={STAGGER}
                      className="order-first lg:order-none"
                    >
                      <div className="group relative h-full min-h-[390px] overflow-hidden rounded-[24px] bg-[#101418]">
                        {/* image */}
                        <img
                          src={tab.image.src}
                          alt={tab.image.alt}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                        />

                        {/* premium overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#07101d]/55 via-transparent to-[#07101d]/10" />

                        {/* top label */}
                        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 backdrop-blur-md">
                          <Asterisk className="h-3.5 w-3.5 stroke-white" />

                          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                            Real-world learning
                          </span>
                        </div>

                        {/* floating metric */}
                        <div className="absolute bottom-5 right-5 rounded-2xl border border-white/20 bg-[#101418]/65 px-5 py-4 backdrop-blur-xl">
                          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/55">
                            Learning model
                          </p>

                          <p className="mt-1 text-[18px] font-semibold tracking-[-0.02em] text-white">
                            Learn → Build → Grow
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  </div>

                  {/* ------------------------------------------------------ */}
                  {/* Bottom CTA / trust strip                                */}
                  {/* ------------------------------------------------------ */}

                  <div className="mt-9 flex flex-col gap-5 border-t border-[#101418]/[0.08] pt-7 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B5CFF]/[0.08]">
                        <Asterisk className="h-3.5 w-3.5" />
                      </span>

                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#101418]/45">
                        Practical learning. Real outcomes.
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-5">
                      <button
                        type="button"
                        className="group inline-flex items-center gap-3 rounded-xl bg-[#101418] px-5 py-3 text-[13px] font-semibold text-white shadow-[0_8px_25px_rgba(16,20,24,0.15)] transition-all hover:-translate-y-0.5 hover:bg-[#0B5CFF]"
                      >
                        Book a demo

                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0B5CFF] text-white transition-colors group-hover:bg-white group-hover:text-[#0B5CFF]">
                          →
                        </span>
                      </button>

                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#101418]/65 transition-colors hover:text-[#0B5CFF]"
                      >
                        Download brochure
                        <span className="text-[#0B5CFF]">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}