import { useEffect, useRef, useState } from "react";

import Sparkle from "@/components/preloader/Sparkle"; // ← adjust to where Sparkle lives
import { GLINT_CORE, GLINT_HALO } from "@/lib/glint";

/**
 * GridCorner — a patch of grid pinned to one corner of a section, with
 * flare sparkles that travel along its lines.
 *
 * Two of them bracket the content diagonally: one at the top-left, one at
 * the bottom-right. Each is a few cells across, brightest in its corner
 * and gone well before the middle, so the diagram and the copy sit on
 * clean paper and the grid reads as a quiet detail at the edges.
 *
 * How the motion works (all of it is grid arithmetic, no random numbers):
 *
 *   • Every position is written in *cells*, not pixels: "vertical line 2,
 *     from row 1 to row 3". At render time a cell is `cell` px, so the same
 *     choreography works at 120px on desktop and 64px on a phone.
 *
 *   • A sparkle is born at its first intersection (pops from nothing to a
 *     flash), then glides along its line. It travels small and flashes big
 *     on every intersection it crosses — that pulse, locked to the nodes, is
 *     what reads as "sparkling on the grid". At the last node it flashes
 *     once more and shrinks away, rests for `gap` seconds, and runs again.
 *     Always one way: a vertical mover only ever goes down its vertical
 *     line, a horizontal one only across its horizontal line.
 *
 *   • Behind it the line lights up: a 1px trail exactly on the grid line.
 *
 *   • The stars live *outside* the fade mask. Masked, a star near the edge
 *     of the fade had one arm bright and the other dimmed away, which read
 *     as a star cut in half. Instead each star takes the mask's value at
 *     the node it is on as a flat opacity, so it fades with the grid but is
 *     always drawn whole.
 *
 *   • Every corner is this same patch flipped into place — see CORNERS.
 */

const LINE = "rgba(16, 20, 24, 0.12)"; /* quiet, but it reads on the #FAFAF7 paper */
const GLIDE = "cubic-bezier(0.45, 0, 0.55, 1)"; /* slow into each node, slow out */
const TRAIL = 1.1; /* length of the lit streak behind the star, in cells */
const BIRTH = 0.4; /* s to pop in at the first node, and to shrink at the last */
const TRAVEL_SCALE = 0.75; /* size while gliding between nodes */
const FLASH_SCALE = 1.25; /* size at the peak of a node flash */
const SHOULDER = 0.22; /* how much of a hop, either side of a node, the flash takes */

/* Breakpoint → grid size. 120px matches the homepage cell. */
const SIZES = {
  desktop: { cell: 120, scale: 1 },
  mobile: { cell: 64, scale: 0.7 },
};

/* The fade, as CSS for the grid lines and as a number for the stars — keep
   the two in step. Full strength across the first third of the patch and
   gone by ~88% of the way to its far corner, so most of the patch is grid
   you can actually see and only its inner corner dissolves. An ellipse
   sized to the box means a wide patch fades along its width and a tall one
   along its height. */
const MASK =
  "radial-gradient(ellipse 100% 100% at 0% 0%, #000 32%, rgba(0,0,0,0.6) 60%, transparent 88%)";

function maskAt(x, y, w, h) {
  const r = Math.hypot(x / w, y / h);
  if (r <= 0.32) return 1;
  if (r <= 0.6) return 1 - ((r - 0.32) / 0.28) * 0.4;
  if (r <= 0.88) return 0.6 - ((r - 0.6) / 0.28) * 0.6;
  return 0;
}

/* Stars are a little brighter than the lines they sit on, but not by much:
   the whole patch is meant to be a detail you notice, not a feature. */
const starAlpha = (m) => Math.min(1, 0.15 + m * 0.6);

function useGridSize() {
  const [size, setSize] = useState(SIZES.desktop);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setSize(mq.matches ? SIZES.desktop : SIZES.mobile);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return size;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return reduced;
}

/* ---------------------------------------------------------------- pieces */

/**
 * The star itself, centred on its wrapper's origin. The wrapper is exactly
 * size × size (svg is display:block, line-height 0), so translate(-50%)
 * lands the star's centre on the intersection to the pixel — an inline svg
 * would add a baseline gap and sit a few px low.
 */
function Star({ starRef, size, color, halo, style }) {
  return (
    <div
      ref={starRef}
      className="absolute left-0 top-0 leading-[0]"
      style={{
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
        ...style,
      }}
    >
      <Sparkle variant="flare" size={size} color={color} halo={halo} className="block" />
    </div>
  );
}

/**
 * One cycle, in seconds (h = hop, B = BIRTH):
 *
 *   node 0      node 1      node 2          node n
 *   |pop|--glide--|--glide--| … --glide--|shrink|------ gap ------|
 *   0   B       B+h       B+2h         B+nh  B+nh+B             total
 *
 * Three animations share this one timing so they stay locked together:
 * the wrapper's position, the star's scale/opacity pulse, and the trail.
 */
