
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Container from "@/components/layout/Container";
import {
  Reveal,
  RevealGroup,
  RevealGround,
  RevealItem,
} from "@/components/motion/Reveal";
import {
  CUE,
  DURATION,
  EASE as REVEAL_EASE,
  RISE,
  STAGGER,
  VIEWPORT,
} from "@/components/motion/reveal-tokens";

/* Our implementation approach — three steps on one track, drawn the way
   n8n / Zapier / Make draw a workflow: a node per step, a signal
   travelling along the wire, a card under each node saying what happens
   and what the client walks away with.

   Cut down from the earlier five-step version. With only three broad
   steps the custom / template toggle no longer had anything to change,
   so it's gone, along with the per-mode durations. Instead, each step's
   pill says whose move it is — You / Together / Us — which is the real
   story of the section: the client's part is small. The last card, the
   one that's all ours, is lit a little brighter to say so.

   Set on white: builder-style nodes, ghosted step numbers and the blue
   top edge that draws in on hover, as on Our Solutions.

   All copy lives in STEPS below; the markup never needs to change. */

const STEPS = [
  {
    icon: "chat",
    who: "You",
    title: "Reach out to us",
    body: "Send a short note or book a call. Name the process that's slowing your team down — a sentence is enough to start.",
    gets: ["A call with our automation team", "A clear next step"],
  },
  {
    icon: "blueprint",
    who: "Together",
    title: "Explain your use case",
    body: "Walk us through how the work runs today: the systems involved, who approves what, where it breaks. We map it and recommend the right approach.",
    gets: ["A map of the process as it runs today", "Recommended approach and scope", "A plan and estimate before any build starts"],
  },
  {
    icon: "rocket",
    who: "Us",
    title: "We build, you use",
    body: "We build, test and deploy the automation on your stack, hand it over properly, and stay on to monitor and improve it.",
    gets: ["Production-ready automation", "Runbook and team handover", "Monitoring and ongoing support"],
  },
];

const ICONS = {
  chat: (
    <>
      <path d="M4.5 5.5h15a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10l-4.5 3.5V16.5h-1a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" />
      <path d="M8 10h8M8 13h5" />
    </>
  ),
  blueprint: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      <path d="M3.5 9h17M9 9v11" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 3.5c3 1.8 4.5 5 4.5 8.5l-2 4h-5l-2-4c0-3.5 1.5-6.7 4.5-8.5Z" />
      <circle cx="12" cy="10" r="1.6" />
      <path d="M9.5 16.5 8 20.5M14.5 16.5l1.5 4" />
    </>
  ),
};

function StepIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {ICONS[name]}
      </g>
    </svg>
  );
}

/* The travelling signal on the track. Kept as plain CSS so it needs no
   Tailwind config; reduced-motion users get a still track.

   Desktop has one wire and one comet. Each node pings as the comet
   reaches it: the easing is symmetric, so the middle node is passed at
   exactly half the 4s cycle, and the first and last share the cycle
   boundary (the comet lands on one as it leaves the other). That timing
   assumes three steps — change the ping delay in <Step> with the count.

   Mobile draws a segment per step (see <Step>), so its pulse is split
   into relays: every segment runs the same 6s cycle, but only travels —
   and is only visible — during its own half of it, and the second is
   delayed by half. The result is one dot passing down the chain. The 50%
   slot assumes two segments (three steps); change it, and the delay in
   <Step>, with the step count. */
const TRACK_CSS = `
@keyframes c4g-track-x { from { left: 16.5%; } to { left: 83.5%; } }
@keyframes c4g-seg-y {
  0%   { top: 0%;   opacity: 0; }
  4%   { opacity: 1; }
  46%  { opacity: 1; }
  50%  { top: 100%; opacity: 0; }
  100% { top: 100%; opacity: 0; }
}
@keyframes c4g-ping {
  0%   { transform: scale(1);    opacity: .7; }
  45%  { transform: scale(1.45); opacity: 0; }
  100% { transform: scale(1.45); opacity: 0; }
}
.c4g-pulse-x { animation: c4g-track-x 4s cubic-bezier(.65,0,.35,1) infinite; }
.c4g-pulse-y { animation: c4g-seg-y 6s linear infinite both; }
.c4g-ping    { animation: c4g-ping 4s ease-out infinite both; }
@media (prefers-reduced-motion: reduce) {
  .c4g-pulse-x, .c4g-pulse-y, .c4g-ping { animation: none; opacity: 0; }
}
`;

/* Hover-only delays for the "You receive" ticks, so they check off one
   after another. Declared only on hover, so on leave they reset at once. */
const TICK_DELAY = [
  "group-hover:[transition-delay:150ms]",
  "group-hover:[transition-delay:280ms]",
  "group-hover:[transition-delay:410ms]",
];


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

/** The arrow that trails every link in the house style; it slides on the
    parent's hover. */
function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 shrink-0 stroke-current transition-transform duration-300 group-hover:translate-x-1"
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

