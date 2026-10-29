import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { scrollToSection, useSectionSpy } from "@/hooks/useSectionSpy";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Tier 2 — the product bar.
 *
 * Positioned `top-full` inside the navbar's sticky shell, so it costs nothing
 * in flow and lands exactly at the top edge of the viewport once the shell
 * slides the global bar out of the way. That slide is what makes it appear;
 * all this component owns is the fade that goes with it, and everything
 * inside.
 *
 * Every link is an in-page anchor. There is no call to action here — tier 1
 * keeps it (see src/config/productNav.js).
 *
 * The material is Apple's local nav rather than the site's: white at 72% over
 * a blurred, saturated backdrop, so the page reads through it as it passes
 * under. Tier 1 keeps the solid dark pill it has always had, which is what
 * holds the two apart as a hierarchy instead of two headers arguing.
 */
export default function ProductNav({ product, visible }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  const ids = product.sections.map((s) => s.id);
  const activeId = useSectionSpy(ids, { enabled: visible });
  const active =
    product.sections.find((s) => s.id === activeId) ?? product.sections[0];

  /* Derived rather than synced: the bar leaving has to take the dropdown with
     it, and an effect that did it would be a render behind. */
  const menuOpen = open && visible;

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e) => e.key === "Escape" && setOpen(false);
    /* Scrolling is how you use this menu — leaving it open over the section it
       just took you to hides the thing you asked for. */
    const onScroll = () => setOpen(false);

    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [menuOpen]);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    scrollToSection(id, { smooth: !reduce });
  };

  const toTop = (e) => {
    e.preventDefault();
    setOpen(false);
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div
      aria-hidden={visible ? undefined : "true"}
      className={cn(
        "absolute inset-x-0 top-full",
        !visible && "pointer-events-none"
      )}
    >
      <motion.nav
        aria-label={`${product.name} sections`}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.28, ease: EASE }}
        className="relative border-b border-[#101418]/10 bg-white/[0.72] backdrop-blur-[20px] backdrop-saturate-[180%]"
      >
        <div className="mx-auto flex h-12 w-full max-w-[1600px] items-center gap-4 px-5 sm:px-8">
          {/* The product name, and the way back to the top of its page. Apple
              points this at the product's overview; every section here is on
              this page, so the top of the page is the same destination. */}
          <a
            href="#top"
            onClick={toTop}
            className="shrink-0 text-[15px] font-semibold tracking-[-0.015em] text-[#101418] transition-opacity hover:opacity-70"
          >
            {product.name}
          </a>

          {/* ── Desktop: the sections, in a row ─────────────────────────── */}
          <ul className="ml-auto hidden items-center gap-0.5 lg:flex">
            {product.sections.map((s) => {
              const on = s.id === active?.id;

              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => go(e, s.id)}
                    aria-current={on ? "true" : undefined}
                    className={cn(
                      "block rounded-full px-3.5 py-1.5 text-[13.5px] font-medium tracking-[-0.01em]",
                      "transition-colors duration-200 focus-visible:outline-none",
                      "focus-visible:ring-2 focus-visible:ring-[#0B5CFF]/50",
                      on
                        ? "bg-[#0B5CFF]/[0.08] text-[#0B5CFF]"
                        : "text-[#4A5261] hover:bg-[#101418]/5 hover:text-[#101418]"
                    )}
                  >
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ── Below lg: the section you're in, and a way to the others ─── */}
          {/* The label is the whole point of the control on a phone: with the
              global bar gone it is the only thing on screen saying where in
              the page you are. */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-haspopup="true"
            className="ml-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13.5px] font-medium tracking-[-0.01em] text-[#101418] transition-colors hover:bg-[#101418]/5 lg:hidden"
          >
            {active?.label}
            <ChevronDown
              aria-hidden="true"
              className={cn(
                "h-3.5 w-3.5 text-[#4A5261] transition-transform duration-200",
                menuOpen && "rotate-180"
              )}
            />
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Catches the tap that means "not that, then". Rendered before
                  the panel so the panel paints over it.

                  Absolute and a viewport tall rather than `fixed inset-0`: the
                  navbar shell this sits in carries a transform, and a
                  transformed ancestor is what a fixed child is positioned
                  against — it would have come out 80px tall and pinned under
                  the bar. */}
              <div
                aria-hidden="true"
                onClick={() => setOpen(false)}
                className="absolute inset-x-0 top-full h-screen lg:hidden"
              />

              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="absolute inset-x-0 top-full border-b border-[#101418]/10 bg-white/[0.88] shadow-[0_18px_40px_-24px_rgba(16,20,24,0.45)] backdrop-blur-[20px] backdrop-saturate-[180%] lg:hidden"
              >
                <ul className="mx-auto w-full max-w-[1600px] px-3 py-2 sm:px-6">
                  {product.sections.map((s) => {
                    const on = s.id === active?.id;

                    return (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          onClick={(e) => go(e, s.id)}
                          aria-current={on ? "true" : undefined}
                          className={cn(
                            "block rounded-lg px-3 py-3 text-[15px] font-medium tracking-[-0.01em] transition-colors",
                            on
                              ? "bg-[#0B5CFF]/[0.08] text-[#0B5CFF]"
                              : "text-[#101418] hover:bg-[#101418]/5"
                          )}
                        >
                          {s.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
