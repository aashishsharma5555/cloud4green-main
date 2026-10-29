export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">

      {/* Base */}
      <div className="absolute inset-0 bg-[#F8F9FB]" />

      {/* Top Left Blob */}
      <div
        className="
          absolute
          -left-72
          -top-48
          h-[700px]
          w-[700px]
          rounded-full
          bg-[#1E5EFF]/35
          blur-[170px]
        "
      />

      {/* Center Glow */}
      <div
        className="
          absolute
          left-[20%]
          top-[15%]
          h-[520px]
          w-[520px]
          rounded-full
          bg-sky-300/30
          blur-[180px]
        "
      />

      {/* Bottom Right Blob */}
      <div
        className="
          absolute
          -right-56
          bottom-[-180px]
          h-[760px]
          w-[760px]
          rounded-full
          bg-[#2563EB]/30
          blur-[190px]
        "
      />

      {/* Cyan Glow */}
      <div
        className="
          absolute
          right-[5%]
          bottom-[10%]
          h-[360px]
          w-[360px]
          rounded-full
          bg-cyan-300/45
          blur-[120px]
        "
      />

      {/* SVG Ribbon */}
      <svg
        className="absolute inset-0 h-full w-full opacity-95"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="blurHeavy">
            <feGaussianBlur stdDeviation="55" />
          </filter>

          <filter id="blurSoft">
            <feGaussianBlur stdDeviation="30" />
          </filter>

          <linearGradient
            id="blueRibbon"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#1547C7" />
            <stop offset="40%" stopColor="#2E6BFF" />
            <stop offset="75%" stopColor="#19D4FF" />
            <stop offset="100%" stopColor="#7CEBF8" />
          </linearGradient>
        </defs>

        <path
          d="M -200 420
             C 250 250 500 640 820 460
             S 1300 240 1800 420"
          stroke="url(#blueRibbon)"
          strokeWidth="250"
          fill="none"
          strokeLinecap="round"
          filter="url(#blurHeavy)"
          opacity=".70"
        />

        <path
          d="M -200 450
             C 260 260 520 640 820 470
             S 1300 250 1800 430"
          stroke="#19D4FF"
          strokeWidth="70"
          fill="none"
          strokeLinecap="round"
          filter="url(#blurSoft)"
          opacity=".9"
        />
      </svg>
    </div>
  );
}