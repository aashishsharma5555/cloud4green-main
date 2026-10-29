
import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* Adjust to wherever Sparkle lives in your tree. */
import Sparkle from "@/components/preloader/Sparkle";

/* The one line the panel carries. */
const SUB =
  "Building The World’s Most Advanced Zero Trust Access, Identity, and Security Platform for the Modern Enterprise.";

/* ------------------------------------------------------------------ *
 * Timeline, in seconds at pace 1. Every delay downstream is derived
 * from these, so nudging one keeps the sequence in sync — and the
 * `pace` prop scales the whole thing if you want it brisker.
 *
 *   the line washes in, on the centre of the screen  ->  a mark lands
 *   either side of it  ->  each mark divides, one rising and one dropping
 *   to the corners of the block  ->  the sheet dissolves out from under
 *   the words.
 * ------------------------------------------------------------------ */
const BASE = {
  subIn: 0.4,      // a beat of empty panel first — the pause is the point
  subStep: 0.04,   // the wash that walks across the line
  subDur: 0.68,    // how long any one word takes to come up
  markGap: 0.26,   // the line settles, *then* the marks arrive
  markStep: 0.2,   // right first, left a beat behind it
  markDur: 0.5,
  settle: 0.3,     // both marks sit before they divide
  splitDur: 0.8,   // the travel out to the corners
  hold: 1.2,       // the finished block sits before anything leaves
  fadeDur: 0.95,   // the sheet dissolves into the page beneath
};

const EASE_OUT = [0.22, 1, 0.36, 1];

/** How long we're prepared to wait for the display face before starting. */
const FONT_WAIT = 700;

/* Words, not characters.
 *
 * A per-character reveal on a sentence this long is a hundred animating
 * spans and a wash so fine it reads as noise; per word it reads as one
 * movement of light across the line, which is what the reference does.
 * The space lives *between* the spans, never inside one, or the line
 * loses its break opportunities and stops wrapping at 375px. */
const SUB_WORDS = SUB.split(" ");

function useTimeline(pace) {
  return useMemo(() => {
    const t = Object.fromEntries(
      Object.entries(BASE).map(([k, v]) => [k, v * pace])
    );

    /* Derived, never typed in — editing the copy re-times the sequence
       instead of needing every downstream delay nudged by hand. */
    t.subDone = t.subIn + t.subStep * (SUB_WORDS.length - 1) + t.subDur;
    t.markRight = t.subDone + t.markGap;
    t.markLeft = t.markRight + t.markStep;
    t.splitAt = t.markLeft + t.markDur + t.settle;
    t.exitAt = t.splitAt + t.splitDur + t.hold;

    return t;
  }, [pace]);
}

/* Which corner each mark owns, and how it behaves while the pair is still
   joined. The two `lead` marks are the ones you see land beside the line;
   the other two sit underneath them at zero opacity and only light up as
   they pull away, so the division reads as one mark becoming two rather
   than two more fading in. Right lands first, left a beat behind. */
const MARKS = [
  { key: "tr", side: "right", edge: "top", lead: true, order: 0 },
  { key: "tl", side: "left", edge: "top", lead: true, order: 1 },
  { key: "br", side: "right", edge: "bottom", lead: false, order: 0 },
  { key: "bl", side: "left", edge: "bottom", lead: false, order: 1 },
];

