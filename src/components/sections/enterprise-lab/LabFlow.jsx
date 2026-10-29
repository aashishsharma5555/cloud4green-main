import { useEffect, useRef, useState } from "react";
// import "./LabFlow.css";

/* ------------------------------------------------------------------ *
 * Enterprise Labs — request → provision → validate
 *
 * The whole loop is CSS keyframes on one 11s cycle. There is no clock
 * in JS and no React state driving frames; the only thing this file
 * does at runtime is flip `is-live` when the section is on screen, so
 * a loop nobody is looking at costs nothing.
 *
 * Retiming lives in LabFlow.css — there is a seconds → percent table
 * at the top of it.
 * ------------------------------------------------------------------ */

/* Swap `glyph` for your own <path>/<image> per provider. These are
   deliberately neutral marks, not the vendors' logos — drop the real
   licensed SVGs in when you wire this up (the same files the hero's
   partner row already uses). Geometry is centred on 0,0 in a 24-ish
   box, so a replacement only has to be drawn around the origin. */
const PROVIDERS = [
  { name: "AWS",    glyph: "M-11 4 a7 7 0 0 1 1 -13 a9 9 0 0 1 17 -1 a6 6 0 0 1 4 14 z" },
  { name: "AZURE",  glyph: "M0 -10 L11 8 L-11 8 Z" },
  { name: "GCP",    glyph: "M0 -11 L10 -5.5 L10 5.5 L0 11 L-10 5.5 L-10 -5.5 Z" },
  { name: "OPENAI", glyph: "M0 -10 a10 10 0 1 0 0.1 0 M0 -4 a4 4 0 1 0 0.1 0" },
  { name: "K8S",    glyph: "M0 -10 L8.7 -5 L8.7 5 L0 10 L-8.7 5 L-8.7 -5 Z M0 -4.5 L3.9 -2.2 L3.9 2.2 L0 4.5 L-3.9 2.2 L-3.9 -2.2 Z" },
  { name: "DOCKER", glyph: "M-10 -6 L0 -11 L10 -6 L10 6 L0 11 L-10 6 Z M-10 -6 L0 -1 L10 -6 M0 -1 V11" },
];

/** Index of the one that gets provisioned. Keep it in sync with QUERY. */
const ACTIVE = 3;
const QUERY = "openai labs";
const RESULT = "OpenAI Labs";

const CHIP = { w: 106, h: 78, gapX: 14, gapY: 14, x0: 782, y0: 180 };

