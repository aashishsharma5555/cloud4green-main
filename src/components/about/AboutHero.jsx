import { Link } from "react-router-dom";

import Container from "@/components/layout/Container";
import PageGrid from "@/components/backgrounds/PageGrid";
import { Button } from "@/components/ui/button";
import backgroundimg from "@/assets/images/lab4.png";
import logo from "@/assets/images/C4GLogo.png";
import { Reveal, RevealGroup, RevealGround, RevealItem } from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";
import { Asterisk } from "@/components/customer-stories/parts";

/* ------------------------------------------------------------------
   Cloud4Green — the /about masthead.

   The twin of the /customers masthead: full-bleed ground under a white
   scrim, the corner grid, narrow copy beside the white stage card. The
   stage holds the company's own logo rather than a stock photo, because
   the page is the company's own story.
------------------------------------------------------------------ */

export default function AboutHero() {
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
          <RevealGroup mount delay={CUE.lead} className="max-w-[560px]">
            <RevealItem as="p" className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0B5CFF]">
              <Asterisk />
              About Cloud4Green
            </RevealItem>

            <RevealItem as="h1" className="mt-5 font-recoleta text-[2rem] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-[#101418] sm:text-[2.5rem] lg:text-[3.1rem]">
              Learn it. Build it. Run it<span className="text-[#0B5CFF]">.</span>
            </RevealItem>

            {/* The description carries the company's whole arc, so it is set a
                size up and in near-ink, with a hairline brand rule and the
                four stops in ink — louder than body copy, quieter than the
                heading. */}
            <RevealItem
              as="p"
              className="mt-6 max-w-[520px] border-l-2 border-[#0B5CFF]/40 pl-5 text-[16px] leading-[1.75] text-[#3A4250] lg:text-[17.5px]"
            >
              <span className="font-medium text-[#101418]">Cloud4Green Technologies</span> has been building tech
              skills since 2013. We began by{" "}
              <span className="font-medium text-[#101418]">upskilling individuals</span>, grew into{" "}
              <span className="font-medium text-[#101418]">corporate training</span>, now run{" "}
              <span className="font-medium text-[#101418]">hands-on labs</span> for enterprise teams, and are
              building <span className="font-medium text-[#0B5CFF]">ReyvanX</span>, our zero trust product.
            </RevealItem>

            <RevealItem className="mt-8 flex flex-wrap gap-3.5">
              <Button arrow render={<a href="#story" />}>
                Our story
              </Button>

              <Button variant="paper" arrow render={<Link to="/contact" />}>
                Talk to our team
              </Button>
            </RevealItem>
          </RevealGroup>

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

              {/* The logo, on a dashed paper insert like the testimonial
                  cards, with a faint glow in the mark's own green and blue. */}
              <div className="relative mx-[6%] flex aspect-[16/10] shrink-0 flex-col items-center justify-center gap-5 overflow-hidden px-4 sm:gap-8 rounded-2xl border border-dashed border-[#101418]/12 bg-[#FAFAF7]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(60%_55%_at_35%_45%,rgba(0,166,81,0.10),transparent_70%),radial-gradient(55%_50%_at_70%_60%,rgba(11,92,255,0.10),transparent_70%)]"
                />
                <img
                  src={logo}
                  alt="Cloud4Green Technologies"
                  className="relative w-[78%] max-w-[440px] select-none"
                  draggable="false"
                />

                <div className="relative flex flex-wrap justify-center gap-2">
                  {["Est. 2013", "Bengaluru, India", "1M+ learners"].map((fact) => (
                    <span
                      key={fact}
                      className="rounded-full border border-[#101418]/10 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4A5261]"
                    >
                      {fact}
                    </span>
                  ))}
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
