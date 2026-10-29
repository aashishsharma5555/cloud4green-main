import { cn } from "@/lib/utils";

const variants = {
  default: "max-w-7xl",
  wide: "max-w-[1440px]",
  narrow: "max-w-3xl",
  full: "max-w-none",
};

export default function Container({
  children,
  className,
  size = "default",
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        variants[size],
        className
      )}
    >
      {children}
    </div>
  );
}