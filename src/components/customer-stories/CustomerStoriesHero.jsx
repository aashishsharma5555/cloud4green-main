import { Link } from "react-router-dom";

import Container from "@/components/layout/Container";
import PageGrid from "@/components/backgrounds/PageGrid";
import { Button } from "@/components/ui/button";
import backgroundimg from "@/assets/images/lab4.png";
import handshake from "@/assets/images/handshake.jpg";
import {
  Reveal,
  RevealGroup,
  RevealGround,
  RevealItem,
} from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";
import { Asterisk } from "@/components/customer-stories/parts";

/* ------------------------------------------------------------------
   Cloud4Green — the /customers masthead.

   The twin of the Consulting and E-Learning mastheads: the fold minus
   the page chrome, the full-bleed ground image under a white scrim, the
   corner grid, and the narrow-copy / wide-visual grid. The visual is the
   same white stage card, with the photo running off its right edge and
   a single outcome chip pinned over it — the page is about results, so
   the masthead shows one.
------------------------------------------------------------------ */

export default function CustomerStoriesHero({ industryCount }) {
  return (
    <section
      id="overview"
      className="relative isolate flex min-h-[calc(100svh_-_var(--c4g-chrome-h))] scroll-mt-24 items-center overflow-hidden border-b border-[#101418]/8 py-16 lg:py-20"
    >
      <RevealGround
        mount
        as="img"
        src={backgroundimg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-white/85 via-white/55 to-white/50"
      />

      <PageGrid z={-9} />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* ------------------------------------------- LEFT: the copy */}
          <RevealGroup mount delay={CUE.lead} className="max-w-[560px]">
            <RevealItem as="p" className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0B5CFF]">
              <Asterisk />
              Customer stories
            </RevealItem>

            {/* Recoleta ships as a single Medium file, so font-medium. */}
            <RevealItem as="h1" className="mt-5 font-recoleta text-[2rem] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-[#101418] sm:text-[2.5rem] lg:text-[3.1rem]">
              Real teams. Real consoles. Real results<span className="text-[#0B5CFF]">.</span>
            </RevealItem>

            <RevealItem as="p" className="mt-5 max-w-[500px] text-[15px] leading-7 text-[#4A5261] lg:text-[16px]">
              How organisations across finance, healthcare, retail and the public sector use Cloud4Green to build
              skills, ship faster and take the manual work out of the business.
            </RevealItem>

            <RevealItem className="mt-8 flex flex-wrap gap-3.5">
              <Button arrow render={<a href="#reviews" />}>
                Read reviews
              </Button>

              <Button variant="paper" arrow render={<Link to="/contact" />}>
                Talk to our team
              </Button>
            </RevealItem>
          </RevealGroup>

          {/* ------------------------------------ RIGHT: the visual */}
          <Reveal mount delay={CUE.follow} className="relative mx-auto w-full max-w-[620px] lg:mx-0 lg:ml-auto">
            <div className="flex aspect-[20/19] flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-[#101418]/8 shadow-[0_30px_60px_-30px_rgba(16,20,24,0.35)]">
              <div aria-hidden="true" className="flex flex-1 items-center justify-between px-[6%] text-[#101418]">
                <svg viewBox="0 0 120 40" fill="none" className="w-[22%]">
                  <path
                    d="M2 32c14 0 14-22 26-22s8 22 20 22 8-28 22-28 8 28 22 28 10-14 26-14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-2xl font-light leading-none">+</span>
              </div>

              <div className="relative ml-[6%] aspect-[16/10] shrink-0 overflow-hidden rounded-l-2xl bg-[#101418]/5">
                <img src={handshake} alt="" className="h-full w-full object-cover" />

                {/* The outcome chip: one number, set like the closing CTA's
                    stats, so the masthead already reads as "results". */}
                <div className="absolute bottom-4 left-4 rounded-2xl bg-[#101418]/85 px-4 py-3 text-white shadow-lg backdrop-blur-sm sm:bottom-5 sm:left-5 sm:px-5 sm:py-4">
                  <p className="font-recoleta text-[1.6rem] font-medium leading-none sm:text-[2rem]">
                    {industryCount}<span className="text-[#8FB2FF]">+</span>
                  </p>
                  <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
                    Industries served
                  </p>
                </div>
              </div>

              <div aria-hidden="true" className="flex flex-1 items-center justify-between px-[6%] text-[#101418]">
                <span className="text-2xl font-light leading-none">+</span>
                <svg viewBox="0 0 120 40" fill="none" className="w-[22%]">
                  <path
                    d="M2 34c16 0 12-24 26-24s10 24 22 24 8-20 20-20 10 20 22 20h26"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
