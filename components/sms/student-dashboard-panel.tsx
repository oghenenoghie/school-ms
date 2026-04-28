import { BookOpenCheck, CalendarClock, CreditCard, GraduationCap } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { roleConfigs, studentAssignments, studentHighlights, timetable } from "@/lib/sms-data"

const studentOverviewCards = [
  {
    title: "Attendance",
    value: "92%",
    icon: CalendarClock,
    note: "Strong monthly presence with only a few late marks.",
  },
  {
    title: "Assignments",
    value: "3 Pending",
    icon: BookOpenCheck,
    note: "Two science tasks and one math practice set still need action.",
  },
  {
    title: "GPA",
    value: "3.8",
    icon: GraduationCap,
    note: "Projected average remains above the target threshold.",
  },
  {
    title: "Fees",
    value: "Pending",
    icon: CreditCard,
    note: "Next installment remains visible so there are no surprises.",
  },
]

const studentSubjects = [
  "Mathematics",
  "English",
  "Physics",
  "Biology",
  "ICT",
  "Geography",
]

export function StudentDashboardPanel() {
  const config = roleConfigs.student

  return (
    <section className="space-y-6">
      <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
        <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
              Student panel
            </div>
            <CardTitle className="mt-2 text-2xl">Daily student dashboard</CardTitle>
            <CardDescription className="mt-2 max-w-2xl">
              Timetable, assignments, announcements, attendance, and profile signals in one focused
              academic view.
            </CardDescription>
          </div>
          <div className="rounded-[1.5rem] bg-slate-950 p-4 text-white">
            <div className="text-sm text-white/70">{config.userName}</div>
            <div className="mt-1 text-lg font-semibold">{config.userTitle}</div>
            <p className="mt-2 max-w-xs text-sm leading-6 text-white/70">{config.emphasis}</p>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {studentOverviewCards.map((card) => {
          const Icon = card.icon

          return (
            <Card
              key={card.title}
              className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]"
            >
              <CardHeader className="gap-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <Icon className="size-5" />
                  </div>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    Snapshot
                  </div>
                </div>
                <div>
                  <CardDescription>{card.title}</CardDescription>
                  <CardTitle className="mt-2 text-3xl tracking-tight">{card.value}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-slate-600">{card.note}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
          <CardHeader>
            <CardTitle>Today&apos;s timetable</CardTitle>
            <CardDescription>
              The upcoming flow of classes and learning blocks for the day.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {timetable.slice(0, 3).map((item, index) => (
              <div
                key={item.day}
                className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Period {index + 1}
                  </div>
                  <div className="mt-2 text-lg font-semibold text-slate-950">{item.detail}</div>
                </div>
                <div className="rounded-full bg-white px-3 py-2 text-sm font-medium text-slate-600">
                  {item.day}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
            <CardDescription>Important updates that need attention this week.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {studentHighlights.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm leading-6 text-slate-700">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
          <CardHeader>
            <CardTitle>Assignments</CardTitle>
            <CardDescription>Track pending work and submission momentum.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {studentAssignments.map((assignment) => (
              <div
                key={assignment.title}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <div className="font-medium text-slate-950">{assignment.title}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{assignment.detail}</p>
                </div>
                <div className="rounded-full bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700">
                  Active
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
            <CardHeader>
              <CardTitle>Attendance</CardTitle>
              <CardDescription>Current month attendance health.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold tracking-tight text-slate-950">92%</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Above the school target with strong consistency this month.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
            <CardHeader>
              <CardTitle>Subjects</CardTitle>
              <CardDescription>Your main learning areas this term.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {studentSubjects.map((subject) => (
                <span
                  key={subject}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                >
                  {subject}
                </span>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
