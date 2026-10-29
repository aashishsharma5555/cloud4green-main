import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import "@/styles/cert-benefits.css";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";

/* ------------------------------------------------------------
   Content — edit freely. `art` is the illustration component.
------------------------------------------------------------ */
const BENEFITS = [
  {
    title: "Stand out to recruiters and hiring managers",
    text: "with a digital badge that can be shared on your resume and social profiles.",
    art: BadgeArt,
    tone: "tint",
  },
  {
    title: "Validate your skills to current and future employers",
    text: "who know that hands-on, lab-verified skills are the industry standard for shipping reliable cloud work.",
    art: ShieldArt,
    tone: "plain",
  },
  {
    title: "Distinguish yourself when networking",
    text: "or collaborating with your peers in the cloud and IT community.",
    art: NetworkArt,
    tone: "brand",
  },
];

export default function CertBenefits() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const countRef = useRef(null);
  const barRef = useRef(null);
  const copyRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean);
    let frame = null;

    /* Runs once per animation frame while scrolling.
       We write CSS variables / textContent directly instead of
       using setState, so React doesn't re-render on every scroll. */
    const update = () => {
      frame = null;
      const stickyTop =
        parseFloat(getComputedStyle(section).getPropertyValue("--cb-sticky-top")) || 0;
      let active = 0;

      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (next) {
          const h = card.offsetHeight;
          const nextTop = next.getBoundingClientRect().top;
          // 0 = next card hasn't reached this one, 1 = fully covering it
          const p = Math.min(Math.max(1 - (nextTop - stickyTop) / h, 0), 1);
          card.style.setProperty("--p", p.toFixed(3));
        }
        if (card.getBoundingClientRect().top <= stickyTop + 2) active = i;
      });

      if (countRef.current) countRef.current.textContent = String(active + 1).padStart(2, "0");
      if (barRef.current) barRef.current.style.width = `${((active + 1) / cards.length) * 100}%`;
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    /* The sticky copy is taller than a card, so it would start scrolling
       away before the last card. Extend the grid by the difference so
       both hit the end of the section together. Layout-only: runs on resize. */
    const syncTail = () => {
      const copy = copyRef.current;
      const last = cards[cards.length - 1];
      const sticky = copy && getComputedStyle(copy).position === "sticky";
      const extra = sticky && last ? Math.max(copy.offsetHeight - last.offsetHeight, 0) : 0;
      section.style.setProperty("--cb-tail", `${extra}px`);
    };

    const onResize = () => {
      syncTail();
      onScroll();
    };

    syncTail();
    update();
    const ro = new ResizeObserver(onResize);
    ro.observe(copyRef.current);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    /* id: the product bar's "Benefits" anchor — see src/config/productNav.js */
    <section
      id="benefits"
      className="cb-section"
      ref={sectionRef}
      aria-labelledby="cb-title"
    >
      <div className="cb-wrap">
        {/* ---------- Stacking cards (left) ---------- */}
        {/* The cards own their transform (the stacking tilt reads --p), so
            the entrance goes on the stack around them, not on each card. */}
        <Reveal delay={CUE.follow} className="cb-stack">
          {BENEFITS.map(({ title, text, art: Art, tone }, i) => (
            <article
              key={title}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`cb-card cb-card--${tone}`}
            >
              <div className="cb-card__art" aria-hidden="true">
                <Art />
              </div>
              <div className="cb-card__body">
                <span className="cb-card__num">{String(i + 1).padStart(2, "0")}</span>
                <p>
                  <strong>{title}</strong> {text}
                </p>
              </div>
            </article>
          ))}
        </Reveal>

        {/* ---------- Sticky copy (right) ---------- */}
        {/* The group itself doesn't move (no `rise`), so the sticky box is
            never transformed — only its children are. */}
        <RevealGroup delay={CUE.lead} className="cb-copy" ref={copyRef}>
          <RevealItem as="span" className="cb-eyebrow">
            {/* the brand asterisk, same mark as CertHero's eyebrow */}
            <svg viewBox="0 0 24 24" aria-hidden="true" strokeWidth="2.4" strokeLinecap="round">
              <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
            </svg>
            Why get certified
          </RevealItem>
          <RevealItem as="h2" id="cb-title">
            Prove your abilities and accelerate your career<span className="cb-dot">.</span>
          </RevealItem>
          <RevealItem as="p">
            Advance your career by getting your skills tested and verified by the
            Cloud4Green team. If you've peeked at our <a href="#">job board</a> lately,
            you'll know that demand for experienced cloud engineers is on the rise.
          </RevealItem>
          <RevealItem as="p" className="cb-copy__lead">With a Cloud4Green certification, you can:</RevealItem>

          <RevealItem className="cb-progress" aria-hidden="true">
            <strong ref={countRef}>01</strong>
            <span>/ {String(BENEFITS.length).padStart(2, "0")}</span>
            <span className="cb-bar">
              <i ref={barRef} />
            </span>
          </RevealItem>

          <RevealItem className="cb-actions">
            <Button arrow render={<Link to="/contact" />}>
              Register now
            </Button>
            <Button variant="paper" arrow render={<a href="#certification-tracks" />}>
              View certification paths
            </Button>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   Illustrations — line-icon style to match the hero catalogue.
   `currentColor` lets CSS control the stroke colour per card.
------------------------------------------------------------ */
function BadgeArt() {
  return (
    <svg viewBox="0 0 240 180" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="40" y="18" width="116" height="146" rx="10" fill="#fff" />
      <circle cx="70" cy="50" r="12" />
      <path d="M90 44h44M90 56h28M58 86h80M58 100h66M58 114h74M58 136h46" />
      <path d="M178 86l30 17v34l-30 17-30-17v-34z" fill="#fff" />
      <path d="M165 120l9 9 17-19" stroke="var(--cb-blue)" strokeWidth="4" />
    </svg>
  );
}

function ShieldArt() {
  return (
    <svg viewBox="0 0 240 180" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="30" y="112" width="24" height="46" rx="4" fill="#fff" />
      <rect x="64" y="90" width="24" height="68" rx="4" fill="#fff" />
      <rect x="98" y="64" width="24" height="94" rx="4" fill="var(--cb-blue)" stroke="var(--cb-blue)" />
      <path d="M176 22l40 14v36c0 30-20 52-40 62-20-10-40-32-40-62V36z" fill="#fff" />
      <path d="M160 78l11 11 21-23" stroke="var(--cb-blue)" strokeWidth="5" />
      <path d="M22 164h200" />
    </svg>
  );
}

function NetworkArt() {
  return (
    <svg viewBox="0 0 240 180" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <g strokeDasharray="3 7">
        <path d="M120 90L52 42M120 90l70-48M120 90L58 146M120 90l66 56" />
      </g>
      <g fill="var(--cb-blue)">
        <circle cx="52" cy="42" r="15" /><circle cx="190" cy="42" r="13" />
        <circle cx="58" cy="146" r="13" /><circle cx="186" cy="146" r="15" />
      </g>
      <circle cx="120" cy="90" r="30" fill="#fff" stroke="#fff" />
      <circle cx="120" cy="82" r="9" stroke="var(--cb-blue)" strokeWidth="3" />
      <path d="M104 106c4-12 28-12 32 0" stroke="var(--cb-blue)" strokeWidth="3" />
    </svg>
  );
}