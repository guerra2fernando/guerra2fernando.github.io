import type { ProjectStatus } from "@/lib/data";

export function statusVariant(status: ProjectStatus) {
  switch (status) {
    case "Live":
      return "live" as const;
    case "Open source":
      return "acid" as const;
    case "Prototype":
      return "prototype" as const;
    case "Research":
      return "research" as const;
    default:
      return "default" as const;
  }
}
