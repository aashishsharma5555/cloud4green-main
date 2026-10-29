// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
// import Container from "@/components/layout/Container";
import CtaSection from "@/components/sections/enterprise-cta/EnterpriseCTA";
// import { Button } from "@/components/ui/button";
import CatalougeSection from "@/components/enterprise-labs/CatalogueSections";



// import heroImage from "@/assets/images/clients.jpg";
// // import flowBackdrop from "@/assets/images/pexels-steve-12843342.jpg";
// import labFlowIllustration from "@/assets/images/lab10.png";
// import LabFlow from "@/components/sections/enterprise-lab/LabFlow";
import Howitworks from "@/components/enterprise-labs/HowItWorks";
import WhoItsFor from "@/components/enterprise-labs/WhoIsItFor";
import FaqSection from "@/components/faq/FaqSection";
import { enterpriseLabsFaqs } from "@/data/faqs";

/**
 * /products/enterprise-labs — the first of the five product pages the Products
 * mega menu links to (see src/config/navigation.js).
 *
 * The masthead is the editorial pattern: a section sub-nav under the site
 * navbar, then a full-bleed photograph with a dark translucent card sitting on
 * the left third of it carrying the label, the headline and the calls to
 * action. Everything below it is the site's own language — cream ground, ink
 * display type set in Recoleta and uppercased with the blue full stop, blue
 * only as an accent — and the page closes on the same <CtaSection> the homepage
 * does, so the step down into the black footer is identical across the site.
 *
 * Recoleta ships as a single Medium file (see the @font-face in index.css), so
 * every display line here is font-medium. Asking for a heavier weight would get
 * a synthesised bold.
 */

const EASE = [0.22, 1, 0.36, 1];

/* The sub-nav doubles as the page's table of contents; each entry is the id of
   a section below. */





/* --- Content ------------------------------------------------------------- */

/* The numbers are the portfolio's, the same three quoted in the closing CTA. */










/* --- Page ---------------------------------------------------------------- */

export default function EnterpriseLabs() {
  return (
    <>
      <Navbar />

      {/* ── Section sub-nav ────────────────────────────────────────── */}
      {/* Sits under the site navbar, in flow rather than sticky: the navbar
          above it is already sticky, and two stacked sticky bars eat a third of
          a laptop viewport. Scrolls horizontally on a phone instead of
          wrapping, so the row stays one line at every width. */}
      {/*  */}

      <main className="bg-[#FAFAF7]">
        {/* ── Masthead ─────────────────────────────────────────────── */}
                      




        {/* ── Overview ─────────────────────────────────────────────── */}
<Howitworks/> {/* this is where svg and hero lies */}
<CatalougeSection />
 <WhoItsFor/>
        
       

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        {/* Same component as /products/e-learning; only the questions
            differ. The copy lives in src/data/faqs.js. */}
        <FaqSection faqs={enterpriseLabsFaqs} />

        {/* ── Closing CTA — the homepage's, unchanged ──────────────── */}
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}

/* --- Overview visual ----------------------------------------------------- */

/**
 * A lab environment being provisioned: the product's one irreducible moment,
 * drawn rather than screenshotted so it stays legible at any width and doesn't
 * date the page the next time a cloud console gets restyled.
 *
 * Static on purpose. A ticking fake terminal reads as a loading state that
 * never resolves, and the point of the panel is the resolved state — the last
 * line is the environment being ready.
 */
// function LabConsole() {
//   const lines = [
//     { text: "$ lab start aws/eks-production-readiness", tone: "cmd" },
//     { text: "→ provisioning account  ······  learner-0148", tone: "dim" },
//     { text: "→ applying guardrails   ······  iam, budget, ttl 4h", tone: "dim" },
//     { text: "→ seeding cluster       ······  3 nodes, 2 namespaces", tone: "dim" },
//     {
//       text: "✓ environment ready     ······  console + credentials issued",
//       tone: "ok",
//     },
//   ];

//   const tasks = [
//     { label: "Expose the service behind an ingress", state: "done" },
//     { label: "Set a pod disruption budget", state: "done" },
//     { label: "Survive a node drain", state: "active" },
//     { label: "Cap the namespace at 4 vCPU", state: "todo" },
//   ];

//   return (
//     <div className="relative">
//       {/* ambient blue wash, the section's only colour behind the panel */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -inset-8 rounded-[32px] bg-[#0B5CFF]/[0.07] blur-[60px]"
//       />

//       <div className="relative overflow-hidden rounded-[18px] border border-[#DFE6F5] bg-white shadow-[0_24px_60px_-24px_rgba(16,32,74,0.3)]">
//         {/* title bar */}
//         <div className="flex items-center gap-3 border-b border-[#101418]/8 bg-[#FBFDFF] px-5 py-3.5">
//           <span className="flex gap-1.5">
//             <span className="h-2.5 w-2.5 rounded-full bg-[#E4E8EB]" />
//             <span className="h-2.5 w-2.5 rounded-full bg-[#E4E8EB]" />
//             <span className="h-2.5 w-2.5 rounded-full bg-[#E4E8EB]" />
//           </span>

//           <span className="truncate text-[12px] font-medium tracking-[-0.01em] text-[#6B7280]">
//             eks-production-readiness · lab session
//           </span>

//           <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#0B5CFF]/8 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0B5CFF]">
//             <span className="h-1.5 w-1.5 rounded-full bg-[#0B5CFF]" />
//             Live
//           </span>
//         </div>

//         {/* the shell */}
//         <div className="overflow-x-auto bg-[#101418] px-5 py-5 font-mono text-[12.5px] leading-6">
//           {lines.map((l) => (
//             <p
//               key={l.text}
//               className={`whitespace-pre ${
//                 l.tone === "cmd"
//                   ? "text-white"
//                   : l.tone === "ok"
//                     ? "text-[#5CE08A]"
//                     : "text-white/45"
//               }`}
//             >
//               {l.text}
//             </p>
//           ))}
//         </div>

//         {/* the tasks the environment is there to serve */}
//         <div className="px-5 py-5">
//           <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
//             Objectives
//           </p>

//           <ul className="mt-3.5 space-y-2.5">
//             {tasks.map((t) => (
//               <li key={t.label} className="flex items-center gap-3">
//                 <span
//                   aria-hidden="true"
//                   className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border text-[9px] font-bold ${
//                     t.state === "done"
//                       ? "border-[#0B5CFF] bg-[#0B5CFF] text-white"
//                       : t.state === "active"
//                         ? "border-[#0B5CFF] text-[#0B5CFF]"
//                         : "border-[#E4E8EB] text-transparent"
//                   }`}
//                 >
//                   ✓
//                 </span>

//                 <span
//                   className={`text-[13.5px] ${
//                     t.state === "todo" ? "text-[#9AA3AF]" : "text-[#101418]"
//                   }`}
//                 >
//                   {t.label}
//                 </span>

//                 {t.state === "active" && (
//                   <span className="ml-auto shrink-0 text-[11px] font-medium uppercase tracking-[0.1em] text-[#0B5CFF]">
//                     Checking
//                   </span>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
