import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Container from "@/components/layout/Container";
import PageGrid from "@/components/backgrounds/PageGrid";
import { Button } from "@/components/ui/button";
import {
  Reveal,
  RevealGroup,
  RevealGround,
  RevealItem,
  RevealLines,
} from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";

// Swap these for your own photos (real team / client training shots work best).
import slideImg1 from "@/assets/images/clients.jpg";
import slideImg2 from "@/assets/images/corpTraining2.webp";
import slideImg3 from "@/assets/images/corpTraining3.webp";
import heroBg from "@/assets/images/CT1.png";

/*
  Each slide pairs a photo with one stat. The photo and the stat change
  together, so the card always talks about what's in the picture.

  ⚠ PLACEHOLDER FIGURES — replace with real Cloud4Green numbers before
  this ships. A made-up stat on a sales page is worse than no stat.
*/
const SLIDES = [
  { image: slideImg1, value: "40+", label: "hands-on cloud & AI learning paths" },
  { image: slideImg2, value: "3 clouds", label: "AWS, Azure and GCP labs in every programme" },
  { image: slideImg3, value: "24/7", label: "lab access, so teams train on their own schedule" },
];

const INTERVAL = 4500; // ms per slide

/*
  Autoplay that behaves:
    • pauses while the pointer is over the card or a dot has keyboard focus
      (people can't read a stat that vanishes under them),
    • never runs for prefers-reduced-motion users — they use the dots,
    • the timer restarts whenever the slide changes, so clicking a dot
      gives that slide its full 4.5s instead of whatever was left over.
*/
function useAutoplay(count, paused) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduced) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => clearTimeout(id);
  }, [index, paused, count]);

  return [index, setIndex];
}

