

// import { motion } from "framer-motion";
// import { ImageIcon } from "lucide-react";
// import aws from "@/assets/images/aws.png"
// import openAi from "@/assets/images/openAi.png";
// import claude from "@/assets/images/claude.png";

// const HeroVisual = () => {
//   const noiseTexture = `
//     url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")
//   `;

//   // === PLACEHOLDER CONTENT ===
//   // Each cluster = one anchor label + N icons radiating from it in different directions.
//   // Replace `label` with real copy, and swap each icon's `src: null` for a real logo later.
//   const clusters = [
//     {
//       id: "topic-1",
//       anchor: { top: 14, left: 25 },
//       label: "Placeholder question one?",
//       icons: [
//         { name: "Icon", src: aws, pos: { top: 5, left: 12 } },{

//           name: "Azure", src: null, pos: {top: 4, left: 45}
//         }
//       ],
//     },
//     {
//       id: "ai",
//       anchor: { top: 90, left: 25 },
//       label: "Which AI models will you learn?",
//       icons: [
//         { name: "ChatGPT", src: openAi, pos: { top: 28, left: 10 } },
//         { name: "Claude", src: claude, pos: { top: 60, left: 22 } },
//         { name: "Mistral", src: null, pos: { top: 72, left: 3 } },
//       ],
//     },
//     // {
//     //   id: "topic-3",
//     //   anchor: { top: 80, left: 12 },
//     //   label: "Placeholder question three?",
//     //   icons: [
//     //     { name: "Icon", src: null, pos: { top: 90, left: 4 } },
//     //   ],
//     // },
//     {
//       id: "topic-4",
//       anchor: { top: 30, left: 60 },
//       label: "Placeholder question four?",
//       icons: [
//         { name: "Icon", src: null, pos: { top: 8, left: 86 } },
//         { name: "Icon", src: null, pos: { top: 26, left: 40 } },
//         { name: "Icon", src: null, pos: { top: 56, left: 90 } },
//       ],
//     },
//     {
//       id: "topic-5",
//       anchor: { top: 76, left: 78 },
//       label: "Placeholder question five?",
//       icons: [
//         { name: "Icon", src: null, pos: { top: 90, left: 84 } },
//         { name: "Icon", src: null, pos: { top: 70, left: 56} },
//       ],
//     },
//   ];

//   return (
//     <div className="relative mt-24 mb-12 w-full">
//       <div
//         className="
//           relative
//           h-[650px]
//           w-full
//           overflow-hidden
//           rounded-[32px]
//           border
//           border-black/10
//           bg-[#f4f6fa]
//           shadow-2xl
//         "
//       >
//         {/* =====================================================
//             BLUE ATMOSPHERE
//         ====================================================== */}
//         <div
//           className="absolute inset-0 scale-125 blur-[45px]"
//           style={{
//             background: `
//               radial-gradient(
//                 ellipse 75% 75% at 48% 48%,
//                 #020711 0%,
//                 #06132d 20%,
//                 #0b2d6b 38%,
//                 #020914 52%,
//                 #010811 68%,
//                 #000203 82%,
//                 #f4f6fa 100%
//               )
//             `,
//           }}
//         />

//         {/* LARGE DARK CORE */}
//         <div
//           className="absolute left-[25%] top-[28%] h-[58%] w-[65%] rounded-full blur-[35px]"
//           style={{
//             background: `
//               radial-gradient(
//                 ellipse at center,
//                 #021336 50%,
//                 #020813 28%,
//                 #01060fd7 12%,
//                 rgba(2, 38, 61, 0.07) 68%,
//                 transparent 82%
//               )
//             `,
//           }}
//         />

//         {/* BLUE LEFT / TOP GLOW */}
//         <div
//           className="absolute -left-[15%] -top-[20%] h-[75%] w-[75%] rounded-full blur-[60px] opacity-90"
//           style={{
//             background:
//               "radial-gradient(circle, #020c1b 100%, #010813 135%, transparent 72%)",
//           }}
//         />

//         {/* BLUE LOWER GLOW */}
//         <div
//           className="absolute -bottom-[25%] left-[5%] h-[65%] w-[70%] rounded-full blur-[65px] opacity-80"
//           style={{
//             background:
//               "radial-gradient(circle, #010711 100%, #010711 40%, transparent 72%)",
//           }}
//         />

