

"use client";

import React, {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

/* ------------------------------------------------------------------
   TAB IMAGES

   One image per tab. Drop the file into src/assets/images, then
   import it here and point the matching tab's `visual.src` at it.

   Tabs whose image is still `null` render a dashed placeholder box,
   so the section keeps working until every asset is in place.
------------------------------------------------------------------ */

import sol1 from "@/assets/images/Solution1.webp";
import sol2 from "@/assets/images/enterprise.jpg";
import sol3 from "@/assets/images/solution3.webp";

// Add the remaining files, then swap the `null`s for the imports:
// import sol3 from "@/assets/images/Solution3.webp";
import sol4 from "@/assets/images/solution4.webp";
import sol5 from "@/assets/images/solution5.webp";





/* ==================================================================
   1. TOKENS
================================================================== */

const T = {
  // Matches Hero's --neutral-100 background
  canvas: "#FAFAF7",

  // Sky blue, matching the Enterprise CTA promo box
  panel: "#f0f7f7bb",
  // panel: "#f7f7f0bb",

  // Same subtle grid rgba values used behind the Hero
  grid: "rgba(15, 23, 42, 0.045)",

  // Hero's --foreground (black)
  ink: "#000000",

  // Hero's --muted-foreground / --neutral-500
  inkSoft: "#687280",

  // Hero's --primary / --brand-navy
  accent: "#0D357E",

  // Light tint of the brand navy accent
  accentSoft: "#E7ECF6",

  // Light navy-tinted border
  chipBorder: "#B9C4DA",

  // Hero's --border / --neutral-300
  hairline: "#E4E8EB",

  white: "#FFFFFF",
};


/* ==================================================================
   2. CONTENT

   ADDING IMAGES / ILLUSTRATIONS
   ------------------------------------------------------------------
   Every tab's right-side visual is an image. Each one looks like:

     visual: {
       kind: "image",
       src: sol3,                       // null -> placeholder box
       alt: "Description of the image", // used by screen readers
       fit: "cover",                    // "cover" (default) | "contain"
       ratio: "4 / 3",                  // optional, e.g. "16 / 9"
       chips: [...],                    // optional floating badges
     },

   To add an image: import it at the top of this file, then set
   that tab's `src`. Nothing else needs to change.

   The mock UI visuals (metric / progress / status / ledger / usage)
   are still available further down — set `kind` to one of those if
   you ever want a tab to show a card instead of an image.
================================================================== */

const CHALLENGES = [
  {
    id: "practical-skills",

    tab: ["Theory without", "real-world practice"],

    eyebrow: "Hands-on learning",

    heading: "Turn learning into real-world Cloud & AI skills",

    body:
      "Traditional learning often stops at theory. Give learners the opportunity to practice with real cloud technologies, guided exercises, and hands-on environments that build confidence through doing.",

    points: [
      {
        title: "Learn by doing",
        desc:
          "Move beyond presentations and videos with practical, hands-on learning environments.",
      },
      {
        title: "Practice real Cloud & AI technologies",
        desc:
          "Give learners experience with the technologies they will actually use in the workplace.",
      },
      {
        title: "Build confidence through repetition",
        desc:
          "Let learners experiment, make mistakes, and repeat exercises in safe environments.",
      },
    ],

    cta: {
      label: "Explore Cloud Labs",
      href: "/products/enterprise-labs",
    },

    visual: {
      kind: "image",

      src: sol1,

      alt: "Learners practising in a hands-on cloud lab environment",

      fit: "cover",

      chips: [
        {
          text: "Learn by doing",
          side: "left",
          top: "-9%",
        },
        {
          text: "Real environments",
          side: "right",
          top: "104%",
        },
      ],
    },
  },

  {
    id: "scale-labs",

    tab: ["Hands-on labs", "are difficult to scale"],

    eyebrow: "Scalable lab infrastructure",

    heading: "Deliver hands-on labs without the infrastructure headache",

    body:
      "Creating and managing cloud environments for large numbers of learners can be complex. Cloud4Green helps organizations deliver ready-to-use lab environments at scale while keeping the experience simple for learners and administrators.",

    points: [
      {
        title: "Launch labs on demand",
        desc:
          "Give learners ready-to-use environments without waiting for manual provisioning.",
      },
      {
        title: "Support large learning cohorts",
        desc:
          "Deliver consistent lab experiences across classrooms, teams, events, and training programs.",
      },
      {
        title: "Automate the environment lifecycle",
        desc:
          "Provision, reset, and tear down environments without adding unnecessary operational work.",
      },
    ],

    cta: {
      label: "See Cloud Labs",
      href: "/products/enterprise-labs#catalogue",
    },

    visual: {
      kind: "image",

      src: sol2,

      alt: "Lab environments being provisioned for a large learner cohort",

      fit: "cover",

      chips: [
        {
          text: "Ready to launch",
          side: "right",
          top: "-7%",
        },
      ],
    },
  },

  {
    id: "fragmented-learning",

    tab: ["Learning experiences", "are fragmented"],

    eyebrow: "Enterprise LMS",

    heading: "Bring learning, learners, and progress together",

    body:
      "When courses, learners, assessments, and progress are spread across disconnected systems, it becomes difficult to manage learning at scale. Bring the learning experience together with an enterprise-ready LMS.",

    points: [
      {
        title: "One place for learning",
        desc:
          "Manage courses, learning paths, learners, and training programs from one platform.",
      },
      {
        title: "Track learner progress",
        desc:
          "Understand where learners are, what they have completed, and where they need support.",
      },
      {
        title: "Create structured learning paths",
        desc:
          "Guide learners from foundational knowledge to advanced Cloud and AI capabilities.",
      },
    ],

    cta: {
      label: "Explore Enterprise LMS",
      href: "/products/e-learning",
    },

    visual: {
      kind: "image",

      // Import Solution3 above, then replace `sol3` here.
      src: sol3,

      alt: "Courses, learners, and progress brought together in one LMS",

      fit: "cover",

      chips: [
        {
          text: "Learning in one place",
          side: "left",
          top: "-9%",
        },
      ],
    },
  },

  {
    id: "training",

    tab: ["Training needs", "are different for everyone"],

    eyebrow: "Corporate & individual training",

    heading: "Learning experiences built for every kind of learner",

    body:
      "Organizations need different approaches for employees, technical teams, new hires, and individual learners. Cloud4Green supports flexible learning experiences that can adapt to different roles, goals, and skill levels.",

    points: [
      {
        title: "Corporate training",
        desc:
          "Upskill teams with structured programs aligned to organizational and technology goals.",
      },
      {
        title: "Individual learning",
        desc:
          "Give individual learners flexible paths to build practical Cloud and AI skills.",
      },
      {
        title: "Role-based development",
        desc:
          "Create learning experiences around the skills required for specific roles and technologies.",
      },
    ],

    cta: {
      label: "Explore Training",
      href: "/products/enterprise-training",
    },

    visual: {
      kind: "image",

      // Import Solution4 above, then replace `sol4` here.
      src: sol4,

      alt: "Corporate teams and individual learners following their own paths",

      fit: "cover",

      chips: [
        {
          text: "Built for every learner",
          side: "right",
          top: "-7%",
        },
      ],
    },
  },

  {
    id: "certifications",

    tab: ["Skills are hard", "to prove"],

    eyebrow: "Certifications & skill validation",

    heading: "Turn learning into skills you can actually demonstrate",

    body:
      "Completing a course is only part of the journey. Help learners demonstrate what they know through practical experiences, structured assessments, and certification pathways.",

    points: [
      {
        title: "Validate practical knowledge",
        desc:
          "Connect learning with hands-on activities that reinforce real-world capability.",
      },
      {
        title: "Create certification pathways",
        desc:
          "Guide learners from foundational learning to advanced skills and certification.",
      },
      {
        title: "Make progress visible",
        desc:
          "Give learners and organizations a clearer view of skills gained and learning completed.",
      },
    ],

    cta: {
      label: "Explore Certifications",
      href: "/products/certifications",
    },

    visual: {
      kind: "image",

      // Import Solution5 above, then replace `sol5` here.
      src: sol5,

      alt: "A learner earning a certification that validates their skills",

      fit: "cover",

      chips: [
        {
          text: "Skills validated",
          side: "right",
          top: "10%",
        },
      ],
    },
  },
];


/* ==================================================================
   3. SSR-SAFE LAYOUT EFFECT
================================================================== */

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;


/* ==================================================================
   4. SMALL PIECES
================================================================== */

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="mt-0.5 h-5 w-5 shrink-0"
    aria-hidden="true"
  >
    <path
      d="M4 12.5 9.5 18 20 6.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


/* ==================================================================
   5. FLOATING CHIP
================================================================== */

function Chip({
  text,
  side = "right",
  top = "10%",
}) {
  return (
    <span
      className="absolute z-20 hidden whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium shadow-sm lg:block"
      style={{
        top,
        [side]: 0,
        transform: `translateX(${
          side === "left" ? "-2.5rem" : "2.5rem"
        })`,
        background: T.white,
        color: T.accent,
        border: `1.5px solid ${T.chipBorder}`,
      }}
    >
      {text}
    </span>
  );
}


/* ==================================================================
   6. SPARKLINE
================================================================== */

function Sparkline() {
  const bars = useMemo(
    () =>
      Array.from(
        { length: 30 },
        (_, i) => {
          const wave =
            Math.sin(i / 3.1) * 14 +
            Math.sin(i / 1.7) * 6;

          const raw =
            i < 18
              ? 34 + wave
              : 46 + (i - 18) * 4.6 + wave * 0.7;

          return {
            h: Math.max(
              18,
              Math.min(100, raw)
            ),
            hot: i >= 18,
          };
        }
      ),
    []
  );

  return (
    <div
      className="flex h-10 items-end gap-[3px]"
      aria-hidden="true"
    >
      {bars.map((b, i) => (
        <span
          key={i}
          className="flex-1 rounded-sm"
          style={{
            height: `${b.h}%`,
            background: b.hot
              ? T.accent
              : "#DCE5F2",
          }}
        />
      ))}
    </div>
  );
}


/* ==================================================================
   7. MOCK VISUAL CARD
================================================================== */

function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`rounded-2xl p-6 shadow-[0_30px_70px_-20px_rgba(15,23,42,0.35),0_10px_24px_-12px_rgba(15,23,42,0.18)] ${className}`}
      style={{
        background: T.white,
        border: `1px solid ${T.hairline}`,
      }}
    >
      {children}
    </div>
  );
}


