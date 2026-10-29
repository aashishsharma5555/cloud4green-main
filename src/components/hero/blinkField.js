import { WORLD_MAP_DOTS } from "./worldMapDots";

/**
 * Which cells of the world map blink, and on what beat.
 *
 * This lived in Worldmap.jsx until HeroMapStats.jsx needed the same list — the
 * three stat pins have to sit on cells that are already lighting, not on
 * coordinates that merely look like them. A module that exports a component
 * cannot also export the constants beside it without breaking fast refresh, so
 * the field moved here and both files read it.
 *
 * Every highlight is exactly one cell of the grid — never a pair, never a
 * cluster. A lit cell is one pixel of the map turning on, so anything adjacent
 * lighting with it reads as a blob rather than as a pixel.
 *
 * SPACING is by Mitchell's best-candidate algorithm, not by rejection. For each
 * pick we draw BLINK_CANDIDATES random cells and keep whichever sits furthest
 * from everything already chosen. That yields blue noise: no two lit pixels
 * crowd each other, but the spacing isn't a visible lattice either — which is
 * the "even without being regular" the eye reads as harmony. It also always
 * returns exactly BLINK_COUNT, where a minimum-distance rejection loop quietly
 * returns fewer as the map fills up.
 *
 * TIMING is deliberately rhythmic. Every pixel shares one period and is handed
 * a phase slot on it round-robin, so each beat carries the same number of
 * pixels and the same number are lighting and dimming at any moment. Random
 * periods read as visual noise; a single phase strobes the whole map at once.
 * Neither is restful — an even rotation across N slots is. Because selection
 * order is spatially decorrelated by construction, consecutive slots land far
 * apart, so a beat never sweeps one region.
 *
 * Picked from the real cell list (so a blink always lands on the map, never in
 * the ocean) with a seeded PRNG, so server and client agree and the layout is
 * stable between builds.
 */

const BLINK_COUNT = 48; // lit cells in total; ~1/4 are up at any moment
const BLINK_CANDIDATES = 24; // best-candidate pool — higher = more even spacing
const BLINK_SLOTS = 12; // phase positions within the beat (0.6s apart)
const BLINK_SEED = 0x5eed1234;

/** Seconds — the shared beat every lit pixel runs on. */
export const BLINK_PERIOD = 7.2;

export const BLINK_DOTS = (() => {
  // mulberry32
  let seed = BLINK_SEED;
  const rand = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const total = WORLD_MAP_DOTS.length / 2;
  const picked = [];
  const used = new Set(); // one cell can't be claimed twice

  for (let n = 0; n < BLINK_COUNT; n += 1) {
    let best = null;
    let bestDist = -1;

    for (let c = 0; c < BLINK_CANDIDATES; c += 1) {
      const i = Math.floor(rand() * total);
      const x = WORLD_MAP_DOTS[i * 2];
      const y = WORLD_MAP_DOTS[i * 2 + 1];
      if (used.has(`${x},${y}`)) continue;

      // Distance to the nearest already-lit pixel; the candidate that maximises
      // it is the one sitting in the biggest remaining gap.
      let nearest = Infinity;
      for (let k = 0; k < picked.length; k += 1) {
        const dx = picked[k].x - x;
        const dy = picked[k].y - y;
        const d = dx * dx + dy * dy;
        if (d < nearest) nearest = d;
      }

      if (nearest > bestDist) {
        bestDist = nearest;
        best = { x, y };
      }
    }

    if (!best) break;
    used.add(`${best.x},${best.y}`);

    // Round-robin over the beat; negative delay in the style below, so every
    // pixel is already mid-cycle on first paint rather than all starting at 0.
    const phase = (n % BLINK_SLOTS) * (BLINK_PERIOD / BLINK_SLOTS);
    picked.push({ x: best.x, y: best.y, delay: Math.round(phase * 100) / 100 });
  }

  return picked;
})();
