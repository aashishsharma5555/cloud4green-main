/**
 * The four-point glint, as one piece of geometry.
 *
 * It is drawn in two places — the preloader's mark and travelling field, and
 * the lit pixels on the hero's world map — and those two had each grown their
 * own version of the shape. They were not the same star: the map's arms were
 * built with both control points parked on the axes near the centre, which
 * pulls the waist in to 0.24 of the arm length and gives needles, where the
 * preloader's sit much further out and give a waist at 0.39 and a visibly
 * fuller arm. Side by side the map read as spikier and thinner.
 *
 * So the curve lives here and both callers ask for it at their own size.
 * The shape is the preloader's, because that is the one the brand mark is
 * built from.
 *
 * Four cubics, tip to tip. Each leaves its tip heading for the *next* tip —
 * LEAD along that axis — with a small BOW across it, and the concave waist
 * between the arms is what those two numbers buy. Ratios are of the arm
 * length, so the star is identical at any radius.
 */

/** How far along the destination axis a control point sits. Sets arm fullness. */
export const GLINT_LEAD = 4.4 / 12;
/** The sideways bow off the axis. Small — it only rounds the tips. */
export const GLINT_BOW = 0.35 / 12;

const r3 = (n) => +n.toFixed(3);

/**
 * @param {number} radius  tip-to-centre distance; the star spans 2x this.
 * @param {number} [cx]    centre, for callers that can't translate the path.
 * @param {number} [cy]
 * @returns {string} an SVG path, closed, ready for `d`.
 */
export function glintPath(radius, cx = 0, cy = 0) {
  const r = radius;
  const lead = r * GLINT_LEAD;
  const bow = r * GLINT_BOW;
  const p = (x, y) => `${r3(cx + x)} ${r3(cy + y)}`;

  return (
    `M${p(0, -r)}` +
    `C${p(bow, -lead)} ${p(lead, -bow)} ${p(r, 0)}` +
    `C${p(lead, bow)} ${p(bow, lead)} ${p(0, r)}` +
    `C${p(-bow, lead)} ${p(-lead, bow)} ${p(-r, 0)}` +
    `C${p(-lead, -bow)} ${p(-bow, -lead)} ${p(0, -r)}z`
  );
}

/**
 * The glint's palette, shared for the same reason the path is: the map's
 * sparkles were a single flat `highlight`, so they had no core-and-bloom
 * reading at all next to the preloader's.
 */
export const GLINT_CORE = "#0B5CFF";
export const GLINT_HALO = "#5B8CFF";
export const GLINT_HALO_OPACITY = 0.35;
