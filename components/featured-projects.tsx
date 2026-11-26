import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ProjectGlyph } from "@/components/project-glyph";
import type { Project } from "@/lib/data";
import { statusVariant } from "@/lib/status";
import { cn } from "@/lib/utils";

type FeaturedCardProps = {
  project: Project;
  index: string;
  className?: string;
  large?: boolean;
};

export function FeaturedProjectCard({
  project,
  index,
  className,
  large = false,
}: FeaturedCardProps) {
  return (
    <Link
      href={`/developments#${project.slug}`}
      className={cn(
        "project-card group flex flex-col justify-between rounded-3xl border border-white/[0.09] bg-card p-6 transition-all duration-500 hover:border-acid/25 md:p-8",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_80%_0%,rgba(201,242,95,0.06),transparent_55%)]" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-muted">
          <span className="text-acid">{index}</span>
          <span className="h-px w-5 bg-white/15" />
          <span>{project.category}</span>
        </div>
        <Badge variant={statusVariant(project.status)}>{project.status}</Badge>
      </div>

      <div className="relative flex min-h-[170px] flex-1 items-center justify-center py-8">
        <div
          className={cn(
            "text-acid/45 transition-all duration-700 group-hover:scale-[1.04] group-hover:text-acid/75",
            large ? "h-56 w-56 md:h-64 md:w-64" : "h-40 w-40 md:h-48 md:w-48",
          )}
        >
          <ProjectGlyph variant={project.glyph} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,242,95,0.06),transparent_62%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      </div>

      <div>
        <div className="flex items-center gap-3">
          <h3
            className={cn(
              "font-medium tracking-[-0.03em] text-bone transition-colors duration-300 group-hover:text-acid",
              large ? "text-3xl md:text-[2.6rem]" : "text-2xl md:text-3xl",
            )}
          >
            {project.name}
          </h3>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-bone-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acid" />
        </div>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-bone-muted">
          {project.tagline}
        </p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 3).map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-bone-muted/80"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-bone-muted/70">
          {project.year}
        </span>
        {project.metric ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-bone-muted/70">
            <span className="text-acid/80">{project.metric.value}</span>{" "}
            {project.metric.label}
          </span>
        ) : null}
      </div>
    </Link>
  );
}

export function FeaturedWideCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/developments#${project.slug}`}
      className="project-card group grid gap-8 rounded-3xl border border-white/[0.09] bg-card p-6 transition-all duration-500 hover:border-acid/25 md:grid-cols-[1fr_0.8fr] md:items-center md:p-8"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_80%_0%,rgba(201,242,95,0.06),transparent_55%)]" />
      <div>
        <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-muted">
          <span className="text-acid">06</span>
          <span className="h-px w-5 bg-white/15" />
          <span>{project.category}</span>
          <Badge variant={statusVariant(project.status)}>{project.status}</Badge>
        </div>
        <h3 className="mt-5 text-3xl font-medium tracking-[-0.03em] text-bone transition-colors group-hover:text-acid md:text-4xl">
          {project.name}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-bone-muted md:text-[15px]">
          {project.tagline}
        </p>
        <div className="mt-6 flex items-center gap-4">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-acid">
            Open project <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-bone-muted/60">
            {project.metric?.value} {project.metric?.label}
          </span>
        </div>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="h-52 w-52 text-acid/45 transition-all duration-700 group-hover:rotate-6 group-hover:scale-105 group-hover:text-acid/75 md:h-64 md:w-64">
          <ProjectGlyph variant={project.glyph} />
        </div>
      </div>
    </Link>
  );
}
