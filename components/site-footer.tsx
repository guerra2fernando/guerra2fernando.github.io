import Link from "next/link";
import { ArrowUp, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

import { navItems, site } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-ink-2">
      <div className="pointer-events-none absolute inset-0 dot-bg opacity-[0.18]" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-acid/[0.06] blur-[120px]" />

      <div className="container-page relative py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <div className="eyebrow mb-6 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-acid animate-pulse-dot" />
              Available for select collaborations
            </div>
            <h2 className="display max-w-3xl text-[clamp(2.75rem,7vw,6.5rem)] text-bone">
              Have a system
              <br />
              worth <span className="serif-accent text-acid">building?</span>
            </h2>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-sm text-[15px] leading-relaxed text-bone-muted">
              I partner with founders and teams on AI products, growth infrastructure
              and the systems that connect them. Tell me what is stuck.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="group mt-7 inline-flex items-center gap-3 text-xl text-bone transition-colors hover:text-acid md:text-2xl"
            >
              {site.email}
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-acid/50 group-hover:bg-acid group-hover:text-ink">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-white/[0.08] pt-10 md:grid-cols-[1.2fr_0.8fr]">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 font-mono text-[10px] text-bone">
                FG
              </span>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-medium text-bone">{site.name}</span>
                <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-bone-muted">
                  {site.role}
                </span>
              </div>
            </div>
            <p className="max-w-sm text-[13px] leading-relaxed text-bone-muted">
              Built in Tbilisi with Next.js, Tailwind CSS and Three.js. The work is
              real; the coffee is Georgian.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone-muted/60">
                Index
              </span>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[13px] text-bone-muted transition-colors hover:text-acid"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone-muted/60">
                Elsewhere
              </span>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[13px] text-bone-muted transition-colors hover:text-acid"
              >
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[13px] text-bone-muted transition-colors hover:text-acid"
              >
                <Linkedin className="h-3.5 w-3.5" /> LinkedIn
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 text-[13px] text-bone-muted transition-colors hover:text-acid"
              >
                <Mail className="h-3.5 w-3.5" /> Email
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone-muted/60">
                Location
              </span>
              <span className="text-[13px] text-bone-muted">{site.location}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-bone-muted/60">
                41.7151° N, 44.8271° E
              </span>
              <a
                href="#top"
                className="mt-2 inline-flex items-center gap-2 text-[12px] text-bone-muted transition-colors hover:text-acid"
              >
                Back to top <ArrowUp className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/[0.06] pt-6 font-mono text-[9px] uppercase tracking-[0.14em] text-bone-muted/50 sm:flex-row">
          <span>© 2026 {site.name}. All rights reserved.</span>
          <span>Design & code — Fernando Guerra</span>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none select-none overflow-hidden whitespace-nowrap px-4 pb-2 text-center text-[17vw] font-medium leading-[0.75] tracking-[-0.06em] text-transparent"
        style={{ WebkitTextStroke: "1px rgba(241,243,233,0.08)" }}
      >
        FERNANDO
      </div>
    </footer>
  );
}
