import { Link } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import PageGrid from "@/components/backgrounds/PageGrid";
import BookingEmbed from "@/components/contact/BookingEmbed";

import {
  Reveal,
  RevealGroup,
  RevealItem,
  RevealLines,
} from "@/components/motion/Reveal";

/**
 * /contact — the page every "Contact us" in the nav, the mega menu and the
 * closing CTA points at.
 *
 * Same house language as the product pages: cream ground (#FAFAF7) with the
 * white cards on it, display type in Recoleta — uppercase, tracked in,
 * with the blue full stop — #101418 ink over #4A5261 body copy, and #0B5CFF
 * used only as an accent. Recoleta ships as a single Medium file (see the
 * @font-face in index.css), so every display line here is font-medium; asking
 * for a heavier weight would get a synthesised bold.
 *
 * The section rhythm is the one the rest of the site keeps: a masthead, then
 * bands at py-20 / lg:py-28 separated by a border-[#101418]/8 hairline. Three
 * of them here — masthead, then the form paired with the booking embed, then
 * the sales band that closes the page into the footer. Every one of the three
 * is split on the same 1.05fr / 0.95fr columns, which is the whole reason the
 * page reads as aligned: there is one seam down it, not three.
 */

/* --- The house marks ------------------------------------------------------ */

/** The brand asterisk, as it appears on the hero and in the closing CTA. */
function Asterisk({ className = "h-3.5 w-3.5 stroke-[#0B5CFF]" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      strokeWidth="2.4"
      strokeLinecap="round"
      className={`shrink-0 ${className}`}
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

/**
 * Masthead eyebrow: asterisk, then a tracked-out label — in the closing CTA's
 * beige, since the masthead now sits on the same blue ground.
 */
function Eyebrow({ children }) {
  return (
    <p className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#E7E0CE]">
      <Asterisk className="h-3.5 w-3.5 stroke-[#E7E0CE]" />
      {children}
    </p>
  );
}

/**
 * A rail label — the same tracked-out small caps as the eyebrow, in ink rather
 * than blue. Blue is the page's accent and it is spent on the masthead eyebrow,
 * the full stops and the button badge; four more blue labels through the
 * closing band would make it a colour scheme instead of an accent.
 */
function RailLabel({ children }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#101418]/45">
      {children}
    </p>
  );
}

/* --- Form primitives ------------------------------------------------------ */

/* One class string for every control, so the fields cannot drift apart as the
   form grows. Cream fill rather than white: the card behind them is white, and
   an input the same colour as its card only exists as a border. */
const CONTROL =
  "w-full rounded-[10px] border border-[#101418]/12 bg-[#FAFAF7] px-4 py-3 " +
  "text-[14.5px] leading-6 text-[#101418] outline-none transition-colors " +
  "placeholder:text-[#101418]/35 hover:border-[#101418]/25 " +
  "focus:border-[#0B5CFF] focus:bg-white focus:ring-2 focus:ring-[#0B5CFF]/15";

function Label({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#101418]/55"
    >
      {children}
    </label>
  );
}

/* --- Content -------------------------------------------------------------- */

const interests = [
  "Enterprise Cloud",
  "Enterprise AI",
  "DevOps",
  "Platform Engineering",
  "Cyber Security",
  "AI Engineering",
  "Cloud & AI Labs",
  "Enterprise LMS",
  "Something else",
];

const solutions = [
  { label: "Cloud & AI Labs", href: "/products/enterprise-labs" },
  { label: "Enterprise LMS", href: "/products/e-learning" },
  { label: "AI Engineering", href: "/products/enterprise-labs" },
];

/* --- Page ----------------------------------------------------------------- */

export default function Contact() {
  return (
    <>
      <Navbar />

      <main className="bg-[#FAFAF7]">
        {/* ── Masthead ─────────────────────────────────────────────── */}
        {/* relative/isolate for the corner grid below, which pins itself to
            this section's corners. Coloured as the closing CTA is: brand blue
            ground, cream display type, beige for the second voice. */}
        <section className="relative isolate overflow-hidden border-b border-[#101418]/8 bg-[#0B5CFF] py-16 lg:py-24">
          {/* The corner grid, in this page's diagonal — PageGrid picks it
              from the URL. White stars here: the default brand blue would
              vanish into the blue ground. */}
          <PageGrid color="#FFFFFF" halo="#FFFFFF" />

          <Container>
            <RevealGroup
              mount
              delay={0.08}
              className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-16"
            >
              <div>
                <RevealItem as="div">
                  <Eyebrow>Contact us</Eyebrow>
                </RevealItem>

                {/* Masked line rise, like the hero's and the closing CTA's —
                    display type on this site does not fade in. The breaks are
                    stated rather than left to the viewport, which is what lets
                    the mask read as two deliberate lines at every width. */}
                <RevealLines
                  nested
                  as="h1"
                  lines={[
                    "Let's build the right",
                    <>
                      solution together
                      <span className="text-[#E7E0CE]">.</span>
                    </>,
                  ]}
                  className="mt-5 font-recoleta text-[2.4rem] font-medium uppercase leading-[1.02] tracking-[-0.025em] text-[#FAFAF7] sm:text-[3.2rem] lg:text-[3.8rem]"
                />
              </div>

              <RevealItem
                as="p"
                className="max-w-xl text-[15px] leading-7 text-[#FAFAF7]/85 lg:pb-2"
              >
                Whether you need hands-on Cloud &amp; AI Labs, an enterprise LMS,
                AI engineering, or a tailored learning solution, our team is
                here to help.
              </RevealItem>
            </RevealGroup>

            {/* The three things a first-time visitor actually wants to know
                before filling anything in, in the CTA's own dl treatment. */}
            <RevealGroup
              mount
              as="dl"
              delay={0.24}
              className="mt-12 grid grid-cols-3 gap-x-4 border-t border-[#FAFAF7]/25 pt-6 sm:flex sm:flex-wrap sm:gap-x-12 sm:gap-y-4"
            >
              {[
                ["1", "Working day to a reply"],
                ["3–5", "Days to a real quote"],
                ["28", "Subject areas"],
              ].map(([value, label]) => (
                <RevealItem key={label}>
                  <dt className="font-recoleta text-[24px] font-medium text-[#FAFAF7] sm:text-[28px]">
                    {value}
                  </dt>

                  <dd className="mt-1 text-[10px] uppercase leading-tight tracking-[0.14em] text-[#E7E0CE]/80 sm:text-[11px]">
                    {label}
                  </dd>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </section>

        {/* ── Form + booking ───────────────────────────────────────── */}
        {/* Two panels, deliberately paired: the same card treatment on both,
            because they are the same offer twice — write to us, or take a slot.
            The column split is the masthead's, so the seam between them lands
            on the line the heading and the intro copy already set above. */}
        <section className="py-16 lg:py-24">
          <Container>
            {/* items-stretch rather than items-start, so the two cards end
                level. The form is the one that sets the height and it is left
                exactly as it was: it is the shorter of the two, so the row is
                its height, and everything below is the booking card giving up
                its fixed frame height to come down and meet it.

                All of it is gated on lg because that is the only width where
                the cards are side by side. Stacked, there is no height to
                match and the calendar wants every one of its 760 pixels. */}
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-stretch lg:gap-16">
              {/* ── Left: the form, on the site's white card ────────── */}
              <Reveal>
                <div className="rounded-[18px] border border-[#DFE6F5] bg-white p-6 shadow-[0_24px_60px_-28px_rgba(16,32,74,0.28)] sm:p-9 lg:p-10">
                  <h2 className="font-recoleta text-[1.7rem] font-medium uppercase leading-[1.06] tracking-[-0.015em] text-[#101418] sm:text-[2rem]">
                    Get in touch
                    <span className="text-[#0B5CFF]">.</span>
                  </h2>

                  <p className="mt-4 max-w-xl text-[14.5px] leading-7 text-[#4A5261]">
                    Tell us what you&apos;re looking to build and we&apos;ll get
                    back to you shortly.
                  </p>

                  <form className="mt-9 space-y-6">
                    {/* NAME */}
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="firstName">First name</Label>

                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          placeholder="Jane"
                          className={CONTROL}
                        />
                      </div>

                      <div>
                        <Label htmlFor="lastName">Last name</Label>

                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          placeholder="Okafor"
                          className={CONTROL}
                        />
                      </div>
                    </div>

                    {/* EMAIL */}
                    <div>
                      <Label htmlFor="email">Work email</Label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                        className={CONTROL}
                      />
                    </div>

                    {/* COMPANY */}
                    <div>
                      <Label htmlFor="company">Company</Label>

                      <input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Company name"
                        className={CONTROL}
                      />
                    </div>

                    {/* INTEREST */}
                    {/* appearance-none, then the site's own chevron drawn over
                        the field — the native arrow is the one control on the
                        page the browser would style for us, and it doesn't
                        match anything else here. */}
                    <div>
                      <Label htmlFor="interest">How can we help?</Label>

                      <div className="relative">
                        <select
                          id="interest"
                          name="interest"
                          className={`${CONTROL} appearance-none pr-11`}
                        >
                          {interests.map((option) => (
                            <option key={option}>{option}</option>
                          ))}
                        </select>

                        <Chevrons
                          className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rotate-90 stroke-[#101418]/40"
                        />
                      </div>
                    </div>

                    {/* MESSAGE */}
                    <div>
                      <Label htmlFor="message">Message</Label>

                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Tell us a little about what you're looking for..."
                        className={`${CONTROL} resize-none`}
                      />
                    </div>

                    {/* BUTTON — the homepage pill: ink body, blue badge */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-2">
                      <button
                        type="submit"
                        className="group inline-flex items-center gap-3 rounded-[10px] bg-[#101418] py-2 pl-5 pr-2 text-sm font-semibold text-white transition-colors hover:bg-[#1C2228] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5CFF] focus-visible:ring-offset-2"
                      >
                        Send message

                        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0B5CFF] text-white transition-transform group-hover:translate-x-0.5">
                          <Chevrons className="h-3.5 w-3.5 stroke-current" />
                        </span>
                      </button>

                      <p className="text-[12.5px] leading-6 text-[#101418]/45">
                        We reply within one working day.
                      </p>
                    </div>
                  </form>
                </div>
              </Reveal>

              {/* ── Right: book a slot ─────────────────────────────── */}
              {/* The Bookings frame brings its own white ground and its own
                  inner padding, so the card here is padded thinner than the
                  form's — matching p-10 on both would sit the calendar a full
                  inch inside its border. */}
              <Reveal delay={0.08} className="lg:h-full">
                <div
                  id="book"
                  className="scroll-mt-28 rounded-[18px] border border-[#DFE6F5] bg-white p-6 shadow-[0_24px_60px_-28px_rgba(16,32,74,0.28)] sm:p-7 lg:flex lg:h-full lg:flex-col"
                >
                  <h2 className="font-recoleta text-[1.7rem] font-medium uppercase leading-[1.06] tracking-[-0.015em] text-[#101418] sm:text-[2rem]">
                    Book a slot
                    <span className="text-[#0B5CFF]">.</span>
                  </h2>

                  <p className="mt-4 max-w-xl text-[14.5px] leading-7 text-[#4A5261]">
                    Rather talk it through? Take 30 minutes with our team —
                    pick a time below and you&apos;ll get the invite straight
                    away.
                  </p>

                  {/* min-h-0 at every step down: a flex item's floor is its
                      content by default, and without it the chain refuses to
                      shrink past the frame's own 760 and the card overshoots
                      the form again. The frame keeps a floor of its own so a
                      short form can never squeeze the calendar to nothing. */}
                  <div className="mt-7 border-t border-[#101418]/8 pt-5 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
                    <BookingEmbed
                      className="lg:flex lg:min-h-0 lg:flex-1 lg:flex-col"
                      frameClassName="lg:h-auto lg:min-h-[420px] lg:flex-1"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* ── Talk with our team ───────────────────────────────────── */}
        {/* The closing band. Same two-column split as the masthead and the
            section above it, so one vertical seam runs the length of the page
            — heading left, the answer to it right, three times down. No cards:
            the two panels above are the page's boxes, and this band is set the
            way the product pages set their lists, on hairlines over cream. */}
        <section className="border-t border-[#101418]/8 py-16 lg:py-24">
          <Container>
            <RevealGroup
              delay={0.08}
              className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-16"
            >
              <div>
                <RevealItem as="div">
                  <RailLabel>Sales</RailLabel>
                </RevealItem>

                <RevealLines
                  nested
                  as="h2"
                  lines={[
                    <>
                      Talk with our team
                      <span className="text-[#0B5CFF]">.</span>
                    </>,
                  ]}
                  className="mt-4 font-recoleta text-[1.75rem] font-medium uppercase leading-[1.04] tracking-[-0.02em] text-[#101418] sm:text-[2.4rem] lg:text-[2.8rem]"
                />
              </div>

              <RevealItem as="div" className="lg:pb-1">
                <p className="max-w-md text-[15px] leading-7 text-[#4A5261]">
                  Have a project in mind or need help choosing the right
                  solution? Let&apos;s talk about your requirements.
                </p>

                <a
                  href="mailto:reach@cloud4green.com"
                  className="group mt-6 inline-flex items-center gap-2.5 rounded-[10px] border border-[#101418]/12 bg-white px-5 py-2.5 text-sm font-semibold text-[#101418] shadow-sm transition-colors hover:border-[#101418]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B5CFF] focus-visible:ring-offset-2"
                >
                  Contact Sales

                  <Chevrons className="h-3.5 w-3.5 stroke-[#0B5CFF] transition-transform group-hover:translate-x-0.5" />
                </a>
              </RevealItem>
            </RevealGroup>

            {/* The two lists, under the band's own hairline and on the same
                column edges as the heading row above them. */}
            <RevealGroup
              delay={0.24}
              className="mt-12 grid gap-10 border-t border-[#101418]/10 pt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16"
            >
              {/* WHAT WE DO */}
              <RevealItem>
                <RailLabel>What we do</RailLabel>

                <div className="mt-6">
                  {solutions.map((solution) => (
                    <Link
                      key={solution.label}
                      to={solution.href}
                      className="group flex items-center justify-between gap-6 border-b border-[#101418]/10 py-4 first:border-t"
                    >
                      <span className="text-[15px] font-medium text-[#101418] transition-colors group-hover:text-[#0B5CFF]">
                        {solution.label}
                      </span>

                      <Chevrons className="h-3.5 w-3.5 stroke-[#101418]/35 transition-all group-hover:translate-x-0.5 group-hover:stroke-[#0B5CFF]" />
                    </Link>
                  ))}
                </div>
              </RevealItem>

              {/* DIRECT LINES */}
              {/* Side by side from sm up: the column is the full page width's
                  worth here rather than a rail's, and two stacked tiles in it
                  would leave the band bottom-heavy on one side. */}
              <RevealItem>
                <RailLabel>Prefer to reach us directly?</RailLabel>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <DirectLine
                    href="mailto:reach@cloud4green.com"
                    icon={<MailMark />}
                    label="Email"
                    value="reach@cloud4green.com"
                  />

                  <DirectLine
                    href="tel:+917022424545"
                    icon={<PhoneMark />}
                    label="Phone"
                    value="+91 7022424545"
                  />
                </div>
              </RevealItem>
            </RevealGroup>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* --- Rail pieces ---------------------------------------------------------- */

/**
 * One direct line — a bordered white row with the mark in a tinted tile.
 *
 * The tile is what keeps the row from reading as a list item: these two are the
 * only things on the page you can act on without filling in a form, so they get
 * the section's one piece of chrome outside the card.
 */
function DirectLine({ href, icon, label, value }) {
  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-[12px] border border-[#101418]/10 bg-white px-4 py-3.5 transition-colors hover:border-[#0B5CFF]/35"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#0B5CFF]/[0.08] text-[#0B5CFF]">
        {icon}
      </span>

      <span className="min-w-0">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#101418]/40">
          {label}
        </span>

        <span className="block truncate text-[15px] font-medium text-[#101418] transition-colors group-hover:text-[#0B5CFF]">
          {value}
        </span>
      </span>
    </a>
  );
}

/* Drawn here rather than pulled from lucide, so the stroke weight matches the
   asterisk and the chevrons above rather than sitting a hair lighter. */
function MailMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 fill-none stroke-current"
    >
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

function PhoneMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 fill-none stroke-current"
    >
      <path d="M6.5 3h3l1.5 4.2-2 1.4a12.5 12.5 0 0 0 6.4 6.4l1.4-2L21 14.5v3a2.5 2.5 0 0 1-2.7 2.5A16.8 16.8 0 0 1 3.5 5.7 2.5 2.5 0 0 1 6 3Z" />
    </svg>
  );
}
