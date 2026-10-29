import { Link } from "react-router-dom";

import Container from "@/components/layout/Container";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";
import { Arrow, Eyebrow, Tag } from "@/components/customer-stories/parts";

/* Everything the company does today, one card per product and service
   page, so /about is also the shortest map of the site. */

const OFFERINGS = [
  {
    kind: "Product",
    title: "Enterprise Labs",
    body: "Live cloud and AI lab environments across AWS, Azure, GCP, Kubernetes and more, validated as people work.",
    to: "/products/enterprise-labs",
  },
  {
    kind: "Product",
    title: "E-Learning",
    body: "Managed enterprise learning: needs analysis, content development, LMS management and ROI reporting.",
    to: "/products/e-learning",
  },
  {
    kind: "Product",
    title: "Certifications",
    body: "Exam-mapped tracks for AWS, Azure, Google Cloud, Kubernetes and security, with practice labs and mock exams.",
    to: "/products/certifications",
  },
  {
    kind: "Product",
    title: "Enterprise Training",
    body: "Customised corporate programmes in cloud, GenAI, DevOps, data and security: instructor-led, self-paced or blended.",
    to: "/products/enterprise-training",
  },
  {
    kind: "Service",
    title: "Automation",
    body: "Workflow automation and AI agents that connect your systems and take repetitive work off your people.",
    to: "/services/automation",
  },
  {
    kind: "Service",
    title: "Consulting",
    body: "Strategy, operations, digital and technology consulting that turns ambition into measurable outcomes.",
    to: "/services/consulting",
  },
];

export default function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      aria-labelledby="what-title"
      className="scroll-mt-24 border-b border-[#101418]/8 bg-[#FAFAF7] py-20 lg:py-28"
    >
      <Container>
        <RevealGroup delay={CUE.lead} className="max-w-[640px]">
          <RevealItem as="p">
            <Eyebrow>What we do</Eyebrow>
          </RevealItem>

          <RevealItem
            as="h2"
            id="what-title"
            className="mt-5 font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-[#101418] sm:text-[2.3rem] lg:text-[2.6rem]"
          >
            From first lab to production<span className="text-[#0B5CFF]">.</span>
          </RevealItem>

          <RevealItem as="p" className="mt-5 max-w-[540px] text-[15px] leading-7 text-[#4A5261] lg:text-[16px]">
            Four products to build skills, and two services to put them to work.
          </RevealItem>
        </RevealGroup>

        <RevealGroup delay={CUE.follow} className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3 lg:mt-14">
          {OFFERINGS.map((o) => (
            <RevealItem key={o.title} className="grid">
              <Link
                to={o.to}
                className="group flex h-full flex-col rounded-[18px] bg-white p-6 ring-1 ring-[#101418]/8 shadow-[0_18px_40px_-28px_rgba(16,20,24,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_50px_-24px_rgba(11,92,255,0.35)] hover:ring-[#0B5CFF]/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5CFF]"
              >
                <span className="self-start">
                  <Tag>{o.kind}</Tag>
                </span>
                <h3 className="mt-5 font-recoleta text-[1.25rem] font-medium leading-[1.2] tracking-[-0.01em] text-[#101418] transition-colors duration-300 group-hover:text-[#0B5CFF]">
                  {o.title}
                </h3>
                <p className="mb-6 mt-3 text-[14.5px] leading-6 text-[#4A5261]">{o.body}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 border-t border-[#101418]/8 pt-5 text-[13.5px] font-medium text-[#101418] transition-colors group-hover:text-[#0B5CFF]">
                  Explore {o.title}
                  <Arrow className="group-hover:translate-x-0.5" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
