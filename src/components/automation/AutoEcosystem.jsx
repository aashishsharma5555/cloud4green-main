import { useState } from "react";
import { SiLangchain, SiLanggraph, SiMake, SiN8n, SiZapier } from "@icons-pack/react-simple-icons";

import Container from "@/components/layout/Container";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";

/* Our technology ecosystem — a logo-wall section, kept deliberately
   plain next to the heavier sections around it: six tools, each with its
   real logo and a category line, nothing to click. The point is recognition, not persuasion.

   Set on white. Each tile carries three faint slanted bars tucked into
   its right edge — this section's answer to the corner circle on the
   Enterprise Labs and catalogue cards: a quiet shape at rest that slides
   in and deepens a touch on hover.

   The six are examples, not an exhaustive list — the closing line under
   the grid says so, so the section doesn't read as "these are the only
   six tools we support." */

/* Logos come from Simple Icons (CC0), same as the skills catalogue and
   the partner banner. LangChain/LangGraph ship a pale brand blue that
   vanishes on white, so they're drawn in page ink instead.

   Simple Icons has no Grok mark. Drop an official SVG at
   /public/logos/grok.svg and it's picked up via `img`; until then the
   tile falls back to a plain initial. */
const TOOLS = [
  { name: "n8n", category: "Workflow automation", Mark: SiN8n },
  { name: "Zapier", category: "App integrations", Mark: SiZapier },
  { name: "Make", category: "Visual automation", Mark: SiMake },
  { name: "Grok", category: "Conversational AI", img: "/logos/grok.svg" },
  { name: "LangGraph", category: "Agent orchestration", Mark: SiLanggraph, color: "#101418" },
  { name: "LangChain", category: "AI application framework", Mark: SiLangchain, color: "#101418" },
];

/** The brand asterisk, as it appears on every section eyebrow. */
function Asterisk() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      strokeWidth="2.4"
      strokeLinecap="round"
      className="h-3.5 w-3.5 shrink-0 stroke-[#0B5CFF]"
    >
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
    </svg>
  );
}

/* Three slanted bars, thick to thin, parked against the tile's right
   edge and partly cut off by it. Very low opacity at rest; on hover the
   group slides a few pixels in and each bar deepens slightly. */
function Slants() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -inset-y-2 -right-3 -z-10 flex skew-x-[-20deg] gap-2 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-2"
    >
      <span className="w-4 bg-[#0B5CFF]/[0.05] transition-colors duration-500 group-hover:bg-[#0B5CFF]/[0.09]" />
      <span className="w-2.5 bg-[#0B5CFF]/[0.05] transition-colors duration-500 group-hover:bg-[#0B5CFF]/[0.09]" />
      <span className="w-1.5 bg-[#0B5CFF]/[0.05] transition-colors duration-500 group-hover:bg-[#0B5CFF]/[0.09]" />
    </span>
  );
}

/* The logo sits on a neutral well so each brand keeps its own colour;
   hover only firms up the well's edge. */
function ToolLogo({ tool }) {
  const [imgFailed, setImgFailed] = useState(false);
  const { Mark, img, color, name } = tool;

  let logo;
  if (Mark) {
    logo = <Mark size={24} color={color ?? "default"} />;
  } else if (img && !imgFailed) {
    logo = <img src={img} alt="" className="h-6 w-6 object-contain" onError={() => setImgFailed(true)} />;
  } else {
    logo = <span className="text-[17px] font-semibold text-[#101418]">{name[0]}</span>;
  }

  return (
    <span
      aria-hidden="true"
      className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#101418]/8 bg-[#F6F7F9] transition-colors duration-300 group-hover:border-[#101418]/15 group-hover:bg-white"
    >
      {logo}
    </span>
  );
}

function ToolTile({ tool }) {
  return (
    <div className="group relative isolate flex items-center gap-4 overflow-hidden rounded-2xl border border-[#101418]/10 bg-white px-5 py-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-[border-color,box-shadow] duration-300 hover:border-[#0B5CFF]/35 hover:shadow-[0_16px_40px_-24px_rgba(11,92,255,0.45)]">
      <Slants />
      <ToolLogo tool={tool} />
      <div className="min-w-0 pr-10">
        <p className="truncate text-[16px] font-semibold tracking-[-0.01em] text-[#101418]">{tool.name}</p>
        <p className="mt-0.5 truncate text-[13px] text-[#4A5261]">{tool.category}</p>
      </div>
    </div>
  );
}

export default function TechnologyEcosystem() {
  return (
    <section
      id="ecosystem"
      aria-labelledby="ecosystem-title"
      className="relative border-b border-[#101418]/8 bg-white py-20 lg:py-28"
    >
      <Container>
        {/* ---------------------------------------------- the head */}
        <RevealGroup delay={CUE.lead} className="max-w-[680px]">
          <RevealItem as="p" className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0B5CFF]">
            <Asterisk />
            Our technology ecosystem
          </RevealItem>

          <RevealItem
            as="h2"
            id="ecosystem-title"
            className="mt-5 font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-[#101418] sm:text-[2.3rem] lg:text-[2.6rem]"
          >
            We build around the tools you already use<span className="text-[#0B5CFF]">.</span>
          </RevealItem>

          <RevealItem as="p" className="mt-5 max-w-[560px] text-[15px] leading-7 text-[#4A5261] lg:text-[16px]">
            No rip-and-replace. We work inside the platforms your team has already adopted and wire them together,
            rather than asking you to move onto ours.
          </RevealItem>
        </RevealGroup>

        {/* ---------------------------------------------- the grid */}
        <RevealGroup delay={CUE.follow} className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-4">
          {TOOLS.map((tool) => (
            <RevealItem key={tool.name}>
              <ToolTile tool={tool} />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* <p className="mt-8 text-[13.5px] leading-6 text-[#4A5261]">
          A representative sample, not the full list — if it's already part of your stack, chances are we can build
          around it.
        </p> */}
      </Container>
    </section>
  );
}
