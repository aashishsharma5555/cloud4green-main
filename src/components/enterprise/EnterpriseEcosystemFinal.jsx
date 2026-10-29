import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
// ^ on framer-motion instead of the `motion` package, change to:
//   import { AnimatePresence, motion } from "framer-motion";
import {
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";

/**
 * EnterpriseEcosystem
 * ------------------------------------------------------------------
 * Accordion section modeled on the reference: left column of
 * disclosure items with an indicator rail, right column a tinted
 * card that swaps with the active item and shows tool-logo chips.
 *
 * Behavior:
 *  - Tap/click a title to open it (one open at a time)
 *  - Auto-advances every AUTOPLAY_MS; the accent rail on the active
 *    item fills up as a progress indicator
 *  - Pauses while hovered or keyboard-focused
 *  - prefers-reduced-motion: no autoplay, no animations
 *
 * Tool disclosure (two layers, App Store style):
 *  - HOVER a chip -> a compact dark hint with the tool's description,
 *    after a 180ms delay so sweeping across the 2x2 grid doesn't flash
 *    it. Mouse pointers only; suppressed under `@media (hover: none)`.
 *  - CLICK a chip -> it morphs into a full detail panel that fills the
 *    card, via a shared `layoutId` on the chip and on its brand mark
 *    (Motion's shared-element layout animation). Dismiss with the close
 *    button, the scrim, or Escape.
 *  - The autoplay timer and the rail's fill both hold while a panel is
 *    open, and switching tracks dismisses it — a panel belongs to the
 *    track it was opened from.
 *
 * Logos:
 *  - Brand marks are INLINE SVG (see BRANDS below) — zero network
 *    requests, zero 404s, nothing to copy into /public. The path data
 *    is ~22KB raw / ~5KB gzipped and ships inside the JS bundle, so
 *    marks paint in the same frame as the card swap instead of
 *    firing four image requests on every switch.
 *  - Each mark renders in its official brand color on a 7%-tinted
 *    square of the same color, which evens out the wildly different
 *    visual weights (Apache's feather vs Microsoft's four squares).
 *  - Four brands (ServiceNow, CrowdStrike, LlamaIndex, UiPath) have
 *    no usable open mark, so they render a designed lettermark in the
 *    brand color. To swap in an official asset, drop the SVG in
 *    /public/logos/ and set `logo` on that tool — a `logo` value
 *    always wins over the inline mark.
 *
 * Each tool also has a `description` field reserved for the per-tool
 * disclosure you'll design later (tooltip / popover / detail card).
 */

const AUTOPLAY_MS = 6000;

/* ------------------------- track icons -------------------------- */

const icon = {
  // =========================================================
  // ENTERPRISE CLOUD
  // =========================================================

  cloud: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 18.5a4.5 4.5 0 0 0 .42-8.98 6 6 0 0 0-11.7 1.62A3.75 3.75 0 0 0 7 18.5Z" />
    </svg>
  ),


  // =========================================================
  // ENTERPRISE AI PLATFORMS
  // =========================================================

  ai: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3.5 13.4 8.6 18.5 10l-5.1 1.4L12 16.5l-1.4-5.1L5.5 10l5.1-1.4L12 3.5Z" />
      <path d="m19 3 .5 1.8L21.5 5.5l-2 .7L19 8l-.5-1.8-2-.7 2-.7L19 3Z" />
      <path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" />
    </svg>
  ),


  // =========================================================
  // AI ENGINEERING
  // =========================================================

  chip: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="6" width="12" height="12" rx="2.5" />
      <rect x="10" y="10" width="4" height="4" rx="1" />

      <path d="M9 2.5v3.5" />
      <path d="M15 2.5v3.5" />
      <path d="M9 18v3.5" />
      <path d="M15 18v3.5" />

      <path d="M2.5 9h3.5" />
      <path d="M2.5 15h3.5" />
      <path d="M18 9h3.5" />
      <path d="M18 15h3.5" />
    </svg>
  ),


  // =========================================================
  // DATA ENGINEERING & ANALYTICS
  // =========================================================

  database: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="7.5" ry="3" />

      <path d="M4.5 5v7c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V5" />

      <path d="M4.5 12v7c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-7" />
    </svg>
  ),


  // =========================================================
  // CYBERSECURITY
  // =========================================================

  shield: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21.5c-4.5-1.7-7.5-5-7.5-10V6l7.5-2.75L19.5 6v5.5c0 5-3 8.3-7.5 10Z" />
      <path d="m9 11.5 2 2 4-4.5" />
    </svg>
  ),


  // =========================================================
  // DEVOPS & PLATFORM ENGINEERING
  // =========================================================

  devops: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="12" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />

      <path d="M8.3 7.2 15.7 10.8" />
      <path d="M15.7 13.2 8.3 16.8" />
    </svg>
  ),


  // =========================================================
  // ENTERPRISE APPLICATIONS
  // =========================================================

  applications: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />

      <path d="M3.5 9h17" />
      <path d="M9 9v11.5" />

      <path d="M13 12.5h4" />
      <path d="M13 16h4" />
    </svg>
  ),
};

/* --------------------------- brand marks ------------------------ */
/*
 * Keyed by the exact `name` used in TRACKS below, so "Microsoft"
 * resolves to the same mark in all four tracks it appears in.
 *
 *   path  — single-path glyph on a 0 0 24 24 canvas
 *   rects — multi-color mark expressed as flat rects (Microsoft)
 *   hex   — official brand color, also used for the tinted backing
 *   text  — designed lettermark fallback where no open asset exists
 *
 * Path data: Simple Icons (CC0 1.0). The marks themselves remain the
 * trademarks of their respective owners and are used here nominatively
 * to identify the platforms each track covers.
 */

