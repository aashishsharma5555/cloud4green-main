import PillarCard from "@/components/common/PillarCard";
import useInView from "@/hooks/useInView";
import "@/styles/pillars.css";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";

/* ------------------------------------------------------------------ *
 * The Six Pillars.
 *
 * Same shape as the reference industries grid: image-backed cards that
 * are quiet at rest — mark, number, title — and open on hover to the
 * description and a link. The substance is in the DOM the whole time,
 * so it is read, indexed and searchable whether or not anyone hovers;
 * only its box is collapsed.
 * ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ *
 * CARD ARTWORK
 *
 * One import per pillar, wired to `image` in the PILLARS list below. To
 * change a card's photograph, change the file on the right of its import
 * and nothing else — every card gets the same treatment: the image is
 * cropped to fill the card (object-fit: cover), darkened by two scrims,
 * and the copy at the bottom sits on a panel that blurs the photo behind
 * it. So any picture can be dropped in without the type going illegible.
 *
 * Set `image: null` instead and the card falls back to --card-base, the
 * flat navy in pillars.css. It still reads — it is just flatter.
 *
 * Prefer landscape crops around 1600px wide; Vite fingerprints and
 * serves anything imported from src/assets, so nothing here needs to be
 * copied into /public.
 *
 * Unused alternates already in the repo, if you want to reshuffle:
 * Solution1.webp (two learners at a laptop), solution3.webp (a team
 * celebrating), solution5.webp (certificates), map.jpg, elearningHero.jpg.
 * ------------------------------------------------------------------ */
import imgNeeds from "@/assets/images/eImg1.webp";
import imgContent from "@/assets/images/solution4.webp";
import imgPlatform from "@/assets/images/gallerydigital.jpg";
import imgVendors from "@/assets/images/enterprise.jpg";
import imgDelivery from "@/assets/images/ourproducts.jpg";
import imgRoi from "@/assets/images/skill1.webp";

/* Icons match the reference's drawing language: one 30×30 box, no fill,
   1.25 stroke on currentColor, round caps and joins. Swap in your own
   set and nothing else changes. */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const Icons = {
  needs: (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <g {...stroke}>
        <circle cx="13" cy="13" r="8.6" />
        <path d="M19.1 19.1 26 26" />
        <path d="M9.6 16.4v-3.1M13 16.4v-6.6M16.4 16.4v-4.4" />
      </g>
    </svg>
  ),
  content: (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <g {...stroke}>
        <path d="M15 8.6C13 6.8 10.4 6 7.7 6.1H4.2v15.6h3.5c2.7-.1 5.3.7 7.3 2.5 2-1.8 4.6-2.6 7.3-2.5h3.5V6.1h-3.5c-2.7-.1-5.3.7-7.3 2.5Z" />
        <path d="M15 8.6v15.6" />
        <path d="M7.8 11.2h3.6M18.6 11.2h3.6" />
      </g>
    </svg>
  ),
  platform: (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <g {...stroke}>
        <rect x="3.4" y="5" width="23.2" height="15.6" rx="2" />
        <path d="M11 25.4h8M15 20.6v4.8" />
        <circle cx="15" cy="12.8" r="2.6" />
        <path d="M15 7.6v1.8M15 16.2v1.8M20.2 12.8h-1.8M11.6 12.8H9.8" />
      </g>
    </svg>
  ),
  vendors: (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <g {...stroke}>
        <circle cx="8.6" cy="8.2" r="3.6" />
        <circle cx="21.4" cy="8.2" r="3.6" />
        <path d="M8.6 11.8v3.4a3.6 3.6 0 0 0 3.6 3.6h5.6a3.6 3.6 0 0 0 3.6-3.6v-3.4" />
        <path d="M15 18.8v3.4" />
        <circle cx="15" cy="25.4" r="3.6" />
      </g>
    </svg>
  ),
  delivery: (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <g {...stroke}>
        <rect x="3.6" y="5.6" width="22.8" height="20.4" rx="2" />
        <path d="M3.6 11.6h22.8M9.8 3v5M20.2 3v5" />
        <path d="M10.6 18.4l3 3 5.2-5.8" />
      </g>
    </svg>
  ),
  roi: (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <g {...stroke}>
        <path d="M4 4.6v21.2h22" />
        <path d="M8.6 21.4v-4.6M14.2 21.4v-8.4M19.8 21.4v-5.8M25.4 21.4v-11" />
        <path d="M8 12.6l5.4-5 4.4 3.4 6.4-6.6" />
        <path d="M20.6 4.2h3.8v3.8" />
      </g>
    </svg>
  ),
};

/** The brand asterisk, as it appears on every section eyebrow. */
function Asterisk() {
  return (
    <svg className="pillars__ast" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
    </svg>
  );
}

const PILLARS = [
  {
    key: "needs",
    title: "Learning Needs Analysis",
    body: "We identify skill gaps across roles, functions, and business units using data-driven training needs analysis frameworks tailored to your business goals.",
    icon: Icons.needs,
    image: imgNeeds,
  },
  {
    key: "content",
    title: "Content Design & Development",
    body: "Custom eLearning, VILT programmes, microlearning, game-based learning, and immersive learning content designed to improve workforce capability and engagement.",
    icon: Icons.content,
    image: imgContent,
  },
  {
    key: "platform",
    title: "Learning Technology Management",
    body: "We deploy and manage your enterprise LMS or LXP, including learner administration, reporting, integrations, and real-time capability tracking through our Skill Intelligence platform.",
    icon: Icons.platform,
    image: imgPlatform,
  },
  {
    key: "vendors",
    title: "Training Vendor Management",
    body: "We streamline your training ecosystem by managing content providers, facilitators, platforms, and assessments under one structured outsourcing and vendor management framework.",
    icon: Icons.vendors,
    image: imgVendors,
  },
  {
    key: "delivery",
    title: "Learning Delivery Coordination",
    body: "From scheduling and logistics to facilitator management and learner support, every training intervention is coordinated efficiently for teams ranging from 50 to 50,000 learners.",
    icon: Icons.delivery,
    image: imgDelivery,
  },
  {
    key: "roi",
    title: "Measurement & ROI Reporting",
    body: "Monthly executive dashboards connect learning performance with business KPIs, helping organisations measure capability improvement, productivity impact, and training ROI.",
    icon: Icons.roi,
    image: imgRoi,
  },
];

export default function PillarsSection({ pillars = PILLARS }) {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      id="pillars"
      className={`pillars ${inView ? "is-in" : ""}`}
    >
      <div className="pillars__inner">
        {/* The house heading: asterisk and tracked-out blue on the
            eyebrow, Recoleta uppercase on the display line, closed with
            the blue full stop — the same three parts as every other
            section on the site. */}
        <RevealGroup delay={CUE.lead} className="pillars__head">
          <RevealItem as="p" className="pillars__eyebrow">
            <Asterisk />
            Enterprise Learning Outsourcing
          </RevealItem>

          <RevealItem as="h2" className="pillars__title">
            The 6 Pillars of Enterprise Learning at Cloud4Green
            <span className="pillars__stop">.</span>
          </RevealItem>
          <RevealItem as="p" className="pillars__lede">
            Each area is delivered as a fully managed solution that helps reduce
            your L&amp;D operational workload while improving training
            effectiveness and business outcomes.
          </RevealItem>
        </RevealGroup>

        <div className="pillars__grid">
          {pillars.map((p, i) => (
            <PillarCard key={p.key} index={i} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}