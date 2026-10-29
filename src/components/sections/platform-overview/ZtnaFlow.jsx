"use client";

import { useEffect, useRef } from "react";
import { Check, Lock } from "lucide-react";

/**
 * ZtnaFlow — the whole `layout === "ztna"` widget (label, path, tags).
 *
 * Loops every 10.5s in three beats:
 *   0.0–3.5s  user turns on, check badge snaps in, path draws to the broker
 *   3.5–7.0s  broker pulses while it evaluates, then locks
 *   7.0–10.5s path draws on to the app, app turns on
 *
 * The app deliberately stays grey until the broker has decided. That ordering
 * is the claim — nothing reaches the application until policy says so.
 *
 * Pure CSS keyframes: no framer-motion, no timers, no measurement, SSR-safe.
 * Several of them are paint animations, though, so the loop is paused while
 * the widget is off screen — see the observer below.
 */
export default function ZtnaFlow({ product }) {
  const [a, b, c] = product.flow || [];
  const steps = product.steps || DEFAULT_STEPS;
  const rootRef = useRef(null);

  /* The keyframes above are not compositor-only after all: background,
   * box-shadow, stroke, clip-path and the marching background-position all
   * repaint on the main thread, every frame, forever — and this widget rides
   * inside the products row, whose x is driven from the scroll on that same
   * thread. For most of the section's travel the card is clipped off the
   * sticky viewport, and once the reader has scrolled past it is not on
   * screen at all, so the loop was spending the row's frame budget on pixels
   * nobody could see.
   *
   * Paused rather than removed, same as the hero map: play-state keeps each
   * beat's phase, so it resumes mid-cycle instead of restarting. The observer
   * honours the sticky frame's overflow clip, so "off to the right of the
   * row" counts as not visible. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.dataset.ztPaused = String(!entry.isIntersecting);
      },
      { rootMargin: "100px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="zt flex w-full flex-col gap-4">
      <style>{CSS}</style>

      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
        {product.name}
      </span>

      <div className="zt-panel rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between">
          <Node n="1" node={a} badge={Check} />
          <Segment n="1" />
          <Node n="2" node={b} badge={Lock} />
          <Segment n="2" />
          <Node n="3" node={c} />
        </div>

        {/* the caption is what turns three icons into an explanation */}
        <div className="relative mt-2.5 h-4">
          {steps.slice(0, 3).map((s, i) => (
            <p
              key={s.title}
              className={`zt-cap zt-cap${i + 1} absolute inset-0 flex items-center
                          justify-center gap-1.5 text-[11px] font-medium text-slate-900`}
            >
              <span className="zt-dot" />
              {s.title}
              {s.note && <span className="font-normal text-slate-500">{s.note}</span>}
            </p>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(product.tags || []).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1
                       text-[11px] leading-tight text-white/75"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

const DEFAULT_STEPS = [
  { title: "Identity and device verified" },
  { title: "Policy evaluated", note: "— app stays dark" },
  { title: "Connected", note: "— to this one app" },
];

function Node({ n, node, badge: Badge }) {
  const Icon = node.icon;
  return (
    <div className={`zt-n${n} flex w-[76px] flex-none flex-col items-center gap-2`}>
      <span className="relative">
        <span className="zt-chip flex h-10 w-10 items-center justify-center rounded-xl">
          <Icon className="zt-ico h-4 w-4" strokeWidth={2} />
        </span>
        <span className="zt-halo" />
        {Badge && (
          <span className={`zt-badge zt-badge${n}`}>
            <Badge className="h-[9px] w-[9px]" strokeWidth={3.5} />
          </span>
        )}
      </span>
      <span className="text-center text-[10px] leading-tight text-slate-700">
        {node.label}
      </span>
    </div>
  );
}

function Segment({ n }) {
  return (
    <div className={`zt-s${n} relative -mx-1 h-10 flex-1`}>
      <span className="zt-track" />
      <span className="zt-fill" />
      <span className="zt-packet" />
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Move this into globals.css if you'd rather not ship a <style> tag — it is
 * static, so React dedupes it, but one copy in CSS is tidier. Everything is
 * prefixed `zt-` and scoped under `.zt`, so it can't collide.
 * ------------------------------------------------------------------------- */
const CSS = `
.zt{
  --zt-acc:#0B8F24;          /* accent: badges, active rings, packet */
  --zt-glow:11 143 36;       /* same colour as rgb triplet, for the glow */
  --zt-ink:#1E293B;          /* the drawn path — dark, so it reads on white */
  --zt-idle:#98A2B3;
  --zt-T:10.5s;
}
.zt .zt-chip{background:#F1F3F6;box-shadow:inset 0 0 0 1.5px #E2E6EB}
.zt .zt-ico{stroke:var(--zt-idle);fill:none}
.zt .zt-halo{position:absolute;inset:-3px;border-radius:14px;
  border:1.5px solid var(--zt-acc);opacity:0;pointer-events:none}
.zt .zt-badge{position:absolute;right:-4px;top:-4px;display:flex;height:15px;width:15px;
  align-items:center;justify-content:center;border-radius:9999px;background:var(--zt-acc);
  box-shadow:0 0 0 2px #fff;transform:scale(0);opacity:0}
.zt .zt-badge svg{stroke:#fff;fill:none}

/* the dotted rail. .zt-fill is the same rail in ink, revealed by clip-path —
   clipping rather than animating width keeps this off the layout path. */
.zt .zt-track,.zt .zt-fill{position:absolute;top:19px;left:2px;right:2px;height:2px;
  background-image:radial-gradient(circle at 1px 50%,currentColor 1px,transparent 1.2px);
  background-size:5px 2px;background-repeat:repeat-x}
.zt .zt-track{color:#DFE3E9}
.zt .zt-fill{color:var(--zt-ink);clip-path:inset(0 100% 0 0)}

/* full-width rail; the dot itself is the ::before pinned to its left edge, so
   translateX(100%) means "one segment" and the travel needs no measurement. */
.zt .zt-packet{position:absolute;top:16px;left:2px;right:2px;height:8px;opacity:0}
.zt .zt-packet::before{content:"";position:absolute;left:0;top:0;height:8px;width:8px;
  border-radius:9999px;background:var(--zt-acc);
  box-shadow:0 0 0 3px rgb(var(--zt-glow) / .12)}

.zt .zt-dot{height:5px;width:5px;flex:none;border-radius:9999px;background:var(--zt-acc)}
.zt .zt-cap{opacity:0}

@keyframes zt-on1{0%,2%{background:#F1F3F6;box-shadow:inset 0 0 0 1.5px #E2E6EB}
  5%,95%{background:#fff;box-shadow:inset 0 0 0 1.5px var(--zt-acc),0 4px 10px -4px rgb(var(--zt-glow) / .55)}
  100%{background:#F1F3F6;box-shadow:inset 0 0 0 1.5px #E2E6EB}}
@keyframes zt-on2{0%,19%{background:#F1F3F6;box-shadow:inset 0 0 0 1.5px #E2E6EB}
  22%,95%{background:#fff;box-shadow:inset 0 0 0 1.5px var(--zt-acc),0 4px 10px -4px rgb(var(--zt-glow) / .55)}
  100%{background:#F1F3F6;box-shadow:inset 0 0 0 1.5px #E2E6EB}}
@keyframes zt-on3{0%,78%{background:#F1F3F6;box-shadow:inset 0 0 0 1.5px #E2E6EB}
  81%,95%{background:#fff;box-shadow:inset 0 0 0 1.5px var(--zt-acc),0 4px 10px -4px rgb(var(--zt-glow) / .55)}
  100%{background:#F1F3F6;box-shadow:inset 0 0 0 1.5px #E2E6EB}}
@keyframes zt-i1{0%,2%{stroke:var(--zt-idle)}5%,95%{stroke:var(--zt-acc)}100%{stroke:var(--zt-idle)}}
@keyframes zt-i2{0%,19%{stroke:var(--zt-idle)}22%,95%{stroke:var(--zt-acc)}100%{stroke:var(--zt-idle)}}
@keyframes zt-i3{0%,78%{stroke:var(--zt-idle)}81%,95%{stroke:var(--zt-acc)}100%{stroke:var(--zt-idle)}}

@keyframes zt-h1{0%,2%{opacity:0;transform:scale(.86)}6%{opacity:.55;transform:scale(1)}
  14%,100%{opacity:0;transform:scale(1.25)}}
@keyframes zt-h2{0%,19%{opacity:0;transform:scale(.86)}23%{opacity:.55;transform:scale(1)}
  31%{opacity:0;transform:scale(1.25)}
  40%{opacity:0;transform:scale(.9)}46%{opacity:.42;transform:scale(1.05)}
  54%,100%{opacity:0;transform:scale(1.22)}}
@keyframes zt-h3{0%,78%{opacity:0;transform:scale(.86)}82%{opacity:.55;transform:scale(1)}
  90%,100%{opacity:0;transform:scale(1.25)}}

@keyframes zt-draw1{0%,8%{clip-path:inset(0 100% 0 0)}18%,95%{clip-path:inset(0 0 0 0)}
  100%{clip-path:inset(0 100% 0 0)}}
@keyframes zt-draw2{0%,67%{clip-path:inset(0 100% 0 0)}77%,95%{clip-path:inset(0 0 0 0)}
  100%{clip-path:inset(0 100% 0 0)}}
@keyframes zt-march{to{background-position-x:-5px}}

@keyframes zt-pk1{0%,9%{opacity:0;transform:translateX(0)}11%,17%{opacity:1}
  19%,100%{opacity:0;transform:translateX(calc(100% - 8px))}}
@keyframes zt-pk2{0%,68%{opacity:0;transform:translateX(0)}70%,76%{opacity:1}
  78%,100%{opacity:0;transform:translateX(calc(100% - 8px))}}

@keyframes zt-b1{0%,5%{transform:scale(0);opacity:0}9%{transform:scale(1.2);opacity:1}
  12%,95%{transform:scale(1);opacity:1}100%{transform:scale(0);opacity:0}}
@keyframes zt-b2{0%,48%{transform:scale(0);opacity:0}52%{transform:scale(1.2);opacity:1}
  55%,95%{transform:scale(1);opacity:1}100%{transform:scale(0);opacity:0}}

@keyframes zt-c1{0%{opacity:0;transform:translateY(4px)}3%,29%{opacity:1;transform:none}
  33%,100%{opacity:0;transform:translateY(-4px)}}
@keyframes zt-c2{0%,34%{opacity:0;transform:translateY(4px)}37%,62%{opacity:1;transform:none}
  66%,100%{opacity:0;transform:translateY(-4px)}}
@keyframes zt-c3{0%,67%{opacity:0;transform:translateY(4px)}70%,95%{opacity:1;transform:none}
  99%,100%{opacity:0;transform:translateY(-4px)}}

.zt .zt-n1 .zt-chip{animation:zt-on1 var(--zt-T) linear infinite}
.zt .zt-n2 .zt-chip{animation:zt-on2 var(--zt-T) linear infinite}
.zt .zt-n3 .zt-chip{animation:zt-on3 var(--zt-T) linear infinite}
.zt .zt-n1 .zt-ico{animation:zt-i1 var(--zt-T) linear infinite}
.zt .zt-n2 .zt-ico{animation:zt-i2 var(--zt-T) linear infinite}
.zt .zt-n3 .zt-ico{animation:zt-i3 var(--zt-T) linear infinite}
.zt .zt-n1 .zt-halo{animation:zt-h1 var(--zt-T) ease-out infinite}
.zt .zt-n2 .zt-halo{animation:zt-h2 var(--zt-T) ease-out infinite}
.zt .zt-n3 .zt-halo{animation:zt-h3 var(--zt-T) ease-out infinite}
.zt .zt-s1 .zt-fill{animation:zt-draw1 var(--zt-T) cubic-bezier(.4,0,.2,1) infinite,
                              zt-march .5s linear infinite}
.zt .zt-s2 .zt-fill{animation:zt-draw2 var(--zt-T) cubic-bezier(.4,0,.2,1) infinite,
                              zt-march .5s linear infinite}
.zt .zt-s1 .zt-packet{animation:zt-pk1 var(--zt-T) cubic-bezier(.4,0,.2,1) infinite}
.zt .zt-s2 .zt-packet{animation:zt-pk2 var(--zt-T) cubic-bezier(.4,0,.2,1) infinite}
.zt .zt-badge1{animation:zt-b1 var(--zt-T) cubic-bezier(.34,1.56,.64,1) infinite}
.zt .zt-badge2{animation:zt-b2 var(--zt-T) cubic-bezier(.34,1.56,.64,1) infinite}
.zt .zt-cap1{animation:zt-c1 var(--zt-T) ease infinite}
.zt .zt-cap2{animation:zt-c2 var(--zt-T) ease infinite}
.zt .zt-cap3{animation:zt-c3 var(--zt-T) ease infinite}

/* Off screen: hold every beat where it is (see the observer in ZtnaFlow). */
.zt[data-zt-paused="true"] *{animation-play-state:paused}

/* On screen the loop still repaints, so keep that repaint on the panel's own
   layer instead of invalidating tiles of the whole translated products row. */
.zt .zt-panel{contain:paint;will-change:transform}

/* Matches the useReducedMotion() branch in ProductsSection: someone who asked
   their OS for less motion still gets the finished diagram, just not the loop. */
@media (prefers-reduced-motion:reduce){
  .zt *{animation:none !important}
  .zt .zt-chip{background:#fff;box-shadow:inset 0 0 0 1.5px var(--zt-acc)}
  .zt .zt-ico{stroke:var(--zt-acc)}
  .zt .zt-fill{clip-path:inset(0 0 0 0)}
  .zt .zt-badge{transform:scale(1);opacity:1}
  .zt .zt-cap1{opacity:1}
}
`;