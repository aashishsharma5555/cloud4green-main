

// import { useEffect, useId, useRef } from "react";

// /*
//   Silk background whose folds actually undulate.

//   v1 moved whole layers (translate/rotate), which read as "a picture sliding
//   around" — and rotating a layer swung its corner into view top-right.
//   Here nothing is transformed. Each fold is a list of points; every frame we
//   push each point up/down with sine waves and redraw the curve through them.

//   The trick for a *natural* wave: the sine's phase depends on x
//   (sin(time − x·k)). A point on the left reaches its peak a moment before a
//   point on the right, so the bulge travels along the fold like a ripple
//   through cloth, instead of the whole line bobbing up and down in sync.
// */

// // [x, y, amp] — the curve passes through (x, y); amp is how far that point
// // may swell. Small amps near the edges keep the ends calm, bigger in the
// // middle where fabric would move most. Ends sit well outside the 1600×1000
// // viewBox so no line ending is ever on screen.
// const FOLDS = {
//   main: [[-250, 590, 20], [250, 700, 34], [650, 670, 40], [1000, 440, 38], [1320, 170, 30], [1850, 20, 18]],
//   left: [[10, -120, 8], [60, 300, 20], [200, 560, 28], [500, 705, 20], [760, 725, 10]],
//   lower: [[-250, 910, 14], [350, 885, 26], [850, 780, 34], [1250, 705, 30], [1850, 880, 18]],
// };
// // Different speeds per fold so they never move in lockstep.
// // const SPEED = { main: 1, left: 0.8, lower: 0.65 };
// const SPEED = { main: 2.5, left: 2, lower: 2 };

// function wavePoints(pts, t, speed) {
//   const w = t * speed;
//   return pts.map(([x, y, a], i) => {
//     const k = x / 1600; // 0 → 1 across the width
//     const swell =
//       Math.sin(w * 0.55 - k * 5.2 + i * 0.3) + // long, slow swell that travels right
//       0.35 * Math.sin(w * 0.9 - k * 9 + 1.7);  // smaller ripple riding on top
//     // x breathes a little as well, so the fold stretches and relaxes
//     return [x + a * 0.35 * Math.cos(w * 0.4 - k * 4), y + a * swell];
//   });
// }

// // Catmull-Rom → cubic Bézier: a smooth curve through every point.
// // dy draws the same curve shifted, for the shadow and highlight strokes.
// function smoothPath(p, dy = 0) {
//   const f = (n) => n.toFixed(1);
//   let d = `M${f(p[0][0])} ${f(p[0][1] + dy)}`;
//   for (let i = 0; i < p.length - 1; i++) {
//     const p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
//     d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6 + dy)},` +
//          `${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6 + dy)},` +
//          `${f(p2[0])} ${f(p2[1] + dy)}`;
//   }
//   return d;
// }
// const closeDown = (d) => `${d} L1900 1300 L-300 1300 Z`;
// const closeLeft = (d) => `${d} L760 1300 L-300 1300 L-300 -120 Z`;

// // Every path's "d" for time t (seconds).
// function frame(t) {
//   const m = wavePoints(FOLDS.main, t, SPEED.main);
//   const l = wavePoints(FOLDS.left, t, SPEED.left);
//   const b = wavePoints(FOLDS.lower, t, SPEED.lower);
//   const main = smoothPath(m), left = smoothPath(l), lower = smoothPath(b);
//   return {
//     leftFill: closeLeft(left), leftGlow: left, leftEdge: left,
//     mainFill: closeDown(main), mainShadow: smoothPath(m, 30),
//     mainSheen: main, mainHighlight: smoothPath(m, -12),
//     lowerFill: closeDown(lower), lowerSheen: lower,
//   };
// }

// export default function SilkWaves({ className = "" }) {
//   const id = "silk" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
//   const u = (name) => `url(#${id}${name})`;
//   const svgRef = useRef(null);

//   useEffect(() => {
//     const svg = svgRef.current;
//     const paths = [...svg.querySelectorAll("[data-k]")];
//     const draw = (t) => {
//       const d = frame(t);
//       for (const p of paths) p.setAttribute("d", d[p.dataset.k]);
//     };

//     draw(0);
//     if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

//     // Only animate while the section is on screen, and cap at ~30fps:
//     // the motion is slow enough that 60fps looks identical and the blurs
//     // cost half as much.
//     let raf = 0, visible = false, last = 0;
//     const start = performance.now();
//     const loop = (now) => {
//       raf = requestAnimationFrame(loop);
//       if (now - last < 33) return;
//       last = now;
//       draw((now - start) / 1000);
//     };
//     const io = new IntersectionObserver(([entry]) => {
//       visible = entry.isIntersecting;
//       cancelAnimationFrame(raf);
//       if (visible) raf = requestAnimationFrame(loop);
//     });
//     io.observe(svg);
//     return () => { io.disconnect(); cancelAnimationFrame(raf); };
//   }, []);

