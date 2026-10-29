import { AppWindow, ShieldCheck, UserRound } from "lucide-react";

// What's new — the /whats-new page reads everything from here.
//
// The ReyvanX copy follows the homepage product row (OurProducts.jsx). The
// changelog entries below it are placeholders — swap in real release notes
// and dates as they ship. Newest first; the page groups them by month.

export const reyvanx = {
  name: "ReyvanX",
  title: "Zero Trust Network Access with ReyvanX",
  shortText: "Replace VPN with identity-aware access to private applications.",
  description:
    "ReyvanX verifies every connection by identity, device and policy — while keeping your applications invisible to the network.",

  // Shape ZtnaFlow expects: three nodes, the broker in the middle.
  flow: [
    { label: "Verified user", icon: UserRound },
    { label: "ReyvanX broker", icon: ShieldCheck, primary: true },
    { label: "Private app", icon: AppWindow },
  ],
  tags: ["Identity-aware access", "No inbound ports", "Least privilege"],
  steps: [
    { title: "Identity and device verified" },
    { title: "Policy evaluated", note: "— app stays dark" },
    { title: "Connected", note: "— to this one app" },
  ],

  // How a request moves through ReyvanX, spelled out for the spotlight.
  how: [
    {
      title: "Verify",
      text: "Every request starts with who the user is and what device they're on — checked each time, not once at login.",
    },
    {
      title: "Decide",
      text: "The ReyvanX broker evaluates policy before anything reaches the app. Until it says yes, the app stays dark.",
    },
    {
      title: "Connect",
      text: "The user is connected to the one application they're allowed — never dropped onto the network.",
    },
  ],

  // The VPN comparison: same rows, two answers.
  compare: [
    { topic: "What you get", vpn: "A place on the network", zt: "Access to one app" },
    { topic: "Exposure", vpn: "Inbound ports open to the internet", zt: "No inbound ports" },
    { topic: "Scope", vpn: "Broad access once connected", zt: "Least privilege, per app" },
    { topic: "Visibility", vpn: "Apps discoverable on the network", zt: "Apps invisible until allowed" },
  ],
};

export const CATEGORIES = ["All", "Launch", "Labs", "Platform", "Training"];

export const updates = [
  {
    id: "reyvanx-launch",
    date: "2026-09-22",
    category: "Launch",
    title: "Introducing ReyvanX — Zero Trust Network Access",
    body: "Identity-aware access to private applications, with no VPN and no inbound ports. Every connection is verified by identity, device and policy.",
    href: "#reyvanx",
    cta: "See how it works",
  },
  {
    id: "genai-labs",
    date: "2026-09-08",
    category: "Labs",
    title: "New GenAI lab track",
    body: "Guided builds for retrieval, evaluation and agent patterns, on pre-provisioned model access with spend limits built in.",
    href: "/products/enterprise-labs",
    cta: "Explore Enterprise Labs",
  },
  {
    id: "lms-reporting",
    date: "2026-08-19",
    category: "Platform",
    title: "Department-level reporting in the LMS",
    body: "Completion, progress and compliance views by team, exportable in one click for audits and quarterly reviews.",
    href: "/products/e-learning",
    cta: "Explore E-Learning",
  },
  {
    id: "kubernetes-labs",
    date: "2026-08-04",
    category: "Labs",
    title: "Kubernetes production-readiness labs",
    body: "Ingress, disruption budgets, node drains and namespace quotas — validated against a live cluster as learners work.",
    href: "/products/enterprise-labs",
    cta: "Explore Enterprise Labs",
  },
  {
    id: "azure-tracks",
    date: "2026-07-15",
    category: "Training",
    title: "Refreshed Azure certification tracks",
    body: "AZ-900, AZ-104 and AZ-305 tracks updated to the latest exam outlines, with new practice labs and mock exams.",
    href: "/products/certifications",
    cta: "Explore Certifications",
  },
  {
    id: "lab-guardrails",
    date: "2026-07-01",
    category: "Platform",
    title: "Budget caps and auto-expiry on every lab account",
    body: "Each lab environment now ships with a spend ceiling and a time limit, so nothing is left running after a session ends.",
    href: "/products/enterprise-labs",
    cta: "Explore Enterprise Labs",
  },
  {
    id: "blended-programmes",
    date: "2026-06-10",
    category: "Training",
    title: "Blended corporate training programmes",
    body: "Instructor-led workshops combined with self-paced labs, with a shared baseline and role-specific electives.",
    href: "/products/enterprise-training",
    cta: "Explore Enterprise Training",
  },
];
