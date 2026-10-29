/**
 * Search and social metadata — the single source for every page's <head>.
 *
 * Read in three places, which is why this file imports nothing (no React, no
 * assets, no "@/" aliases): vite.config.js loads it in Node.
 *
 *   1. The build (vite.config.js, seoPages plugin) writes a static HTML file
 *      per route with these tags already in its <head>, plus sitemap.xml,
 *      robots.txt and Netlify's _redirects. Crawlers and link-preview bots
 *      that don't run JavaScript — LinkedIn, Slack, WhatsApp, Bing's first
 *      pass — see the right title and description without booting React.
 *   2. The dev server injects the same tags per request.
 *   3. <RouteSeo /> swaps them on client-side navigation, so the tab title and
 *      the canonical follow the route the reader is actually on.
 *
 * Adding a page: add its route to App.jsx and an entry to PAGES here. Nothing
 * else — it lands in the sitemap and gets its own HTML file automatically.
 */

/* The production origin. Canonicals, og:url and the sitemap are all absolute,
   so this must be the domain the site is actually served from. */
export const SITE_URL = "https://cloud4green.com";

export const SITE_NAME = "Cloud4Green";
const LEGAL_NAME = "Cloud4Green Technologies";

/* 1200x630, in /public. */
const OG_IMAGE = "/og-image.png";
const LOGO = "/logo.png";

const EMAIL = "reach@cloud4green.com";
const PHONE = "+91-7022424545";
const LINKEDIN = "https://www.linkedin.com/company/cloud4green-technologies/";

/* Indexable pages. `title` is the full <title> (keep it under ~60 characters);
   `description` is the search snippet (~150–160). `crumb` names the page in
   breadcrumb structured data. */
export const PAGES = {
  "/": {
    title: "Cloud4Green | Hands-On Cloud & AI Labs for Enterprise Learning",
    description:
      "Hands-on cloud and AI labs, an enterprise LMS, certification programs and corporate training that turn learning into real-world capability for your teams.",
    priority: 1.0,
  },
  "/enterprise": {
    crumb: "Enterprise",
    title: "Enterprise Learning Platform | Cloud4Green",
    description:
      "One connected platform for enterprise learning: cloud labs, AI labs, an enterprise LMS, certifications and analytics, built for modern organizations.",
    priority: 0.9,
  },
  "/products/enterprise-labs": {
    crumb: "Enterprise Labs",
    title: "Enterprise Cloud & AI Labs | Cloud4Green",
    description:
      "Live cloud and AI lab environments for enterprise teams — 28 domains and 415 technologies across AWS, Azure, GCP, Kubernetes and more, validated as people work.",
    priority: 0.9,
  },
  "/products/e-learning": {
    crumb: "E-Learning",
    title: "Enterprise E-Learning & LMS Solutions | Cloud4Green",
    description:
      "Managed enterprise learning: needs analysis, content development, LMS management and ROI reporting, with hands-on training across cloud, AI, data and security.",
    priority: 0.9,
  },
  "/products/certifications": {
    crumb: "Certifications",
    title: "Cloud & IT Certification Training | Cloud4Green",
    description:
      "Exam-mapped certification tracks for AWS, Azure, Google Cloud, Kubernetes, cybersecurity and more, with hands-on practice labs, mock exams and voucher support.",
    priority: 0.9,
  },
  "/products/enterprise-training": {
    crumb: "Enterprise Training",
    title: "Corporate Cloud & AI Training Programs | Cloud4Green",
    description:
      "Customised corporate training in cloud, GenAI, DevOps, data and security — instructor-led, self-paced or blended, on live cloud accounts, built around your goals.",
    priority: 0.9,
  },
  "/services/automation": {
    crumb: "Automation",
    title: "Workflow Automation & AI Agents | Cloud4Green",
    description:
      "Automate repetitive processes, connect enterprise systems and deploy AI agents. Workflow automation, AI agents and agentic automation built on your own stack.",
    priority: 0.8,
  },
  "/services/consulting": {
    crumb: "Consulting",
    title: "Business & Technology Consulting | Cloud4Green",
    description:
      "Strategy, operations, digital and technology, and marketing consulting — twenty services across four practices that turn ambition into measurable outcomes.",
    priority: 0.8,
  },
  "/customers": {
    crumb: "Customer Stories",
    title: "Customer Stories | Cloud4Green",
    description:
      "How organisations in finance, healthcare, retail, the public sector and more use Cloud4Green labs, training, certifications and automation to deliver results.",
    priority: 0.8,
  },
  "/whats-new": {
    crumb: "What's New",
    title: "What's New: ReyvanX Zero Trust & More | Cloud4Green",
    description:
      "The latest from Cloud4Green: ReyvanX zero trust network access, new cloud and GenAI labs, LMS updates and refreshed certification tracks.",
    priority: 0.7,
  },
  "/about": {
    crumb: "About",
    title: "About Us | Cloud4Green",
    description:
      "Cloud4Green Technologies is a Bengaluru-based learning and technology company: 13+ years of hands-on cloud, AI and security training for people and enterprises.",
    priority: 0.7,
  },
  "/contact": {
    crumb: "Contact",
    title: "Contact Us | Cloud4Green",
    description:
      "Talk to Cloud4Green about hands-on Cloud & AI Labs, an enterprise LMS or tailored training. Book a 30-minute call or send a message; we reply within a working day.",
    priority: 0.7,
  },
};