//   // Filter regions are fixed to a box much larger than the canvas
//   // (userSpaceOnUse). The default region is a % of each shape's own bounding
//   // box, and a blur cut off by that box shows up as a hard straight edge.
//   const region = { filterUnits: "userSpaceOnUse", x: -400, y: -400, width: 2400, height: 1800 };

//   return (
//     <svg
//       ref={svgRef}
//       aria-hidden="true"
//       viewBox="0 0 1600 1000"
//       preserveAspectRatio="xMidYMid slice"
//       className={`absolute inset-0 -z-10 h-full w-full bg-[#eef3fd] ${className}`}
//     >
//       <defs>
//         <radialGradient id={`${id}white`} cx="30%" cy="30%" r="45%">
//           <stop offset="0" stopColor="#fff" />
//           <stop offset="1" stopColor="#fff" stopOpacity="0" />
//         </radialGradient>
//         <radialGradient id={`${id}cyan`} cx="72%" cy="0%" r="30%">
//           <stop offset="0" stopColor="#d5f6fb" />
//           <stop offset="1" stopColor="#d5f6fb" stopOpacity="0" />
//         </radialGradient>
//         <radialGradient id={`${id}blue`} cx="80%" cy="55%" r="40%">
//           <stop offset="0" stopColor="#c3d5fb" />
//           <stop offset="1" stopColor="#c3d5fb" stopOpacity="0" />
//         </radialGradient>
//         <linearGradient id={`${id}band`} x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0" stopColor="#c6d3fa" />
//           <stop offset=".35" stopColor="#e3eafc" />
//           <stop offset="1" stopColor="#f4f7fe" />
//         </linearGradient>
//         {/* Fixed to the canvas so the colours stay put while the fold moves
//             through them — that's what makes the sheen shimmer. */}
//         <linearGradient id={`${id}sheen`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1600" y2="0">
//           <stop offset="0" stopColor="#e9d9fb" />
//           <stop offset=".3" stopColor="#b7c3f6" />
//           <stop offset=".55" stopColor="#bfe9f8" />
//           <stop offset=".75" stopColor="#e7cdf3" />
//           <stop offset="1" stopColor="#b9c7f7" />
//         </linearGradient>
//         <filter id={`${id}soft`} {...region}><feGaussianBlur stdDeviation="28" /></filter>
//         <filter id={`${id}mid`} {...region}><feGaussianBlur stdDeviation="14" /></filter>
//         <filter id={`${id}edge`} {...region}><feGaussianBlur stdDeviation="4" /></filter>
//       </defs>

//       {/* ambient light — doesn't move */}
//       <rect width="1600" height="1000" fill={u("white")} />
//       <rect width="1600" height="1000" fill={u("cyan")} />
//       <rect width="1600" height="1000" fill={u("blue")} />

//       {/* left fold */}
//       <path data-k="leftFill" fill="#d3def9" filter={u("soft")} />
//       <path data-k="leftGlow" fill="none" stroke="#fff" strokeWidth="34" filter={u("mid")} />
//       <path data-k="leftEdge" fill="none" stroke="#fff" strokeWidth="6" filter={u("edge")} />

//       {/* main wave: body, shadow, sheen, highlight — all from one curve */}
//       <path data-k="mainFill" fill={u("band")} filter={u("soft")} />
//       <path data-k="mainShadow" fill="none" stroke="#b4c4f5" strokeWidth="60" opacity=".7" filter={u("mid")} />
//       <path data-k="mainSheen" fill="none" stroke={u("sheen")} strokeWidth="18" filter={u("edge")} />
//       <path data-k="mainHighlight" fill="none" stroke="#fff" strokeWidth="10" filter={u("edge")} />

//       {/* lower fold */}
//       <path data-k="lowerFill" fill="#f6f8ff" opacity=".85" filter={u("soft")} />
//       <path data-k="lowerSheen" fill="none" stroke={u("sheen")} strokeWidth="26" opacity=".55" filter={u("mid")} />
//     </svg>
//   );
// }

import { useEffect, useRef } from "react";

