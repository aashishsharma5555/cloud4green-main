import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import CtaSection from "@/components/sections/enterprise-cta/EnterpriseCTA";
import AutomationHero from "@/components/automation/AutomationHero";
import ProblemsWeSolve from "@/components/automation/ProblemsWeSolve";
import AutomationCapabilities from "@/components/automation/AutomationCapabilities";
import AutomationCatalogue from "@/components/automation/AutomationCatalogue";
import AutoEcosystem from "@/components/automation/AutoEcosystem";
import DeliveryProcess from "@/components/automation/DeliveryProcess";

/**
 * /services/automation — linked from the Services tab of the navbar mega menu
 * (see src/config/navigation.js).
 *
 * Blank scaffold: replace the section below with the real section components
 * as they get built.
 */
export default function Automation() {
  return (
    <>
      <Navbar />

      <main className="bg-[#FAFAF7]">
        <AutomationHero/>
        <ProblemsWeSolve/>
        <AutomationCapabilities/>
        <AutomationCatalogue/>
        <AutoEcosystem/>
        <DeliveryProcess/>
        

        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
