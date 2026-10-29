import customerStories from '@/assets/images/handshake.jpg'
import update from '@/assets/images/big.png'

export const navigation = [
  { label: "Home", href: "/" },
  {
  label: "Products",

  href: "/products",

  mega: {
    categories: [
      {
        id: "featured",

        label: "Featured Products",

        title: "Featured Products",

        subtitle:
          "Explore Cloud4Green's learning and development solutions for organizations and individuals.",

        browseHref: "/products",

        items: [
          {
            title: "Enterprise Labs",
            description:
              "Hands-on cloud and AI environments designed for enterprise teams and real-world learning.",
            href: "/products/enterprise-labs",
          },

          {
            title: "E-Learning",
            description:
              "Flexible digital learning experiences that help teams build skills anytime, anywhere.",
            href: "/products/e-learning",
          },

          {
            title: "Certifications",
            description:
              "Industry-aligned certification programs that validate skills and accelerate career growth.",
            href: "/products/certifications",
          },

          {
            title: "Enterprise Trainings",
            description:
              "Customized training programs that equip teams with the skills needed for today's technology landscape.",
            href: "/products/enterprise-training",
          },

          // {
          //   title: "Individual Trainings",
          //   description:
          //     "Practical learning programs designed to help individuals develop in-demand cloud and AI skills.",
          //   href: "/products/individual-training",
          // },
        ],

        promos: [
          {
            title: "What's new",
            description:
              "ReyvanX zero trust access, new labs and the latest releases.",
            href: "/whats-new",
            image: update,
          },

          {
            title: "Customer stories",
            description:
              "See how organizations build skills and accelerate learning with Cloud4Green.",
            href: "/customers",
            image: customerStories,
          },
        ],
      },
    ],
  },
},
  {
  label: "Services",

  href: "/services",

  mega: {
    categories: [
      {
        id: "services",

        label: "Our Services",

        title: "Our Services",

        subtitle:
          "Expert services that help organizations modernize, automate and grow with the cloud.",

        browseHref: "/services",

        items: [
          {
            title: "Automation",
            description:
              "Streamline operations with cloud and AI-driven automation that reduces manual effort and cost.",
            href: "/services/automation",
          },

          {
            title: "Consulting",
            description:
              "Strategic guidance from cloud experts to plan, migrate and optimize your technology landscape.",
            href: "/services/consulting",
          },
        ],

        promos: [
          {
            title: "Customer stories",
            description:
              "See how organizations transform their operations with Cloud4Green.",
            href: "/customers",
            image: customerStories,
          },
        ],
      },
    ],
  },
},
  { label: "Customer stories", href: "/customers" },
];