//         {/* SOFT WHITE HAZE AROUND EDGES */}
//         <div
//           className="pointer-events-none absolute inset-0"
//           style={{
//             background: `
//               radial-gradient(
//                 ellipse 85% 90% at 50% 50%,
//                 transparent 45%,
//                 rgba(16, 77, 151, 0.25) 72%,
//                 rgba(1, 10, 22, 0.98) 100%
//               )
//             `,
//           }}
//         />

//         {/* GRAIN */}
//         <div
//           className="pointer-events-none absolute inset-0 z-20 opacity-[0.28] mix-blend-overlay"
//           style={{
//             backgroundImage: noiseTexture,
//             backgroundRepeat: "repeat",
//             backgroundSize: "140px 140px",
//           }}
//         />
//         <div
//           className="pointer-events-none absolute inset-0 z-20 opacity-[0.10] mix-blend-soft-light"
//           style={{
//             backgroundImage: noiseTexture,
//             backgroundRepeat: "repeat",
//             backgroundSize: "70px 70px",
//           }}
//         />

//         {/* =====================================================
//             CONSTELLATION CLUSTERS (anchor label + N radiating icons)
//         ====================================================== */}
//         <svg
//           className="pointer-events-none absolute inset-0 z-20 hidden h-full w-full md:block"
//           viewBox="0 0 100 100"
//           preserveAspectRatio="none"
//         >
//           {clusters.map((cluster) =>
//             cluster.icons.map((icon) => (
//               <line
//                 key={`${cluster.id}-${icon.name}`}
//                 x1={cluster.anchor.left}
//                 y1={cluster.anchor.top}
//                 x2={icon.pos.left}
//                 y2={icon.pos.top}
//                 stroke="rgba(255, 255, 255, 0.64)"
//                 strokeWidth={0.1}
//               />
//             ))
//           )}
//         </svg>

//         <div className="absolute inset-0 z-20 hidden md:block">
//           {clusters.map((cluster, ci) => (
//             <div key={cluster.id}>
//               {/* anchor label */}
//               <motion.div
//                 className="absolute w-40 text-sm leading-snug text-white/80"
//                 style={{ top: `${cluster.anchor.top}%`, left: `${cluster.anchor.left}%` }}
//                 animate={{ y: [0, -8, 0],x: [0, -6, 0] }}
//                 transition={{
//                   duration: 4 + ci * 0.3,
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                 }}
//               >
//                 {cluster.label}
//               </motion.div>

//               {/* icons radiating from this anchor — replace src=null with real logos */}
//               {cluster.icons.map((icon, ii) => (
//                 <motion.div
//                   key={icon.name}
//                   className="absolute flex h-14 w-14 flex-col items-center justify-center gap-1 rounded-md border border-dashed border-white/30 bg-white/5 backdrop-blur-sm"
//                   style={{ top: `${icon.pos.top}%`, left: `${icon.pos.left}%` }}
//                   animate={{ y: [0.5, -9, 1.5], x: [0.5, -9, -0.5] }}
//                   transition={{
//                     duration: 3.5 + ii * 0.4,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                     delay: ci * 0.2 + ii * 0.3,
//                   }}
//                 >
//                   {icon.src ? (
//                     <img src={icon.src} alt={icon.name} className="h-6 w-6 object-contain" />
//                   ) : (
//                     <>
//                       <ImageIcon className="h-4 w-4 text-white/40" />
//                       <span className="text-[9px] leading-none text-white/40">{icon.name}</span>
//                     </>
//                   )}
//                 </motion.div>
//               ))}
//             </div>
//           ))}
//         </div>

//         {/* =====================================================
//             CONTENT
//         ====================================================== */}
//         <div className="relative z-30 flex h-full items-center justify-center px-10">
//           <h1 className="relative z-10 max-w-2xl text-center text-4xl leading-tight text-white font-script">
//             We build hands-on labs and learning paths that turn Cloud & AI experts.
//           </h1>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroVisual;

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import aws from "@/assets/images/aws.png";
import openAi from "@/assets/images/openAi.png";
import claude from "@/assets/images/claude.png";