/*
  Silk waves, drawn by the GPU.

  Why this is the light option
  ----------------------------
  The SVG version asked the browser to redraw ~9 shapes and re-run 9
  Gaussian blurs every frame — blurs are the most expensive thing you can
  paint. Here there are no shapes and no blur. A tiny WebGL "fragment
  shader" (the GLSL string below) runs once per pixel and simply *computes*
  the colour: "how far is this pixel from the wave's ridge?" → pick a colour
  from that distance. Softness comes from the maths (exp(-d²)), so it's free.

  On top of that:
    • the canvas renders at half resolution and CSS stretches it — the image
      is soft anyway, so you can't see the difference, and it's 4× fewer pixels;
    • ~30fps cap, paused when the section is off-screen or the tab is hidden;
    • a single still frame for prefers-reduced-motion;
    • if WebGL isn't available you get `fallbackSrc` (your lab10.png) instead.
*/

const VERT = `
attribute vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
uniform vec2  uRes;    // canvas size in pixels
uniform float uTime;   // seconds
uniform float uAmp;    // wave strength multiplier

// Gaussian "glow" around a line: 1 on the line, fading to 0 at ~w away.
float glow(float d, float c, float w) { float k = (d - c) / w; return exp(-k * k); }

// EDITING THESE NUMBERS: GLSL is strict about decimals. Write 1.0, never 1 —
// "t * 1" is a compile error (int × float). If you just want slower waves,
// use the speed prop instead of editing the shader.
//
// Main S-curve. The polynomial is the resting shape (fitted to the original
// artwork); the sines make it move. (x * k - t) makes the bulge TRAVEL along
// the fold instead of the whole line bobbing in place.
float mainY(float x, float t) {
  float rest = 0.6406 + x*(0.3049 + x*(1.8348 + x*(-9.3016 + x*(9.2143 + x*-2.6298))));
  return rest
    + uAmp * 0.045 * sin(x * 4.5 - t * 0.70)
    + uAmp * 0.016 * sin(x * 9.0 - t * 1.10 + 1.7);
}
float lowerY(float x, float t) {
  float rest = 0.8995 + x*(-0.0548 + x*(0.8007 + x*(-4.9717 + x*(6.6064 + x*-2.4877))));
  return rest + uAmp * 0.035 * sin(x * 3.6 - t * 0.50 + 2.0)
              + uAmp * 0.012 * sin(x * 8.0 - t * 0.85);
}

// Distance from the pixel to a curve y = f(x), measured perpendicular to the
// curve (dividing by the slope), so the ridge keeps the same thickness on the
// steep part of the S as on the flat part. Units: 1.0 = section height.
#define DIST(F, p, t) ((p.y - F(p.x, t)) / sqrt(1.0 + pow((F(p.x + 0.002, t) - F(p.x - 0.002, t)) / 0.004 * 0.625, 2.0)))

// Iridescent colour that slides along the ridge over time.
vec3 sheen(float s) {
  s = fract(s);
  vec3 a = vec3(0.914, 0.851, 0.984), b = vec3(0.718, 0.765, 0.965),
       c = vec3(0.749, 0.914, 0.973), d = vec3(0.906, 0.804, 0.953);
  if (s < 0.25) return mix(a, b, s / 0.25);
  if (s < 0.50) return mix(b, c, (s - 0.25) / 0.25);
  if (s < 0.75) return mix(c, d, (s - 0.50) / 0.25);
  return mix(d, a, (s - 0.75) / 0.25);
}

void main() {
  // "object-fit: cover" for a 1600×1000 design: p is 0..1 in design space.
  vec2 frag = gl_FragCoord.xy; frag.y = uRes.y - frag.y;
  float s = max(uRes.x / 1.6, uRes.y);
  vec2 p = vec2((frag.x - 0.5 * uRes.x) / (s * 1.6), (frag.y - 0.5 * uRes.y) / s) + 0.5;
  float t = uTime;

  // 1. ambient light
  vec3 col = vec3(0.933, 0.953, 0.992);
  col = mix(col, vec3(1.0),                 (1.0 - clamp(length((p - vec2(0.30, 0.30)) / vec2(0.45)), 0.0, 1.0)) * 0.9);
  col = mix(col, vec3(0.835, 0.965, 0.984), 1.0 - clamp(length((p - vec2(0.72, 0.00)) / vec2(0.30)), 0.0, 1.0));
  col = mix(col, vec3(0.765, 0.835, 0.984), 1.0 - clamp(length((p - vec2(0.80, 0.55)) / vec2(0.40)), 0.0, 1.0));

  // 2. left fold — a superellipse arc whose radius ripples downward
  vec2 q = abs((p - vec2(1.0438, -1.0)) / vec2(1.0387, 1.7382));
  float e = pow(pow(q.x, 6.0) + pow(q.y, 6.0), 1.0 / 6.0)
          + uAmp * 0.012 * sin(p.y * 7.0 - t * 0.6);
  float dl = (e - 1.0) * 1.0;
  float leftMask = smoothstep(0.62, 0.35, p.x);
  col = mix(col, vec3(0.827, 0.871, 0.976), smoothstep(-0.01, 0.08, dl) * 0.85 * leftMask);
  col = mix(col, vec3(1.0), glow(dl, 0.0, 0.018) * 0.9 * leftMask);
  col = mix(col, vec3(1.0), glow(dl, 0.0, 0.004) * leftMask);

  // 3. main wave: body under the curve, then shadow, sheen, highlight
  float d = DIST(mainY, p, t);
  vec3 band = mix(vec3(0.776, 0.827, 0.980), vec3(0.890, 0.918, 0.988), smoothstep(0.0, 0.12, d));
  band = mix(band, vec3(0.957, 0.969, 0.996), smoothstep(0.12, 0.40, d));
  col = mix(col, band,                       smoothstep(-0.03, 0.04, d));
  col = mix(col, vec3(0.706, 0.769, 0.961),  glow(d, 0.030, 0.035) * 0.65);
  col = mix(col, sheen(p.x * 0.9 - t * 0.04), glow(d, 0.0, 0.010) * 0.95);
  col = mix(col, vec3(1.0),                  glow(d, -0.012, 0.006));

  // 4. lower fold
  float d2 = DIST(lowerY, p, t);
  col = mix(col, vec3(0.769, 0.839, 0.984), (1.0 - clamp(length((p - vec2(0.85, 1.05)) / vec2(0.45, 0.25)), 0.0, 1.0)) * 0.7);
  col = mix(col, vec3(0.965, 0.973, 1.0),   smoothstep(-0.02, 0.06, d2) * 0.8);
  col = mix(col, sheen(p.x * 0.7 + 0.3 - t * 0.03), glow(d2, 0.0, 0.020) * 0.5);

  // a whisper of noise so the soft gradients don't band into stripes
  col += (fract(sin(dot(frag, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
}`;

