import { useEffect, useState } from "react";

/**
 * How far below the top of the viewport a section counts as arrived: the
 * tier-2 bar's height plus a little air.
 *
 * The same number is used to scroll to a section and to decide which one is
 * current, which is the only reason the highlight flips exactly as a heading
 * docks under the bar rather than a scroll-length early or late. Change the
 * bar's height and change this with it.
 */
export const SCROLL_OFFSET = 64;

/**
 * Which of `ids` the reader is currently in.
 *
 * Reads positions on scroll rather than observing intersections: sections here
 * run anywhere from a hero to a two-screen scrub, and an IntersectionObserver
 * ratio can't answer "which one is under the bar" for both. A rAF gate keeps
 * it to one measurement per frame, and React drops the sets that don't change
 * a thing, so a full-page scroll is a handful of renders.
 *
 * `ids` is expected in the page's own top-to-bottom order.
 */
export function useSectionSpy(ids, { enabled = true, offset = SCROLL_OFFSET } = {}) {
  const [activeId, setActiveId] = useState(null);

  /* Joined so the effect keys off the contents, not the array identity — the
     caller builds this list with .map() on every render. */
  const key = ids.join("|");

  useEffect(() => {
    const list = key ? key.split("|") : [];
    if (!enabled || !list.length) return;

    let frame = 0;

    const read = () => {
      frame = 0;

      const els = list
        .map((id) => document.getElementById(id))
        .filter(Boolean);
      if (!els.length) return;

      /* The last section is usually shorter than the viewport, so it can never
         reach the bar — without this, hitting the bottom of the page leaves
         the one before it lit. */
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        setActiveId(els[els.length - 1].id);
        return;
      }

      /* Last one whose top has passed the bar. Falls back to the first, so
         something is always current rather than the bar reading as inert
         while you're still in the masthead. */
      let current = els[0];
      for (const el of els) {
        if (el.getBoundingClientRect().top - offset <= 0) current = el;
      }
      setActiveId(current.id);
    };

    read();

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [key, enabled, offset]);

  return activeId;
}

/**
 * Scrolls a section under the bar and puts its id in the address bar.
 *
 * Does the arithmetic itself instead of leaning on `scrollIntoView` and
 * `scroll-mt-*`: the utility is on some sections and not others, and a link
 * that lands a heading behind the bar on three pages out of four is worse than
 * no link. `replaceState` rather than a hash navigation so the browser doesn't
 * jump to the element before the smooth scroll gets there.
 */
export function scrollToSection(id, { smooth = true } = {}) {
  const el = document.getElementById(id);
  if (!el) return false;

  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
  window.history.replaceState(null, "", `#${id}`);
  return true;
}