export default function LabFlow({ className = "" }) {
  const ref = useRef(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setLive(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => setLive(e.isIntersecting),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`c4g-lab ${live ? "is-live" : ""} ${className}`}>
      <svg 
        viewBox="0 0 1200 500"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="A learner searches the lab catalogue, the request provisions a cloud environment, and it comes back ready."
      >
        <defs>
          <filter id="lf-shadow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="6" stdDeviation="9" floodColor="#0F1B2E" floodOpacity="0.07" />
          </filter>
          {/* the window that makes the pulse read as travelling */}
          <linearGradient id="lf-flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#000" />
            <stop offset="0.42" stopColor="#fff" />
            <stop offset="0.62" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
          <mask id="lf-window" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="500">
            <rect className="a-flow" x="0" y="380" width="330" height="120" fill="url(#lf-flow)" />
          </mask>
          <clipPath id="lf-type">
            <rect className="a-type" x="396" y="90" width="0" height="28" />
          </clipPath>
        </defs>

        {/* ---------- wire ---------- */}
        <path className="wire wire--base" d="M250 402 V452 H758 V330" />
        <g mask="url(#lf-window)">
          <path className="wire wire--live" d="M250 402 V452 H758 V330" />
        </g>

        <text className="t-micro a-capOut" x="504" y="440" textAnchor="middle" fill="#0B5CFF">
          REQUEST
        </text>
        <text className="t-micro a-capBack" x="504" y="440" textAnchor="middle" fill="#0B5CFF">
          ENVIRONMENT
        </text>

        <g className="a-packet">
          <circle cx="250" cy="402" r="15" fill="#0B5CFF" opacity="0.14" />
          <circle cx="250" cy="402" r="6.5" fill="#0B5CFF" />
        </g>

        {/* ---------- the person ---------- */}
        <g>
          <circle className="s-heavy" cx="250" cy="246" r="30" />

          {/* Shoulders run down and stop on the laptop's back edge. The hands
              are behind the machine, so there is nothing to draw — the same
              call the reference makes. */}
          <path
            className="s-heavy"
            d="M186 352 v-22 a64 64 0 0 1 34 -56 l30 26 l30 -26 a64 64 0 0 1 34 56 v22"
          />

          {/* back edge drawn straight through; the filled screen hides the
              middle, so what reads is two ends past the arms */}
          <path className="s-heavy" d="M168 352 H332" />
          {/* front edge, two short wedges off the bottom corners */}
          <path className="s-heavy" d="M198 388 l-16 -14 M302 388 l16 -14" />
          <rect className="s-heavy s-fill" x="198" y="316" width="104" height="72" rx="7" />

          <circle className="a-badge" cx="250" cy="352" r="17" fill="#0B5CFF" />
          <path
            d="M242 352 l6 6 l12 -13"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path className="s-heavy s-fill" d="M343 333 h32 l-5 57 h-22 z" />
          <rect className="s-heavy s-fill" x="338" y="322" width="42" height="11" rx="3.5" />
          <g className="a-steam" style={{ transformOrigin: "359px 312px" }}>
            <path className="s-fine" d="M359 314 c-7 -5 7 -11 0 -17" stroke="#7A8699" />
          </g>
        </g>

        {/* ---------- thought card ---------- */}
        <g className="a-think">
          <circle className="s-hair s-paper" cx="300" cy="216" r="7.5" />
          <circle className="s-hair s-paper" cx="282" cy="232" r="4.5" />

          <rect
            className="s-card"
            x="320" y="44" width="330" height="152" rx="16"
            fill="#fff" stroke="#C8D1DE" strokeWidth="1.6" filter="url(#lf-shadow)"
          />

          <text className="t-micro" x="344" y="74">SEARCH THE CATALOGUE</text>

          <rect className="s-hair s-fill" x="344" y="86" width="282" height="34" rx="9" />
          <circle className="s-hair" cx="366" cy="103" r="6" />
          <path className="s-hair" d="M370.5 107.5 L375 112" />

          {/* the clip rect widens in 11 steps — one per character */}
          <g clipPath="url(#lf-type)">
            <text className="t-body" x="396" y="108">{QUERY}</text>
          </g>
          <g className="a-caret">
            <rect className="a-blink" x="396" y="94" width="2" height="18" fill="#0F1B2E" />
          </g>

          <g className="a-result">
            <rect
              className="a-flash"
              x="344" y="132" width="282" height="42" rx="9"
              fill="#F1F5FF" stroke="#0B5CFF" strokeWidth="1.6"
            />
            <rect
              className="a-flashStroke"
              x="360" y="144" width="18" height="18" rx="5"
              fill="none" stroke="#0B5CFF" strokeWidth="1.6"
            />
            <path
              className="a-flashStroke"
              d="M364 153 h10 M369 148 v10"
              stroke="#0B5CFF" strokeWidth="1.7" strokeLinecap="round"
            />
            <text className="t-body a-flashText" x="390" y="158" fill="#0B5CFF">{RESULT}</text>
            <text className="t-micro a-flashText" x="608" y="158" textAnchor="end" fill="#0B5CFF">
              OPEN
            </text>
          </g>
        </g>

        {/* ---------- ready callout ---------- */}
        <g className="a-done">
          <circle className="s-hair s-paper" cx="222" cy="220" r="7" />
          <circle className="s-hair s-paper" cx="212" cy="242" r="4.5" />

          <rect
            className="s-card"
            x="24" y="88" width="206" height="116" rx="16"
            fill="#fff" stroke="#C8D1DE" strokeWidth="1.6" filter="url(#lf-shadow)"
          />
          <circle className="s-ok" cx="127" cy="130" r="24" fill="#12A150" />
          <path
            d="M117 130 l7 7 l13 -14"
            fill="none" stroke="#fff" strokeWidth="3.4"
            strokeLinecap="round" strokeLinejoin="round"
          />
          <text className="t-card" x="127" y="172" textAnchor="middle">Environment ready</text>
          <text className="t-micro" x="127" y="189" textAnchor="middle">VALIDATED · 8.4s</text>
        </g>

        {/* ---------- lab environment ---------- */}
        <g>
          <rect
            className="a-box"
            x="758" y="112" width="394" height="272" rx="18"
            fill="#fff" stroke="#0F1B2E" strokeWidth="2.5" filter="url(#lf-shadow)"
          />
          <path className="s-hair" d="M758 162 H1152" />
          <circle className="s-hair" cx="786" cy="138" r="4.5" />
          <circle className="s-hair" cx="802" cy="138" r="4.5" />
          <circle className="s-hair" cx="818" cy="138" r="4.5" />
          <text className="t-micro" x="838" y="143">LAB ENVIRONMENT</text>

          <g className="a-pillIdle">
            <rect x="1010" y="124" width="118" height="28" rx="14" fill="#F1F3F7" />
            <text className="t-micro" x="1069" y="142" textAnchor="middle" fill="#7A8699">READY</text>
          </g>
          <g className="a-pillWork">
            <rect x="1010" y="124" width="118" height="28" rx="14" fill="#E7EFFF" />
            <text className="t-micro" x="1069" y="142" textAnchor="middle" fill="#0B5CFF">PROVISIONING</text>
          </g>
          <g className="a-pillLive">
            <rect x="1010" y="124" width="118" height="28" rx="14" fill="#E6F6EC" />
            <text className="t-micro" x="1069" y="142" textAnchor="middle" fill="#12A150">RUNNING</text>
          </g>

          {PROVIDERS.map((p, i) => {
            const x = CHIP.x0 + (i % 3) * (CHIP.w + CHIP.gapX);
            const y = CHIP.y0 + Math.floor(i / 3) * (CHIP.h + CHIP.gapY);
            const on = i === ACTIVE;
            return (
              /* --i staggers the catalogue scan. It is the only animation on a
                 non-active chip, so shifting its delay shifts nothing else. */
              <g key={p.name} style={{ "--i": i }}>
                <rect
                  className={on ? "a-chipBox" : "a-scan"}
                  x={x} y={y} width={CHIP.w} height={CHIP.h} rx="10"
                  fill="#fff" stroke="#C8D1DE" strokeWidth="1.6"
                />
                <path
                  className={`s-glyph${on ? " a-chipInk" : ""}`}
                  d={p.glyph}
                  transform={`translate(${x + CHIP.w / 2},${y + 30})`}
                  fill="none" stroke="#0F1B2E" strokeWidth="1.8" strokeLinejoin="round"
                />
                <text
                  className={`t-micro${on ? " a-chipLbl" : ""}`}
                  x={x + CHIP.w / 2} y={y + 62} textAnchor="middle"
                >
                  {p.name}
                </text>
              </g>
            );
          })}

          <rect className="s-track" x="782" y="360" width="346" height="5" rx="2.5" fill="#EDF0F5" />
          <rect className="a-rail" x="782" y="360" width="0" height="5" rx="2.5" fill="#0B5CFF" />

          <rect
            className="a-ring"
            x="758" y="112" width="394" height="272" rx="18"
            fill="none" stroke="#0B5CFF" strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}