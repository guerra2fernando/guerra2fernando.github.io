import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Globe2,
  Sparkles,
} from "lucide-react";

import { FeaturedProjectCard, FeaturedWideCard } from "@/components/featured-projects";
import { HeroScene } from "@/components/hero-scene";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StackLayers } from "@/components/stack-layers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { experiences, homeFeaturedSlugs, projects, site } from "@/lib/data";

const heroStats = [
  { value: "13+", label: "years in growth" },
  { value: "35+", label: "products & tools" },
  { value: "+43%", label: "NGR growth" },
  { value: "1M+", label: "organic users" },
];

const currentFacts = [
  {
    label: "Based between",
    value: "Tbilisi · New York · São Paulo",
    note: "Always travelling",
    icon: Globe2,
  },
  {
    label: "Currently",
    value: "Open to new projects",
    note: "Growth, AI products, operating roles",
    icon: Sparkles,
  },
  {
    label: "Building",
    value: "AI agents & growth systems",
    note: "Army · OpenOutreach · LenOS",
    icon: Braces,
  },
  {
    label: "Languages",
    value: "PT · EN · ES · FR",
    note: "Native Portuguese, fluent English",
    icon: ArrowRight,
  },
];

export default function HomePage() {
  const featured = homeFeaturedSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  const firstRow = featured.slice(0, 2);
  const secondRow = featured.slice(2, 5);
  const wide = featured[5];

  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden pt-24 md:pt-28">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-45 lg:pointer-events-auto lg:w-[58%] lg:opacity-100">
          <HeroScene />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/10 lg:via-ink/55" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

        <div className="container-page relative z-10 flex min-h-[calc(100svh-6rem)] flex-col justify-between pb-6 pt-8 md:pt-14">
          <div className="pointer-events-none grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="pointer-events-auto max-w-[780px]">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-bone-muted backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-acid animate-pulse-dot" />
                Open to new projects
              </div>

              <h1 className="display mt-8 max-w-[820px] text-[clamp(2.6rem,4.9vw,5rem)] text-bone">
                I build, improve
                <br className="hidden sm:block" /> and iterate.
                <br className="hidden sm:block" /> Products that{" "}
                <span className="serif-accent text-acid">think</span>,
                <br className="hidden sm:block" /> then I help them{" "}
                <span className="serif-accent">grow.</span>
              </h1>

              <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-bone-muted md:text-[16px]">
                Growth operator and AI product builder. For 13+ years I have
                turned ambiguous ideas into products people use: multi-agent
                systems, vector search, acquisition loops and the infrastructure
                underneath. Founder of Lenxys. Currently open to new projects.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/developments">
                    Explore developments
                    <ArrowUpRight />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/about">
                    The story
                    <ArrowRight />
                  </Link>
                </Button>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[9px] uppercase tracking-[0.14em] text-bone-muted/70">
                <span className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-acid/80" />
                  {site.currentRole}
                </span>
                <span className="hidden h-3 w-px bg-white/10 sm:block" />
                <span>Growth-first operator</span>
                <span className="hidden h-3 w-px bg-white/10 sm:block" />
                <span>{site.locationShort}</span>
              </div>
            </div>
            <div aria-hidden="true" />
          </div>

          <div className="pointer-events-auto mt-12 border-t border-white/[0.08] pt-5 md:mt-14">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4 md:gap-x-14">
                {heroStats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-medium tracking-[-0.03em] text-bone md:text-[2rem]">
                      {stat.value}
                    </div>
                    <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-bone-muted/70">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="#selected"
                className="group hidden items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-bone-muted/70 transition-colors hover:text-acid md:flex"
              >
                Scroll to explore
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:border-acid/40">
                  <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      <section id="selected" className="container-page py-24 md:py-32">
        <Reveal>
          <SectionHeading
            index="01"
            label="Selected developments"
            title={
              <>
                Proof, not a <span className="serif-accent text-acid">pitch deck.</span>
              </>
            }
            description="A few of the products I have built, improved and helped grow. The full archive covers 35+ products, tools and experiments."
            action={{ label: "All developments", href: "/developments" }}
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-12">
          {firstRow.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={index * 80}
              className={index === 0 ? "md:col-span-7" : "md:col-span-5"}
            >
              <FeaturedProjectCard
                project={project}
                index={String(index + 1).padStart(2, "0")}
                large={index === 0}
                className="h-full min-h-[450px]"
              />
            </Reveal>
          ))}

          {secondRow.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={index * 80}
              className="md:col-span-4"
            >
              <FeaturedProjectCard
                project={project}
                index={String(index + 3).padStart(2, "0")}
                className="h-full min-h-[390px]"
              />
            </Reveal>
          ))}

          {wide ? (
            <Reveal delay={120} className="md:col-span-12">
              <FeaturedWideCard project={wide} />
            </Reveal>
          ) : null}
        </div>
      </section>

      <section className="relative border-y border-white/[0.08] bg-ink-2/70 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 dot-bg opacity-[0.12]" />
        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              index="02"
              label="The operating system"
              title={
                <>
                  Five layers. <span className="serif-accent">One operator.</span>
                </>
              }
              description="The projects are not a folder of demos. They are one connected stack: intelligence, outreach, conversion, growth and operations, built to run a company with agents in the loop."
            />
          </Reveal>
          <Reveal delay={100}>
            <StackLayers />
          </Reveal>
        </div>
      </section>

      <section className="container-page py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <Reveal>
            <div className="eyebrow flex items-center gap-3">
              <span className="text-acid">03</span>
              <span className="h-px w-8 bg-white/20" />
              <span>About</span>
            </div>
            <h2 className="display mt-5 max-w-xl text-[clamp(2.5rem,5.2vw,4.5rem)] text-bone">
              A growth operator who learned to build.
              <br />
              A builder who never stopped{" "}
              <span className="serif-accent text-acid">growing.</span>
            </h2>
            <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-bone-muted">
              I started in design, moved into growth, then into the systems behind
              both. That path is why I care about the whole loop: the model, the
              interface, the acquisition channel and the number that proves it
              worked. Today I work at the intersection of growth, product and
              AI.
            </p>
            <div className="mt-8">
              <Button asChild variant="outline">
                <Link href="/about">
                  Read the full story
                  <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid grid-cols-2 gap-3">
              {currentFacts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <div
                    key={fact.label}
                    className="group rounded-2xl border border-white/[0.08] bg-card p-5 transition-colors duration-300 hover:border-acid/25"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-bone-muted/60">
                        {fact.label}
                      </span>
                      <Icon className="h-3.5 w-3.5 text-bone-muted/40 transition-colors group-hover:text-acid/70" />
                    </div>
                    <p className="mt-4 text-[15px] font-medium leading-snug text-bone">
                      {fact.value}
                    </p>
                    <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-bone-muted/60">
                      {fact.note}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="relative mt-3 overflow-hidden rounded-2xl border border-acid/20 bg-acid/[0.05] p-6 md:p-7">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-acid/[0.12] blur-3xl" />
              <div className="flex items-start gap-4">
                <span className="mt-1 font-serif text-4xl italic leading-none text-acid">
                  “
                </span>
                <div>
                  <p className="max-w-md text-[15px] leading-relaxed text-bone">
                    The best growth channel is a product that works. Everything
                    else is distribution for that truth.
                  </p>
                  <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-bone-muted/60">
                    Operating principle
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/[0.08] py-24 md:py-32">
        <div className="container-page grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <Reveal>
            <div className="eyebrow flex items-center gap-3">
              <span className="text-acid">04</span>
              <span className="h-px w-8 bg-white/20" />
              <span>Past experience</span>
            </div>
            <h2 className="display mt-5 max-w-lg text-[clamp(2.5rem,5vw,4.25rem)] text-bone">
              From growth hacking to{" "}
              <span className="serif-accent text-acid">$20M programmes.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-bone-muted">
              Sixteen chapters across iGaming, fintech, marketplaces, enterprise
              SaaS and creative production. The short version is below; the full
              timeline lives with the work.
            </p>
            <div className="mt-8">
              <Link
                href="/developments#experience"
                className="group inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-acid"
              >
                Full experience timeline
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-acid/25 transition-all duration-300 group-hover:bg-acid group-hover:text-ink">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          </Reveal>

          <div className="flex flex-col">
            {experiences.slice(0, 6).map((experience, index) => (
              <Reveal key={`${experience.company}-${experience.role}`} delay={index * 50}>
                <Link
                  href="/developments#experience"
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-4 border-t border-white/[0.08] py-5 transition-colors last:border-b hover:border-acid/20"
                >
                  <span className="pt-1 font-mono text-[9px] tracking-[0.1em] text-bone-muted/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-lg text-bone transition-colors group-hover:text-acid md:text-xl">
                        {experience.company}
                      </span>
                      {experience.current ? (
                        <Badge variant="live">Current</Badge>
                      ) : null}
                    </span>
                    <span className="mt-1 block text-[13px] text-bone-muted">
                      {experience.role}
                    </span>
                    <span className="mt-2 flex flex-wrap gap-1.5">
                      {experience.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/[0.07] px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-bone-muted/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="flex items-center gap-3 pt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-bone-muted/50">
                    {experience.period.replace(" to Present", "")}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
