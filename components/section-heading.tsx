import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  action?: { label: string; href: string };
  className?: string;
};

export function SectionHeading({
  index,
  label,
  title,
  description,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <div className="flex flex-col gap-6 border-t border-white/[0.08] pt-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="eyebrow flex items-center gap-3">
            <span className="text-acid">{index}</span>
            <span className="h-px w-8 bg-white/20" />
            <span>{label}</span>
          </div>
          <h2 className="display mt-5 max-w-4xl text-[clamp(2.5rem,5.5vw,4.75rem)] text-bone">
            {title}
          </h2>
        </div>
        {action ? (
          <Link
            href={action.href}
            className="group inline-flex shrink-0 items-center gap-2 self-start font-mono text-[10px] uppercase tracking-[0.16em] text-bone-muted transition-colors hover:text-acid md:self-end"
          >
            {action.label}
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-acid/40 group-hover:bg-acid group-hover:text-ink">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ) : null}
      </div>
      {description ? (
        <p className="max-w-2xl text-[15px] leading-relaxed text-bone-muted md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
