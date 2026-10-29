
// import { Link } from "react-router-dom";

// import Container from "@/components/layout/Container";
// import { Button } from "@/components/ui/button";
// import LabFlow from "@/components/sections/enterprise-lab/LabFlow";
// import labFlowIllustration from "@/assets/images/lab10.png";

// import Silkwaves from "@/components/enterprise-labs/SilkWaves"

// export default function HowItWorks() {
//   return (
//     <section
//       id="how-it-works"
//       className="relative isolate overflow-hidden border-b border-[#101418]/8"
//     >
//       {/* <img
//         src={labFlowIllustration}
//         alt=""
//         aria-hidden="true"
//         className="absolute inset-0 -z-10 h-full w-full object-cover"
//       /> */}
//       <Silkwaves />

//       {/* The scrim turned with the layout. It used to run left-to-right
//           because the copy sat in the left column; the copy is centred now
//           and the whole width has to carry type, so it runs top-to-bottom
//           instead — lightest across the illustration, heaviest under the
//           headline and the cards, where the image's mid-tone bands would
//           otherwise come up under 15px text. */}
//       <div
//         aria-hidden="true"
//         className="absolute inset-0 -z-10 bg-gradient-to-b from-white/35 via-white/50 to-white/68"
//       />

//       <Container>
//         {/* Top-aligned from lg, centred below it. Centring would split the
//             height the diagram gave up evenly above and below, pushing the
//             band back down and moving the type up by only half of it;
//             anchoring the top sends all of it to the foot of the section,
//             which is what lets the headline and the buttons climb the full
//             distance. That only holds where the diagram was the tall one.
//             On a phone it is already as small as the width makes it and
//             gives nothing up, so top-aligning there does not raise the type
//             at all — it just moves the section's own slack into one heap
//             under the buttons. Centred is the right reading of the same
//             layout once there is nothing to reclaim. */}
//         <div className="flex min-h-[calc(100svh_-_var(--c4g-chrome-h))] flex-col justify-center py-6 lg:justify-start lg:py-7">

//           {/* ---------------------------------------------- the band */}
//           {/* No paper panel here. A card would put a hard edge across the
//               full width of the section and turn the illustration back into
//               a figure sitting in a box; this is a soft white bloom behind
//               it instead, so the diagram's thin strokes still get a light
//               ground to read against without anything to see the edge of. */}
//           {/* The split is done by the flexbox, not by a tuned number. The
//               type block below is shrink-0, so it takes the height it needs
//               and this band gets flex-1 — every remaining pixel of the fold,
//               whatever the headline wraps to at this width. That is what
//               keeps the section from carrying dead space: there is nothing
//               left over to be dead.

//               The ceiling is the point where the diagram stops growing, and
//               it can be reached three ways. 507px is the container's own
//               arithmetic — max-w-7xl (1280) less the lg gutters (2 x 32) is
//               1216 of drawable width, and 1216 / 2.4 is the tallest the
//               12:5 diagram can be before it would have to grow wider than
//               the page allows. The vw term is that same sum on a narrow
//               screen, where the width runs out long before that; between
//               them the band is never taller than the drawing it holds, so
//               it cannot open a gap above and below it and the bloom keeps
//               hugging the artwork instead of an empty box.

//               The half-fold term is the one that is a judgement rather than
//               a limit. Left to take the whole remainder the diagram filled
//               every pixel the type did not, which was more weight than an
//               illustration introducing a headline should carry; holding it
//               to half the fold steps it back and hands the difference to
//               the type below. It only binds where the diagram would
//               otherwise be the tall one — on a short or narrow viewport the
//               other two terms are already smaller and this changes nothing.

//               The 200px floor is for a short viewport,
//               where the fold cannot seat both parts and the section is
//               allowed to run past 100svh instead of crushing the diagram —
//               carrying the same vw term, because a floor taller than the
//               width allows would reintroduce on a phone exactly the gap the
//               ceiling removes, and a min-height outranks a max-height.

