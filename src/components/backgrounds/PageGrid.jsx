import { useLocation } from "react-router-dom";

import GridCorner from "@/components/backgrounds/GridCorner";

/**
 * PageGrid — the grid-and-sparkle decoration, as one drop-in for a page's
 * top section. Every sub-page gets it; the homepage does not (it has the
 * full field behind the hero already), and this returns null there rather
 * than asking each page to remember.
 *
 * Which two corners it uses is decided by the page's own path, not at
 * random: the same URL always gets the same diagonal, so a page does not
 * rearrange itself when you navigate back to it, while walking through the
 * nav alternates between the two diagonals. Pass `diagonal` to override it
 * for a page whose corners are busy.
 *
 * The host section needs `relative` (and usually `isolate overflow-hidden`)
 * — the patches pin themselves to its corners at -z-20.
 */

/* One walk down a vertical line and one across a horizontal, in each
   corner, plus a single still star. The two corners are offset in time so
   they take turns rather than flashing together. */
const CHOREOGRAPHY = [
  {
    movers: [
      { axis: "y", line: 1, from: 1, to: 3, hop: 0.9, gap: 3.4, delay: 0 },
      { axis: "x", line: 2, from: 1, to: 3, hop: 0.9, gap: 3.4, delay: 2.6 },
    ],
    stills: [{ col: 2, row: 1 }],
  },
  {
    movers: [
      { axis: "y", line: 1, from: 1, to: 3, hop: 0.9, gap: 3.4, delay: 1.3 },
      { axis: "x", line: 2, from: 1, to: 3, hop: 0.9, gap: 3.4, delay: 4 },
    ],
    stills: [{ col: 2, row: 1 }],
  },
];

const DIAGONALS = {
  "tl-br": ["tl", "br"],
  "tr-bl": ["tr", "bl"],
};

/* Character codes weighted by position, odd/even. Not a hash worth the
   name — it only has to split the handful of paths this site has into two
   buckets and give the same answer every time. The position weighting is
   what keeps sibling routes apart: a plain sum put four of the five
   /products/* pages on the same diagonal, because they differ by a few
   letters deep in an otherwise identical string. */
function diagonalFor(path) {
  let n = 0;
  for (let i = 0; i < path.length; i++) n += path.charCodeAt(i) * (i + 1);
  return n % 2 === 0 ? "tl-br" : "tr-bl";
}

export default function PageGrid({
  diagonal,
  cols = 4,
  rows = 3,
  /* -20 sits under a scrim or bloom at -z-10. A section whose backdrop is
     an <img> at -z-10 wants 0 instead, so the grid lands on the picture
     rather than behind it. */
  z = -20,
  /* Star colour, passed through to GridCorner. Left unset, the stars keep
     the brand blue; a page whose top section is blue passes white. */
  color,
  halo,
  className = "",
}) {
  const { pathname } = useLocation();
  if (pathname === "/") return null;

  const [first, second] = DIAGONALS[diagonal] ?? DIAGONALS[diagonalFor(pathname)];

  return (
    <>
      <GridCorner
        corner={first}
        cols={cols}
        rows={rows}
        z={z}
        color={color}
        halo={halo}
        className={className}
        {...CHOREOGRAPHY[0]}
      />
      <GridCorner
        corner={second}
        cols={cols}
        rows={rows}
        z={z}
        color={color}
        halo={halo}
        className={className}
        {...CHOREOGRAPHY[1]}
      />
    </>
  );
}
