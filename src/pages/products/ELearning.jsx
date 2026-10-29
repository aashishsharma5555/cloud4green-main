import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CtaSection from "@/components/sections/enterprise-cta/EnterpriseCTA";

import LearningSolutions from "@/components/e-learning/LearningSolutions";
import ScrubSection from "@/components/e-learning/ScrubSection";
import Pillarssection from "@/components/e-learning/PillarsSection";
import Statssection from "@/components/e-learning/StatsSection";
import Industriessection from "@/components/e-learning/IndustriesSection";
import FaqSection from "@/components/faq/FaqSection";
import { eLearningFaqs } from "@/data/faqs";

/**
 * /products/e-learning — the second of the five product pages the Products
 * mega menu links to (see src/config/navigation.js).
 *
 * House rules the sections below follow, same as /products/enterprise-labs:
 *   · cream ground (#FAFAF7), white for the alternating band
 *   · display type in font-recoleta, uppercase, tracking tightened, with the
 *     blue full stop; Recoleta ships Medium only, so always font-medium
 *   · #101418 ink, #4A5261 body copy, #0B5CFF blue as an accent only
 *   · every section scroll-mt-24 so the sub-nav anchors don't sit under the navbar
 */

/* The section sub-nav is no longer a per-page affair: it's tier 2 of the
   navbar now, and this page's entries live in src/config/productNav.js. The
   ids it points at are on the section components themselves. */

export default function ELearning() {
  return (
    <>
      <Navbar />

      <main className="bg-[#FAFAF7]">
        <LearningSolutions />
        <ScrubSection />
        <Pillarssection />
        <Statssection />
        <Industriessection />

        {/* ── FAQ ─────────────────────────────────────────────────────────── */}
        {/* Same component as /products/enterprise-labs; only the questions and
            the layout differ. This page runs eight of them, so the centred
            two-column arrangement keeps the list off the fold. */}
        <FaqSection
          faqs={eLearningFaqs}
          layout="centered"
          title="The ones we always get"
        />

        {/* ── Closing CTA — the homepage's, unchanged ─────────────────────── */}
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
