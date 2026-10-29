"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Container from "@/components/layout/Container";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";

/* ------------------------------------------------------------------
   Cloud4Green — "Certification tracks" for /products/certifications.

   The Pluralsight block's skeleton, rebuilt in the house style:

     • a header row split wide/narrow — title and deck on the left, a
       single "browse everything" link pushed to the right edge and
       baseline-aligned with the title (their large-9 / large-3 row),
     • then a flat grid of white cards on a cream ground, each card
       being a rule, a family name, and a column of arrow links.

   Two changes from the reference. Their cards lead with a provider
   logo (AWS, Azure, ISC2, CompTIA) because the grouping IS the vendor;
   ours group by domain family, each of which spans several vendors, so
   the logo slot is replaced by a coloured rule — the same device the
   catalogue deck uses, blue for established families and green for the
   three added in edition 2026.1. And their grid is two-up; eight
   families at four to six items each want four-up on a wide screen,
   two-up on a tablet, one-up on a phone.

   Every item takes an optional `to`. Anything without one renders as
   plain text rather than a dead link, so the section can ship before
   the individual track pages exist and light up as they land.
------------------------------------------------------------------ */

const NEW_EDITION = "2026.1";

/** Eight families, in catalogue order. `isNew` marks the 2026.1 additions. */
const TRACK_FAMILIES = [
  {
    name: "Cloud",
    items: [
      { label: "AWS Solutions Architect / Developer / DevOps Engineer" },
      { label: "Azure AZ-104 / AZ-305 / AI-102" },
      { label: "Google Professional Cloud Architect / Data Engineer" },
      { label: "Oracle Cloud Infrastructure Architect" },
    ],
  },
  {
    name: "AI & Data",
    items: [
      { label: "AWS Certified AI Practitioner & ML Engineer" },
      { label: "Azure AI Engineer and Fabric Analytics Engineer" },
      { label: "Google Professional ML Engineer" },
      { label: "Databricks Data Engineer / ML Engineer" },
      { label: "Snowflake SnowPro" },
      { label: "NVIDIA-aligned AI infrastructure tracks" },
    ],
  },
  {
    name: "DevOps & Cloud Native",
    items: [
      { label: "CKA / CKAD / CKS" },
      { label: "HashiCorp Terraform Associate" },
      { label: "Docker Certified Associate" },
      { label: "GitOps and platform engineering tracks" },
      { label: "Red Hat OpenShift administration" },
    ],
  },
  {
    name: "Cybersecurity",
    items: [
      { label: "CompTIA Security+ / CySA+ / SecAI+" },
      { label: "EC-Council CEH v13" },
      { label: "AWS and Azure Security Specialty" },
      { label: "Microsoft SC-100 / SC-200 / SC-300" },
      { label: "Zscaler ZIA / ZPA / ZDX credentials" },
      { label: "ISC2 CCSP-aligned cloud security" },
    ],
  },
  {
    name: "Governance & Assurance",
    items: [
      { label: "ISO/IEC 42001 Lead Implementer" },
      { label: "ISO/IEC 27001 Lead Implementer / Auditor" },
      { label: "NIST CSF 2.0 and AI RMF practitioner" },
      { label: "ISO/SAE 21434 automotive cybersecurity" },
      { label: "IEC 62443 OT security" },
    ],
  },
  {
    name: "Software & Quality",
    isNew: true,
    items: [
      { label: "Oracle Certified Professional, Java SE" },
      { label: "Microsoft AZ-204 Azure Developer" },
      { label: "AWS Certified Developer Associate" },
      { label: "ISTQB Foundation and Advanced" },
      { label: "Certified Kubernetes Application Developer" },
    ],
  },
  {
    name: "Infrastructure & Workplace",
    isNew: true,
    items: [
      { label: "Red Hat RHCSA / RHCE" },
      { label: "Microsoft AZ-800 / AZ-801 Windows Server" },
      { label: "Microsoft MD-102 / MS-102 / AZ-140" },
      { label: "VMware VCP and Nutanix NCP" },
      { label: "NetApp NCDA and Veeam VMCE" },
      { label: "Oracle DBA and Microsoft DP-300" },
    ],
  },
  {
    name: "Practice & Delivery",
    isNew: true,
    items: [
      { label: "Professional Scrum Master I / II" },
      { label: "Professional Scrum Product Owner" },
      { label: "SAFe Agilist and SAFe Practitioner" },
      { label: "ITIL 4 Foundation and Managing Professional" },
      { label: "PMI PMP and PMI-ACP" },
      { label: "Internal AI fluency badge (issued by us)" },
    ],
  },
];

