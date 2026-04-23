import {
  BadgeDollarSign,
  Building2,
  GraduationCap,
  Users,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Metric } from "@/lib/sms-data"

const metricIcons = [Users, GraduationCap, Building2, BadgeDollarSign]

export function DashboardCards({ metrics }: { metrics: Metric[] }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
      {metrics.map((metric, index) => {
        const Icon = metricIcons[index] ?? Users

        return (
          <Card
            key={metric.label}
            className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_-48px_rgba(15,23,42,0.6)]"
          >
            <CardHeader className="gap-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  <Icon className="size-5" />
                </div>
                <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {metric.delta}
                </div>
              </div>
              <div>
                <CardDescription>{metric.label}</CardDescription>
                <CardTitle className="mt-2 text-3xl tracking-tight">{metric.value}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-slate-600">{metric.note}</p>
            </CardContent>
          </Card>
        )
      })}
    </section>
  )
}
