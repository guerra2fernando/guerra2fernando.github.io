"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  ExternalLink,
  FileText,
  Github,
  Globe,
  Search,
  X,
} from "lucide-react";

import { ProjectGlyph } from "@/components/project-glyph";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  experiences,
  experienceTags,
  highlights,
  projectCategories,
  projects,
  type ExperienceTag,
  type Project,
  type ProjectCategory,
  type ProjectLink,
} from "@/lib/data";
import { statusVariant } from "@/lib/status";
import { cn } from "@/lib/utils";

type View = "projects" | "experience";

function FilterChip({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count?: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.08em] transition-all duration-300",
        active
          ? "border-acid/40 bg-acid text-ink"
          : "border-white/10 bg-white/[0.02] text-bone-muted hover:border-white/25 hover:text-bone",
      )}
    >
      {label}
      {typeof count === "number" ? (
        <span
          className={cn(
            "text-[9px]",
            active ? "text-ink/60" : "text-bone-muted/50",
          )}
        >
          {String(count).padStart(2, "0")}
        </span>
      ) : null}
    </button>
  );
}

function linkIcon(kind: ProjectLink["kind"]) {
  if (kind === "repo") return Github;
  if (kind === "docs") return FileText;
  if (kind === "game") return ExternalLink;
  return Globe;
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="project-card group flex h-full min-h-[300px] flex-col rounded-3xl border border-white/[0.09] bg-card p-6 text-left transition-all duration-500 hover:border-acid/25"
      aria-label={`View details for ${project.name}`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_85%_0%,rgba(201,242,95,0.055),transparent_55%)]" />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-bone-muted">
          <span className="text-acid">{String(index + 1).padStart(2, "0")}</span>
          <span className="h-px w-4 bg-white/15" />
          <span>{project.category}</span>
        </div>
        <Badge variant={statusVariant(project.status)}>{project.status}</Badge>
      </div>

      <div className="mt-6 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-2xl font-medium tracking-[-0.03em] text-bone transition-colors group-hover:text-acid">
            {project.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-bone-muted">
            {project.tagline}
          </p>
        </div>
        <div className="h-20 w-20 shrink-0 text-acid/40 transition-all duration-700 group-hover:scale-110 group-hover:text-acid/70">
          <ProjectGlyph variant={project.glyph} />
        </div>
      </div>

      <div className="mt-auto pt-6">
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/[0.07] px-2 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-bone-muted/70"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-bone-muted/50">
            {project.year}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-acid opacity-0 transition-opacity group-hover:opacity-100">
            Open file <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </button>
  );
}

