import { Link } from "react-router-dom";

import Container from "@/components/layout/Container";
import PageGrid from "@/components/backgrounds/PageGrid";
import { Button } from "@/components/ui/button";
import { CATALOGUE } from "@/config/downloads";
import backgroundimg from "@/assets/images/lab4.png";
import consultImg from "@/assets/images/consultingImg.webp"
import {
  Reveal,
  RevealGroup,
  RevealGround,
  RevealItem,
} from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";

/* ------------------------------------------------------------------
   Cloud4Green — the /services/consulting masthead.

   Built as the twin of the E-Learning masthead: the fold minus the page
   chrome, the same full-bleed ground image under a white scrim, the
   same corner grid, and a two-column grid — narrow copy column on the
   left, wide visual column on the right. Keeping it identical is the
   point: consulting should read as part of the same site as every
   product page, not as a one-off.

   The visual isn't ready yet, so the right column shows a placeholder
   frame. When the image arrives, pass it in and the placeholder goes:

     import consultingImg from "@/assets/images/consultingBanner.webp";
     <ConsultingHero imageSrc={consultingImg} imageAlt="..." />

   With an image, the frame takes the image's own proportions (no fixed
   height, no crop), exactly like E-Learning. The placeholder uses a
   4 : 3 box only so the layout holds its shape until then.
------------------------------------------------------------------ */

/** The brand asterisk, as it appears on every section eyebrow. */
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

/** Stand-in for the hero image until it exists. Dashed, quiet, and
    clearly labelled, so nobody mistakes it for finished design. */
// function ImagePlaceholder() {
//   return (
//     <div className="grid aspect-[4/3] w-full place-items-center rounded-[10px] border border-dashed border-[#101418]/15 bg-[#FAFAF7]/70">
//       <div className="flex flex-col items-center gap-3 text-center">
//         <svg
//           viewBox="0 0 24 24"
//           aria-hidden="true"
//           fill="none"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="h-8 w-8 stroke-[#8A93A3]"
//         >
//           <rect x="3" y="4.5" width="18" height="15" rx="2" />
//           <circle cx="8.5" cy="9.5" r="1.75" />
//           <path d="m21 15.5-5-5-9 9" />
//         </svg>
//         <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8A93A3]">Image coming soon</p>
//       </div>
//     </div>
//   );
// }

export default function ConsultingHero({ imageSrc, imageAlt = "" }) {
  return (
    <section
      id="overview"
      /* The viewport minus everything above it — --c4g-chrome-h is
         defined in index.css, so the fold is stated once. */
      className="relative isolate flex min-h-[calc(100svh_-_var(--c4g-chrome-h))] scroll-mt-24 items-center overflow-hidden border-b border-[#101418]/8 py-16 lg:py-20"
    >
      {/* Full-bleed ground image, same as the E-Learning masthead. */}
      <RevealGround
        mount
        as="img"
        src={backgroundimg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      {/* White scrim, heaviest over the copy column, so the eyebrow keeps
          its brand blue and the body copy its contrast. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-white/85 via-white/55 to-white/50"
      />

      {/* The corner grid (PageGrid picks this page's diagonal from the URL). */}
      <PageGrid z={-9} />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* ------------------------------------------- LEFT: the copy */}
          <RevealGroup mount delay={CUE.lead} className="max-w-[560px]">
            <RevealItem as="p" className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0B5CFF]">
              <Asterisk />
              Consulting
            </RevealItem>

            {/* Recoleta ships as a single Medium file, so font-medium. */}
            <RevealItem as="h1" className="mt-5 font-recoleta text-[2rem] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-[#101418] sm:text-[2.5rem] lg:text-[3.1rem]">
              Building what's next, together<span className="text-[#0B5CFF]">.</span>
            </RevealItem>

            <RevealItem as="p" className="mt-5 max-w-[500px] text-[15px] leading-7 text-[#4A5261] lg:text-[16px]">
              We bring together strategic thinking, industry expertise, and innovative solutions to help businesses
              overcome challenges and turn ambition into measurable outcomes.
            </RevealItem>

            <RevealItem className="mt-8 flex flex-wrap gap-3.5">
              <Button arrow render={<Link to="/contact" />}>
                Book a consultation
              </Button>

              <Button variant="paper" arrow render={<a href={CATALOGUE.href} download={CATALOGUE.filename} />}>
                Download brochure
              </Button>
            </RevealItem>
          </RevealGroup>

          {/* ------------------------------------ RIGHT: the image slot */}
          {/* The same white stage as the Enterprise Training hero: a soft
              card with the photo running the full width across it. The
              image carries its own blue ground, so there's no brand panel. */}
          <Reveal mount delay={CUE.follow} className="relative mx-auto w-full max-w-[620px] lg:mx-0 lg:ml-auto">
            {/* A column of three rows: a white band, the photo, a white band.
                The bands split whatever height the photo leaves, and each
                centres its doodles, so they stay aligned at any width. */}
            <div className="flex aspect-[20/19] flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-[#101418]/8 shadow-[0_30px_60px_-30px_rgba(16,20,24,0.35)]">
              {/* Top band: squiggle left, plus mark right, on the 6% inset. */}
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

              {/* The photo frame: inset from the left on the 6% line, running
                  off the card's right edge. The artwork is 1920×1080 with its
                  collage 170px in from the left but 267px in from the right,
                  so the frame is 1823:1080 and object-left trims the extra
                  97px off the right — the blue margin is then even both sides. */}
              <div className="ml-[6%] aspect-[1823/1080] shrink-0 overflow-hidden rounded-l-2xl bg-[#101418]/5">
                <img src={imageSrc ?? consultImg} alt={imageAlt} className="h-full w-full object-cover object-left" />
              </div>

              {/* Bottom band: plus mark left, squiggle right. */}
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