function Mover({ axis, line, from, to, hop, gap = 2, delay, size, cell, w, h, reduced, color, halo }) {
  const ref = useRef(null);
  const starRef = useRef(null);
  const trailRef = useRef(null);
  const n = to - from;
  const vertical = axis === "y";
  const trailLen = Math.round(TRAIL * cell);

  /* +0.5 puts the star on the centre of the 1px line, not its left edge. */
  const xy = (i) => {
    const along = (from + i) * cell + 0.5;
    const across = line * cell + 0.5;
    return vertical ? [across, along] : [along, across];
  };
  const at = (i) => {
    const [x, y] = xy(i);
    return `translate(${x}px, ${y}px)`;
  };
  const alpha = (i) => starAlpha(maskAt(...xy(i), w, h));

  useEffect(() => {
    const el = ref.current;
    const star = starRef.current;
    const trail = trailRef.current;
    if (!el || !star || !trail || reduced) return;

    const T = (i) => BIRTH + i * hop; /* when the star is on node i */
    const end = T(n) + BIRTH;
    const total = end + gap;
    const o = (t) => Math.min(1, Math.max(0, t / total));
    const timing = {
      duration: total * 1000,
      delay: delay * 1000,
      iterations: Infinity,
      fill: "both",
    };

    /* Position: sit on node 0 while it pops, then one eased glide per cell. */
    const path = [
      { offset: 0, transform: at(0) },
      { offset: o(T(0)), transform: at(0), easing: GLIDE },
    ];
    for (let i = 1; i <= n; i++) {
      path.push({ offset: o(T(i)), transform: at(i), easing: GLIDE });
    }
    path.push({ offset: 1, transform: at(n) });

    /* Pulse: small while travelling, a quick swell on each node. The
       shoulders either side of a node keep the flash short, so it reads as
       a sparkle rather than a slow breath. */
    const c = "translate(-50%, -50%)";
    const s = (k) => `${c} scale(${k})`;
    const pulse = [
      { offset: 0, transform: s(0), opacity: 0, easing: "ease-out" },
      { offset: o(T(0)), transform: s(FLASH_SCALE), opacity: alpha(0), easing: "ease-in" },
    ];
    for (let i = 1; i <= n; i++) {
      const a = Math.min(alpha(i - 1), alpha(i));
      pulse.push(
        { offset: o(T(i - 1) + SHOULDER * hop), transform: s(TRAVEL_SCALE), opacity: a },
        { offset: o(T(i) - SHOULDER * hop), transform: s(TRAVEL_SCALE), opacity: a, easing: "ease-out" },
        { offset: o(T(i)), transform: s(FLASH_SCALE), opacity: alpha(i), easing: "ease-in" },
      );
    }
    pulse.push(
      { offset: o(end), transform: s(0), opacity: 0 },
      { offset: 1, transform: s(0), opacity: 0 },
    );

    /* Trail: grows out from behind the star once it leaves node 0, and at
       the end its tail catches up with the star as it shrinks away. */
    const sc = vertical ? "scaleY" : "scaleX";
    const tA = 0.8 * alpha(0);
    const streak = [
      { offset: 0, transform: `${sc}(0)`, opacity: 0 },
      { offset: o(T(0)), transform: `${sc}(0)`, opacity: 0 },
      { offset: o(T(0) + 0.7 * hop), transform: `${sc}(1)`, opacity: tA },
      { offset: o(T(n)), transform: `${sc}(1)`, opacity: tA },
      { offset: o(end), transform: `${sc}(0)`, opacity: 0 },
      { offset: 1, transform: `${sc}(0)`, opacity: 0 },
    ];

    const anims = [
      el.animate(path, timing),
      star.animate(pulse, timing),
      trail.animate(streak, timing),
    ];
    return () => anims.forEach((a) => a.cancel());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell, w, h, reduced, axis, line, from, to, hop, gap, delay]);

  /* The trail sits on the grid line itself (1px, centred on the same +0.5
     the star is) and points back along the direction of travel, brightest
     at the star. transform-origin is the star end, so scaling grows it out
     from behind the star. */
  const trailStyle = vertical
    ? {
        left: -0.5,
        top: -trailLen,
        width: 1,
        height: trailLen,
        background: `linear-gradient(to bottom, transparent, ${color})`,
        transformOrigin: "50% 100%",
      }
    : {
        top: -0.5,
        left: -trailLen,
        width: trailLen,
        height: 1,
        background: `linear-gradient(to right, transparent, ${color})`,
        transformOrigin: "100% 50%",
      };

  return (
    <div
      ref={ref}
      className="absolute left-0 top-0 will-change-transform"
      style={{ transform: at(0) }}
    >
      <div
        ref={trailRef}
        className="absolute"
        style={{ ...trailStyle, opacity: 0, display: reduced ? "none" : undefined }}
      />
      <Star
        starRef={starRef}
        size={size}
        color={color}
        halo={halo}
        style={{ opacity: reduced ? alpha(0) : 0 }}
      />
    </div>
  );
}

