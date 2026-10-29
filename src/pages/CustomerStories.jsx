import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CtaSection from "@/components/sections/enterprise-cta/EnterpriseCTA";
import CustomerStoriesHero from "@/components/customer-stories/CustomerStoriesHero";
import GoogleReviews from "@/components/customer-stories/GoogleReviews";

/**
 * /customers — linked from the "Customer stories" promo in both navbar mega
 * menus and the top-level nav item (see src/config/navigation.js).
 *
 * Masthead, then real Google reviews in the home page's testimonial card,
 * closing on the same <CtaSection> as every other page. The reviews live
 * in src/data/googleReviews.js.
 */
export default function CustomerStories() {
  return (
    <>
      <Navbar />

      <main className="bg-[#FAFAF7]">
        <CustomerStoriesHero industryCount={20} />
        <GoogleReviews />
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
