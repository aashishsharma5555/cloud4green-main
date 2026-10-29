

// import { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

// import Container from "@/components/layout/Container";
// import Section from "@/components/layout/Section";
// import { serviceDomains } from "@/data/serviceDomains";
// // import GlassRefraction from "@/components/hero/GlassRefraction";

// // measured from the reference: 0.62s, expo ease-out
// const EASE = [0.16, 1, 0.3, 1];

// export default function ServiceDomains() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const active = serviceDomains[activeIndex];

//   const next = () =>
//     setActiveIndex((c) => (c === serviceDomains.length - 1 ? 0 : c + 1));
//   const previous = () =>
//     setActiveIndex((c) => (c === 0 ? serviceDomains.length - 1 : c - 1));
//   const Icon = active.icon;

//   return (
//     <Section className="bg-[#071a2e] text-white">
//       <Container>
      
//         {/* ---------- HEADER (unchanged) ---------- */}
//         <div className="max-w-3xl">
//           <span className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
//             Our service domains
//           </span>
//           <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
//             Engineering the
//             <span className="block text-blue-400">modern enterprise.</span>
//           </h2>
//           <p className="mt-6 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
//             From cloud and AI to DevOps and platform engineering, we help
//             enterprises build technology foundations that are ready for what
//             comes next.
//           </p>
//         </div>

//         {/* ---------- TABS (unchanged) ---------- */}
//         <div className="mt-14 flex gap-2 overflow-x-auto pb-3 scrollbar-hide ">
//           {serviceDomains.map((domain, index) => (
//             <button
//               key={domain.id}
//               onClick={() => setActiveIndex(index)}
//               className={`shrink-0 rounded-full border px-2 py-2.5 text-sm font-medium transition-all duration-300 flex gap-1 
//                 ${
//                 index === activeIndex
//                   ? "border-white bg-white text-[#071a2e]"
//                   : "border-white/15 text-white/50 hover:border-white/30 hover:text-white "
//               }`}
//             >
//               <domain.icon /> {domain.title}
//             </button>
//           ))}
//         </div>

//         {/* ---------- STAGE ---------- */}
//         <div className="relative mt-10 min-h-[600px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a2037]">

//           {/* BACK image — up and to the RIGHT, sits behind */}
//           <AnimatePresence mode="popLayout">
//             <motion.div
//               key={`back-${active.id}`}
//               initial={{ opacity: 0, x: -46 }}
//               animate={{ opacity: 0.9, x: 0 }}
//               exit={{ opacity: 0, x: 34 }}
//               transition={{ duration: 0.62, ease: EASE, delay: 0.06 }}
//               className="absolute left-[13%] top-[11%] z-10 h-[50%] w-[35%] overflow-hidden rounded-[1.5rem]"
//             >
//               <img
//                 src={active.secondaryImage}
//                 alt=""
//                 className="h-full w-full object-cover"
//               />
//             </motion.div>
//           </AnimatePresence>

//           {/* FRONT image — down and to the LEFT, overlaps the back one */}
//           <AnimatePresence mode="popLayout">
//             <motion.div
//               key={`front-${active.id}`}
//               initial={{ opacity: 0, x: -46 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 34 }}
//               transition={{ duration: 0.62, ease: EASE }}
//               className="absolute left-[4%] top-[20%] z-20 h-[67%] w-[38%] overflow-hidden rounded-[1.75rem] shadow-[0_30px_70px_rgba(0,0,0,0.55)]"
//             >
//               <img
//                 src={active.primaryImage}
//                 alt=""
//                 className="h-full w-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black/10" />
//             </motion.div>
//           </AnimatePresence>

//           {/* BADGE — straddles the front image's right edge (4% + 38% = 42%) */}
//           {/* <AnimatePresence mode="popLayout">
//             <motion.div
//               key={`badge-${active.id}`}
//               initial={{ opacity: 0, scale: 0.82 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.92 }}
//               transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
//               className="absolute left-[42%] top-[62%] z-30 -ml-[66px] -mt-[66px] flex h-[132px] w-[132px] items-center justify-center rounded-full bg-[#ffffff] shadow-[0_18px_44px_rgba(0,0,0,0.5)]"
//             >
//               {active.icon ? (
//                 <active.icon className="h-14 w-14 text-white" strokeWidth={1.5} />
//               ) : null}
//             </motion.div>
//           </AnimatePresence> */}

//           {/* BADGE — fixed position */}
// <div
//   className="
//     absolute
//     left-[42%]
//     top-[62%]
//     z-30
//     -ml-[66px]
//     -mt-[66px]
//     flex
//     h-[100px]
//     w-[100px]
//     items-center
//     justify-center
//     rounded-full
//     bg-white
//     shadow-[0_18px_44px_rgba(0,0,0,0.5)]
//   "

 

