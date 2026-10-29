

// import Container from "@/components/layout/Container";
// import HeroContent from "./HeroContent";
// // import HeroVisual from "./HeroVisual";
// import visualImage from "@/assets/images/visualImage.PNG"
// import PartnerBanner from "../sections/partners/PartnerBanner";


// const Hero = () => {
//   return (
//     <section className="relative min-h-[calc(100svh-80px)] overflow-hidden">

//       {/* Subtle background grid */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0"
//       >
//         {/* Vertical lines */}
//         <div
//           className="
//             absolute inset-0
//             bg-[linear-gradient(to_right,rgba(15,23,42,0.045)_1px,transparent_1px)]
//             bg-[size:120px_100%]
//           "
//         />

//         {/* Horizontal lines */}
//         <div
//           className="
//             absolute inset-0
//             bg-[linear-gradient(to_bottom,rgba(15,23,42,0.045)_1px,transparent_1px)]
//             bg-[size:100%_120px]
//           "
//         />
//       </div>

//       <Container>
//         <div className="relative mx-auto grid min-h-[calc(100svh-80px)] max-w-7xl items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16">

//           {/* Left — Hero Content */}
//           <div className="relative flex justify-center lg:justify-start">
//             <HeroContent />
//           </div>

//           {/* Right — Hero Visual */}
//           <div className="relative flex items-center justify-center lg:justify-end">
//             {/* <HeroVisual /> */}
//             <img src={visualImage} alt=""  className="
//                  w-[115%]
//                 max-w-none
//                 object-contain
//                 lg:-mr-16
//                 xl:-mr-24
//               " />
//           </div>

//         </div>
//         <PartnerBanner/>
//       </Container>
//     </section>
//   );
// };

// export default Hero;


// //////Globe Idea
// import Container from "@/components/layout/Container";
// import HeroContent2 from "./GlobeContent";
// import PartnerBanner from "@/components/sections/partners/PartnerBanner";
// import Globe from "./Globe";

// const Hero = () => {
//   return (
//     <section className="relative overflow-hidden">
//       {/* Subtle background grid */}
//       <div aria-hidden="true" className="pointer-events-none absolute inset-0">
//         {/* Vertical lines */}
//         <div
//           className="
//             absolute inset-0
//             bg-[linear-gradient(to_right,rgba(15,23,42,0.045)_1px,transparent_1px)]
//             bg-[size:120px_100%]
//           "
//         />
//         {/* Horizontal lines */}
//         <div
//           className="
//             absolute inset-0
//             bg-[linear-gradient(to_bottom,rgba(15,23,42,0.045)_1px,transparent_1px)]
//             bg-[size:100%_120px]
//           "
//         />
//       </div>

//       <div className="relative flex min-h-[calc(100svh-80px)] flex-col justify-center">
//         {/* Globe — sits behind the copy, full image visible, anchored to the bottom of the hero */}
//         <div
//           aria-hidden="true"
//           className="
//             pointer-events-none absolute inset-x-0 bottom-0 z-0
//             flex justify-center overflow-hidden
//             h-[80vw] sm:h-[62vw] 2xl:mx-40
//             lg:translate-y-10 xl:translate-y-16 2xl:translate-y-24
//           "
//         >
//           <Globe
//             className="
//               h-full w-[160%] sm:w-[125%] lg:w-[105%]
//               [mask-image:radial-gradient(75%_75%_at_50%_100%,black_45%,transparent_85%)]
//               [-webkit-mask-image:radial-gradient(75%_75%_at_50%_100%,black_45%,transparent_85%)]
//             "
//           />
//         </div>

//         {/* Centred copy, above the globe */}
//         <Container>
//           <div className="relative z-10 mx-auto max-w-3xl pb-10 text-center lg:max-w-4xl lg:-translate-y-6 xl:-translate-y-10">
//             <HeroContent2 />
//           </div>
//         </Container>

//         {/* Partner logos overlaying the globe */}
//         <div className="relative z-20 -mt-4 sm:-mt-6 lg:-mt-10">
//           <PartnerBanner variant="overlay" />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

// import Container from "@/components/layout/Container";
// import HeroContent2 from "./GlobeContent";
// import PartnerBanner from "@/components/sections/partners/PartnerBanner";
// import Worldmap from "./WorldMap";

