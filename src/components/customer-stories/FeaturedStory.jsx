import { Link } from "react-router-dom";
import { Quote } from "lucide-react";

import Container from "@/components/layout/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";
import { PRODUCTS } from "@/data/customerStories";
import { Arrow, Eyebrow, Tag } from "@/components/customer-stories/parts";

/* The lead story, given the full width: photo on the left, the
   challenge → approach → outcome run on the right, and the numbers as
   an ink band underneath — the same ink-band language as the consulting
   page's transformation strip, so it reads as part of one site. */

const STEPS = [
  { key: "challenge", label: "The challenge" },
  { key: "approach", label: "What we did" },
  { key: "outcome", label: "The outcome" },
];

export default function FeaturedStory({ story }) {
  if (!story) return null;

  return (
    <section
      id="featured"
      aria-labelledby="featured-title"
      className="relative scroll-mt-24 overflow-hidden border-b border-[#101418]/8 bg-[#FAFAF7] py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[#0B5CFF]/5 blur-3xl" />

      <Container>
        <RevealGroup delay={CUE.lead} className="relative max-w-[760px]">
          <RevealItem as="p">
            <Eyebrow>Featured story</Eyebrow>
          </RevealItem>

          <RevealItem
            as="h2"
            id="featured-title"
            className="mt-5 font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-[#101418] sm:text-[2.3rem] lg:text-[2.6rem]"
          >
            {story.headline.replace(/\.$/, "")}
            <span className="text-[#0B5CFF]">.</span>
          </RevealItem>

          <RevealItem className="mt-5 flex flex-wrap items-center gap-2">
            <Tag>{story.client}</Tag>
            <Tag>{story.industry}</Tag>
            <Tag>{story.product}</Tag>
          </RevealItem>
        </RevealGroup>

        <Reveal
          delay={CUE.follow}
          className="relative mt-12 overflow-hidden rounded-[22px] bg-white ring-1 ring-[#101418]/8 shadow-[0_30px_60px_-30px_rgba(16,20,24,0.3)] lg:mt-14"
        >
          <div className="grid lg:grid-cols-[1fr_1.1fr]">
            <div className="relative min-h-[260px] lg:min-h-full">
              <img
                src={story.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              {story.quote && (
                <figure className="absolute inset-x-4 bottom-4 rounded-2xl bg-[#101418]/85 p-5 text-white backdrop-blur-sm sm:inset-x-6 sm:bottom-6">
                  <Quote aria-hidden="true" className="size-4 fill-current text-[#8FB2FF]" />
                  <blockquote className="mt-2.5 text-[15px] leading-6 text-white/90">
                    “{story.quote.text}”
                  </blockquote>
                  <figcaption className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
                    {story.quote.who}
                  </figcaption>
                </figure>
              )}
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <ol className="space-y-7">
                {STEPS.map((step, i) => (
                  <li key={step.key} className="grid grid-cols-[auto_1fr] gap-x-4">
                    <span className="pt-[3px] text-[11px] font-bold tabular-nums tracking-[0.16em] text-[#0B5CFF]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#101418]">
                        {step.label}
                      </h3>
                      <p className="mt-2 text-[15px] leading-7 text-[#4A5261]">{story[step.key]}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <Link
                to={PRODUCTS[story.product]}
                className="mt-8 inline-flex items-center gap-2 text-[14.5px] font-medium text-[#0B5CFF] underline decoration-[#0B5CFF]/30 underline-offset-4 transition-colors duration-300 hover:decoration-[#0B5CFF]"
              >
                Explore {story.product}
                <Arrow />
              </Link>
            </div>
          </div>

          {/* The numbers, as one ink band across the foot of the card. */}
          <dl className="grid grid-cols-1 divide-y divide-white/10 bg-gradient-to-br from-[#101418] to-[#1a1f29] text-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {story.metrics.map((m) => (
              <div key={m.label} className="px-6 py-6 sm:px-8 lg:px-10 lg:py-8">
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span className="block font-recoleta text-[2rem] font-medium leading-none lg:text-[2.4rem]">
                    {m.value}
                  </span>
                  <span className="mt-2 block text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8FB2FF]">
                    {m.label}
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