// >
//   {Icon ? (
//     <Icon
//       className="h-14 w-14 text-slate-900"
//       strokeWidth={1.5}
//     />
//   ) : null}
// </div>

//           {/* TEXT — vertically centred, clear of both images */}
//           <div className="absolute left-[55%] right-[6%] top-1/2 z-25 -translate-y-1/2">
//             <AnimatePresence mode="popLayout">
//               <motion.div
//                 key={active.id}
//                 /* reference text ONLY fades — no x/y movement */
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.55, ease: EASE, delay: 0.05 }}
//               >
//                 <span className="text-xs font-medium uppercase tracking-[0.2em] text-blue-400">
//                   {active.label}
//                 </span>
//                 <h3 className="mt-5 text-4xl font-semibold tracking-tight lg:text-5xl">
//                   {active.title}
//                 </h3>
//                 <p className="mt-6 text-base leading-7 text-white/55">
//                   {active.description}
//                 </p>
//                 <button className="group mt-8 flex items-center gap-2 text-sm font-medium">
//                   Explore {active.title}
//                   <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
//                 </button>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* counter + arrows unchanged */}
//           <div className="absolute bottom-8 left-8 z-30 font-mono text-xs text-white/40">
//             {active.number}
//             <span className="mx-2">/</span>
//             {String(serviceDomains.length).padStart(2, "0")}
//           </div>

//           <div className="absolute bottom-7 right-7 z-30 flex gap-2">
//             <button
//               onClick={previous}
//               className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/20 backdrop-blur-md transition hover:bg-white/10"
//             >
//               <ArrowLeft className="h-4 w-4" />
//             </button>
//             <button
//               onClick={next}
//               className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/20 backdrop-blur-md transition hover:bg-white/10"
//             >
//               <ArrowRight className="h-4 w-4" />
//             </button>
//           </div>
//         </div>

//         {/* progress unchanged */}
//         <div className="mt-6 flex gap-2">
//           {serviceDomains.map((domain, index) => (
//             <button
//               key={domain.id}
//               onClick={() => setActiveIndex(index)}
//               className={`h-1 rounded-full transition-all duration-500 ${
//                 index === activeIndex ? "w-12 bg-blue-400" : "w-5 bg-white/20"
//               }`}
//             />
//           ))}
//         </div>
//       </Container>
//     </Section>
//   );
// }

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { serviceDomains } from "@/data/serviceDomains";

const EASE = [0.16, 1, 0.3, 1];

