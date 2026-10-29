/**
 * The Microsoft Bookings page, embedded on the contact card.
 *
 * Bookings is a plain cross-origin iframe — there is no loader script and no
 * embed API, which changes three things from a scripted embed:
 *
 *   Theme      not ours to set. The page renders in the tenant's own Bookings
 *              styling and nothing crosses the origin boundary, so the card
 *              around it does the matching instead: white ground, our radius,
 *              our hairline. Don't reach for cssVars here — there is nothing
 *              listening.
 *   Height     the frame never reports its size back, so the container cannot
 *              grow to fit the way a measured embed does. It is given a fixed
 *              height tall enough for the service list and the month grid, and
 *              Bookings scrolls its own overflow inside that. One scrollbar,
 *              which is the best this integration can do.
 *   Load cost  no third-party JavaScript at all now. Native loading="lazy" is
 *              enough on its own — the browser holds the request until the
 *              frame is near the viewport, so no IntersectionObserver.
 *
 * HTTPS IS NOT OPTIONAL HERE. Bookings answers with
 *
 *     Content-Security-Policy: frame-ancestors https:
 *
 * — a scheme-source admitting any HTTPS origin and refusing every HTTP one. The
 * calendar is therefore blocked on a plain `npm run dev` and renders fine in
 * production, which is the opposite of the usual order of discovery. Use
 * `npm run dev:https` to see it locally; see the note in vite.config.js.
 *
 * The direct link under the frame is the escape hatch, and it is always
 * rendered rather than error-detected: a refused frame gives the parent nothing
 * reliable to branch on, by design.
 */

/**
 * The published Bookings page URL.
 *
 * Copied verbatim from the Bookings admin → Integrations → the embed snippet.
 * Take it from there rather than writing it by hand, because the wrong shape
 * fails silently:
 *
 *   /book/<page>@<tenant>/              ← current, what Integrations gives you
 *   /owa/calendar/<page>@<tenant>/bookings/   ← legacy, still in older MS docs
 *
 * The legacy path does not 404. It serves an empty Bookings shell, which is
 * indistinguishable from a calendar that has no services configured — so a
 * hand-assembled URL sends you off debugging the wrong problem entirely.
 *
 * ?ismsaljsauthenabled is Microsoft's own flag, kept as handed over: it lets a
 * visitor already signed in to a work account have their details prefilled.
 */
const BOOKINGS_URL =
  "https://bookings.cloud.microsoft/book/Cloud4Green@cloud4green.com/?ismsaljsauthenabled";

/**
 * Brand asterisk mark — matches the hero and closing CTA treatment.
 */
function Asterisk({ className = "h-3.5 w-3.5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      strokeWidth="2.4"
      strokeLinecap="round"
      className={`shrink-0 stroke-[#0B5CFF] ${className}`}
    >
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
    </svg>
  );
}

/**
 * Branded skeleton loader that matches the site's aesthetic.
 * Uses the cream ground with brand-colored shimmer bars.
 */
function BookingSkeleton() {
  return (
    <div aria-hidden="true" className="absolute inset-0 bg-white overflow-hidden">
      {/* Cream base matching the page ground */}
      <div className="absolute inset-0 bg-[#FAFAF7]" />

      {/* Subtle brand accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0B5CFF] via-[#00804C] to-[#DBE64C]" />

      {/* Shimmer bars — branded colors, staggered */}
      <div className="absolute inset-0 -translate-x-full" style={{ animation: "shimmer 2s ease-in-out infinite" }}>
        <div className="absolute top-[15%] left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#0B5CFF]/20 to-transparent" />
        <div className="absolute top-[35%] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00804C]/15 to-transparent" style={{ animationDelay: "0.3s" }} />
        <div className="absolute top-[55%] left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#DBE64C]/25 to-transparent" style={{ animationDelay: "0.6s" }} />
        <div className="absolute top-[75%] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0B5CFF]/15 to-transparent" style={{ animationDelay: "0.9s" }} />
      </div>

      {/* Calendar grid suggestion — faint rectangles */}
      <div className="absolute inset-0 p-6 pointer-events-none">
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-10 rounded-[8px] bg-gradient-to-r from-[#101418]/3 via-transparent to-[#101418]/3 animate-pulse"
              style={{ opacity: 0.06 + i * 0.02 }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

/**
 * `frameClassName` is appended to the frame box, and it exists for exactly one
 * caller: the contact page, which sits this beside a form card and wants the
 * two to end level. Matching a neighbour means the frame has to be able to
 * *shrink* as well as grow, and the height below is a fixed value rather than a
 * floor — so the override has to reach the box itself. It appends rather than
 * replaces so the fixed height stays the default at every width the caller
 * doesn't speak for.
 */
export default function BookingEmbed({
  bookingsUrl = BOOKINGS_URL,
  className = "",
  frameClassName = "",
}) {
  return (
    <div className={className}>
      <div
        className={`relative h-[680px] w-full overflow-hidden rounded-[12px] border border-[#101418]/10 sm:h-[760px] ${frameClassName}`}
      >
        <BookingSkeleton />

        {/* Pinned to the box rather than sized at 100%: under an override the
            box's height comes from flex, and an absolute fill resolves against
            that without needing a definite height to take a percentage of. */}
        <iframe
          src={bookingsUrl}
          title="Book a slot with Cloud4Green"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>

      {/* Fallback link — styled like the site's secondary CTAs */}
      <div className="mt-6 flex shrink-0 items-center gap-3">
        <Asterisk className="h-4 w-4 shrink-0 text-[#0B5CFF]/60" />
        <a
          href={bookingsUrl}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 text-[13px] leading-6 font-medium text-[#101418]/60 transition-colors hover:text-[#0B5CFF]"
        >
          Calendar not loading? Open the booking page in a new tab
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 shrink-0 stroke-current transition-transform group-hover:translate-x-0.5"
          >
            <path d="m7 5 6 7-6 7M13 5l6 7-6 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}