/* The hover palette, one entry per accent.

   The catalogue deck's cards answer a hover with a cream ground, a blue disc
   that swells out of the top-right corner, and a white shine sweeping the
   face. These cards take the ground and the shine unchanged — both are either
   uniform across the card or over in 900ms, so neither costs the list any
   legibility.

   The disc is the one part that doesn't transfer. A catalogue card holds a
   domain chip and one short course name; these hold four to six exam names at
   14px, and a tint that swells and settles *underneath* that column is the
   difference between scannable and not. Its job is done on the edges instead:
   the rule extends, a line wipes across the top, a bracket closes the
   bottom-right corner, and a low wash rises off the bottom edge — so the only
   thing that ever comes to rest under a label is the flat hover ground. */
const ACCENTS = {
  blue: {
    rule: "bg-[#0B5CFF]",
    line: "bg-gradient-to-r from-[#0B5CFF] via-[#0B5CFF]/60 to-transparent",
    corner: "border-[#0B5CFF]/35",
    wash: "from-[#ede5d1]/[0.1]",
    dot: "group-hover/card:bg-[#0B5CFF]/50",
    card: "hover:border-[#0B5CFF]/25",
  },
  green: {
    rule: "bg-[#0E9F6E]",
    line: "bg-gradient-to-r from-[#0E9F6E] via-[#0E9F6E]/60 to-transparent",
    corner: "border-[#0E9F6E]/35",
    wash: "from-[#ede5d1]/[0.1]",
    dot: "group-hover/card:bg-[#0E9F6E]/50",
    card: "hover:border-[#0E9F6E]/25",
  },
};

/** The brand asterisk, as it appears on every section eyebrow. */
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

/** The arrow that trails every link in this section. It slides on hover via
    the parent's `group-hover`, which is why it takes no state of its own. */
function Arrow({ className = "" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-3.5 w-3.5 shrink-0 translate-y-[3px] stroke-current transition-transform duration-200 group-hover:translate-x-0.5 ${className}`}
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

/** One row inside a card. With a `to` it's a link in brand blue; without
    one it stays ink-coloured plain text, so an un-built track page never
    ships as a dead link. */
function TrackItem({ label, to, dotClass = "" }) {
  if (!to) {
    return (
      <li className="flex gap-2.5 text-[14px] leading-6 text-[#4A5261]">
        {/* The bullet is the only part of the list the card's hover touches —
            a 5px dot changing tint reads as the list waking up without
            moving, tinting or reflowing a single word of the label. */}
        <span
          aria-hidden="true"
          className={`mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#101418]/25 transition-colors duration-300 ${dotClass}`}
        />
        {label}
      </li>
    );
  }

  return (
    <li>
      <Link
        to={to}
        className="group flex gap-2 text-[14px] leading-6 text-[#101418] transition-colors hover:text-[#0B5CFF]"
      >
        <span className="underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-[#0B5CFF]/40">
          {label}
        </span>
        <Arrow />
      </Link>
    </li>
  );
}

/* One card.

   `height` is the measured height of the first card, which every other card
   is pinned to; the first card itself gets none and sizes to its content.
   A pinned card whose list doesn't fit clips it and offers "View more",
   which turns the list into a scroll region — the card's own height never
   moves, in either state.

   The footer row is reserved on every pinned card whether or not it ends up
   holding a button. That's deliberate: if the row appeared only when the
   list overflowed, adding it would shrink the list slot, which could tip a
   card that only just fits into overflowing, which would add the row… and
   the measurement would oscillate. A constant reservation breaks the loop,
   and costs nothing visually — a pinned card that fits has slack at the
   bottom regardless. */