const BRANDS = {
  "Amazon Web Services": {
    hex: "#FF9900",
    path: "M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z",
  },
  "Google Cloud": {
    hex: "#4285F4",
    path: "M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.11-.247 10.941l.006-.007-.007.03a6.717 6.717 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.365 9.365 0 0 0-2.821-4.552l-.043.043.006-.05A9.344 9.344 0 0 0 12.19 2.38zm-.358 4.146c1.244-.04 2.518.368 3.486 1.15a5.186 5.186 0 0 1 1.862 4.078v.518c3.53-.07 3.53 5.262 0 5.193h-5.193l-.008.009v-.04H6.785a2.59 2.59 0 0 1-1.067-.23h.001a2.597 2.597 0 1 1 3.437-3.437l3.013-3.012A6.747 6.747 0 0 0 8.11 8.24c.018-.01.04-.026.054-.023a5.186 5.186 0 0 1 3.67-1.69z",
  },
  "Oracle": {
    hex: "#F80000",
    path: "M16.412 4.412h-8.82a7.588 7.588 0 0 0-.008 15.176h8.828a7.588 7.588 0 0 0 0-15.176zm-.193 12.502H7.786a4.915 4.915 0 0 1 0-9.828h8.433a4.914 4.914 0 1 1 0 9.828z",
  },
  "OpenAI": {
    hex: "#000000",
    path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z",
  },
  "Anthropic": {
    hex: "#191919",
    path: "M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z",
  },
  "NVIDIA": {
    hex: "#76B900",
    path: "M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z",
  },
  "Meta": {
    hex: "#0467DF",
    path: "M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z",
  },
  "LangChain": {
    hex: "#1C3C3C",
    path: "M13.796 0a6.93 6.93 0 0 0-4.91 2.019L5.451 5.455l3.273 3.27 3.432-3.432a2.284 2.284 0 0 1 3.277 0 2.28 2.28 0 0 1 0 3.275L12 12.001l3.273 3.273 3.433-3.435c2.692-2.692 2.692-7.127 0-9.82A6.92 6.92 0 0 0 13.796 0m-5.07 8.728-3.433 3.434c-2.692 2.693-2.692 7.126 0 9.819A6.92 6.92 0 0 0 10.203 24a6.93 6.93 0 0 0 4.911-2.02l3.432-3.432-3.271-3.272-3.433 3.433a2.284 2.284 0 0 1-3.277 0 2.28 2.28 0 0 1 0-3.276L12 12z",
  },
  "LangGraph": {
    hex: "#1C3C3C",
    path: "M5 19H10A5 5 0 115 14ZM19 14A5 5 0 1114 19H19ZM10 5A5 5 0 105 10V5ZM19 5V10A5 5 0 1014 5Z",
  },
  "CrewAI": {
    hex: "#FF5A50",
    path: "M12.482.18C7.161 1.319 1.478 9.069 1.426 15.372c-.051 5.527 3.1 8.68 8.68 8.627 6.716-.05 14.259-6.87 12.09-10.9-.672-1.292-1.396-1.344-2.687-.207-1.602 1.395-1.654.31-.207-2.893 1.757-3.98 1.705-5.322-.31-7.544C17.03.388 14.962-.388 12.482.181Zm5.322 2.068c2.273 2.015 2.376 4.236.465 8.42-1.395 3.1-2.17 3.515-3.824 1.86-1.24-1.24-1.343-3.46-.258-6.044 1.137-2.635.982-3.1-.568-1.653-3.72 3.358-6.458 9.765-5.424 12.503.464 1.189.825 1.395 2.737 1.395 2.79 0 6.303-1.705 7.957-3.926 1.756-2.274 2.79-2.274 2.79-.052 0 3.875-6.459 8.627-11.625 8.627-6.251 0-9.351-4.752-7.491-11.47.878-2.995 4.443-7.904 7.077-9.66 3.255-2.17 5.684-2.17 8.164 0z",
  },
  "Databricks": {
    hex: "#FF3621",
    path: "M.95 14.184L12 20.403l9.919-5.55v2.21L12 22.662l-10.484-5.96-.565.308v.77L12 24l11.05-6.218v-4.317l-.515-.309L12 19.118l-9.867-5.653v-2.21L12 16.805l11.05-6.218V6.32l-.515-.308L12 11.974 2.647 6.681 12 1.388l7.76 4.368.668-.411v-.566L12 0 .95 6.27v.72L12 13.207l9.919-5.55v2.26L12 15.52 1.516 9.56l-.565.308Z",
  },
  "Snowflake": {
    hex: "#29B5E8",
    path: "M24 3.459c0 .646-.418 1.18-1.141 1.18-.723 0-1.142-.534-1.142-1.18 0-.647.419-1.18 1.142-1.18.723 0 1.141.533 1.141 1.18zm-.228 0c0-.533-.38-.951-.913-.951s-.913.38-.913.95c0 .533.38.952.913.952.57 0 .913-.419.913-.951zm-1.37-.533h.495c.266 0 .456.152.456.38 0 .153-.076.229-.19.305l.19.266v.038h-.266l-.19-.266h-.229v.266h-.266zm.495.228h-.229v.267h.229c.114 0 .152-.038.152-.114.038-.077-.038-.153-.152-.153zM7.602 12.4c.038-.151.076-.304.076-.456 0-.114-.038-.228-.038-.342-.114-.343-.304-.647-.646-.838l-4.87-2.777c-.685-.38-1.56-.152-1.94.533-.381.685-.153 1.56.532 1.94l2.701 1.56-2.701 1.56c-.685.38-.913 1.256-.533 1.94.38.685 1.256.914 1.94.533l4.832-2.777c.343-.267.571-.533.647-.876zm1.332 2.626c-.266-.038-.57.038-.837.19l-4.832 2.777c-.685.38-.913 1.256-.532 1.94.38.686 1.255.914 1.94.533l2.701-1.56v3.12c0 .8.647 1.408 1.446 1.408.799 0 1.407-.647 1.407-1.408v-5.592c0-.761-.57-1.37-1.293-1.408zm4.946-6.088c.266.038.57-.038.837-.19l4.832-2.777c.685-.38.913-1.256.532-1.94-.38-.686-1.255-.914-1.94-.533l-2.701 1.56V1.975c0-.799-.647-1.408-1.446-1.408-.799 0-1.446.609-1.446 1.408V7.53c0 .76.609 1.37 1.332 1.407zM3.265 5.97l4.832 2.777c.266.152.533.19.837.19.723-.038 1.331-.684 1.331-1.407V1.975c0-.799-.646-1.408-1.407-1.408-.799 0-1.446.647-1.446 1.408v3.12l-2.701-1.56c-.685-.38-1.56-.152-1.94.533-.419.646-.19 1.521.494 1.902zm9.093 6.011a.412.412 0 00-.114-.266l-.57-.571a.346.346 0 00-.267-.114.412.412 0 00-.266.114l-.571.57a.411.411 0 00-.114.267c0 .076.038.19.114.267l.57.57a.345.345 0 00.267.114c.076 0 .19-.038.266-.114l.571-.57a.412.412 0 00.114-.267zm1.598.533L11.94 14.53c-.039.038-.153.114-.229.114h-.608a.411.411 0 01-.267-.114L8.82 12.514a.408.408 0 01-.076-.229v-.608c0-.076.038-.19.114-.267l2.016-2.016a.41.41 0 01.267-.114h.608a.41.41 0 01.267.114l2.016 2.016a.347.347 0 01.114.267v.608c-.076.077-.114.19-.19.229zm5.593 5.44l-4.832-2.777c-.266-.152-.57-.19-.837-.152-.723.038-1.332.684-1.332 1.408v5.554c0 .8.647 1.408 1.408 1.408.799 0 1.446-.647 1.446-1.408v-3.12l2.7 1.56c.686.38 1.561.152 1.941-.533.419-.646.19-1.521-.494-1.94zm2.549-7.533l-2.701 1.56 2.7 1.56c.686.38.914 1.256.533 1.94-.38.685-1.255.913-1.94.533l-4.832-2.778a1.644 1.644 0 01-.647-.798c-.037-.153-.076-.305-.076-.457 0-.114.039-.228.039-.342.114-.343.342-.647.646-.837l4.832-2.778c.685-.38 1.56-.152 1.94.533.457.609.19 1.484-.494 1.864",
  },
  "Apache": {
    hex: "#D22128",
    path: "M17.805 2.197v.066h.156v.44h.072v-.44h.156v-.066zm.9 0l-.175.353-.172-.353h-.087v.506h.067V2.3l.172.35h.045l.172-.35v.404h.066v-.506zm-4.257 1c-.204.31-.424.66-.66 1.06l-.04.062a44.457 44.457 0 00-1.265 2.29c-.187.36-.38.742-.577 1.146l2.267-.25c.66-.302.955-.578 1.242-.976a15.5 15.5 0 00.23-.342c.23-.363.46-.763.663-1.16.197-.386.37-.767.505-1.11.083-.22.15-.422.198-.6.042-.158.074-.307.1-.45-.884.15-1.965.295-2.668.33zM11.894 7.78l-.077.16c-.078.16-.157.32-.236.488-.086.18-.172.364-.26.552l-.132.287a75.265 75.265 0 00-1.427 3.3c-.163.397-.327.807-.493 1.23-.15.38-.297.765-.45 1.164l-.02.06c-.15.396-.3.802-.453 1.22l-.01.027.72-.08a.213.213 0 01-.042-.006c.863-.106 2.01-.75 2.75-1.547.342-.367.652-.8.94-1.306.213-.377.413-.795.604-1.258.168-.405.328-.843.48-1.318-.196.105-.423.18-.673.235a2.184 2.184 0 01-.273.046c.806-.31 1.314-.905 1.683-1.64a2.816 2.816 0 01-.968.428c-.06.012-.116.022-.174.03l-.043.006h.002c.278-.118.514-.248.718-.403a2.571 2.571 0 00.637-.698l.063-.104.077-.154a8.107 8.107 0 00.367-.85l.03-.088a3.04 3.04 0 00.123-.463.733.733 0 01-.094.065c-.243.145-.66.277-.996.34l.663-.074-.664.073h-.017l-.1.017c.006-.003.01-.006.017-.008l-2.265.25-.013.022zM8.27 16.45c-.117.323-.236.654-.355.992l-.005.015c-.016.046-.032.094-.05.142-.08.227-.15.432-.31.9.264.12.475.435.675.793a1.44 1.44 0 00-.466-.99c1.293.06 2.41-.27 2.99-1.217.05-.084.096-.173.14-.268-.26.333-.59.474-1.2.44 0 0-.004 0-.005.002l.004-.002c.9-.404 1.354-.79 1.754-1.433.094-.153.186-.32.28-.503-.788.81-1.702 1.04-2.664.865l-.72.078a6.43 6.43 0 00-.067.183zM15.42.112c-.376.222-1 .85-1.748 1.763l.686 1.294c.48-.687.97-1.307 1.462-1.836l.058-.062c-.02.02-.04.04-.057.062-.16.176-.644.74-1.375 1.863.703-.035 1.784-.18 2.666-.33.262-1.47-.258-2.142-.258-2.142s-.66-1.07-1.436-.61zm-3.084 6.402a40.253 40.253 0 011.306-2.26l.04-.064c.224-.352.45-.693.677-1.02l-.685-1.293-.157.192c-.197.245-.403.51-.613.79a39.853 39.853 0 00-2.016 2.97l-.022.038.893 1.763c.19-.378.38-.752.575-1.118zm-3.73 8.32c.158-.406.319-.81.483-1.225.156-.394.32-.79.484-1.19a91.133 91.133 0 011.6-3.604l.205-.424c.12-.243.237-.485.36-.724a.125.125 0 01.02-.04l-.895-1.763-.044.07c-.207.34-.414.687-.617 1.042a38.056 38.056 0 00-1.092 2.04l-.094.193a24.573 24.573 0 00-1.258 3.087 18.492 18.492 0 00-.52 1.997l.896 1.77c.117-.317.24-.638.364-.963zm-1.376-.476a13.38 13.38 0 00-.234 1.692c0 .02-.004.04-.005.06-.28-.45-1.03-.888-1.026-.884.537.778.944 1.55 1.005 2.31-.29.058-.684-.027-1.14-.195.475.436.83.556.97.588-.434.03-.89.328-1.346.67.668-.27 1.21-.38 1.596-.29-.61 1.74-1.23 3.655-1.843 5.69a.538.538 0 00.364-.354c.11-.368.84-2.786 1.978-5.965l.097-.27.028-.078c.12-.332.246-.672.374-1.02l.09-.237v-.004L7.24 14.3c-.003.02-.01.04-.012.06z",
  },
  "Palo Alto Networks": {
    hex: "#F04E23",
    path: "m10.278 15.443 1.705 1.705-3.426 3.426-3.427-3.426 8.592-8.591-1.705-1.705 3.426-3.426 3.427 3.426-8.592 8.591zM0 12.017l3.426 3.426 8.591-8.59-3.426-3.427L0 12.017zm11.983 5.13 3.426 3.427L24 11.983l-3.426-3.426-8.591 8.59z",
  },
  "Fortinet": {
    hex: "#EE3124",
    path: "M0 9.785h6.788v4.454H0zm8.666-6.33h6.668v4.453H8.666zm0 12.637h6.668v4.454H8.666zm8.522-6.307H24v4.454h-6.812zM2.792 3.455C1.372 3.814.265 5.404 0 7.425v.506h6.788V3.454zM0 16.091v.554c.24 1.926 1.276 3.466 2.624 3.9h4.188v-4.454zm24-8.184v-.506c-.265-1.998-1.372-3.587-2.792-3.972h-4.02v4.454H24zM21.376 20.57c1.324-.458 2.36-1.974 2.624-3.9v-.554h-6.812v4.454Z",
  },
  "Docker": {
    hex: "#2496ED",
    path: "M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z",
  },
  "Kubernetes": {
    hex: "#326CE5",
    path: "M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .484.606zm-.833-2.129a.44.44 0 0 0 .173-.756l.002-.011L7.585 9.7a5.143 5.143 0 0 0-.73 3.255l2.514-.725.002-.009zm1.145-1.98a.44.44 0 0 0 .699-.337l.01-.005.15-2.62a5.144 5.144 0 0 0-3.01 1.442l2.147 1.523.004-.002zm.76 2.75l.723.349.722-.347.18-.78-.5-.623h-.804l-.5.623.179.779zm1.5-3.095a.44.44 0 0 0 .7.336l.008.003 2.134-1.513a5.188 5.188 0 0 0-2.992-1.442l.148 2.615.002.001zm10.876 5.97l-5.773 7.181a1.6 1.6 0 0 1-1.248.594l-9.261.003a1.6 1.6 0 0 1-1.247-.596l-5.776-7.18a1.583 1.583 0 0 1-.307-1.34L2.1 5.573c.108-.47.425-.864.863-1.073L11.305.513a1.606 1.606 0 0 1 1.385 0l8.345 3.985c.438.209.755.604.863 1.073l2.062 8.955c.108.47-.005.963-.308 1.34zm-3.289-2.057c-.042-.01-.103-.026-.145-.034-.174-.033-.315-.025-.479-.038-.35-.037-.638-.067-.895-.148-.105-.04-.18-.165-.216-.216l-.201-.059a6.45 6.45 0 0 0-.105-2.332 6.465 6.465 0 0 0-.936-2.163c.052-.047.15-.133.177-.159.008-.09.001-.183.094-.282.197-.185.444-.338.743-.522.142-.084.273-.137.415-.242.032-.024.076-.062.11-.089.24-.191.295-.52.123-.736-.172-.216-.506-.236-.745-.045-.034.027-.08.062-.111.088-.134.116-.217.23-.33.35-.246.25-.45.458-.673.609-.097.056-.239.037-.303.033l-.19.135a6.545 6.545 0 0 0-4.146-2.003l-.012-.223c-.065-.062-.143-.115-.163-.25-.022-.268.015-.557.057-.905.023-.163.061-.298.068-.475.001-.04-.001-.099-.001-.142 0-.306-.224-.555-.5-.555-.275 0-.499.249-.499.555l.001.014c0 .041-.002.092 0 .128.006.177.044.312.067.475.042.348.078.637.056.906a.545.545 0 0 1-.162.258l-.012.211a6.424 6.424 0 0 0-4.166 2.003 8.373 8.373 0 0 1-.18-.128c-.09.012-.18.04-.297-.029-.223-.15-.427-.358-.673-.608-.113-.12-.195-.234-.329-.349-.03-.026-.077-.062-.111-.088a.594.594 0 0 0-.348-.132.481.481 0 0 0-.398.176c-.172.216-.117.546.123.737l.007.005.104.083c.142.105.272.159.414.242.299.185.546.338.743.522.076.082.09.226.1.288l.16.143a6.462 6.462 0 0 0-1.02 4.506l-.208.06c-.055.072-.133.184-.215.217-.257.081-.546.11-.895.147-.164.014-.305.006-.48.039-.037.007-.09.02-.133.03l-.004.002-.007.002c-.295.071-.484.342-.423.608.061.267.349.429.645.365l.007-.001.01-.003.129-.029c.17-.046.294-.113.448-.172.33-.118.604-.217.87-.256.112-.009.23.069.288.101l.217-.037a6.5 6.5 0 0 0 2.88 3.596l-.09.218c.033.084.069.199.044.282-.097.252-.263.517-.452.813-.091.136-.185.242-.268.399-.02.037-.045.095-.064.134-.128.275-.034.591.213.71.248.12.556-.007.69-.282v-.002c.02-.039.046-.09.062-.127.07-.162.094-.301.144-.458.132-.332.205-.68.387-.897.05-.06.13-.082.215-.105l.113-.205a6.453 6.453 0 0 0 4.609.012l.106.192c.086.028.18.042.256.155.136.232.229.507.342.84.05.156.074.295.145.457.016.037.043.09.062.129.133.276.442.402.69.282.247-.118.341-.435.213-.71-.02-.039-.045-.096-.065-.134-.083-.156-.177-.261-.268-.398-.19-.296-.346-.541-.443-.793-.04-.13.007-.21.038-.294-.018-.022-.059-.144-.083-.202a6.499 6.499 0 0 0 2.88-3.622c.064.01.176.03.213.038.075-.05.144-.114.28-.104.266.039.54.138.87.256.154.06.277.128.448.173.036.01.088.019.13.028l.009.003.007.001c.297.064.584-.098.645-.365.06-.266-.128-.537-.423-.608zM16.4 9.701l-1.95 1.746v.005a.44.44 0 0 0 .173.757l.003.01 2.526.728a5.199 5.199 0 0 0-.108-1.674A5.208 5.208 0 0 0 16.4 9.7zm-4.013 5.325a.437.437 0 0 0-.404-.232.44.44 0 0 0-.372.233h-.002l-1.268 2.292a5.164 5.164 0 0 0 3.326.003l-1.27-2.296h-.01zm1.888-1.293a.44.44 0 0 0-.27.036.44.44 0 0 0-.214.572l-.003.004 1.01 2.438a5.15 5.15 0 0 0 2.081-2.615l-2.6-.44-.004.005z",
  },
  "Red Hat": {
    hex: "#EE0000",
    path: "M16.009 13.386c1.577 0 3.86-.326 3.86-2.202a1.765 1.765 0 0 0-.04-.431l-.94-4.08c-.216-.898-.406-1.305-1.982-2.093-1.223-.625-3.888-1.658-4.676-1.658-.733 0-.947.946-1.822.946-.842 0-1.467-.706-2.255-.706-.757 0-1.25.515-1.63 1.576 0 0-1.06 2.99-1.197 3.424a.81.81 0 0 0-.028.245c0 1.162 4.577 4.974 10.71 4.974m4.101-1.435c.218 1.032.218 1.14.218 1.277 0 1.765-1.984 2.745-4.593 2.745-5.895.004-11.06-3.451-11.06-5.734a2.326 2.326 0 0 1 .19-.925C2.746 9.415 0 9.794 0 12.217c0 3.969 9.405 8.861 16.851 8.861 5.71 0 7.149-2.582 7.149-4.62 0-1.605-1.387-3.425-3.887-4.512",
  },
  "HashiCorp": {
    hex: "#000000",
    path: "M10.114 4.094 4.215 7.5v13.09L.666 18.542V5.45L10.114 0v4.094zm3.772 13.37 3.549-2.049V2.05L13.885 0v10.426h-3.77v-3.89L6.562 8.585v13.357l3.551 2.054V13.599h3.772v3.865zM19.783 3.41V16.5l-5.897 3.405V24l9.448-5.45V5.458l-3.551-2.05z",
  },
  "Salesforce": {
    hex: "#00A1E0",
    path: "M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.954.9 3.69 2.205.63-.3 1.35-.45 2.1-.45 2.85 0 5.159 2.34 5.159 5.22s-2.31 5.22-5.176 5.22c-.345 0-.69-.044-1.02-.104a3.75 3.75 0 01-3.3 1.95c-.6 0-1.155-.15-1.65-.375A4.314 4.314 0 018.88 20.4a4.302 4.302 0 01-4.05-2.82c-.27.062-.54.076-.825.076-2.204 0-4.005-1.8-4.005-4.05 0-1.5.811-2.805 2.01-3.51-.255-.57-.39-1.2-.39-1.846 0-2.58 2.1-4.65 4.65-4.65 1.53 0 2.85.705 3.72 1.8",
  },
  // Microsoft's mark is four flat squares — exact, and only legible
  // as a brand in color, so it is drawn rather than path-traced.
  "Microsoft": {
    hex: "#737373",
    rects: [
      { x: 1, y: 1, fill: "#F25022" },
      { x: 12.5, y: 1, fill: "#7FBA00" },
      { x: 1, y: 12.5, fill: "#00A4EF" },
      { x: 12.5, y: 12.5, fill: "#FFB900" },
    ],
  },

  // Not published in any openly-licensed icon set — designed
  // lettermark in the brand color. Drop an official SVG in
  // /public/logos/ and set `logo` on the tool to replace it.
  "ServiceNow": { hex: "#62D84E", text: "now" },
  "CrowdStrike": { hex: "#FC0000", text: "CS" },
  "LlamaIndex": { hex: "#6D4AFF", text: "LI" },
  // UiPath publishes only a full wordmark, which is an unreadable
  // smudge at 20px — a lettermark carries the brand better here.
  "UiPath": { hex: "#FA4616", text: "Ui" },
};

