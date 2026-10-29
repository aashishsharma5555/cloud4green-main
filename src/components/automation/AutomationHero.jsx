import { Link } from "react-router-dom";

import Container from "@/components/layout/Container";
import PageGrid from "@/components/backgrounds/PageGrid";
import { Button } from "@/components/ui/button";
import automationFlow from '@/assets/images/automation-flow.svg'
import backgroundimg from "@/assets/images/lab6.png";
import {
  Reveal,
  RevealGroup,
  RevealGround,
  RevealItem,
} from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";

/* Automation service hero — the "hybrid" of the two references:
   Retool's split (copy left, workflow canvas right) set in the Enterprise
   Labs paper, type and buttons. Backgrounds (SilkGradient, GridCorner) come
   in the next pass; the section already has `relative isolate` and the
   z-index slots they expect, so they drop in without touching the layout. */

export default function AutomationHero() {
  return (
    <section
      id="automation-hero"
      className="relative isolate overflow-hidden border-b border-[#101418]/8 bg-[#FAFAF7]"
    >
      {/* Full-bleed ground image, the same masthead treatment as the
          E-Learning and Consulting heroes. */}
      <RevealGround
        mount
        as="img"
        src={backgroundimg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      {/* White scrim, heaviest over the copy column, so the body copy keeps
          its contrast and the workflow cards stay crisp. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-white/85 via-white/55 to-white/50"
      />

      {/* The corner grid and its sparkles. PageGrid picks which two corners
          from the page's URL, so each sub-page carries the same detail in a
          different diagonal. At -9 it lands on the scrim, not under the photo. */}
      <PageGrid z={-9} />

      <Container>
        {/* Same fold rule as HowItWorks: the hero fills the viewport under
            the navbar, and the two columns centre vertically inside it.
            Below lg it stacks — copy first, illustration second — because
            on a phone the promise should be read before the picture. */}
        <div className="grid min-h-[calc(100svh_-_var(--c4g-chrome-h))] items-center gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10 lg:py-12">
          {/* ---------------------------------------------- the words */}
          {/* Left-aligned from lg (it's a column now, not a centred block),
              centred on small screens where it spans the full width. */}
          <RevealGroup mount delay={CUE.lead} className="mx-auto max-w-[560px] text-center lg:mx-0 lg:text-left">
            <RevealItem as="p" className="text-[12.5px] font-medium uppercase tracking-[0.14em] text-[#4A5261]">
              Automation services
            </RevealItem>

            {/* h1: this is the page's hero, not a section inside one. The
                split column is narrower than the centred one, so the size
                steps up and the line breaks are allowed — three short
                stacked lines is the Retool rhythm. */}
            <RevealItem as="h1" className="mt-3 font-recoleta text-[2.1rem] font-medium uppercase leading-[1.04] tracking-[-0.02em] text-[#101418] sm:text-[2.6rem] lg:text-[3.1rem]">
              Make Work Flow Smarter

              <span className="text-[#0B5CFF]">.</span>
            </RevealItem>

            <RevealItem as="p" className="mx-auto mt-4 max-w-[480px] text-[15px] leading-6 text-[#4A5261] lg:mx-0 lg:text-[16px] lg:leading-7">
             Automate repetitive processes, connect enterprise systems and deploy intelligent AI agents that help your business operate more efficiently.
            </RevealItem>

            <RevealItem className="mt-6 flex flex-wrap justify-center gap-3.5 lg:justify-start">
              <Button arrow render={<a href="#solutions" />}>
                Explore Automation
              </Button>

              <Button variant="paper" arrow render={<Link to="/contact" />}>
               Talk to an Expert
              </Button>
            </RevealItem>
          </RevealGroup>

          
          
          {/* ---------------------------------------------- the canvas */}
                {/* From lg the canvas bleeds past the container's right edge
                    (the section's overflow-hidden clips any excess) so the
                    diagram reads larger without squeezing the copy column. */}
                <Reveal mount delay={CUE.follow} className="relative mx-auto aspect-[6/5] w-full max-w-[760px] lg:-mr-6 lg:w-[calc(100%+1.5rem)] lg:max-w-none min-[1440px]:-mr-16 min-[1440px]:w-[calc(100%+4rem)]">
                {/* soft white bloom behind the cards, same idea as HowItWorks */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-white/70 blur-3xl"
                />
                <img
                    src={automationFlow}
                    alt="Expense approval automation: an employee submits a claim, the system captures the data, checks it against policy and approves it automatically"
                    className="absolute inset-0 h-full w-full object-contain"
                    decoding="async"
                />
                </Reveal>
        </div>
      </Container>
    </section>
  );
}