"use client";

import { useState } from "react";
import { Link } from "react-router-dom";

import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import {
  Reveal,
  RevealGroup,
  RevealItem,
  RevealLines,
} from "@/components/motion/Reveal";
import { LINE_STAGGER } from "@/components/motion/reveal-tokens";

import bannerImg from "@/assets/images/CertTrophy.png";

/* ------------------------------------------------------------------
   Cloud4Green — the training & certification banner.

   The poster composition — paper ground, one ink, hairline rules, the
   headline as the only loud thing on the card — set in the house face
   rather than a condensed grotesk, and kept to a band: the same height
   as the Stats section on /products/e-learning, not a full sheet.

   Four bands, top to bottom, separated by hairlines:

     1  lockup left, three-line manifesto right
     2  the headline, with an image slot and the statement column
        sitting together in the bottom-right corner
     3  the call to action left, the sign-off right
     4  the segmented pill, jumping to the two sections it sells

   Three things worth protecting in review:

   • Recoleta ships as a single Medium file (see the @font-face in
     index.css), so every display line here is font-medium — ask for
     bolder and the browser synthesises it by smearing the outlines.

   • Recoleta is wider and softer than a grotesk, so the headline is
     sized well below poster scale and given real air: generous leading,
     a rule's worth of space above it, and nothing sharing its band on a
     narrow screen.

   • The headline is broken by hand, one line per array entry, because
     the line breaks ARE the composition — never let it reflow.

   The headline size is an inline clamp() rather than a Tailwind step:
   it has to track the card's width continuously, and a stepped scale
   visibly jumps mid-drag.
------------------------------------------------------------------ */

const TONES = {
  /* Paper and brand blue — the reference, and the tone that sits
     happily between two cream sections. */
  signal: {
    ground: "#F5F4F1",
    ink: "#0B5CFF",
    rule: "rgba(11, 92, 255, 0.30)",
    slot: "rgba(11, 92, 255, 0.06)",
    pillIdle: "rgba(11, 92, 255, 0.62)",
  },
  /* The same card inverted, for a page that needs this to be the dark
     band between two light ones. */
  inverse: {
    ground: "#0B2ACB",
    ink: "#F4F5FB",
    rule: "rgba(244, 245, 251, 0.35)",
    slot: "rgba(244, 245, 251, 0.10)",
    pillIdle: "rgba(244, 245, 251, 0.62)",
  },
};

const DEFAULT_HEADLINE = ["Train deep.", "Certify fast."];

const DEFAULT_STATEMENTS = [
  ["Hands-on labs,", "not slide decks."],
  ["Exam-mapped", "certification paths."],
  ["Proven on live", "cloud and AI stacks."],
];

const DEFAULT_MANIFESTO = ["Skill the team.", "Prove the skill.", "Ship the work."];

const DEFAULT_TABS = [
  { label: "Certification tracks", href: "#certification-tracks" },
  { label: "Why certify", href: "#benefits" },
];