export default function ServiceDomains() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = serviceDomains[activeIndex];
  const Icon = active.icon;

  const next = () =>
    setActiveIndex((c) => (c === serviceDomains.length - 1 ? 0 : c + 1));
  const previous = () =>
    setActiveIndex((c) => (c === 0 ? serviceDomains.length - 1 : c - 1));

  return (
    <Section className="bg-background ">
      <Container>
        {/* ---------- HEADER ---------- */}
        <div className="max-w-3xl">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            Our service domains
          </span>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.06] tracking-tight text-slate-900 sm:text-5xl lg:text-[52px]">
            Engineering the
            <span className="block text-blue-800">modern enterprise.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-[1.65] text-slate-500 sm:text-[16.5px]">
            From cloud and AI to DevOps and platform engineering, we help
            enterprises build technology foundations that are ready for what
            comes next.
          </p>
        </div>

        {/* ---------- TABS ---------- */}
        <div className="scrollbar-hide mt-9 flex flex-nowrap gap-2.5 overflow-x-auto pb-1.5">
          {serviceDomains.map((domain, index) => (
            <button
              key={domain.id}
              onClick={() => setActiveIndex(index)}
              className={`flex flex-none items-center gap-2 rounded-full border bg-white px-[12px] py-[8px] text-[14.5px] transition-all duration-300 ${
                index === activeIndex
                  ? "border-slate-900/5 font-medium text-slate-900 shadow-[0_6px_22px_rgba(15,42,85,0.11)]"
                  : "border-slate-900/[0.09] text-slate-600 hover:text-slate-900"
              }`}
            >
              <domain.icon
                className={`h-[17px] w-[17px] ${
                  index === activeIndex ? "text-blue-600" : "text-slate-400"
                }`}
                strokeWidth={1.7}
              />
              {domain.title}
            </button>
          ))}
        </div>

        {/* ================= CARD =================
            layer 0  blobs   — raw colour, at the very back
            layer 1  glass   — frosted pane; ITS backdrop-filter blurs layer 0
            layer 2+ content — images / copy, sharp on top
        */}
        <div className="relative isolate mt-6 min-h-[610px] overflow-hidden rounded-[34px] border border-slate/90 shadow-[0_26px_64px_rgba(15,42,85,0.08),0_2px_8px_rgba(15,42,85,0.04)]">

          {/* 0 — blobs BEHIND the glass */}
          <div className="absolute inset-0 z-0 bg-[#cacaca]">
            <span
              className="absolute -left-[8%] -top-[4%] block h-[58%] w-[44%] rounded-full"
              style={{
                filter: "blur(46px)",
                background:
                  "radial-gradient(circle, rgba(43, 173, 224, 0.9) 0%, rgb(191 191 191) 48%, rgba(138,189,247,0) 76%)",
              }}
            />
            <span
              className="absolute -right-[12%] top-[8%] block h-[74%] w-[50%] rounded-full"
              style={{
                filter: "blur(46px)",
                background:
                  "radial-gradient(circle, rgba(43, 167, 224, 0.57) 0%, #f6f2ef 50%, rgba(138,189,247,0) 78%)",
              }}
            />
            <span
              className="absolute -bottom-[20%] left-[22%] block h-[48%] w-[44%] rounded-full"
              style={{
                filter: "blur(46px)",
                background:
                  "radial-gradient(circle, rgba(108, 193, 233, 0.6) 0%, #f6f2ef 72%)",
              }}
            />
          </div>

          {/* 1 — the frosted pane */}
          <div
            className="absolute inset-0 z-[1] bg-white/40"
            style={{
              backdropFilter: "blur(40px) saturate(135%)",
              WebkitBackdropFilter: "blur(40px) saturate(135%)",
            }}
          >
            {/* top-left sheen sells the glass edge */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[34px]"
              style={{
                background:
                  "linear-gradient(160deg, rgba(255,255,255,.65) 0%, rgba(255,255,255,0) 42%)",
              }}
            />
          </div>

          {/* 2 — BACK image */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`back-${active.id}`}
              initial={{ opacity: 0, x: -46 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 34 }}
              transition={{ duration: 0.62, ease: EASE, delay: 0.06 }}
              className="absolute left-[15.5%] top-[11%] z-[2] h-[52%] w-[34%] overflow-hidden rounded-[22px]"
            >
              <img src={active.secondaryImage} alt="" className="h-full w-full object-cover" />
            </motion.div>
          </AnimatePresence>

          {/* 2 — FRONT image */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`front-${active.id}`}
              initial={{ opacity: 0, x: -46 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 34 }}
              transition={{ duration: 0.62, ease: EASE }}
              className="absolute left-[5%] top-[21%] z-[2] h-[68%] w-[37.5%] overflow-hidden rounded-[26px] shadow-[0_26px_60px_rgba(9,26,54,0.32)]"
            >
              <img src={active.primaryImage} alt="" className="h-full w-full object-cover" />
            </motion.div>
          </AnimatePresence>

          {/* 3 — BADGE */}
          <div className="absolute left-[41.5%] top-[62%] z-[3] -ml-[52px] -mt-[52px] flex h-[104px] w-[104px] items-center justify-center rounded-full bg-white shadow-[0_16px_38px_rgba(15,42,85,0.16)]">
            {Icon && <Icon className="h-11 w-11 text-blue-600" strokeWidth={1.7} />}
          </div>

          {/* 3 — COPY */}
          <div className="absolute left-[56.5%] right-[6%] top-1/2 z-[3] -translate-y-1/2">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.05 }}
              >
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                  {active.label}
                </span>
                <h3 className="mt-3.5 text-[40px] font-semibold leading-[1.1] tracking-tight text-slate-900">
                  {active.title}
                </h3>
                <p className="mt-4 max-w-[400px] text-[15.5px] leading-[1.7] text-slate-500">
                  {active.description}
                </p>
                <button className="group mt-6 flex items-center gap-2 text-[15px] font-semibold text-blue-600">
                  Explore {active.title}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

 {/* Progress bar */}
<div className="mt-6 gap-2 absolute z-[3] md:flex bottom-[30px] left-[34px] sm:hidden ">
       {serviceDomains.map((domain, index) => (
            <button
              key={domain.id}
              onClick={() => setActiveIndex(index)}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === activeIndex ? "w-12 bg-blue-400" : "w-5 bg-black/20"
              }`}
            />
          ))}
        </div>

          {/* 3 — ARROWS */}
          <div className="absolute bottom-[30px] right-[34px] z-[3] flex gap-3">
            <button
              onClick={previous}
              className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-slate-900/10 bg-white/70 text-slate-700 transition hover:bg-white"
            >
              <ArrowLeft className="h-[17px] w-[17px]" />
            </button>
            <button
              onClick={next}
              className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-slate-900/10 bg-white/70 text-slate-700 transition hover:bg-white"
            >
              <ArrowRight className="h-[17px] w-[17px]" />
            </button>
          </div>
          
        </div>
      </Container>
    </Section>
  );
}