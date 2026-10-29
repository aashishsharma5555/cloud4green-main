import { Link } from "react-router-dom";

import Container from "@/components/layout/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";

/* Consulting offerings — the full service catalogue, laid out the way the
   reference mega-menu groups it: four practice areas in columns, each
   with its services listed underneath, and the three transformation
   programmes (which span every practice) as a band across the bottom.

   Every service is a link to the contact page. The service name rides
   along as ?service=..., so the contact form can pre-select or pre-fill
   it later if you want (it's ignored until then — nothing breaks).
   Edit PRACTICES / TRANSFORMATIONS below; the markup never changes. */

const PRACTICES = [
  {
    title: "Strategy Consulting",
    services: ["Business Strategy", "Corporate Strategy", "Growth & Innovation", "Organizational & Change"],
  },
  {
    title: "Operational Excellence",
    services: [
      "Supply Chain & Logistics",
      "Warehousing & Procurement",
      "Digital Operations",
      "Project Management",
      "Product Management",
    ],
  },
  {
    title: "Digital & Technology Interventions",
    services: ["IT Consulting", "Enterprise Software", "Data Analytics", "Artificial Intelligence", "Business Intelligence"],
  },
  {
    title: "Growth, Marketing & Sales",
    services: ["Brand Strategy", "Go to Market", "Pricing Strategy", "Digital Marketing 4.0", "Social Media", "SEO"],
  },
];

const TRANSFORMATIONS = ["CX Transformation", "Business Transformation", "Digital Transformation"];

/* Where every service leads. One line to change if each service later
   gets its own page. */
const contactHref = (service) => `/contact?service=${encodeURIComponent(service)}`;

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