function ExperienceItem({ experience }: { experience: (typeof experiences)[number] }) {
  return (
    <article className="relative grid gap-4 border-t border-white/[0.08] py-8 md:grid-cols-[24px_150px_1fr] md:gap-8 md:py-10">
      <div className="hidden justify-center pt-1.5 md:flex">
        <span className="relative z-10 flex h-3 w-3 items-center justify-center rounded-full border border-acid/50 bg-ink">
          {experience.current ? (
            <span className="h-1.5 w-1.5 rounded-full bg-acid animate-pulse-dot" />
          ) : (
            <span className="h-1 w-1 rounded-full bg-acid/50" />
          )}
        </span>
      </div>

      <div>
        <div className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-bone-muted/60">
          {experience.period}
        </div>
        {experience.location ? (
          <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.08em] text-bone-muted/40">
            {experience.location}
          </div>
        ) : null}
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="text-xl font-medium tracking-[-0.02em] text-bone md:text-2xl">
            {experience.company}
          </h3>
          {experience.current ? <Badge variant="live">Current</Badge> : null}
        </div>
        <p className="mt-1 text-[13px] text-acid/80 md:text-sm">{experience.role}</p>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-bone-muted">
          {experience.summary}
        </p>

        <ul className="mt-5 grid gap-2.5">
          {experience.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight} className="flex gap-3 text-[13px] leading-relaxed text-bone-muted">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-acid/60" />
              {highlight}
            </li>
          ))}
        </ul>

        {experience.highlights.length > 3 ? (
          <details className="group mt-3">
            <summary className="cursor-pointer list-none font-mono text-[9px] uppercase tracking-[0.14em] text-bone-muted/60 transition-colors hover:text-acid">
              More detail <span className="inline-block transition-transform group-open:rotate-90">›</span>
            </summary>
            <ul className="mt-3 grid gap-2.5">
              {experience.highlights.slice(3).map((highlight) => (
                <li key={highlight} className="flex gap-3 text-[13px] leading-relaxed text-bone-muted">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-acid/60" />
                  {highlight}
                </li>
              ))}
            </ul>
          </details>
        ) : null}

        {experience.metrics ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {experience.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-2"
              >
                <span className="text-sm font-medium text-acid">{metric.value}</span>
                <span className="ml-2 font-mono text-[8px] uppercase tracking-[0.1em] text-bone-muted/60">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-1.5">
          {experience.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.07] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-bone-muted/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function DevelopmentsExplorer() {
  const [view, setView] = useState<View>("projects");
  const [category, setCategory] = useState<"All" | ProjectCategory>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);
  const [experienceTag, setExperienceTag] = useState<"All" | ExperienceTag>("All");
  const tabsRef = useRef<HTMLDivElement | null>(null);

  const scrollToTabs = () => {
    window.requestAnimationFrame(() => {
      tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "experience") {
        setView("experience");
        setSelected(null);
        window.setTimeout(scrollToTabs, 80);
        return;
      }
      if (hash === "projects") {
        setView("projects");
        window.setTimeout(scrollToTabs, 80);
        return;
      }
      if (!hash) return;
      const match = projects.find((project) => project.slug === hash);
      if (match) {
        setView("projects");
        setSelected(match);
      }
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = category === "All" || project.category === category;
      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;
      const haystack = [
        project.name,
        project.tagline,
        project.description,
        project.category,
        project.year,
        ...project.tech,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [category, query]);

  const filteredExperience = useMemo(() => {
    if (experienceTag === "All") return experiences;
    return experiences.filter((experience) => experience.tags.includes(experienceTag));
  }, [experienceTag]);

  const changeView = (next: View) => {
    setView(next);
    setSelected(null);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", next === "experience" ? "#experience" : "#projects");
    }
    scrollToTabs();
  };

  const openProject = (project: Project) => {
    setSelected(project);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${project.slug}`);
    }
  };

  const closeProject = () => {
    setSelected(null);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", view === "experience" ? "#experience" : "#projects");
    }
  };

  return (
    <>
      <div
        ref={tabsRef}
        className="sticky top-[76px] z-30 scroll-mt-24 border-y border-white/[0.08] bg-ink/85 backdrop-blur-xl"
      >
        <div className="container-page flex items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => changeView("projects")}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-[13px] transition-all duration-300",
                view === "projects"
                  ? "bg-acid text-ink"
                  : "text-bone-muted hover:bg-white/[0.05] hover:text-bone",
              )}
            >
              Projects
              <span
                className={cn(
                  "font-mono text-[9px]",
                  view === "projects" ? "text-ink/60" : "text-bone-muted/50",
                )}
              >
                {projects.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => changeView("experience")}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-[13px] transition-all duration-300",
                view === "experience"
                  ? "bg-acid text-ink"
                  : "text-bone-muted hover:bg-white/[0.05] hover:text-bone",
              )}
            >
              Experience
              <span
                className={cn(
                  "font-mono text-[9px]",
                  view === "experience" ? "text-ink/60" : "text-bone-muted/50",
                )}
              >
                {experiences.length}
              </span>
            </button>
          </div>
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.14em] text-bone-muted/50 md:block">
            {view === "projects" ? "35+ files / 6 categories" : "16 chapters / 6 industries"}
          </span>
        </div>
      </div>

      {view === "projects" ? (
        <div className="container-page py-10 md:py-14">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-1 lg:mx-0 lg:flex-wrap lg:px-0">
              {projectCategories.map((item) => (
                <FilterChip
                  key={item.value}
                  active={category === item.value}
                  label={item.label}
                  count={item.count}
                  onClick={() => setCategory(item.value)}
                />
              ))}
            </div>
            <div className="relative w-full shrink-0 lg:w-72">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-bone-muted/50" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects, stacks…"
                aria-label="Search projects"
                className="h-10 w-full rounded-full border border-white/10 bg-white/[0.02] pl-9 pr-9 text-[12px] text-bone outline-none transition-colors placeholder:text-bone-muted/40 focus:border-acid/40"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-bone-muted/60 transition-colors hover:bg-white/10 hover:text-bone"
                >
                  <X className="h-3 w-3" />
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-bone-muted/60">
              Showing {filteredProjects.length} of {projects.length}
            </span>
            {category !== "All" || query ? (
              <button
                type="button"
                onClick={() => {
                  setCategory("All");
                  setQuery("");
                }}
                className="font-mono text-[9px] uppercase tracking-[0.12em] text-acid transition-colors hover:text-acid-soft"
              >
                Reset filters
              </button>
            ) : null}
          </div>

          {filteredProjects.length ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={index}
                  onOpen={() => openProject(project)}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.01] px-6 text-center">
              <p className="text-lg text-bone">No projects match that filter.</p>
              <p className="mt-2 text-sm text-bone-muted">
                Try a broader category or a different search term.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCategory("All");
                  setQuery("");
                }}
                className="mt-5 rounded-full border border-acid/30 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.12em] text-acid"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="container-page py-10 md:py-14">
          <div className="flex flex-col gap-8 border-t border-white/[0.08] pt-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow text-acid">Past experience</div>
              <h2 className="display mt-4 max-w-2xl text-[clamp(2rem,4.5vw,3.5rem)] text-bone">
                Sixteen chapters across six industries.
              </h2>
              <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-bone-muted">
                Growth, product and AI work from 2012 to today. Filter by the
                industry you care about, or download the CV that fits the
                conversation.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <a href="/cv/fernando-guerra-ai-engineer.pdf" download>
                  AI CV
                  <ArrowDownToLine />
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href="/cv/fernando-guerra-igaming.pdf" download>
                  Growth CV
                  <ArrowDownToLine />
                </a>
              </Button>
            </div>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-4">
            {highlights.slice(0, 4).map((highlight) => (
              <div key={highlight.label} className="bg-card p-4 md:p-5">
                <div className="text-2xl font-medium tracking-[-0.03em] text-acid md:text-3xl">
                  {highlight.value}
                </div>
                <div className="mt-1 text-[11px] text-bone">{highlight.label}</div>
                <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.06em] text-bone-muted/50">
                  {highlight.note}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-between gap-3">
            <div className="eyebrow text-acid">Principal industries</div>
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-bone-muted/40">
              Filter the timeline
            </span>
          </div>

          <div className="no-scrollbar -mx-6 mt-3 flex gap-2 overflow-x-auto px-6 pb-1 md:mx-0 md:flex-wrap md:px-0">
            {experienceTags.map((tag) => {
              const tagValue = tag.value;
              const count =
                tagValue === "All"
                  ? experiences.length
                  : experiences.filter((experience) => experience.tags.includes(tagValue)).length;
              return (
                <FilterChip
                  key={tag.value}
                  active={experienceTag === tag.value}
                  label={tag.label}
                  count={count}
                  onClick={() => setExperienceTag(tag.value)}
                />
              );
            })}
          </div>

          <div className="relative mt-6">
            <div className="timeline-rail absolute bottom-0 left-[11px] top-0 hidden w-px md:block" />
            {filteredExperience.map((experience) => (
              <ExperienceItem key={`${experience.company}-${experience.role}`} experience={experience} />
            ))}
          </div>
        </div>
      )}

      <Dialog open={Boolean(selected)} onOpenChange={(open) => (!open ? closeProject() : null)}>
        <DialogContent className="max-w-3xl p-0">
          {selected ? (
            <>
              <div className="relative overflow-hidden border-b border-white/[0.08] p-6 pr-16 md:p-8 md:pr-24">
                <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 text-acid/15 md:h-52 md:w-52">
                  <ProjectGlyph variant={selected.glyph} />
                </div>
                <div className="relative flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-acid">
                    {selected.category}
                  </span>
                  <span className="h-px w-5 bg-white/15" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-bone-muted/60">
                    {selected.year}
                  </span>
                  <Badge variant={statusVariant(selected.status)}>{selected.status}</Badge>
                </div>
                <DialogTitle className="relative mt-4 max-w-2xl text-3xl tracking-[-0.04em] md:text-5xl">
                  {selected.name}
                </DialogTitle>
                <DialogDescription className="relative mt-3 max-w-xl text-[14px] leading-relaxed text-bone-muted md:text-base">
                  {selected.tagline}
                </DialogDescription>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-[14px] leading-relaxed text-bone-muted md:text-[15px]">
                  {selected.description}
                </p>

                {selected.highlights ? (
                  <div className="mt-7">
                    <div className="eyebrow text-bone-muted/60">What makes it interesting</div>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {selected.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 text-[12px] leading-relaxed text-bone-muted"
                        >
                          <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-acid/70" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-7">
                  <div className="eyebrow text-bone-muted/60">Stack</div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {selected.tech.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-bone-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-white/[0.08] pt-6">
                  {selected.links?.map((link) => {
                    const Icon = linkIcon(link.kind);
                    return (
                      <Button key={link.href} asChild variant="outline" size="sm">
                        <a href={link.href} target="_blank" rel="noreferrer">
                          <Icon />
                          {link.label}
                          <ArrowUpRight />
                        </a>
                      </Button>
                    );
                  })}
                  <Button type="button" variant="ghost" size="sm" onClick={closeProject}>
                    Close
                  </Button>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
