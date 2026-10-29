

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CATALOGUE } from "@/config/downloads";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import PartnerBanner from "../sections/partners/PartnerBanner";

const HeroContent2 = () => {
  const words = ["AI", "Cloud"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (<>
    <div className="
    relative
    z-10
    mx-auto
    flex
    w-full
    max-w-2xl
    flex-col
    items-center
    justify-center
    text-center
  ">

      {/* Eyebrow */}
      {/* <span className="inline-flex items-center rounded-full border border-border bg-white px-4 py-2 text-sm font-medium">
        Enterprise Cloud Platform
      </span> */}

      {/* Heading */}
      <h1 className="mt-8 text-4xl font-recoleta font-bold  leading-[1.05] tracking-wide lg:text-5xl">

        {/* Enterprise{" "} */}
        Building
         hands-on Lab solutions 

        

        <br />

        <span className="text-blue-950">
         for enterprise learning.
        </span>

      </h1>

      {/* Description */}
      <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground font-body bg-white/20 backdrop-blur-md">
        {/* Empower your teams with hands-on Cloud and AI Labs, enterprise LMS,
        certification programs, and real-world learning environments designed
        to build cloud-ready and AI-ready professionals. */}
        One platform to demo, train and certify users on your software!
      </p>

      {/* Buttons */}
      <div className="mt-10 flex flex-wrap justify-center gap-4">

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

export default HeroContent2;