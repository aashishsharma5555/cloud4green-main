import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Container from "@/components/layout/Container";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CUE, EASE } from "@/components/motion/reveal-tokens";
import { Arrow, Eyebrow, FilterChips, Tag } from "@/components/customer-stories/parts";
import { CATEGORIES, updates } from "@/data/whatsNew";

/* The changelog: every update, newest first, grouped by month on a
   single rule down the left — the month is the landmark, the entries
   hang off it. Filter chips work exactly like the customer-stories grid. */

const monthOf = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { month: "long", year: "numeric" });

const dayOf = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

/* In-page anchors stay plain <a> so the browser scrolls; routes go
   through the router. */
function EntryLink({ href, children }) {
  const className =
    "mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[#0B5CFF] underline decoration-[#0B5CFF]/30 underline-offset-4 transition-colors duration-300 hover:decoration-[#0B5CFF]";
  return href.startsWith("#") ? (
    <a href={href} className={className}>
      {children}
      <Arrow />
    </a>
  ) : (
    <Link to={href} className={className}>
      {children}
      <Arrow />
    </Link>
  );
}

function Entry({ update }) {
  const launch = update.category === "Launch";

  return (
    <article
      className={`rounded-[18px] p-6 ring-1 transition-shadow duration-300 sm:p-7 ${
        launch
          ? "bg-gradient-to-br from-[#101418] to-[#1a1f29] text-white ring-white/5 shadow-[0_18px_40px_-24px_rgba(16,20,24,0.5)]"
          : "bg-white ring-[#101418]/8 shadow-[0_18px_40px_-30px_rgba(16,20,24,0.3)] hover:shadow-[0_22px_50px_-26px_rgba(11,92,255,0.3)]"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2.5">
        <Tag tone={launch ? "dark" : "light"}>{update.category}</Tag>
        <time
          dateTime={update.date}
          className={`text-[12px] font-medium ${launch ? "text-white/50" : "text-[#8A93A3]"}`}
        >
          {dayOf(update.date)}
        </time>
      </div>

      <h3
        className={`mt-4 font-recoleta text-[1.3rem] font-medium leading-[1.2] tracking-[-0.01em] ${
          launch ? "text-white" : "text-[#101418]"
        }`}
      >
        {update.title}
      </h3>

      <p className={`mt-2.5 text-[14.5px] leading-6 ${launch ? "text-white/70" : "text-[#4A5261]"}`}>
        {update.body}
      </p>

      {update.href && <EntryLink href={update.href}>{update.cta ?? "Learn more"}</EntryLink>}
    </article>
  );
}

export default function UpdatesTimeline() {
  const [category, setCategory] = useState("All");

  const shown = category === "All" ? updates : updates.filter((u) => u.category === category);

  /* Group by month, keeping the newest-first order of the data. */
  const months = [];
  for (const u of shown) {
    const m = monthOf(u.date);
    const last = months[months.length - 1];
    if (last?.month === m) last.items.push(u);
    else months.push({ month: m, items: [u] });
  }

  return (
    <section
      id="updates"
      aria-labelledby="updates-title"
      className="relative scroll-mt-24 border-b border-[#101418]/8 bg-[#FAFAF7] py-20 lg:py-28"
    >
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <RevealGroup delay={CUE.lead} className="max-w-[640px]">
            <RevealItem as="p">
              <Eyebrow>Release notes</Eyebrow>
            </RevealItem>

            <RevealItem
              as="h2"
              id="updates-title"
              className="mt-5 font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-[#101418] sm:text-[2.3rem] lg:text-[2.6rem]"
            >
              Everything we've shipped<span className="text-[#0B5CFF]">.</span>
            </RevealItem>

            <RevealItem as="p" className="mt-5 max-w-[540px] text-[15px] leading-7 text-[#4A5261] lg:text-[16px]">
              Launches, new labs, platform improvements and training updates — newest first.
            </RevealItem>
          </RevealGroup>

          <FilterChips
            label="Filter by category"
            options={CATEGORIES}
            value={category}
            onChange={setCategory}
            delay={CUE.follow}
          />
        </div>

        <RevealGroup delay={CUE.trail} className="mt-12 lg:mt-14">
          <RevealItem>
            {/* Geometry, so the pieces meet exactly:
                  rail x   5.5px on a phone, 200px on desktop (the label
                           column's right edge) — dots and rail are both
                           centred on it with -translate-x-1/2.
                  dot y    11px: the centre of the 22px month row.
                  branch   from the rail to each card's left edge, level
                           with the card's tag row.
                Each month draws its own stretch of rail, from its dot down
                to the next month's dot, so the line always starts and ends
                on a dot whatever the filter leaves. The last stretch fades
                out instead of stopping dead. */}
            <motion.div layout className="relative">
              <AnimatePresence mode="popLayout" initial={false}>
                {months.map((group, gi) => {
                  const last = gi === months.length - 1;
                  return (
                    <motion.div
                      key={group.month}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="relative grid gap-5 pb-12 last:pb-0 lg:grid-cols-[200px_1fr] lg:gap-0"
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute left-[5.5px] top-[11px] w-px -translate-x-1/2 lg:left-[200px] ${
                          last
                            ? "bottom-0 bg-gradient-to-b from-[#101418]/15 to-transparent"
                            : "-bottom-[11px] bg-[#101418]/15"
                        }`}
                      />

                      {/* Month label: above the entries on a phone, in its own
                          column on desktop, with the dot on the rail either way. */}
                      <div className="relative flex h-[22px] items-center gap-4 lg:block lg:pr-10">
                        <span
                          aria-hidden="true"
                          className="relative z-10 h-[11px] w-[11px] shrink-0 rounded-full bg-[#0B5CFF] ring-4 ring-[#0B5CFF]/15 lg:absolute lg:right-0 lg:top-[5.5px] lg:translate-x-1/2"
                        />
                        <h3 className="text-[12px] font-semibold uppercase leading-none tracking-[0.16em] text-[#101418] lg:text-right lg:leading-[22px]">
                          {group.month}
                        </h3>
                      </div>

                      <div className="space-y-4 pl-7 lg:pl-10">
                        {group.items.map((u) => (
                          <div key={u.id} className="relative">
                            <span
                              aria-hidden="true"
                              className="absolute -left-[22.5px] top-[35px] h-px w-[22.5px] bg-[#101418]/15 sm:top-[39px] lg:-left-10 lg:w-10"
                            />
                            <Entry update={u} />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}
