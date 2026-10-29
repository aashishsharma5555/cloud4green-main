import { useEffect, useRef, useState } from "react";
import "@/styles/industries.css";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";
import imageAutomotive from "@/assets/images/sector1.jpg"
import imageFinance from "@/assets/images/sector3.jpg"
import imageIt from "@/assets/images/gallerydigital.jpg"
import imagePharma from "@/assets/images/sector4.webp"
import imageAudit from "@/assets/images/sector5.webp"
/* ------------------------------------------------------------------ *
 * Industries We Serve.
 *
 * Two tiers, because the two references are doing two different jobs.
 * The five with photography lead — they are the sectors with real
 * delivery behind them, and a photograph is what makes that land. The
 * rest follow as a compact icon list: named, described in a line, and
 * not pretending to a photo shoot that does not exist.
 *
 * If you would rather have one flat grid of eleven cards, move the
 * entries between the two arrays — nothing else changes.
 *
 * On the frames. The three photographs here came out of three different
 * shoots and agree on nothing — a white-walled service bay, a blue-hour
 * facade, a room full of blue light. Dropped in raw they read as three
 * stock pictures sitting next to each other, which is most of why the
 * row looked wrong. They are graded to a common key in the stylesheet
 * (desaturated, then veiled in the house blue), so the row reads as one
 * deliberate set rather than whatever the library happened to hold.
 *
 * `pos` is the object-position for that grade's crop. It matters more
 * than it looks: the automotive frame is 3:2 and the finance frame is a
 * 9:16 portrait, so a default centre crop hands you cable clutter on one
 * and an acre of empty sky on the other. Each one is pushed onto its
 * subject by hand.
 *
 * Where there is no photograph the card gets a drawn tile — the sector's
 * mark held large on a tinted ground — rather than an empty wash. Same
 * colour family as the graded photographs, so a card without a shoot
 * behind it still looks finished instead of unfinished.
 * ------------------------------------------------------------------ */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

/** The brand asterisk, as it appears on every section eyebrow. */
function Asterisk() {
  return (
    <svg className="inds__ast" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
    </svg>
  );
}

const Icons = {
  manufacturing: (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <g {...stroke}>
        <path d="M3.6 25.6V13.4l6.6 4.2v-4.2l6.6 4.2V9.8l1.2-5.4h3l1.2 5.4v15.8Z" />
        <path d="M3.6 25.6h22.8" />
        <path d="M21.4 14.4v3.4M21.4 20.8v1.6" />
      </g>
    </svg>
  ),
  retail: (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <g {...stroke}>
        <path d="M3.2 4.4h3.4l3 13.8h13.4l2.8-9.8H8.2" />
        <circle cx="11.4" cy="24.2" r="1.9" />
        <circle cx="21.4" cy="24.2" r="1.9" />
      </g>
    </svg>
  ),
  public: (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <g {...stroke}>
        <path d="M2.8 11.6 15 4.6l12.2 7Z" />
        <path d="M5.6 11.6v11.2M11.4 11.6v11.2M18.6 11.6v11.2M24.4 11.6v11.2" />
        <path d="M3 22.8h24M2 25.8h26" />
      </g>
    </svg>
  ),
  lifesciences: (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <g {...stroke}>
        <path d="M11.4 3.4h7.2M12.6 3.4v8.2L6.9 22.4a2.6 2.6 0 0 0 2.3 3.9h11.6a2.6 2.6 0 0 0 2.3-3.9l-5.7-10.8V3.4" />
        <path d="M9.2 18.6h11.6" />
      </g>
    </svg>
  ),
  education: (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <g {...stroke}>
        <path d="M15 4.6 27.4 10 15 15.4 2.6 10Z" />
        <path d="M7.6 12.4v7.2c0 2.2 3.3 4 7.4 4s7.4-1.8 7.4-4v-7.2" />
        <path d="M27.4 10v7.4" />
      </g>
    </svg>
  ),
  nonprofit: (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <g {...stroke}>
        <path d="M15 25.6 5.4 16.4a5.6 5.6 0 0 1 8-7.8l1.6 1.6 1.6-1.6a5.6 5.6 0 0 1 8 7.8Z" />
      </g>
    </svg>
  ),

  /* The two below are drawn for the tier-one tiles rather than the tier-two
     list, so they carry a little more weight — they are set at card scale,
     not at 30px beside a line of text. */
  pharma: (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <g {...stroke}>
        <rect x="3.4" y="10.2" width="23.2" height="9.6" rx="4.8" />
        <path d="M15 10.2v9.6" />
        <path d="M7.6 13.2v3.6M9.4 15h-3.6" />
        <path d="M19.2 15h4.2" />
      </g>
    </svg>
  ),
  audit: (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <g {...stroke}>
        <path d="M9.4 5.2H6.8a1.8 1.8 0 0 0-1.8 1.8v17.2a1.8 1.8 0 0 0 1.8 1.8h16.4a1.8 1.8 0 0 0 1.8-1.8V7a1.8 1.8 0 0 0-1.8-1.8h-2.6" />
        <rect x="9.4" y="3" width="11.2" height="4.4" rx="1.4" />
        <path d="M10.4 15.8l3 3 6.2-6.2" />
      </g>
    </svg>
  ),
};

