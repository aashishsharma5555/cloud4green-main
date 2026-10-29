import { useEffect, useRef } from "react";

import { BLINK_DOTS, BLINK_PERIOD } from "./blinkField";
import { DOT_VIEWBOX } from "./worldMapDots";

/**
 * Three of the map's blinking pixels, given a number to carry.
 *
 * Nothing is added to the artwork — each `x`/`y` below is a cell the map
 * already lights on its own beat, taken straight out of the BLINK_DOTS field in
 * blinkField.js, and the card runs on that cell's own phase. The label arrives
 * with the sparkle and leaves with it; between pops there is no marker, no
 * ring, nothing at all, and the map is just the map again.
 *
 * WHICH THREE. The blink field is 48 cells of blue noise, so almost any three
 * are "spread out" — but spread on the map is not spread in the composition.
 * Two things are already sitting on this artwork: the CTA row hangs over the
 * top-centre (roughly 35-65% across, down to ~15% of the map's height), and the
 * partner strip crosses the whole width from ~52% down. That leaves one clean
 * band, and the three below are the widest-spaced triangle inside it:
 *
 *      23% across, 21% down    North America
 *      55% across, 41% down    East Africa / Arabia
 *      81% across, 30% down    north-east Asia
 *
 * Evenly stepped across the width (23 / 55 / 81) and deliberately staggered in
 * height — no two share a line, because two labels at the same height read as a
 * row of two with a stray third rather than as three points on a map.
 *
 * POSITIONING is in the map's own viewBox units and converted to percentages
 * here. The SVG is `xMidYMid meet` in a box whose width is derived from the
 * same aspect ratio (see .hero-map), so the viewBox maps onto the element
 * exactly and a percentage is the same point at every window size. State a
 * coordinate once, and the card tracks its pixel from 1024px up to 2560.
 *
 * `side` is which way the card opens off its pin. The Asia pin is close enough
 * to the right edge that a card opening right would run into the feather on the
 * map's edge, so it opens left instead.
 */
const STATS = [
  { id: "years", x: 467, y: 165, side: "right", value: "13+", unit: "years" },
  { id: "users", x: 1090, y: 329, side: "right", value: "1M", unit: "users" },
  { id: "domains", x: 1612, y: 238, side: "left", value: "20+", unit: "domains" },
];

/**
 * Snap each stat to the lit cell nearest the coordinate above, and take that
 * cell's phase with it.
 *
 * The three coordinates ARE blink cells as written, so the snap itself is the
 * identity today — it is here because they only stay blink cells for as long as
 * nobody touches BLINK_SEED or BLINK_COUNT in blinkField.js. Change either and
 * the whole field is redrawn somewhere else, and without this the pins would be
 * left on three dead pixels: a label popping with no light under it, which is
 * the one thing this component must never be.
 *
 * `delay` is the half that matters at runtime. It is the cell's offset into the
 * shared beat, and handing it to the card is what puts the two in phase.
 */
const withNearestBlink = (stat) => {
  let best = null;
  let bestDist = Infinity;

  for (const dot of BLINK_DOTS) {
    const dx = dot.x - stat.x;
    const dy = dot.y - stat.y;
    const d = dx * dx + dy * dy;
    if (d < bestDist) {
      bestDist = d;
      best = dot;
    }
  }

  return best ? { ...stat, x: best.x, y: best.y, delay: best.delay } : stat;
};

const PINS = STATS.map(withNearestBlink);

// How far the card stands off the cell it belongs to.
//
// There is no marker under it. A ring around the pin was the obvious way to say
// "this light is the labelled one", and it was the wrong one: it is still there
// between pops, so the map carries three permanent targets and the label reads
// as hung off a pin rather than as thrown by the light. Nothing is drawn here
// but the card, and the sparkle the map was always going to fire is the marker.
//
// Which puts the star's own arms in the gap, so the offset is written in two
// parts. The sparkle is drawn in viewBox units and scales with the artwork —
// 26 units tip to tip, or 1.3% of the map's width, so 0.65% is its reach — and
// 8px of air past that is a gap the eye reads the same at any window size. A
// flat pixel offset would clear the arms on a laptop and sit inside them on a
// 2560 monitor.
const CARD_GAP = "calc(0.65% + 8px)";
const CARD_GAP_LEFT = "calc(-0.65% - 8px)";

