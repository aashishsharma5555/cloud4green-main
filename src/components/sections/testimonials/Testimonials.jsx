// import { Quote } from "lucide-react";

// import Container from "@/components/layout/Container";
// import Section from "@/components/layout/Section";

// import { testimonials } from "@/data/testimonials";

// function TestimonialCard({ name, role, quote }) {
//   return (
//     <div className="h-44 w-72 shrink-0 rounded-2xl border border-border/60 bg-[#0351ef] p-2 text-left sm:w-80">
//       <div className="flex h-full flex-col rounded-lg border border-dashed border-border/70 bg-background p-4">
//         <div className="flex items-start justify-between gap-4">
//           <div className="min-w-0">
//             <p className="truncate text-sm font-medium tracking-tight">
//               {name}
//             </p>
//             <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
//               {role}
//             </p>
//           </div>
//           <Quote
//             className="size-4 shrink-0 fill-current text-muted-foreground/30"
//             aria-hidden="true"
//           />
//         </div>
//         <blockquote className="mt-auto line-clamp-3 text-[15px] leading-6 text-muted-foreground">
//           {quote}
//         </blockquote>
//       </div>
//     </div>
//   );
// }

// export default function Testimonials() {
//   return (
//     <Section>
//       <Container>
//         <div>
//           <h2 className="text-3xl font-medium tracking-tight text-balance sm:text-4xl">
//             Words from our learners
//           </h2>
//           <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">
//             What teams building on Cloud4Green are saying.
//           </p>
//         </div>

//         <div className="relative mt-12 -mx-5 overflow-hidden sm:-mx-8">
//           <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
//           <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />

//           <div className="flex w-max animate-marquee gap-4">
//             {[...testimonials, ...testimonials].map((testimonial, index) => (
//               <TestimonialCard
//                 key={`${testimonial.name}-${index}`}
//                 {...testimonial}
//               />
//             ))}
//           </div>
//         </div>
//       </Container>
//     </Section>
//   );
// }

import { Quote } from "lucide-react";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import {
  Reveal,
  RevealGroup,
  RevealItem,
  RevealLines,
} from "@/components/motion/Reveal";

import { testimonials } from "@/data/testimonials";

// import "./marquee.css";

/** Cards on the visible track, per row. Repeats are derived from this so a
 *  short testimonials list still fills a wide viewport instead of running
 *  out of track and leaving a gap. */
const MIN_CARDS = 12;

/** Time each card takes to cross one card-width. One loop is one copy of
 *  the row, so duration scales with its length — a fixed duration would
 *  make the rows faster every time a review is added. ~50px/s: slow
 *  enough to read a card as it passes. */
const SECONDS_PER_CARD = 8;

function TestimonialCard({ name, role, quote, hidden }) {
  return (
    <div
      // aria-hidden on every copy but the first — otherwise a screen reader
      // reads the whole set four times over.
      aria-hidden={hidden || undefined}
      className="group h-52 w-72 shrink-0 rounded-2xl border border-border/60 bg-[#0351ef] p-2 text-left transition-shadow duration-300 hover:shadow-lg sm:w-96"
    >
      <div className="flex h-full flex-col rounded-lg border border-dashed border-border/70 bg-background p-4 transition-colors duration-300 group-hover:border-border">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {/* Google names arrive in whatever case the reviewer typed. */}
            <p className="truncate text-sm font-medium capitalize tracking-tight">{name}</p>
            <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
              {role}
            </p>
          </div>
          <Quote
            className="size-4 shrink-0 fill-current text-muted-foreground/30 transition-colors duration-300 group-hover:text-muted-foreground/60"
            aria-hidden="true"
          />
        </div>
        {/* Four lines: the Google reviews run longer than the old
            one-liners, and three cut most of them mid-sentence. */}
        <blockquote className="mt-auto line-clamp-4 text-[15px] leading-6 text-muted-foreground">
          {quote}
        </blockquote>
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse = false, duration, offset = 0 }) {
  if (!items.length) return null;

  /* Enough copies that the track is always wider than the viewport, and
     the loop point never lands inside it. Two is the minimum for a
     seamless wrap; a short list needs more. */
  const repeats = Math.max(2, Math.ceil(MIN_CARDS / items.length));

  return (
    <div
      className="c4g-marquee"
      style={{ "--duration": `${duration}s`, "--repeats": repeats }}
    >
      <div
        className={`c4g-marquee__track${
          reverse ? " c4g-marquee__track--reverse" : ""
        }`}
        /* A negative delay starts the row part-way through its own loop, so
           the two rows never sit in step and the cards don't line up into
           columns. It is a phase offset, not a wait. */
        style={{ animationDelay: `${-duration * offset}s` }}
      >
        {Array.from({ length: repeats }).flatMap((_, copy) =>
          items.map((t, i) => (
            <TestimonialCard
              key={`${copy}-${t.name}-${i}`}
              hidden={copy > 0}
              {...t}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default function Testimonials() {
  /* Split so the two rows carry different quotes rather than the same set
     twice. Below four testimonials there is nothing to split, so both rows
     take everything and the second runs them in the other order — which
     still reads as two rows, not one duplicated. */
  const mid = Math.ceil(testimonials.length / 2);
  const canSplit = testimonials.length >= 4;

  const rowA = canSplit ? testimonials.slice(0, mid) : testimonials;
  const rowB = canSplit ? testimonials.slice(mid) : [...testimonials].reverse();

  return (
    <Section>
      <Container>
        {/* One word, one known line — so the heading gets the masked-line
            reveal and the sentence under it follows on the house fade-up.
            Both are held off the same trigger, 0.1s apart. */}
        <RevealGroup>
          <RevealLines
            nested
            as="h2"
            lines={["Testimonials"]}
            className="text-3xl font-medium tracking-tight text-balance sm:text-4xl font-recoleta uppercase"
          />
          <RevealItem
            as="p"
            className="mt-4 max-w-md text-base leading-7 text-muted-foreground"
          >
            What learners who trained with us are saying on Google.
          </RevealItem>
        </RevealGroup>

        {/* Full-bleed out of the container so the rows run edge to edge and
            the mask has somewhere to fade into.

            The rows come up as one block rather than card by card. They are
            already in motion — two marquees running in opposite directions —
            and staggering thirty cards into something that is itself moving
            reads as a glitch rather than as a reveal. */}
        <Reveal
          delay={0.18}
          className="mt-12 -mx-5 flex flex-col gap-4 sm:-mx-8"
        >
          <MarqueeRow items={rowA} duration={rowA.length * SECONDS_PER_CARD} />
          {/* Different direction, and a pace that is not a neat multiple of
              the first — two rows on the same clock start to look like one
              object sliding. */}
          <MarqueeRow
            items={rowB}
            duration={rowB.length * SECONDS_PER_CARD * 1.17}
            reverse
            offset={0.35}
          />
        </Reveal>
      </Container>
    </Section>
  );
}