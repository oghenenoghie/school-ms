import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Tone } from "@/lib/sms-data"

const toneClasses: Record<Tone, string> = {
  default: "border-border bg-background text-foreground",
  info: "border-sky-200 bg-sky-50 text-sky-900",
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  warning: "border-amber-200 bg-amber-50 text-amber-950",
  danger: "border-rose-200 bg-rose-50 text-rose-900",
}

export function StatusBadge({
  label,
  tone = "default",
  className,
}: {
  label: string
  tone?: Tone
  className?: string
}) {
  return (
    <Badge
      variant="outline"
      className={cn("rounded-full px-2.5 py-1 text-xs font-medium", toneClasses[tone], className)}
    >
      {label}
    </Badge>
  )
}
