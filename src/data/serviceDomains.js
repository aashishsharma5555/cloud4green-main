import img4 from "@/assets/images/ai-labs2.jpg"
import img4b from "@/assets/images/cloud-labs2.jpg";
import img1 from "@/assets/images/cloud-sandbox.webp"
import img1b from "@/assets/images/enterprise.jpg"
import img2 from "@/assets/images/ai-enterprise.webp"
import img2b from "@/assets/images/ai-background.jpg"
import img3 from "@/assets/images/Devops.webp"
import img3b from "@/assets/images/ai-b.jpg"
import img5 from "@/assets/images/cryptography.jpg"
import img5b from "@/assets/images/lightrays.jpg"
import img6 from "@/assets/images/data.jpg"
import img6b from "@/assets/images/gallerydigital.jpg"
import img7 from "@/assets/images/ai-claude.jpg"
import img7b from "@/assets/images/abstract.jpg"




import { Cloud,BrainCircuit ,Container , Layers ,ShieldCheck, ChartNoAxesCombined, Cpu } from "lucide-react";


export const serviceDomains = [
  {
    id: "enterprise-cloud",

    number: "01",

    title: "Enterprise Cloud",

    label: "CLOUD",

    description:
      "Design, modernize, and operate secure cloud environments built for enterprise scale, resilience, and performance.",

    primaryImage:
      img1,

    secondaryImage:
      img1b,
      icon: Cloud,
  },

  {
    id: "enterprise-ai",

    number: "02",

    title: "Enterprise AI",

    label: "AI",

    description:
      "Build practical AI capabilities across infrastructure, applications, and workflows that create measurable enterprise value.",

    primaryImage:
      img2,

    secondaryImage:
      img3b,
      icon: BrainCircuit,
  },

  {
    id: "devops",

    number: "03",

    title: "DevOps",

    label: "DEVOPS",

    description:
      "Accelerate software delivery through automation, CI/CD, infrastructure as code, observability, and reliable engineering practices.",

    primaryImage:
      img3,

    secondaryImage:
      img2b,
    icon: Container,
  },

  {
    id: "platform-engineering",

    number: "04",

    title: "Platform Engineering",

    label: "PLATFORM",

    description:
      "Create internal developer platforms that simplify infrastructure, standardize workflows, and help engineering teams ship faster.",

    primaryImage: img4,

    secondaryImage: img4b,
    icon: Layers,
  },

  {
    id: "cyber-security",

    number: "05",

    title: "Cyber Security",

    label: "CYBER SECURITY",

    description:
  "Strengthen your security posture with proactive threat protection, identity and access management, security monitoring, and resilient defense strategies.",

    primaryImage:
      img5,

    secondaryImage:
      img5b,
      icon: ShieldCheck,
  },

  {
    id: "data-analytics",

    number: "06",

    title: "Data & Analytics",

    label: "DATA",

    description:
      "Build modern data platforms that turn enterprise information into reliable insights and intelligent decision-making.",

    primaryImage:
      img6,

    secondaryImage:
      img6b,
      icon: ChartNoAxesCombined, 
  },
  {
  id: "ai-engineering",

  number: "06",

  title: "AI Engineering",

  label: "AI ENGINEERING",

  description:
    "Build and scale intelligent applications with AI engineering practices spanning generative AI, machine learning, AI infrastructure, and production-ready solutions.",

  primaryImage:
    img7,

  secondaryImage:
   img7b,
    icon: Cpu
},
];