// const Hero = () => {
//   return (
//     <section className="relative overflow-hidden">
//       {/* Subtle background grid */}
//       <div aria-hidden="true" className="pointer-events-none absolute inset-0">
//         {/* Vertical lines */}
//         <div
//           className="
//             absolute inset-0
//             bg-[linear-gradient(to_right,rgba(15,23,42,0.045)_1px,transparent_1px)]
//             bg-[size:120px_100%]
//           "
//         />
//         {/* Horizontal lines */}
//         <div
//           className="
//             absolute inset-0
//             bg-[linear-gradient(to_bottom,rgba(15,23,42,0.045)_1px,transparent_1px)]
//             bg-[size:100%_120px]
//           "
//         />
//       </div>

//       <div className="relative flex min-h-[calc(100svh-80px)] flex-col justify-center">
//         {/* Dot map — sits behind the copy. The map is wide and short (≈2.5:1),
//             so it's sized by width and centred; no fixed height needed. */}
//         <div
//           aria-hidden="true"
//           className="
//             pointer-events-none absolute inset-0 z-0
//             flex items-center justify-center overflow-hidden
//           "
//         >
//           <Worldmap
//             className="
//               h-auto max-w-none w-[190%] sm:w-[150%] lg:w-[118%] 2xl:w-[100%]
//               translate-y-6 lg:translate-y-10
//               text-[#0d357e]/25
//               [mask-image:radial-gradient(78%_78%_at_50%_50%,black_50%,transparent_100%)]
//               [-webkit-mask-image:radial-gradient(78%_78%_at_50%_50%,black_50%,transparent_100%)]
//             "
//           />
//         </div>

//         {/* Centred copy, above the map */}
//         <Container>
//           <div className="relative z-10 mx-auto max-w-3xl pb-10 text-center lg:max-w-4xl lg:-translate-y-6 xl:-translate-y-10">
//             <HeroContent2 />
//           </div>
//         </Container>

//         {/* Partner logos overlaying the map */}
//         <div className="relative z-20 -mt-4 sm:-mt-6 lg:-mt-10">
//           <PartnerBanner variant="overlay" />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import { useState } from "react";
import { Link } from "react-router-dom";

import PartnerBanner from "@/components/sections/partners/PartnerBanner";
import HeroDisplay from "./HeroDisplay";
import HeroMapStats from "./HeroMapStats";
import WorldMap from "./WorldMap";

/**
 * One composition on one ground: the map runs the full width of the screen
 * behind everything, and the display block and the partner strip sit on it,
 * optically centred in the fold.
 *
 * The map was briefly given a band of its own below the copy, on the reasoning
 * that behind the headline it had to be faded almost to nothing to stay
 * readable. That trade turned out to be false on both sides. Stacked below the
 * copy it has to pay for its own height — 39.8vw of it, since a full-bleed map
 * at 2.512:1 is 764px tall on a 1920 screen — which is what forced it to be an
 * inset plate rather than full bleed, and an inset plate is a rectangle
 * floating in the page rather than ground. Behind the copy it costs no height
 * at all, so it can go edge to edge; and it doesn't have to fade to nothing
 * either, because the mask lifts it only in the ellipse the type occupies and
 * leaves it at full weight everywhere else. See `.hero-map` in index.css.
 *
 * All the proportions are derived from --hero-measure in the `.hero-*` rules
 * there; nothing here is a magic number.
 *
 * 120px is the chrome above the hero: the 40px announcement bar plus the 80px
 * nav row.
 */
/**
 * `revealed` is the handover from the preloader (see Preloader.jsx and
 * `.hero-stage--gate` in index.css). The hero is laid out and painted the whole
 * time the curtain is down and only held at opacity 0 — so when the panel
 * lifts there is nothing left to build, and the three beats that bring the map,
 * the copy and the partner strip up are pure opacity and transform.
 *
 * The gate class is added on mount rather than written into the stylesheet
 * against `.hero-stage`, so a hero rendered without a preloader — or one whose
 * reveal never arrives — is simply visible.
 */
