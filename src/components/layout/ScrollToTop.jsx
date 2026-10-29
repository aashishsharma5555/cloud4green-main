import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Puts every navigation at the top of the new page.
 *
 * A browser resets the scroll offset when it loads a document. React Router
 * doesn't load a document — it swaps the element tree under a scroll position
 * that nobody touched — so clicking the logo from halfway down /enterprise
 * left the window at that same offset on the way in, and the home page's
 * products section is what happens to live there. Nothing was scrolling; the
 * page was simply arriving already scrolled.
 *
 * Which is why the fix belongs here rather than in Home: it isn't the hero's
 * problem, it's every route's, and any page shorter than the one before it
 * had the same arrival.
 *
 * useLayoutEffect rather than useEffect: it runs in the same commit as the new
 * route, before the browser paints, so the reader never sees a frame of the
 * new page at the old offset.
 *
 * Back and forward get the same treatment. Restoring the previous offset on a
 * POP would be the nicer behaviour in the abstract, but it can't work here —
 * Home deliberately holds everything below the fold back until the preloader's
 * reveal is done (see Home.jsx), so at the moment a restore would have to
 * happen there is no document to restore into. Landing at the top is at least
 * the same answer every time.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    // An in-page anchor is a request for a specific position, not for the top.
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView();
        return;
      }
    }

    // "instant" so this is never animated, whatever `scroll-behavior` a page
    // sets on itself.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
