import { ArrowUpRight } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardCard({
  label,
  value,
  delta,
  note,
}: {
  label: string
  value: string
  delta: string
  note: string
}) {
  return (
    <Card className="border border-white/70 bg-white/90 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.45)] backdrop-blur">
      <CardHeader className="gap-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-slate-700">{label}</CardTitle>
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-slate-950 text-white">
            <ArrowUpRight data-icon="inline-end" />
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="text-3xl font-semibold tracking-tight text-slate-950">{value}</div>
        <div className="text-sm font-medium text-emerald-700">{delta}</div>
        <p className="text-sm leading-6 text-slate-600">{note}</p>
      </CardContent>
    </Card>
  )
}
