

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CATALOGUE } from "@/config/downloads";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import PartnerBanner from "../sections/partners/PartnerBanner";

const HeroContent = () => {
  const words = ["AI", "Cloud"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (<>
    <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center lg:items-start lg:text-left">

      {/* Eyebrow */}
      <span className="inline-flex items-center rounded-full border border-border bg-white px-4 py-2 text-sm font-medium">
        Enterprise Cloud Platform
      </span>

      {/* Heading */}
      <h1 className="mt-8 text-4xl font-heading font-semibold  leading-[1.05] tracking-tight lg:text-6xl">

        {/* Enterprise{" "} */}
        Building hands-on Lab solutions 

        {/* AI / Cloud animation
        <span className="relative inline-grid align-baseline">

          {words.map((w) => (
            <span
              key={w}
              aria-hidden="true"
              className="col-start-1 row-start-1 invisible"
            >
              {w}
            </span>
          ))}

          <span className="col-start-1 row-start-1">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{
                  opacity: 0,
                  y: 20,
                  filter: "blur(4px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                  filter: "blur(4px)",
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0 inline-block"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </span>

        </span> */}

        <br />

        <span className="text-blue-950">
         for enterprise learning.
        </span>

      </h1>

      {/* Description */}
      <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground font-body">
        {/* Empower your teams with hands-on Cloud and AI Labs, enterprise LMS,
        certification programs, and real-world learning environments designed
        to build cloud-ready and AI-ready professionals. */}
        One platform to demo, train and certify users on your software
         Empower your teams with hands-on Cloud and AI Labs, enterprise LMS,
        certification programs, and real-world learning environments designed
        to build cloud-ready and AI-ready professionals. 
      </p>

      {/* Buttons */}
      <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">

        <Button variant="ink" arrow render={<Link to="/contact" />}>
          Book a demo
        </Button>

        <Button variant="paper" arrow render={<a href={CATALOGUE.href} download={CATALOGUE.filename} />}>
          Download Brochure
        </Button>

      </div>
      {/* <PartnerBanner/> */}

    </div>
    </>
  );
};

export default HeroContent;