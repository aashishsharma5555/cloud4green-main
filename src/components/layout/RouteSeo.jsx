import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

import { headTags } from "@/config/seo";

/**
 * Keeps <head> in step with the route.
 *
 * The first page load already arrives with the right tags — the build writes
 * them into each route's HTML (see src/config/seo.js). This only handles what
 * happens after that, when React Router changes the page without a request:
 * the old page's title, description and canonical are removed and the new
 * page's put in their place. Both sides come from the same headTags(), so what
 * a crawler sees on a direct visit and what the tab shows after navigating are
 * the same string.
 */
export default function RouteSeo() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const head = document.head;
    head.querySelectorAll("[data-seo]").forEach((el) => el.remove());
    head.insertAdjacentHTML("beforeend", headTags(pathname));
  }, [pathname]);

  return null;
}