//               The diagram is positioned out of flow on purpose. Left in
//               flow it reports its own 12:5 height (507px at this width) as
//               the band's content height, and because this column is sized
//               by min-height rather than height, that measurement inflated
//               the whole section past the fold and cut the buttons off the
//               bottom — the band was reading the diagram's preferred size
//               instead of handing it a share of the fold. Out of flow it
//               contributes nothing to measure, so the height flows strictly
//               one way: fold, less the type block, is what the band gets. */}
//           <div className="relative flex max-h-[min(507px,(100vw_-_40px)/2.4,(100svh_-_var(--c4g-chrome-h))*0.5)] min-h-[min(200px,(100vw_-_40px)/2.4)] flex-1 items-center justify-center">
//             <div
//               aria-hidden="true"
//               className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[125%] w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-white/75 blur-3xl"
//             />
//             <LabFlow className="c4g-lab--fit absolute inset-0" />
//           </div>

//           {/* ---------------------------------------------- the words */}
//           {/* Every line this block saves is a line the band gets, so the
//               headline is set to hold on one line from lg up — at 2.9rem in
//               a 720px column it wrapped to two, and those 50px came
//               straight out of the diagram. The column is widened past the
//               usual measure only for the headline; the paragraph keeps its
//               own 560px so the reading line stays short. */}
//           <div className="mx-auto mt-4 max-w-[860px] shrink-0 text-center lg:mt-5">
//             <p className="text-[12.5px] font-medium uppercase tracking-[0.14em] text-[#4A5261]">
//               How it works
//             </p>

//             <h2 className="mt-2.5 font-recoleta text-[1.85rem] font-medium uppercase leading-[1.06] tracking-[-0.02em] text-[#101418] sm:text-[2.35rem] lg:text-[2.6rem]">
//               One request, a live environment
//               <span className="text-[#0B5CFF]">.</span>
//             </h2>

//             <p className="mx-auto mt-3.5 max-w-[560px] text-[15px] leading-6 text-[#4A5261] lg:text-[16px] lg:leading-7">
//               Your team picks a lab. We provision the real cloud account behind
//               it, validate the work as they go, and hand back a record of what
//               they did.
//             </p>

//             <div className="mt-5 flex flex-wrap justify-center gap-3.5 lg:mt-6">
//               <Button arrow render={<Link to="/contact" />}>
//                 Book a demo
//               </Button>

//               <Button variant="paper" arrow>
//                 Download brochure
//               </Button>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// }

import { Link } from "react-router-dom";