/* ==================================================================
   8. METRIC VISUAL
================================================================== */

function MetricVisual({ v }) {
  return (
    <Card>
      <p
        className="text-sm"
        style={{ color: T.inkSoft }}
      >
        {v.label}
      </p>

      <p
        className="mt-1 mb-5 text-5xl font-semibold tracking-tight"
        style={{ color: T.ink }}
      >
        {v.value}
      </p>

      <div
        className="mb-4 h-px"
        style={{
          background: T.hairline,
        }}
      />

      <dl className="mb-5 grid grid-cols-3 gap-3">
        {v.stats.map((s, i) => (
          <div
            key={s.label}
            className={
              i === 2 ? "text-right" : ""
            }
          >
            <dt
              className="text-xs"
              style={{ color: T.inkSoft }}
            >
              {s.label}
            </dt>

            <dd
              className="mt-1 text-[15px] font-semibold"
              style={{ color: T.ink }}
            >
              {s.value}
            </dd>
          </div>
        ))}
      </dl>

      <Sparkline />
    </Card>
  );
}


/* ==================================================================
   9. PROGRESS VISUAL
================================================================== */

function ProgressVisual({ v }) {
  return (
    <Card>
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <p
          className="text-[15px] font-semibold"
          style={{ color: T.ink }}
        >
          {v.title}
        </p>

        <p
          className="text-xs"
          style={{ color: T.inkSoft }}
        >
          {v.meta}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {v.rows.map((r) => (
          <div key={r.label}>
            <div className="mb-2 flex items-baseline justify-between gap-4">
              <span
                className="text-sm font-medium"
                style={{ color: T.ink }}
              >
                {r.label}
              </span>

              <span
                className="text-sm font-semibold"
                style={{ color: T.accent }}
              >
                {r.value}%
              </span>
            </div>

            <div
              className="h-2 overflow-hidden rounded-full"
              style={{
                background: T.accentSoft,
              }}
            >
              <span
                className="block h-full rounded-full"
                style={{
                  width: `${r.value}%`,
                  background: T.accent,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}


/* ==================================================================
   10. STATUS VISUAL
================================================================== */

function StatusVisual({ v }) {
  return (
    <div className="flex flex-col gap-3">
      {v.rows.map((r) => (
        <div
          key={r.title}
          className="flex items-center gap-3 rounded-2xl px-5 py-4 shadow-[0_20px_45px_-20px_rgba(15,23,42,0.35)]"
          style={{
            background: T.white,
            border: `1px solid ${T.hairline}`,
          }}
        >
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{
              background: T.accent,
              boxShadow: `0 0 0 4px ${T.accentSoft}`,
            }}
          />

          <span className="min-w-0">
            <span
              className="block truncate text-[15px] font-semibold"
              style={{ color: T.ink }}
            >
              {r.title}
            </span>

            <span
              className="mt-0.5 block truncate text-[13px]"
              style={{ color: T.inkSoft }}
            >
              {r.meta}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}


/* ==================================================================
   11. LEDGER VISUAL
================================================================== */

function LedgerVisual({ v }) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <span
          className="text-sm"
          style={{ color: T.inkSoft }}
        >
          {v.title}
        </span>

        <span
          className="rounded-lg px-2.5 py-1 text-[10px] font-bold tracking-[0.12em]"
          style={{
            color: T.accent,
            border: `1px solid ${T.chipBorder}`,
            background: T.accentSoft,
          }}
        >
          {v.tag}
        </span>
      </div>

      {v.rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-4 py-3.5 text-sm"
          style={{
            borderTop: `1px solid ${T.hairline}`,
          }}
        >
          <span
            className="flex-1 font-semibold"
            style={{ color: T.ink }}
          >
            {r.label}
          </span>

          <span
            className="text-xs"
            style={{ color: T.inkSoft }}
          >
            {r.when}
          </span>

          <span
            className="min-w-[60px] text-right font-semibold"
            style={{
              color: r.accent
                ? T.accent
                : T.ink,
            }}
          >
            {r.value}
          </span>
        </div>
      ))}
    </Card>
  );
}


/* ==================================================================
   12. USAGE VISUAL
================================================================== */

function UsageVisual({ v }) {
  const rows = [
    {
      ...v.before,
      dim: true,
    },
    {
      ...v.after,
      dim: false,
    },
  ];

  return (
    <Card>
      <p
        className="mb-6 text-[15px] font-semibold"
        style={{ color: T.ink } }
      >
        {v.title}
      </p>

      <div className="flex h-44 items-end gap-8">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex flex-1 flex-col items-center gap-3"
          >
            <span
              className="text-sm font-semibold"
              style={{ color: T.ink }}
            >
              {r.caption}
            </span>

            <span
              className="w-full rounded-t-xl"
              style={{
                height: `${r.value}%`,
                background: r.dim
                  ? "#DCE5F2"
                  : T.accent,
              }}
            />

            <span
              className="text-xs"
              style={{ color: T.inkSoft }}
            >
              {r.label}
            </span>
          </div>
        ))}
      </div>

      {v.footnote && (
        <p
          className="mt-5 text-xs"
          style={{ color: T.inkSoft }}
        >
          {v.footnote}
        </p>
      )}
    </Card>
  );
}


/* ==================================================================
   12.5. IMAGE / ILLUSTRATION VISUAL

   Renders the tab's image. If no `src` has been given yet, a dashed
   placeholder is shown instead so the layout still holds its shape
   (see the guide above CHALLENGES for how to add the image).
================================================================== */

function ImageVisual({ v }) {
  if (!v.src) {
    return <ImagePlaceholder hint={v.alt} />;
  }

  return (
    <img
      src={v.src}
      alt={v.alt || ""}
      loading="lazy"
      decoding="async"
      className="w-full rounded-2xl shadow-[0_30px_70px_-20px_rgba(15,23,42,0.35),0_10px_24px_-12px_rgba(15,23,42,0.18)]"
      style={{
        objectFit: v.fit || "cover",
        aspectRatio: v.ratio || undefined,
        background: T.white,
        border: `1px solid ${T.hairline}`,
      }}
    />
  );
}


function ImagePlaceholder({
  label = "Add image or illustration",
  hint,
}) {
  return (
    <div
      className="flex min-h-[320px] w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-6 text-center"
      style={{
        borderColor: T.chipBorder,
        background: T.accentSoft,
        color: T.accent,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-9 w-9"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="16"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle
          cx="8.5"
          cy="9.5"
          r="1.5"
          fill="currentColor"
        />
        <path
          d="M21 16l-5.5-5.5a2 2 0 0 0-2.8 0L3 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="text-sm font-medium">
        {label}
      </span>

      {hint && (
        <span
          className="max-w-[26ch] text-xs leading-relaxed"
          style={{ color: T.inkSoft }}
        >
          {hint}
        </span>
      )}
    </div>
  );
}


/* ==================================================================
   13. VISUAL SWITCHER
================================================================== */

function Visual({ v }) {
  const body =
    v.kind === "metric" ? (
      <MetricVisual v={v} />
    ) : v.kind === "progress" ? (
      <ProgressVisual v={v} />
    ) : v.kind === "status" ? (
      <StatusVisual v={v} />
    ) : v.kind === "ledger" ? (
      <LedgerVisual v={v} />
    ) : v.kind === "usage" ? (
      <UsageVisual v={v} />
    ) : v.kind === "image" ? (
      <ImageVisual v={v} />
    ) : null;

  return (
    <div className="relative">
      {body}

      {v.chips?.map((c) => (
        <Chip
          key={c.text}
          {...c}
        />
      ))}
    </div>
  );
}


/* ==================================================================
   14. SECTION
================================================================== */

export default function ChallengesSection({
  headingBefore = "What ",
  headingAccent = "challenges",
  headingAfter = " can we solve for you?",
  items = CHALLENGES,
}) {
  const uid = useId().replace(/:/g, "");

  const [active, setActive] = useState(0);

  const [bar, setBar] = useState({
    left: 0,
    width: 0,
    ready: false,
  });

  const trackRef = useRef(null);

  const tabRefs = useRef([]);


  /* --------------------------------------------------------------
     Sliding underline
  -------------------------------------------------------------- */

  const placeBar = useCallback(() => {
    const el = tabRefs.current[active];

    if (!el) return;

    setBar({
      left: el.offsetLeft,
      width: el.offsetWidth,
      ready: true,
    });
  }, [active]);


  useIsoLayoutEffect(placeBar, [placeBar]);


  /* --------------------------------------------------------------
     Resize handling
  -------------------------------------------------------------- */

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const ro = new ResizeObserver(placeBar);

    ro.observe(track);

    window.addEventListener(
      "resize",
      placeBar
    );

    if (document.fonts?.ready) {
      document.fonts.ready
        .then(placeBar)
        .catch(() => {});
    }

    return () => {
      ro.disconnect();

      window.removeEventListener(
        "resize",
        placeBar
      );
    };
  }, [placeBar]);


  /* --------------------------------------------------------------
     Keep active tab visible on mobile
  -------------------------------------------------------------- */

  /* Two things were wrong here, and the first one only ever bit in dev.
   *
   * The guard was `const mounted = useRef(false)` — "have I run before?".
   * StrictMode runs every effect setup, cleanup, then setup again on the *same*
   * fiber, and a ref survives that, so the second setup found `mounted.current`
   * already true and fell straight through to the scroll. On mount, with no tab
   * ever having been clicked. That is why opening or refreshing the home page
   * in dev walked the window down the document on its own, and why it would
   * have stopped doing it in a production build — which is a misleading place
   * for a bug to hide.
   *
   * The guard now asks the question it actually meant: did `active` change?
   * StrictMode can re-run that as many times as it likes without changing the
   * answer.
   *
   * The second thing is why the jump was so large. `scrollIntoView` with
   * `block: "nearest"` scrolls the nearest scrollable ancestor on *both* axes,
   * and the nearest vertically scrollable ancestor of a tab is the document.
   * `nearest` moves the minimum distance to get the strip on screen, which
   * lands its bottom edge on the bottom of the viewport — so the screen fills
   * with whatever sits above the strip, and what sits above it is the products
   * section, sticky and viewport-filling for its whole ~3000px band.
   *
   * Only the horizontal axis was ever wanted: the strip is the thing that
   * scrolls (`overflow-x-auto`, above), and the point is to keep the active tab
   * centred in it on mobile. Setting the strip's own scrollLeft says exactly
   * that and cannot move the page on any axis, so the whole class of bug goes
   * with it rather than just the StrictMode instance of it. */
  const lastActive = useRef(active);

  useEffect(() => {
    if (lastActive.current === active) return;
    lastActive.current = active;

    const strip = trackRef.current;
    const tab = tabRefs.current[active];
    if (!strip || !tab) return;

    /* Rect deltas rather than offsetLeft: the tablist between the strip and
       the tab is `position: relative`, so it — not the strip — is the tab's
       offsetParent, and offsetLeft would be measured from the wrong box. */
    const stripBox = strip.getBoundingClientRect();
    const tabBox = tab.getBoundingClientRect();
    const delta =
      tabBox.left + tabBox.width / 2 - (stripBox.left + stripBox.width / 2);

    // The browser clamps scrollLeft to the strip's own range for us.
    strip.scrollTo({ left: strip.scrollLeft + delta, behavior: "smooth" });
  }, [active]);


  /* --------------------------------------------------------------
     Keyboard navigation
  -------------------------------------------------------------- */

  const onKeyDown = (e) => {
    const last = items.length - 1;

    let next = null;

    if (e.key === "ArrowRight") {
      next =
        active === last
          ? 0
          : active + 1;
    } else if (e.key === "ArrowLeft") {
      next =
        active === 0
          ? last
          : active - 1;
    } else if (e.key === "Home") {
      next = 0;
    } else if (e.key === "End") {
      next = last;
    }

    if (next === null) return;

    e.preventDefault();

    setActive(next);

    /* `focus()` scrolls the focused element into view, on the document, by the
       same `nearest` rule that made the effect above drag the page. The effect
       centres the tab in its strip a tick later, which is the only movement
       arrowing through the tabs should cause. */
    tabRefs.current[next]?.focus({ preventScroll: true });
  };


  const current = items[active];


  /* --------------------------------------------------------------
     Render
  -------------------------------------------------------------- */

  return (
    <section
      className="px-5 py-20 sm:px-8 lg:py-28"
      style={{
        background: T.canvas,
      }}
      aria-labelledby={`${uid}-title`}
    >

      <style>{`
        @keyframes ${uid}-in {
          from {
            opacity: 0;
            transform: translateY(14px);
          }

          to {
            opacity: 1;
            transform: none;
          }
        }

        .${uid}-panel {
          animation:
            ${uid}-in
            .45s
            cubic-bezier(.2,.7,.2,1)
            both;
        }

        .${uid}-strip {
          scrollbar-width: none;
        }

        .${uid}-strip::-webkit-scrollbar {
          display: none;
        }

        .${uid}-tab {
          -webkit-tap-highlight-color: transparent;
        }

        .${uid}-tab:hover {
          background-color: rgba(15, 23, 42, 0.04);
        }

        .${uid}-tab[aria-selected="true"] {
          background-color: rgba(22, 163, 74, 0.08);
        }

        .${uid}-tab[aria-selected="true"]:hover {
          background-color: rgba(22, 163, 74, 0.14);
        }

        @media (prefers-reduced-motion: reduce) {
          .${uid}-panel {
            animation: none;
          }

          .${uid}-bar {
            transition: none !important;
          }
        }
      `}</style>


      <div className="mx-auto w-full max-w-6xl">


        {/* ==========================================================
            HEADING
        ========================================================== */}

        {/* Eyebrow then headline, off one trigger with 0.1s between them.
            A fade-up rather than the masked-line reveal used on the short
            headings: this one is a flowing sentence whose break moves with the
            viewport, and masking lines you cannot predict means the block
            travels its own full height on a narrow screen. */}
        <RevealGroup className="mx-auto max-w-3xl text-center">

          <RevealItem
            as="p"
            className="mb-4 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: T.accent }}
          >
            The challenge
          </RevealItem>

          <RevealItem
            as="h2"
            id={`${uid}-title`}
            className="mx-auto mb-12 font-regular leading-[1.12] tracking-tight lg:mb-14 font-recoleta uppercase"
            style={{
              color: T.ink,
              fontSize:
                "clamp(1.9rem, 4vw, 3.1rem)",
            }}
          >
            {headingBefore}

            <span
              style={{
                color: T.accent,
              }}
            >
              {headingAccent}
            </span>

            {headingAfter}
          </RevealItem>

        </RevealGroup>


        {/* ==========================================================
            TABS
        ========================================================== */}

        <div
          ref={trackRef}
          className={`${uid}-strip -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0`}
        >

          <div
            role="tablist"
            aria-label="Challenges"
            onKeyDown={onKeyDown}
            className="relative flex min-w-max items-stretch justify-center gap-2 pb-3 sm:min-w-0 sm:gap-4"
            style={{
              borderBottom:
                `1px solid ${T.hairline}`,
            }}
          >

            {items.map((item, i) => {
              const on = i === active;

              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    tabRefs.current[i] =
                      el;
                  }}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${item.id}`}
                  aria-selected={on}
                  aria-controls={`${uid}-panel-${item.id}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() =>
                    setActive(i)
                  }
                  className={`${uid}-tab flex-1 cursor-pointer select-none rounded-lg px-3 py-2 text-center text-[15px] leading-snug transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-4`}
                  style={{
                    color: on
                      ? T.accent
                      : T.ink,
                    fontWeight: on
                      ? 600
                      : 400,
                    outlineColor:
                      T.accent,
                  }}
                >

                  {item.tab.map((line) => (
                    <span
                      key={line}
                      className="block whitespace-nowrap sm:whitespace-normal"
                    >
                      {line}
                    </span>
                  ))}

                </button>
              );
            })}


            {/* Sliding blue underline */}

            <span
              className={`${uid}-bar pointer-events-none absolute bottom-0 h-[3px] rounded-full`}
              aria-hidden="true"
              style={{
                left: bar.left,
                width: bar.width,
                background: T.accent,
                opacity: bar.ready
                  ? 1
                  : 0,
                transition:
                  "left .35s cubic-bezier(.2,.7,.2,1), width .35s cubic-bezier(.2,.7,.2,1)",
              }}
            />

          </div>

        </div>


        {/* ==========================================================
            ACTIVE PANEL
        ========================================================== */}

        <div
          key={current.id}
          role="tabpanel"
          id={`${uid}-panel-${current.id}`}
          aria-labelledby={`${uid}-tab-${current.id}`}
          tabIndex={0}
          className={`${uid}-panel mt-8 overflow-hidden rounded-3xl p-7 focus-visible:outline-2 focus-visible:outline-offset-2 sm:p-10 lg:mt-10 lg:overflow-visible lg:p-14`}
          style={{
            background: T.panel,

            border:
              `1px solid ${T.hairline}`,

            
            outlineColor:
              T.accent,

            backgroundImage: `
              linear-gradient(
                ${T.grid} 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                ${T.grid} 1px,
                transparent 1px
              )
            `,

            backgroundSize:
              "18px 18px",
          }}
        >

          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16">


            {/* ======================================================
                LEFT — COPY
            ====================================================== */}

            <div>

              <p
                className="mb-4 text-[17px] font-semibold"
                style={{
                  color: T.accent,
                }}
              >
                {current.eyebrow}
              </p>


              <h3
                className="mb-5 font-regular font-recoleta leading-[1.18] tracking-tight"
                style={{
                  color: T.ink,
                  fontSize:
                    "clamp(1.55rem, 2.5vw, 2.15rem)",
                }}
              >
                {current.heading}
              </h3>


              <p
                className="mb-8 max-w-xl text-[15.5px] leading-relaxed"
                style={{
                  color: T.inkSoft,
                }}
              >
                {current.body}
              </p>


              {/* ====================================================
                  POINTS
              ==================================================== */}

              <ul className="mb-9 flex flex-col gap-5">

                {current.points.map((p) => (
                  <li
                    key={p.title}
                    className="flex gap-4"
                  >

                    <span
                      style={{
                        color: T.accent,
                      }}
                    >
                      <CheckIcon />
                    </span>


                    <span>

                      <span
                        className="block text-[17px] font-medium leading-snug"
                        style={{
                          color: T.ink,
                        }}
                      >
                        {p.title}
                      </span>


                      <span
                        className="mt-1 block text-[14.5px] leading-relaxed"
                        style={{
                          color: T.inkSoft,
                        }}
                      >
                        {p.desc}
                      </span>

                    </span>

                  </li>
                ))}

              </ul>


              {/* ====================================================
                  CTA
              ==================================================== */}

              <Button
                variant="ink"
                arrow
                render={<Link to={current.cta.href} />}
              >
                {current.cta.label}
              </Button>

            </div>


            {/* ======================================================
                RIGHT — VISUAL
            ====================================================== */}

            <Visual
              v={current.visual}
            />

          </div>

        </div>

      </div>

    </section>
  );
}
