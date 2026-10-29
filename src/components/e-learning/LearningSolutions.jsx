"use client";

import { Link } from "react-router-dom";

import Container from "@/components/layout/Container";
import PageGrid from "@/components/backgrounds/PageGrid";
import { Button } from "@/components/ui/button";
import { CATALOGUE } from "@/config/downloads";
import {
  Reveal,
  RevealGroup,
  RevealGround,
  RevealItem,
} from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";
import img1 from "@/assets/images/elearningBanner.webp";
import backgroundimg from "@/assets/images/lab4.png"

/* ------------------------------------------------------------------
   Cloud4Green — the /products/e-learning masthead.

   Composed as the twin of the Enterprise Labs masthead (see
   pages/products/EnterpriseLabs.jsx): the fold minus the page chrome,
   the site Container's gutters, and a two-column grid whose narrow
   left column carries the copy while the wide right column is given
   over entirely to the visual. The ground is the same too: a full-bleed
   image under a white scrim, with the copy set in the site's ink over it.

   Typography is the house set: eyebrow in tracked-out brand blue behind
   the asterisk, display line in Recoleta, uppercase, tightened, closed
   with the blue full stop, body copy in #4A5261 — the same tokens every
   cream section on the site uses. Recoleta ships as a single Medium file
   (see the @font-face in index.css), so the headline is font-medium —
   asking for bolder gets a synthesised bold.

   The image slot is deliberately unconstrained: no aspect ratio, no
   fixed height, no inner padding. It spans its column at the image's
   own proportions and is never cropped, so whatever gets dropped in
   reads as artwork the section is built around rather than a thumbnail
   in a frame.
------------------------------------------------------------------ */

const STATS = [
  { value: "8", label: "Domains" },
  { value: "50+", label: "Providers" },
  { value: "200+", label: "Technologies" },
];

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

export default function LearningSolutions({ imageSrc, imageAlt = "" }) {
  return (
    <section
      id="overview"
      /* The viewport minus everything above it — the announcement bar, the
         navbar's scroll sentinel and the navbar row. --c4g-chrome-h is
         defined in index.css next to the heights it adds up, so the fold is
         stated once rather than re-counted per page. */
      className="relative isolate flex min-h-[calc(100svh_-_var(--c4g-chrome-h))] scroll-mt-24 items-center overflow-hidden border-b border-[#101418]/8 py-16 lg:py-20"
    >
      {/* Full-bleed image, the same masthead treatment as the Enterprise
          Labs "How it works" band. */}
      <RevealGround
        mount
        as="img"
        src={backgroundimg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      {/* The image is a white-to-sky gradient, so the section reads light.
          One white scrim, heaviest over the copy column, holds the blue
          mass back far enough that the eyebrow keeps its brand blue —
          #0B5CFF needs a ground no darker than the ~#B9D9FC this leaves. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-white/85 via-white/55 to-white/50"
      />

      {/* The corner grid, in this page's diagonal (PageGrid picks it from
          the URL). At -9 it lands on the scrim rather than under the photo,
          and still paints below the copy, which is in flow. */}
      <PageGrid z={-9} />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* ------------------------------------------- LEFT: the copy */}
          <RevealGroup mount delay={CUE.lead} className="max-w-[560px]">
            {/* On the light ground the eyebrow and the full stop are the
                brand blue, as they are in every cream section. */}
            <RevealItem as="p" className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0B5CFF]">
              <Asterisk />
              Learning solutions
            </RevealItem>

            {/* <h1 className="mt-5 font-recoleta text-[2rem] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-[#101418] sm:text-[2.5rem] lg:text-[3.1rem]">
              Build a cloud-ready workforce on
              hands-on&nbsp;labs<span className="text-[#0B5CFF]">.</span>
            </h1> */}
            <RevealItem as="h1" className="mt-5 font-recoleta text-[2rem] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-[#101418] sm:text-[2.5rem] lg:text-[3.1rem]">
  Learn the technologies that shape the future<span className="text-[#0B5CFF]">.</span>
</RevealItem>

            <RevealItem as="p" className="mt-5 max-w-[500px] text-[15px] leading-7 text-[#4A5261] lg:text-[16px]">
               Explore hands-on learning across cloud, AI, data, cybersecurity, DevOps and
  emerging technologies. Gain practical experience with the tools and
  platforms used to build, deploy and secure modern technology.
            </RevealItem>

            <RevealItem className="mt-8 flex flex-wrap gap-3.5">
              <Button arrow render={<Link to="/contact" />}>
                Book a demo
              </Button>

              <Button variant="paper" arrow render={<a href={CATALOGUE.href} download={CATALOGUE.filename} />}>
                Download catalogue
              </Button>
            </RevealItem>


          </RevealGroup>

          {/* ------------------------------------ RIGHT: the image slot */}
          {/* No fixed height and no aspect ratio: the frame takes the
              image's own proportions and spans the full width of the
              column, so the artwork is shown whole rather than cropped
              to a box. */}
          <Reveal mount delay={CUE.follow} className="relative overflow-hidden rounded-[14px] border border-[#101418]/8 bg-white/85 shadow-[0_24px_60px_-32px_rgba(16,32,74,0.35)] backdrop-blur-xl">
            <img
              src={img1}
              alt={imageAlt}
              className="block h-auto w-full"
            />

            {/* Caption chip, inside the frame so it can't collide with the
                section's bottom edge the way an overhanging card does. */}

          </Reveal>
        </div>
      </Container>
    </section>
  );
}
