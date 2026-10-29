import { useCallback, useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
// import Container from "@/components/layout/Container";
// import Section from "@/components/layout/Section";
import Hero from "@/components/hero";
// import PlatformOverview from "@/components/sections/platform-overview/PlatformOverview";
// import TechnologyDomains from "@/components/sections/technology-domains/TechnologyDomains";
// import WhyCloud4Green from "@/components/sections/why-cloud4green/WhyCloud4Green";
import EnterpriseCTA from "@/components/sections/enterprise-cta/EnterpriseCTA";
import OurProducts from "@/components/sections/platform-overview/OurProducts"
import Solutions from '@/components/sections/challenges-we-solve/Solutions'
import Testimonials from '@/components/sections/testimonials/Testimonials';
import Preloader from "@/components/preloader/Preloader";
import logo from "@/assets/images/C4GLogoplain.png"

/**
 * The page is built in three beats, because everything below the fold is
 * expensive and none of it can be seen until the curtain is up.
 *
 *   1. Preloader + Navbar + Hero mount together. The hero is laid out and
 *      painted while the panel covers it, held at opacity 0, so the reveal has
 *      nothing left to build.
 *   2. `onReveal` — the curtain has started lifting. The hero comes up under
 *      it and is already arriving as the panel clears.
 *   3. `onComplete`, then one idle beat — the rest of the page mounts.
 *
 * Splitting 2 from 3 is the whole point. Mounting OurProducts, Solutions,
 * Testimonials, the CTA and the footer is a long main-thread task: three of
 * them install scroll-driven springs and ResizeObservers, and OurProducts
 * measures its card row and then re-measures when the webfonts land. Doing
 * that while the curtain is moving is what made the reveal stutter. Deferring
 * it until the hero's own transition has run puts the cost on a frame nobody
 * is watching an animation in.
 *
 * It also removes the second half of the products-section bug: with nothing
 * below the fold while the curtain is down, there is no tall document for a
 * restored scroll offset to land in. See `beginReveal` in Preloader.jsx for
 * the other half.
 */
export default function Home() {
  const [revealed, setRevealed] = useState(false);
  const [mountBelowFold, setMountBelowFold] = useState(false);

  /* Both handlers are stable: the preloader keys its release timers off them,
     and a new identity on every render would restart the countdown. */
  const handleReveal = useCallback(() => setRevealed(true), []);

  /* The curtain finishes about a tenth of a second before the hero's last beat
     does, so hand the mount to the first idle frame after that rather than
     racing it. requestIdleCallback with a timeout, because Safari doesn't have
     it and an idle callback that never comes is worse than an early one. */
  const handleComplete = useCallback(() => {
    const mount = () => setMountBelowFold(true);
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(mount, { timeout: 600 });
    } else {
      setTimeout(mount, 300);
    }
  }, []);

  /* Belt and braces: if the preloader is skipped, errors, or the browser
     never fires `load`, the rest of the page still arrives. */
  useEffect(() => {
    if (mountBelowFold) return;
    const t = setTimeout(() => setMountBelowFold(true), 6000);
    return () => clearTimeout(t);
  }, [mountBelowFold]);

  return (
    <>
      <Preloader
        onReveal={handleReveal}
        onComplete={handleComplete}
        logoSrc={logo}
      />

      <Navbar />
      <Hero revealed={revealed} />

      {mountBelowFold && (
        <>
          <OurProducts />
          <Solutions />
          <Testimonials />
          {/* <PlatformOverview /> */}
          {/* <TechnologyDomains /> */}
          {/* <WhyCloud4Green /> */}
          <EnterpriseCTA />
          <Footer />
        </>
      )}
    </>
  );
}