/* --------------------------- content ---------------------------- */



const TRACKS = [
  {
    id: "cloud",
    title: "Enterprise Cloud",
    blurb:
      "Build and operate modern cloud environments with hands-on experience across the platforms enterprises rely on to scale securely and efficiently.",
    accent: "#4092f0",
    tint: "linear-gradient(150deg, #eef3ff 0%, #dce7ff 100%)",
    icon: icon.cloud,

    tools: [
      {
        name: "Microsoft",
        logo: "",
        description:
          "Azure, Azure Arc, Landing Zones, governance, FinOps, and cloud migration.",
      },
      {
        name: "Amazon Web Services",
        logo: "",
        description:
          "AWS Cloud, Landing Zones, Organizations, Control Tower, migration, and FinOps.",
      },
      {
        name: "Google Cloud",
        logo: "",
        description:
          "Google Cloud Platform, Landing Zones, cloud governance, and cloud migration.",
      },
      {
        name: "Oracle",
        logo: "",
        description:
          "Oracle Cloud Infrastructure (OCI) for enterprise cloud workloads and infrastructure.",
      },
    ],
  },

  {
    id: "ai-platforms",
    title: "Enterprise AI Platforms",
    blurb:
      "Explore the AI platforms powering modern enterprises — from foundation models and APIs to enterprise AI assistants and infrastructure.",
    accent: "#384ae7",
    tint: "linear-gradient(150deg, #f2efff 0%, #e3ddfb 100%)",
    icon: icon.ai,

    tools: [
      {
        name: "OpenAI",
        logo: "",
        description:
          "ChatGPT, GPT models, APIs, Responses API, Agents SDK, and enterprise AI.",
      },
      {
        name: "Anthropic",
        logo: "",
        description:
          "Claude, Claude Enterprise, Claude API, Claude Code, and computer-use capabilities.",
      },
      {
        name: "NVIDIA",
        logo: "",
        description:
          "NVIDIA AI Enterprise, NIM, and NeMo for enterprise AI infrastructure and development.",
      },
      {
        name: "Meta",
        logo: "",
        description:
          "Llama models and the open AI ecosystem powering enterprise generative AI applications.",
      },
    ],
  },

  {
    id: "ai-engineering",
    title: "AI Engineering",
    blurb:
      "Turn AI capabilities into production-ready systems with practical experience across agents, RAG, model orchestration, and modern AI engineering.",
    accent: "#178ff1",
    tint: "linear-gradient(150deg, #f5f1ff 0%, #e8e0ff 100%)",
    icon: icon.chip,

    tools: [
      {
        name: "LangChain",
        logo: "",
        description:
          "Build applications powered by language models, tools, retrieval, and structured workflows.",
      },
      {
        name: "LangGraph",
        logo: "",
        description:
          "Design stateful, controllable agent workflows and multi-step AI applications.",
      },
      {
        name: "CrewAI",
        logo: "",
        description:
          "Build collaborative multi-agent systems where specialized AI agents work together.",
      },
      {
        name: "LlamaIndex",
        logo: "",
        description:
          "Connect enterprise data with LLM applications through retrieval and data-aware AI systems.",
      },
    ],
  },

  {
    id: "data",
    title: "Data Engineering & Analytics",
    blurb:
      "Build modern data platforms, pipelines, and analytics solutions across the technologies enterprises use to turn data into decisions.",
    accent: "#1493ce",
    tint: "linear-gradient(150deg, #ecfaf7 0%, #d3f1ea 100%)",
    icon: icon.database,

    tools: [
      {
        name: "Databricks",
        logo: "",
        description:
          "A unified data and AI platform for engineering, analytics, machine learning, and lakehouse architectures.",
      },
      {
        name: "Snowflake",
        logo: "",
        description:
          "Snowflake Data Cloud for modern data warehousing, analytics, and enterprise data workloads.",
      },
      {
        name: "Microsoft",
        logo: "",
        description:
          "Microsoft Fabric, Azure Synapse Analytics, and Power BI for integrated data and analytics.",
      },
      {
        name: "Apache",
        logo: "",
        description:
          "Apache Spark, Kafka, Iceberg, and Superset for large-scale data processing and analytics.",
      },
    ],
  },

  {
    id: "cybersecurity",
    title: "Cybersecurity",
    blurb:
      "Develop practical security skills across cloud, identity, threat detection, and enterprise security operations.",
    accent: "#69ade6",
    tint: "linear-gradient(150deg, #edfaf2 0%, #d8f2e2 100%)",
    icon: icon.shield,

    tools: [
      {
        name: "Palo Alto Networks",
        logo: "",
        description:
          "Next-generation firewalls and Prisma Cloud for network and cloud security.",
      },
      {
        name: "Microsoft",
        logo: "",
        description:
          "Microsoft Defender, Sentinel, and Entra for threat protection, security operations, and identity.",
      },
      {
        name: "CrowdStrike",
        logo: "",
        description:
          "Falcon Platform for enterprise endpoint protection, threat detection, and response.",
      },
      {
        name: "Fortinet",
        logo: "",
        description:
          "FortiGate and Fortinet Security Fabric for integrated enterprise network security.",
      },
    ],
  },

  {
    id: "devops",
    title: "DevOps & Platform Engineering",
    blurb:
      "Build reliable delivery pipelines and modern platforms with hands-on practice across containers, automation, infrastructure, and CI/CD.",
    accent: "#2563eb",
    tint: "linear-gradient(150deg, #eff6ff 0%, #dbeafe 100%)",
    icon: icon.devops,

    tools: [
      {
        name: "Docker",
        logo: "",
        description:
          "Containerize applications and create consistent environments across development and deployment.",
      },
      {
        name: "Kubernetes",
        logo: "",
        description:
          "Orchestrate containerized applications and operate scalable cloud-native platforms.",
      },
      {
        name: "Red Hat",
        logo: "",
        description:
          "OpenShift and Ansible for enterprise Kubernetes platforms and infrastructure automation.",
      },
      {
        name: "HashiCorp",
        logo: "",
        description:
          "Terraform, Vault, and Consul for infrastructure provisioning, secrets, and service networking.",
      },
    ],
  },

  {
    id: "enterprise-applications",
    title: "Enterprise Applications",
    blurb:
      "Modernize enterprise workflows with platforms for business applications, automation, low-code development, and intelligent operations.",
    accent: "#155580",
    tint: "linear-gradient(150deg, #effbf3 0%, #d9f4e2 100%)",
    icon: icon.applications,

    tools: [
      {
        name: "Microsoft",
        logo: "",
        description:
          "Power Platform, Power Apps, Power Automate, Power BI, and Copilot Studio.",
      },
      {
        name: "ServiceNow",
        logo: "",
        description:
          "ServiceNow Platform for enterprise workflows, IT operations, and business process automation.",
      },
      {
        name: "Salesforce",
        logo: "",
        description:
          "Salesforce Platform and Agentforce for CRM, enterprise applications, and AI-powered workflows.",
      },
      {
        name: "UiPath",
        logo: "",
        description:
          "UiPath Automation Platform for intelligent automation and enterprise process transformation.",
      },
    ],
  },
];


