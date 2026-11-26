import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageHeroProps = {
  index: string;
  label: string;
  title: ReactNode;
  description: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function PageHero({
  index,
  label,
  title,
  description,
  meta,
  children,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44", className)}>
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-70" />
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-acid/[0.05] blur-[120px]" />

      <div className="container-page relative">
        <div className="eyebrow flex items-center gap-3">
          <span className="text-acid">{index}</span>
          <span className="h-px w-10 bg-white/20" />
          <span>{label}</span>
        </div>

        <h1 className="display mt-8 max-w-6xl text-[clamp(3.4rem,10vw,8.75rem)] text-bone">
          {title}
        </h1>

        <div className="mt-10 grid gap-8 border-t border-white/[0.08] pt-7 md:mt-14 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <div className="max-w-2xl text-[15px] leading-relaxed text-bone-muted md:text-lg">
            {description}
          </div>
          {meta ? <div className="md:justify-self-end">{meta}</div> : null}
        </div>

        {children}
      </div>
    </section>
  );
}