function TrackCard({ family, cardRef, height }) {
  const scrollRef = useRef(null);
  const [overflows, setOverflows] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const isPinned = typeof height === "number";

  // Does the list outrun its slot? Re-measured whenever the slot or the
  // content changes size — the pinned height moves with the viewport, and
  // the labels rewrap every time the column narrows.
  useLayoutEffect(() => {
    const node = scrollRef.current;
    if (!node) return undefined;

    const measure = () => {
      const tooTall = node.scrollHeight - node.clientHeight > 1;
      setOverflows(tooTall);
      if (!tooTall) setExpanded(false);
    };

    measure();

    if (typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    if (node.firstElementChild) observer.observe(node.firstElementChild);
    return () => observer.disconnect();
  }, [height]);

  const accent = ACCENTS[family.isNew ? "green" : "blue"];
  const clipped = overflows && !expanded;

  return (
    <article
      ref={cardRef}
      style={isPinned ? { height: `${height}px` } : undefined}
      // `isolate` so the decoration layer below can sit at a negative z-index:
      // that puts it above the card's own white background but beneath every
      // static-positioned child, i.e. beneath all of the text, without the
      // layer escaping to paint behind the section itself.
      //
      // Only transform, shadow and border-color transition. `transition-all`
      // would also animate `height`, which is set from a measurement and must
      // snap, not slide, when the grid re-measures on resize.
      className={`group/card relative isolate flex flex-col rounded-[14px] border border-[#101418]/8 bg-white p-7 shadow-[0_18px_44px_-34px_rgba(16,32,74,0.45)] transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out hover:-translate-y-1 hover:bg-[#F3F1ED] hover:shadow-[0_24px_56px_-30px_rgba(16,32,74,0.45)] ${accent.card}`}
    >
      {/* ----------------------------------------- the hover decoration
          One clipped layer holding every moving part, all of it hard against
          an edge. It can't take `overflow-hidden` from the article, because
          the "New" badge deliberately hangs off the top — hence its own
          clip box, inset to the padding box and so one pixel less round. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[13px]"
      >
        {/* The catalogue deck's shine, reduced to the top edge: a line that
            wipes left-to-right and fades out before the right margin. */}
        <span
          className={`absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover/card:scale-x-100 ${accent.line}`}
        />

        {/* The corner answer to the catalogue's swelling disc — open rather
            than filled, and parked in the one corner the text never reaches. */}
        <span
          className={`absolute bottom-0 right-0 h-12 w-12 translate-x-2 translate-y-2 rounded-br-[13px] border-b-2 border-r-2 opacity-0 transition-all duration-500 ease-out group-hover/card:translate-x-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 ${accent.corner}`}
        />

        {/* A 5%-alpha wash off the bottom edge. It reaches the last line or
            two of a full list, where it shifts the label's contrast ratio by
            well under a tenth of a point — visible as warmth, not as tint. */}
        <span
          className={`absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover/card:opacity-100 ${accent.wash}`}
        />
      </div>

      {/* ------------------------------------------------ the shine sweep
          The catalogue deck's, lifted whole — and it has to ride *above* the
          text at z-20 rather than under it, or a white pass over a white card
          would have nothing to brighten.

          Note the transition is declared only inside `group-hover`, which is
          the trick that makes the catalogue's version read correctly: with no
          transition in the resting state, the pane snaps back to its start
          the instant the pointer leaves instead of sweeping backwards across
          the card. Its own clip box again, for the same reason as above — the
          article can't take `overflow-hidden` while the badge overhangs it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[13px]"
      >
        <div className="pointer-events-none absolute inset-0 -translate-x-[140%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover/card:translate-x-[140%] group-hover/card:opacity-100 group-hover/card:transition-transform group-hover/card:duration-[900ms] group-hover/card:ease-out" />
      </div>

      {family.isNew && (
        <span className="absolute -top-2.5 right-6 z-10 rounded-full bg-[#0E9F6E] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
          New
        </span>
      )}

      {/* The rule that stands in for the reference block's vendor logo, and
          the card's main tell on hover — it extends rather than moves, so it
          stays a fixed-height row and never nudges the list below it. */}
      <span
        aria-hidden="true"
        className={`block h-[3px] w-10 shrink-0 rounded-full transition-[width] duration-500 ease-out group-hover/card:w-20 ${accent.rule}`}
      />

      <h3 className="mt-6 shrink-0 text-[17px] font-semibold leading-snug text-[#101418]">
        {family.name}
      </h3>

      <div className="relative mt-5 min-h-0 flex-1">
        {/* Scrollable only once it's been opened; `c4g-quiet-scroll` keeps the
            gutter reserved in both states so the labels never rewrap. */}
        <div
          ref={scrollRef}
          // Focusable once open, so the list can be scrolled from the keyboard.
          tabIndex={expanded ? 0 : -1}
          role={expanded ? "group" : undefined}
          aria-label={expanded ? `${family.name} tracks` : undefined}
          className={`c4g-quiet-scroll h-full outline-none ${
            expanded ? "overflow-y-auto" : "overflow-hidden"
          }`}
        >
          <ul className="flex flex-col gap-3">
            {family.items.map((item) => (
              <TrackItem key={item.label} {...item} dotClass={accent.dot} />
            ))}
          </ul>
        </div>

        {/* Softens the cut where the list is clipped.

            Two stacked gradients rather than one, because the card's ground
            is no longer a constant: a fade hardcoded to white would sit on
            the cream hover state as a visible pale band across the last line
            of the list. They cross-fade on the same 300ms as the background
            beneath them, so the cut stays invisible in both states and
            through the transition between them. */}
        {clipped && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-9 bg-gradient-to-t from-white via-white/85 to-transparent transition-opacity duration-300 ease-out group-hover/card:opacity-0"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-9 bg-gradient-to-t from-[#F3F1ED] via-[#F3F1ED]/85 to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover/card:opacity-100"
            />
          </>
        )}
      </div>

      {isPinned && (
        <div className="mt-3 flex h-5 shrink-0 items-center">
          {overflows && (
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => {
                if (expanded && scrollRef.current) scrollRef.current.scrollTop = 0;
                setExpanded((open) => !open);
              }}
              className="text-[12px] font-semibold text-[#0B5CFF] transition-opacity hover:opacity-70"
            >
              {expanded ? "View less" : `View all ${family.items.length}`}
            </button>
          )}
        </div>
      )}
    </article>
  );
}

