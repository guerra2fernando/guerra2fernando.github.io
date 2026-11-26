import { marqueeItems } from "@/lib/data";

export function Marquee() {
  const row = [...marqueeItems, ...marqueeItems];

  return (
    <div className="marquee-mask overflow-hidden border-y border-white/[0.07] bg-white/[0.012] py-4">
      <div className="flex w-max animate-marquee items-center gap-8 hover:[animation-play-state:paused]">
        {row.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-muted/80 md:text-[11px]">
              {item}
            </span>
            <span className="text-[9px] text-acid/70">✳</span>
          </div>
        ))}
      </div>
    </div>
  );
}
