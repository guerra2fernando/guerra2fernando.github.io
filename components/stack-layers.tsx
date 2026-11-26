"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { stackLayers } from "@/lib/data";
import { cn } from "@/lib/utils";

export function StackLayers() {
  const [active, setActive] = useState(0);
  const layer = stackLayers[active];

  return (
    <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
      <div className="flex flex-col">
        {stackLayers.map((item, index) => {
          const isActive = index === active;
          return (
            <button
              key={item.number}
              type="button"
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              aria-expanded={isActive}
              className={cn(
                "group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-t border-white/[0.08] py-5 text-left transition-colors duration-300 last:border-b",
                isActive ? "text-bone" : "text-bone-muted hover:text-bone",
              )}
            >
              <span
                className={cn(
                  "font-mono text-[10px] tracking-[0.14em] transition-colors",
                  isActive ? "text-acid" : "text-bone-muted/50",
                )}
              >
                {item.number}
              </span>
              <span>
                <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span
                    className={cn(
                      "text-xl tracking-[-0.02em] transition-colors md:text-2xl",
                      isActive ? "text-bone" : "text-bone-muted",
                    )}
                  >
                    {item.name}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-bone-muted/60">
                    {item.tagline}
                  </span>
                </span>
                <span
                  className={cn(
                    "mt-2 block max-h-0 overflow-hidden text-[13px] leading-relaxed text-bone-muted transition-all duration-500 lg:hidden",
                    isActive ? "max-h-40" : "max-h-0",
                  )}
                >
                  {item.description}
                </span>
              </span>
              <ArrowUpRight
                className={cn(
                  "h-4 w-4 transition-all duration-300",
                  isActive
                    ? "text-acid opacity-100"
                    : "text-bone-muted opacity-0 group-hover:opacity-60",
                )}
              />
            </button>
          );
        })}
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-ink-2 p-7 md:p-9 lg:sticky lg:top-28 lg:self-start">
        <div className="pointer-events-none absolute inset-0 dot-bg opacity-[0.18]" />
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-acid/[0.08] blur-[70px]" />
        <span className="pointer-events-none absolute right-5 top-24 select-none font-sans text-[9rem] font-medium leading-none tracking-[-0.08em] text-white/[0.025] md:text-[11rem]">
          {layer.number}
        </span>

        <div key={layer.number} className="relative animate-fade-up">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="eyebrow text-acid">Layer {layer.number}</div>
              <h3 className="mt-3 text-4xl font-medium tracking-[-0.04em] text-bone md:text-5xl">
                {layer.name}
              </h3>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-muted/50">
              {String(active + 1).padStart(2, "0")} / 05
            </span>
          </div>

          <p className="mt-5 text-[15px] leading-relaxed text-bone-muted">
            {layer.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {layer.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-bone-muted"
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="mt-8 border-t border-white/[0.08] pt-5">
            <div className="eyebrow text-bone-muted/50">Outcome</div>
            <p className="mt-2 text-sm leading-relaxed text-bone">
              {layer.outcome}
            </p>
          </div>
        </div>

        <div className="relative mt-8 grid grid-cols-5 gap-1.5">
          {stackLayers.map((item, index) => (
            <span
              key={item.number}
              className={cn(
                "h-1 rounded-full transition-colors duration-500",
                index <= active ? "bg-acid/70" : "bg-white/10",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