/**
 * A star that stays on its intersection and only twinkles: resting small,
 * with a quick flash on an irregular beat. `seed` offsets the phase so no
 * two stills pulse in step.
 */
function Still({ col, row, size, cell, w, h, reduced, color, halo }) {
  const ref = useRef(null);
  const x = col * cell + 0.5;
  const y = row * cell + 0.5;
  const peak = starAlpha(maskAt(x, y, w, h));
  const seed = col * 3 + row;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const c = "translate(-50%, -50%)";
    const a = el.animate(
      [
        { transform: `${c} scale(0.6)`, opacity: peak * 0.75 },
        { transform: `${c} scale(0.6)`, opacity: peak * 0.75, offset: 0.55, easing: "ease-out" },
        { transform: `${c} scale(1.1)`, opacity: peak, offset: 0.68, easing: "ease-in" },
        { transform: `${c} scale(0.6)`, opacity: peak * 0.75, offset: 0.85 },
        { transform: `${c} scale(0.6)`, opacity: peak * 0.75 },
      ],
      {
        duration: 2600 + (seed % 4) * 400,
        delay: -((seed * 530) % 2600), // negative = start mid-cycle
        iterations: Infinity,
      },
    );
    return () => a.cancel();
  }, [seed, reduced, peak]);

  return (
    <div
      className="absolute left-0 top-0"
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      <Star starRef={ref} size={size} color={color} halo={halo} style={{ opacity: peak * 0.75 }} />
    </div>
  );
}

/* ---------------------------------------------------------------- export */

/* Each corner is the top-left patch, flipped into place: mirrored across
   the y axis for the right-hand corners, across the x axis for the bottom
   ones, both for the diagonal. The star is 4-fold symmetric, so flipping
   it is invisible, and the grid, the fade and the motion all follow for
   free — "line 1" always means the first line in from the pinned corner. */
const CORNERS = {
  tl: "left-0 top-0",
  tr: "right-0 top-0 -scale-x-100",
  bl: "bottom-0 left-0 -scale-y-100",
  br: "bottom-0 right-0 rotate-180",
};

/**
 * @param corner  "tl" | "tr" | "bl" | "br" — the corner it is pinned to
 * @param cols    width of the patch, in cells
 * @param rows    height of the patch, in cells
 * @param movers  [{ axis: "x"|"y", line, from, to, hop (s per cell),
 *                   gap (s of rest between runs, default 2), delay (s) }]
 *                axis "y" = travels down vertical line `line`
 *                axis "x" = travels across horizontal line `line`
 *                Start `from` at 1, not 0: node 0 is on the section's edge,
 *                where half the star would be off the page.
 * @param stills  [{ col, row }] — intersections with a star that only twinkles
 * @param z       where the patch sits in its section's stack. -20 by default,
 *                which is under a scrim or bloom at -z-10 and under the
 *                content; a section whose backdrop is an <img> at -z-10 wants
 *                0 instead, so the grid lands on top of the picture rather
 *                than behind it.
 * @param color   the stars' core and trail colour — brand blue by default;
 *                a section on a blue ground passes white so they still show
 * @param halo    the stars' bloom colour, to go with `color`
 */
export default function GridCorner({
  corner = "tl",
  cols = 4,
  rows = 3,
  movers = [],
  stills = [],
  z = -20,
  color = GLINT_CORE,
  halo = GLINT_HALO,
  className = "",
}) {
  const { cell, scale } = useGridSize();
  const reduced = usePrefersReducedMotion();
  const w = cols * cell;
  const h = rows * cell;

  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none absolute",
        CORNERS[corner] ?? CORNERS.tl,
        className,
      ].join(" ")}
      style={{ width: w, height: h, zIndex: z }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${LINE} 1px, transparent 1px), linear-gradient(to bottom, ${LINE} 1px, transparent 1px)`,
          backgroundSize: `${cell}px ${cell}px`,
          maskImage: MASK,
          WebkitMaskImage: MASK,
        }}
      />

      {stills
        .filter((s) => s.col <= cols && s.row <= rows)
        .map((s, i) => (
        <Still
          key={`s${i}`}
          {...s}
          size={Math.round(26 * scale)}
          cell={cell}
          w={w}
          h={h}
          reduced={reduced}
          color={color}
          halo={halo}
        />
      ))}

      {movers
        /* Keep every walk inside the patch — no running off the end of a
           line the fade has already taken away. */
        .map((m) => ({ ...m, to: Math.min(m.to, m.axis === "y" ? rows : cols) }))
        .filter((m) => m.to > m.from && m.line <= (m.axis === "y" ? cols : rows))
        .map((m, i) => (
          <Mover
            key={`m${i}`}
            {...m}
            size={Math.round(38 * scale)}
            cell={cell}
            w={w}
            h={h}
            reduced={reduced}
            color={color}
            halo={halo}
          />
        ))}
    </div>
  );
}