const HeroVisual = () => {
  const noiseTexture = `
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")
  `;

  // === PLACEHOLDER CONTENT ===
 

  const clusters = [
    {
      id: "topic-1",
      anchor: { top: 18, left: 25 },
      label: "Placeholder question one?",
      labelOffset: { x: -20, y: 25 }, // sits down-left of the anchor point
      icons: [
        { name: "Icon", src: aws, pos: { top: 5, left: 12 } },
        { name: "Azure", src: null, pos: { top: 4, left: 45 } },
      ],
    },
    {
      id: "ai",
      anchor: { top: 90, left: 25 },
      label: "Which AI models will you learn?",
      labelOffset: { x: 20, y: 20 }, // sits up-right of the anchor point
      icons: [
        { name: "ChatGPT", src: openAi, pos: { top: 38, left: 10 } },
        { name: "Claude", src: claude, pos: { top: 60, left: 32 } },
        { name: "Mistral", src: null, pos: { top: 72, left: 3 } },
      ],
    },
    {
      id: "topic-4",
      anchor: { top: 30, left: 60 },
      label: "Placeholder question four?",
      labelOffset: { x: 0, y: -30 },
      icons: [
        { name: "Icon", src: null, pos: { top: 8, left: 86 } },
        { name: "Icon2", src: null, pos: { top: 26, left: 40 } },
        { name: "Icon3", src: null, pos: { top: 50, left: 90 } },
      ],
    },
    {
      id: "topic-5",
      anchor: { top: 70, left: 78 },
      label: "Placeholder question five?",
      labelOffset: { x: -15, y: -20 },
      icons: [
        { name: "Icon", src: null, pos: { top: 90, left: 84 } },
        { name: "Icon2", src: null, pos: { top: 70, left: 56 } },
      ],
    },
  ];

  // Live-tracked connector lines: refs to the actual DOM nodes for each anchor/icon,
  // updated every animation frame from their real rendered position — no keyframe
  // duplication needed, so it stays correct no matter how the motion values change.
  const containerRef = useRef(null);
  const anchorRefs = useRef({});
  const iconRefs = useRef({});
  const lineRefs = useRef({});

  useEffect(() => {
    let frameId;

    const updateLines = () => {
      const containerEl = containerRef.current;
      if (containerEl) {
        const containerRect = containerEl.getBoundingClientRect();

        clusters.forEach((cluster) => {
          const anchorEl = anchorRefs.current[cluster.id];
          if (!anchorEl) return;
          const anchorRect = anchorEl.getBoundingClientRect();
          // to find the horizontal center of the anchor
          const ax = anchorRect.left + anchorRect.width / 2 - containerRect.left;
          // to find the vertical center of the anchor
          const ay = anchorRect.top + anchorRect.height / 2 - containerRect.top;

          cluster.icons.forEach((icon) => {
            const key = `${cluster.id}-${icon.name}`;
            const iconEl = iconRefs.current[key];
            const lineEl = lineRefs.current[key];
            if (!iconEl || !lineEl) return;
            const iconRect = iconEl.getBoundingClientRect();
            const ix = iconRect.left + iconRect.width / 2 - containerRect.left;
            const iy = iconRect.top + iconRect.height / 2 - containerRect.top;

            lineEl.setAttribute("x1", ax);
            lineEl.setAttribute("y1", ay);
            lineEl.setAttribute("x2", ix);
            lineEl.setAttribute("y2", iy);
          });
        });
      }

      frameId = requestAnimationFrame(updateLines);
    };

    frameId = requestAnimationFrame(updateLines);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="relative mt-24 mb-12 w-full">
      <div
        ref={containerRef}
        className="
          relative
          h-[650px]
          w-full
          overflow-hidden
          rounded-[32px]
          border
          border-black/10
          bg-[#f4f6fa]
          shadow-2xl
        "
      >
        {/* BLUE ATMOSPHERE */}
        <div
          className="absolute inset-0 scale-125 blur-[45px]"
          style={{
            background: `
              radial-gradient(
                ellipse 75% 75% at 48% 48%,
                #020711 0%,
                #06132d 20%,
                #0b2d6b 38%,
                #020914 52%,
                #010811 68%,
                #000203 82%,
                #f4f6fa 100%
              )
            `,
          }}
        />

        {/* LARGE DARK CORE */}
        <div
          className="absolute left-[25%] top-[28%] h-[58%] w-[65%] rounded-full blur-[35px]"
          style={{
            background: `
              radial-gradient(
                ellipse at center,
                #021336 50%,
                #020813 28%,
                #01060fd7 12%,
                rgba(2, 38, 61, 0.07) 68%,
                transparent 82%
              )
            `,
          }}
        />

        {/* BLUE LEFT / TOP GLOW */}
        <div
          className="absolute -left-[15%] -top-[20%] h-[75%] w-[75%] rounded-full blur-[60px] opacity-90"
          style={{
            background:
              "radial-gradient(circle, #020c1b 100%, #010813 135%, transparent 72%)",
          }}
        />

        {/* BLUE LOWER GLOW */}
        <div
          className="absolute -bottom-[25%] left-[5%] h-[65%] w-[70%] rounded-full blur-[65px] opacity-80"
          style={{
            background:
              "radial-gradient(circle, #010711 100%, #010711 40%, transparent 72%)",
          }}
        />

        {/* SOFT WHITE HAZE AROUND EDGES */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse 85% 90% at 50% 50%,
                transparent 45%,
                rgba(16, 77, 151, 0.25) 72%,
                rgba(1, 10, 22, 0.98) 100%
              )
            `,
          }}
        />

        {/* GRAIN */}
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-[0.28] mix-blend-overlay"
          style={{
            backgroundImage: noiseTexture,
            backgroundRepeat: "repeat",
            backgroundSize: "140px 140px",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-[0.10] mix-blend-soft-light"
          style={{
            backgroundImage: noiseTexture,
            backgroundRepeat: "repeat",
            backgroundSize: "70px 70px",
          }}
        />

        {/* =====================================================
            CONSTELLATION CLUSTERS
            SVG has no viewBox now — it's 1:1 with real container
            pixels, and each line's endpoints are set imperatively
            every frame from the icon/anchor's live position.
        ====================================================== */}
        <svg className="pointer-events-none absolute inset-0 z-20 hidden h-full w-full md:block">
          {clusters.map((cluster) =>
            cluster.icons.map((icon) => {
              const key = `${cluster.id}-${icon.name}`;
              return (
                <line
                  key={key}
                  ref={(el) => (lineRefs.current[key] = el)}
                  stroke="rgba(255, 255, 255, 0.64)"
                  strokeWidth={1}
                />
              );
            })
          )}
        </svg>

        <div className="absolute inset-0 z-20 hidden md:block">
          {clusters.map((cluster, ci) => (
            <div key={cluster.id}>
              {/* anchor label */}
               <motion.div
                ref={(el) => (anchorRefs.current[cluster.id] = el)}
                className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50"
                style={{ top: `${cluster.anchor.top}%`, left: `${cluster.anchor.left}%` }}
                animate={{ y: [0, -8, 0], x: [0, -6, 0] }}
                transition={{
                  duration: 4 + ci * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* label text — purely cosmetic offset from the anchor, string unaffected */}
              <motion.div
                className="absolute w-40 -translate-x-1/2 -translate-y-1/2 text-sm leading-snug text-white/80"
                style={{
                  top: `calc(${cluster.anchor.top}% + ${cluster.labelOffset?.y ?? 0}px)`,
                  left: `calc(${cluster.anchor.left}% + ${cluster.labelOffset?.x ?? 0}px)`,
                }}
                animate={{ y: [0, -8, 0], x: [0, -6, 0] }}
                transition={{
                  duration: 4 + ci * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {cluster.label}
              </motion.div>

              {/* icons radiating from this anchor */}
              {cluster.icons.map((icon, ii) => {
                const key = `${cluster.id}-${icon.name}`;
                return (
                  <motion.div
                    key={icon.name}
                    ref={(el) => (iconRefs.current[key] = el)}
                    className="absolute flex h-14 w-14 flex-col items-center justify-center gap-1 rounded-md border border-dashed border-white/30 bg-white/5 backdrop-blur-sm"
                    style={{ top: `${icon.pos.top}%`, left: `${icon.pos.left}%` }}
                    animate={{ y: [0.5, -9, 1.5], x: [0.5, -9, -0.5] }}
                    transition={{
                      duration: 3.5 + ii * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: ci * 0.2 + ii * 0.3,
                    }}
                  >
                    {icon.src ? (
                      <img src={icon.src} alt={icon.name} className="h-6 w-6 object-contain" />
                    ) : (
                      <>
                        <ImageIcon className="h-4 w-4 text-white/40" />
                        <span className="text-[9px] leading-none text-white/40">{icon.name}</span>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <div className="relative z-30 flex h-full items-center justify-center px-10">
          <h1 className="relative z-10 max-w-2xl text-center text-4xl leading-tight text-white font-heading ">
            We build hands-on labs and learning paths that turn enterprise teams into Cloud & AI experts.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;