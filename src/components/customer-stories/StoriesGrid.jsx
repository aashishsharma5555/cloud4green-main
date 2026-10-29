import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";

import Container from "@/components/layout/Container";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CUE, EASE } from "@/components/motion/reveal-tokens";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { INDUSTRIES, PRODUCTS } from "@/data/customerStories";
import { Arrow, Eyebrow, FilterChips, Tag } from "@/components/customer-stories/parts";

/* Every other story, as a filterable card grid. A card opens the full
   story in a dialog rather than its own page — there is one page's worth
   of content per story, and a dialog keeps the reader's place in the
   grid and the filter they picked. */

function StoryCard({ story, onOpen }) {
  const lead = story.metrics[0];

  return (
    <button
      type="button"
      onClick={() => onOpen(story)}
      className="group flex h-full w-full flex-col overflow-hidden rounded-[18px] bg-white text-left ring-1 ring-[#101418]/8 shadow-[0_18px_40px_-28px_rgba(16,20,24,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_50px_-24px_rgba(11,92,255,0.35)] hover:ring-[#0B5CFF]/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5CFF]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[#101418]/5">
        <img
          src={story.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4">
          <Tag>{story.industry}</Tag>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8A93A3]">
          {story.client} · {story.product}
        </p>

        <h3 className="mt-3 font-recoleta text-[1.25rem] font-medium leading-[1.2] tracking-[-0.01em] text-[#101418] transition-colors duration-300 group-hover:text-[#0B5CFF]">
          {story.headline}
        </h3>

        <p className="mb-6 mt-3 text-[14.5px] leading-6 text-[#4A5261]">{story.summary}</p>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-[#101418]/8 pt-5">
          <div>
            <span className="block font-recoleta text-[1.6rem] font-medium leading-none text-[#101418]">
              {lead.value}
            </span>
            <span className="mt-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0B5CFF]">
              {lead.label}
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#101418] transition-colors group-hover:text-[#0B5CFF]">
            Read story
            <Arrow className="group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </button>
  );
}

function StoryDialog({ story, onClose }) {
  return (
    <Dialog open={!!story} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[calc(100svh-2rem)] gap-0 overflow-y-auto bg-[#FAFAF7] p-0 sm:max-w-2xl">
        {story && (
          <>
            <div className="relative aspect-[16/7] overflow-hidden">
              <img src={story.image} alt="" className="h-full w-full object-cover" />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap gap-2">
                <Tag>{story.client}</Tag>
                <Tag>{story.industry}</Tag>
                <Tag>{story.product}</Tag>
              </div>

              <DialogTitle className="mt-4 font-recoleta text-[1.6rem] font-medium uppercase leading-[1.12] tracking-[-0.015em] text-[#101418] sm:text-[1.9rem]">
                {story.headline.replace(/\.$/, "")}
                <span className="text-[#0B5CFF]">.</span>
              </DialogTitle>

              <DialogDescription className="mt-3 text-[15px] leading-7 text-[#4A5261]">
                {story.summary}
              </DialogDescription>

              <dl className="mt-6 grid grid-cols-3 gap-3">
                {story.metrics.map((m) => (
                  <div key={m.label} className="rounded-xl bg-white p-4 ring-1 ring-[#101418]/8">
                    <dt className="sr-only">{m.label}</dt>
                    <dd>
                      <span className="block font-recoleta text-[1.4rem] font-medium leading-none text-[#101418]">
                        {m.value}
                      </span>
                      <span className="mt-1.5 block text-[10.5px] font-semibold uppercase leading-4 tracking-[0.12em] text-[#0B5CFF]">
                        {m.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 space-y-6">
                {[
                  ["The challenge", story.challenge],
                  ["What we did", story.approach],
                  ["The outcome", story.outcome],
                ].map(([label, text]) => (
                  <div key={label}>
                    <h4 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#101418]">
                      {label}
                    </h4>
                    <p className="mt-2 text-[15px] leading-7 text-[#4A5261]">{text}</p>
                  </div>
                ))}
              </div>

              {story.quote && (
                <figure className="mt-7 rounded-2xl bg-[#101418] p-5 text-white">
                  <Quote aria-hidden="true" className="size-4 fill-current text-[#8FB2FF]" />
                  <blockquote className="mt-2.5 text-[15px] leading-6 text-white/90">
                    “{story.quote.text}”
                  </blockquote>
                  <figcaption className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
                    {story.quote.who}
                  </figcaption>
                </figure>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <Button arrow render={<Link to="/contact" onClick={onClose} />}>
                  Start a similar project
                </Button>
                <Button variant="paper" arrow render={<Link to={PRODUCTS[story.product]} onClick={onClose} />}>
                  Explore {story.product}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function StoriesGrid({ stories }) {
  const [industry, setIndustry] = useState("All");
  const [open, setOpen] = useState(null);

  /* Only the industries that have a story left in this grid get a chip. */
  const industries = INDUSTRIES.filter(
    (i) => i === "All" || stories.some((s) => s.industry === i)
  );
  const shown = industry === "All" ? stories : stories.filter((s) => s.industry === industry);

  return (
    <section
      id="stories"
      aria-labelledby="stories-title"
      className="relative scroll-mt-24 border-b border-[#101418]/8 bg-[#FAFAF7] py-20 lg:py-28"
    >
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <RevealGroup delay={CUE.lead} className="max-w-[640px]">
            <RevealItem as="p">
              <Eyebrow>More stories</Eyebrow>
            </RevealItem>

            <RevealItem
              as="h2"
              id="stories-title"
              className="mt-5 font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-[#101418] sm:text-[2.3rem] lg:text-[2.6rem]"
            >
              Results across every industry<span className="text-[#0B5CFF]">.</span>
            </RevealItem>

            <RevealItem as="p" className="mt-5 max-w-[540px] text-[15px] leading-7 text-[#4A5261] lg:text-[16px]">
              Filter by industry, then open any story for the challenge, what we did and the numbers that came out
              of it.
            </RevealItem>
          </RevealGroup>

          {/* Scrolls sideways on a phone rather than wrapping into a ragged
              block. */}
          <FilterChips
            label="Filter by industry"
            options={industries}
            value={industry}
            onChange={setIndustry}
            delay={CUE.follow}
          />
        </div>

        <RevealGroup delay={CUE.trail} className="mt-12 lg:mt-14">
          <RevealItem>
            <motion.ul layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {shown.map((story) => (
                  <motion.li
                    key={story.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="grid"
                  >
                    <StoryCard story={story} onOpen={setOpen} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </RevealItem>
        </RevealGroup>

        <p className="mt-10 text-[14.5px] leading-6 text-[#4A5261]">
          Want to be our next story?{" "}
          <Link
            to="/contact"
            className="font-medium text-[#0B5CFF] underline decoration-[#0B5CFF]/30 underline-offset-4 transition-colors duration-300 hover:decoration-[#0B5CFF]"
          >
            Tell us what you're working on →
          </Link>
        </p>
      </Container>

      <StoryDialog story={open} onClose={() => setOpen(null)} />
    </section>
  );
}
