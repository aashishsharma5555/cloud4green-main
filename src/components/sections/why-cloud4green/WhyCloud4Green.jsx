// import Container from "@/components/layout/Container";
// import Section from "@/components/layout/Section";

// import FeatureCard from "./FeatureCard";

// import { features } from "@/data/why-cloud4green";

// export default function WhyCloud4Green() {
//   return (
//     <Section>
//       <Container>
//         <div className="max-w-3xl">
//           <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
//             Why Cloud4Green
//           </span>

//           <h2 className="mt-4 text-4xl font-bold lg:text-5xl">
//             Built for modern enterprise learning.
//           </h2>

//           <p className="mt-6 text-lg leading-8 text-muted-foreground">
//             We combine enterprise learning, hands-on labs, cloud expertise,
//             and industry certifications into one unified platform that helps
//             organizations upskill faster.
//           </p>
//         </div>

//         <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//           {features.map((feature) => (
//             <FeatureCard
//               key={feature.title}
//               {...feature}
//             />
//           ))}
//         </div>
//       </Container>
//     </Section>
//   );
// }

import { useEffect, useRef, useState } from "react";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import FeatureCard from "./FeatureCard";
import { features } from "@/data/why-cloud4green";

export default function WhyCloud4Green() {
  const [activeFeature, setActiveFeature] = useState(0);
  const featureRefs = useRef([]);

  useEffect(() => {
    const observers = [];

    featureRefs.current.forEach((element, index) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveFeature(index);
          }
        },
        {
          threshold: 0.5,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <Section>
      <Container>

        {/* SECTION HEADING / STICKY LEFT + SCROLLING RIGHT */}
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">

          {/* LEFT SIDE */}
          <div className="lg:sticky lg:top-90 lg:h-fit lg:self-start">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Why Cloud4Green
            </span>

            <h2 className="mt-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Built for modern enterprise learning.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              We combine enterprise learning, hands-on labs, cloud expertise,
              and industry certifications into one unified platform that helps
              organizations upskill faster.
            </p>
          </div>


          {/* RIGHT SIDE */}
          <div className="relative">

            {/* Sticky feature window */}
            <div className="sticky top-50 z-10 h-[600px]">

              <div className="relative h-full overflow-hidden rounded-3xl">

                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      index === activeFeature
                        ? "translate-y-0 opacity-100"
                        : index < activeFeature
                          ? "-translate-y-full opacity-0"
                          : "translate-y-full opacity-0"
                    }`}
                  >
                    <FeatureCard
                      {...feature}
                      index={index}
                    />
                  </div>
                ))}

              </div>
            </div>


            {/* SCROLL TRIGGERS */}
            <div className="relative">

              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  ref={(element) => {
                    featureRefs.current[index] = element;
                  }}
                  className="h-[80vh]"
                />
              ))}

            </div>

          </div>

        </div>

      </Container>
    </Section>
  );
}