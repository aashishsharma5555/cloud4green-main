import { useEffect, useRef, useState } from "react";
import '@/styles/stats-section.css';
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CUE, STAGGER } from "@/components/motion/reveal-tokens";

/* ------------------------------------------------------------------ *
 * Stats — editorial.
 *
 * Replaces the brand band. Same three numbers, opposite register: a pale
 * tint of the brand for ground, the brand itself at display size, and a
 * loose twelve-column grid that leaves air where the eye expects a box.
 *
 * The numerals rise out of a clip rather than counting up. A counter is
 * the right motion when the number is small and the type is small — at
 * this size it reads as a slot machine, and "1M+" has nothing to count
 * anyway. One mechanism, and it works for every value.
 * ------------------------------------------------------------------ */

const STATS = [
  { key: "users", figure: "1M+", label: "learners trained" },
  { key: "years", figure: "13+", label: "years of enterprise L&D" },
  { key: "industries", figure: "20+", label: "industries served" },
];

export default function StatsSection({
  since = "Since 2013",
  /* Placeholder, and the one line here worth arguing over — see the note
     with the delivery. */
  headline = "Completion rates are only the surface.",
  notes = [
    "Through thirteen years of managed learning delivery,",
    "Cloud4Green Technologies runs the programmes that connect capability to the numbers a board actually reads.",
    "Skill Intelligence makes every hour of training measurable, and every gap in a workforce visible.",
  ],
  stats = STATS,
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    /* id: the product bar's "Impact" anchor — see src/config/productNav.js */
    <section id="impact" ref={ref} className={`figures ${inView ? "is-in" : ""}`}>
      <div className="figures__inner">
        {/* ------------------------------------------------ the claim */}
        <RevealGroup delay={CUE.lead} className="figures__head">
          {/* Sits in the first line's indent rather than in a column of
              its own — which is what lets the headline outdent under it
              instead of being pushed right for its whole depth. */}
          <span className="figures__since">{since}</span>
          <RevealItem as="h2" className="figures__title">{headline}</RevealItem>
        </RevealGroup>

        {/* The three notes are placed in separate grid cells, so a wrapper
            would break the grid; each carries its own step off CUE.follow. */}
        <Reveal as="p" delay={CUE.follow} className="figures__note figures__note--a">{notes[0]}</Reveal>
        <Reveal as="p" delay={CUE.follow + STAGGER} className="figures__note figures__note--b">{notes[1]}</Reveal>
        <Reveal as="p" delay={CUE.follow + STAGGER * 2} className="figures__note figures__note--c">{notes[2]}</Reveal>

        {/* ---------------------------------------------- the numbers */}
        <dl className="figures__list">
          {stats.map((s, i) => (
            <div className="figure" key={s.key} style={{ "--i": i }}>
              {/* The clip is the wrapper's job and the travel is the
                  inner span's, so the numeral slides up behind an edge
                  that never moves. */}
              <dd className="figure__value">
                <span className="figure__clip">
                  <span className="figure__num">{s.figure}</span>
                </span>
              </dd>
              <dt className="figure__label">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}