export default function SilkWaves({
  className = "",
  amplitude = 0.3,     // 0 = still, 1 = default, 1.5 = livelier
  speed = 1,         // 0.5 = half speed, 2 = double. Change THIS to slow it down.
  resolution = 0.5,  // fraction of CSS pixels actually rendered
  fallbackSrc,       // shown if WebGL is unavailable (or the shader fails)
}) {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  // speed and amplitude live in refs so changing them does NOT tear down and
  // rebuild WebGL — the running loop just reads the new value next frame.
  const speedRef = useRef(speed);
  const ampRef = useRef(amplitude);
  speedRef.current = speed;
  ampRef.current = amplitude;

  useEffect(() => {
    const canvas = canvasRef.current;
    const showFallback = (why) => {
      if (why) console.error("[SilkWaves]", why);
      canvas.style.display = "none";
      if (imgRef.current) imgRef.current.style.display = "block";
    };

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return showFallback("WebGL not available");

    // A GLSL typo must never take the page down. Log it and fall back
    // instead of throwing — a throw inside useEffect unmounts the whole app,
    // which is the blank white screen.
    const compile = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error("[SilkWaves] shader error:\n" + gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return showFallback("shader failed to compile (see error above)");

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return showFallback(gl.getProgramInfoLog(prog));
    gl.useProgram(prog);

    // One big triangle that covers the screen — the shader does the rest.
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uAmp = gl.getUniformLocation(prog, "uAmp");

    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * resolution));
      const h = Math.max(1, Math.round(canvas.clientHeight * resolution));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };

    // Time is ACCUMULATED (t += elapsed × speed) rather than computed as
    // (now − start) × speed. With the second form, changing speed from 1 to
    // 0.5 after 60s would snap the waves from t=60 back to t=30 in one frame.
    let t = 0, prev = performance.now();
    const draw = (now) => {
      const dt = Math.min((now - prev) / 1000, 0.1); // clamp: no leap after a background tab
      prev = now;
      t += dt * speedRef.current;
      resize();
      gl.uniform1f(uTime, t);
      gl.uniform1f(uAmp, ampRef.current);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    draw(prev);
    const ro = new ResizeObserver(() => draw(performance.now()));
    ro.observe(canvas);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, last = 0;
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 33) return; // ~30fps is plenty for slow motion
      last = now;
      draw(now);
    };
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting && !reduced) {
        prev = performance.now(); // don't count the time spent off-screen
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(canvas);

    // Clean up what we created — but do NOT call loseContext(). The canvas
    // element survives hot-reload and prop changes; a lost context stays lost,
    // so the next setup would get a dead context and fail.
    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [resolution]);

  return (
    <div aria-hidden="true" className={`absolute inset-0 -z-10 bg-[#eef3fd] ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full" />
      {fallbackSrc && (
        <img ref={imgRef} src={fallbackSrc} alt="" className="absolute inset-0 hidden h-full w-full object-cover" />
      )}
    </div>
  );
}