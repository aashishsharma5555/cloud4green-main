import { useEffect, useRef, useState } from "react";

/**
 * Hides on the way down, comes back on the way up.
 *
 * The listener is rAF-throttled and only commits a value when the direction
 * actually flips past `threshold`, so a normal scroll is a handful of state
 * writes rather than one per event. React bails on a set that matches the
 * current value, so the repeats inside a single direction cost nothing.
 *
 * `enabled` is how you keep it from hiding over content it shouldn't — pass
 * false while the announcement bar is still on screen or a menu is open, and
 * it pins itself visible instead of accumulating a stale direction.
 */
export function useHideOnScroll({ enabled = true, threshold = 8 } = {}) {
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    if (!enabled) {
      setHidden(false);
      return;
    }

    last.current = window.scrollY;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const dy = y - last.current;

        /* Below the threshold this is momentum or a trackpad tremor, not an
           intent to scroll — reacting to it makes the bar flicker. */
        if (Math.abs(dy) < threshold) return;

        last.current = y;
        setHidden(dy > 0 && y > 0);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled, threshold]);

  return hidden;
}