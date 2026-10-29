"use client";

import { Link } from "react-router-dom";

import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import CertificationFlow from "@/components/illustrations/CertificationFlow";
import backgroundimg from "@/assets/images/certBanner.png";

/* ------------------------------------------------------------------
   Cloud4Green — the /products/certifications masthead.

   The mirror of the Learning Solutions masthead (see
   pages/products/LearningSolutions.jsx): same fold, same Container
   gutters, same full-bleed image under a white scrim, same house
   typography. The one difference is the axis — the illustration column
   sits on the LEFT and the copy column on the right, so the two mastheads
   read as a pair rather than a repeat when a visitor moves between them.

   The two columns are equal halves (lg:grid-cols-2) on a desktop
   screen: the illustration and the copy-plus-buttons block get the same
   width, so the fold reads as two matched panels rather than a wide
   picture with a caption beside it.

   One thing flips with the axis: the scrim runs to the right
   (`to-white/85`) so its heaviest white still lands under the copy —
   #0B5CFF needs a ground no darker than the ~#B9D9FC that leaves.

   Source order stays copy-first so a narrow screen reads the headline
   before the artwork; `order-*` puts the illustration back on the left
   from lg up.

   The left slot holds <CertificationFlow />, the animated
   select → schedule → exam → certified journey. It sizes itself: full
   column width at a fixed 960:440 ratio, so the frame needs no height
   or aspect ratio of its own.
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

export default function Certifications() {
  return (
    <section
      id="overview"
      /* The viewport minus everything above it — the announcement bar, the
         navbar's scroll sentinel and the navbar row. --c4g-chrome-h is
         defined in index.css next to the heights it adds up, so the fold is
         stated once rather than re-counted per page. */
      className="relative isolate flex min-h-[calc(100svh_-_var(--c4g-chrome-h))] scroll-mt-24 items-center overflow-hidden border-b border-[#101418]/8 py-16 lg:py-20"
    >
      {/* Full-bleed image, the same masthead treatment as Learning Solutions. */}
      <img
        src={backgroundimg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      {/* The scrim is the Learning Solutions gradient read backwards: the
          copy column is on the right here, so the heaviest white ends
          there and the blue mass is held back under the text. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-white/50 via-white/55 to-white/85"
      />

      <Container>
        {/* Equal halves from lg up: the illustration and the copy get the same
            column width, so neither side dominates the fold on a desktop screen. */}
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* ----------------------------- LEFT (lg): the illustration */}
          {/* Second in source order so a narrow screen gets the headline
              first; `lg:order-1` moves it to the left of the copy once
              there are two columns. CertificationFlow fills the column
              width and sets its own height from its 960:440 ratio. */}
          <div className="order-2 lg:order-1 relative overflow-hidden rounded-[14px] border border-[#101418]/8 bg-white/85 shadow-[0_24px_60px_-32px_rgba(16,32,74,0.35)] backdrop-blur-xl">
            <CertificationFlow />
          </div>

          {/* ------------------------------------ RIGHT (lg): the copy */}
          {/* The 560px cap is a reading measure for the one-column layout; from
              lg up the column itself is the measure, so the cap comes off and
              the copy block fills its half exactly as the illustration fills its own. */}
          <div className="order-1 lg:order-2 max-w-[560px] lg:max-w-none">
            {/* On the light ground the eyebrow and the full stop are the
                brand blue, as they are in every cream section. */}
            <p className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0B5CFF]">
              <Asterisk />
              Certifications
            </p>

            {/* Recoleta ships as a single Medium file (see the @font-face in
                index.css), so the headline is font-medium — asking for
                bolder gets a synthesised bold. */}
            <h1 className="mt-5 font-recoleta text-[2rem] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-[#101418] sm:text-[2.5rem] lg:text-[3.1rem]">
              Turn Hands-On Skills Into Industry Credentials
              <span className="text-[#0B5CFF]">.</span>
            </h1>

            <p className="mt-5 text-[15px] leading-7 text-[#4A5261] lg:text-[16px]">
              {/* Exam-aligned paths across AWS, Azure, Google Cloud, Kubernetes and
              security — each one paired with the labs, practice tests and
              readiness checks that turn preparation into a pass. */}
              Get that career in IT. Earn that promotion. Stand out in your field.
            </p>

            <div className="mt-8 flex flex-wrap gap-3.5">
              <Button arrow render={<Link to="/contact" />}>
                Talk to an advisor
              </Button>

              <Button variant="paper" arrow render={<a href="#certification-tracks" />}>
                View certification paths
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
