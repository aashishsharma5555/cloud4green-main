import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import CtaSection from "@/components/sections/enterprise-cta/EnterpriseCTA";
import ConsultingHero from "@/components/consulting/ConsultingHero";
import ConsultingOfferings from "@/components/consulting/ConsultingOfferings";

/**
 * /services/consulting — linked from the Services tab of the navbar mega menu
 * (see src/config/navigation.js).
 *
 * Blank scaffold: replace the section below with the real section components
 * (src/components/Services/Consulting/) as they get built.
 */
export default function Consulting() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FAFAF7]">
      <ConsultingHero/>
      <ConsultingOfferings/>
       

        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
