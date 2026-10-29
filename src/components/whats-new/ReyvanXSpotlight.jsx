import { Link } from "react-router-dom";
import { Check, Minus } from "lucide-react";

import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CUE } from "@/components/motion/reveal-tokens";
import { Eyebrow, Tag } from "@/components/customer-stories/parts";
import { reyvanx } from "@/data/whatsNew";

/* The launch spotlight. Header on cream like every other section head,
   then one ink panel — the same ink as the consulting transformation
   band and the customer-stories metrics — carrying the three-step flow
   and the VPN comparison. Green is ReyvanX's own accent (the ZtnaFlow
   widget and the announcement bar use it); blue stays the site's. */

export default function ReyvanXSpotlight() {
  const demoHref = `/contact?service=${encodeURIComponent(reyvanx.name)}`;

  return (
    <section
      id="reyvanx"
      aria-labelledby="reyvanx-title"
      className="relative scroll-mt-24 overflow-hidden border-b border-[#101418]/8 bg-[#FAFAF7] py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[#0B5CFF]/5 blur-3xl" />

      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <RevealGroup delay={CUE.lead} className="relative max-w-[720px]">
            <RevealItem as="p">
              <Eyebrow>New · Security</Eyebrow>
            </RevealItem>

            <RevealItem
              as="h2"
              id="reyvanx-title"
              className="mt-5 font-recoleta text-[1.9rem] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-[#101418] sm:text-[2.3rem] lg:text-[2.6rem]"
            >
              {reyvanx.title}
              <span className="text-[#0B5CFF]">.</span>
            </RevealItem>

            <RevealItem as="p" className="mt-5 max-w-[580px] text-[15px] leading-7 text-[#4A5261] lg:text-[16px]">
              {reyvanx.description}
            </RevealItem>

            <RevealItem className="mt-5 flex flex-wrap gap-2">
              {reyvanx.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </RevealItem>
          </RevealGroup>

          <Reveal delay={CUE.follow} className="flex flex-wrap gap-3.5">
            <Button arrow render={<Link to={demoHref} />}>
              Request a demo
            </Button>
          </Reveal>
        </div>

        <Reveal
          delay={CUE.follow}
          className="relative mt-12 overflow-hidden rounded-[22px] border border-white/5 bg-gradient-to-br from-[#101418] to-[#1a1f29] text-white shadow-[0_24px_60px_-24px_rgba(16,20,24,0.55)] lg:mt-14"
        >
          <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[#8BE28B]/10 blur-3xl" />

          {/* ---------------------------------------- how it works */}
          <ol className="relative grid divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
            {reyvanx.how.map((step, i) => (
              <li key={step.title} className="p-6 sm:p-8 lg:p-10">
                <span className="text-[11px] font-bold tabular-nums tracking-[0.16em] text-[#8BE28B]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-recoleta text-[1.5rem] font-medium uppercase leading-none tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-6 text-white/70">{step.text}</p>
              </li>
            ))}
          </ol>

          {/* ---------------------------------------- VPN vs ReyvanX */}
          <div className="relative border-t border-white/10 p-6 sm:p-8 lg:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8FB2FF]">
              Why replace the VPN
            </p>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-left text-[14px]">
                <thead>
                  <tr className="border-b border-white/10 text-[11px] font-semibold uppercase tracking-[0.14em]">
                    <th scope="col" className="w-[24%] py-3 pr-4 font-semibold text-white/45">
                      <span className="sr-only">Topic</span>
                    </th>
                    <th scope="col" className="py-3 pr-4 font-semibold text-white/45">Traditional VPN</th>
                    <th scope="col" className="py-3 font-semibold text-[#8BE28B]">{reyvanx.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {reyvanx.compare.map((row) => (
                    <tr key={row.topic} className="border-b border-white/10 last:border-0">
                      <th scope="row" className="py-4 pr-4 font-medium text-white/85">
                        {row.topic}
                      </th>
                      <td className="py-4 pr-4 text-white/50">
                        <span className="flex items-center gap-2.5">
                          <Minus aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-white/30" />
                          {row.vpn}
                        </span>
                      </td>
                      <td className="py-4 text-white">
                        <span className="flex items-center gap-2.5">
                          <Check aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#8BE28B]" strokeWidth={3} />
                          {row.zt}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
