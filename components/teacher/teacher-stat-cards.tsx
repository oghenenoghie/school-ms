import {
  CalendarDays,
  ClipboardList,
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

const teacherStats = [
  {
    title: "Students",
    value: "120",
    detail: "Across assigned sections",
    icon: Users,
  },
  {
    title: "Classes",
    value: "6",
    detail: "Two practical labs this week",
    icon: GraduationCap,
  },
  {
    title: "Attendance",
    value: "92%",
    detail: "Above the faculty target",
    icon: CalendarDays,
  },
  {
    title: "Pending tasks",
    value: "8",
    detail: "Assignments and parent follow-ups",
    icon: ClipboardList,
  },
]

export default function TeacherStatCards() {
  return (
    <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
      {teacherStats.map((stat) => {
        const Icon = stat.icon

        return (
          <Card
            key={stat.title}
            className="border border-white/80 bg-white/90 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_-48px_rgba(15,23,42,0.6)]"
          >
            <CardHeader className="gap-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  <Icon className="size-5" />
                </div>
                <div className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                  Live
                </div>
              </div>
              <div>
                <CardDescription>{stat.title}</CardDescription>
                <CardTitle className="mt-2 text-3xl tracking-tight">{stat.value}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-slate-600">{stat.detail}</p>
            </CardContent>
          </Card>
        )
      })}
    </section>
  )
}
