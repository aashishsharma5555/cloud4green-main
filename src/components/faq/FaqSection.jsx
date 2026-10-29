import { useState } from "react";

import Container from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";

/* ------------------------------------------------------------------ *
 * FaqSection — the site's one FAQ block.
 *
 * Every page passes its own questions; nothing about the copy lives in
 * here. The answers for each page are in src/data/faqs.js:
 *
 *   <FaqSection faqs={enterpriseLabsFaqs} />
 *   <FaqSection faqs={eLearningFaqs} layout="centered" />
 *
 * Two layouts, because the two pages it sits on want different weights
 * of heading, and both are the same component so the type, the rules,
 * the plus-to-cross mark and the open/close timing can never drift
 * apart again:
 *
 *   split      heading in a left column, accordion in a right one.
 *              One list, hairline rules, the editorial default.
 *   centered   heading centred over a two-column card grid. For pages
 *              with a lot of questions, where one long list would run
 *              past the fold.
 *
 * Controlled rather than <details>, for two reasons: one-open-at-a-time
 * needs shared state, and <details> drops its content the instant it
 * closes, so the collapse never animates.
 *
 * House type, as set on the product pages: display in font-recoleta,
 * uppercase, tracking tightened, closed with the blue full stop;
 * Recoleta ships Medium only, so always font-medium. #101418 ink,
 * #4A5261 body, #0B5CFF as an accent only.
 * ------------------------------------------------------------------ */

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

/** Section eyebrow: asterisk, then a tracked-out label in accent blue. */
function Eyebrow({ children, className = "" }) {
  return (
    <p
      className={`flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0B5CFF] ${className}`}
    >
      <Asterisk />
      {children}
    </p>
  );
}

/**
 * One row. Shared by both layouts, so a question looks and behaves the
 * same whichever way the section is arranged — only the frame around it
 * changes (`className`).
 */
function FaqItem({ item, index, isOpen, onToggle, className = "" }) {
  return (
    <div className={className}>
      <h3>
        <button
          type="button"
          id={`faq-btn-${index}`}
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${index}`}
          onClick={onToggle}
          className="
            group flex w-full cursor-pointer items-center justify-between
            gap-6 rounded-2xl px-4 py-6 text-left text-[15.5px]
            font-medium leading-6 text-[#101418] transition-colors
            duration-300 focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-[#0B5CFF] sm:px-5 sm:py-7
          "
        >
          <span className="pr-2">{item.q}</span>

          {/* Plus to cross on one transform: the bars never move relative
              to each other, the whole mark just turns 45°. */}
          <span
            aria-hidden="true"
            className={`
              relative flex h-9 w-9 shrink-0 items-center justify-center
              rounded-full transition-all duration-300 ease-out
              ${
                isOpen
                  ? "rotate-45 bg-[#0B5CFF]/[0.08]"
                  : "bg-[#F1F3F5] group-hover:bg-[#E9EDF2]"
              }
            `}
          >
            <span className="absolute h-[1.5px] w-3 bg-[#0B5CFF]" />
            <span className="absolute h-3 w-[1.5px] bg-[#0B5CFF]" />
          </span>
        </button>
      </h3>

      <div
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-btn-${index}`}
        /* Closed panels keep their content in the DOM for search and for
           the height transition, so they have to be taken out of the tab
           order by hand — any link in an answer is focusable otherwise. */
        inert={!isOpen}
        className={`
          grid transition-[grid-template-rows,opacity] duration-300 ease-out
          ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
        `}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl px-4 pb-7 text-[14.5px] leading-7 text-[#4A5261] sm:px-5 sm:pb-8">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection({
  faqs = [],
  eyebrow = "Questions",
  /* Nodes, not strings, so a page can break the line where it wants and
     keep the run in Recoleta. The blue full stop is added below. */
  title = (
    <>
      The ones we
      <br className="hidden lg:block" /> always get
    </>
  ),
  description = "Everything you need to know about our labs, learning environments, and practical technology training.",
  layout = "split",
  /* Index of the row open on first paint, or null for all closed. */
  defaultOpen = null,
  id = "faq",
  className = "",
}) {
  /* One index, or null. Opening a row closes whatever was open. */
  const [open, setOpen] = useState(defaultOpen);

  if (!faqs.length) return null;

  const toggle = (i) => setOpen((cur) => (cur === i ? null : i));

  const centered = layout === "centered";

  /* Index is carried on the item so the split below can keep a stable
     identity per row — the column arrays renumber, the state must not. */
  const items = faqs.map((f, i) => ({ ...f, i }));
  const columns = [
    items.filter((x) => x.i % 2 === 0),
    items.filter((x) => x.i % 2 === 1),
  ];

  const heading = (
    <>
      <Eyebrow className={centered ? "justify-center" : ""}>{eyebrow}</Eyebrow>

      <h2
        className={`
          mt-5 font-recoleta text-[2.4rem] font-medium uppercase
          leading-[1.02] tracking-[-0.025em] text-[#101418] sm:text-[3rem]
          ${centered ? "" : "max-w-sm"}
        `}
      >
        {title}
        <span className="text-[#0B5CFF]">.</span>
      </h2>

      {description && (
        <p
          className={`mt-6 max-w-sm text-[14px] leading-7 text-[#4A5261] ${
            centered ? "mx-auto max-w-lg" : ""
          }`}
        >
          {description}
        </p>
      )}
    </>
  );

  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-[#101418]/8 bg-[#FCFBF8] py-20 lg:py-28 ${className}`}
    >
      <Container>
        {centered ? (
          /* ---------------- centred heading, two card columns -------- */
          <>
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">{heading}</div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-14 grid items-start gap-4 lg:grid-cols-2 lg:gap-x-16">
                {columns.map((column, c) => (
                  <div key={c} className="flex flex-col gap-4">
                    {column.map((f) => (
                      <FaqItem
                        key={f.i}
                        item={f}
                        index={f.i}
                        isOpen={open === f.i}
                        onToggle={() => toggle(f.i)}
                        className={`rounded-2xl border bg-white transition-colors duration-300 ${
                          open === f.i
                            ? "border-[#0B5CFF]/30"
                            : "border-[#101418]/10 hover:border-[#101418]/20"
                        }`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </Reveal>
          </>
        ) : (
          /* ---------------- heading left, one ruled list right ------- */
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <Reveal>{heading}</Reveal>

            <Reveal delay={0.08}>
              <div className="w-full">
                {items.map((f) => (
                  <FaqItem
                    key={f.i}
                    item={f}
                    index={f.i}
                    isOpen={open === f.i}
                    onToggle={() => toggle(f.i)}
                    className={`border-b border-[#101418]/10 transition-colors duration-300 first:border-t ${
                      open === f.i ? "bg-white" : "hover:bg-[#F3F5F7]/60"
                    }`}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        )}
      </Container>
    </section>
  );
}