/** House arrow; slides on its parent's hover. */
function Arrow({ className = "" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-3.5 w-3.5 shrink-0 stroke-current transition-transform duration-300 ${className}`}
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

/* One service row: name on the left, an arrow that fades in and slides
   on hover. The row's own hairline turns blue, so the hover reads as the
   line being "selected" rather than a box lighting up. */
function ServiceLink({ service }) {
  return (
    <li>
      <Link
        to={contactHref(service)}
        className="group/row relative isolate flex items-center justify-between gap-3 overflow-hidden border-b border-white/10 py-3 text-[14.5px] text-white/85 transition-colors duration-300 hover:border-[#8FB2FF]/40 hover:text-white focus-visible:text-white focus-visible:outline-none"
      >
        {/* Same swelling circle as the automation catalogue cards, hidden at
            rest (20 parked circles would be noise) and grown from the arrow. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-5 top-1/2 -z-10 -mt-5 h-10 w-10 scale-0 rounded-full bg-[#3B7BFF]/[0.35] transition-[scale,background-color] duration-[2400ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/row:scale-[16] group-hover/row:duration-[1200ms] group-hover/row:ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-visible/row:duration-[1200ms] group-hover/row:bg-[#3B7BFF]/[0.18] group-focus-visible/row:scale-[16] group-focus-visible/row:bg-[#3B7BFF]/[0.18]"
        />
        {service}
        <Arrow className="-translate-x-1 text-[#8FB2FF] opacity-0 transition-[opacity,transform] group-hover/row:translate-x-0 group-hover/row:opacity-100 group-focus-visible/row:translate-x-0 group-focus-visible/row:opacity-100" />
      </Link>
    </li>
  );
}

function PracticeCard({ practice, index }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="group flex flex-col rounded-[18px] border border-white/10 bg-gradient-to-b from-[#0d357e] to-[#04143a] p-6 shadow-[0_18px_40px_-24px_rgba(4,20,58,0.6)] transition-all duration-300 hover:border-[#8FB2FF]/35 hover:shadow-[0_22px_50px_-20px_rgba(13,53,126,0.55)] lg:p-7">
      <div className="flex items-center gap-4">
        <span className="text-[11px] font-bold tabular-nums tracking-[0.16em] text-[#8FB2FF]">{number}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-white/20 to-white/0" />
        <span className="text-[11px] font-medium tabular-nums text-white/50">
          {practice.services.length} services
        </span>
      </div>

      {/* Recoleta ships as a single Medium file, so font-medium. On the
          four-column layout the min-height keeps the lists starting on one
          line even when a title wraps to two; stacked, it isn't needed. */}
      <h3 className="mt-5 font-recoleta xl:min-h-[2.4em] text-[1.35rem] font-medium leading-[1.15] tracking-[-0.015em] text-white transition-colors duration-300 group-hover:text-[#8FB2FF]">
        {practice.title}
      </h3>

      <ul className="mt-4 border-t border-white/10">
        {practice.services.map((service) => (
          <ServiceLink key={service} service={service} />
        ))}
      </ul>
    </article>
  );
}

export default function ConsultingOfferings() {
  return (
    <section
      id="offerings"
      aria-labelledby="offerings-title"
      className="relative scroll-mt-24 border-b border-[#101418]/8 bg-[#FAFAF7] py-20 lg:py-28 overflow-hidden"
    >
      {/* Subtle decorative blobs for visual depth */}
      <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[#0B5CFF]/5 blur-3xl pointer-events-none" />
      <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[#0B5CFF]/3 blur-3xl pointer-events-none" />

      <Container>
        {/* ---------------------------------------------- the head */}
        <RevealGroup delay={CUE.lead} className="relative max-w-[760px]">
          <RevealItem as="p" className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0B5CFF]">
            <Asterisk />
            What we offer
          </RevealItem>

          <RevealItem
            as="h2"
            id="offerings-title"
            className="mt-5 font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-[#101418] sm:text-[2.3rem] lg:text-[2.6rem]"
          >
            Consulting across the whole business<span className="text-[#0B5CFF]">.</span>
          </RevealItem>

          <RevealItem as="p" className="mt-5 max-w-[560px] text-[15px] leading-7 text-[#4A5261] lg:text-[16px]">
            Four practices, twenty services. Pick the one closest to what you need and we'll set up a conversation
            with the right team.
          </RevealItem>
        </RevealGroup>

        {/* ---------------------------------------------- the practices */}
        {/* `grid` on each beat so the card still stretches to the row's
            height, as it did when it was the grid item itself. */}
        <RevealGroup delay={CUE.follow} className="relative mt-12 grid gap-5 md:grid-cols-2 lg:mt-14 xl:grid-cols-4">
          {PRACTICES.map((practice, index) => (
            <RevealItem key={practice.title} className="grid">
              <PracticeCard practice={practice} index={index} />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* ---------------------------------------------- transformation band */}
        {/* The three programmes that cut across every practice, set as one
            ink band so they read as a level above the columns. */}
        <Reveal className="relative mt-5 flex flex-col gap-6 rounded-[18px] bg-gradient-to-br from-[#101418] to-[#1a1f29] p-6 text-white lg:flex-row lg:items-center lg:justify-between lg:p-7 shadow-[0_12px_40px_rgba(11,92,255,0.12)] border border-white/5 backdrop-blur-sm overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#0B5CFF]/10 blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8FB2FF]">
              End-to-end programmes
            </p>
            <p className="mt-2 max-w-[36ch] text-[14.5px] leading-6 text-white/70">
              Multi-practice engagements that change how the whole organisation works.
            </p>
          </div>

          <ul className="relative z-10 flex flex-wrap gap-2.5">
            {TRANSFORMATIONS.map((t) => (
              <li key={t}>
                <Link
                  to={contactHref(t)}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-[14px] font-medium transition-all duration-300 hover:border-[#0B5CFF]/60 hover:bg-[#0B5CFF]/20 hover:shadow-[0_0_20px_rgba(11,92,255,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5CFF]"
                >
                  {t}
                  <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ---------------------------------------------- the close */}
        <Reveal as="p" className="relative mt-8 text-[14.5px] leading-6 text-[#4A5261]">
          Not sure which one fits?{" "}
          <Link
            to="/contact"
            className="font-medium text-[#0B5CFF] underline decoration-[#0B5CFF]/30 underline-offset-4 transition-colors duration-300 hover:decoration-[#0B5CFF]"
          >
            Tell us the problem and we'll point you to the right team →
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}