import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { CATALOGUE } from "@/config/downloads";
import LabFlow from "@/components/sections/enterprise-lab/LabFlow";
import PageGrid from "@/components/backgrounds/PageGrid";
import labsBg from "@/assets/images/lab6.png";
import {
  RevealGroup,
  RevealGround,
  RevealItem,
} from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      /* Same paper as the navbar, so the header and the hero read as one
         surface with no seam between them. */
      className="relative isolate overflow-hidden border-b border-[#101418]/8 bg-[#FAFAF7]"
    >
      {/* The corner grid, in this page's diagonal — PageGrid picks it from
          the URL, so every sub-page's top section carries the same detail
          in a different pair of corners. It sits at -z-20: under the white
          bloom behind the diagram (-z-10), so the grid softly disappears
          behind the illustration instead of running through its strokes.
          The bloom is kept tight to the diagram (88% × 100% of the band) —
          at 112% × 125% it washed out nearly the whole width of the upper
          half and the grid with it. */}
      {/* Full-bleed ground image, the same masthead treatment as the
          Automation, E-Learning and Consulting heroes. It is the lowest layer
          (-z-30): the grid lines run over it, the diagram's bloom sits above
          both. */}
      <RevealGround
        mount
        as="img"
        src={labsBg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover"
      />

      {/* White scrim, heaviest over the copy column, so the photo stays a
          subtle ground and the headline keeps its contrast. Same -z-30 as the
          photo, but later in the markup, so it paints over it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 bg-gradient-to-r from-white/85 via-white/55 to-white/50"
      />
      <PageGrid />

      <Container>
        {/* Top-aligned from lg, centred below it. Centring would split the
            height the diagram gave up evenly above and below, pushing the
            band back down and moving the type up by only half of it;
            anchoring the top sends all of it to the foot of the section,
            which is what lets the headline and the buttons climb the full
            distance. That only holds where the diagram was the tall one.
            On a phone it is already as small as the width makes it and
            gives nothing up, so top-aligning there does not raise the type
            at all — it just moves the section's own slack into one heap
            under the buttons. Centred is the right reading of the same
            layout once there is nothing to reclaim. */}
        <div className="flex min-h-[calc(100svh_-_var(--c4g-chrome-h))] flex-col justify-center py-6 lg:justify-start lg:py-7">
          {/* ---------------------------------------------- the band */}
          {/* No paper panel here. A card would put a hard edge across the
              full width of the section and turn the illustration back into
              a figure sitting in a box; this is a soft white bloom behind
              it instead, so the diagram's thin strokes still get a light
              ground to read against without anything to see the edge of. */}
          {/* The split is done by the flexbox, not by a tuned number. The
              type block below is shrink-0, so it takes the height it needs
              and this band gets flex-1 — every remaining pixel of the fold,
              whatever the headline wraps to at this width. That is what
              keeps the section from carrying dead space: there is nothing
              left over to be dead.

              The ceiling is the point where the diagram stops growing, and
              it can be reached three ways. 507px is the container's own
              arithmetic — max-w-7xl (1280) less the lg gutters (2 x 32) is
              1216 of drawable width, and 1216 / 2.4 is the tallest the
              12:5 diagram can be before it would have to grow wider than
              the page allows. The vw term is that same sum on a narrow
              screen, where the width runs out long before that; between
              them the band is never taller than the drawing it holds, so
              it cannot open a gap above and below it and the bloom keeps
              hugging the artwork instead of an empty box.

              The half-fold term is the one that is a judgement rather than
              a limit. Left to take the whole remainder the diagram filled
              every pixel the type did not, which was more weight than an
              illustration introducing a headline should carry; holding it
              to half the fold steps it back and hands the difference to
              the type below. It only binds where the diagram would
              otherwise be the tall one — on a short or narrow viewport the
              other two terms are already smaller and this changes nothing.

              The 200px floor is for a short viewport,
              where the fold cannot seat both parts and the section is
              allowed to run past 100svh instead of crushing the diagram —
              carrying the same vw term, because a floor taller than the
              width allows would reintroduce on a phone exactly the gap the
              ceiling removes, and a min-height outranks a max-height.

              The diagram is positioned out of flow on purpose. Left in
              flow it reports its own 12:5 height (507px at this width) as
              the band's content height, and because this column is sized
              by min-height rather than height, that measurement inflated
              the whole section past the fold and cut the buttons off the
              bottom — the band was reading the diagram's preferred size
              instead of handing it a share of the fold. Out of flow it
              contributes nothing to measure, so the height flows strictly
              one way: fold, less the type block, is what the band gets. */}
          {/* The diagram is the masthead's ground: it fades up with no
              travel, and the words below arrive over it. */}
          <RevealGround mount className="relative flex max-h-[min(507px,(100vw_-_40px)/2.4,(100svh_-_var(--c4g-chrome-h))*0.5)] min-h-[min(200px,(100vw_-_40px)/2.4)] flex-1 items-center justify-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-full w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-white/70 blur-3xl"
            />
            <LabFlow className="c4g-lab--fit absolute inset-0" />
          </RevealGround>

          {/* ---------------------------------------------- the words */}
          {/* Every line this block saves is a line the band gets, so the
              headline is set to hold on one line from lg up — at 2.9rem in
              a 720px column it wrapped to two, and those 50px came
              straight out of the diagram. The column is widened past the
              usual measure only for the headline; the paragraph keeps its
              own 560px so the reading line stays short. */}
          <RevealGroup mount delay={CUE.follow} className="mx-auto mt-4 max-w-[860px] shrink-0 text-center lg:mt-5">
            <RevealItem as="p" className="text-[12.5px] font-medium uppercase tracking-[0.14em] text-[#4A5261]">
              How it works
            </RevealItem>

            <RevealItem as="h1" className="mt-2.5 font-recoleta text-[1.85rem] font-medium uppercase leading-[1.06] tracking-[-0.02em] text-[#101418] sm:text-[2.35rem] lg:text-[2.6rem]">
              One request, a live environment
              <span className="text-[#0B5CFF]">.</span>
            </RevealItem>

            <RevealItem as="p" className="mx-auto mt-3.5 max-w-[560px] text-[15px] leading-6 text-[#4A5261] lg:text-[16px] lg:leading-7">
              Your team picks a lab. We provision the real cloud account behind
              it, validate the work as they go, and hand back a record of what
              they did.
            </RevealItem>

            <RevealItem className="mt-5 flex flex-wrap justify-center gap-3.5 lg:mt-6">
              <Button arrow render={<Link to="/contact" />}>
                Book a demo
              </Button>

              <Button variant="paper" arrow render={<a href={CATALOGUE.href} download={CATALOGUE.filename} />}>
                Download brochure
              </Button>
            </RevealItem>
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}