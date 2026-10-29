/**
 * FAQ content, kept out of the pages so the accordion itself stays a pure
 * presentational component (src/components/faq/FaqSection.jsx) and a page is
 * nothing but a heading and a list.
 *
 * One export per page. Add a new array here rather than inlining questions in
 * a page — the copy is the thing that changes between pages, and this is the
 * one file to open when it does.
 *
 * Shape: { q, a } — plain strings. `a` can also be a node if an answer ever
 * needs a link, since the component renders it as a child rather than as text.
 */

/* /products/e-learning */
export const eLearningFaqs = [
  {
    q: "Do we need our own cloud accounts to run the labs?",
    a: "No. Every lab provisions an isolated account of its own, torn down when the session ends. If you would rather run inside your own tenancy, we can do that too — it changes the setup, not the exercises.",
  },
  {
    q: "How long does an environment take to come up?",
    a: "Under ten seconds for most labs. Larger topologies — a multi-node cluster with a full network — take a little longer, and the console shows progress while it builds.",
  },
  {
    q: "What happens to a learner's work when the lab ends?",
    a: "The environment is destroyed, but the record is not. Every action is written to a completion record you can export, hand to an auditor, or feed into your own LMS.",
  },
  {
    q: "Can we bring our own content and exercises?",
    a: "Yes. Labs are defined as code, so an exercise your team already runs internally can be ported into the same environment and validation model as the rest of the catalogue.",
  },
  {
    q: "How is progress assessed?",
    a: "Checks run against the live environment rather than a quiz. If the learner hardened the cluster, the check finds it hardened — the work is the assessment.",
  },
  {
    q: "What scale do you support?",
    a: "From a single engineer to a cohort of several thousand running at once. Provisioning is per learner, so the number of people in a session does not change what any one of them gets.",
  },
  {
    q: "Which providers and technologies are covered?",
    a: "Eight domains across the 2026–27 catalogue: enterprise cloud, AI platforms, AI engineering, data, security, DevOps, enterprise applications and emerging tech.",
  },
  {
    q: "Do you deliver instructor-led sessions as well?",
    a: "We do. The labs work unattended, alongside a facilitator, or as the practical half of a cohort programme — the environment is the same in all three.",
  },
];

/* /products/enterprise-labs */
export const enterpriseLabsFaqs = [
  {
    q: "Do labs run in our cloud or yours?",
    a: "Either. We provision in Cloud4Green-managed accounts by default, which is the fastest route to a first cohort. Where policy requires it, labs run in your own subscription or organisation under your controls.",
  },
  {
    q: "What happens to the environments afterwards?",
    a: "They expire. Each environment has a lifetime set when the lab is built, and everything provisioned for it is destroyed at the end of that window — including anything a learner created inside it.",
  },
  {
    q: "How long does it take to launch?",
    a: "Three to five working days for a track assembled from the existing catalogue. Custom environments — your own images, datasets or reference architecture — take longer, and we'll say how much when we scope it.",
  },
  {
    q: "Can we bring our own content?",
    a: "Yes. Existing courseware, runbooks and internal architecture can be built into labs, so people practise on the way your organisation does it rather than a generic reference design.",
  },
  {
    q: "How is progress reported?",
    a: "Per learner and per cohort: tasks attempted, tasks validated, time in environment and spend. It exports, and it can be fed into the LMS you already run.",
  },
  {
    q: "What guardrails sit around a learner account?",
    a: "Scoped IAM, a spend cap and an expiry on every environment. An afternoon of training cannot turn into an incident or an invoice, and the limits are set per track rather than per request.",
  },
];
