"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type {
  ChartPoint,
  DistributionPoint,
} from "@/lib/dashboard-data"

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number; color?: string }>
  label?: string
}) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lg">
      <p className="text-sm font-semibold text-slate-950">{label}</p>
      <div className="mt-2 flex flex-col gap-1.5">
        {payload.map((entry) => (
          <div key={`${entry.name}-${entry.value}`} className="text-sm text-slate-600">
            <span className="font-medium text-slate-950">{entry.name}:</span> {entry.value}
          </div>
        ))}
      </div>
    </div>
  )
}

export function DashboardCharts({
  barTitle,
  barDescription,
  barData,
  pieTitle,
  pieDescription,
  pieData,
}: {
  barTitle: string
  barDescription: string
  barData: ChartPoint[]
  pieTitle: string
  pieDescription: string
  pieData: DistributionPoint[]
}) {
  return (
    <section className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
      <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
        <CardHeader>
          <CardTitle>{barTitle}</CardTitle>
          <CardDescription>{barDescription}</CardDescription>
        </CardHeader>
        <CardContent className="h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} barCategoryGap={18}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#dbe4f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748b" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b" }} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(15,23,42,0.04)" }} />
              <Bar dataKey="value" name="Primary" radius={[12, 12, 0, 0]} fill="#0f766e" />
              <Bar dataKey="secondary" name="Secondary" radius={[12, 12, 0, 0]} fill="#1d4ed8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
        <CardHeader>
          <CardTitle>{pieTitle}</CardTitle>
          <CardDescription>{pieDescription}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5 xl:grid-cols-[1fr_160px] xl:items-center">
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col gap-3">
            {pieData.map((entry) => (
              <div
                key={entry.name}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-slate-950">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  {entry.name}
                </div>
                <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                  {entry.value}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
