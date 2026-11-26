import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors",
  {
    variants: {
      variant: {
        default: "border-white/10 bg-white/[0.03] text-bone-muted",
        acid: "border-acid/25 bg-acid/[0.08] text-acid",
        outline: "border-white/15 text-bone-muted",
        live: "border-acid/30 bg-acid/[0.08] text-acid",
        private: "border-white/10 bg-white/[0.03] text-bone-muted",
        research: "border-mint/25 bg-mint/[0.06] text-mint",
        prototype: "border-ember/25 bg-ember/[0.07] text-ember",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