/* --------------------------- helpers ---------------------------- */

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
    return () =>
      mq.removeEventListener ? mq.removeEventListener("change", onChange) : mq.removeListener(onChange);
  }, []);
  return reduced;
}

/**
 * BrandMark — resolves a tool to its logo, in priority order:
 *   1. tool.logo         → an <img> you dropped in /public/logos/
 *   2. BRANDS[].rects    → multi-color flat mark (Microsoft)
 *   3. BRANDS[].path     → single-path mark in the official brand color
 *   4. BRANDS[].text     → designed lettermark where no open asset exists
 *   5. initials          → last-resort fallback for a tool not in BRANDS
 */
function BrandMark({ name, logo, size }) {
  const brand = BRANDS[name] || {};
  const hex = brand.hex || "#475569";
  const [imgOk, setImgOk] = useState(Boolean(logo));
  const useImg = Boolean(logo) && imgOk;

  return (
    <span
      className={size === "lg" ? "c4g-eco-glyph lg" : "c4g-eco-glyph"}
      aria-hidden="true"
    >
      {useImg ? (
        <img src={logo} alt="" loading="lazy" decoding="async" onError={() => setImgOk(false)} />
      ) : brand.rects ? (
        <svg viewBox="0 0 24 24" role="presentation">
          {brand.rects.map((r) => (
            <rect key={r.fill} x={r.x} y={r.y} width="10.5" height="10.5" fill={r.fill} />
          ))}
        </svg>
      ) : brand.path ? (
        <svg viewBox="0 0 24 24" fill={hex} role="presentation">
          <path d={brand.path} />
        </svg>
      ) : (
        <span
          className={brand.text && brand.text.length > 2 ? "c4g-eco-letter long" : "c4g-eco-letter"}
          style={{ color: hex }}
        >
          {brand.text || name.replace(/[^A-Za-z ]/g, "").slice(0, 2).toUpperCase()}
        </span>
      )}
    </span>
  );
}

