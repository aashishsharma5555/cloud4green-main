// import { Button as ButtonPrimitive } from "@base-ui/react/button"
// import { cva } from "class-variance-authority";

// import { cn } from "@/lib/utils"

// const buttonVariants = cva(
//   "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
//   {
//     variants: {
//       variant: {
//         default: "bg-primary text-primary-foreground hover:bg-primary/80",
//         outline:
//           "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
//         secondary:
//           "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
//         ghost:
//           "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
//         destructive:
//           "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
//         link: "text-primary underline-offset-4 hover:underline",
//       },
//       size: {
//         default:
//           "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
//         xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
//         sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
//         lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
//         icon: "size-8",
//         "icon-xs":
//           "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
//         "icon-sm":
//           "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
//         "icon-lg": "size-9",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// )

// function Button({
//   className,
//   variant = "default",
//   size = "default",
//   ...props
// }) {
//   return (
//     <ButtonPrimitive
//       data-slot="button"
//       className={cn(buttonVariants({ variant, size, className }))}
//       {...props} />
//   );
// }

// export { Button, buttonVariants }

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva } from "class-variance-authority";
import { ChevronsRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * The CTA treatment: a solid accent fill with a hairline white inner border, a
 * 1px ring in the accent colour just outside it, and a soft dark gradient
 * falling across the lower-right corner. Every accent-coloured piece reads from
 * --btn-accent / --btn-accent-hover / --btn-accent-glow, so a variant only has
 * to redefine those three tokens.
 */
const ctaSurface = [
  "bg-[color:var(--btn-accent)]",
  "bg-[image:linear-gradient(149deg,rgba(9,14,25,0)_37%,rgba(9,14,25,0.2)_116%)]",
  "shadow-[0_0_0_1px_var(--btn-accent)]",
  "hover:bg-[color:var(--btn-accent-hover)]",
  "hover:shadow-[0_0_0_1px_var(--btn-accent-hover),0_10px_24px_-10px_var(--btn-accent-glow)]",
  "hover:-translate-y-px",
].join(" ");

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

  {
    variants: {
      variant: {
        // Accent-blue CTA — the primary look.
        default: cn(
          "[--btn-accent:var(--brand-blue)] [--btn-accent-hover:var(--brand-blue-hover)] [--btn-accent-glow:var(--brand-blue-glow)]",
          "[--btn-arrow-bg:#ffffff] [--btn-arrow-fg:var(--brand-blue)]",
          "border-white/70 text-white",
          ctaSurface
        ),

        // Near-black CTA with a blue arrow chip.
        ink: cn(
          "[--btn-accent:var(--brand-ink)] [--btn-accent-hover:var(--brand-ink-hover)] [--btn-accent-glow:rgba(16,20,24,0.55)]",
          "[--btn-arrow-bg:var(--brand-blue)] [--btn-arrow-fg:#ffffff]",
          "border-white/15 text-white",
          ctaSurface
        ),

        // White CTA with a bare blue arrow.
        paper: cn(
          "[--btn-accent:#ffffff] [--btn-accent-hover:var(--neutral-200)] [--btn-accent-glow:rgba(0,31,63,0.18)]",
          "[--btn-arrow-fg:var(--brand-blue)]",
          "border-border text-foreground",
          "bg-white bg-none shadow-[0_0_0_1px_rgba(0,31,63,0.06)]",
          "hover:-translate-y-px hover:bg-[color:var(--neutral-200)]",
          "hover:shadow-[0_0_0_1px_rgba(0,31,63,0.1),0_10px_24px_-10px_rgba(0,31,63,0.25)]"
        ),

        outline:
          "[--btn-arrow-fg:var(--brand-blue)] border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",

        secondary:
          "[--btn-arrow-fg:var(--brand-blue)] bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",

        ghost:
          "[--btn-arrow-fg:currentColor] hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",

        destructive:
          "[--btn-arrow-fg:currentColor] bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",

        link:
          "[--btn-arrow-fg:currentColor] text-primary underline-offset-4 hover:underline",
      },

      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",

        xs:
          "h-6 gap-1 rounded-md px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",

        sm:
          "h-7 gap-1 rounded-md px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",

        lg:
          "h-9 gap-1.5 rounded-md px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",

        // Reference geometry: 200x48, text flush left, arrow flush right.
        cta:
          "h-12 min-w-[200px] justify-between gap-4 rounded-[8px] px-4 text-[15px] leading-[22.5px]",

        icon:
          "size-8 rounded-md",

        "icon-xs":
          "size-6 rounded-md in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",

        "icon-sm":
          "size-7 rounded-md in-data-[slot=button-group]:rounded-md",

        "icon-lg":
          "size-9 rounded-md",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * The trailing arrow. `chip` draws the filled rounded square from the design;
 * without it the chevron sits bare in the accent colour.
 */
function ButtonArrow({ chip = true, className, ...props }) {
  return (
    <span
      aria-hidden="true"
      data-slot="button-arrow"
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-[6px] text-[color:var(--btn-arrow-fg,currentColor)]",
        "transition-transform duration-200 group-hover/button:translate-x-0.5",
        chip && "bg-[color:var(--btn-arrow-bg,transparent)]",
        className
      )}
      {...props}
    >
      <ChevronsRight className="size-3.5" strokeWidth={2.5} />
    </span>
  );
}

/**
 * `arrow` appends the trailing chevron and switches the button to the 200x48
 * CTA geometry unless an explicit `size` says otherwise. Variants that already
 * carry a solid fill get the chip; flat ones get the bare chevron.
 */
function Button({
  className,
  variant = "default",
  size,
  arrow = false,
  children,
  ...props
}) {
  const resolvedSize = size ?? (arrow ? "cta" : "default");
  const chip = variant === "default" || variant === "ink";

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size: resolvedSize, className }))}
      {...props}
    >
      {arrow ? (
        <>
          <span className="truncate">{children}</span>
          <ButtonArrow chip={chip} />
        </>
      ) : (
        children
      )}
    </ButtonPrimitive>
  );
}

export { Button, ButtonArrow, buttonVariants };