/* Tier one — the sectors that lead the section. */
const FEATURED = [
  {
    key: "automotive",
    name: "Automotive",
    line: "Dealer networks, service technicians and frontline sales teams.",
    image: imageAutomotive,
    /* A 3:2 service bay. The car sits right of centre and the left third
       is a foreground blur, so a centre crop gives you cable and shadow.
       Pushed right to land on the vehicle. */
    pos: "68% 55%",
  },
  {
    key: "banking",
    name: "Banking & Finance",
    line: "Compliance-ready training for branch, back-office and advisory roles.",
    image: imageFinance,
    /* A 9:16 portrait tower shot: the top half is bare sky. Held to the
       bottom of the frame so the card gets the facade, not the weather. */
    pos: "50% 78%",
  },
  {
    key: "it",
    name: "IT & ITES",
    line: "Technical onboarding and capability building at delivery-centre scale.",
    image: imageIt,
    pos: "50% 42%",
  },
  {
    key: "pharma",
    name: "Pharma & Healthcare",
    line: "Product knowledge and regulatory training for field and clinical teams.",
    image: imagePharma,
  },
  {
    key: "audit",
    name: "Audit & Assessment",
    line: "Standardised assessment and certification across distributed teams.",
   image: imageAudit,
  },
];

/* Tier two — named and described, no photograph needed. */
const ALSO = [
  {
    key: "manufacturing",
    name: "Manufacturing",
    line: "Upskill frontline workers and improve operational efficiency.",
    icon: Icons.manufacturing,
  },
  {
    key: "retail",
    name: "Retail",
    line: "Train frontline teams and deliver better customer experiences.",
    icon: Icons.retail,
  },
  {
    key: "public",
    name: "Public sector",
    line: "Modernise training for government organisations.",
    icon: Icons.public,
  },
  {
    key: "lifesciences",
    name: "Life sciences",
    line: "Reduce risk and evidence compliance across regulated work.",
    icon: Icons.lifesciences,
  },
  {
    key: "education",
    name: "Higher education",
    line: "Attract, develop and retain faculty and staff.",
    icon: Icons.education,
  },
  {
    key: "nonprofit",
    name: "Nonprofit",
    line: "Develop staff and volunteers to maximise mission impact.",
    icon: Icons.nonprofit,
  },
];

export default function IndustriesSection({
  featured = FEATURED,
  also = ALSO,
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="industries"
      className={`inds ${inView ? "is-in" : ""}`}
    >
      <div className="inds__inner">
        {/* The house heading: asterisk and tracked-out blue on the
            eyebrow, Recoleta uppercase on the display line, closed with
            the blue full stop — the same three parts as every other
            section on the page. */}
        <RevealGroup delay={CUE.lead} className="inds__head">
          <RevealItem as="p" className="inds__eyebrow">
            <Asterisk />
            Where we deliver
          </RevealItem>

          <RevealItem as="h2" className="inds__title">
            Industries we serve
            <span className="inds__stop">.</span>
          </RevealItem>
          <RevealItem as="p" className="inds__lede">
            Thirteen years of managed learning delivery across regulated,
            frontline and technical workforces — from fifty learners to fifty
            thousand.
          </RevealItem>
        </RevealGroup>

        <ul className="inds__grid">
          {featured.map((f, i) => (
            <li className="ind" key={f.key} style={{ "--i": i }}>
              <div className="ind__link">
                <span
                  className={`ind__frame ${f.image ? "" : "ind__frame--drawn"}`}
                >
                  {f.image ? (
                    <img
                      className="ind__img"
                      src={f.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      style={f.pos ? { objectPosition: f.pos } : undefined}
                    />
                  ) : (
                    <span className="ind__mark" aria-hidden="true">
                      {f.icon}
                    </span>
                  )}
                </span>
                <span className="ind__body">
                  <span className="ind__name">{f.name}</span>
                  <span className="ind__line">{f.line}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* --------------------------------------------------- tier two */}
        <div className="inds__more">
          <Reveal as="p" className="inds__morelabel">We also work across</Reveal>

          <ul className="inds__list">
            {also.map((a, i) => (
              <li className="also" key={a.key} style={{ "--i": i + 5 }}>
                <div className="also__link">
                  <span className="also__icon" aria-hidden="true">
                    {a.icon}
                  </span>
                  <span>
                    <span className="also__name">{a.name}</span>
                    <span className="also__line">{a.line}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}