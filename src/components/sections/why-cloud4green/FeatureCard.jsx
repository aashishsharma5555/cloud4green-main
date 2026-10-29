// export default function FeatureCard({
//   title,
//   description,
// }) {
//   return (
//     <article className="rounded-3xl border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-sm">
//       <h3 className="text-xl font-semibold">
//         {title}
//       </h3>

//       <p className="mt-4 leading-7 text-muted-foreground">
//         {description}
//       </p>
//     </article>
//   );
// }

export default function FeatureCard({
  title,
  description,
  index,
}) {
  return (
    <article className="flex h-full flex-col justify-between rounded-3xl border bg-card p-8 lg:p-10">

      <div>
        <span className="text-sm font-medium tracking-[0.2em] text-primary">
          0{index + 1}
        </span>

        <h3 className="mt-6 text-3xl font-semibold tracking-tight lg:text-4xl">
          {title}
        </h3>

        <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="mt-10 flex min-h-[240px] flex-1 items-center justify-center rounded-2xl border bg-muted/30">
        <span className="text-sm text-muted-foreground">
          Feature visual
        </span>
      </div>

    </article>
  );
}