export default function TrainingBanner({
  tone = "signal",
  brand = "Cloud4Green",
  // brandSub = "Certification",
  manifesto = DEFAULT_MANIFESTO,
  headline = DEFAULT_HEADLINE,
  statements = DEFAULT_STATEMENTS,
  ctaLabel = "Book a cohort",
  ctaHref = "/contact",
  signOff = "Skills that ship.",
  tabs = DEFAULT_TABS,
  /* The corner slot. Until an asset lands it draws an empty frame at the
     size the artwork will occupy, so the composition is already correct
     — pass `imageSrc` and the frame becomes the picture. */
  imageSrc = bannerImg,
  imageAlt = "",
}) {
  const t = TONES[tone] ?? TONES.signal;

  /* The pill's segments are real in-page anchors; the state only tracks
     which one was last taken, so the control doesn't read as dead
     chrome. */
  const [active, setActive] = useState(0);

  /* Every micro-label on the card shares one treatment, so it lives in
     one string rather than being retyped per element. */
  const label =
    "text-[11px] font-bold uppercase leading-[1.5] tracking-[0.13em] sm:text-[12px]";
  const rule = { borderColor: t.rule };

  return (
    /* id: the product bar's "Training" anchor — see src/config/productNav.js */
    <section id="training" className="scroll-mt-24 bg-[#FAFAF7] py-14 lg:py-20">
      <Container>
        {/* The card is timed like the homepage CTA it sits beside: the frame
            rises, and its copy follows one line-beat later while the frame
            is still settling. */}
        <RevealGroup
          rise
          delay={LINE_STAGGER}
          className="rounded-[26px] border px-6 py-9 sm:px-10 lg:px-14 lg:py-12"
          style={{ background: t.ground, color: t.ink, borderColor: t.rule }}
        >
          {/* --------------------------------------- 1 — the head */}
          <RevealItem className="flex flex-wrap items-start justify-between gap-6 pb-7">
            <div>
              <p className="font-recoleta text-[21px] font-medium uppercase leading-none tracking-[-0.015em] sm:text-[24px]">
                {brand}
              </p>
              {/* <p className={`${label} mt-2 tracking-[0.28em] opacity-80`}>{brandSub}</p> */}
            </div>

            {/* The manifesto is the card's smallest voice and its thesis
                — right-aligned so it reads as a stamp, not a caption. */}
            <div className={`${label} text-right`}>
              {manifesto.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </RevealItem>

          {/* ----------------------------------- 2 — the headline */}
          {/* The air above and below this band is the point: Recoleta at
              this size needs the room a condensed face doesn't. */}
          <div className="border-t pt-10 pb-2 lg:pt-14 lg:pb-4" style={rule}>
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
              {/* Hand-broken, so the lines can rise out of their own masks. */}
              <RevealLines
                nested
                as="h2"
                lines={headline}
                lineClassName="whitespace-nowrap"
                className="font-recoleta font-medium uppercase"
                style={{
                  fontSize: "clamp(2.1rem, 5vw, 3.5rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                }}
              />

              {/* The bottom-right corner: the image slot, then the
                  statements to its right. Both bottom-aligned, so the
                  column's last line sits on the headline's baseline. */}
              {/* On phones the image is hidden, so the statements sit on the
                  headline's left edge rather than pushed into an empty
                  right-hand corner. */}
              <RevealItem className="flex shrink-0 items-end justify-start gap-6 sm:justify-end sm:gap-8">
                {/* The slot sits directly against the statements column,
                    so the pair reads as one right-hand block rather than
                    the artwork floating in the gap. */}
                <div
                  className="hidden w-[176px] shrink-0 overflow-hidden rounded-[14px] border sm:block lg:w-[210px]"
                  style={{ border: `1px solid ${t.ink}` }}
                >
                  {imageSrc ? (
                    <img src={imageSrc} alt={imageAlt} className="block h-auto w-full" />
                  ) : (
                    /* Holds the slot's height while the artwork is
                       outstanding — 4:5, the proportion a portrait crop
                       of the certification photography lands at. */
                    <div className="aspect-[4/5] w-full" aria-hidden="true" />
                  )}
                </div>

                <ul className="flex flex-col gap-5 sm:max-w-[200px]">
                  {statements.map((lines) => (
                    <li key={lines[0]}>
                      <span
                        aria-hidden="true"
                        className="mb-2.5 block h-px w-6"
                        style={{ background: t.ink }}
                      />
                      <p className={`${label} tracking-[0.08em]`}>
                        {lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </p>
                    </li>
                  ))}
                </ul>
              </RevealItem>
            </div>
          </div>

          {/* --------------------------------------- 3 — the foot */}
          <RevealItem
            className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t pt-7 lg:mt-12"
            style={rule}
          >
            {/* The site's CTA, unchanged — the card sets the type, not
                the controls. */}
            <Button arrow render={<Link to={ctaHref} />}>
              {ctaLabel}
            </Button>

            <p
              className="font-recoleta font-medium uppercase"
              style={{
                fontSize: "clamp(1.05rem, 2vw, 1.45rem)",
                letterSpacing: "-0.015em",
              }}
            >
              {signOff}
            </p>
          </RevealItem>
        </RevealGroup>

        {/* ------------------------------------ 4 — the segmented pill */}
        {/* Paper and ink like the card above it: the taken segment is a
            solid block of the card's one colour. */}
        {tabs?.length > 0 && (
          <Reveal className="mt-5 flex justify-center">
            <div
              className="inline-flex rounded-full border p-1.5"
              style={{ background: t.ground, borderColor: t.rule }}
            >
              {tabs.map((tab, i) => (
                <a
                  key={tab.href}
                  href={tab.href}
                  onClick={() => setActive(i)}
                  aria-current={i === active ? "true" : undefined}
                  className="rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.13em] transition-colors sm:px-7 sm:text-[12px]"
                  style={
                    i === active
                      ? { background: t.ink, color: t.ground }
                      : { color: t.pillIdle }
                  }
                >
                  {tab.label}
                </a>
              ))}
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
