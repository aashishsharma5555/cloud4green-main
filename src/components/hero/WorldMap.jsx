import { useEffect, useRef } from "react";

import {
  GLINT_CORE,
  GLINT_HALO,
  GLINT_HALO_OPACITY,
  glintPath,
} from "@/lib/glint";
import { BLINK_DOTS, BLINK_PERIOD } from "./blinkField";
import { DOT_VIEWBOX, WORLD_MAP_DOTS } from "./worldMapDots";

/**
 * Pixel-matrix world map, rendered as a single SVG path.
 *
 * This replaces the old react-three-fiber globe. A sphere can only ever show
 * one hemisphere, which is why the 3D version could never match the reference:
 * the artwork shows the Americas, Africa, Europe, Asia and Australia at once.
 * It's a flat map with the curvature baked into the dot positions.
 *
 * Dot coordinates are pre-computed in Worldmapdots.js (extracted straight from
 * src/assets/images/map.jpg). Regenerate with scripts/generate-world-map-dots.py.
 *
 * Some of the cells blink: a second, brighter and slightly larger square is
 * drawn on top of the static one and pops in with opacity + scale, so the field
 * feels alive rather than flashing.
 *
 * Cell shape and tightness are governed by PIXEL_SIDE below â€” that's the one
 * number to move to open the grid back up or weld it solid.
 */

// Square "pixels" rather than round dots, sized to the reference artwork.
//
// The field sits on a ~12-unit pitch (10 where the map's baked-in curvature
// squeezes rows together, 13.6 at its loosest). Measuring map.jpg gives a
// square/pitch ratio of 0.59 â€” so the reference is deliberately *airy*: the
// square is about 3 units of ink to 2 of gap, and cells never touch. That
// separation is what keeps the grid reading as a grid at small sizes.
//
// 0.59 x 12 = 7.05. Cross-check: the old circle's r=4.1 was tuned so a dot
// carried the same ink as the artwork's own, and the equal-ink square for it is
// sqrt(pi) x 4.1 = 7.27. Two independent measurements, so 7.2 sits between them.
//
// Raise toward 12 to close the seams and weld coastlines into solid blocks;
// lower to open the field back up.
const PIXEL_SIDE = 7.2;

// ~3,400 pixels as one <path> rather than one node each: identical output,
// but a single DOM node instead of 3,400. Built once at module load.
const DOT_PATH = (() => {
  const s = PIXEL_SIDE;
  const h = s / 2;
  let out = "";
  for (let i = 0; i < WORLD_MAP_DOTS.length; i += 2) {
    const x = WORLD_MAP_DOTS[i] - h;
    const y = WORLD_MAP_DOTS[i + 1] - h;
    out += `M${x} ${y}h${s}v${s}h${-s}z`;
  }
  return out;
})();

// Each highlight is three shapes, back to front: a square bloom that keeps the
// glow the shape of the cell emitting it, a four-point sparkle whose arms reach
// past that bloom, and a crisp core sitting exactly on one grid cell.
//
// The three animate on one shared beat but not on one curve. The core holds
// steady while lit; the bloom swells outward as it fades, which is what sells
// it as light rather than as a second, bigger pixel; the sparkle bursts from
// near-nothing and fades first, so the twinkle reads as a flash of light rather
// than as a star sitting permanently on the map.
//
// A gentle swell rather than a hard pop: the core only shrinks to 0.7, and the
// fades are long relative to the hold, so movement is felt at the edge of
// vision instead of snapping the eye to it. Lit for ~28% of each cycle, which
// at BLINK_COUNT leaves roughly a dozen pixels up at any moment.
//
// Every pixel shares BLINK_PERIOD, so the duration lives here rather than being
// set inline on every node â€” only the phase offset varies per pixel.
const BLINK_STYLES = `
@keyframes c4gMapBlink {
  0%   { opacity: 0; transform: scale(0.7); }
  6%   { opacity: 1; transform: scale(1); }
  22%  { opacity: 1; transform: scale(1); }
  30%  { opacity: 0; transform: scale(0.85); }
  100% { opacity: 0; transform: scale(0.7); }
}
@keyframes c4gMapGlow {
  0%   { opacity: 0; transform: scale(0.45); }
  6%   { opacity: 1; transform: scale(0.95); }
  22%  { opacity: 0.8; transform: scale(1.1); }
  30%  { opacity: 0; transform: scale(1.25); }
  100% { opacity: 0; transform: scale(0.45); }
}
@keyframes c4gMapSpark {
  0%   { opacity: 0; transform: scale(0.15); }
  7%   { opacity: 1; transform: scale(1); }
  18%  { opacity: 0.5; transform: scale(1.08); }
  27%  { opacity: 0; transform: scale(1.18); }
  100% { opacity: 0; transform: scale(0.15); }
}
.c4g-map-blink,
.c4g-map-glow,
.c4g-map-spark {
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
  animation-duration: ${BLINK_PERIOD}s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
.c4g-map-blink { animation-name: c4gMapBlink; }
.c4g-map-glow  { animation-name: c4gMapGlow; }
.c4g-map-spark { animation-name: c4gMapSpark; }
@media (prefers-reduced-motion: reduce) {
  .c4g-map-blink,
  .c4g-map-glow,
  .c4g-map-spark { animation: none; }
}

/* Off-screen, the beat stops. See the observer in the component for why: this
   is 288 animated nodes, and nothing about them is free once the map has
   scrolled away. */
[data-blink-paused="true"] .c4g-map-blink,
[data-blink-paused="true"] .c4g-map-glow,
[data-blink-paused="true"] .c4g-map-spark { animation-play-state: paused; }
`;

