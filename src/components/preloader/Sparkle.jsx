// import {
//   GLINT_CORE,
//   GLINT_HALO,
//   GLINT_HALO_OPACITY,
//   glintPath,
// } from "@/lib/glint";

// /**
//  * Sparkle — the 4-point glint used across the hero map and the preloader.
//  *
//  * Two stacked paths: a soft blurred halo underneath, a crisp core on top.
//  * On the light (#FAFAF7) backdrop the halo reads as a gentle bloom rather
//  * than a glow, which keeps it consistent with the map's markers.
//  *
//  * The curve itself is in src/lib/glint.js, because the map draws the same star
//  * from the same numbers — see the note there on why it stopped being a literal
//  * pasted into two files.
//  */

// /* viewBox units. The path is built once at module load, not per render: it is
//    the same string for every instance, since size is applied by the viewBox. */
// const D = glintPath(12, 12, 12);

// export default function Sparkle({
//   size = 16,
//   color = GLINT_CORE,
//   halo = GLINT_HALO,
//   haloOpacity = GLINT_HALO_OPACITY,
//   /* The halo is a CSS blur, and a blur is a raster pass. On one big mark that
//      is nothing; on forty travelling particles it is forty offscreen buffers
//      that have to be re-rasterised whenever their layer changes scale. The
//      preloader's field turns it off — at 5-15px the bloom is invisible anyway. */
//   glow = true,
//   className = "",
//   style,
// }) {
//   return (
//     <svg
//       width={size}
//       height={size}
//       viewBox="0 0 24 24"
//       fill="none"
//       className={className}
//       style={style}
//       aria-hidden="true"
//       focusable="false"
//     >
//       {glow && (
//         <path
//           d={D}
//           fill={halo}
//           opacity={haloOpacity}
//           style={{ filter: `blur(${Math.max(1, size * 0.09)}px)` }}
//         />
//       )}
//       <path d={D} fill={color} />
//     </svg>
//   );
// }

import { useId } from "react";

import {
  GLINT_CORE,
  GLINT_HALO,
  GLINT_HALO_OPACITY,
  glintPath,
} from "@/lib/glint";

/**
 * Sparkle — the 4-point glint used across the hero map and the preloader.
 *
 * Two variants:
 *
 *  - "glint" (default, unchanged): the fat 4-point star. Two stacked paths —
 *    a soft blurred halo underneath, a crisp core on top. The map and the
 *    preloader keep using this one, so nothing on the homepage moves.
 *
 *  - "flare": the lens-flare star from the reference video. A tiny, very
 *    bright core with long hairline rays that thin out and fade toward the
 *    tips (the vertical ray a little longer than the horizontal one, the
 *    way a camera flare usually reads). Used on the sub-page grid corners.
 *
 * The curve itself is in src/lib/glint.js, because the map draws the same star
 * from the same numbers — see the note there on why it stopped being a literal
 * pasted into two files.
 */

/* viewBox units. Built once at module load, not per render: size is applied
   by the viewBox, so every instance shares the same strings. */
const D = glintPath(12, 12, 12);

/* Flare geometry: a short, full glint body, and long hairline rays (thin
   diamonds, widest at the centre, zero at the tips) that run on past it. */
/* Drawn on a 48-unit box, centre (24, 24). glintPath's signature is
   (radius, cx, cy) — the body is a radius-9 glint centred in the box, so
   its arms reach 3/8 of the way to the edge and the hairline rays carry on
   past them to the edge, the way the reference star's short fat arms trail
   off into long thin light. */
const FLARE_BODY = glintPath(10, 24, 24);
const RAY_V = "M24 0 L25 24 L24 48 L23 24 Z"; /* full height   */
const RAY_H = "M3 24 L24 23 L45 24 L24 25 Z"; /* a bit shorter */

export default function Sparkle({
  variant = "glint",
  size = 16,
  color = GLINT_CORE,
  halo = GLINT_HALO,
  haloOpacity = GLINT_HALO_OPACITY,
  /* The halo is a CSS blur, and a blur is a raster pass. On one big mark that
     is nothing; on forty travelling particles it is forty offscreen buffers
     that have to be re-rasterised whenever their layer changes scale. The
     preloader's field turns it off — at 5-15px the bloom is invisible anyway.
     (The flare variant never blurs: its bloom is a radial gradient.) */
  glow = true,
  className = "",
  style,
}) {
  if (variant === "flare") {
    return (
      <Flare
        size={size}
        color={color}
        halo={halo}
        haloOpacity={haloOpacity}
        glow={glow}
        className={className}
        style={style}
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {glow && (
        <path
          d={D}
          fill={halo}
          opacity={haloOpacity}
          style={{ filter: `blur(${Math.max(1, size * 0.09)}px)` }}
        />
      )}
      <path d={D} fill={color} />
    </svg>
  );
}

/* A separate component so useId() is always called unconditionally
   (hooks can't sit behind the variant check above). */
function Flare({ size, color, halo, haloOpacity, glow, className, style }) {
  /* Gradient ids must be unique per instance, or every sparkle on the page
     would point at the first one's <defs>. useId's ":r1:" colons are not
     valid inside url(#…), so strip them. */
  const id = useId().replace(/:/g, "");
  const ray = `${id}-ray`;
  const body = `${id}-body`;
  const core = `${id}-core`;
  const bloom = `${id}-bloom`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      overflow="visible"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* userSpaceOnUse + r=24: opaque at the centre, gone at the edge of
            the box, for both rays whatever their shape. The early 0.2 stop
            drops the ray off quickly past the body, then lets it trail. */}
        <radialGradient id={ray} cx="24" cy="24" r="24" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={color} stopOpacity="1" />
          <stop offset="0.3" stopColor={color} stopOpacity="0.85" />
          <stop offset="1" stopColor={color} stopOpacity="0.1" />
        </radialGradient>

        {/* The body is the preloader's star: solid brand blue, the same ink
            density as the marks on the loading panel. Only a pinpoint at
            the very centre burns white — enough to read as a glint, too
            small to wash the star out on the light paper. */}
        <radialGradient id={body} cx="24" cy="24" r="9" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.1" stopColor={color} />
          <stop offset="1" stopColor={color} />
        </radialGradient>

        <radialGradient id={core}>
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>

        {glow && (
          <radialGradient id={bloom}>
            <stop offset="0" stopColor={halo} stopOpacity={Math.min(1, haloOpacity * 2.4)} />
            <stop offset="0.45" stopColor={halo} stopOpacity={haloOpacity * 1.1} />
            <stop offset="1" stopColor={halo} stopOpacity="0" />
          </radialGradient>
        )}
      </defs>

      {glow && <circle cx="24" cy="24" r="13" fill={`url(#${bloom})`} />}
      <path d={RAY_V} fill={`url(#${ray})`} />
      <path d={RAY_H} fill={`url(#${ray})`} />
      <path d={FLARE_BODY} fill={`url(#${body})`} />
      <circle cx="24" cy="24" r="1.3" fill={`url(#${core})`} />
    </svg>
  );
}
