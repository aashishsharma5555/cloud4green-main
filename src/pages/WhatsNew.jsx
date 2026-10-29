import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CtaSection from "@/components/sections/enterprise-cta/EnterpriseCTA";
import WhatsNewHero from "@/components/whats-new/WhatsNewHero";
import ReyvanXSpotlight from "@/components/whats-new/ReyvanXSpotlight";
import UpdatesTimeline from "@/components/whats-new/UpdatesTimeline";

/**
 * /whats-new — linked from the "What's new" promo in the Products mega menu
 * (see src/config/navigation.js).
 *
 * Built on the same lines as /customers: masthead, one launch at full width
 * (ReyvanX), then every update as a filterable, month-grouped changelog, and
 * the shared closing CTA. All copy lives in src/data/whatsNew.js.
 */
export default function WhatsNew() {
  return (
    <>
      <Navbar />

      <main className="bg-[#FAFAF7]">
        <WhatsNewHero />
        <ReyvanXSpotlight />
        <UpdatesTimeline />
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