export const WORLD_MAP_ASPECT = DOT_VIEWBOX.width / DOT_VIEWBOX.height; // â‰ˆ 2.51

// The bloom is the cell's own square, drawn larger â€” as concentric squares at
// low opacity rather than as a blurred one.
//
// feGaussianBlur was the obvious route and is the wrong one here: an SVG filter
// is an offscreen pass, and these squares animate, so the blur is recomputed
// every frame â€” 48 buffers per frame if applied per pixel, or one buffer the
// size of the whole map if applied to the group. Stacked rects are plain
// geometry the compositor already knows how to animate.
//
// Falloff comes for free from the stacking: each ring is a full square, not an
// outline, so K overlapping rings at alpha a leave 1-(1-a)^K at the centre and
// a single a at the rim. Monotonic, and quantised into square steps â€” which is
// how pixel art draws a glow anyway.
//
// Ratios are geometric (~1.3x per ring), so the steps fall off in proportion
// rather than in equal widths; equal widths read as a target, not a glow.
// Kept tight on purpose now that the sparkle carries the reach: a bloom as wide
// as the star's arms swallows them and the whole thing collapses back into a
// plus sign. The bloom is the cell's own light; the star is what travels.
const GLOW_RINGS = [2.0, 1.7, 1.45, 1.2]; // widths in cells, outermost first
const GLOW_RING_ALPHA = 0.13; // per ring, before the highlight's own alpha

// --- Sparkle -------------------------------------------------------------
// A four-point star sitting under each lit pixel, arms on the axes so it lines
// up with the grid rather than cutting across it.
//
// It is the preloader's glint, not a second star drawn to match it. The shape
// used to be built here from its own waist parameter, and the two were never
// actually the same: this one's control points sat on the axes near the
// centre, which put the waist at 0.24 of the arm length against the mark's
// 0.39 â€” thinner, spikier, a different family. Both now come out of
// src/lib/glint.js, so they cannot drift again.
//
// REACH is the star's full span in cells, measured the same way as the bloom
// rings so the two are directly comparable. The arms have to clear the bloom
// by a cell or so â€” that gap is what makes the shape read as a sparkle rather
// than as a plus sign sitting in a haze â€” and past that, smaller is better.
//
// The mark's glint carries much more ink than the needle this replaced: fuller
// arms, an opaque brand-blue core and a halo under it. At the 6 the needles
// wanted, all three together stopped being background and started pulling the
// eye off the headline. So the star is scaled back to just clear the bloom,
// and the ink is taken down with it. This is ambient light on a backdrop; it
// should be noticed on the second look, not the first.
const SPARKLE_REACH = 3.6;
const SPARKLE_ALPHA = 0.55; // the glint's own colour is strong â€” carry it lightly
const SPARKLE_RADIUS = (PIXEL_SIDE * SPARKLE_REACH) / 2;
const SPARKLE_PATH = glintPath(SPARKLE_RADIUS);

// The preloader lays a blurred copy of the glint under the crisp one. A blur
// is out of the question on 48 forever-animating nodes â€” that is an offscreen
// raster pass per node per frame, and the reason the bloom above is stacked
// squares rather than a feGaussianBlur.
//
// A wide, translucent stroke of the star's own outline gets to the same
// picture for nothing: `paint-order: stroke fill` lays the halo down first and
// drops the crisp core on top, so one node carries both layers. Half the
// stroke falls outside the path, so the width is twice the bleed wanted â€”
// 0.09 of the mark's size in the preloader, which is 0.18 of its radius.
const SPARKLE_HALO_WIDTH = SPARKLE_RADIUS * 0.36;