export default function Preloader({
  /** Panel has *started* dissolving — the moment to bring the hero up, so
      it is arriving as the sheet clears rather than appearing on a blank
      page afterwards. The sheet fades before the words do, so the hero
      comes up behind them exactly like the reference. */
  onReveal,
  /** Panel is gone and unmounted. Safe point for the expensive things. */
  onComplete,
  /** Scales every delay and duration. 0.85 is noticeably brisker, 1.15
      statelier — one number, and nothing goes out of phase. */
  pace = 1,
  /** Shortest time the panel stays up, even on a warm cache. */
  minDuration = 2000,
  /** Hard ceiling — never hold the page hostage to a slow asset. */
  maxDuration = 7000,
  /** Show once per browser tab session. */
  once = true,
}) {
  const reduce = useReducedMotion();
  const T = useTimeline(pace);
  const finished = useRef(false);
  const revealed = useRef(false);

  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    if (!once) return true;
    try {
      return sessionStorage.getItem("c4g:preloaded") !== "1";
    } catch {
      return true;
    }
  });

  /* Nothing animates until the display face has landed.
   *
   * Recoleta is materially wider than the serif fallback, so starting
   * without it means the line comes up in one face and then jumps —
   * re-wrapping mid-reveal — when the real one arrives. Holding a beat
   * costs less than the reflow, and the wait is capped so a font that
   * never loads can't stall the page. */
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!visible) return;
    let live = true;
    const go = () => live && setReady(true);

    const cap = setTimeout(go, FONT_WAIT);
    if (document.fonts?.ready) document.fonts.ready.then(go);
    else go();

    return () => {
      live = false;
      clearTimeout(cap);
    };
  }, [visible]);

  /* ---------------------------------------------------------------- *
   * Where the marks travel.
   *
   * The pair lands on the line's vertical centre and ends on the corners
   * of the block, so the distance is measured rather than guessed: the
   * block's height changes with the viewport, with the wrap, and once more
   * when the webfont lands. `rails.top` is how far a top mark has to be
   * pushed down to sit on the centre; `rails.bottom` is the same trip
   * upward for its twin. Both are 0 at the corners, which is where the
   * split animates them to.
   * ---------------------------------------------------------------- */
  const frameRef = useRef(null);
  const [rails, setRails] = useState({ top: 0, bottom: 0 });

  useLayoutEffect(() => {
    if (!visible) return;
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const h = frame.offsetHeight;
      setRails({ top: h / 2, bottom: -h / 2 });
    };

    let live = true;
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(frame);

    /* The face can still land after `ready`, because the wait for it is
       capped — re-measure once it does, in case the observer misses it. */
    document.fonts?.ready?.then(() => live && measure());

    return () => {
      live = false;
      ro.disconnect();
    };
  }, [visible, ready]);

  /* Three states, two timers. Keeping the marks on discrete states rather
     than one long keyframe track is what lets the join distance stay a
     measured number that can change under them. */
  const [phase, setPhase] = useState("hidden");
  useEffect(() => {
    if (!visible || !ready) return;

    if (reduce) {
      setPhase("apart"); // no travel, just the finished arrangement
      return;
    }

    const a = setTimeout(() => setPhase("joined"), T.markRight * 1000);
    const b = setTimeout(() => setPhase("apart"), T.splitAt * 1000);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [visible, ready, reduce, T]);

  /* Both callbacks are latched, because both have more than one caller: the
     leave can be started by the timeline, by the max-duration ceiling or by
     an unmount, and in React 18's StrictMode every effect runs twice in dev. */
  const beginReveal = useCallback(() => {
    if (revealed.current) return;
    revealed.current = true;

    /* Land at the top of the document before anything of it is visible.
     *
     * Restoration is already off (main.jsx), so this is aimed at the other
     * way the offset used to drift under the panel: the products section
     * sets its own height from a measurement that only settles once the
     * webfonts land, so the document grows while the sheet is down — and a
     * scroll position clamped against the shorter document creeps back down
     * with it. Doing it at the leave, not only on mount, is what pins it. */
    window.scrollTo(0, 0);

    setVisible(false);
    onReveal?.();
  }, [onReveal]);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    try {
      sessionStorage.setItem("c4g:preloaded", "1");
    } catch {
      /* private mode — just replay next time */
    }
    onComplete?.();
  }, [onComplete]);

  /* Skipped entirely (already seen this session) -------------------- */
  useEffect(() => {
    if (!visible) {
      revealed.current = true;
      onReveal?.();
      finish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Lock the page while the panel is up ----------------------------- */
  useEffect(() => {
    if (!visible) return;

    /* Scroll restoration itself is disabled app-wide in main.jsx — it has to
       be off before the first paint, and before the preloader exists. This is
       just the belt to that braces, for a browser that ignores the flag. */
    window.scrollTo(0, 0);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    /* Tells the hero's world map to hold its blink while it can't be seen —
       288 animated SVG nodes that would otherwise be spending the panel's
       frame budget drawing behind an opaque sheet. See index.css. */
    document.documentElement.dataset.preloading = "true";

    return () => {
      document.body.style.overflow = prevOverflow;
      delete document.documentElement.dataset.preloading;
    };
  }, [visible]);

  /* Hold for whichever comes last: the timeline or the page load -----
   *
   * The clock starts at `ready`, not at mount, because that is when the
   * animation starts — timing it from mount would let the release fire
   * part-way through the line on a cold font cache.
   *
   * Nothing else calls `beginReveal`, so without this the panel has no way
   * out. Three things can release it: the floor once `load` has fired, the
   * ceiling at `maxDuration`, and `beginReveal` being latched so whichever
   * arrives first wins and the rest are no-ops.
   */
  useEffect(() => {
    if (!visible || !ready) return;

    const started = performance.now();
    let hardStop;

    const release = () => {
      const elapsed = performance.now() - started;
      const floor = reduce ? 600 : Math.max(minDuration, T.exitAt * 1000 + 150);
      hardStop = setTimeout(beginReveal, Math.max(0, floor - elapsed));
    };

    /* `load` never fires again once it has fired, so a warm cache (or a
       StrictMode remount, which lands after it) has to be handled by hand. */
    if (document.readyState === "complete") {
      release();
    } else {
      window.addEventListener("load", release, { once: true });
    }

    const ceiling = setTimeout(beginReveal, maxDuration);

    return () => {
      window.removeEventListener("load", release);
      clearTimeout(hardStop);
      clearTimeout(ceiling);
    };
  }, [visible, ready, reduce, minDuration, maxDuration, beginReveal, T]);

  /* ---------------------------------------------------------------- *
   * Exit, in two passes.
   *
   * The words clear first and the sheet keeps going, so the hero is coming
   * up under an emptying panel rather than under a second block of copy —
   * the reference can overlap the two because it is the *same* sentence on
   * both sides of the cut, and ours is not. The parent carries no opacity
   * of its own; it only passes the variant label down, or the two fades
   * would multiply.
   * ---------------------------------------------------------------- */
  const passthrough = useMemo(() => ({ visible: {}, exit: {} }), []);

  const sheetVariants = useMemo(
    () => ({
      visible: { opacity: 1 },
      exit: {
        opacity: 0,
        transition: reduce
          ? { duration: 0.3 }
          : { duration: T.fadeDur, ease: "linear" },
      },
    }),
    [reduce, T]
  );

  const contentVariants = useMemo(
    () => ({
      visible: { opacity: 1, scale: 1 },
      exit: {
        opacity: 0,
        /* barely there — just enough parallax that the block feels like it
           is settling into the page rather than switching off */
        scale: reduce ? 1 : 1.012,
        transition: reduce
          ? { duration: 0.3 }
          : { duration: T.fadeDur * 0.55, ease: EASE_OUT },
      },
    }),
    [reduce, T]
  );

  /* Variants as functions, because each mark's join distance and stagger
     are its own — `custom` carries them in. */
  const markVariants = useMemo(
    () => ({
      hidden: ({ join }) => ({ opacity: 0, scale: 0.35, y: join }),

      joined: ({ join, lead, order }) => ({
        /* the twin is here too, exactly underneath, waiting */
        opacity: lead ? 1 : 0,
        scale: 1,
        y: join,
        transition: reduce
          ? { duration: 0.3 }
          : {
              delay: order * T.markStep,
              duration: T.markDur,
              ease: EASE_OUT,
            },
      }),

      apart: () => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: reduce
          ? { duration: 0.3 }
          : {
              duration: T.splitDur,
              ease: EASE_OUT,
              /* the twin lights up early in its travel, so it is clear of
                 its sibling before you can see it arrive */
              opacity: { duration: T.splitDur * 0.45, ease: "linear" },
            },
      }),
    }),
    [reduce, T]
  );

  /* The wash that walks across the line, a word at a time. */
  const wash = (words, className, start, step, dur) => (
    <p className={className}>
      {ready &&
        words.map((word, i) => {
          /* the closing full stop picks up the accent, the same way the
             hero headline's does */
          const dot = word.endsWith(".");
          const body = dot ? word.slice(0, -1) : word;

          return (
            <Fragment key={`${word}-${i}`}>
              <motion.span
                className="c4g-pre__word"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: reduce
                    ? { duration: 0.3 }
                    : { delay: start + i * step, duration: dur, ease: EASE_OUT },
                }}
              >
                {body}
                {dot && <span className="accent">.</span>}
              </motion.span>
              {/* the space sits *between* the wrappers, never inside one,
                  or the line loses the break opportunity along with it */}
              {i < words.length - 1 ? " " : null}
            </Fragment>
          );
        })}
    </p>
  );

  return (
    <AnimatePresence onExitComplete={finish}>
      {visible && (
        <motion.div
          className="c4g-pre"
          role="status"
          aria-live="polite"
          aria-label="Loading Cloud4Green"
          variants={passthrough}
          initial="visible"
          animate="visible"
          exit="exit"
        >
          {/* The opaque layer, on its own so it can leave ahead of the
              words. Opacity on one full-viewport element is a compositor
              job; the clip-path this replaced was a main-thread repaint
              every frame. */}
          <motion.div className="c4g-pre__sheet" variants={sheetVariants} />

          <motion.div className="c4g-pre__viewport" variants={contentVariants}>
            {/* The panel's own label above does the announcing, so the
                per-word spans stay out of the accessibility tree —
                otherwise a screen reader reads the lines a word at a time. */}
            <div
              className="c4g-pre__frame"
              ref={frameRef}
              aria-hidden="true"
            >
              {MARKS.map((m) => (
                <motion.span
                  key={m.key}
                  className={`c4g-pre__glint c4g-pre__glint--${m.side} c4g-pre__glint--${m.edge}`}
                  custom={{
                    join: m.edge === "top" ? rails.top : rails.bottom,
                    lead: m.lead,
                    order: m.order,
                  }}
                  variants={markVariants}
                  initial="hidden"
                  animate={phase}
                >
                  {/* The flare, not the fat four-point glint: a small hot
                      core with long hairline rays, the same star the grid
                      sparkles use. The CSS sizes the svg (--c4g-mark), so
                      the size prop here is only the fallback. */}
                  <Sparkle variant="flare" size={28} />
                </motion.span>
              ))}

              {/* This takes the font utility, the same way every other
                  heading on the site does — taking the display face from
                  one place is what stops the panel and the hero drifting
                  apart when the config changes. */}
              {wash(
                SUB_WORDS,
                "c4g-pre__sub font-heading",
                T.subIn,
                T.subStep,
                T.subDur
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
