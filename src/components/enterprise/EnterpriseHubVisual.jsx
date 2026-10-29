import { useId } from "react";

/**
 * EnterpriseHubVisual
 * ------------------------------------------------------------------
 * Hub-and-spoke "everything converges into one platform" animation.
 * Light theme, self-contained: no framer-motion, no lucide, no config.
 *
 * Usage:
 *   <EnterpriseHubVisual />                        // fallback mark in hub
 *   <EnterpriseHubVisual logoSrc="/logo.png" />    // your logo in a white
 *                                                  // chip at the center
 *
 * If you have a WHITE / monochrome version of your logo, you can also
 * delete the white chip below (see "HUB LOGO" comment) and drop the
 * <img> straight onto the blue circle, like the reference.
 *
 * Respects prefers-reduced-motion (dots hide, floating stops).
 */

const ACCENT = "#2f52ec";

/* ------------------------- inline icons ------------------------- */

const icon = {
  award: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="5.5" />
      <path d="M9 13.5 7.5 21l4.5-2.5L16.5 21 15 13.5" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 18.5a4.5 4.5 0 0 0 .42-8.98 6 6 0 0 0-11.7 1.62A3.75 3.75 0 0 0 7 18.5Z" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6.5C10.6 5 8.6 4.25 6.5 4.25c-1.2 0-2.4.25-3.5.75v13.5c1.1-.5 2.3-.75 3.5-.75 2.1 0 4.1.75 5.5 2.25 1.4-1.5 3.4-2.25 5.5-2.25 1.2 0 2.4.25 3.5.75V5c-1.1-.5-2.3-.75-3.5-.75-2.1 0-4.1.75-5.5 2.25Z" />
      <path d="M12 6.5V20" />
    </svg>
  ),
  chip: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="12" height="12" rx="2.5" />
      <rect x="10" y="10" width="4" height="4" rx="1" />
      <path d="M9 2.5v3.5M15 2.5v3.5M9 18v3.5M15 18v3.5M2.5 9h3.5M2.5 15h3.5M18 9h3.5M18 15h3.5" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 3.5v17h17" />
      <path d="M8 16.5v-5M12.5 16.5v-9M17 16.5V10" />
    </svg>
  ),
};

/* ---------------------- diagram definition ---------------------- */
/* Coordinate space is 640x640; positions are % of the square panel. */

const SATELLITES = [
  { label: "Certifications", icon: icon.award, x: "16.25%", y: "67.5%",  labelY: "56.6%", delay: "0s" },
  { label: "Cloud Labs",     icon: icon.cloud, x: "27.5%",  y: "41.25%", labelY: "30.3%", delay: "0.7s" },
  { label: "Enterprise LMS", icon: icon.book,  x: "50%",    y: "28.75%", labelY: "17.8%", delay: "1.4s" },
  { label: "AI Labs",        icon: icon.chip,  x: "72.5%",  y: "41.25%", labelY: "30.3%", delay: "2.1s" },
  { label: "Analytics",      icon: icon.chart, x: "83.75%", y: "67.5%",  labelY: "56.6%", delay: "2.8s" },
];

const WIRES = [
  { id: "left",  d: "M152,432 L246,432",         start: [152, 432], begin: "0s" },
  { id: "ul",    d: "M209,303 Q222,356 272,377", start: [209, 303], begin: "0.5s" },
  { id: "top",   d: "M320,236 L320,358",         start: [320, 236], begin: "1s" },
  { id: "ur",    d: "M431,303 Q418,356 368,377", start: [431, 303], begin: "1.5s" },
  { id: "right", d: "M488,432 L394,432",         start: [488, 432], begin: "2s" },
];

/* --------------------------- component -------------------------- */

