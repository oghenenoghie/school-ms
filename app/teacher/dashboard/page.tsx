"use client"

import dynamic from "next/dynamic"

import AssignmentForm from "@/components/forms/AssignmentForm"
import AttendanceForm from "@/components/forms/AttendanceForm"
import TeacherStatCards from "@/components/teacher/teacher-stat-cards"
import { Card } from "@/components/ui/card"
import { calendarEventsByRole } from "@/lib/dashboard-data"

const TeacherAttendanceChart = dynamic(
  () => import("@/components/teacher/teacher-attendance-chart"),
  {
    ssr: false,
    loading: () => (
      <Card className="h-[420px] border border-white/80 bg-white/90 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]" />
    ),
  }
)

const EventCalendar = dynamic(
  () => import("@/components/calendar/event-calendar"),
  {
    ssr: false,
    loading: () => (
      <Card className="h-[760px] border border-white/80 bg-white/90 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]" />
    ),
  }
)

export default function TeacherDashboardPage() {
  return (
    <>
      <TeacherStatCards />

      <TeacherAttendanceChart />

      <EventCalendar
        title="Teaching Calendar"
        description="Keep classroom deadlines, practical sessions, and parent meetings visible. Click any date to add another event."
        initialEvents={calendarEventsByRole.teacher}
      />

      <section className="grid gap-6 xl:grid-cols-2">
        <AssignmentForm />
        <AttendanceForm />
      </section>
    </>
  )
}
