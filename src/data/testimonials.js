// Home page testimonials — the same Google reviews shown on /customers,
// reshaped to the { name, role, quote } the marquee card takes. The
// training area stands in for the role line.
import { googleReviews } from "@/data/googleReviews";

export const testimonials = googleReviews.map(({ name, course, text }) => ({
  name,
  role: course,
  quote: text,
}));
