"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
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

const attendanceData = [
  { name: "Mon", attendance: 90 },
  { name: "Tue", attendance: 85 },
  { name: "Wed", attendance: 95 },
  { name: "Thu", attendance: 88 },
  { name: "Fri", attendance: 92 },
]

function TeacherChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lg">
      <div className="text-sm font-semibold text-slate-950">{label}</div>
      <div className="mt-1 text-sm text-slate-600">Attendance: {payload[0]?.value}%</div>
    </div>
  )
}

export default function TeacherAttendanceChart() {
  return (
    <Card className="border border-white/80 bg-white/90 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
      <CardHeader>
        <CardTitle>Attendance overview</CardTitle>
        <CardDescription>Average classroom attendance across the current teaching week.</CardDescription>
      </CardHeader>
      <CardContent className="h-[320px] min-w-0">
        <div className="h-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceData} barCategoryGap={24}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#dbe4f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748b" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b" }} />
              <Tooltip content={<TeacherChartTooltip />} cursor={{ fill: "rgba(15,23,42,0.04)" }} />
              <Bar dataKey="attendance" radius={[14, 14, 0, 0]} fill="#0f766e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
