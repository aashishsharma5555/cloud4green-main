import { Link } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import PageGrid from "@/components/backgrounds/PageGrid";

import {
  Reveal,
  RevealGroup,
  RevealItem,
  RevealLines,
} from "@/components/motion/Reveal";

/**
 * Catch-all route — every URL without a page yet lands here, including the
 * products the mega menu already links to. So it reads as "under construction"
 * rather than as an error.
 *
 * Set as a poster, the way the reference is: a thin head band pinned to the
 * corners, a display line that fills the sheet, a single link back, and a
 * foot band. House language throughout — cream ground, Recoleta medium
 * uppercase tracked in, #101418 ink, and #0B5CFF spent only on the asterisk,
 * the full stop and the button badge.
 */

/* Every micro-label shares one setting — the same one the closing CTA uses. */
const META =
  "text-[11px] font-semibold uppercase leading-[1.5] tracking-[0.16em] sm:text-[12px]";

/** The brand asterisk, as it appears on the hero and in the closing CTA. */
function Asterisk({ className = "h-3.5 w-3.5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      strokeWidth="2.4"
      strokeLinecap="round"
      className={`shrink-0 stroke-[#0B5CFF] ${className}`}
    >
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
    </svg>
  );
}

/** The » on the homepage buttons. */
function Chevrons({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`fill-none ${className}`}
    >
      <path d="m7 5 6 7-6 7M13 5l6 7-6 7" />
    </svg>
  );
}

export default function Notfound() {
  return (
    <>
      <Navbar />

      <main className="bg-[#FAFAF7]">
        {/* Fills whatever the nav leaves of the viewport, so the poster is one
            screen. */}
        <section className="relative isolate flex min-h-[calc(100svh-var(--c4g-chrome-h))] flex-col overflow-hidden py-10 lg:py-14">
          <PageGrid diagonal="tl-br" />

          <Container className="flex flex-1 flex-col">
            {/* ── head band ─────────────────────────────────────────── */}
            <RevealGroup
              mount
              delay={0.08}
              className="flex flex-wrap items-start justify-between gap-4 border-b border-[#101418]/10 pb-6"
            >
              <RevealItem as="p" className={`${META} flex items-center gap-2.5 text-[#0B5CFF]`}>
                <Asterisk />
                Work in progress
              </RevealItem>

              <RevealItem as="p" className={`${META} text-right text-[#101418]/45`}>
                Cloud4Green
              </RevealItem>
            </RevealGroup>

            {/* ── the poster ────────────────────────────────────────── */}
            <div className="flex flex-1 flex-col items-center justify-center py-14 text-center lg:py-20">
              {/* Two stated lines, so the mask has known edges at every width. */}
              <RevealLines
                mount
                as="h1"
                delay={0.15}
                lines={[
                  "Oops!",
                  <>
                    I&apos;m in progress
                    <span className="text-[#0B5CFF]">.</span>
                  </>,
                ]}
                className="font-recoleta font-medium uppercase text-[#101418]"
                style={{
                  fontSize: "clamp(2.2rem, 6.5vw, 5.5rem)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.03em",
                }}
              />

              <RevealGroup mount delay={0.6} className="mt-8 flex flex-col items-center lg:mt-10">
                <RevealItem
                  as="p"
                  className="max-w-md text-[15px] leading-7 text-[#4A5261] sm:text-base"
                >
                  I am under construction and will be up in sometime.
                </RevealItem>

                {/* The homepage pill: ink body, blue badge. */}
                <RevealItem className="mt-8">
                  <Link
                    to="/"
                    className="group inline-flex items-center gap-3 rounded-[10px] bg-[#101418] py-2 pl-5 pr-2 text-sm font-semibold text-white transition-colors hover:bg-[#1C2228] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5CFF] focus-visible:ring-offset-2"
                  >
                    Back to home
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0B5CFF] text-white transition-transform group-hover:translate-x-0.5">
                      <Chevrons className="h-3.5 w-3.5 stroke-current" />
                    </span>
                  </Link>
                </RevealItem>
              </RevealGroup>
            </div>

            {/* ── foot band ─────────────────────────────────────────── */}
            <Reveal
              mount
              delay={0.8}
              className="flex flex-wrap items-center justify-between gap-4 border-t border-[#101418]/10 pt-6"
            >
              <p className={`${META} text-[#101418]/45`}>Coming soon</p>

              <Link
                to="/contact"
                className={`${META} group flex items-center gap-2 text-[#101418]/70 transition-colors hover:text-[#0B5CFF]`}
              >
                Talk to us meanwhile
                <Chevrons className="h-3 w-3 stroke-current transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </Container>
        </section>
      </main>

      {/* Also what makes the page scroll: html reserves a scrollbar gutter
          (index.css), and on a page exactly one screen tall that gutter sits
          empty beside the announcement bar. */}
      <Footer />
    </>
  );
}
