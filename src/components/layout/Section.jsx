
import { cn } from "@/lib/utils";
import Container from "./Container";

const spacing = {
  small: "py-16",
  medium: "py-24",
  large: "py-32",
};

export default function Section({
  children,
  className,
  spacingSize = "medium",
  containerSize = "default",
}) {
  return (
    <section
      className={cn(
        spacing[spacingSize],
        className
      )}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
}