const Hero = ({ revealed = true }) => {
  const [gated] = useState(() => !revealed);

  return (
    <section className="relative overflow-hidden">
      {/* Subtle background grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Vertical lines */}
        <div
          className="
            absolute inset-0
            bg-[linear-gradient(to_right,rgba(15,23,42,0.045)_1px,transparent_1px)]
            bg-[size:120px_100%]
          "
        />
        {/* Horizontal lines */}
        <div
          className="
            absolute inset-0
            bg-[linear-gradient(to_bottom,rgba(15,23,42,0.045)_1px,transparent_1px)]
            bg-[size:100%_120px]
          "
        />
      </div>

      {/* Hung from the top of the fold, not centred in it.
       *
       * Centring looks like the safe choice and is the wrong one here, because
       * only half of what is in the fold is in the flow. The map is absolutely
       * positioned, so `justify-center` balances the copy against the section's
       * box while ignoring the 573px of map hanging below it — which put ~230px
       * of dead air above the headline at 1920 and pushed the map's southern
       * half off the bottom of the screen by exactly about as much.
       *
       * Hanging the copy from the top spends that air on the map instead, and
       * the whole map lands inside the fold from 1280x800 up.
       *
       * How FAR down it hangs is --hero-gap-top in index.css, not a class here,
       * and it is a stated distance rather than a derived one: the same 175px
       * under the nav on a 1366 laptop, a 1920 desktop and a 2560 monitor. It
       * was briefly derived from the map — hang the copy by whatever put the
       * map's foot on the fold's bottom edge — which fixed the artwork and let
       * the type move, so the headline climbed toward the nav as the window
       * widened. The map closes the fold from its own end instead now, by
       * growing past 75vw when there is room left under it.
       *
       * Only from lg up, though. On a portrait screen the map is sized by the
       * height floor rather than by 75vw and comfortably fits the fold, so
       * there is no overhang to make room for — hanging the copy from the top
       * there would just leave a void under the map instead of over the
       * headline. Centred is right whenever the map fits. */}
      <div
        className={`
          hero-stage relative z-10
          flex min-h-[calc(100svh-120px)] flex-col justify-center
          gap-[clamp(1.5rem,3.5vh,3.5rem)]
          px-5 py-[clamp(1.5rem,3vh,3rem)] sm:px-6
          lg:justify-start lg:px-0
          ${gated ? "hero-stage--gate" : ""}
          ${revealed ? "is-revealed" : ""}
        `}
      >
        {/* The map is wrapped with the display block rather than dropped into
            the stage, because its crest is placed against the headline's
            bottom edge — see .hero-field. Ground first in the markup so it
            paints under the copy without anyone having to raise the copy
            above it. */}
        {/* The wrapper is no longer aria-hidden: the three stat pins on the map
            are real copy and should be read. The artwork under them still is —
            WorldMap sets aria-hidden on its own svg. */}
        <div className="hero-field">
          <div className="hero-map">
            <WorldMap />
            <HeroMapStats />
          </div>

          <HeroDisplay />

          {/* Partner logos ride the map's South America line — pinned to the
              map, not carried by the flow. They sit in the field rather than in
              the ground below it because the field's top edge is the headline's
              top edge, which is the same origin .hero-map measures from: state
              the strip's offset there and the two cannot drift apart. Left in
              the flow it landed wherever the copy above it happened to end —
              40% down the map on a 1080p screen, and somewhere else on the
              next one. The share of the map it rides is --hero-partners-line
              in index.css. */}
          <div className="hero-partners">
            <PartnerBanner variant="overlay" />
          </div>
        </div>

        <div className="hero-ground">
          {/* One thin line of meta type across the foot of the composition,
              aligned to the headline's column. Hidden below lg by the CSS. */}
          {/* <div className="hero-ground__meta">
            <Link to="/contact" className="hero-meta">
              How can we help?
            </Link>

            <span aria-hidden="true" className="hero-meta hero-meta--scroll">
              (Scroll)
            </span>
          </div> */}

          {/* The partner strip used to be here; it is pinned to the map in
              .hero-field above now. This box keeps the strip's height in the
              flow (see .hero-ground) so the centred portrait composition
              doesn't climb, and still holds the meta line when it returns. */}
        </div>
      </div>
    </section>
  );
};

export default Hero;