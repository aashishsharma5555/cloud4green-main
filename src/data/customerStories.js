// What each photo actually shows, so a story gets one that fits:
import officeTower from "@/assets/images/sector3.jpg"; // glass office towers
import clinician from "@/assets/images/sector4.webp"; // clinician at monitors
import workshop from "@/assets/images/sector1.jpg"; // vehicle workshop / production floor
import classroom from "@/assets/images/corpTraining2.webp"; // instructor-led session
import studyNotes from "@/assets/images/sector5.webp"; // writing notes beside a laptop
import deskLaptop from "@/assets/images/corpTraining3.webp"; // notebook and laptop on a desk
import techWave from "@/assets/images/labsImg1.jpg"; // abstract blue tech grid

// Placeholder stories â€” anonymised on purpose. Swap in real, approved
// Cloud4Green customer stories (and their numbers) when available.
//
// `product` must match a key in PRODUCTS so the card can link to the
// product page; `industry` drives the filter row on /customers.

export const PRODUCTS = {
  "Enterprise Labs": "/products/enterprise-labs",
  "E-Learning": "/products/e-learning",
  Certifications: "/products/certifications",
  "Enterprise Training": "/products/enterprise-training",
  Automation: "/services/automation",
  Consulting: "/services/consulting",
};

export const customerStories = [
  {
    id: "fintech-cloud-readiness",
    featured: true,
    client: "A digital-first bank",
    industry: "Financial services",
    product: "Enterprise Labs",
    image: officeTower,
    headline: "Two hundred engineers, production-ready on AWS in one quarter.",
    summary:
      "A cloud migration with a hard deadline and a team that had never run Kubernetes in production.",
    challenge:
      "The bank was moving its core payments stack to AWS and had committed to a cut-over date. Most of the platform team had certifications but little hands-on time, and sandbox accounts kept getting shut down by the security team.",
    approach:
      "We stood up guard-railed lab accounts mapped to the bank's own reference architecture â€” EKS, IAM boundaries, budget caps and four-hour lifetimes â€” and ran cohort-based sprints where every task was validated against a live environment.",
    outcome:
      "The platform team ran the cut-over themselves, on schedule, with no sandbox spend left behind and no security exceptions raised.",
    metrics: [
      { value: "200+", label: "engineers enabled" },
      { value: "12 wks", label: "to production" },
      { value: "0", label: "orphaned cloud resources" },
    ],
    quote: {
      text: "Our people learned on environments that looked exactly like production, so on the night it didn't feel new.",
      who: "Head of Platform Engineering",
    },
  },
  {
    id: "healthcare-lms",
    client: "A regional hospital network",
    industry: "Healthcare",
    product: "E-Learning",
    image: clinician,
    headline: "One LMS for 9,000 clinical and support staff.",
    summary:
      "Compliance training scattered across four systems, and no way to prove who had completed what.",
    challenge:
      "Mandatory training lived in four separate tools. Audits meant weeks of spreadsheet work, and shift workers struggled to find time for long modules.",
    approach:
      "We consolidated content into one managed LMS, rebuilt the long courses as short mobile-first modules, and set up automated reminders and department-level reporting.",
    outcome:
      "Completion rates rose sharply and audit evidence now comes out of a single report.",
    metrics: [
      { value: "9k", label: "learners on one platform" },
      { value: "94%", label: "mandatory completion" },
      { value: "4 â†’ 1", label: "systems consolidated" },
    ],
    quote: {
      text: "Audit prep went from a month of chasing to one export.",
      who: "Director of Learning & Development",
    },
  },
  {
    id: "retail-certifications",
    client: "A national retail group",
    industry: "Retail",
    product: "Certifications",
    image: studyNotes,
    headline: "Building an in-house Azure bench, one certification at a time.",
    summary:
      "Contractor spend on cloud operations was climbing and the group wanted the skills inside the business.",
    challenge:
      "The retailer relied on contractors for most Azure work and had no structured path for internal staff to move into cloud roles.",
    approach:
      "We ran exam-mapped tracks for AZ-900, AZ-104 and AZ-305 with practice labs, mock exams and voucher support, grouped by role so each cohort had a clear destination.",
    outcome:
      "The group filled its new cloud operations team from inside the business and cut its reliance on contractors.",
    metrics: [
      { value: "86%", label: "first-attempt pass rate" },
      { value: "140", label: "certifications earned" },
      { value: "3", label: "role-based tracks" },
    ],
  },
  {
    id: "public-sector-training",
    client: "A state government department",
    industry: "Public sector",
    product: "Enterprise Training",
    image: classroom,
    headline: "Cloud and data skills across three departments, one learning path.",
    summary:
      "A modernisation programme that needed staff who could run the new platforms, not just use them.",
    challenge:
      "Three departments were adopting a shared data platform, but skill levels varied widely and training budgets were set per department.",
    approach:
      "We designed one blended programme â€” instructor-led workshops plus self-paced labs â€” with a common baseline and department-specific electives, delivered on live cloud accounts.",
    outcome:
      "All three departments went live on the shared platform with trained owners in each team.",
    metrics: [
      { value: "3", label: "departments aligned" },
      { value: "450", label: "staff trained" },
      { value: "4.7/5", label: "average session rating" },
    ],
    quote: {
      text: "For the first time the three teams were learning the same thing, in the same way, at the same time.",
      who: "Programme Director, Digital Services",
    },
  },
  {
    id: "logistics-automation",
    client: "A logistics and freight company",
    industry: "Logistics",
    product: "Automation",
    image: deskLaptop,
    headline: "Taking the manual work out of freight invoicing.",
    summary:
      "Finance staff were re-keying data from carrier invoices into the ERP by hand.",
    challenge:
      "Thousands of carrier invoices arrived each month in different formats. Matching them to shipments was slow, error-prone and delayed month-end close.",
    approach:
      "We built a workflow that extracts invoice data, matches it to shipment records in the ERP and routes only the exceptions to a person, with an AI agent handling first-pass queries.",
    outcome:
      "The finance team now reviews exceptions instead of typing, and month-end closes days earlier.",
    metrics: [
      { value: "70%", label: "invoices fully automated" },
      { value: "3 days", label: "faster month-end" },
      { value: "< 1%", label: "matching errors" },
    ],
  },
  {
    id: "saas-ai-labs",
    client: "A B2B SaaS company",
    industry: "Technology",
    product: "Enterprise Labs",
    image: techWave,
    headline: "Getting every engineer hands-on with GenAI, safely.",
    summary:
      "Leadership wanted AI features on the roadmap; the team had never shipped one.",
    challenge:
      "Engineers were experimenting with personal API keys and no shared practice for evaluation, cost control or data handling.",
    approach:
      "We provided managed AI labs with pre-provisioned model access, spend limits and guided builds â€” retrieval, evaluation and agent patterns â€” tied to the product's real use cases.",
    outcome:
      "The company shipped its first AI feature within a quarter, built on patterns the whole team had practised.",
    metrics: [
      { value: "120", label: "engineers in AI labs" },
      { value: "1 qtr", label: "to first AI feature" },
      { value: "$0", label: "shadow API spend" },
    ],
  },
  {
    id: "manufacturing-consulting",
    client: "A mid-size manufacturer",
    industry: "Manufacturing",
    product: "Consulting",
    image: workshop,
    headline: "A digital roadmap the shop floor actually signed up to.",
    summary:
      "Several stalled IT projects and no shared view of where to invest next.",
    challenge:
      "The manufacturer had started three digital projects in two years and finished none. Operations and IT disagreed on priorities.",
    approach:
      "We ran a short discovery across plants, mapped processes end to end, and built a sequenced roadmap with business cases owned jointly by operations and IT.",
    outcome:
      "The first two roadmap projects were delivered on budget, and the leadership team now reviews digital investment against one plan.",
    metrics: [
      { value: "6 wks", label: "discovery to roadmap" },
      { value: "2/2", label: "projects delivered on budget" },
      { value: "1", label: "shared investment plan" },
    ],
  },
];

export const INDUSTRIES = [
  "All",
  ...new Set(customerStories.map((s) => s.industry)),
];