// A light, vivid blue rather than the deep brand navy: against a pale gray base
// a dark highlight just reads as "heavier gray", where a brighter one separates
// on hue and actually looks lit.
const WorldMap = ({
  className,
  highlight = "#639df3c0",
  /* The glint keeps the mark's own colours rather than the pixel's. A lit cell
     is the map's light â€” pale, so it separates from the gray field without
     shouting â€” while the star is the brand glint, and the two read as one
     thing lighting up because the star sits on top of the cell it belongs to. */
  sparkleColor = GLINT_CORE,
  sparkleHalo = GLINT_HALO,
  ...props
}) => {
  const svgRef = useRef(null);

  /* The blink is 48 cells x (4 bloom rings + a sparkle + a core) = 288 nodes,
   * each running an opacity + transform animation forever. Blink can't hand a
   * transform animation on an SVG child to the compositor, so all 288 are
   * updated on the main thread every frame for as long as the page is open â€”
   * including while the reader is somewhere else entirely.
   *
   * That budget is not free anywhere, but the place it is *felt* is the
   * products section below, which drives its horizontal travel from the scroll
   * position on that same thread. Whatever the map spends there is spent out
   * of the frame that section has to draw in.
   *
   * So the beat runs while the map is on screen and stops when it isn't. It is
   * paused rather than removed: play-state leaves each pixel's phase where it
   * was, so scrolling back up resumes the rotation mid-cycle instead of
   * restarting all 48 of them together, which would strobe.
   *
   * The 200px margin starts it just before the map is actually visible, so it
   * is never caught mid-pause on the way in. */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        svg.dataset.blinkPaused = String(!entry.isIntersecting);
      },
      { rootMargin: "200px" },
    );

    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${DOT_VIEWBOX.width} ${DOT_VIEWBOX.height}`}
      preserveAspectRatio="xMidYMid meet"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <style>{BLINK_STYLES}</style>

      {/* At the reference's PIXEL_SIDE the cells never touch, so fill-rule is
          moot â€” but raise PIXEL_SIDE past the ~9-unit tightest pitch and they
          do overlap, where nonzero merges them into a solid block and even-odd
          would punch holes. It's the default; stated so it survives that. */}
      <path d={DOT_PATH} fillRule="nonzero" />

      {/* Every bloom paints beneath every core, so one pixel's halo can never
          wash over its neighbour's core. */}
      <g fill={highlight} fillOpacity={GLOW_RING_ALPHA}>
        {BLINK_DOTS.map((dot) =>
          GLOW_RINGS.map((ring) => {
            const side = PIXEL_SIDE * ring;
            return (
              <rect
                key={`${dot.x}-${dot.y}-${ring}`}
                className="c4g-map-glow"
                x={dot.x - side / 2}
                y={dot.y - side / 2}
                width={side}
                height={side}
                style={{ animationDelay: `-${dot.delay}s` }}
              />
            );
          }),
        )}
      </g>

      {/* Sparkle above the bloom, below the core. The path is built centred on
          the origin and moved into place by the wrapper <g>, so the CSS scale
          on the path itself is free to use its own centre as the origin â€”
          putting both on one element would have the animation overwrite the
          positioning transform. */}
      <g
        fill={sparkleColor}
        fillOpacity={SPARKLE_ALPHA}
        stroke={sparkleHalo}
        strokeOpacity={GLINT_HALO_OPACITY * SPARKLE_ALPHA}
        strokeWidth={SPARKLE_HALO_WIDTH}
        strokeLinejoin="round"
        style={{ paintOrder: "stroke fill" }}
      >
        {BLINK_DOTS.map((dot) => (
          <g key={`${dot.x}-${dot.y}`} transform={`translate(${dot.x} ${dot.y})`}>
            <path
              className="c4g-map-spark"
              d={SPARKLE_PATH}
              style={{ animationDelay: `-${dot.delay}s` }}
            />
          </g>
        ))}
      </g>

      {/* Core: exactly one grid cell, so a lit pixel lines up with the pixel it
          replaces instead of bulging past it. */}
      <g fill={highlight}>
        {BLINK_DOTS.map((dot) => (
          <rect
            key={`${dot.x}-${dot.y}`}
            className="c4g-map-blink"
            x={dot.x - PIXEL_SIDE / 2}
            y={dot.y - PIXEL_SIDE / 2}
            width={PIXEL_SIDE}
            height={PIXEL_SIDE}
            style={{ animationDelay: `-${dot.delay}s` }}
          />
        ))}
      </g>
    </svg>
  );
};

export default WorldMap;