/* The reveal is the house one (components/motion/Reveal.jsx), imported
   above, rather than a local fade on its own numbers. */

function Step({ step, index, isLast }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    /* The house reveal. Side by side on desktop the three cross the trigger
       together, so the STAGGER is what walks them left to right. */
    <motion.li
      initial={{ opacity: 0, y: RISE }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION, ease: REVEAL_EASE, delay: index * STAGGER }}
      className="group relative flex flex-col pl-[72px] lg:pl-0"
    >
      {/* Mobile track: a segment from this node down to the next one, so
          the line stops at the last node instead of running on under its
          card. Its pulse is staggered by step, so it reads as one signal
          passing down the chain. */}
      {!isLast && (
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-6 left-7 top-14 w-px bg-[#0B5CFF]/25 lg:hidden">
          <span
            className="c4g-pulse-y absolute left-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0B5CFF] shadow-[0_0_14px_4px_rgba(11,92,255,0.35)]"
            style={{ animationDelay: `${index * 3}s` }}
          />
        </span>
      )}

      {/* The node on the track, drawn like a builder node: a rounded
          square with a port on each side. Opaque white, so the wire and
          the comet pass behind it. */}
      <span className="absolute left-0 top-0 z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-[#0B5CFF]/25 bg-white text-[#0B5CFF] shadow-[0_0_0_6px_rgba(11,92,255,0.06),0_12px_28px_-14px_rgba(11,92,255,0.45)] transition-colors duration-300 group-hover:border-[#0B5CFF] group-hover:bg-[#0B5CFF] group-hover:text-white lg:relative lg:mx-auto">
        <StepIcon name={step.icon} />

        {/* The ping as the comet arrives — desktop only, where there is
            one comet to time it against. */}
        <span
          aria-hidden="true"
          className="c4g-ping pointer-events-none absolute inset-0 hidden rounded-2xl border border-[#0B5CFF] lg:block"
          style={{ animationDelay: index === 1 ? "2s" : "0s" }}
        />

        <span aria-hidden="true" className="absolute -left-[4px] top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full border border-[#0B5CFF]/50 bg-white lg:block" />
        <span aria-hidden="true" className="absolute -right-[4px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-[#0B5CFF]/50 bg-white" />
      </span>

      {/* The wire from the node to its card — below it on desktop, to its
          right on mobile. It fills blue on hover, so the step reads as
          switched on rather than just highlighted. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-14 top-7 h-px w-4 bg-[#101418]/10 lg:left-1/2 lg:top-14 lg:h-6 lg:w-px"
      >
        <span className="absolute inset-0 origin-left scale-x-0 bg-[#0B5CFF]transition-transform duration-300 ease-out group-hover:scale-x-100 lg:origin-top lg:scale-x-100 lg:scale-y-0 lg:group-hover:scale-y-100" />
      </span>

      {/* The card: white, hairline border, soft navy shadow. The last step
          — the one that's all ours — sits on a pale blue wash at rest. */}
      <div
        className={`relative isolate flex flex-1 flex-col overflow-hidden rounded-[18px] border p-6 shadow-[0_18px_44px_-34px_rgba(16,32,74,0.45)] transition-[border-color,box-shadow] duration-300 ease-out group-hover:border-[#0B5CFF]/35 group-hover:shadow-[0_24px_56px_-30px_rgba(11,92,255,0.4)] lg:mt-6 lg:p-7 ${
          isLast
            ? "border-[#0B5CFF]/20 bg-gradient-to-b from-[#EEF3FF] to-white"
            : "border-[#101418]/8 bg-white"
        }`}
      >
        {/* A blue edge along the top that draws in from the left on hover. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#0B5CFF] via-[#0B5CFF]/50 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
        />

        {/* The step number, large and ghosted into the corner. Recoleta
            ships as a single Medium file, so font-medium. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-6 top-3 -z-10 font-recoleta text-[4.5rem] font-medium leading-none text-[#101418]/[0.05] transition-colors duration-500 group-hover:text-[#0B5CFF]/[0.12] lg:right-7"
        >
          {number}
        </span>

        {/* Whose move it is. */}
        <span className="self-start rounded-full border border-[#0B5CFF]/15 bg-[#0B5CFF]/[0.045] px-2.5 py-1 text-[9.5px] font-bold uppercase leading-tight tracking-[0.15em] text-[#0B5CFF] transition-colors duration-300 group-hover:border-[#0B5CFF] group-hover:bg-[#0B5CFF] group-hover:text-white">
          <span className="sr-only">Step {index + 1} · </span>
          {step.who}
        </span>

        <h3 className="mt-6 font-recoleta text-[1.5rem] font-medium leading-[1.15] tracking-[-0.015em] text-[#101418] lg:text-[1.6rem]">
          {step.title}
        </h3>
        <p className="mt-3 text-[14.5px] leading-[1.6] text-[#4A5261]">{step.body}</p>

        {/* The deliverables, in a sunken panel like the catalogue's canvas.
            mt-auto pins it, so the three cards line up at the foot. */}
        <div className="mt-auto pt-6">
          <div className="rounded-xl border border-[#101828]/[0.06] bg-gradient-to-b from-[#F9FAFB] to-[#F1F3F6] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
            <p className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#8A93A3]">
              <span aria-hidden="true" className="h-px w-3 bg-[#0B5CFF]" />
              You receive
            </p>
            <ul className="mt-3 space-y-2">
              {step.gets.map((g, i) => (
                <li key={g} className="flex gap-2.5 text-[13.5px] leading-5 text-[#101418]">
                  {/* A pale tick at rest, with a green one drawn over it on
                      hover — the deliverables checking off in turn. */}
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-[3px] h-3.5 w-3.5 shrink-0"
                  >
                    <path d="m3.5 8.5 3 3 6-7" className="stroke-[#0E9F6E]/35" />
                    <path
                      d="m3.5 8.5 3 3 6-7"
                      pathLength="1"
                      strokeDasharray="1"
                      className={`stroke-[#0E9F6E][stroke-dashoffset:1] group-hover:[stroke-dashoffset:0] group-hover:transition-[stroke-dashoffset] group-hover:duration-300 group-hover:ease-out ${
                        TICK_DELAY[Math.min(i, TICK_DELAY.length - 1)]
                      }`}
                    />
                  </svg>
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export default function DeliveryProcess() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="relative isolate scroll-mt-24 overflow-hidden border-b border-[#101418]/8 bg-white py-20 lg:py-28"
    >
      <style>{TRACK_CSS}</style>

      {/* A soft blue wash behind the track. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[1000px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-[#0B5CFF]/[0.06] blur-[100px]"
      />

      <Container>
        {/* ---------------------------------------------- the head */}
        <RevealGroup delay={CUE.lead} className="max-w-[760px]">
          <RevealItem as="p" className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0B5CFF]">
            <Asterisk />
            Our implementation approach
          </RevealItem>

          {/* Recoleta ships as a single Medium file, so font-medium. */}
          <RevealItem
            as="h2"
            id="approach-title"
            className="mt-5 font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-[#101418] sm:text-[2.3rem] lg:text-[2.6rem]"
          >
            From opportunity{" "}
            {/* nowrap keeps the compound from breaking at its hyphen */}
            <em className="not-italic text-[#0B5CFF]">
              to <span className="whitespace-nowrap">enterprise-ready</span> automation.
            </em>
          </RevealItem>

          <RevealItem as="p" className="mt-5 max-w-[560px] text-[15px] leading-7 text-[#4A5261] lg:text-[16px]">
            Three steps. You bring the problem; we take it from there.
          </RevealItem>
        </RevealGroup>

        {/* ---------------------------------------------- the track */}
        <div className="relative mt-14 lg:mt-16">
          {/* Desktop: a wire through the node centres (16.5%–83.5% ≈ centre
              of first to centre of last column), strongest in the middle,
              with a comet running along it. The comet's head sits on the
              animated `left`; its tail trails behind and tucks under the
              first node at the start of each run. */}
          {/* The wire is ground: it fades in under the nodes, no travel. */}
          {/* h-px so the observer has a box to see — everything in it is
              absolutely placed, and a zero-height target is unreliable. */}
          <RevealGround delay={CUE.follow} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-7 hidden h-px lg:block">
            <div className="absolute left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-[#0B5CFF]/10 via-[#0B5CFF]/35 to-[#0B5CFF]/10" />
            <span className="c4g-pulse-x absolute top-0 flex translate-x-[calc(-100%_+_4px)] -translate-y-1/2 items-center">
              <span className="h-px w-24 bg-gradient-to-r from-transparent to-[#0B5CFF]" />
              <span className="h-2 w-2 rounded-full bg-[#0B5CFF] shadow-[0_0_14px_4px_rgba(11,92,255,0.35)]" />
            </span>
          </RevealGround>

          {/* Mobile: drawn per step instead, node to node — see <Step>. */}

          <ol className="relative grid gap-6 lg:grid-cols-3 lg:gap-6">
            {STEPS.map((step, i) => (
              <Step key={step.icon} step={step} index={i} isLast={i === STEPS.length - 1} />
            ))}
          </ol>
        </div>

        {/* ---------------------------------------------- the close */}
        {/* A ruled closing row: one line and the site's ink button, which
            is step 01 itself. */}
        <Reveal className="mt-14 flex flex-col gap-5 border-y border-[#101418]/8 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-3 text-[15px] leading-6 text-[#4A5261]">
            <Asterisk className="h-3.5 w-3.5 max-sm:hidden" />
            Start with a single process. Once it's running, adding the next one is easier.
          </p>

          <Link
            to="/contact"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#101418] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#0B5CFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5CFF] sm:self-auto"
          >
            Reach out to us
            <Arrow />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
