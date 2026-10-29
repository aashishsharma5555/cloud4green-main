import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Logo from "./navbar/Logo";
import NavPill from "@/components/layout/navbar/NavPill";
import ContactButton from "./navbar/ContactButton";
import MobileMenu from "./navbar/MobileMenu";
import MegaMenu from "./navbar/MegaMenu";
import AnnouncementBar from "./navbar/AnnouncementBar";
import ProductNav from "./navbar/ProductNav";

import { navigation } from "@/config/navigation";
import { getProductNav } from "@/config/productNav";
import { useElementPast, useNavShell } from "@/hooks/useNavShell";
import { useHideOnScroll } from "@/hooks/useHideOnScroll";

const EASE = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const { sentinelRef, isPast } = useNavShell();
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();

  /* Non-null only on a product page, and that is the whole switch: it decides
     whether there is a second bar at all and, below, which of the two owns the
     top of the viewport once you start scrolling. */
  const product = getProductNav(location.pathname);

  /* Through the whole masthead the page is exactly as it was: announcement
     bar, global bar, nothing else. The product bar arrives on the handover —
     the moment the hero leaves the top of the viewport, which is also the
     moment the sections it links to are the only thing left to look at.
     Earlier than that it would be a table of contents for something still on
     screen.

     Falls back to the first scroll if the page has no element under that id,
     so a bar with somewhere to go never fails to show up. */
  const heroPast = useElementPast(product?.heroId);
  const showProductNav = Boolean(product) && (heroPast ?? isPast);

  const activeItem = navigation.find((n) => n.label === openMenu && n.mega);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Only ever hides once the announcement bar is gone and no panel is open.
     Retracting over the bar looks like a bug, and retracting out from under
     an open mega menu leaves the panel floating on its own.

     Off entirely on a product page: there the global bar doesn't hide and
     return on a direction change, it hands the top edge to the product bar and
     stays gone until you come back up to the top. Both running at once would
     be two rules fighting over one transform. */
  const hidden = useHideOnScroll({ enabled: !product && isPast && !openMenu });

  /* One transform, two jobs. The shell is as tall as the global bar and the
     product bar hangs off its bottom edge, so -100% is exactly "global bar
     out, product bar docked at the top" — no height constant to keep in sync
     with the markup. Off a product page it is the old retract, unchanged. */
  const shellY = product
    ? showProductNav
      ? "-100%"
      : "0%"
    : hidden
      ? "-125%"
      : "0%";

  // close on route change
  useEffect(() => setOpenMenu(null), [location.pathname]);

  // close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpenMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // close on scroll
  useEffect(() => {
    if (!openMenu) return;
    const onScroll = () => setOpenMenu(null);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [openMenu]);

  return (
    <>
      <AnnouncementBar />

      <div ref={sentinelRef} aria-hidden="true" className="h-px w-full" />

      <header
        className="sticky top-0 z-50"
        onMouseLeave={() => setOpenMenu(null)}
      >
        <motion.div
          className="relative"
          animate={{ y: shellY }}
          transition={{ duration: 0.38, ease: EASE }}
        >
          <div className="mx-auto flex h-20 w-full max-w-[1600px] items-center justify-between px-5 sm:px-8">
            <Logo placement={ "navbar" } scrolled={scrolled} />

            <div className="pointer-events-none absolute inset-x-0 flex justify-center">
              <div className="pointer-events-auto">
                <NavPill
                  items={navigation}
                  openMenu={openMenu}
                  setOpenMenu={setOpenMenu}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden lg:block">
                <ContactButton />
              </div>
              <MobileMenu />
            </div>
          </div>

          {/* Tier 2. Hangs off the bottom edge of the shell, so it is out of
              sight under the global bar until the shell slides up. Rendered
              before the mega menu so an open panel paints over it rather than
              under — at the top of the page the two share this exact strip. */}
          {product && (
            <ProductNav product={product} visible={showProductNav} />
          )}

          <div className="absolute inset-x-0 top-full px-5 sm:px-8">
            <div className="mx-auto w-full max-w-[1240px]">
              <AnimatePresence initial={false}>
                {activeItem && (
                  <MegaMenu
                    key="mega"
                    mega={activeItem.mega}
                    rounded
                    onClose={() => setOpenMenu(null)}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpenMenu(null)}
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-foreground/50 backdrop-blur-[3px]"
          />
        )}
      </AnimatePresence>
    </>
  );
}