export default function CertificationTracks({ browseAllHref = "/contact" }) {
  const referenceRef = useRef(null);
  const [cardHeight, setCardHeight] = useState(null);

  // The first card sets the height of the whole grid. It's measured rather
  // than computed because the labels wrap differently at every breakpoint,
  // and re-measured on resize for the same reason. The first read happens
  // before paint, so the other cards never flash at their natural height.
  useLayoutEffect(() => {
    const node = referenceRef.current;
    if (!node) return undefined;

    const measure = () => setCardHeight(node.getBoundingClientRect().height);
    measure();

    if (typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="certification-tracks"
      className="scroll-mt-24 border-b border-[#101418]/8 bg-[#F7F5F4] py-20 lg:py-24"
    >
      <Container>
        {/* ------------------------------------------- the header row */}
        {/* Wide/narrow split, the reference block's large-9 / large-3.
            `items-end` drops the link onto the deck's last baseline on a
            wide screen; on a phone it simply stacks underneath. */}
        <RevealGroup delay={CUE.lead} className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div className="max-w-[760px]">
            <RevealItem as="p" className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0B5CFF]">
              <Asterisk />
              Certification tracks
            </RevealItem>

            {/* Recoleta ships as a single Medium file (see the @font-face in
                index.css), so this is font-medium — asking for bolder gets a
                synthesised bold. */}
            <RevealItem as="h2" className="mt-5 font-recoleta text-[1.75rem] font-medium uppercase leading-[1.1] tracking-[-0.02em] text-[#101418] sm:text-[2.15rem] lg:text-[2.6rem]">
              Certification tracks we prepare candidates for
              <span className="text-[#0B5CFF]">.</span>
            </RevealItem>

            <RevealItem as="p" className="mt-5 text-[15px] leading-7 text-[#4A5261] lg:text-[16px]">
              Each track pairs exam-blueprint-mapped content with the practice
              labs the exam assumes you have already run, plus mock exams and
              voucher procurement. Three track families are new in edition{" "}
              {NEW_EDITION}.
            </RevealItem>
          </div>

          <RevealItem>
            <Link
              to={browseAllHref}
              className="group inline-flex shrink-0 items-start gap-2 text-[14px] font-semibold text-[#0B5CFF]"
            >
              Browse all tracks
              <Arrow className="translate-y-[4px]" />
            </Link>
          </RevealItem>
        </RevealGroup>

        {/* -------------------------------------------- the card grid */}
        {/* Eight families: four-up on a wide screen, two-up on a tablet,
            one-up on a phone. `items-start` keeps every card at the height
            it was handed rather than letting the row stretch it. */}
        <RevealGroup delay={CUE.follow} className="mt-14 grid items-start gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {TRACK_FAMILIES.map((family, index) => (
            <RevealItem key={family.name}>
              <TrackCard
                family={family}
                cardRef={index === 0 ? referenceRef : undefined}
                height={index === 0 ? undefined : cardHeight}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}