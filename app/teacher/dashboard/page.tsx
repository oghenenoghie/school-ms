"use client"

import dynamic from "next/dynamic"

import AssignmentForm from "@/components/forms/AssignmentForm"
import AttendanceForm from "@/components/forms/AttendanceForm"
import WeeklyCalendar from "@/components/calendar/WeeklyCalendar"
import TeacherStatCards from "@/components/teacher/teacher-stat-cards"
import { Card } from "@/components/ui/card"

const TeacherAttendanceChart = dynamic(
  () => import("@/components/teacher/teacher-attendance-chart"),
  {
    ssr: false,
    loading: () => (
      <Card className="h-[420px] border border-white/80 bg-white/90 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]" />
    ),
  }
)

export default function TeacherDashboardPage() {
  return (
    <>
      <TeacherStatCards />

      <section className="grid gap-6 xl:grid-cols-[1.05fr_1fr]">
        <TeacherAttendanceChart />
        <WeeklyCalendar />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <AssignmentForm />
        <AttendanceForm />
      </section>
    </>
  )
}
