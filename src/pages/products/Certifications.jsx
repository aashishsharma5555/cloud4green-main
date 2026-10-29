import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import CtaSection from "@/components/sections/enterprise-cta/EnterpriseCTA";

import CertificationHero from "@/components/certifications/CertHero";
import CertificationPathway from "@/components/certifications/CertificationTracks.jsx";
import Banner from "@/components/certifications/TrainingBanner";
import CertBenefits from "@/components/certifications/CertBenefits";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";

// import FaqSection from "@/components/faq/FaqSection";
// import { certificationsFaqs } from "@/data/faqs";

/**
 * /products/certifications — the third of the five product pages the Products
 * mega menu links to (see src/config/navigation.js).
 *
 * Blank scaffold. The placeholder <Placeholder> blocks below are there to hold
 * the shape of the page; replace each one with its real section component as it
 * gets built, and drop <Placeholder> once the last one is gone.
 *
 * House rules the sections follow, same as /products/enterprise-labs and
 * /products/e-learning:
 *   · cream ground (#FAFAF7), white for the alternating band
 *   · display type in font-recoleta, uppercase, tracking tightened, with the
 *     blue full stop; Recoleta ships Medium only, so always font-medium
 *   · #101418 ink, #4A5261 body copy, #0B5CFF blue as an accent only
 *   · every section scroll-mt-24 so the sub-nav anchors don't sit under the navbar
 *
 * Section components belong in src/components/Certifications/, mirroring
 * src/components/E-learning/ and src/components/EnterpriseLabs/.
 */

/* The section sub-nav is no longer a per-page affair: it's tier 2 of the
   navbar now, and this page's entries live in src/config/productNav.js. It
   points at the four built sections only — a link that lands on a placeholder
   reads as a broken page, so add each one there as it gets built. */

/** The brand asterisk, as it appears on the hero and in the closing CTA. */
function Asterisk({ className = "h-3.5 w-3.5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      strokeWidth="2.4"
      strokeLinecap="round"
      className={`shrink-0 stroke-[#0B5CFF] ${className}`}
    >
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
    </svg>
  );
}

/** Section eyebrow: asterisk, then a tracked-out label in accent blue. */
function Eyebrow({ children }) {
  return (
    <p className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0B5CFF]">
      <Asterisk />
      {children}
    </p>
  );
}

/**
 * Temporary stand-in for a section that hasn't been built yet. Carries the id
 * so the sub-nav anchors already resolve, and the band/ground alternation so
 * the page reads at the right rhythm while it's still empty.
 */
function Placeholder({ id, eyebrow, title, band = false, children }) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-[#101418]/8 py-20 lg:py-28 ${
        band ? "bg-white" : "bg-[#FAFAF7]"
      }`}
    >
      <Container>
        <RevealGroup delay={CUE.lead}>
          <RevealItem>
            <Eyebrow>{eyebrow}</Eyebrow>
          </RevealItem>

          <RevealItem as="h2" className="mt-5 max-w-2xl font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.015em] text-[#101418] sm:text-[2.3rem]">
            {title}
            <span className="text-[#0B5CFF]">.</span>
          </RevealItem>

          <RevealItem>
            {children ?? (
              <p className="mt-5 max-w-xl text-[14.5px] leading-7 text-[#4A5261]">
                Section to come.
              </p>
            )}
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}

/* --- Page ---------------------------------------------------------------- */

export default function Certifications() {
  return (
    <>
      <Navbar />
      <CertificationHero />
      
      <CertificationPathway />
      <Banner />
      <CertBenefits/>
      <CtaSection />
      

      <Footer />
    </>
  );
}
