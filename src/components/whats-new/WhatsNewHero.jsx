import Container from "@/components/layout/Container";
import PageGrid from "@/components/backgrounds/PageGrid";
import { Button } from "@/components/ui/button";
import ZtnaFlow from "@/components/sections/platform-overview/ZtnaFlow";
import backgroundimg from "@/assets/images/lab4.png";
import {
  Reveal,
  RevealGroup,
  RevealGround,
  RevealItem,
} from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";
import { Asterisk } from "@/components/customer-stories/parts";
import { reyvanx } from "@/data/whatsNew";

/* ------------------------------------------------------------------
   Cloud4Green — the /whats-new masthead.

   The same masthead as /customers and /services/consulting: ground image
   under a white scrim, the corner grid, narrow copy and wide visual. The
   visual is the latest launch — the ReyvanX request-flow widget from the
   homepage product row, on the same ink card it sits on there.
------------------------------------------------------------------ */

export default function WhatsNewHero() {
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
              What's new
            </RevealItem>

            {/* Recoleta ships as a single Medium file, so font-medium. */}
            <RevealItem as="h1" className="mt-5 font-recoleta text-[2rem] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-[#101418] sm:text-[2.5rem] lg:text-[3.1rem]">
              The latest from Cloud4Green<span className="text-[#0B5CFF]">.</span>
            </RevealItem>

            <RevealItem as="p" className="mt-5 max-w-[500px] text-[15px] leading-7 text-[#4A5261] lg:text-[16px]">
              New products, new labs and platform updates. Leading this release: {reyvanx.name}, zero trust access
              to your private applications — no VPN required.
            </RevealItem>

            <RevealItem className="mt-8 flex flex-wrap gap-3.5">
              <Button arrow render={<a href="#reyvanx" />}>
                Meet {reyvanx.name}
              </Button>

              <Button variant="paper" arrow render={<a href="#updates" />}>
                All updates
              </Button>
            </RevealItem>
          </RevealGroup>

          {/* ------------------------------------ RIGHT: the launch card */}
          <Reveal mount delay={CUE.follow} className="relative mx-auto w-full max-w-[620px] lg:mx-0 lg:ml-auto">
            {/* Fixed proportions only from sm up: the launch card is live
                content, and on a phone it needs to set its own height. */}
            <div className="flex flex-col overflow-hidden sm:aspect-[20/19] rounded-3xl bg-white ring-1 ring-[#101418]/8 shadow-[0_30px_60px_-30px_rgba(16,20,24,0.35)]">
              <div aria-hidden="true" className="flex flex-1 items-center justify-between px-[6%] py-5 text-[#101418] sm:py-0">
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

              <div className="ml-[6%] shrink-0 rounded-l-2xl bg-gradient-to-br from-[#101418] to-[#1a1f29] p-5 sm:p-7">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#8BE28B]/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8BE28B]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8BE28B]" />
                    Just launched
                  </span>
                  <span className="text-[11px] font-medium text-white/45">Zero Trust Network Access</span>
                </div>

                <ZtnaFlow product={reyvanx} />

                <p className="mt-4 text-[14px] leading-6 text-white/70">{reyvanx.shortText}</p>
              </div>

              <div aria-hidden="true" className="flex flex-1 items-center justify-between px-[6%] py-5 text-[#101418] sm:py-0">
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
