import { useEffect, useId, useRef } from "react";

import poseBrowse from "@/assets/images/certification-flow/pose-browse.webp";
import poseThink from "@/assets/images/certification-flow/pose-think.webp";
import posePhone from "@/assets/images/certification-flow/pose-phone.webp";
import poseFocus from "@/assets/images/certification-flow/pose-focus.webp";

import "@/styles/certification-flow.css";

/* ------------------------------------------------------------------
   CertificationFlow: the animated illustration in the
   /products/certifications masthead.

   A candidate searches for a certification, picks it from the catalogue,
   books the exam (online or at a test centre), sits the exam and gets
   certified. The person is a set of greyscale photo cut-outs swapped
   stop-motion style, one expression per step.

   HOW IT WORKS
   - The markup below is static JSX. The animation is a plain async
     timeline (see `journey`) that toggles classes on elements it finds by
     `data-el`. It never calls setState, so React does not re-render 60
     times a second while the dot travels along the line.
   - Everything is drawn on a fixed 960Ã—440 stage that a ResizeObserver
     scales to the container width, so it fits any column.
   - The loop only runs while the illustration is on screen
     (IntersectionObserver) and stops cleanly on unmount, including React
     StrictMode's double mount in development.
   - With `prefers-reduced-motion`, it shows the final "certified" frame
     and does not animate.
------------------------------------------------------------------ */

const CERTS = [
  { vendor: "aws", query: "aws solutions", name: "AWS Solutions Architect", code: "SAA-C03", mode: "online", score: 872 },
  { vendor: "azure", query: "azure admin", name: "Azure Administrator", code: "AZ-104", mode: "centre", score: 815 },
  { vendor: "microsoft", query: "microsoft 365", name: "Microsoft 365 Fundamentals", code: "MS-900", mode: "online", score: 904 },
];

const POSES = [
  { key: "browse", src: poseBrowse }, // hand on trackpad, slight smile
  { key: "think", src: poseThink },   // pen raised, weighing options
  { key: "phone", src: posePhone },   // checking the booking confirmation
  { key: "focus", src: poseFocus },   // writing: mid-exam
];

