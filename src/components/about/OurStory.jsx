import { Link } from "react-router-dom";

import Container from "@/components/layout/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";
import { Arrow, Eyebrow } from "@/components/customer-stories/parts";

/* The story on the left, the three house numbers on the right as the
   same ink band the featured story used — so the figures read as the
   ones on the home map and the E-Learning page, not new claims. */

const STATS = [
  { value: "13+", label: "years of training" },
  { value: "1M+", label: "learners trained" },
  { value: "20+", label: "industries served" },
];

/* The journey, in the company's own four steps. The last one is still
   being built, so it's set in blue and links to the launch notes. */
const CHAPTERS = [
  {
    year: "2013",
    title: "Upskilling individuals",
    body: "We started by training individuals: engineers and career-changers learning AWS, Microsoft Azure and VMware in small batches, with live labs and trainers who stayed after class until every doubt was cleared.",
  },
  {
    year: "Then",
    title: "Corporate training",
    body: "Companies began sending whole teams, so we pushed into corporate training: customised programmes built around each organisation's stack, goals and timelines.",
  },
  {
    year: "Today",
    title: "Training and labs",
    body: "We deliver both: corporate training programmes, and hands-on cloud and AI labs where teams practise on live environments that look like their own production.",
  },
  {
    year: "Next",
    title: "ReyvanX",
    body: "Now we're building ReyvanX, our zero trust network access product, which verifies every connection by identity, device and policy while keeping applications invisible to the network.",
    to: "/whats-new",
  },
];

export default function OurStory() {
  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="relative scroll-mt-24 overflow-hidden border-b border-[#101418]/8 bg-[#FAFAF7] py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[#0B5CFF]/5 blur-3xl" />

      <Container>
        <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <RevealGroup delay={CUE.lead} className="max-w-[560px]">
            <RevealItem as="p">
              <Eyebrow>Our story</Eyebrow>
            </RevealItem>

            <RevealItem
              as="h2"
              id="story-title"
              className="mt-5 font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-[#101418] sm:text-[2.3rem] lg:text-[2.6rem]"
            >
              From one learner to whole enterprises<span className="text-[#0B5CFF]">.</span>
            </RevealItem>

            <RevealItem as="p" className="mt-5 text-[15px] leading-7 text-[#4A5261] lg:text-[16px]">
              We started in 2013 upskilling individuals, one batch at a time. That grew into corporate training,
              then into the hands-on labs teams practise on today, and now into ReyvanX.
            </RevealItem>

            <RevealItem as="p" className="mt-4 text-[15px] leading-7 text-[#4A5261] lg:text-[16px]">
              The idea hasn't changed since the first batch: people learn technology by running it, on real
              consoles, with real scenarios and a trainer close enough to ask.
            </RevealItem>
          </RevealGroup>

          <Reveal delay={CUE.follow}>
            <ol className="space-y-7">
              {CHAPTERS.map((c) => (
                <li key={c.title} className="grid grid-cols-[4.5rem_1fr] gap-x-4 border-t border-[#101418]/8 pt-6">
                  <span className="pt-[3px] text-[11px] font-bold uppercase tabular-nums tracking-[0.16em] text-[#0B5CFF]">
                    {c.year}
                  </span>
                  <div>
                    <h3
                      className={`text-[12px] font-semibold uppercase tracking-[0.14em] ${
                        c.to ? "text-[#0B5CFF]" : "text-[#101418]"
                      }`}
                    >
                      {c.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-7 text-[#4A5261]">{c.body}</p>
                    {c.to && (
                      <Link
                        to={c.to}
                        className="mt-3 inline-flex items-center gap-2 text-[14.5px] font-medium text-[#0B5CFF] underline decoration-[#0B5CFF]/30 underline-offset-4 transition-colors duration-300 hover:decoration-[#0B5CFF]"
                      >
                        Read about ReyvanX
                        <Arrow />
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal
          delay={CUE.trail}
          className="mt-14 overflow-hidden rounded-[22px] shadow-[0_30px_60px_-30px_rgba(16,20,24,0.3)] lg:mt-16"
        >
          <dl className="grid grid-cols-1 divide-y divide-white/10 bg-gradient-to-br from-[#101418] to-[#1a1f29] text-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {STATS.map((s) => (
              <div key={s.label} className="px-6 py-6 sm:px-8 lg:px-10 lg:py-8">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-recoleta text-[2rem] font-medium leading-none lg:text-[2.4rem]">
                    {s.value}
                  </span>
                  <span className="mt-2 block text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8FB2FF]">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