export default function EnterpriseHubVisual({ logoSrc }) {
  // Unique ids so the component can safely appear more than once per page.
  const uid = useId().replace(/[^a-zA-Z0-9-]/g, "");
  const wid = (name) => `c4g-${uid}-${name}`;

  return (
    <div className="c4g-panel">
      <style>{`
        .c4g-panel {
          position: relative;
          width: 100%;
          max-width: 520px;
          aspect-ratio: 1 / 1;
          border-radius: 24px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          background: radial-gradient(circle at 50% 67%, rgba(174, 238, 224, 1) 0%, rgb(98 171 255) 100%);
          box-shadow: #d4d2d2 0px 20px 30px;
}
        }
        .c4g-wires {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .c4g-node {
          position: absolute;
          transform: translate(-50%, -50%);
          width: 13.75%;
          aspect-ratio: 1 / 1;
          border-radius: 9999px;
          background: #fff;
          border: 1px solid #e2e8f0;
          box-shadow: 0 12px 32px rgba(15,42,85,0.10), 0 2px 6px rgba(15,42,85,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f2a55;
          animation: c4g-float 5.5s ease-in-out infinite;
        }
        .c4g-node svg { width: 38%; height: 38%; }
        .c4g-hub {
          position: absolute;
          left: 50%;
          top: 67.5%;
          transform: translate(-50%, -50%);
          width: 17.5%;
          aspect-ratio: 1 / 1;
          border-radius: 9999px;
          background: linear-gradient(150deg, #2f52ec 0%, #1d38c9 100%);
          box-shadow: 0 18px 44px rgba(41,73,230,0.35), 0 4px 12px rgba(41,73,230,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          z-index: 2;
        }
        .c4g-hub > svg { width: 46%; height: 46%; }
        .c4g-hub-chip {
          width: 74%;
          aspect-ratio: 1 / 1;
          border-radius: 9999px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .c4g-hub-chip img { width: 68%; height: 68%; object-fit: contain; }
        .c4g-ring {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          border: 2px solid rgba(47,82,236,0.45);
          animation: c4g-ring 3s cubic-bezier(0.2,0.6,0.35,1) infinite;
        }
        .c4g-label {
          position: absolute;
          transform: translate(-50%, -50%);
          z-index: 3;
          white-space: nowrap;
          font-size: 13px;
          font-weight: 500;
          color: #334155;
          background: rgba(255,255,255,0.85);
          border: 1px solid #e2e8f0;
          border-radius: 9999px;
          padding: 5px 12px;
          box-shadow: 0 2px 8px rgba(15,42,85,0.06);
          backdrop-filter: blur(4px);
        }
        @media (max-width: 640px) {
          .c4g-label { font-size: 11px; padding: 4px 10px; }
        }
        @keyframes c4g-float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50%      { transform: translate(-50%, -50%) translateY(-6px); }
        }
        @keyframes c4g-ring {
          0%   { transform: scale(1); opacity: 0.7; }
          70%  { transform: scale(1.45); opacity: 0; }
          100% { transform: scale(1.45); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .c4g-node, .c4g-ring { animation: none; }
          .c4g-dots { visibility: hidden; }
        }
      `}</style>

      {/* connectors + traveling dots */}
      <svg className="c4g-wires" viewBox="0 0 640 640" fill="none" aria-hidden="true">
        <defs>
          <marker
            id={wid("arrow")}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill={ACCENT} opacity="0.55" />
          </marker>
        </defs>

        <g stroke="black" strokeWidth="1.6" strokeDasharray="1 8" strokeLinecap="round">
          {WIRES.map((w) => (
            <path key={w.id} id={wid(w.id)} d={w.d} markerEnd={`url(#${wid("arrow")})`} />
          ))}
        </g>

        {/* small ring where each wire leaves its node */}
        <g fill="#ffffff" stroke="rgba(47,82,236,0.4)" strokeWidth="1.5">
          {WIRES.map((w) => (
            <circle key={w.id} cx={w.start[0]} cy={w.start[1]} r="5" />
          ))}
        </g>

        {/* dots flowing toward the hub */}
        <g className="c4g-dots">
          {WIRES.map((w) => (
            <circle key={w.id} r="4.5" fill={ACCENT} stroke="#fff" strokeWidth="1.5">
              <animateMotion dur="2.6s" begin={w.begin} repeatCount="indefinite">
                <mpath href={`#${wid(w.id)}`} />
              </animateMotion>
            </circle>
          ))}
        </g>
      </svg>

      {/* satellite nodes */}
      {SATELLITES.map((s) => (
        <div key={s.label} className="c4g-node" style={{ left: s.x, top: s.y, animationDelay: s.delay }}>
          {s.icon}
        </div>
      ))}

      {/* hub */}
      <div className="c4g-hub">
        <span className="c4g-ring" />
        <span className="c4g-ring" style={{ animationDelay: "1.5s" }} />

        {/* ---------------- HUB LOGO ----------------
            Pass logoSrc="/your-logo.png" for the white-chip style, or
            replace the fallback SVG below with a white/monochrome mark
            rendered directly on the blue circle. */}
        {logoSrc ? (
          <span className="c4g-hub-chip">
            <img src={logoSrc} alt="Cloud4Green" />
          </span>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19a4.5 4.5 0 0 0 .42-8.98 6 6 0 0 0-11.7 1.62A3.75 3.75 0 0 0 7 19Z" />
            <path d="m10.2 14.5 1.6 1.6 3-3.4" />
          </svg>
        )}
      </div>

      {/* labels */}
      {SATELLITES.map((s) => (
        <div key={s.label} className="c4g-label" style={{ left: s.x, top: s.labelY }}>
          {s.label}
        </div>
      ))}
    </div>
  );
}