import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { CATALOGUE } from "@/config/downloads";

/**
 * The hero's display composition: a two-line headline and the CTAs under it.
 *
 * Both are centred on the same axis, so this is an ordinary stack — the copy
 * carries the composition on its own, with nothing beside it. It was briefly
 * three lines set flush right with a lede in the column that opened up on the
 * left; the lede is gone, and with it the reason for the asymmetry, because a
 * right-aligned block with nothing in the space it makes is just a block that
 * doesn't line up with the map and the partner strip below it.
 *
 * Where the lines break is a design decision, not a wrap. From lg up
 * `.hero-line` is `white-space: nowrap`, so the two lines hold whatever the
 * window does; below that the long line has to break, and `.hero-tail` says
 * where. Both regimes are a fixed number of line boxes, which the map behind
 * the composition depends on — see `--hero-map-top` in index.css, along with
 * the sizing that keeps each line inside the measure.
 */

/**
 * The eight-spoked asterisk that leads the headline.
 *
 * Drawn rather than typed: U+2733 isn't in Inter, so a text asterisk would
 * fall through to a system symbol font and land at a different weight and
 * optical size than the letters beside it. Four strokes through a common
 * centre is the whole shape, and as SVG it inherits the headline's colour and
 * scales with its font-size like a glyph would.
 */
const HeroMark = () => (
  <span className="hero-mark" aria-hidden="true">
    <svg viewBox="0 0 100 100" fill="none">
      <g stroke="currentColor" strokeWidth="8.5">
        <line x1="50" y1="2" x2="50" y2="98" />
        <line x1="2" y1="50" x2="98" y2="50" />
        <line x1="16.1" y1="16.1" x2="83.9" y2="83.9" />
        <line x1="83.9" y1="16.1" x2="16.1" y2="83.9" />
      </g>
    </svg>
  </span>
);

const HeroDisplay = () => {
  return (
    <div className="hero-block">
      {/* Lowercase in the markup, uppercased in CSS — so the copy stays
          readable here and a future change of mind about case is one line. */}
      {/* Each line is two boxes, not one. The outer `.hero-line` is the mask —
          it is clipped to the line's own box — and `.hero-line__inner` is what
          moves, starting fully below the clip edge and sliding up out of it
          when the curtain lifts. The line box itself never moves, which is why
          the map behind the composition (anchored a fixed number of line boxes
          down, see --hero-map-top) does not have to know the reveal exists.
          The mask geometry is `.hero-line` in index.css. */}
      <h1 className="hero-display ">
        <span className="hero-line hero-line--1">
          <span className="hero-line__inner">
            <HeroMark />
            Hands-on labs
          </span>
        </span>
        {/* The tail is its own box so the sub-lg break can be stated rather
            than left to the window — see `.hero-tail` in index.css. At lg it
            goes back to being an ordinary inline run and line 2 is one line. */}
        <span className="hero-line hero-line--2">
          <span className="hero-line__inner">
            for enterprise{" "}
            <span className="hero-tail">
              learning<span className="hero-stop">.</span>
            </span>
          </span>
        </span>
      </h1>

      <div className="hero-cta">
        <Button variant="ink" arrow render={<Link to="/contact" />}>
          Book a demo
        </Button>

        <Button variant="paper" arrow render={<a href={CATALOGUE.href} download={CATALOGUE.filename} />}>
          Download brochure
        </Button>
      </div>
    </div>
  );
};

export default HeroDisplay;