/* Linked from the site but not built yet. They answer 200 with the
   "in progress" page and are kept out of the index (noindex, not in the
   sitemap) until they have content. A trailing /* matches everything under
   that path. Anything that is neither here nor in PAGES is a real 404. */
export const COMING_SOON = [
  "/individual",
  "/privacy",
  "/terms",
  "/services/automation/*",
];

const COMING_SOON_META = {
  title: `Coming soon | ${SITE_NAME}`,
  description: "This page is under construction and will be up soon.",
  noindex: true,
};

const NOT_FOUND_META = {
  title: `Page not found | ${SITE_NAME}`,
  description: "The page you were looking for doesn't exist.",
  noindex: true,
};

const normalise = (path) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

export function isComingSoon(path) {
  const p = normalise(path);
  return COMING_SOON.some((pattern) =>
    pattern.endsWith("/*")
      ? p.startsWith(pattern.slice(0, -1))
      : p === pattern,
  );
}

/** The metadata for any path: a page, a coming-soon route, or a 404. */
export function metaFor(path) {
  const p = normalise(path.split(/[?#]/)[0] || "/");
  if (PAGES[p]) return { ...PAGES[p], path: p };
  if (isComingSoon(p)) return { ...COMING_SOON_META, path: p };
  return { ...NOT_FOUND_META, path: p };
}

export const absolute = (path) => SITE_URL + (path === "/" ? "/" : path);

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function structuredData(meta) {
  const org = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: `${SITE_URL}/`,
    logo: SITE_URL + LOGO,
    email: EMAIL,
    sameAs: [LINKEDIN],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: EMAIL,
        telephone: PHONE,
        availableLanguage: ["English"],
      },
    ],
  };

  const graph = [org];

  if (meta.path === "/") {
    graph.push({
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
    });
  } else if (meta.crumb) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: meta.crumb, item: absolute(meta.path) },
      ],
    });
  }

  /* `<` escaped so no string in the data can close the script element. */
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
    /</g,
    "\\u003c",
  );
}

/**
 * Every tag this module owns, as an HTML string. Each carries data-seo so the
 * client can find and replace exactly this set and nothing else in <head>.
 */
export function headTags(path) {
  const meta = metaFor(path);
  const url = absolute(meta.path);
  const image = SITE_URL + OG_IMAGE;

  const tags = [
    `<title data-seo>${esc(meta.title)}</title>`,
    `<meta data-seo name="description" content="${esc(meta.description)}" />`,
  ];

  if (meta.noindex) {
    tags.push(`<meta data-seo name="robots" content="noindex, follow" />`);
  } else {
    tags.push(
      `<meta data-seo name="robots" content="index, follow, max-image-preview:large" />`,
      `<link data-seo rel="canonical" href="${esc(url)}" />`,
      `<meta data-seo property="og:type" content="website" />`,
      `<meta data-seo property="og:site_name" content="${SITE_NAME}" />`,
      `<meta data-seo property="og:locale" content="en_US" />`,
      `<meta data-seo property="og:title" content="${esc(meta.title)}" />`,
      `<meta data-seo property="og:description" content="${esc(meta.description)}" />`,
      `<meta data-seo property="og:url" content="${esc(url)}" />`,
      `<meta data-seo property="og:image" content="${esc(image)}" />`,
      `<meta data-seo property="og:image:width" content="1200" />`,
      `<meta data-seo property="og:image:height" content="630" />`,
      `<meta data-seo property="og:image:alt" content="${SITE_NAME} — hands-on cloud and AI labs for enterprise learning" />`,
      `<meta data-seo name="twitter:card" content="summary_large_image" />`,
      `<meta data-seo name="twitter:title" content="${esc(meta.title)}" />`,
      `<meta data-seo name="twitter:description" content="${esc(meta.description)}" />`,
      `<meta data-seo name="twitter:image" content="${esc(image)}" />`,
      `<script data-seo type="application/ld+json">${structuredData(meta)}</script>`,
    );
  }

  return tags.join("\n    ");
}
