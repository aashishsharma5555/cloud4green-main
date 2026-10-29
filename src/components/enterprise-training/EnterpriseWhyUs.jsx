import { Link } from "react-router-dom";

import PillarCard from "@/components/common/PillarCard";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import useInView from "@/hooks/useInView";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";

/* Card artwork — same treatment as the E-learning pillars: cropped to
   fill, darkened by the scrims, copy on a blurred glass panel. Swap the
   file on the right of an import to change a card's photo. */
import imgExpertise from "@/assets/images/sector5.webp";
import imgWays from "@/assets/images/Solution1.webp";
import imgTailored from "@/assets/images/solution3.webp";
import imgPartners from "@/assets/images/handshake.jpg";

/* Icons in the pillars' drawing language: 30×30 box, no fill, 1.25
   stroke on currentColor, round caps and joins. */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const Icons = {
  expertise: (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <g {...stroke}>
        <path d="M15 4.2a7.6 7.6 0 0 0-4.6 13.6c.8.6 1.2 1.4 1.2 2.4v.4h6.8v-.4c0-1 .4-1.8 1.2-2.4A7.6 7.6 0 0 0 15 4.2Z" />
        <path d="M11.6 23.6h6.8M12.8 26.6h4.4" />
      </g>
    </svg>
  ),
  ways: (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <g {...stroke}>
        <path d="M15 4 26 9.6 15 15.2 4 9.6Z" />
        <path d="M4 15l11 5.6L26 15" />
        <path d="M4 20.4 15 26l11-5.6" />
      </g>
    </svg>
  ),
  tailored: (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <g {...stroke}>
        <path d="M4 8h4.6M13.4 8H26M4 15h12.6M21.4 15H26M4 22h6.6M15.4 22H26" />
        <circle cx="11" cy="8" r="2.4" />
        <circle cx="19" cy="15" r="2.4" />
        <circle cx="13" cy="22" r="2.4" />
      </g>
    </svg>
  ),
  partners: (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <g {...stroke}>
        <path d="M15 3.6 5.6 7.2v7c0 5.8 4 10.2 9.4 12.2 5.4-2 9.4-6.4 9.4-12.2v-7Z" />
        <path d="M10.8 15.2l3 3 5.4-6" />
      </g>
    </svg>
  ),
};

const features = [
  {
    title: "Expertise on Demand",
    body:
      "For over 13 years, we've built a network of seasoned practitioners who track the signals behind emerging tech — and turn them into sharp, current content that keeps your teams ahead of what's next.",
    icon: Icons.expertise,
    image: imgExpertise,
  },
  {
    title: "More Ways to Learn",
    body:
      "Instructor-led, self-paced, or blended — one platform for every learning style, delivered through individual courses, subscriptions, and structured programs.",
    icon: Icons.ways,
    image: imgWays,
  },
  {
    title: "Tailored for You",
    body:
      "Programs built around your goals, at any scale. Custom courses, hands-on labs, and guided learning paths that help your people learn, master, and apply the skills that matter most.",
    icon: Icons.tailored,
    image: imgTailored,
  },
  {
    title: "Partners You Can Trust",
    body:
      "Authorized partnerships with leading technology providers mean every course reflects the latest tools, standards, and certifications — never yesterday's playbook.",
    icon: Icons.partners,
    image: imgPartners,
  },
];

/** The brand asterisk — same mark as the page's section eyebrows. */
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

export default function EnterpriseWhyUs() {
  const [gridRef, inView] = useInView();

  return (
    <section
      id="why-us"
      aria-labelledby="c4g-why-title"
      className="scroll-mt-24 border-t border-[#101418]/8 bg-white py-20 lg:py-28"
    >
      <Container>
        <RevealGroup delay={CUE.lead}>
          <RevealItem as="p" className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0B5CFF]">
            <Asterisk />
            Why Cloud4Green
          </RevealItem>

          <RevealItem
            as="h2"
            id="c4g-why-title"
            className="mt-5 max-w-2xl font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.015em] text-[#101418] sm:text-[2.3rem]"
          >
            Built to Deliver Real Results
            <span className="text-[#0B5CFF]">.</span>
          </RevealItem>

          <RevealItem as="p" className="mt-5 max-w-xl text-[14.5px] leading-7 text-[#4A5261]">
            Excellence is our standard — your success is our mission. We pair
            expert-led training with the tools and support your teams need before,
            during, and long after every session.
          </RevealItem>
        </RevealGroup>

        <div
          ref={gridRef}
          className={`mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 ${
            inView ? "is-in" : ""
          }`}
        >
          {features.map((f, i) => (
            <PillarCard key={f.title} index={i} {...f} />
          ))}
        </div>

        <Reveal className="mt-12">
          <Button variant="ink" arrow render={<Link to="/products/enterprise-training#skills-catalog" />}>
            Explore Our Programs
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
