import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

type GlyphProps = {
  variant: Project["glyph"];
  className?: string;
};

export function ProjectGlyph({ variant = "grid", className }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
      stroke="currentColor"
      strokeWidth="1"
    >
      {variant === "network" && (
        <>
          <path d="M48 76 96 48l52 30 44-22M48 76l28 62 44-12 28 50 44-22M120 96l40 46M76 138l-8 54M120 96l72-20M96 48l24 48" opacity=".45" />
          {[
            [48, 76], [96, 48], [148, 78], [192, 56], [76, 138], [120, 96], [168, 142], [120, 176], [68, 192], [212, 120],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 4 : 2.2} fill="currentColor" stroke="none" opacity={i % 3 === 0 ? 1 : 0.55} />
          ))}
          <circle cx="120" cy="120" r="86" strokeDasharray="2 8" opacity=".25" />
        </>
      )}

      {variant === "layers" && (
        <>
          <rect x="42" y="74" width="120" height="74" rx="6" opacity=".2" transform="rotate(-8 42 74)" />
          <rect x="62" y="84" width="120" height="74" rx="6" opacity=".45" transform="rotate(-3 62 84)" />
          <rect x="78" y="94" width="120" height="74" rx="6" opacity=".9" />
          <path d="M94 114h60M94 128h88M94 142h44" opacity=".5" />
          <circle cx="196" cy="54" r="14" strokeDasharray="2 5" opacity=".5" />
          <path d="M204 44v20M194 54h20" opacity=".5" />
        </>
      )}

      {variant === "wave" && (
        <>
          <path d="M24 120h18l10-38 16 76 16-96 18 118 16-74 16 38 16-56 14 54 16-22h18" opacity=".9" />
          <path d="M24 154h192" opacity=".15" strokeDasharray="3 7" />
          <path d="M24 86h192" opacity=".15" strokeDasharray="3 7" />
          {[58, 84, 110, 136, 162, 188].map((x, i) => (
            <circle key={x} cx={x} cy={i % 2 === 0 ? 120 : 104} r="2" fill="currentColor" stroke="none" opacity=".5" />
          ))}
        </>
      )}

      {variant === "orbit" && (
        <>
          <circle cx="120" cy="120" r="34" opacity=".9" />
          <ellipse cx="120" cy="120" rx="88" ry="34" transform="rotate(-24 120 120)" opacity=".5" />
          <ellipse cx="120" cy="120" rx="88" ry="34" transform="rotate(38 120 120)" opacity=".3" />
          <ellipse cx="120" cy="120" rx="72" ry="24" transform="rotate(82 120 120)" opacity=".2" />
          <circle cx="196" cy="88" r="5" fill="currentColor" stroke="none" />
          <circle cx="70" cy="162" r="3" fill="currentColor" stroke="none" opacity=".6" />
          <path d="M120 86v68M86 120h68" opacity=".25" />
        </>
      )}

      {variant === "grid" && (
        <>
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <circle
                key={`${row}-${col}`}
                cx={60 + col * 40}
                cy={60 + row * 40}
                r={(row + col) % 3 === 0 ? 4 : 2}
                fill="currentColor"
                stroke="none"
                opacity={(row + col) % 3 === 0 ? 1 : 0.3}
              />
            )),
          )}
          <rect x="88" y="88" width="64" height="64" rx="4" opacity=".55" />
        </>
      )}

      {variant === "relay" && (
        <>
          <circle cx="120" cy="120" r="24" opacity=".9" />
          <circle cx="120" cy="120" r="58" opacity=".3" strokeDasharray="2 6" />
          <circle cx="120" cy="120" r="88" opacity=".18" strokeDasharray="2 6" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <g key={angle}>
                <path
                  d={`M${120 + Math.cos(rad) * 30} ${120 + Math.sin(rad) * 30}L${120 + Math.cos(rad) * 84} ${120 + Math.sin(rad) * 84}`}
                  opacity=".35"
                />
                <circle
                  cx={120 + Math.cos(rad) * 86}
                  cy={120 + Math.sin(rad) * 86}
                  r="3"
                  fill="currentColor"
                  stroke="none"
                  opacity=".8"
                />
              </g>
            );
          })}
        </>
      )}

      {variant === "candles" && (
        <>
          {[
            [52, 118, 54], [78, 92, 74], [104, 126, 46], [130, 76, 82], [156, 100, 62], [182, 56, 98],
          ].map(([x, y, h], i) => (
            <g key={x}>
              <path d={`M${x + 7} ${y - 16}v${h + 30}`} opacity=".35" />
              <rect
                x={x}
                y={y}
                width="14"
                height={h}
                rx="1.5"
                fill={i % 2 === 0 ? "currentColor" : "none"}
                opacity={i % 2 === 0 ? ".7" : ".9"}
              />
            </g>
          ))}
          <path d="M38 176h164" opacity=".2" />
        </>
      )}

      {variant === "book" && (
        <>
          <path d="M64 54c26-10 44-4 56 8 12-12 30-18 56-8v128c-26-10-44-4-56 8-12-12-30-18-56-8V54Z" opacity=".8" />
          <path d="M120 62v128" opacity=".4" />
          <path d="M82 82h22M82 98h18M82 114h22M138 82h22M138 98h18M138 114h22" opacity=".35" />
          <circle cx="120" cy="48" r="10" strokeDasharray="2 4" opacity=".4" />
        </>
      )}

      {variant === "bars" && (
        <>
          {[48, 78, 108, 138, 168, 198].map((x, i) => (
            <rect
              key={x}
              x={x}
              y={176 - [34, 62, 44, 96, 72, 120][i]}
              width="18"
              height={[34, 62, 44, 96, 72, 120][i]}
              rx="2"
              fill="currentColor"
              opacity={i === 5 ? ".85" : ".3"}
            />
          ))}
          <path d="M38 176h168" opacity=".2" />
          <path d="M48 142c30-10 34-34 60-28s34 26 56-8 28-34 40-48" opacity=".55" strokeDasharray="3 5" />
        </>
      )}

      {variant === "pulse" && (
        <>
          <circle cx="120" cy="120" r="18" fill="currentColor" fillOpacity=".15" />
          <circle cx="120" cy="120" r="42" opacity=".55" />
          <circle cx="120" cy="120" r="68" opacity=".3" strokeDasharray="2 6" />
          <circle cx="120" cy="120" r="92" opacity=".16" strokeDasharray="2 8" />
          <path d="M28 120h54l12-24 16 48 14-34 10 10h68" opacity=".9" />
        </>
      )}

      {variant === "rings" && (
        <>
          <circle cx="120" cy="120" r="26" opacity=".85" />
          <circle cx="120" cy="120" r="50" opacity=".45" strokeDasharray="4 8" />
          <circle cx="120" cy="120" r="74" opacity=".25" />
          <circle cx="120" cy="120" r="96" opacity=".12" strokeDasharray="2 9" />
          <circle cx="194" cy="120" r="4" fill="currentColor" stroke="none" />
          <circle cx="120" cy="46" r="3" fill="currentColor" stroke="none" opacity=".6" />
          <circle cx="46" cy="120" r="2.5" fill="currentColor" stroke="none" opacity=".5" />
        </>
      )}

      {variant === "chart" && (
        <>
          <path d="M40 64v128h168" opacity=".25" />
          <path d="M54 160c20-6 24-34 42-38s28 26 46 6 30-54 52-66" opacity=".9" />
          <path d="M54 176c24-2 34-18 50-20s28 12 44-8 28-30 46-38" opacity=".3" strokeDasharray="3 6" />
          <circle cx="194" cy="62" r="4" fill="currentColor" stroke="none" />
          <path d="M54 88h164M54 120h164M54 152h164" opacity=".1" strokeDasharray="2 7" />
        </>
      )}

      {variant === "map" && (
        <>
          <path d="M48 58 96 44l48 16 48-14v126l-48 14-48-16-48 14V58Z" opacity=".55" />
          <path d="M96 44v126M144 60v126" opacity=".25" />
          <circle cx="120" cy="112" r="10" opacity=".9" />
          <circle cx="120" cy="112" r="24" strokeDasharray="2 5" opacity=".5" />
          <path d="M120 112 156 78" opacity=".6" />
        </>
      )}

      {variant === "cosmos" && (
        <>
          <circle cx="120" cy="120" r="30" fill="currentColor" fillOpacity=".08" />
          <ellipse cx="120" cy="120" rx="92" ry="30" transform="rotate(-18 120 120)" opacity=".45" />
          <ellipse cx="120" cy="120" rx="92" ry="30" transform="rotate(52 120 120)" opacity=".25" />
          <ellipse cx="120" cy="120" rx="68" ry="22" transform="rotate(104 120 120)" opacity=".18" />
          <circle cx="196" cy="92" r="6" fill="currentColor" stroke="none" />
          <circle cx="58" cy="152" r="3" fill="currentColor" stroke="none" opacity=".7" />
          <circle cx="142" cy="44" r="2" fill="currentColor" stroke="none" opacity=".6" />
          {[
            [40, 50], [72, 30], [188, 40], [210, 170], [36, 190], [170, 200], [96, 210], [220, 118],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.2" fill="currentColor" stroke="none" opacity=".5" />
          ))}
        </>
      )}

      {variant === "nodes" && (
        <>
          <path d="M120 52 184 88v64l-64 36-64-36V88l64-36Z" opacity=".6" />
          <path d="M120 52v136M56 88l128 64M184 88 56 152" opacity=".18" />
          <circle cx="120" cy="120" r="14" opacity=".9" />
          {[
            [120, 52], [184, 88], [184, 152], [120, 188], [56, 152], [56, 88],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="currentColor" stroke="none" opacity=".7" />
          ))}
        </>
      )}

      {variant === "target" && (
        <>
          <circle cx="120" cy="120" r="78" opacity=".2" />
          <circle cx="120" cy="120" r="52" opacity=".45" />
          <circle cx="120" cy="120" r="26" opacity=".8" />
          <circle cx="120" cy="120" r="5" fill="currentColor" stroke="none" />
          <path d="M120 24v44M120 172v44M24 120h44M172 120h44" opacity=".4" />
          <path d="M156 84 120 120" opacity=".7" />
          <path d="M148 76h16v16" opacity=".7" />
        </>
      )}

      {variant === "doc" && (
        <>
          <path d="M68 40h76l32 32v128H68V40Z" opacity=".8" />
          <path d="M144 40v32h32" opacity=".5" />
          <path d="M88 96h68M88 114h52M88 132h68M88 150h40" opacity=".35" />
          <circle cx="178" cy="178" r="18" fill="currentColor" fillOpacity=".12" opacity=".8" />
          <path d="m170 178 6 6 12-14" opacity=".9" />
        </>
      )}

      {variant === "cards" && (
        <>
          <rect x="58" y="70" width="92" height="124" rx="8" transform="rotate(-12 58 70)" opacity=".3" />
          <rect x="88" y="58" width="92" height="124" rx="8" transform="rotate(6 88 58)" opacity=".6" />
          <rect x="82" y="76" width="92" height="124" rx="8" opacity=".9" />
          <path d="M100 102h56M100 120h38" opacity=".4" />
          <circle cx="154" cy="168" r="12" opacity=".55" />
          <path d="m148 168 4 4 8-9" opacity=".8" />
        </>
      )}

      {variant === "radar" && (
        <>
          <circle cx="120" cy="120" r="88" opacity=".18" />
          <circle cx="120" cy="120" r="60" opacity=".28" />
          <circle cx="120" cy="120" r="32" opacity=".4" />
          <path d="M120 120 120 32A88 88 0 0 1 198 90Z" fill="currentColor" fillOpacity=".08" opacity=".8" />
          <path d="M120 120 190 78" opacity=".8" />
          <circle cx="160" cy="88" r="4" fill="currentColor" stroke="none" />
          <circle cx="92" cy="150" r="3" fill="currentColor" stroke="none" opacity=".7" />
          <circle cx="146" cy="146" r="2.5" fill="currentColor" stroke="none" opacity=".5" />
          <path d="M120 24v14M120 202v14M24 120h14M202 120h14" opacity=".3" />
        </>
      )}
    </svg>
  );
}
