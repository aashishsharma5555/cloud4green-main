import Container from "@/components/layout/Container";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";
import { Eyebrow } from "@/components/customer-stories/parts";

/* What we hold to — four white cards on the paper ground, icons in the
   pillars' drawing language (30×30, no fill, 1.25 stroke). */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const VALUES = [
  {
    title: "Hands-on, always",
    body: "Live consoles, real scenarios and guard-railed labs. If a skill matters at work, learners practise it before they leave the room.",
    icon: (
      <g {...stroke}>
        <rect x="4" y="6" width="22" height="15" rx="2" />
        <path d="M9 11l3 2.5L9 16M14.5 16H20M11 25h8M15 21v4" />
      </g>
    ),
  },
  {
    title: "Vendor-neutral",
    body: "AWS, Azure, Google Cloud, VMware and the open-source stack around them. We teach what your teams run, not what we resell.",
    icon: (
      <g {...stroke}>
        <circle cx="15" cy="15" r="10.5" />
        <path d="M4.5 15h21M15 4.5c3 3 4.4 6.6 4.4 10.5S18 22.5 15 25.5c-3-3-4.4-6.6-4.4-10.5S12 7.5 15 4.5Z" />
      </g>
    ),
  },
  {
    title: "Patient teaching",
    body: "Simple examples first, depth after. Trainers who take the questions, stay after class and explain it again until it lands.",
    icon: (
      <g {...stroke}>
        <path d="M5 7.5h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-7l-4.5 3.5v-3.5H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" />
        <path d="M21 11.5h4a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1.5V24l-3.5-2.5h-4.5a2 2 0 0 1-1.9-1.4" />
      </g>
    ),
  },
  {
    title: "Outcomes over hours",
    body: "Certifications passed, roles changed, systems shipped. We measure training by what people can do afterwards.",
    icon: (
      <g {...stroke}>
        <path d="M4 25h22M7 25v-6M13 25v-10M19 25v-7M25 25V8" />
        <path d="M6 13.5l6-5 5 3.5 7.5-7M20 5h4.5v4.5" />
      </g>
    ),
  },
];

export default function OurValues() {
  return (
    <section
      id="values"
      aria-labelledby="values-title"
      className="scroll-mt-24 border-b border-[#101418]/8 bg-white py-20 lg:py-28"
    >
      <Container>
        <RevealGroup delay={CUE.lead} className="max-w-[640px]">
          <RevealItem as="p">
            <Eyebrow>What we hold to</Eyebrow>
          </RevealItem>

          <RevealItem
            as="h2"
            id="values-title"
            className="mt-5 font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-[#101418] sm:text-[2.3rem] lg:text-[2.6rem]"
          >
            How we work<span className="text-[#0B5CFF]">.</span>
          </RevealItem>

          <RevealItem as="p" className="mt-5 max-w-[540px] text-[15px] leading-7 text-[#4A5261] lg:text-[16px]">
            Four things that have stayed the same from the first classroom batch to the largest enterprise
            programme.
          </RevealItem>
        </RevealGroup>

        <RevealGroup delay={CUE.follow} className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <RevealItem
              key={v.title}
              className="group flex flex-col rounded-[18px] bg-[#FAFAF7] p-6 ring-1 ring-[#101418]/8 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_26px_50px_-24px_rgba(11,92,255,0.35)] hover:ring-[#0B5CFF]/25"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-xl bg-[#0B5CFF]/10 text-[#0B5CFF]">
                  <svg viewBox="0 0 30 30" aria-hidden="true" className="size-7">
                    {v.icon}
                  </svg>
                </span>
                <span className="text-[11px] font-bold tabular-nums tracking-[0.16em] text-[#8A93A3]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-8 font-recoleta text-[1.25rem] font-medium leading-[1.2] tracking-[-0.01em] text-[#101418] transition-colors duration-300 group-hover:text-[#0B5CFF]">
                {v.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-6 text-[#4A5261]">{v.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
