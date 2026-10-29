
"use client";

import { Link } from "react-router-dom";
import {
  RevealGroup,
  RevealItem,
  RevealLines,
} from "@/components/motion/Reveal";

/**
 * CtaSection — closing CTA, set as a poster.
 *
 * The card used to be a pale wash with ink type. It is now the one saturated
 * block on the page: brand blue edge to edge, cream type, hairline rules, and
 * the display line sized to fill its column the way a printed poster fills a
 * sheet. The reasoning for the swap is the same one that made it light before,
 * read the other way round — the section has to be the last thing the eye
 * stops on before the black footer, and a wash doesn't stop anything.
 *
 * Palette:
 *   blue   #0B5CFF   --brand-blue, the site's one accent, here as the ground
 *   cream  #FAFAF7   page background, here as the display/ink colour
 *   beige  #E7E0CE   the poster's second voice — eyebrow, meta, sign-off
 *   ink    #101418   buttons and the video panel
 *
 * Type is the house setting: Recoleta, medium (the only weight shipped),
 * uppercase, tracked in. Tighter leading than elsewhere on the site because
 * at this size the two lines are a block, not a sentence.
 */
/* onPlay, video and VideoPanel are kept for the parked video panel — see the
   note where it used to render. */
export default function CtaSection({
  // eslint-disable-next-line no-unused-vars
  onPlay,
  demoHref = "/contact#book",
  contactHref = "/contact",
  hook = "No slides. Real consoles.",
  stamp = "Enterprise enablement",
  signOff = "Skills that ship.",
  // eslint-disable-next-line no-unused-vars
  video = {
    label: "Inside a real lab",
    caption: "Forty people, real cloud accounts, one afternoon.",
    duration: "6:04",
    footerLeft: "Cloud4Green Labs",
    footerRight: "No slides",
  },
}) {
  return (
    <section className="bg-[#FAFAF7] px-6 py-16 sm:px-8 lg:px-12">
      {/* The card is the frame, so it arrives first and on its own — then the
          copy inside it comes up beat by beat off the same trigger. */}
      <RevealGroup
        rise
        delay={0.12}
        className="relative isolate mx-auto w-full max-w-7xl overflow-hidden rounded-[26px]
                   bg-[#0B5CFF] px-6 py-9 text-[#FAFAF7] shadow-[0_24px_60px_-24px_rgba(11,92,255,0.55)]
                   sm:px-10 lg:px-14 lg:py-12"
      >
        {/* ── the head band: eyebrow left, stamp right ─────────── */}
        {/* Straight off the poster — two small voices pinned to opposite
            corners, with the rule under them holding the sheet together. */}
        <RevealItem className="flex flex-wrap items-start justify-between gap-4 border-b border-[#FAFAF7]/25 pb-7">
          <p className={`${META} flex items-center gap-2.5 text-[#E7E0CE]`}>
            <Asterisk />
            {hook}
          </p>
          <p className={`${META} text-right text-[#E7E0CE]/80`}>{stamp}</p>
        </RevealItem>

        {/* The same faint grid the video panel carried, now on the whole
            sheet — so the blue has a surface, not just a colour. Faded out
            toward the left, where the headline sits. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10
                     [mask-image:linear-gradient(to_left,black,transparent_70%)]"
          style={INK_GRID}
        />

        <div className="pt-10 lg:pt-14">
          {/* Masked-line reveal, like the hero's — this is the last display
              type on the page and it should land the way the first did. The
              lines are two boxes rather than one wrapping paragraph, so the
              break is the same on a phone as on a desktop and the mask has a
              known edge to clip to.

              With the video gone the headline has the card's whole width, so
              it is set a size up — it is the poster now, not half of one. The
              negative left margin is optical, not layout — it pulls the cap of
              the T back onto the rule the eyebrow sits on. */}
          <RevealLines
            nested
            as="h2"
            lines={[
              "Tell us the roles.",
              <>
                We&apos;ll send back a plan
                <span className="text-[#E7E0CE]">.</span>
              </>,
            ]}
            className="-ml-[0.02em] max-w-5xl font-recoleta font-medium uppercase text-[#FAFAF7]"
            style={{
              fontSize: "clamp(1.9rem, 5.6vw, 4.6rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
            }}
          />

          {/* The pitch and the ask on one line under the headline: the
              sentence on the left, the buttons answering it on the right. On
              a phone they stack. */}
          <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-14">
            <RevealItem
              as="p"
              className="max-w-md border-l-2 border-[#E7E0CE]/60 pl-5 text-[15px] leading-7 text-[#FAFAF7]/85 sm:text-base"
            >
              Share your goals with us. We’ll help you chart the right path
              forward.
            </RevealItem>

            {/* Paper-and-ink buttons: the pill is now cream on blue, which is
                the same contrast the black pill had on cream. */}
            <RevealItem className="flex flex-wrap items-center gap-3">
              <Link
                to={demoHref}
                className="group inline-flex items-center gap-3 rounded-[10px] bg-[#FAFAF7] py-2 pl-5 pr-2
                           text-sm font-semibold text-[#101418] transition-colors hover:bg-white
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAFAF7]
                           focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B5CFF]"
              >
                Book a demo
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#101418]
                                 text-[#FAFAF7] transition-transform group-hover:translate-x-0.5">
                  <Chevrons className="h-3.5 w-3.5 stroke-current" />
                </span>
              </Link>

              <Link
                to={contactHref}
                className="group inline-flex items-center gap-2.5 rounded-[10px] border border-[#FAFAF7]/35
                           px-5 py-2.5 text-sm font-semibold text-[#FAFAF7] transition-colors
                           hover:border-[#FAFAF7] hover:bg-[#FAFAF7]/10
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAFAF7]
                           focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B5CFF]"
              >
                Contact us
                <Chevrons className="h-3.5 w-3.5 stroke-current transition-transform group-hover:translate-x-0.5" />
              </Link>
            </RevealItem>
          </div>

          {/* ── the video panel — off for now ──────────────────────
              Parked until the lab film exists. To bring it back, restore the
              two-column grid (lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)])
              around the pitch, drop the headline back to
              clamp(1.8rem, 4.6vw, 3.4rem), remove the grid above, and
              uncomment this:

          <RevealItem>
            <VideoPanel video={video} onPlay={onPlay} />
          </RevealItem>
          */}
        </div>

        {/* ── the foot: the sheet's last small voice ───────────── */}
        <RevealItem className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#FAFAF7]/25 pt-7 lg:mt-12">
          <p className={`${META} text-[#E7E0CE]/80`}>Cloud4Green</p>
          <p
            className="font-recoleta font-medium uppercase text-[#E7E0CE]"
            style={{
              fontSize: "clamp(1.05rem, 2vw, 1.45rem)",
              letterSpacing: "-0.015em",
            }}
          >
            {signOff}
          </p>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}

// eslint-disable-next-line no-unused-vars
function VideoPanel({ video, onPlay }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`Play: ${video.caption} (${video.duration})`}
      className="group relative block aspect-[5/4] w-full overflow-hidden rounded-2xl border border-[#FAFAF7]/15
                 text-left shadow-[0_18px_40px_-14px_rgba(7,9,12,0.55)] sm:aspect-[16/10]
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAFAF7]
                 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B5CFF]"
      style={{
        backgroundImage: `
          radial-gradient(circle at 72% 26%, rgba(11,92,255,.34), rgba(0,0,0,0) 48%),
          linear-gradient(150deg,#12171E 0%,#07090C 78%)`,
      }}
    >
      {/* swap this span for your <img> poster frame once the video exists */}
      <span aria-hidden="true" className="absolute inset-0" style={INK_GRID} />

      <span className="absolute left-5 top-5 flex items-center gap-2">
        <span className="block h-[7px] w-[7px] rounded-full bg-[#0B5CFF]" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#FAFAF7]/75 sm:text-[11px]">
          {video.label}
        </span>
      </span>

      <span className="absolute right-5 top-5 rounded-md bg-black/50 px-2 py-1
                       text-[11px] font-semibold tabular-nums text-[#FAFAF7]/80">
        {video.duration}
      </span>

      <span className="absolute left-1/2 top-1/2 w-[84%] -translate-x-1/2 -translate-y-1/2
                       rounded-xl border border-[#FAFAF7]/10 bg-[#07090C]/70 px-4 py-3
                       text-center text-[13px] leading-relaxed text-[#FAFAF7]/90
                       sm:w-[76%] sm:px-5 sm:py-4 sm:text-[15px]">
        “{video.caption}”
      </span>

      <span className="absolute bottom-5 left-5 text-[10px] font-semibold uppercase
                       tracking-[0.16em] text-[#FAFAF7]/40 sm:text-[11px]">
        {video.footerLeft}
      </span>
      <span className="absolute bottom-5 right-[104px] hidden text-[11px] font-semibold
                       uppercase tracking-[0.16em] text-[#FAFAF7]/40 sm:block">
        {video.footerRight}
      </span>

      <span className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center
                       rounded-full bg-[#FAFAF7] shadow-lg transition-transform
                       group-hover:scale-105 sm:bottom-5 sm:right-5 sm:h-[62px] sm:w-[62px]">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 h-4 w-4 fill-[#101418] sm:h-5 sm:w-5">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}

/* the hero's eight-point mark */
function Asterisk() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" strokeWidth="2.4" strokeLinecap="round"
         className="h-3.5 w-3.5 shrink-0 stroke-[#E7E0CE]">
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
    </svg>
  );
}

/* the » on the homepage buttons */
function Chevrons({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" strokeWidth="2.6" strokeLinecap="round"
         strokeLinejoin="round" className={`fill-none ${className}`}>
      <path d="m7 5 6 7-6 7M13 5l6 7-6 7" />
    </svg>
  );
}

/* Every micro-label on the card shares one treatment, so it lives in one
   string rather than being retyped per element. Same setting the certification
   banner uses, so the two cards read as the same press. */
const META =
  "text-[11px] font-semibold uppercase leading-[1.5] tracking-[0.16em] sm:text-[12px]";

const INK_GRID = {
  backgroundImage: `
    linear-gradient(to right,rgba(250,250,247,.05) 1px,transparent 1px),
    linear-gradient(to bottom,rgba(250,250,247,.05) 1px,transparent 1px)`,
  backgroundSize: "44px 44px",
};
