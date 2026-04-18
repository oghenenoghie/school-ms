import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { TimelineBar } from "@/lib/sms-data"

export function Chart({
  title,
  description,
  bars,
}: {
  title: string
  description: string
  bars: TimelineBar[]
}) {
  return (
    <Card className="border border-slate-200/80 bg-white/90">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 items-end gap-3">
          {bars.map((bar) => (
            <div key={bar.label} className="flex flex-col items-center gap-3">
              <div className="flex h-40 w-full items-end rounded-2xl bg-slate-100 p-2">
                <div
                  className="w-full rounded-xl bg-[linear-gradient(180deg,#0f172a_0%,#0f766e_100%)]"
                  style={{ height: `${bar.value}%` }}
                />
              </div>
              <div className="text-sm font-medium text-slate-600">{bar.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
