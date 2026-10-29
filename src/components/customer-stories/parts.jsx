import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

/* Small pieces shared by the /customers and /whats-new sections. Same
   drawings as the consulting page's own copies, kept here so the
   sections don't each carry one. */

/** The brand asterisk, as it appears on every section eyebrow. */
export function Asterisk({ className = "h-3.5 w-3.5", stroke = "stroke-[#0B5CFF]" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      strokeWidth="2.4"
      strokeLinecap="round"
      className={`shrink-0 ${stroke} ${className}`}
    >
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
    </svg>
  );
}

/** House arrow; slides on its parent's hover. */
export function Arrow({ className = "" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-3.5 w-3.5 shrink-0 stroke-current transition-transform duration-300 ${className}`}
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

/** Eyebrow line: asterisk + uppercase label in brand blue. */
export function Eyebrow({ children, className = "" }) {
  return (
    <span
      className={`flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0B5CFF] ${className}`}
    >
      <Asterisk />
      {children}
    </span>
  );
}

/**
 * The filter row: one pill per option, the selected one in ink.
 *
 * Every pill has a real 1px border, the selected one included (in ink, so
 * it's invisible against its own fill), so selecting never changes a
 * pill's size. A ring would be a box-shadow, and the sideways scroller on
 * a phone clips shadows — that's what sliced the tops off before. The
 * scroller also gets a few px of vertical padding, pulled back with an
 * equal negative margin, so the focus outline has room too.
 */
export function FilterChips({ label, options, value, onChange, delay = 0 }) {
  return (
    <RevealGroup
      delay={delay}
      className="-mx-5 -my-2 overflow-x-auto px-5 py-2 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
    >
      <div role="group" aria-label={label} className="flex w-max gap-2 lg:w-auto lg:flex-wrap lg:justify-end">
        {options.map((o) => {
          const on = o === value;
          return (
            <RevealItem key={o}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => onChange(o)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-[13.5px] font-medium leading-none transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B5CFF] ${
                  on
                    ? "border-[#101418] bg-[#101418] text-white"
                    : "border-[#101418]/12 bg-white text-[#4A5261] hover:border-[#101418]/30 hover:text-[#101418]"
                }`}
              >
                {o}
              </button>
            </RevealItem>
          );
        })}
      </div>
    </RevealGroup>
  );
}

/** Industry / product tag on a story. */
export function Tag({ children, tone = "light" }) {
  return (
    <span
      className={
        tone === "dark"
          ? "inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/85"
          : "inline-flex items-center rounded-full border border-[#101418]/10 bg-white px-2.5 py-1 text-[11px] font-medium text-[#4A5261]"
      }
    >
      {children}
    </span>
  );
}