const brandHex = (name) => (BRANDS[name] || {}).hex || "#475569";

/* --------------------------- tool chip -------------------------- */

/**
 * ToolChip — the collapsed grid item.
 *
 * Two layers of disclosure:
 *   hover → a small hint popover with the tool's description (mouse only,
 *           180ms delay so sweeping across the 2×2 grid doesn't flash it)
 *   click → the chip morphs into the full panel via a shared `layoutId`
 *
 * While the panel is open this slot renders a hidden clone of the chip so
 * the grid keeps its shape — the real chip has been handed to the panel.
 */
function ToolChip({ tool, uid, isOpen, onOpen, entrance, reduced, spring }) {
  const [hint, setHint] = useState(false);
  const timer = useRef(null);
  const hex = brandHex(tool.name);

  const showHint = (e) => {
    if (e && e.pointerType && e.pointerType !== "mouse") return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setHint(true), 180);
  };
  const hideHint = () => {
    clearTimeout(timer.current);
    setHint(false);
  };
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (isOpen) hideHint();
  }, [isOpen]);

  const inner = (
    <>
      <span className="c4g-eco-mark" style={{ background: `${hex}12` }}>
        <BrandMark name={tool.name} logo={tool.logo} />
      </span>
      <span className="c4g-eco-chipname">{tool.name}</span>
    </>
  );

  return (
    <motion.div
      className="c4g-eco-slot"
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduced ? { duration: 0 } : { duration: 0.45, delay: entrance, ease: [0.3, 0.7, 0.3, 1] }}
      onPointerEnter={showHint}
      onPointerLeave={hideHint}
    >
      {isOpen ? (
        /* placeholder — holds the grid cell while the panel is open */
        <div className="c4g-eco-chip" aria-hidden="true" style={{ visibility: "hidden" }}>
          {inner}
        </div>
      ) : (
        <motion.button
          type="button"
          className="c4g-eco-chip"
          layoutId={uid}
          transition={spring}
          onClick={onOpen}
          onFocus={() => setHint(true)}
          onBlur={hideHint}
          aria-expanded={false}
          aria-label={`${tool.name} — ${tool.description}`}
          whileHover={reduced ? undefined : { y: -2 }}
          whileTap={reduced ? undefined : { scale: 0.985 }}
          style={{ "--c4g-eco-brand": hex }}
        >
          <motion.span className="c4g-eco-markwrap" layoutId={`${uid}-mark`} transition={spring}>
            <span className="c4g-eco-mark" style={{ background: `${hex}12` }}>
              <BrandMark name={tool.name} logo={tool.logo} />
            </span>
          </motion.span>
          <span className="c4g-eco-chipname">{tool.name}</span>
        </motion.button>
      )}

      <AnimatePresence>
        {hint && !isOpen && (
          <motion.span
            className="c4g-eco-hint"
            role="tooltip"
            initial={{ opacity: 0, y: 6, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 4, x: "-50%" }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {tool.description}
            <span className="c4g-eco-hintmore">Click for more</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------- expanded panel ----------------------- */

function ToolPanel({ tool, uid, track, onClose, spring, reduced }) {
  const closeRef = useRef(null);
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  const hex = brandHex(tool.name);

  return (
    <motion.div
      className="c4g-eco-panel"
      layoutId={uid}
      transition={spring}
      role="dialog"
      aria-modal="true"
      aria-label={tool.name}
      style={{ "--c4g-eco-brand": hex }}
      onClick={(e) => e.stopPropagation()}
    >
      <motion.span className="c4g-eco-markwrap lg" layoutId={`${uid}-mark`} transition={spring}>
        <span className="c4g-eco-mark lg" style={{ background: `${hex}12` }}>
          <BrandMark name={tool.name} logo={tool.logo} size="lg" />
        </span>
      </motion.span>

      <motion.div
        className="c4g-eco-panelbody"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={reduced ? { duration: 0 } : { duration: 0.28, delay: 0.1, ease: "easeOut" }}
      >
        <span className="c4g-eco-paneltrack">{track.title}</span>
        <h3 className="c4g-eco-paneltitle">{tool.name}</h3>
        <p className="c4g-eco-paneltext">{tool.description}</p>
        <Link className="c4g-eco-panellink" to="/products/enterprise-training#skills-catalog">
          Explore {track.title}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </motion.div>

      <motion.button
        ref={closeRef}
        type="button"
        className="c4g-eco-close"
        onClick={onClose}
        aria-label={`Close ${tool.name}`}
        initial={reduced ? false : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={reduced ? { duration: 0 } : { duration: 0.2, delay: 0.12 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </motion.button>
    </motion.div>
  );
}

/* --------------------------- component -------------------------- */

export default function EnterpriseEcosystem() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [openTool, setOpenTool] = useState(null);
  const reduced = useReducedMotion();
  const track = TRACKS[active];

  const spring = reduced
    ? { duration: 0 }
    : { type: "spring", stiffness: 340, damping: 34, mass: 0.9 };

  const openedTool = openTool ? track.tools.find((t) => t.name === openTool) : null;
  const uidFor = (name) => `c4g-eco-${track.id}-${name.replace(/\s+/g, "-")}`;

  // autoplay — also held while a tool panel is open
  useEffect(() => {
    if (paused || reduced || openTool) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % TRACKS.length), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [active, paused, reduced, openTool]);

  // a panel belongs to one track, so switching tracks dismisses it
  useEffect(() => {
    setOpenTool(null);
  }, [active]);

  // Escape dismisses the panel
  useEffect(() => {
    if (!openTool) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpenTool(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openTool]);

  return (
    <section
      className="c4g-eco"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <style>{`
        .c4g-eco { padding: 96px 0; }
        .c4g-eco-head { max-width: 640px; margin-bottom: 56px; }
        .c4g-eco-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: #64748b; margin-bottom: 16px;
        }
        .c4g-eco-eyebrow::before {
          content: ""; width: 8px; height: 8px; border-radius: 9999px; background: #2f52ec;
        }
        .c4g-eco-h2 {
          font-size: clamp(28px, 4vw, 44px); line-height: 1.1;
          font-weight: 600; letter-spacing: -0.02em; color: #0f172a;
        }
        .c4g-eco-sub { margin-top: 16px; font-size: 17px; line-height: 1.6; color: #64748b; }

        .c4g-eco-grid2 {
          display: grid; grid-template-columns: minmax(0, 1fr); gap: 48px; align-items: center;
        }
        .c4g-eco-grid2 > * { min-width: 0; }
        @media (min-width: 1024px) {
          .c4g-eco-grid2 { grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: 80px; }
        }

        /* ------------ accordion ------------ */
        .c4g-eco-item { position: relative; }
        .c4g-eco-btn {
          all: unset; box-sizing: border-box; cursor: pointer; display: block;
          width: 100%; padding: 18px 16px 18px 24px; position: relative;
        }
        .c4g-eco-btn:focus-visible { outline: 2px solid #2f52ec; outline-offset: 2px; border-radius: 8px; }
        .c4g-eco-title {
          font-size: 19px; font-weight: 600; color: #0f172a; letter-spacing: -0.01em;
          transition: color 0.25s ease;
        }
        .c4g-eco-item:not(.open) .c4g-eco-btn:hover .c4g-eco-title { color: #2f52ec; }

        /* rail + progress */
        .c4g-eco-rail {
          position: absolute; left: 0; top: 10px; bottom: 10px; width: 3px;
          border-radius: 9999px; background: #e2e8f0; overflow: hidden;
        }
        .c4g-eco-item.open .c4g-eco-rail { top: 6px; bottom: 6px; }
        .c4g-eco-progress {
          position: absolute; inset: 0; border-radius: 9999px;
          background: var(--c4g-eco-accent, #2f52ec);
          transform-origin: top; transform: scaleY(0);
          animation: c4g-eco-fill linear forwards;
        }
        .c4g-eco-progress.static { animation: none; transform: scaleY(1); }

        /* expanding body (grid-rows trick) */
        .c4g-eco-body {
          display: grid; grid-template-rows: 0fr;
          transition: grid-template-rows 0.45s cubic-bezier(0.3, 0.7, 0.3, 1);
        }
        .c4g-eco-item.open .c4g-eco-body { grid-template-rows: 1fr; }
        .c4g-eco-bodyin { overflow: hidden; }
        .c4g-eco-blurb {
          margin: 0; padding: 0 16px 6px 24px;
          font-size: 15px; line-height: 1.65; color: #64748b; max-width: 44ch;
        }
        .c4g-eco-link {
          display: inline-flex; align-items: center; gap: 6px;
          margin: 10px 16px 20px 24px; font-size: 14px; font-weight: 600;
          color: #2f52ec; cursor: pointer; text-decoration: none;
        }
        .c4g-eco-link:hover { text-decoration: underline; }

        /* ------------ visual card ------------ */

        .c4g-eco-visual {
          position: relative;
          padding: 32px 0 0 32px;
        }

        .c4g-eco-card {
          position: relative;
          border-radius: 32px;
          padding: 64px 48px 48px;
          min-height: 520px;
          display: flex;
          align-items: center;

          animation: c4g-eco-cardin 0.5s cubic-bezier(0.3, 0.7, 0.3, 1) both;
        }
        .c4g-eco-badge {
          position: absolute; top: -24px; left: -24px; width: 72px; height: 72px;
          border-radius: 9999px; background: #fff; z-index: 5;
          /* stays visible above the scrim, but must not swallow the
             click-outside-to-dismiss in that corner */
          pointer-events: none;
          box-shadow: 0 12px 32px rgba(15, 42, 85, 0.14), 0 2px 8px rgba(15, 42, 85, 0.08);
          display: flex; align-items: center; justify-content: center;
          animation: c4g-eco-cardin 0.5s cubic-bezier(0.3, 0.7, 0.3, 1) both;
        }
        .c4g-eco-badge svg { width: 34px; height: 34px; }

        .c4g-eco-tools {
          display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 14px; width: 100%; min-width: 0;
        }
        .c4g-eco-slot { position: relative; min-width: 0; }

        .c4g-eco-chip {
          appearance: none; font: inherit; text-align: left; cursor: pointer;
          display: flex; align-items: center; gap: 12px;
          width: 100%; min-width: 0; box-sizing: border-box;
          background: #fff; border: 1px solid rgba(15, 42, 85, 0.08);
          border-radius: 16px; padding: 14px 18px;
          box-shadow: 0 4px 14px rgba(15, 42, 85, 0.06);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        button.c4g-eco-chip:hover {
          border-color: color-mix(in srgb, var(--c4g-eco-brand) 40%, transparent);
          box-shadow: 0 10px 26px rgba(15, 42, 85, 0.13);
        }
        button.c4g-eco-chip:focus-visible {
          outline: 2px solid var(--c4g-eco-brand); outline-offset: 3px;
        }

        /* ------------ brand mark ------------ */
        .c4g-eco-markwrap { flex: none; display: block; }
        .c4g-eco-mark {
          width: 34px; height: 34px; border-radius: 10px; flex: none;
          display: flex; align-items: center; justify-content: center;
        }
        .c4g-eco-mark.lg { width: 62px; height: 62px; border-radius: 18px; }
        .c4g-eco-glyph { display: flex; align-items: center; justify-content: center; }
        .c4g-eco-glyph svg, .c4g-eco-glyph img { width: 20px; height: 20px; display: block; }
        .c4g-eco-glyph img { object-fit: contain; }
        .c4g-eco-glyph.lg svg, .c4g-eco-glyph.lg img { width: 34px; height: 34px; }
        .c4g-eco-letter {
          font-size: 13px; font-weight: 800; letter-spacing: -0.01em; line-height: 1;
        }
        .c4g-eco-letter.long { font-size: 10.5px; letter-spacing: -0.02em; }
        .c4g-eco-glyph.lg .c4g-eco-letter { font-size: 22px; }
        .c4g-eco-glyph.lg .c4g-eco-letter.long { font-size: 17px; }

        .c4g-eco-chipname {
          font-size: 15px; font-weight: 600; color: #0f172a; letter-spacing: -0.01em;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        /* ------------ hover hint ------------ */
        .c4g-eco-hint {
          position: absolute; bottom: calc(100% + 12px); left: 50%;
          z-index: 6; width: max-content; max-width: 250px;
          background: #0f172a; color: #e2e8f0;
          font-size: 12.5px; line-height: 1.5; letter-spacing: -0.005em;
          padding: 10px 13px; border-radius: 12px;
          box-shadow: 0 12px 30px rgba(15, 42, 85, 0.28);
          pointer-events: none;
        }
        .c4g-eco-hint::after {
          content: ""; position: absolute; top: 100%; left: 50%;
          margin-left: -5px; border: 5px solid transparent; border-top-color: #0f172a;
        }
        .c4g-eco-hintmore {
          display: block; margin-top: 6px; font-size: 11px; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase; color: #7c8db0;
        }
        /* touch devices have no hover — never show the hint there */
        @media (hover: none) { .c4g-eco-hint { display: none; } }

        /* ------------ expanded panel ------------ */
        .c4g-eco-scrim {
          position: absolute; inset: 0; z-index: 3;
          border-radius: 32px; background: rgba(8, 22, 45, 0.34);
          backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px);
          cursor: pointer;
        }
        .c4g-eco-panel {
          position: absolute; z-index: 4; inset: 28px;
          display: flex; flex-direction: column; justify-content: center; gap: 22px;
          background: #fff; border-radius: 26px; padding: 40px;
          box-shadow: 0 30px 70px rgba(8, 22, 45, 0.3);
          overflow-y: auto;
        }
        .c4g-eco-paneltrack {
          display: block; font-size: 11.5px; font-weight: 600; letter-spacing: 0.13em;
          text-transform: uppercase; color: #64748b; margin-bottom: 10px;
        }
        .c4g-eco-paneltitle {
          margin: 0 0 12px; font-size: clamp(22px, 2.4vw, 30px); line-height: 1.15;
          font-weight: 600; letter-spacing: -0.02em; color: #0f172a;
        }
        .c4g-eco-paneltext {
          margin: 0; font-size: 16px; line-height: 1.65; color: #475569; max-width: 46ch;
        }
        .c4g-eco-panellink {
          display: inline-flex; align-items: center; gap: 6px; margin-top: 20px;
          font-size: 14px; font-weight: 600; color: #2f52ec; text-decoration: none;
        }
        .c4g-eco-panellink:hover { text-decoration: underline; }
        .c4g-eco-close {
          appearance: none; position: absolute; top: 18px; right: 18px;
          width: 34px; height: 34px; border-radius: 9999px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          background: #f1f5f9; border: none; color: #475569;
          transition: background 0.18s ease, color 0.18s ease;
        }
        .c4g-eco-close:hover { background: #e2e8f0; color: #0f172a; }
        .c4g-eco-close:focus-visible { outline: 2px solid #2f52ec; outline-offset: 2px; }

        @media (max-width: 640px) {
          .c4g-eco { padding: 64px 0; }
          .c4g-eco-visual { padding: 24px 0 0 8px; }
          .c4g-eco-card { padding: 44px 16px 16px; min-height: 330px; }
          .c4g-eco-chip { padding: 10px 12px; border-radius: 14px; gap: 9px; }
          .c4g-eco-mark { width: 28px; height: 28px; border-radius: 8px; }
          .c4g-eco-mark.lg { width: 50px; height: 50px; border-radius: 15px; }
          .c4g-eco-glyph svg, .c4g-eco-glyph img { width: 17px; height: 17px; }
          .c4g-eco-glyph.lg svg, .c4g-eco-glyph.lg img { width: 27px; height: 27px; }
          .c4g-eco-letter { font-size: 11px; }
          .c4g-eco-letter.long { font-size: 9px; }
          .c4g-eco-glyph.lg .c4g-eco-letter { font-size: 18px; }
          .c4g-eco-chipname { font-size: 12.5px; white-space: normal; line-height: 1.25; }
          .c4g-eco-scrim { border-radius: 24px; }
          .c4g-eco-panel { inset: 12px; padding: 24px 22px; border-radius: 20px; gap: 16px; }
          .c4g-eco-paneltext { font-size: 14.5px; }
        }

        @keyframes c4g-eco-fill { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes c4g-eco-cardin {
          from { opacity: 0; transform: translateY(14px) scale(0.985); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .c4g-eco-body { transition: none; }
          .c4g-eco-card, .c4g-eco-badge { animation: none; }
        }
      `}</style>

      {/* section header */}
      <RevealGroup delay={CUE.lead} className="c4g-eco-head">
        <RevealItem as="span" className="block text-sm font-bold uppercase tracking-[0.18em] text-blue-600">Learning Tracks</RevealItem>
        <RevealItem as="h2" className="c4g-eco-h2">Real tools. Real environments.</RevealItem>
        <RevealItem as="p" className="c4g-eco-sub">
          Every track is built around the platforms your teams work with every
          day — practiced hands-on, not just explained.
        </RevealItem>
      </RevealGroup>

      <div className="c4g-eco-grid2">
        {/* left — accordion */}
        <RevealGroup delay={CUE.follow}>
          {TRACKS.map((t, i) => {
            const open = i === active;
            return (
              <RevealItem key={t.id} className={open ? "c4g-eco-item open" : "c4g-eco-item"}>
                <button
                  type="button"
                  className="c4g-eco-btn"
                  aria-expanded={open}
                  aria-controls={`c4g-eco-panel-${t.id}`}
                  onClick={() => setActive(i)}
                >
                  <span className="c4g-eco-rail" style={{ "--c4g-eco-accent": t.accent }}>
                    {open &&
                      (reduced ? (
                        <span className="c4g-eco-progress static" />
                      ) : (
                        <span
                          className="c4g-eco-progress"
                          style={{
                            animationDuration: `${AUTOPLAY_MS}ms`,
                            animationPlayState: paused || openTool ? "paused" : "running",
                          }}
                        />
                      ))}
                  </span>
                  <span className="c4g-eco-title">{t.title}</span>
                </button>

                <div id={`c4g-eco-panel-${t.id}`} className="c4g-eco-body" role="region" aria-label={t.title}>
                  <div className="c4g-eco-bodyin">
                    <p className="c4g-eco-blurb">{t.blurb}</p>
                    <Link className="c4g-eco-link" to="/products/enterprise-training#skills-catalog">
                      Explore {t.title}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* right — swapping visual card */}
        <Reveal delay={CUE.trail} className="c4g-eco-visual">
          <div key={track.id} className="c4g-eco-card" style={{ background: track.tint }}>
            <div className="c4g-eco-badge" style={{ color: track.accent }}>
              {track.icon}
            </div>

            <div className="c4g-eco-tools">
              {track.tools.map((tool, j) => (
                <ToolChip
                  key={tool.name}
                  tool={tool}
                  uid={uidFor(tool.name)}
                  isOpen={openTool === tool.name}
                  onOpen={() => setOpenTool(tool.name)}
                  entrance={0.06 * j + 0.12}
                  reduced={reduced}
                  spring={spring}
                />
              ))}
            </div>

            <AnimatePresence>
              {openedTool && (
                <motion.div
                  key="scrim"
                  className="c4g-eco-scrim"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.24 }}
                  onClick={() => setOpenTool(null)}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {openedTool && (
                <ToolPanel
                  key="panel"
                  tool={openedTool}
                  uid={uidFor(openedTool.name)}
                  track={track}
                  onClose={() => setOpenTool(null)}
                  spring={spring}
                  reduced={reduced}
                />
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}