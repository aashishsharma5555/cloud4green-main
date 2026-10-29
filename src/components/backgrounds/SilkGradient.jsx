/**
 * SilkGradient — a silk backdrop on the navbar's own off-white, drawn in CSS
 * alone.
 *
 * There is no background wash: the section stays #FAFAF7 (the navbar's
 * paper) and only the ribbons carry colour — a pale periwinkle body with a
 * lavender falloff, and white gloss along each crest. Between the ribbons
 * the page is exactly the header's colour.
 *
 * No images, no SVG, no JS: every fold is a very large ellipse (a div with
 * border-radius: 50%) placed mostly off-canvas, so only one long arc of its
 * edge crosses the section. Each fold is three layers of that ellipse:
 *
 *   shade  — no fill, only a soft offset periwinkle box-shadow: the body
 *            of the ribbon on the far side of the crest;
 *   body   — a white gradient fill, blurred so it has no hard edge: the
 *            light lying on the cloth just inside the crest;
 *   rim    — a 2px white ring (a gradient border cut out with a mask),
 *            softly blurred: the sheen along the turn of the fabric.
 *
 * Geometry is in % of the section, fitted at 1440×800: the main crest
 * enters on the left at ~43% height, bottoms out at ~50% a quarter of the
 * way across, and sweeps up to leave through the top edge on the right;
 * the inner crease runs down from the top-left corner to meet it; the
 * lower fold rises gently along the foot. The crest's dip is held at half
 * height on purpose — under the diagram, above the headline — so the copy
 * and the buttons sit on clean paper between the two folds.
 */

/* The silk's two colours, and nothing else: a pale periwinkle for the body
   of each ribbon (never grey — grey reads as dirt on off-white), a softer
   lavender where the ribbon turns away, and white for the gloss. */
const PERI = (a) => `rgba(176, 186, 242, ${a})`;
const LAV = (a) => `rgba(206, 200, 246, ${a})`;
const WHITE = (a) => `rgba(255, 255, 255, ${a})`;

/* Cuts the background down to its 2px padding ring. */
const RING_MASK = "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)";

const ELLIPSE = { position: "absolute", inset: 0, borderRadius: "50%" };

/* `composite`: the mask is several gradients, and the fold shows only
   where all of them are opaque. */
function Fold({ box, fill, shade, blur = 12, rim = 1, mask, composite = false }) {
  return (
    <div
      style={{
        position: "absolute",
        ...box,
        maskImage: mask,
        WebkitMaskImage: mask,
        ...(composite && { maskComposite: "intersect", WebkitMaskComposite: "source-in" }),
      }}
    >
      <div style={{ ...ELLIPSE, boxShadow: shade }} />
      <div style={{ ...ELLIPSE, background: fill, filter: `blur(${blur}px)` }} />
      <div
        style={{
          ...ELLIPSE,
          padding: 2,
          background: WHITE(1),
          opacity: rim,
          filter: "blur(1.2px)",
          /* The shorthand, not mask-image: `content-box` is a mask-clip
             value and only parses inside `mask`. */
          mask: RING_MASK,
          WebkitMask: RING_MASK,
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />
    </div>
  );
}

export default function SilkGradient({ className = "", opacity = 1 }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-30 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      {/* The lower fold: its top edge is the crest rising from the
          bottom-left. White along the crest, a faint shadow above it. */}
      <Fold
        box={{ left: "-62.5%", top: "86%", width: "278%", height: "175%" }}
        fill={`linear-gradient(180deg, ${WHITE(0.95)} 0%, ${WHITE(0.5)} 6%, ${WHITE(0)} 16%)`}
        shade={`0 -30px 70px -16px ${PERI(0.32)}, 0 -70px 90px -30px ${LAV(0.22)}`}
        rim={0.95}
      />

      {/* The main crest — the long sweep. A huge ellipse hung from far
          above: only its bottom is on screen, so its edge enters on the
          left, dips, and climbs out through the top-right corner. The
          light sits just inside the edge; the shadow falls below it. */}
      <Fold
        box={{ left: "-52%", top: "-158.5%", width: "160%", height: "249%" }}
        fill={`radial-gradient(ellipse 50% 50% at 50% 50%, ${WHITE(0)} 78%, ${WHITE(0.75)} 93%, ${WHITE(1)} 98%, ${WHITE(0.9)} 100%)`}
        shade={`0 34px 70px -12px ${PERI(0.50)}, 0 8px 18px -6px ${PERI(0.1)}, 0 100px 110px -30px ${LAV(0.2)}`}
        rim={1}
      />

      {/* The second gloss on the main ribbon: the same crest, dropped a
          little lower, as a soft white streak only — silk catches the light
          twice as it rolls over, which is the double sheen in the
          reference. */}
      <div
        style={{
          position: "absolute",
          left: "-52%",
          top: "-191%",
          width: "160%",
          height: "249%",
          borderRadius: "50%",
          border: `3px solid ${WHITE(0.9)}`,
          filter: "blur(3px)",
        }}
      />

      {/* The inner crease, running down from the top-left corner to meet
          the main crest. Only its left-hand arc is wanted: the right half
          of the ellipse is masked away, and so is its bottom, so the crease
          melts into the main crest instead of ending in a corner. */}
      <Fold
        box={{ left: "-0.7%", top: "-120%", width: "50%", height: "222%" }}
        fill={`radial-gradient(ellipse 50% 50% at 50% 50%, ${WHITE(0)} 80%, ${WHITE(0.7)} 95%, ${WHITE(0.9)} 100%)`}
        shade={`-26px 12px 60px -12px ${PERI(0.32)}`}
        blur={14}
        rim={0.85}
        mask="linear-gradient(to right, #000 25%, transparent 48%), linear-gradient(to bottom, #000 84%, transparent 96%)"
        composite
      />

      {/* Where the cloth turns away from the light at the corners: the
          top-right beyond the main crest and the foot on the right. */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            `radial-gradient(22% 20% at 100% 0%, ${LAV(0.45)} 0%, ${LAV(0)} 70%)`,
            `radial-gradient(30% 22% at 92% 100%, ${PERI(0.28)} 0%, ${PERI(0)} 70%)`,
          ].join(", "),
        }}
      />
    </div>
  );
}
