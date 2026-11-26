"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navItems, site } from "@/lib/data";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || open
            ? "border-b border-white/[0.07] bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-page flex h-[76px] items-center justify-between gap-6">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label={`${site.name} — home`}
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] font-mono text-[10px] tracking-tight text-bone transition-colors duration-300 group-hover:border-acid/50 group-hover:text-acid">
              FG
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-acid shadow-[0_0_10px_rgba(201,242,95,0.9)]" />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="text-[13px] font-medium tracking-tight text-bone">
                {site.name}
              </span>
              <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-bone-muted">
                AI / Growth
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] transition-colors",
                    active ? "text-bone" : "text-bone-muted hover:text-bone",
                  )}
                >
                  <span className="font-mono text-[9px] tracking-[0.1em] text-bone-muted/60">
                    {item.number}
                  </span>
                  {item.label}
                  <span
                    className={cn(
                      "absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-acid transition-opacity",
                      active ? "opacity-100" : "opacity-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-bone-muted lg:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-acid animate-pulse-dot" />
              Tbilisi, GE
            </span>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href={`mailto:${site.email}`}>
                Get in touch
                <ArrowUpRight />
              </a>
            </Button>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-bone transition-colors hover:border-white/25 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-ink px-6 pb-10 pt-28 transition-all duration-500 md:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex flex-1 flex-col justify-center gap-2">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-baseline justify-between border-b border-white/[0.07] py-5 transition-all duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              )}
              style={{ transitionDelay: open ? `${120 + index * 60}ms` : "0ms" }}
            >
              <span className="flex items-baseline gap-4">
                <span className="font-mono text-[10px] text-bone-muted">
                  {item.number}
                </span>
                <span className="display text-5xl text-bone">{item.label}</span>
              </span>
              <ArrowUpRight className="h-5 w-5 text-bone-muted transition-colors group-hover:text-acid" />
            </Link>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-4">
          <a
            href={`mailto:${site.email}`}
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-acid"
          >
            {site.email}
          </a>
          <div className="flex gap-5 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-muted">
            <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-bone">
              GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-bone">
              LinkedIn
            </a>
            <span>{site.location}</span>
          </div>
        </div>
      </div>
    </>
  );
}
