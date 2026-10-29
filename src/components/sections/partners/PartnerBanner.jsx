import Container from "@/components/layout/Container";
import GoogleCloudMark from "@/components/brand/GoogleCloudMark";
import {
  SiKubernetes,
  SiTerraform,
  SiDocker,

  SiGithub,
} from "@icons-pack/react-simple-icons";

const partners = [
  {
    name: "AWS",
    render: () => <img src="/logos/aws.svg" alt="AWS" className="h-8 w-auto" />,
  },
  {
    name: "Microsoft Azure",
    render: () => <img src="/logos/azure.svg" alt="Microsoft Azure" className="h-8 w-auto" />,
  },
  {
    name: "Google Cloud",
    render: () => <GoogleCloudMark size={32} />,
  },
  {
    name: "Kubernetes",
    render: () => <SiKubernetes size={32} color="#326CE5" title="Kubernetes" />,
  },
  {
    name: "Terraform",
    render: () => <SiTerraform size={32} color="#844FBA" title="Terraform" />,
  },
  {
    name: "Docker",
    render: () => <SiDocker size={32} color="#2496ED" title="Docker" />,
  },

  {
    name: "GitHub",
    render: () => <SiGithub size={32} color="#181717" title="GitHub" />,
  },
];

// --- Overlay marquee -----------------------------------------------------
// Both variants run the same straight, constant-speed track (`.animate-marquee`
// in index.css: translateX(0 -> -50%) over a doubled list, so the seam never
// shows). This used to ride an arc over the map — logos projected onto a ring
// so they slowed and bunched at the edges — but a curve that isn't the map's
// own curve reads as a second, competing geometry laid over it. A flat line at
// one speed sits on the map instead of arguing with it.
//
// Edges are handled by a mask, not by the pair of gradient panels the default
// variant uses. Over the map there is nothing to hide behind an opaque strip —
// painting one only puts a pale band over the dot field, which is exactly what
// those panels were doing. A mask fades the logos themselves out and leaves the
// ground untouched.
//
// Where the strip sits vertically is not decided here: `.hero-partners` in
// index.css anchors it to a share of the map's own height, so the row rides the
// South America line rather than wherever the copy above it happens to end.
const MARQUEE_STYLES = `
.c4g-partner-track {
  -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%);
  mask-image: linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%);
}
@media (prefers-reduced-motion: reduce) {
  .c4g-partner-track .animate-marquee { animation-play-state: paused; }
}
`;

const PartnerBanner = ({ variant = "default", className = "" }) => {
  const isOverlay = variant === "overlay";

  return (
    <section
      className={`relative overflow-hidden ${
        isOverlay ? "py-4" : "border-y border-border/50 py-8"
      } ${className}`}
    >
      <Container>
        <div className="mb-6 text-center">
          <p
            className={`text-xs font-medium uppercase tracking-[0.18em] ${
              isOverlay ? "text-foreground/70" : "text-muted-foreground"
            }`}
          >
            Partnered with Industry Leaders
          </p>
        </div>
      </Container>

      {/* Fade edges — straight-marquee variant only.
       *
       * The overlay variant deliberately has none. A hard-edged strip of white
       * is the right answer here, where the marquee really does run off the side
       * of its box and needs hiding against the page ground; over the map the
       * same two panels painted pure white on a page whose background is an
       * off-white neutral, which is the pale vertical band that showed up down
       * both sides of the hero. The overlay masks its track instead. */}
      {!isOverlay && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        </>
      )}

      {isOverlay ? (
        <>
          <style>{MARQUEE_STYLES}</style>
          {/* h-20 is load-bearing: --hero-partners-lift in index.css measures
              from it to put the middle of this row on the map's South America
              line. Change one and change the other. */}
          <div className="c4g-partner-track mt-2 h-20 overflow-hidden">
            <div className="flex h-full w-max animate-marquee items-center">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  /* bg-background, not bg-white: the page ground is #fafaf7, so
                     a pure-white chip is a lighter patch sitting on it rather
                     than a hole punched through the map. Opaque enough to read
                     as that hole — at 75% the dot field showed through and the
                     plates disappeared into it. */
                  className="mx-8 flex h-10 min-w-[120px] items-center justify-center rounded-lg bg-background/90 px-4 backdrop-blur-sm"
                >
                  {partner.render()}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Infinite marquee */
        <div className="mt-16 flex w-max animate-marquee">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="mx-8 flex h-10 min-w-[120px] items-center justify-center"
            >
              {partner.render()}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PartnerBanner;
