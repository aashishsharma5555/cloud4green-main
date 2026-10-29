import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import DomainCard from "./DomainCard";

import { domains } from "@/data/domains";

export default function TechnologyDomains() {
  return (
    <Section>
      <Container>
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Technology Domains
          </span>

          <h2 className="mt-4 text-4xl font-bold lg:text-5xl">
            Expertise across today's most important enterprise technologies.
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            From enterprise cloud and artificial intelligence to DevOps,
            cybersecurity, automation, and modern data platforms, Cloud4Green
            helps organizations build future-ready teams.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {domains.map((domain) => (
            <DomainCard
              key={domain.title}
              {...domain}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}