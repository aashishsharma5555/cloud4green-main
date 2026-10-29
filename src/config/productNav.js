/**
 * Tier-2 navigation — one entry per product page.
 *
 * The site navbar (src/components/layout/Navbar.jsx) is tier 1 and never
 * changes. This is the bar that appears under it on a product page only: the
 * product's name, and a link to each section *of the same page*. There is no
 * call to action here on purpose — that lives in tier 1, so the two bars never
 * compete for the same click.
 *
 * `sections` doubles as the page's table of contents, so:
 *   · every id must exist on that page, on the section's own element
 *   · the order must be the page's own order — the scroll-spy in
 *     Usesectionspy.js reads them top to bottom and lights the last one that
 *     has passed under the bar
 *   · point them at real sections only. A link that lands on a placeholder
 *     reads as a broken page, so leave the scaffold blocks out until they're
 *     built.
 *
 * Keep the labels short, one or two words. They sit on one line at every width
 * on desktop and collapse into a dropdown below `lg`.
 *
 * `heroId` is the section the bar waits for: nothing but tier 1 is on screen
 * until that element has left the top of the viewport, and the handover
 * happens the moment it does. It is usually — but not always — the first
 * entry in `sections`, so it is named rather than inferred. Point it at the
 * element that actually holds the masthead; if the id doesn't resolve, the bar
 * falls back to arriving with the first scroll.
 */
export const productNav = [
  {
    path: "/products/enterprise-labs",
    name: "Enterprise Labs",
    /* <HowItWorks> opens on a full-fold masthead and carries the section under
       it, so the whole thing is the hero here. */
    heroId: "how-it-works",
    sections: [
      { id: "how-it-works", label: "How it works" },
      { id: "catalogue", label: "Catalogue" },
      { id: "who-its-for", label: "Who it's for" },
      { id: "faq", label: "FAQ" },
    ],
  },

  {
    path: "/products/e-learning",
    name: "E-Learning",
    heroId: "overview",
    sections: [
      { id: "overview", label: "Overview" },
      { id: "why", label: "Why us" },
      { id: "pillars", label: "Pillars" },
      { id: "impact", label: "Impact" },
      { id: "industries", label: "Industries" },
      { id: "faq", label: "FAQ" },
    ],
  },

  {
    path: "/products/certifications",
    name: "Certifications",
    heroId: "overview",
    sections: [
      { id: "overview", label: "Overview" },
      { id: "certification-tracks", label: "Tracks" },
      { id: "training", label: "Training" },
      { id: "benefits", label: "Benefits" },
    ],
  },

  {
    path: "/products/enterprise-training",
    name: "Enterprise Training",
    heroId: "corporate-training",
    sections: [
      { id: "corporate-training", label: "Overview" },
      { id: "skills-catalog", label: "Skills" },
      { id: "organizations", label: "For teams" },
      { id: "why-us", label: "Why us" },
    ],
  },

  /* Services pages run the same tier-2 bar as the product pages. */
  {
    path: "/services/automation",
    name: "Automation",
    heroId: "automation-hero",
    sections: [
      { id: "automation-hero", label: "Overview" },
      { id: "problems", label: "Problems" },
      { id: "solutions", label: "Solutions" },
      { id: "catalogue", label: "Catalogue" },
      { id: "ecosystem", label: "Ecosystem" },
      { id: "approach", label: "Approach" },
    ],
  },

  {
    path: "/services/consulting",
    name: "Consulting",
    heroId: "overview",
    sections: [
      { id: "overview", label: "Overview" },
      { id: "offerings", label: "Offerings" },
    ],
  },
];

/**
 * The tier-2 entry for a pathname, or null on every other page — which is what
 * tells the navbar whether it is running in product mode at all.
 */
export function getProductNav(pathname) {
  return (
    productNav.find(
      (p) => pathname === p.path || pathname.startsWith(`${p.path}/`)
    ) ?? null
  );
}