export default function CorporateTrainingHero() {
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useAutoplay(SLIDES.length, paused);

  return (
    /* Exactly one screen: the viewport minus the announcement bar, the
       navbar's scroll sentinel and the navbar row (--c4g-chrome-h, see
       index.css). It's a fixed height, not a min-height, so the hero never
       pushes past the fold — the photo absorbs whatever space the copy
       leaves. The 520px floor only matters on landscape phones, where
       clipping the copy would be worse than a short scroll. */
    <section
      id="corporate-training"
      className="relative isolate flex h-[calc(100svh_-_var(--c4g-chrome-h))] min-h-[520px] flex-col overflow-hidden border-b border-[#101418]/8 bg-[#FAFAF7] text-[#101418]"
    >
      {/* Background photo, washed with the site's warm off-white so the dark
          headline stays readable. The wash is strongest on the left, behind
          the copy, and lighter on the right where the carousel sits. */}
      <RevealGround
        mount
        as="img"
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(250,250,247,0.95)_0%,rgba(250,250,247,0.88)_45%,rgba(250,250,247,0.7)_100%)]"
      />
      {/* One soft brand-blue haze behind the photo — the only colour in the
          background, so blue stays an accent rather than the surface. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/2 -z-10 h-[560px] w-[760px] -translate-y-1/2 rounded-full bg-[#0B5CFF]/[0.07] blur-[110px]"
      />

      {/* The corner grid, in this page's diagonal (PageGrid picks it from
          the URL). At -9 it lands on the wash rather than under the photo,
          and still paints below the copy, which is in flow. */}
      <PageGrid z={-9} />

      <Container className="flex min-h-0 flex-1 flex-col">
        {/* Mobile/tablet: a column where the copy takes its natural height
            and the photo flexes into the rest. Desktop: two columns. */}
        <div className="flex min-h-0 flex-1 flex-col gap-6 py-6 sm:gap-8 sm:py-8 lg:grid lg:grid-cols-[1fr_minmax(0,620px)] lg:items-center lg:gap-16 lg:py-8">
          {/* ------------------------------------------------ the words */}
          <RevealGroup mount delay={CUE.lead} className="max-w-[560px] shrink-0">
            <RevealItem as="p" className="text-[12.5px] font-semibold uppercase tracking-[0.18em] text-[#0B5CFF]">
              For Enterprises
            </RevealItem>

            {/* Sized off the viewport height as well as the breakpoint, so a
                short laptop screen gets a smaller headline rather than an
                overflowing one. Broken by hand, so the two lines rise out of
                their own masks like the homepage headline. */}
            <RevealLines
              nested
              as="h1"
              lines={["People power enterprises.", "We power people"]}
              className="mt-3 font-recoleta text-[clamp(1.75rem,4.6svh,2.4rem)] font-medium leading-[1.05] tracking-[-0.02em] sm:text-[clamp(2rem,5svh,3rem)] lg:text-[clamp(2.4rem,6.5svh,3.6rem)] uppercase"
            />

            <RevealItem as="p" className="mt-4 text-[15px] leading-6 text-[#4A5261] sm:text-[16px] sm:leading-7 lg:mt-6 lg:text-[18px] lg:leading-8">
              {/* Upskill whole teams on the cloud and AI stack they actually run.
              Instructor-led cohorts, hands-on labs in live cloud accounts, and
              progress reports your L&amp;D team can act on — in one programme. */}
              Bring world-class learning and hands-on practice to your workforce.
            </RevealItem>

            <RevealItem className="mt-6 lg:mt-9">
              <Button variant="ink" arrow render={<Link to="/contact" />}>
                Explore training plans
              </Button>
            </RevealItem>
          </RevealGroup>

          {/* ------------------------------------------------ the visual */}
          {/* Mobile/tablet: flex-1 fills whatever height the copy leaves.
              Desktop: keeps its 20:19 shape, with the width capped so the
              height fits inside the hero (hero height minus lg:py-8). */}
          <Reveal mount delay={CUE.follow} className="relative mx-auto min-h-[160px] w-full max-w-[620px] flex-1 lg:mx-0 lg:ml-auto lg:min-h-0 lg:max-w-[min(620px,(100svh_-_var(--c4g-chrome-h)_-_4rem)*20/19)] lg:flex-none">

            {/* The white stage: a soft card the whole visual sits on, with a
                brand-blue panel inside it. The photo frame overlaps the panel
                and pokes out above it, and the photos slide through that
                frame like pages in a book. */}
            <div
              className="relative h-full overflow-hidden rounded-3xl bg-white ring-1 ring-[#101418]/8 shadow-[0_30px_60px_-30px_rgba(16,20,24,0.35)] lg:aspect-[20/19] lg:h-auto"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              role="region"
              aria-roledescription="carousel"
              aria-label="Corporate training highlights"
            >
              {/* Brand panel — runs off the right edge, like the reference. */}
              <div
                aria-hidden="true"
                className="absolute bottom-[14%] left-[14%] right-0 top-[16%] rounded-l-2xl bg-[#0B5CFF]"
              />

              {/* Hand-drawn doodles: two squiggles and a couple of plus marks. */}
              <svg
                aria-hidden="true"
                viewBox="0 0 120 40"
                fill="none"
                className="absolute right-[4%] top-[8%] w-[22%] text-[#101418]"
              >
                <path
                  d="M2 32c14 0 14-22 26-22s8 22 20 22 8-28 22-28 8 28 22 28 10-14 26-14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                aria-hidden="true"
                viewBox="0 0 120 40"
                fill="none"
                className="absolute bottom-[3%] left-[5%] w-[24%] text-[#101418]"
              >
                <path
                  d="M2 34c16 0 12-24 26-24s10 24 22 24 8-20 20-20 10 20 22 20h26"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span aria-hidden="true" className="absolute right-[18%] top-[4%] text-2xl font-light leading-none text-[#101418]">+</span>
              <span aria-hidden="true" className="absolute bottom-[3%] left-[58%] text-xl font-light leading-none text-[#101418]">+</span>

              {/* The photo frame. The track holds every photo side by side
                  and slides left one frame-width per slide, so the next
                  image is already loaded when its turn comes. */}
              <div className="absolute bottom-[16%] left-[5%] top-[7%] w-[64%] overflow-hidden rounded-2xl bg-[#101418]/5 shadow-[0_20px_40px_-20px_rgba(16,20,24,0.45)]">
                <div
                  className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
                  style={{ transform: `translateX(-${active * 100}%)` }}
                >
                  {SLIDES.map((s, i) => (
                    <img
                      key={i}
                      src={s.image}
                      alt=""
                      aria-hidden={i !== active}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="h-full w-full shrink-0 object-cover"
                    />
                  ))}
                </div>
              </div>

              {/* The stat card floats over the blue panel, the way the
                  "Create New" menu does in the reference. Every stat sits in
                  the SAME grid cell ([grid-area:1/1]), so the card is always
                  as tall as its longest label and doesn't jump between slides. */}
              <div className="absolute right-[4%] top-[34%] w-[40%] max-w-[220px] rounded-xl bg-white px-3.5 py-3 text-[#101418] shadow-[0_16px_32px_-16px_rgba(16,20,24,0.5)] sm:px-4 sm:py-3.5">
                <div className="grid" aria-live={paused ? "off" : "polite"}>
                  {SLIDES.map((s, i) => (
                    <div
                      key={i}
                      aria-hidden={i !== active}
                      className={`[grid-area:1/1] transition-all duration-500 ease-out motion-reduce:transition-none ${
                        i === active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                      }`}
                    >
                      <p className="text-[1.4rem] font-medium leading-none tracking-[-0.02em] text-[#0B5CFF] sm:text-[1.75rem]">
                        {s.value}
                      </p>
                      <p className="mt-1.5 text-[12px] font-medium leading-snug text-[#4A5261] sm:text-[13px]">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots — real buttons, so they work by keyboard too. They sit
                  on the blue panel, under the stat card. */}
              <div className="absolute bottom-[18%] right-[4%] flex w-[40%] max-w-[220px] justify-center gap-2.5">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    onFocus={() => setPaused(true)}
                    onBlur={() => setPaused(false)}
                    aria-label={`Show highlight ${i + 1} of ${SLIDES.length}`}
                    aria-current={i === active}
                    className={`h-2.5 rounded-full bg-white transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                      i === active ? "w-6" : "w-2.5 opacity-60 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}