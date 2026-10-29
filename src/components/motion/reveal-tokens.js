/**
 * The numbers behind the house scroll reveal, in their own file because
 * react-refresh will not accept a module that exports both components and
 * constants. Reveal.jsx is the components; this is what they are made of, and
 * anything that needs to move in step with them (a one-off transition in a
 * section, a hand-rolled tween) should import from here rather than restate a
 * curve by eye.
 *
 * They are not invented. They are the values bouayaben.com and phobos.com.au
 * are actually running, read off their bundles:
 *
 *   ease      expo.out, i.e. cubic-bezier(.16, 1, .3, 1)
 *   distance  32-48px on the reference sites
 *   duration  1s-1.2s
 *   stagger   .1-.12s between siblings
 *   trigger   ScrollTrigger `start: "top 82%"`
 */

/* expo.out. Not the [0.22, 1, 0.36, 1] the rest of this codebase uses for UI
   transitions — that is the right curve for a menu opening, where the user is
   waiting for the thing. This one has a longer tail, which is what you want for
   something arriving that nobody asked for. */
export const EASE = [0.16, 1, 0.3, 1];

/* 28 and not the references' 32-48: our sections are denser than a portfolio's,
   and a long throw on a tight stack reads as the whole page sliding rather than
   as one block arriving. */
export const RISE = 28;

/* The long duration is what does the work. expo.out spends about 70% of its
   travel in the first quarter of the time, so a 1s tween is visually finished
   in roughly 300ms and then settles for the rest — it arrives quickly but never
   *stops* abruptly. That settle is the whole "subtle, expensive" feel; shorten
   it to make it feel snappier and it turns back into an ordinary fade. */
export const DURATION = 1;

export const STAGGER = 0.1;

/* The line stagger for masked display type — the 0.12s the hero's two lines
   run on (.hero-line--1 / --2 in index.css). */
export const LINE_STAGGER = 0.12;

/**
 * The cue sheet. Every section on every page enters on the same grid the
 * homepage hero was timed to, so a section on /services/automation arrives with
 * the same pulse as one on /:
 *
 *   ground   0       backdrop / photograph / tinted panel. Opacity only, no
 *                    travel — ground that slides reads as a layer on the page.
 *   lead     0.08    the first beat of a section's header (eyebrow → lines →
 *                    lede, spaced by STAGGER from here).
 *   follow   0.24    the block under the header: a card grid, a visual, a
 *                    form. Two line-beats behind the lead, so it arrives in the
 *                    tail of the headline rather than waiting for it to settle.
 *   trail    0.36    a third block, or the foot of a hero (stats, partner
 *                    strip). Three line-beats.
 *
 * Multiples of LINE_STAGGER on purpose (0.08 is the one exception: it is the
 * lead-in that lets the section edge cross before anything moves). Pick a cue
 * rather than a number; if something needs a fourth, it is CUE.trail + 0.12.
 */
export const CUE = { ground: 0, lead: 0.08, follow: 0.24, trail: 0.36 };

/* Ground fades on a plain ease-out rather than expo — see .hero-map. */
export const GROUND_DURATION = 1.1;

/**
 * `amount: 0` plus an 18% bottom inset is the framer-motion spelling of
 * ScrollTrigger's `start: "top 82%"`: the negative margin shrinks the observer
 * root to the top 82% of the viewport, and `amount: 0` fires the moment the
 * element's top edge crosses into it.
 *
 * Stated this way rather than as `amount: 0.3` on purpose. A visible-fraction
 * threshold behaves differently for a one-line eyebrow than for a 600px card
 * grid — the tall block has to be a third of the way up the screen before it
 * starts, so a section's children can fire out of order relative to how they
 * are stacked. An edge crossing is the same trigger for every element whatever
 * its height, which is what keeps a stagger reading as a stagger.
 *
 * `once: true` everywhere, exactly as both references do: a GSAP `.from()` with
 * a ScrollTrigger and no `toggleActions` plays once and is done. Copy that
 * re-animates every time it re-enters the viewport is the single fastest way to
 * make a site feel cheap.
 */
export const VIEWPORT = { once: true, margin: "0px 0px -18% 0px", amount: 0 };
