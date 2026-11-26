import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-28">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <div className="container-page relative">
        <div className="eyebrow text-acid">404 / Signal lost</div>
        <h1 className="display mt-6 max-w-4xl text-[clamp(3.5rem,10vw,8rem)] text-bone">
          This page is not in the{" "}
          <span className="serif-accent text-acid">index.</span>
        </h1>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-bone-muted">
          The link may have moved, or the project might still be in the lab. The
          archive is the best place to pick up the trail.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/developments">Open the archive</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to the entrance</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
