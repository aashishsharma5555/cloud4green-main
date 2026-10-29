// export default function PlatformCard({
//   title,
//   description,
// }) {
//   return (
//     <article className="rounded-3xl border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-sm">
//       <div className="mb-8 h-10 w-10 rounded-xl border bg-muted" />

//       <h3 className="text-xl font-semibold">
//         {title}
//       </h3>

//       <p className="mt-4 leading-7 text-muted-foreground">
//         {description}
//       </p>
//     </article>
//   );
// }

// import { ArrowRight } from "lucide-react";

// export default function PlatformCard({
//   title,
//   description,
//    icon: Icon,
//     iconBg,
//   iconColor,
//   iconBorder,
// }) {
//   return (
//     <article
//       className="
//       group
//       relative
//       overflow-hidden
//       rounded-3xl
//       border
//       border-slate-200/70
//       hover:border-blue-300/50
//       bg-white/75
//       p-8
//       backdrop-blur-md
//       transition-all
//       duration-300

//       hover:-translate-y-2
//       hover:border-blue-200
//       hover:shadow-xl
//       "

//        onMouseMove={(e) => {
//     const rect = e.currentTarget.getBoundingClientRect();

//     e.currentTarget.style.setProperty(
//       "--x",
//       `${e.clientX - rect.left}px`
//     );

//     e.currentTarget.style.setProperty(
//       "--y",
//       `${e.clientY - rect.top}px`
//     );
//   }}
//     >
    
//       {/* Card Spotlight*/}
//       <div
//   className="
//     pointer-events-none
//     absolute
//     inset-0
//     rounded-3xl
//     opacity-0
//     transition-opacity
//     duration-300
//     group-hover:opacity-100
//   "
//   style={{
//     background: `
//       radial-gradient(
//         240px circle at var(--x) var(--y),
//         rgba(68, 140, 189, 0.25),
//         rgba(48, 105, 230, 0.08) 35%,
//         transparent 70%
//       )
//     `,
//   }}
// />

// <div
//   className="
//   pointer-events-none
//   absolute
//   inset-0
//   rounded-3xl
//   bg-gradient-to-br
//   from-blue-500/5
//   via-transparent
//   to-transparent
//   opacity-0
//   transition-opacity
//   duration-300
//   group-hover:opacity-100
//   "
// />

//       {/* Placeholder Icon */}
//       <div className={`mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border ${iconBorder} ${iconBg} transition-colors duration-300 group-hover:${iconBorder} group-hover:${iconBg}`}>
//         <Icon className={`h-6 w-6 ${iconColor} transition-transform duration-300 group-hover:scale-80`} />
//       </div>

//       <h3 className="relative text-xl font-semibold">
//         {title}
//       </h3>

//       <p className="relative mt-4 leading-7 text-muted-foreground">
//         {description}
//       </p>

//       <div className="relative mt-8 flex items-center gap-2 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
//         Learn More
//         <ArrowRight className="h-4 w-4" />
//       </div>
//     </article>
//   );
// }

// import { ArrowRight } from "lucide-react";

export default function PlatformCard({
  title,
  description,
  textColor = "white",
  img,
}) {
  return (
    <article
      className="
        group
        relative
        bg-img
        min-h-[320px]
        overflow-hidden
        rounded-[2rem]
        border
        border-slate-200/80
        bg-white
        p-10
        transition-all
        duration-500
        hover:border-slate-300
        hover:shadow-2xl
        lg:min-h-[380px]
        lg:p-12
        
      "

      
      
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        e.currentTarget.style.setProperty(
          "--x",
          `${e.clientX - rect.left}px`
        );

        e.currentTarget.style.setProperty(
          "--y",
          `${e.clientY - rect.top}px`
        );
      }}
    >

 <img
    src={img}
    alt=""
    className="
      absolute
      inset-0
      h-full
      w-full
      object-cover
    "
  />

      {/* Mouse-following spotlight */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[2rem]
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
        style={{
          background: `
            radial-gradient(
              280px circle at var(--x) var(--y),
              rgba(68, 140, 189, 0.16),
              rgba(48, 105, 230, 0.05) 40%,
              transparent 72%
            )
          `,
        }}
      />

      {/* Very subtle ambient gradient */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-br
          from-blue-500/[0.04]
          via-transparent
          to-transparent
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      {/* Decorative background element */}
      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-blue-500/[0.035]
          blur-3xl
          transition-all
          duration-700
          group-hover:bg-blue-500/[0.07]
        "
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Top row */}
        <div className="flex items-start justify-end">
          {/* Icon */}
          {/* <div
            className={`
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              border
              ${iconBorder}
              ${iconBg}
              transition-all
              duration-500
              group-hover:scale-105
            `}
          >
            <Icon
              className={`
                h-6
                w-6
                ${iconColor}
                transition-transform
                duration-500
                group-hover:scale-110
              `}
            />
          </div> */}

          {/* Small decorative indicator */}
          <span
            className="

              text-xs
              font-medium
              tracking-[0.2em]
              text-slate-400
              transition-colors
              duration-300
              group-hover:text-slate-600
            "
          >
            PLATFORM
          </span>
        </div>

        {/* Main content */}
        <div className="mt-auto max-w-2xl">
          <h3
            className="
              text-3xl
              font-semibold
              tracking-tight
              text-slate-950
              transition-transform
              duration-500
              group-hover:-translate-y-1
              sm:text-3xl
              lg:text-4xl
              text-white
              bg-blue-900
              inline-block
              p-2
            "

            
          >
            {title}
          </h3>

          <p
            className="
              mt-5
              max-w-xl
              text-base
              leading-7
              text-slate-500
              sm:text-lg
              sm:leading-8
              text-white
              backdrop-blur-md
            "

            style={{
              color: `${textColor}`
            }}
          >
            {description}
          </p>

          {/* Learn more */}
          {/* <div
            className="
              mt-8
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-primary
              transition-all
              duration-300
              group-hover:gap-3
            "
          >
            Learn More

            <ArrowRight
              className="
                h-4
                w-4
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </div> */}
        </div>
      </div>
    </article>
  );
}