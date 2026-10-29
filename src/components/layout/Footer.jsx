

// // background: linear-gradient(90deg,rgba(0, 8, 66, 1) 0%, rgba(8, 11, 32, 1) 7%, rgba(8, 11, 32, 1) 93%, rgba(0, 8, 66, 1) 100%);

import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import { ArrowUpRight } from "lucide-react";
import Logo from "./navbar/Logo";

const EMAIL = "reach@cloud4green.com";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard
      ?.writeText(EMAIL)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  }

  return (
    <footer className="relative w-full overflow-hidden rounded-t-[50px] bg-black text-white">

      <Container>
        <div className="relative z-10 flex min-h-[80vh] flex-col justify-between py-20 lg:py-24">

          {/* =========================
              TOP — BRAND
          ========================== */}
          <div>
            <div className="max-w-3xl">

              <Logo placement="footer" />

              <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-white/50">
                Cloud4Green
              </p>

              <h2 className="font-heading text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Building cloud-ready
                <br />
                <span className="text-white/40">
                  teams for the future.
                </span>
              </h2>

              <p className="mt-8 max-w-xl text-base leading-7 text-white/50">
                Hands-on Cloud and AI Labs, enterprise learning platforms,
                and certification programs designed to turn learning into
                real-world capability.
              </p>

            </div>
          </div>


          {/* =========================
              MIDDLE — NAVIGATION
          ========================== */}
          <div className="mt-24 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-white/10 pt-12 sm:grid-cols-4 sm:gap-12">

            {/* Platform */}
            <div>
              <p className="mb-5 text-sm font-medium text-white/40">
                Platform
              </p>

              <div className="flex flex-col gap-3 text-sm">

                <Link
                  to="/products/enterprise-labs"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Cloud & AI Labs
                </Link>

                <Link
                  to="/products/e-learning"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  E-Learning
                </Link>

                <Link
                  to="/enterprise"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Enterprise LMS
                </Link>

                <Link
                  to="/products/certifications"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Certifications
                </Link>

              </div>
            </div>


            {/* Solutions */}
            <div>
              <p className="mb-5 text-sm font-medium text-white/40">
                Solutions
              </p>

              <div className="flex flex-col gap-3 text-sm">

                <Link
                  to="/products/enterprise-training"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Enterprise Learning
                </Link>

                <Link
                  to="/products/enterprise-training#skills-catalog"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Cloud Training
                </Link>

                <Link
                  to="/products/enterprise-labs#catalogue"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  AI Training
                </Link>

                <Link
                  to="/products/enterprise-labs#how-it-works"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Hands-On Labs
                </Link>

              </div>
            </div>


            {/* Company */}
            <div>
              <p className="mb-5 text-sm font-medium text-white/40">
                Company
              </p>

              <div className="flex flex-col gap-3 text-sm">

                <Link
                  to="/about"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Contact
                </Link>

              </div>
            </div>


            {/* Connect */}
            <div>
              <p className="mb-5 text-sm font-medium text-white/40">
                Connect
              </p>

              <div className="flex flex-col gap-3 text-sm">

                <a
                  href="https://www.linkedin.com/company/cloud4green-technologies/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1 text-white/70 transition-colors hover:text-white"
                >
                  LinkedIn

                  <ArrowUpRight
                    className="
                      h-3.5
                      w-3.5
                      opacity-50
                      transition-transform
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                    "
                  />
                </a>

                {/* mailto does nothing on machines with no default mail
                    app (common on Windows / webmail users), so the click
                    also copies the address and says so. */}
                <a
                  href={`mailto:${EMAIL}`}
                  onClick={copyEmail}
                  className="group flex items-center gap-1 text-white/70 transition-colors hover:text-white"
                >
                  {/* Wider than a phone's half-column, so it may wrap. */}
                  <span className="min-w-0 [overflow-wrap:anywhere]">
                    {copied ? "Copied to clipboard" : EMAIL}
                  </span>

                  <ArrowUpRight
                    className="
                      h-3.5
                      w-3.5
                      shrink-0
                      opacity-50
                      transition-transform
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                    "
                  />
                </a>

              </div>
            </div>

          </div>


          {/* =========================
              BOTTOM
          ========================== */}
          <div className="mt-16 flex flex-col items-start gap-4 pt-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">

            <p className="-ml-3 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-md">
              © 2026 Cloud4Green. All rights reserved.
            </p>

            <div className="-ml-3 flex gap-6 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-md sm:-mr-3 sm:ml-0">

              <Link
                to="/privacy"
                className="transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="transition-colors hover:text-white"
              >
                Terms of Service
              </Link>

            </div>

          </div>

        </div>
      </Container>


      {/* =========================
          GIANT CLOUD4GREEN WORDMARK
      ========================== */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-2rem]
          left-1/2
          z-0
          -translate-x-1/2
          select-none
          whitespace-nowrap
          font-heading
          text-[clamp(5rem,12vw,15rem)]
          font-semibold
          leading-none
          tracking-[-0.04em]
          text-white/[0.06]
        "
      >
        CLOUD4GREEN
      </div>

    </footer>
  );
}