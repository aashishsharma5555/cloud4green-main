


import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1];

export default function MegaMenu({ mega, rounded = false, onClose }) {
  const active = mega.categories[0];

  /* `height: auto` in a Framer animation is a layout read every frame, and
     it can only animate between the two heights it knows about at the time
     — which is why swapping content mid-open used to snap. Measuring the
     content ourselves gives a real number to animate to, and a
     ResizeObserver keeps that number right when the content changes under
     an already-open panel. */
  const innerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const measure = () =>
      setHeight((h) => (Math.abs(h - el.offsetHeight) > 0.5 ? el.offsetHeight : h));

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [mega]);

  /* Images inside the promos land after first paint and make the panel
     taller; without this the measured height is the pre-image one. */
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const imgs = [...el.querySelectorAll("img")].filter((i) => !i.complete);
    if (!imgs.length) return;

    const bump = () => setHeight(el.offsetHeight);
    imgs.forEach((i) => i.addEventListener("load", bump, { once: true }));
    return () => imgs.forEach((i) => i.removeEventListener("load", bump));
  }, [mega]);

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height, opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.28, ease: EASE }}
      className={cn(
        "overflow-hidden bg-background shadow-lg",
        rounded ? "rounded-2xl border" : "border-b"
      )}
    >
      <div ref={innerRef}>
        <div className="relative mx-auto max-w-[1240px] px-8 py-10 lg:px-12 lg:py-12">
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="absolute right-6 top-5 rounded-md p-1.5 text-muted-foreground transition hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Keyed, so React swaps it and `initial` replays: the new panel
              contents fade up while the box around them resizes. The box is
              what carries the continuity — this only has to arrive. */}
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="mx-auto max-w-[1080px]"
          >
            <div className="max-w-2xl">
              <h3 className="text-xl font-semibold">{active.title}</h3>

              {active.subtitle && (
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {active.subtitle}
                </p>
              )}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-x-10 gap-y-7">
              {active.items.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className="group block"
                >
                  <h4 className="text-[15px] font-semibold underline-offset-3 transition-colors group-hover:text-primary group-hover:underline">
                    {item.title}
                  </h4>

                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>

            {active.promos?.length > 0 && (
              <div className="mt-10 grid grid-cols-2 gap-5">
                {active.promos.map((p) => (
                  <Link
                    key={p.href}
                    to={p.href}
                    onClick={onClose}
                    className="flex items-center gap-4 rounded-xl bg-muted/60 p-3.5 transition hover:bg-muted"
                  >
                    <img
                      src={p.image}
                      alt=""
                      width={110}
                      height={74}
                      /* Intrinsic size on the tag, so the panel measures its
                         real height on the first pass instead of growing
                         once the image decodes. */
                      className="h-[74px] w-[110px] flex-none rounded-lg object-cover"
                    />

                    <span>
                      <span className="block text-sm font-semibold">
                        {p.title}
                      </span>

                      <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                        {p.description}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}