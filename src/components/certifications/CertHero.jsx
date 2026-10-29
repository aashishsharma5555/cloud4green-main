"use client";

import { Link } from "react-router-dom";

import Container from "@/components/layout/Container";
import PageGrid from "@/components/backgrounds/PageGrid";
import { Button } from "@/components/ui/button";
import img1 from "@/assets/images/CertBanner2.png";
import backgroundimg from "@/assets/images/certBanner.png";
import CertificationFlow from "../illustrations/CertificationFlow";
import {
  RevealGroup,
  RevealGround,
  RevealItem,
} from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";

/* ------------------------------------------------------------------
   Cloud4Green — the /products/certifications masthead.

   Same stacked layout as the Enterprise Labs "How it works" masthead
   (components/EnterpriseLabs/Howitworks.jsx): the illustration across
   the top, then the centred eyebrow, headline, lede and buttons.
------------------------------------------------------------------ */

/** The brand asterisk, as it appears on every section eyebrow. `stroke` is a
    full Tailwind class rather than a bare colour so the two variants — brand
    blue on cream, the lifted blue on a photograph — are both statically
    present for the compiler to find. */
function Asterisk({ className = "h-3.5 w-3.5", stroke = "stroke-[#0B5CFF]" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      strokeWidth="2.4"
      strokeLinecap="round"
      className={`shrink-0 ${stroke} ${className}`}
    >
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
    </svg>
  );
}

export default function Certifications({ imageSrc = img1, imageAlt = "" }) {
  return (
    <section
      id="overview"
      /* The viewport minus everything above it — the announcement bar, the
         navbar's scroll sentinel and the navbar row. --c4g-chrome-h is
         defined in index.css next to the heights it adds up, so the fold is
         stated once rather than re-counted per page. */
      className="relative isolate flex min-h-[calc(100svh_-_var(--c4g-chrome-h))] scroll-mt-24 items-center overflow-hidden border-b border-[#101418]/8 py-6 lg:py-7 [@media(max-height:760px)]:py-4"
    >
      {/* Full-bleed image, the same masthead treatment as Learning Solutions. */}
      <RevealGround
        mount
        as="img"
        src={backgroundimg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      {/* Copy is centred under the illustration, so the scrim runs top to
          bottom: lightest behind the drawing, heaviest under the type. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-white/45 via-white/60 to-white/80"
      />

      {/* The corner grid, in this page's diagonal (PageGrid picks it from
          the URL). At -9 it lands on the scrim rather than under the photo,
          and still paints below the copy, which is in flow. */}
      <PageGrid z={-9} />

      <Container>
        <div className="flex flex-col items-center">
          {/* ---------------------------------------------- the band */}
          {/* Width is capped so the 960:440 drawing gets whatever height the
              fold has left once the copy below it (~340px: eyebrow, two-line
              headline, lede, buttons and the section padding) is paid for —
              and never more than 60% of the fold on a tall desktop. On a
              laptop that keeps the buttons above the fold; the 280px floor
              stops the drawing vanishing on very short windows. */}
          {/* The drawing is the masthead's ground, so it fades with the photo
              rather than rising — the copy under it is what arrives. */}
          <RevealGround mount className="relative isolate mx-auto w-full max-w-[max(280px,min(1216px,(100svh_-_var(--c4g-chrome-h))*0.6*960/440,(100svh_-_var(--c4g-chrome-h)_-_340px)*960/440))] [@media(max-height:760px)]:max-w-[max(280px,min(1216px,(100svh_-_var(--c4g-chrome-h)_-_290px)*960/440))]">
            {/* No bloom behind the drawing here, unlike the Enterprise Labs
                diagram. It was 125% of the band's height and blurred, so it
                spilled past the drawing and sat behind the headline as a white
                glow. The scrim above already lightens the photo enough for the
                strokes. */}
            <CertificationFlow />
          </RevealGround>

          {/* ---------------------------------------------- the words */}
          {/* Below 760px of viewport height (most laptops once the browser
              chrome is taken off) the spacing and headline step down so the
              drawing keeps a readable size. */}
          <RevealGroup mount delay={CUE.follow} className="mx-auto mt-4 max-w-[860px] text-center lg:mt-5 [@media(max-height:760px)]:mt-3">
            <RevealItem as="p" className="flex items-center justify-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0B5CFF]">
              <Asterisk />
              Certifications
            </RevealItem>

            {/* Recoleta ships as a single Medium file (see the @font-face in
                index.css), so the headline is font-medium — asking for
                bolder gets a synthesised bold. */}
            <RevealItem as="h1" className="mt-2.5 font-recoleta text-[1.85rem] font-medium uppercase leading-[1.06] tracking-[-0.02em] text-[#101418] sm:text-[2.35rem] lg:text-[2.6rem] [@media(max-height:760px)]:mt-2 [@media(max-height:760px)]:lg:text-[2.2rem]">
              Turn Hands-On Skills Into Industry Credentials
              <span className="text-[#0B5CFF]">.</span>
            </RevealItem>

            <RevealItem as="p" className="mx-auto mt-3.5 max-w-[560px] text-[15px] leading-6 text-[#4A5261] lg:text-[16px] lg:leading-7 [@media(max-height:760px)]:mt-2.5">
              Get that career in IT. Earn that promotion. Stand out in your field.
            </RevealItem>

            <RevealItem className="mt-5 flex flex-wrap justify-center gap-3.5 lg:mt-6 [@media(max-height:760px)]:mt-4">
              <Button arrow render={<Link to="/contact" />}>
                Talk to an advisor
              </Button>

              <Button variant="paper" arrow render={<a href="#certification-tracks" />}>
                View certification paths
              </Button>
            </RevealItem>
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}