

// import { useEffect, useState } from "react";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";

// const announcements = [
//   {
//     label: "New!",
//     text: "Hands-On Cloud Labs 🚀 — Learn cloud by building, not just watching",
//   },
//   {
//     label: "Cloud + AI",
//     text: "Build real-world skills with immersive Cloud & AI labs",
//   },
//   {
//     label: "For Enterprise",
//     text: "Train your teams with hands-on labs built for the real world",
//   },
//   {
//     label: "Learn by Doing",
//     text: "Practice AWS, Azure, Google Cloud and more in live environments",
//   },
// ];

// export default function AnnouncementBar() {
//   const [current, setCurrent] = useState(0);

//   // Automatically move to the next announcement
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % announcements.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   const next = () => {
//     setCurrent((prev) => (prev + 1) % announcements.length);
//   };

//   const previous = () => {
//     setCurrent(
//       (prev) => (prev - 1 + announcements.length) % announcements.length
//     );
//   };

//   const announcement = announcements[current];

//   return (
//     <div className="relative z-[60] h-10 overflow-hidden brandPromo text-white">
//       <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">

//         {/* Previous */}
//         <button
//           onClick={previous}
//           className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition hover:bg-white/10"
//           aria-label="Previous announcement"
//         >
//           <ArrowLeft className="h-4 w-4" />
//         </button>

//         {/* Announcement */}
//         <div className="relative flex h-full flex-1 items-center justify-center overflow-hidden">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={current}
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -12 }}
//               transition={{
//                 duration: 0.35,
//                 ease: "easeOut",
//               }}
//               className="absolute flex items-center gap-2 text-sm font-medium"
//             >
//               <span className="font-bold text-[#8BE28B]">
//                 {announcement.label}
//               </span>

//               <span className="text-white/90 font-bold">
//                 {announcement.text}
//               </span>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {/* Next */}
//         <button
//           onClick={next}
//           className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition hover:bg-white/10"
//           aria-label="Next announcement"
//         >
//           <ArrowRight className="h-4 w-4" />
//         </button>

//       </div>
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const announcements = [
  {
    label: "New!",
    text: "Hands-On Cloud Labs 🚀 — Learn cloud by building, not just watching",
  },
  {
    label: "ReyVanX",
    text: "Zero Trust Security Solutions for Modern Enterprises",
  },
  {
    label: "Cloud + AI",
    text: "Build real-world skills with immersive Cloud & AI labs",
  },
  {
    label: "For Enterprise",
    text: "Train your teams with hands-on labs built for the real world",
  },
  {
    label: "Learn by Doing",
    text: "Practice AWS, Azure, Google Cloud and more in live environments",
  },
];

const INTERVAL = 4000;

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const ref = useRef(null);
  const reduce = useReducedMotion();

  /* The bar scrolls away and stays away for the rest of the session, but the
     interval used to keep firing — a React re-render every four seconds, for
     the whole time nobody can see it. */
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !onScreen || reduce) return;
    const id = setInterval(
      () => setCurrent((prev) => (prev + 1) % announcements.length),
      INTERVAL
    );
    return () => clearInterval(id);
  }, [paused, onScreen, reduce]);

  const go = (delta) =>
    setCurrent(
      (prev) => (prev + delta + announcements.length) % announcements.length
    );

  const announcement = announcements[current];

  return (
    /* No z-index. It sits in normal flow above a sticky header and simply
       scrolls out of the way — it never needs to be *over* anything, and the
       old z-[60] only put it above the header for no reason. */
    <div
      ref={ref}
      className="brandPromo relative h-10 overflow-hidden text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-1 px-2 sm:gap-2 sm:px-6">
        <button
          onClick={() => go(-1)}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition hover:bg-white/10"
          aria-label="Previous announcement"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        {/* aria-live so the rotation is announced once, rather than a screen
            reader either missing it or reading all four on load. */}
        {/* The message is absolute (so the exit and enter can overlap in one
            slot) and pinned to both edges of the slot, so it can never be wider
            than the space between the arrows. On a phone the longer lines don't
            fit that space; they stay on one line and end in an ellipsis rather
            than wrapping, because the bar's 40px is part of the hero's fold
            maths (see the 120px in Hero.jsx). `title` keeps the full text
            reachable on hover, and the live region reads all of it. */}
        <div
          className="relative flex h-full min-w-0 flex-1 items-center justify-center overflow-hidden"
          aria-live="polite"
          aria-atomic="true"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-x-0 flex items-center justify-center gap-1.5 text-xs font-medium sm:gap-2 sm:text-sm"
              title={`${announcement.label} ${announcement.text}`}
            >
              <span className="shrink-0 font-bold text-[#8BE28B]">
                {announcement.label}
              </span>
              <span className="min-w-0 truncate font-bold text-white/90">
                {announcement.text}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() => go(1)}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition hover:bg-white/10"
          aria-label="Next announcement"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}