const VENDORS = [
  { key: "aws", label: "AWS", icon: <path d="M7 18h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.2 11 3.5 3.5 0 0 0 7 18z" /> },
  { key: "azure", label: "Azure", icon: <path d="M12 4l9 15H3z" /> },
  { key: "microsoft", label: "Microsoft", icon: <><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M4 9h16" /></> },
  { key: "gcp", label: "GCP", icon: <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /> },
  { key: "cisco", label: "Cisco", icon: <><circle cx="6" cy="7" r="2" /><circle cx="18" cy="7" r="2" /><circle cx="12" cy="18" r="2" /><path d="M8 7h8M7 9l4 7M17 9l-4 7" /></> },
  { key: "comptia", label: "CompTIA", icon: <path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /> },
];

const OPTION_WIDTHS = ["62%", "48%", "70%", "40%"];
const STEPS = ["Select", "Schedule", "Exam", "Certified"];
const CONNECTOR = "M180 324 V372 H612 V338";

const ICON_CALENDAR = '<svg class="cf-ico" viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M8 3v4M16 3v4"/></svg>';
const ICON_CHECK = '<svg class="cf-ico" viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9"/></svg>';

function Ico({ children }) {
  return <svg className="cf-ico" viewBox="0 0 24 24" aria-hidden="true">{children}</svg>;
}

export default function CertificationFlow({ className = "" }) {
  const rootRef = useRef(null);
  // A unique id for the SVG mask, so two copies on one page can't collide.
  const maskId = `cf-mask-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const el = (name) => root.querySelector(`[data-el="${name}"]`);
    const all = (sel) => [...root.querySelectorAll(sel)];

    /* ---------- lifecycle plumbing ---------- */
    let alive = true;
    const timers = new Set();
    let raf = 0;
    const STOP = Symbol("stop");
    const wait = (ms) =>
      new Promise((resolve, reject) => {
        const t = setTimeout(() => {
          timers.delete(t);
          alive ? resolve() : reject(STOP);
        }, ms);
        timers.add(t);
      });

    /* ---------- scale the 960Ã—440 stage to the container ---------- */
    const stage = el("stage");
    const ro = new ResizeObserver(([entry]) =>
      stage.style.setProperty("--cf-scale", entry.contentRect.width / 960)
    );
    ro.observe(root);

    /* ---------- helpers ---------- */
    const setView = (name, title) => {
      all(".cf-view").forEach((v) => v.classList.toggle("is-active", v.dataset.view === name));
      el("panel-title").textContent = title;
    };
    const setStatus = (text, tone = "") => {
      const s = el("status");
      s.textContent = text;
      s.className = `cf-status${tone ? ` is-${tone}` : ""}`;
    };
    const setStep = (n) => all(".cf-step").forEach((s, i) => s.classList.toggle("is-done", i < n));
    const setBadge = (which) =>
      ["idle", "exam", "done"].forEach((b) => el(`badge-${b}`).setAttribute("opacity", b === which ? 1 : 0));
    const bubble = (show, mode) => {
      if (mode) el("bubble").dataset.mode = mode;
      el("bubble").classList.toggle("is-show", show);
      el("thought").setAttribute("opacity", show ? 1 : 0);
    };
    const toast = (icon, title, sub, green = false) => {
      el("toast-icon").innerHTML = icon;
      el("toast-icon").classList.toggle("is-green", green);
      el("toast-title").textContent = title;
      el("toast-sub").textContent = sub;
      bubble(true, "toast");
    };
    const type = async (node, text, speed = 70) => {
      node.textContent = "";
      for (const ch of text) {
        node.textContent += ch;
        await wait(speed);
      }
    };

    /* ---------- stop-motion avatar ---------- */
    const inner = el("avatar");
    const pose = (key, anim = "pop") => {
      all(".cf-avatar img").forEach((im) => im.classList.toggle("is-on", im.dataset.pose === key));
      inner.classList.remove("is-pop", "is-cheer");
      void inner.offsetWidth; // restart the CSS animation
      inner.classList.add(`is-${anim}`);
    };
    // "Boil": a tiny random jitter every few frames, the classic stop-motion wobble.
    const boil = setInterval(() => {
      const dx = (Math.random() - 0.5) * 1.6;
      const dy = (Math.random() - 0.5) * 1.2;
      const r = (Math.random() - 0.5) * 0.5;
      inner.style.translate = `${dx}px ${dy}px`;
      inner.style.rotate = `${r}deg`;
    }, 160);
    const confetti = () => {
      const box = el("confetti");
      box.innerHTML = "";
      const cols = ["#2563eb", "#16a34a", "#f59e0b", "#ec4899", "#1f2433"];
      for (let k = 0; k < 22; k++) {
        const i = document.createElement("i");
        const a = -Math.PI * (0.1 + Math.random() * 0.8); // spray up and outward
        const d = 90 + Math.random() * 80;
        i.style.cssText =
          `background:${cols[k % 5]};--x:${Math.cos(a) * d}px;--y:${Math.sin(a) * d + 30}px;` +
          `--r:${Math.random() * 540}deg;animation-delay:${Math.random() * 0.15}s`;
        box.appendChild(i);
      }
    };

    /* ---------- the dot that travels along the dotted connector ---------- */
    const path = el("connector");
    const maskPath = el("mask-path");
    const trail = el("trail");
    const dot = el("pulse");
    const label = el("pulse-label");
    const travel = (text, { reverse = false, duration = 1400 } = {}) =>
      new Promise((resolve, reject) => {
        const len = path.getTotalLength();
        label.textContent = text;
        dot.setAttribute("opacity", 1);
        label.setAttribute("opacity", 1);
        trail.style.transition = "none";
        trail.style.opacity = 1;
        const t0 = performance.now();
        const frame = (now) => {
          if (!alive) return reject(STOP);
          let t = Math.min((now - t0) / duration, 1);
          t = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // ease-in-out
          const p = path.getPointAtLength((reverse ? 1 - t : t) * len);
          dot.setAttribute("transform", `translate(${p.x} ${p.y})`);
          label.setAttribute("x", p.x);
          label.setAttribute("y", p.y - 12);
          // pathLength=1 on the mask path, so the offset runs 1 â†’ 0 (or -1 â†’ 0 in reverse)
          maskPath.setAttribute("stroke-dashoffset", reverse ? t - 1 : 1 - t);
          if (t < 1) {
            raf = requestAnimationFrame(frame);
            return;
          }
          wait(250)
            .then(() => {
              dot.setAttribute("opacity", 0);
              label.setAttribute("opacity", 0);
              trail.style.transition = "opacity .4s";
              trail.style.opacity = 0;
            })
            .catch(() => {});
          resolve();
        };
        raf = requestAnimationFrame(frame);
      });

    const reset = () => {
      setView("catalogue", "Certification catalogue");
      setStatus("BROWSE");
      setStep(0);
      setBadge("idle");
      pose("browse");
      all(".cf-tile, .cf-mode").forEach((n) => n.classList.remove("is-picked"));
      ["chip-date", "chip-time"].forEach((n) => el(n).classList.remove("is-filled"));
      el("result").classList.remove("is-show", "is-picked");
      el("medal").classList.remove("is-pop");
      el("panel").classList.remove("is-glow");
      el("query").textContent = "";
    };

    /* ================= one full journey ================= */
    const journey = async (c) => {
      reset();
      await wait(600);

      // 1. search and select
      bubble(true, "search");
      await wait(400);
      await type(el("query"), c.query);
      el("result-name").textContent = c.name;
      el("result").classList.add("is-show");
      await wait(600);
      el("result").classList.add("is-picked");
      await wait(700);
      bubble(false);
      await travel("SELECT");
      root.querySelector(`.cf-tile[data-vendor="${c.vendor}"]`).classList.add("is-picked");
      setStatus("SELECTED", "blue");
      setStep(1);
      await wait(1300);

      // 2. schedule: online or test centre
      setView("schedule", "Schedule exam");
      setStatus("BOOKING", "blue");
      pose("think");
      await wait(700);
      root.querySelector(`.cf-mode[data-mode="${c.mode}"]`).classList.add("is-picked");
      await wait(600);
      el("chip-date").classList.add("is-filled");
      await wait(350);
      el("chip-time").classList.add("is-filled");
      await wait(450);
      el("book").classList.add("is-pressed");
      await wait(180);
      el("book").classList.remove("is-pressed");
      setStatus("SCHEDULED", "blue");
      setStep(2);
      await travel("CONFIRMATION", { reverse: true, duration: 1200 });
      pose("phone");
      toast(ICON_CALENDAR, "Exam booked", `14 Oct Â· 10:00 Â· ${c.mode === "online" ? "Online" : "Test centre"}`);
      await wait(1700);
      bubble(false);
      await wait(400);

      // 3. sit the exam
      setView("exam", "Exam session");
      setStatus("IN PROGRESS", "blue");
      el("exam-mode").textContent = c.mode === "online" ? "Online Â· Proctored" : "Test centre Â· Seat 14";
      setBadge("exam");
      el("panel").classList.add("is-glow");
      pose("focus");
      const opts = all(".cf-opt");
      const qs = [1, 9, 18, 27, 38, 46, 55, 65];
      for (let i = 0; i < qs.length; i++) {
        el("q-num").textContent = qs[i];
        const secsLeft = 130 * 60 - i * 900; // timer drops ~15 min per tick
        el("timer").textContent = [secsLeft / 3600, (secsLeft % 3600) / 60, 0]
          .map((n) => String(Math.floor(n)).padStart(2, "0"))
          .join(":");
        opts.forEach((o) => o.classList.remove("is-on"));
        await wait(220);
        opts[(i * 3 + 1) % 4].classList.add("is-on");
        await wait(330);
      }
      setStatus("SUBMITTED", "blue");
      setStep(3);
      el("panel").classList.remove("is-glow");
      await wait(700);

      // 4. result and credential
      el("cert-name").textContent = c.name;
      el("cert-code").textContent = `${c.code} Â· Credential issued`;
      el("score").textContent = c.score;
      setView("result", "Result");
      setStatus("PASSED", "green");
      setStep(4);
      await wait(150);
      el("medal").classList.add("is-pop");
      await wait(1100);
      await travel("CREDENTIAL", { reverse: true });
      setBadge("done");
      pose("browse", "cheer");
      confetti();
      toast(ICON_CHECK, "You're certified!", `${c.name} Â· Verified`, true);
      await wait(2600);
      bubble(false);
      await wait(600);
    };

    /* ---------- reduced motion: show the finished state, no animation ---------- */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      clearInterval(boil);
      setView("result", "Result");
      setStatus("PASSED", "green");
      setStep(4);
      setBadge("done");
      el("medal").classList.add("is-pop");
      return () => {
        alive = false;
        ro.disconnect();
      };
    }

    /* ---------- run the loop only while on screen ---------- */
    let visible = false;
    let wake = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && wake) {
          wake();
          wake = null;
        }
      },
      { threshold: 0.2 }
    );
    io.observe(root);

    (async () => {
      let i = 0;
      try {
        while (alive) {
          if (!visible) await new Promise((r) => (wake = r));
          if (!alive) break;
          await journey(CERTS[i++ % CERTS.length]);
        }
      } catch (err) {
        if (err !== STOP) throw err;
      }
    })();

    return () => {
      alive = false;
      timers.forEach(clearTimeout);
      timers.clear();
      cancelAnimationFrame(raf);
      clearInterval(boil);
      ro.disconnect();
      io.disconnect();
      if (wake) wake();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`cf ${className}`}
      // style= {{ height: "100%"}}
      role="img"
      aria-label="A candidate searches for a certification such as AWS, Azure or Microsoft, books the exam online or at a test centre, takes the exam, and gets certified."
    >
      <div className="cf-stage" data-el="stage" aria-hidden="true">
        {/* ===== back layer: connector, travelling dot, thought dots ===== */}
        <svg className="cf-scene" viewBox="0 0 960 440">
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="960" height="440">
              <path
                data-el="mask-path"
                d={CONNECTOR}
                fill="none"
                stroke="#fff"
                strokeWidth="8"
                pathLength="1"
                strokeDasharray="1 1"
                strokeDashoffset="1"
              />
            </mask>
          </defs>

          <path data-el="connector" d={CONNECTOR} fill="none" stroke="#c3c8d4" strokeWidth="2" strokeLinecap="round" strokeDasharray="0 7" />
          <path data-el="trail" d={CONNECTOR} fill="none" stroke="#2563eb" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="0 7" mask={`url(#${maskId})`} />

          <g data-el="pulse" opacity="0">
            <circle r="9" fill="#2563eb" opacity=".15" />
            <circle r="4.5" fill="#2563eb" />
          </g>
          <text data-el="pulse-label" opacity="0" fontSize="8.5" fontWeight="700" letterSpacing="1.1" fill="#6b7285" textAnchor="middle" />

          <g data-el="thought" opacity="0" style={{ transition: "opacity .3s" }}>
            <circle cx="258" cy="150" r="3" fill="#fff" stroke="#d5d9e3" strokeWidth="1.5" />
            <circle cx="270" cy="134" r="5" fill="#fff" stroke="#d5d9e3" strokeWidth="1.5" />
          </g>
        </svg>

        {/* ===== the person: one cut-out per expression ===== */}
        <div className="cf-avatar">
          <div className="cf-avatar-inner" data-el="avatar">
            {POSES.map((p) => (
              <img key={p.key} data-pose={p.key} src={p.src} alt="" className={p.key === "browse" ? "is-on" : ""} draggable="false" />
            ))}
          </div>
        </div>
        <div className="cf-confetti" data-el="confetti" />

        {/* ===== front layer: desk, laptop and cup drawn over the photo ===== */}
        <svg className="cf-scene" viewBox="0 0 960 440">
          <g fill="none" stroke="#1f2433" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="120" y="246" width="120" height="72" rx="5" fill="#fff" />
            <path d="M106 318 H254" />
            <path d="M14 322 H346" strokeWidth="2.2" />
            <rect x="262" y="265" width="30" height="7" rx="1.5" fill="#fff" />
            <path d="M265 272 L269 320 H285 L289 272" fill="#fff" />
            <path d="M277 258 q-3 -4 0 -7 q3 -3 0 -7" strokeWidth="1.4" />
          </g>
          <g className="cf-badge" data-el="badge-idle">
            <circle cx="180" cy="282" r="11" fill="#2563eb" />
            <path d="M175 282 l3.5 3.5 l6.5 -7" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <g className="cf-badge" data-el="badge-exam" opacity="0">
            <circle cx="180" cy="282" r="11" fill="#2563eb" />
            <path d="M175 287 l1 -3.5 l6.5 -6.5 l2.5 2.5 l-6.5 6.5 z" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
          </g>
          <g className="cf-badge" data-el="badge-done" opacity="0">
            <circle cx="180" cy="282" r="11" fill="#16a34a" />
            <path d="M175 282 l3.5 3.5 l6.5 -7" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>

        {/* ===== thought bubble: search mode + toast mode ===== */}
        <div className="cf-bubble" data-el="bubble" data-mode="search">
          <div className="cf-bubble-mode" data-for="search">
            <div className="cf-caps">Find a certification</div>
            <div className="cf-search">
              <Ico><circle cx="11" cy="11" r="6" /><path d="M16 16l4 4" /></Ico>
              <span>
                <span data-el="query" />
                <span className="cf-caret" />
              </span>
            </div>
            <div className="cf-result" data-el="result">
              <span data-el="result-name">AWS Solutions Architect</span>
              <span className="cf-caps">Select</span>
            </div>
          </div>
          <div className="cf-bubble-mode" data-for="toast">
            <div className="cf-toast">
              <div className="cf-toast-icon" data-el="toast-icon" />
              <div className="cf-toast-title" data-el="toast-title" />
              <div className="cf-caps" data-el="toast-sub" />
            </div>
          </div>
        </div>

        {/* ===== right-hand panel ===== */}
        <div className="cf-panel" data-el="panel">
          <div className="cf-panel-head">
            <div className="cf-dots"><i /><i /><i /></div>
            <div className="cf-caps cf-panel-title" data-el="panel-title">Certification catalogue</div>
            <div className="cf-status" data-el="status">BROWSE</div>
          </div>

          <div className="cf-views">
            {/* 1. catalogue */}
            <div className="cf-view is-active" data-view="catalogue">
              <div className="cf-grid">
                {VENDORS.map((v) => (
                  <div key={v.key} className="cf-tile" data-vendor={v.key}>
                    <Ico>{v.icon}</Ico>
                    <span className="cf-caps">{v.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. schedule */}
            <div className="cf-view" data-view="schedule">
              <div className="cf-modes">
                <div className="cf-mode" data-mode="online">
                  <span className="cf-radio" />
                  <Ico><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /><circle cx="12" cy="10" r="2" /></Ico>
                  <div><b>Online</b><div className="cf-caps">Remote proctored</div></div>
                </div>
                <div className="cf-mode" data-mode="centre">
                  <span className="cf-radio" />
                  <Ico><path d="M4 20h16M6 20V9l6-4 6 4v11M10 20v-4h4v4M9 11h.01M15 11h.01" /></Ico>
                  <div><b>Test centre</b><div className="cf-caps">In person</div></div>
                </div>
              </div>
              <div className="cf-slots">
                <div className="cf-chip" data-el="chip-date">
                  <Ico><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M8 3v4M16 3v4" /></Ico>14 Oct
                </div>
                <div className="cf-chip" data-el="chip-time">
                  <Ico><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></Ico>10:00 AM
                </div>
                <div className="cf-btn" data-el="book">Book</div>
              </div>
            </div>

            {/* 3. exam */}
            <div className="cf-view" data-view="exam">
              <div className="cf-exam-meta">
                <div className="cf-caps cf-live"><i /><span data-el="exam-mode">Online Â· Proctored</span></div>
                <div className="cf-timer" data-el="timer">02:10:00</div>
              </div>
              <div className="cf-q">Question <span data-el="q-num">1</span> / 65</div>
              <div className="cf-q-line" />
              {OPTION_WIDTHS.map((w) => (
                <div key={w} className="cf-opt"><span /><span style={{ width: w }} /></div>
              ))}
            </div>

            {/* 4. result */}
            <div className="cf-view" data-view="result">
              <div className="cf-result-view">
                <svg className="cf-medal" data-el="medal" viewBox="0 0 80 80" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M28 6 L34 30 M52 6 L46 30" stroke="#1f2433" strokeWidth="2" />
                  <circle cx="40" cy="48" r="24" fill="#e6f6ec" stroke="#16a34a" strokeWidth="2.2" />
                  <circle cx="40" cy="48" r="17" fill="#fff" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="2 3" />
                  <path d="M32 48 l5.5 5.5 L49 42" stroke="#16a34a" strokeWidth="3" />
                </svg>
                <div>
                  <div className="cf-caps" style={{ color: "var(--cf-green)" }}>Certified</div>
                  <h4 data-el="cert-name">AWS Solutions Architect</h4>
                  <div className="cf-caps" data-el="cert-code">SAA-C03 Â· Credential issued</div>
                  <div className="cf-score">
                    <div><span className="cf-caps">Score</span><span data-el="score">872</span>/1000</div>
                    <div><span className="cf-caps">Valid until</span>Oct 2029</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cf-steps">
            {STEPS.map((s, i) => (
              <div key={s} className={`cf-step${i === STEPS.length - 1 ? " is-final" : ""}`}>
                <span />
                <div className="cf-caps">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
