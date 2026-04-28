import { MessageSquare, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { DashboardSection } from "@/lib/dashboard-data"
import {
  examRows,
  feeRows,
  messageRows,
  type CellValue,
  roleConfigs,
  studentAssignments,
  timetable,
} from "@/lib/sms-data"

type StudentDetailSection = Extract<
  DashboardSection,
  "timetable" | "assignments" | "results" | "attendance" | "messages" | "fees" | "subjects" | "settings"
>

function cellText(value: CellValue) {
  if (typeof value === "object" && value !== null) {
    return value.label
  }

  return String(value)
}

const studentSubjects = [
  { subject: "Mathematics", teacher: "Mr John", room: "Room 4B" },
  { subject: "Physics", teacher: "Mrs Jane", room: "Lab A" },
  { subject: "English", teacher: "Ms Sarah", room: "Room 2C" },
  { subject: "ICT", teacher: "Mr Omar", room: "Lab C" },
]

function TimetableDetails() {
  return (
    <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
      <CardHeader>
        <CardTitle>Weekly timetable</CardTitle>
        <CardDescription>See time, subject, and classroom flow for the week.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b text-slate-600">
              <tr>
                <th className="py-3 pr-4 font-medium">Day</th>
                <th className="py-3 pr-4 font-medium">Subjects</th>
                <th className="py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((item) => (
                <tr key={item.day} className="border-t text-slate-700">
                  <td className="py-3 pr-4 font-medium text-slate-950">{item.day}</td>
                  <td className="py-3 pr-4">{item.detail}</td>
                  <td className="py-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      Scheduled
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

function AssignmentsDetails() {
  return (
    <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
      <CardHeader>
        <CardTitle>Assignments</CardTitle>
        <CardDescription>Track work status and keep submissions on schedule.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {studentAssignments.map((assignment, index) => (
          <div
            key={assignment.title}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <div className="font-medium text-slate-950">{assignment.title}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{assignment.detail}</p>
            </div>
            <span
              className={`rounded-full px-3 py-2 text-sm font-semibold ${
                index === 0
                  ? "bg-amber-50 text-amber-700"
                  : "bg-emerald-50 text-emerald-700"
              }`}
            >
              {index === 0 ? "Pending" : "Submitted"}
            </span>
          </div>
        ))}
        <Button type="button" className="w-full md:w-auto">
          <Upload />
          Upload assignment
        </Button>
      </CardContent>
    </Card>
  )
}

function ResultsDetails() {
  return (
    <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
      <CardHeader>
        <CardTitle>Results</CardTitle>
        <CardDescription>Current subject scores and academic performance summary.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b text-slate-600">
              <tr>
                <th className="py-3 pr-4 font-medium">Subject</th>
                <th className="py-3 pr-4 font-medium">Score</th>
                <th className="py-3 pr-4 font-medium">Grade</th>
                <th className="py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {examRows.map((row) => (
                <tr key={row.id} className="border-t text-slate-700">
                  <td className="py-3 pr-4 font-medium text-slate-950">{cellText(row.exam)}</td>
                  <td className="py-3 pr-4">{cellText(row.average)}</td>
                  <td className="py-3 pr-4">
                    {cellText(row.average) === "82%"
                      ? "A"
                      : cellText(row.average) === "54%"
                        ? "C"
                        : "Pending"}
                  </td>
                  <td className="py-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      {cellText(row.result)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

function AttendanceDetails() {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
      <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
        <CardHeader>
          <CardTitle>Attendance</CardTitle>
          <CardDescription>Monthly class attendance snapshot.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-semibold tracking-tight text-slate-950">92%</div>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Above the school target with steady presence across all core classes.
          </p>
        </CardContent>
      </Card>

      <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
        <CardHeader>
          <CardTitle>Attendance detail</CardTitle>
          <CardDescription>Recent attendance notes and trend markers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            "Present on all scheduled classes this week.",
            "One late mark recorded during the past month.",
            "Attendance remains above the 90% school benchmark.",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              {item}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function MessagesDetails() {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
      <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
        <CardHeader>
          <CardTitle>Chats</CardTitle>
          <CardDescription>Teacher and school conversations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {messageRows.map((row) => (
            <div key={row.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="font-medium text-slate-950">{cellText(row.participants)}</div>
              <p className="mt-2 text-sm text-slate-600">{cellText(row.thread)}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
          <CardDescription>Keep messages in one calm student-friendly view.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
            {messageRows.map((row) => (
              <div key={cellText(row.thread)} className="flex gap-3">
                <div className="mt-1 rounded-2xl bg-white p-2 text-slate-600">
                  <MessageSquare className="size-4" />
                </div>
                <div>
                  <div className="font-medium text-slate-950">{cellText(row.thread)}</div>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Last update: {cellText(row.updated)} via {cellText(row.channel)}.
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Input placeholder="Type message" className="border-slate-200 bg-white" />
        </CardContent>
      </Card>
    </div>
  )
}

function FeesDetails() {
  const total = 500
  const paid = 300
  const balance = total - paid

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
        <CardHeader>
          <CardTitle>Fees</CardTitle>
          <CardDescription>Tuition balance and payment overview.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-sm text-slate-500">Total</div>
            <div className="mt-2 text-2xl font-semibold text-slate-950">${total}</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-sm text-slate-500">Paid</div>
            <div className="mt-2 text-2xl font-semibold text-slate-950">${paid}</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-sm text-slate-500">Balance</div>
            <div className="mt-2 text-2xl font-semibold text-slate-950">${balance}</div>
          </div>
          <Button type="button" className="w-full md:w-auto">
            Pay now
          </Button>
        </CardContent>
      </Card>

      <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
        <CardHeader>
          <CardTitle>Recent invoices</CardTitle>
          <CardDescription>Latest fee items and payment status.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {feeRows.map((row) => (
            <div key={row.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-medium text-slate-950">{cellText(row.invoice)}</div>
                  <p className="mt-1 text-sm text-slate-600">{cellText(row.family)}</p>
                </div>
                <div className="text-right">
                  <div className="font-medium text-slate-950">{cellText(row.amount)}</div>
                  <div className="mt-1 text-sm text-slate-500">{cellText(row.due)}</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function SubjectsDetails() {
  return (
    <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
      <CardHeader>
        <CardTitle>Subjects</CardTitle>
        <CardDescription>Subjects, teacher ownership, and learning spaces.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {studentSubjects.map((subject) => (
          <div
            key={subject.subject}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <div className="font-medium text-slate-950">{subject.subject}</div>
              <p className="mt-1 text-sm text-slate-600">{subject.teacher}</p>
            </div>
            <div className="rounded-full bg-white px-3 py-2 text-sm text-slate-600">{subject.room}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function SettingsDetails() {
  const config = roleConfigs.student

  return (
    <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage student profile and account preferences.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="student-name-setting" className="text-sm font-medium text-slate-700">
            Change name
          </label>
          <Input
            id="student-name-setting"
            defaultValue={config.userName}
            className="border-slate-200 bg-white"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="student-password-setting" className="text-sm font-medium text-slate-700">
            Change password
          </label>
          <Input
            id="student-password-setting"
            type="password"
            placeholder="New password"
            className="border-slate-200 bg-white"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="student-email-setting" className="text-sm font-medium text-slate-700">
            Contact email
          </label>
          <Input
            id="student-email-setting"
            defaultValue="mariam.hassan@example.com"
            className="border-slate-200 bg-white"
          />
        </div>
        <div className="md:col-span-2">
          <Button type="button">Save settings</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function StudentMenuDetails({ section }: { section: StudentDetailSection }) {
  switch (section) {
    case "timetable":
      return <TimetableDetails />
    case "assignments":
      return <AssignmentsDetails />
    case "results":
      return <ResultsDetails />
    case "attendance":
      return <AttendanceDetails />
    case "messages":
      return <MessagesDetails />
    case "fees":
      return <FeesDetails />
    case "subjects":
      return <SubjectsDetails />
    case "settings":
      return <SettingsDetails />
    default:
      return null
  }
}
