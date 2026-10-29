import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

import Container from "@/components/layout/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CUE, EASE } from "@/components/motion/reveal-tokens";
import { Button } from "@/components/ui/button";
import { GOOGLE_PLACE, REVIEW_TRACKS, googleReviews } from "@/data/googleReviews";
import { Eyebrow, FilterChips } from "@/components/customer-stories/parts";

/* Google reviews, set in the home page's testimonial card — the blue frame
   around a dashed paper insert — so the two read as one family. Unlike the
   home marquee these sit still in a filterable grid, the same way the
   stories grid used to: a reader who came to /customers wants to read
   them, not chase them across the screen. */

/** Cards shown before "Show more"; three full rows at xl. */
const PAGE = 9;

function Stars({ rating, className = "size-4" }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={`${className} ${
            i < Math.round(rating) ? "fill-[#FBBC04] text-[#FBBC04]" : "fill-[#101418]/10 text-transparent"
          }`}
        />
      ))}
    </span>
  );
}

function GoogleMark({ className = "size-4" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`shrink-0 ${className}`}>
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC04" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9Z" />
    </svg>
  );
}

function ReviewCard({ name, course, text }) {
  return (
    <figure className="group flex h-full w-full rounded-2xl border border-border/60 bg-[#0351ef] p-2 text-left transition-shadow duration-300 hover:shadow-lg">
      <div className="flex w-full flex-col rounded-lg border border-dashed border-border/70 bg-background p-5 transition-colors duration-300 group-hover:border-border">
        <figcaption className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-full bg-[#0B5CFF]/10 text-[13px] font-semibold uppercase text-[#0B5CFF]"
            >
              {name.trim().charAt(0)}
            </span>
            <div className="min-w-0">
              {/* Google names arrive in whatever case the reviewer typed. */}
              <p className="truncate text-sm font-medium capitalize tracking-tight text-[#101418]">{name}</p>
              <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{course}</p>
            </div>
          </div>
          <Quote
            className="size-4 shrink-0 fill-current text-muted-foreground/30 transition-colors duration-300 group-hover:text-muted-foreground/60"
            aria-hidden="true"
          />
        </figcaption>

        <blockquote className="mt-5 text-[15px] leading-6 text-muted-foreground">“{text}”</blockquote>

        <p className="mt-auto flex items-center gap-1.5 pt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A93A3]">
          <GoogleMark className="size-3" />
          Google review
        </p>
      </div>
    </figure>
  );
}

/** The overall score, pinned beside the heading. */
function RatingSummary() {
  return (
    <div className="flex items-center gap-5 self-start rounded-2xl bg-white px-5 py-4 ring-1 ring-[#101418]/8 shadow-[0_18px_40px_-28px_rgba(16,20,24,0.35)] lg:self-end">
      <span className="font-recoleta text-[2.4rem] font-medium leading-none text-[#101418]">
        {GOOGLE_PLACE.rating.toFixed(1)}
      </span>
      <span className="flex flex-col gap-1.5">
        <Stars rating={GOOGLE_PLACE.rating} />
        <span className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#4A5261]">
          <GoogleMark className="size-3.5" />
          {GOOGLE_PLACE.reviewCount} Google reviews
        </span>
      </span>
    </div>
  );
}

export default function GoogleReviews() {
  const [track, setTrack] = useState("All");
  const [limit, setLimit] = useState(PAGE);

  const { match } = REVIEW_TRACKS.find((t) => t.label === track);
  const filtered = googleReviews.filter((r) => match(r.course));
  const shown = filtered.slice(0, limit);

  /* A new filter starts from the first page again. */
  const pickTrack = (label) => {
    setTrack(label);
    setLimit(PAGE);
  };

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="relative scroll-mt-24 overflow-hidden border-b border-[#101418]/8 bg-[#FAFAF7] py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[#0B5CFF]/5 blur-3xl" />

      <Container>
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <RevealGroup delay={CUE.lead} className="max-w-[640px]">
            <RevealItem as="p">
              <Eyebrow>Testimonials</Eyebrow>
            </RevealItem>

            <RevealItem
              as="h2"
              id="reviews-title"
              className="mt-5 font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-[#101418] sm:text-[2.3rem] lg:text-[2.6rem]"
            >
              In our learners' own words<span className="text-[#0B5CFF]">.</span>
            </RevealItem>

            <RevealItem as="p" className="mt-5 max-w-[540px] text-[15px] leading-7 text-[#4A5261] lg:text-[16px]">
              What people who trained with us on AWS, Azure and VMware said about it on Google.
            </RevealItem>
          </RevealGroup>

          <Reveal delay={CUE.follow}>
            <RatingSummary />
          </Reveal>
        </div>

        <div className="mt-12 lg:mt-14">
          <FilterChips
            label="Filter by training"
            options={REVIEW_TRACKS.map((t) => t.label)}
            value={track}
            onChange={pickTrack}
            delay={CUE.follow}
          />
        </div>

        <RevealGroup delay={CUE.trail} className="mt-8">
          <RevealItem>
            <motion.ul layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {shown.map((review) => (
                  <motion.li
                    key={review.name}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="grid"
                  >
                    <ReviewCard {...review} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </RevealItem>
        </RevealGroup>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[14.5px] leading-6 text-[#4A5261]">
            Showing {shown.length} of {filtered.length} reviews
          </p>

          {filtered.length > PAGE && (
            <Button
              variant="paper"
              onClick={() => setLimit(limit < filtered.length ? filtered.length : PAGE)}
            >
              {limit < filtered.length ? "Show all reviews" : "Show fewer"}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
