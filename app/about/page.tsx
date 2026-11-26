import Link from "next/link";
import {
  ArrowUpRight,
  BrainCircuit,
  Building2,
  Dices,
  Github,
  Landmark,
  Linkedin,
  Mail,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import {
  education,
  growthGroups,
  highlights,
  industries,
  languages,
  principles,
  site,
  stackGroups,
} from "@/lib/data";

const industryIcons = {
  brain: BrainCircuit,
  dice: Dices,
  landmark: Landmark,
  trending: TrendingUp,
  building: Building2,
  sparkles: Sparkles,
};

const companies = [
  "iGaming operator",
  "MongoDB",
  "Lenxys",
  "Superduper",
  "Bondai",
  "Casafy",
  "Exio",
  "Guru",
  "Crypto casino",
  "Trademap",
  "Santander",
  "Banco BS2",
  "Stormsales",
  "Netshow.me",
  "Collinson",
  "Gradiente",
];

export const metadata = {
  title: "About",
  description:
    "Fernando Guerra is a growth operator and AI product builder with 13+ years across growth, AI products, fintech, iGaming, marketplaces and enterprise SaaS.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="02"
        label="About"
        title={
          <>
            Growth by <span className="serif-accent text-acid">instinct.</span>
            <br />
            Builder by <span className="serif-accent">practice.</span>
          </>
        }
        description={
          <>
            I am Fernando Guerra, a growth operator and AI product builder who
            works across the whole path from model to market. For 13+ years I
            have shipped AI products, growth engines and revenue infrastructure
            for startups, banks and global platforms. I care about the number
            that proves it worked, not the deck that describes it.
          </>
        }
        meta={
          <div className="w-full max-w-sm rounded-2xl border border-white/[0.09] bg-card p-6">
            <div className="eyebrow text-acid">At a glance</div>
            <div className="mt-5 flex flex-col divide-y divide-white/[0.07]">
              {[
                ["Based between", "Tbilisi · New York · São Paulo"],
                ["From", "Brazil"],
                ["Currently", "Open to new projects"],
                ["Focus", "Growth · AI products"],
                ["Mobility", "Always travelling"],
                ["Languages", "PT · EN · ES · FR"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-5 py-3 first:pt-0 last:pb-0">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-bone-muted/50">
                    {label}
                  </span>
                  <span className="text-right text-[12px] text-bone">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 border-t border-white/[0.07] pt-5">
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-bone-muted transition-colors hover:border-acid/40 hover:text-acid"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-bone-muted transition-colors hover:border-acid/40 hover:text-acid"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
              <a
                href={`mailto:${site.email}`}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-bone-muted transition-colors hover:border-acid/40 hover:text-acid"
              >
                <Mail className="h-3.5 w-3.5" />
              </a>
              <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.1em] text-acid/70">
                Open to new projects
              </span>
            </div>
          </div>
        }
      />

      <section className="container-page pb-24 md:pb-32">
        <div className="grid gap-14 border-t border-white/[0.08] pt-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="eyebrow text-acid">The short version</div>
              <h2 className="display mt-5 max-w-sm text-[clamp(2.2rem,4.6vw,3.75rem)] text-bone">
                A career built at the seam between{" "}
                <span className="serif-accent text-acid">product and growth.</span>
              </h2>
              <div className="mt-8 hidden overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-2 p-6 lg:block">
                <div className="flex items-start justify-between">
                  <span className="eyebrow text-bone-muted/50">Trajectory</span>
                  <span className="font-mono text-[9px] text-bone-muted/50">2012 to 2026</span>
                </div>
                <div className="mt-8 text-[7.5rem] font-medium leading-[0.72] tracking-[-0.08em] text-bone/[0.13]">
                  FG
                </div>
                <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-2">
                  {companies.map((company) => (
                    <span
                      key={company}
                      className="font-mono text-[9px] uppercase tracking-[0.08em] text-bone-muted/80"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="max-w-3xl space-y-6 text-[15px] leading-[1.85] text-bone-muted md:text-[17px]">
              <p>
                I started in design at Collinson, building web and loyalty
                experiences for Intel, Lenovo and Mercedes. Then I moved into
                growth: automated lead generation at Netshow.me, digital
                acquisition at Banco BS2, and the acquisition engine at Guru that
                brought in 60,000 users in 60 days.
              </p>
              <p>
                At Trademap I designed referral and social loops that acquired
                1M+ organic users in twelve months with no media budget. At
                Santander I owned a $20M multi-brand programme across ten
                business units, a 20-person team and 80+ agency partners. At
                Bondai I led market-entry growth for a tourism marketplace. In
                2020 I co-founded Exio, an AI growth platform, and took it through
                a successful exit.
              </p>
              <p>
                Since then I have been building AI-native products: Lenxys, a
                live emotionally intelligent assistant; Army, a self-evolving
                agent orchestrator; OpenOutreach, a Bayesian LinkedIn growth
                engine; LenManag, an AI website fabric; Xtrac, call intelligence
                for entire support floors; and LenOS, a workspace where humans and
                agents share the same rooms.
              </p>
              <p>
                Most recently I led growth, CRM and lifecycle for an iGaming
                operator, owning acquisition, retention, VIP and a 120+ campaign
                calendar. I am now open to new projects where growth and product
                meet. The through-line is the same as it has always been:
                understand the system, find the leverage point, build the thing
                that moves it.
              </p>

              <div className="relative mt-10 overflow-hidden rounded-2xl border border-acid/20 bg-acid/[0.05] p-7 md:p-9">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-acid/[0.12] blur-3xl" />
                <p className="max-w-2xl text-xl leading-snug text-bone md:text-2xl">
                  I don't separate product from growth. The loop{" "}
                  <span className="serif-accent text-acid">is</span> the product.
                </p>
                <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-bone-muted/60">
                  The operating belief
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild variant="outline">
                  <a href={site.linkedin} target="_blank" rel="noreferrer">
                    Connect on LinkedIn
                    <ArrowUpRight />
                  </a>
                </Button>
                <Button asChild variant="ghost">
                  <a href={`mailto:${site.email}`}>
                    Email me
                    <Mail />
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-ink-2/60 py-24 md:py-32">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index="01"
              label="Principal industries"
              title={
                <>
                  Six worlds, one{" "}
                  <span className="serif-accent text-acid">operating system.</span>
                </>
              }
              description="I have worked where the stakes are commercial and the systems are complex. These are the industries I know from the inside, not from the sidelines."
            />
          </Reveal>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => {
              const Icon = industryIcons[industry.icon as keyof typeof industryIcons];
              return (
                <Reveal key={industry.name} delay={index * 50}>
                  <div className="group h-full rounded-2xl border border-white/[0.08] bg-card p-6 transition-all duration-300 hover:border-acid/25 hover:bg-white/[0.025]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-bone-muted/40">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Icon className="h-4 w-4 text-bone-muted/40 transition-colors group-hover:text-acid" />
                    </div>
                    <h3 className="mt-6 text-lg font-medium tracking-[-0.02em] text-bone">
                      {industry.name}
                    </h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-bone-muted">
                      {industry.description}
                    </p>
                    <p className="mt-5 border-t border-white/[0.07] pt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.06em] text-acid/70">
                      {industry.proof}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-page py-24 md:py-32">
        <Reveal>
          <SectionHeading
            index="02"
            label="Selected highlights"
            title={
              <>
                The numbers I am{" "}
                <span className="serif-accent text-acid">proud of.</span>
              </>
            }
            description="Not every outcome fits in a metric, but these are the ones that changed the trajectory of a product, a team or a company."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-4">
          {highlights.map((highlight, index) => (
            <Reveal key={highlight.label} delay={index * 40}>
              <div className="group flex h-full flex-col justify-between bg-card p-5 transition-colors duration-300 hover:bg-white/[0.025] md:p-6">
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-bone-muted/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="mt-8">
                  <div className="text-3xl font-medium tracking-[-0.04em] text-bone transition-colors group-hover:text-acid md:text-4xl">
                    {highlight.value}
                  </div>
                  <div className="mt-2 text-[12px] text-bone">{highlight.label}</div>
                  <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.06em] text-bone-muted/50">
                    {highlight.note}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-ink-2/60 py-24 md:py-32">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index="03"
              label="How I work"
              title={
                <>
                  Four rules for building things that{" "}
                  <span className="serif-accent text-acid">compound.</span>
                </>
              }
              description="The principles are simple. The discipline is in applying them when the deadline is real and the data is incomplete."
            />
          </Reveal>

          <div className="mt-12 grid gap-3 md:grid-cols-2">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 60}>
                <div className="group h-full rounded-2xl border border-white/[0.08] bg-card p-6 transition-all duration-300 hover:border-acid/25 md:p-8">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-acid/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-12 bg-white/10 transition-colors group-hover:bg-acid/30" />
                  </div>
                  <h3 className="mt-8 text-2xl font-medium tracking-[-0.03em] text-bone">
                    {principle.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-bone-muted">
                    {principle.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-24 md:py-32">
        <Reveal>
          <SectionHeading
            index="04"
            label="Toolbox"
            title={
              <>
                The tools change. The{" "}
                <span className="serif-accent text-acid">loop</span> stays.
              </>
            }
            description="I work across the build and the growth side, which means the stack is deliberately broad. These are the tools I reach for most often."
          />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {[
            { label: "Build", groups: stackGroups, accent: "text-acid" },
            { label: "Grow", groups: growthGroups, accent: "text-mint" },
          ].map((column) => (
            <Reveal key={column.label}>
              <div>
                <div className={`eyebrow ${column.accent}`}>{column.label}</div>
                <div className="mt-5">
                  {column.groups.map((group) => (
                    <div
                      key={group.title}
                      className="grid gap-2 border-t border-white/[0.08] py-5 last:border-b sm:grid-cols-[150px_1fr] sm:gap-6"
                    >
                      <h3 className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-bone-muted/60">
                        {group.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.06em] text-bone-muted/80"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-white/[0.08] py-24 md:py-32">
        <div className="container-page grid gap-12 lg:grid-cols-3 lg:gap-16">
          <Reveal>
            <div>
              <div className="eyebrow text-acid">Education</div>
              <div className="mt-6 flex flex-col divide-y divide-white/[0.07]">
                {education.slice(0, 2).map((item) => (
                  <div key={item.title} className="py-4 first:pt-0">
                    <div className="text-[14px] text-bone">{item.title}</div>
                    <div className="mt-1 text-[12px] text-bone-muted">
                      {item.org} · {item.year}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div>
              <div className="eyebrow text-acid">Certifications</div>
              <div className="mt-6 flex flex-col divide-y divide-white/[0.07]">
                {education.slice(2).map((item) => (
                  <div key={item.title} className="py-4 first:pt-0">
                    <div className="text-[14px] text-bone">{item.title}</div>
                    <div className="mt-1 text-[12px] text-bone-muted">
                      {item.org} · {item.year}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div>
              <div className="eyebrow text-acid">Languages</div>
              <div className="mt-6 flex flex-col divide-y divide-white/[0.07]">
                {languages.map((language) => (
                  <div key={language.name} className="flex items-center justify-between py-4 first:pt-0">
                    <span className="text-[14px] text-bone">{language.name}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-bone-muted/60">
                      {language.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-page pb-24 md:pb-32">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/[0.09] bg-card p-7 md:flex-row md:items-center md:p-10">
            <div>
              <div className="eyebrow text-acid">The next chapter</div>
              <h2 className="display mt-3 max-w-2xl text-[clamp(2rem,4.5vw,3.5rem)] text-bone">
                If the problem is hard, I am{" "}
                <span className="serif-accent text-acid">interested.</span>
              </h2>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button asChild>
                <a href={`mailto:${site.email}`}>
                  Start a conversation
                  <ArrowUpRight />
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link href="/developments">
                  See the work
                  <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
