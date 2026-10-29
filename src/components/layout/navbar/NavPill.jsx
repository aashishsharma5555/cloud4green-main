import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/* Expects each entry of `navigation` to carry at least { label } and, for a
   plain link, an href. Items with a `mega` open the panel instead of
   navigating. Both key names are read so this drops in whichever your
   config uses. */
const hrefOf = (item) => item.href ?? item.to ?? null;

export default function NavPill({ items, openMenu, setOpenMenu }) {
  const { pathname } = useLocation();
  const [hovered, setHovered] = useState(null);

  /* Longest match wins, so /enterprise/labs lights Enterprise rather than
     whichever "/" happens to be first in the array. */
  const routeIndex = items.reduce((best, item, i) => {
    const href = hrefOf(item);
    if (!href) return best;
    const hit = href === "/" ? pathname === "/" : pathname.startsWith(href);
    if (!hit) return best;
    const bestHref = best === -1 ? "" : hrefOf(items[best]) ?? "";
    return href.length > bestHref.length ? i : best;
  }, -1);

  const openIndex = openMenu
    ? items.findIndex((i) => i.label === openMenu)
    : -1;

  /* The chip follows the pointer first, then whatever panel is open, and
     falls back to the current route when neither applies — which is what
     makes it slide back home when you leave the pill. */
  const chipIndex = hovered ?? (openIndex !== -1 ? openIndex : routeIndex);

  return (
    <nav
      aria-label="Main"
      onMouseLeave={() => setHovered(null)}
      className="hidden items-center gap-0.5 rounded-full bg-[#101418] p-1 shadow-lg lg:flex"
    >
      {items.map((item, i) => {
        const href = hrefOf(item);
        const on = chipIndex === i;
        const expanded = openMenu === item.label;

        const inner = (
          <>
            {/* One chip for the whole pill. layoutId hands the slide to
                Framer, so it interpolates between the real button boxes
                instead of a table of offsets that goes stale the moment a
                label changes length. */}
            {on && (
              <motion.span
                layoutId="c4g-nav-chip"
                className="absolute inset-0 rounded-full bg-white shadow-sm"
                transition={{ type: "spring", stiffness: 420, damping: 38 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1">
              {item.label}
              {item.mega && (
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    expanded && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              )}
            </span>
          </>
        );

        const classes = cn(
          "relative isolate rounded-full px-4 py-2 text-[13.5px] font-medium",
          "transition-colors duration-200 focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-white/60",
          on ? "text-[#101418]" : "text-white/70 hover:text-white"
        );

        /* Entering an item is what opens its panel, and entering a plain
           link is what closes whatever was open — so sliding along the pill
           swaps panels without a click and without a flash of nothing. */
        const onEnter = () => {
          setHovered(i);
          setOpenMenu(item.mega ? item.label : null);
        };

        if (item.mega) {
          return (
            <button
              key={item.label}
              type="button"
              aria-expanded={expanded}
              aria-haspopup="true"
              onMouseEnter={onEnter}
              onFocus={onEnter}
              onClick={() => setOpenMenu(expanded ? null : item.label)}
              className={classes}
            >
              {inner}
            </button>
          );
        }

        return (
          <Link
            key={item.label}
            to={href ?? "#"}
            onMouseEnter={onEnter}
            onFocus={onEnter}
            onClick={() => setOpenMenu(null)}
            aria-current={routeIndex === i ? "page" : undefined}
            className={classes}
          >
            {inner}
          </Link>
        );
      })}
    </nav>
  );
}