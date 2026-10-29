import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Container from "@/components/layout/Container";
import PageGrid from "@/components/backgrounds/PageGrid";
import Footer from "@/components/layout/Footer";
import EnterpriseHubVisual from "@/components/enterprise/EnterpriseHubVisual";
// import EnterpriseEcosystem from "@/components/enterprise/EnterpriseEcosystem";
import EnterpriseEcosystemFinal from "@/components/enterprise/EnterpriseEcosystemFinal";
import {
  Reveal,
  RevealGroup,
  RevealGround,
  RevealItem,
  RevealLines,
} from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";

import Image from '@/assets/images/lms2.png'

export default function Enterprise() {
  return (
    <>
      <Navbar />

      <main>
        <section className="relative min-h-[calc(100vh-80px)] overflow-hidden">
  {/* Background image */}
  {/* Ground — fades up with no travel, like the homepage map. The 50% is
      the resting opacity, so it is the animate target rather than a class. */}
  <RevealGround
    mount
    opacity={0.5}
    className="
      absolute
      inset-0
      scale-110
      bg-cover
      bg-center
      bg-no-repeat
    "
    style={{
      backgroundImage: `url(${Image})`,
    }}
  />

  {/* Soft veil over the image */}
  <div className="absolute inset-0 bg-background/10" />

  {/* The corner grid, in this page's diagonal — PageGrid picks it from the
      URL. At 0 it sits on the photo and its veil (both unpositioned in the
      stack) and under the hero content, which is z-10. */}
  <PageGrid z={0} />

  {/* Hero content */}
  <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center">
    <Container>
      <div className="flex justify-center items-center gap-16 py-20  lg:gap-24">

        {/* Left — Content */}
        <RevealGroup mount delay={CUE.lead} className="max-w-2xl backdrop-blur-sm">

          {/* Eyebrow */}
          <RevealItem className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#08243F]/10 bg-white/70 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-blue-900 " />
            Enterprise Learning
          </RevealItem>

          {/* Heading */}
          <RevealLines
            nested
            as="h1"
            lines={[
              "Learning built for",
              <span className="text-[blue-900]">modern enterprises.</span>,
            ]}
            className="font-heading text-5xl font-semibold tracking-[-0.04em] text-[#08243F] sm:text-6xl lg:text-7xl"
          />

          {/* Description */}
          <RevealItem as="p" className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            A powerful enterprise learning platform that brings
            training, cloud labs, certifications, and hands-on
            learning into one place.
          </RevealItem>

          {/* CTA */}
          <RevealItem className="mt-8 flex flex-wrap gap-4">
            <a
              href="#platform"
              className="
                rounded-full
                bg-[#08243F]
                px-6
                py-3
                text-sm
                font-medium
                text-white
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#0d3153]
              "
            >
              Explore Enterprise
            </a>

            <Link
              to="/contact"
              className="
                rounded-full
                border
                border-[#08243F]/15
                bg-white/70
                px-6
                py-3
                text-sm
                font-medium
                text-[#08243F]
                backdrop-blur-sm
                transition-all
                duration-300
                hover:bg-white
              "
            >
              Talk to us
            </Link>
          </RevealItem>
        </RevealGroup>

        {/* Right — Platform hub animation */}
        {/* <div className="flex items-center justify-center">
          <EnterpriseHubVisual />
        </div> */}

      </div>
    </Container>
  </div>
</section>

 {/* Enterprise animated box */}

 {/* ===================================================== */}
{/* ENTERPRISE PLATFORM */}
{/* ===================================================== */}

<section id="platform" className="relative scroll-mt-20 overflow-hidden bg-blue-300 text-white">

  <div className="grid min-h-[720px] grid-cols-1 lg:grid-cols-2">

    {/* ================================================= */}
    {/* LEFT — TEXT */}
    {/* ================================================= */}

    <div className="relative flex items-center">

      {/* Subtle ambient glow */}
      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-1/2
          h-[500px]
          w-[500px]
          -translate-y-1/2
          rounded-full
          bg-[#159447]/10
          blur-3xl
        "
      />

      <Container className="flex justify-center">
        <RevealGroup delay={CUE.lead} className="relative z-10 max-w-xl py-24 lg:py-32">

          {/* Eyebrow */}
          {/* <div
            className="
              mb-7
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/15
              bg-white/5
              px-4
              py-2
              text-sm
              text-white/70
            "
          >
            <span className="h-2 w-2 rounded-full bg-blue-800" />

            One connected platform
          </div> */}
          <RevealItem as="span" className="block text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            One connected platform
          </RevealItem>


          {/* Heading */}
          <RevealLines
            nested
            as="h2"
            lines={[
              "Everything your",
              <span className="text-blue-900">enterprise needs.</span>,
            ]}
            className="
              font-heading
              text-4xl
              font-semibold
              leading-[1.05]
              tracking-[-0.04em]
              text-white
              sm:text-5xl
              lg:text-6xl
            "
          />


          {/* Description */}
          <RevealItem
            as="p"
            className="
              mt-7
              max-w-lg
              text-lg
              leading-8
              text-white/65
            "
          >
            Connect enterprise learning, cloud labs, AI labs,
            certifications, and analytics through one unified
            learning ecosystem.
          </RevealItem>


          {/* Small supporting statement */}
          <RevealItem className="mt-10 flex items-center gap-4">

            <div className="h-px w-12 bg-[#159447]" />

            <p className="text-sm font-medium text-white/50">
              Built for modern enterprise learning
            </p>

          </RevealItem>

        </RevealGroup>
      </Container>
    </div>


    {/* ================================================= */}
    {/* RIGHT — HUB VISUAL */}
    {/* ================================================= */}

    <div
      className="
        relative
        flex
        min-h-[560px]
        items-center
        justify-center
        overflow-hidden
        bg-white
        
        px-8
        py-20
        lg:min-h-0
      "
    >

      {/* Ambient green glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#159447]/10
          blur-[100px]
        "
      />


      {/* Ambient blue glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[400px]
          w-[400px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-400/10
          blur-[90px]
        "
      />


      {/* Hub */}
      <Reveal delay={CUE.follow} className="relative z-10 w-full max-w-[560px]">
        <EnterpriseHubVisual />
      </Reveal>

    </div>

  </div>

</section>

        {/* Learning tracks — tap or auto-advancing accordion */}
        <Container>
          {/* <EnterpriseEcosystem /> */}
          <EnterpriseEcosystemFinal/>
        </Container>
      </main>

      <Footer/>
    </>
  );
}

