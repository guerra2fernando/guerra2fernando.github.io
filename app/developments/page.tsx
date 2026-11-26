import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { DevelopmentsExplorer } from "@/components/developments-explorer";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/data";

export const metadata = {
  title: "Developments",
  description:
    "The full archive of Fernando Guerra's products, AI systems, growth tools and experiments — plus sixteen years of past experience.",
};

const stats = [
  { value: "35+", label: "builds" },
  { value: "10+", label: "public repos" },
  { value: "131", label: "OSS stars" },
  { value: "6", label: "industries" },
];

export default function DevelopmentsPage() {
  return (
    <>
      <PageHero
        index="03"
        label="Developments"
        title={
          <>
            Things I have{" "}
            <span className="serif-accent text-acid">built.</span>
          </>
        }
        description={
          <>
            Products, platforms, agents and experiments — the full archive of what
            I have shipped, from production SaaS and open-source tools to design
            bibles and playable instruments. Filter by category, search the stack,
            or jump into the experience timeline.
          </>
        }
        meta={
          <div className="grid w-full max-w-sm grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.08]">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card p-5">
                <div className="text-2xl font-medium tracking-[-0.03em] text-bone">
                  {stat.value}
                </div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-bone-muted/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        }
      >
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="#experience">
              Past experience
              <ArrowDown />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <a href={site.github} target="_blank" rel="noreferrer">
              GitHub
              <ArrowUpRight />
            </a>
          </Button>
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-bone-muted/40">
            Updated November 2026
          </span>
        </div>
      </PageHero>

      <DevelopmentsExplorer />
    </>
  );
}
