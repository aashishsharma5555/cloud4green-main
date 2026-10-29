import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import "@/styles/org-banner.css";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { LINE_STAGGER } from "@/components/motion/reveal-tokens";

// Lit office tower at night — reads as "organization" without competing with
// the copy. It's tinted brand-blue in CSS, so any dark, busy photo works here.
import bannerBg from "@/assets/images/enterprise.jpg";

export default function OrgBanner() {
  return (
    /* id: the product bar's "For teams" anchor — see src/config/productNav.js */
    <section id="organizations" className="ob" aria-labelledby="ob-title">
      {/* The image is passed as a CSS variable so the stylesheet can layer it
          under the blue tint; Vite still fingerprints it via the import. */}
      {/* Timed like the homepage CTA card: the blade rises, its copy follows
          one line-beat later. */}
      <RevealGroup
        rise
        delay={LINE_STAGGER}
        className="ob-blade"
        style={{ "--ob-img": `url(${bannerBg})` }}
      >
        <div className="ob-content">
          <RevealItem as="p" className="ob-eyebrow">For Organizations</RevealItem>

          {/* <h3 id="ob-title">
            Transform Your <span className="ob-highlight">Organization</span>
          </h3>

          <p className="ob-lead">
            No business wants to be left behind. With technology and business
            advancements moving at lightning-fast speeds, keeping your team's skills
            top-notch can be challenging. We understand this struggle and have been
            helping organizations navigate this for over 40 years.
          </p>
          <p className="ob-lead">
            Our team of experts will help guide you and your organization to the
            cutting edge IT and Technology training solutions you need to elevate
            your team.
          </p> */}

          <RevealItem as="h3" id="ob-title">
  Build a <span className="ob-highlight">Future-Ready Workforce</span>
</RevealItem>

<RevealItem as="p" className="ob-lead">
  Technology evolves fast. Your team's skills should too.
  Equip your workforce with the knowledge and practical
  expertise to stay ahead in a rapidly changing world.
</RevealItem>

<RevealItem as="p" className="ob-lead">
  From cloud and AI to emerging technologies, we deliver
  tailored training solutions that help your teams build
  skills, drive innovation, and achieve business goals.
</RevealItem>

          <RevealItem className="ob-cta">
            <Button variant="ink" arrow render={<Link to="/contact" />}>
              Talk to our experts
            </Button>
          </RevealItem>
        </div>
      </RevealGroup>
    </section>
  );
}
