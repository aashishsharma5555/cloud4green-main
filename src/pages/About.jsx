import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CtaSection from "@/components/sections/enterprise-cta/EnterpriseCTA";
import Testimonials from "@/components/sections/testimonials/Testimonials";
import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import OurValues from "@/components/about/OurValues";
import WhatWeDo from "@/components/about/WhatWeDo";

/**
 * /about — linked from the footer's Company column.
 *
 * Built on the same lines as /customers and /whats-new: masthead, the
 * story with the house numbers, how we work, everything we offer, the
 * home page's Google-review marquee, and the shared closing CTA.
 */
export default function About() {
  return (
    <>
      <Navbar />

      <main className="bg-[#FAFAF7]">
        <AboutHero />
        <OurStory />
        <OurValues />
        <WhatWeDo />
        <Testimonials />
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
