export default function DomainCard({
  title,
  description,
}) {
  return (
    <article className="rounded-3xl border p-8 transition-all hover:border-primary/30 hover:shadow-sm">
      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-muted-foreground">
        {description}
      </p>
    </article>
  );
}