/**
 * The pop, on the map's own beat.
 *
 * Same period, same phase and the same window as the cell underneath, so the
 * label arrives with the light and goes out with it. Between pops there is
 * nothing here at all — the map is exactly the map, and a pixel lighting up
 * somewhere in the field is occasionally a pixel with a number beside it.
 *
 * The stops are the CORE's, not the sparkle's. Worldmap.jsx draws three shapes
 * per lit cell and they do not share a curve: the star flashes hardest and
 * fades first, by 27%, while the core — the lit pixel itself — holds to 22% and
 * is gone at 30%. Matching the core is what makes the two read as one event,
 * and it is also the more legible of the two to hang type on, because it is the
 * one with a hold in the middle rather than a spike. That hold is 6% to 30% of
 * 7.2s, so a label is up for about 1.7s.
 *
 * To keep a number on screen longer, move the 30 and the 100 out together; the
 * card then outstays its star, which costs the seam but buys reading time.
 *
 * `opacity` and `scale` only — no travel. Tailwind places this element with the
 * `translate` property (v4 uses `translate`, not `transform`, for its translate
 * utilities), so a keyframe that animated `translate` would silently cancel the
 * vertical centring and the side-flip. `scale` is its own property and composes
 * with `translate` instead of replacing it.
 */
const POP_STYLES = `
@keyframes c4gStatPop {
  0%   { opacity: 0; scale: 0.96; }
  6%   { opacity: 1; scale: 1; }
  22%  { opacity: 1; scale: 1; }
  30%  { opacity: 0; scale: 0.99; }
  100% { opacity: 0; scale: 0.96; }
}

.hero-stat-card {
  opacity: 0;
  animation-name: c4gStatPop;
  animation-duration: ${BLINK_PERIOD}s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

/* Off-screen the beat stops, for the same reason the map's does — see the
   observer in Worldmap.jsx. Paused rather than removed, so scrolling back finds
   each card mid-cycle instead of restarting all three together. */
[data-stats-paused="true"] .hero-stat-card {
  animation-play-state: paused;
}

/* Nothing to pop for a reader who has asked for stillness, so the numbers
   simply stand on the map. */
@media (prefers-reduced-motion: reduce) {
  .hero-stat-card {
    opacity: 1;
    animation: none;
  }
}
`;

const HeroMapStats = () => {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        layer.dataset.statsPaused = String(!entry.isIntersecting);
      },
      { rootMargin: "200px" },
    );

    observer.observe(layer);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={layerRef} className="hero-stats">
      <style>{POP_STYLES}</style>

      {/* Cards are hung directly off .hero-stats, which is `inset: 0` on the
          map's own box — so the percentages below are percentages of the
          artwork, and the same coordinate is the same dot at every width. */}
      {PINS.map((stat) => (
        <p
          key={stat.id}
          className={`hero-stat-card absolute flex items-baseline gap-1.5 whitespace-nowrap rounded-lg border border-[#0B5CFF]/15 bg-white/85 px-2.5 py-1.5 shadow-[0_8px_24px_-16px_rgba(16,20,24,0.5)] ${
            stat.side === "right"
              ? "-translate-y-1/2"
              : "-translate-x-full -translate-y-1/2"
          }`}
          style={{
            left: `${(stat.x / DOT_VIEWBOX.width) * 100}%`,
            top: `${(stat.y / DOT_VIEWBOX.height) * 100}%`,
            marginInlineStart:
              stat.side === "right" ? CARD_GAP : CARD_GAP_LEFT,
            // Negative, so the card is already mid-cycle on first paint rather
            // than starting its run at zero — the same way the cells themselves
            // are offset in Worldmap.jsx, and with the same number, which is
            // what holds the two in phase.
            animationDelay: `-${stat.delay}s`,
          }}
        >
          <span className="text-[12.5px] font-semibold leading-none tabular-nums tracking-[-0.01em] text-[#0B5CFF]">
            {stat.value}
          </span>
          <span className="text-[11px] leading-none text-[#4A5261]/75">
            {stat.unit}
          </span>
        </p>
      ))}
    </div>
  );
};

export default HeroMapStats;
