import { useId } from "react";

// The official four-segment Google Cloud geometry, coloured to match the current
// gradient mark: red at the top-left, sweeping through yellow across the top,
// down the right in green, and back up the left in blue. Google doesn't publish
// the gradient version as an SVG, so the sweep is reproduced with one linear
// gradient per segment — adjacent segments meet on a shared colour, so the seams
// between them read as a continuous blend rather than as four flat wedges.
const GoogleCloudMark = ({ className, size, title = "Google Cloud" }) => {
  // Gradient ids have to be unique per instance: the partner banner renders its
  // list twice, and duplicate ids would leave every later copy resolving
  // url(#...) against the first copy's defs. useId can emit ":" and other
  // characters that are unsafe in a fragment reference, hence the strip.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const topId = `gcp-top-${uid}`;
  const rightId = `gcp-right-${uid}`;
  const bottomId = `gcp-bottom-${uid}`;

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      width={size}
      height={size}
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id={topId} gradientUnits="userSpaceOnUse" x1="8" y1="15" x2="49" y2="15">
          <stop offset="0%" stopColor="#EA4335" />
          <stop offset="55%" stopColor="#F79A1E" />
          <stop offset="100%" stopColor="#FBBC05" />
        </linearGradient>
        <linearGradient id={rightId} gradientUnits="userSpaceOnUse" x1="52" y1="13" x2="40" y2="56">
          <stop offset="0%" stopColor="#FBBC05" />
          <stop offset="50%" stopColor="#84B740" />
          <stop offset="100%" stopColor="#34A853" />
        </linearGradient>
        <linearGradient id={bottomId} gradientUnits="userSpaceOnUse" x1="7" y1="52" x2="33" y2="52">
          <stop offset="0%" stopColor="#4285F4" />
          <stop offset="100%" stopColor="#34A853" />
        </linearGradient>
      </defs>

      <path
        fill={`url(#${topId})`}
        d="M40.728 20.488l2.05.035 5.57-5.57.27-2.36C44.2 8.657 38.367 6.26 31.993 6.26c-11.54 0-21.28 7.852-24.163 18.488.608-.424 1.908-.106 1.908-.106l11.13-1.83s.572-.947.862-.9A13.88 13.88 0 0 1 32 17.375c3.3.007 6.34 1.173 8.728 3.102z"
      />
      <path
        fill={`url(#${rightId})`}
        d="M56.17 24.77c-1.293-4.77-3.958-8.982-7.555-12.177l-7.887 7.887c3.16 2.55 5.187 6.452 5.187 10.82v1.392c3.837 0 6.954 3.124 6.954 6.954 0 3.837-3.124 6.954-6.954 6.954H32.007L30.615 48v8.346l1.392 1.385h13.908A18.11 18.11 0 0 0 64 39.647c-.007-6.155-3.1-11.6-7.83-14.876z"
      />
      <path
        fill={`url(#${bottomId})`}
        d="M18.085 57.74h13.9V46.6h-13.9a6.89 6.89 0 0 1-2.862-.622l-2.007.615-5.57 5.57-.488 1.88a18 18 0 0 0 10.926 3.689z"
      />
      <path
        fill="#4285F4"
        d="M18.085 21.57A18.11 18.11 0 0 0 0 39.654c0 5.873 2.813 11.095 7.166 14.403l8.064-8.064a6.96 6.96 0 0 1-4.099-6.339c0-3.837 3.124-6.954 6.954-6.954 2.82 0 5.244 1.7 6.34 4.1l8.064-8.064c-3.307-4.353-8.53-7.166-14.403-7.166z"
      />
    </svg>
  );
};

export default GoogleCloudMark;
