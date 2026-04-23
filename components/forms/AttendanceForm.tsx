"use client"

import { useState } from "react"
import { CalendarCheck2, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type AttendanceDraft = {
  studentName: string
  className: string
  attendanceDate: string
  status: string
  note: string
}

const initialForm: AttendanceDraft = {
  studentName: "",
  className: "",
  attendanceDate: "",
  status: "present",
  note: "",
}

const classOptions = ["Grade 9A", "Grade 9B", "Grade 10C", "Grade 11B"]
const statusOptions = [
  { value: "present", label: "Present" },
  { value: "late", label: "Late" },
  { value: "absent", label: "Absent" },
  { value: "excused", label: "Excused" },
]

export function AttendanceForm() {
  const [form, setForm] = useState<AttendanceDraft>(initialForm)
  const [lastSaved, setLastSaved] = useState<AttendanceDraft | null>(null)

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(form)
    setLastSaved(form)
    setForm(initialForm)
  }

  return (
    <Card className="border border-white/80 bg-white/90 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
            <CalendarCheck2 className="size-5" />
          </span>
          <span>Mark attendance</span>
        </CardTitle>
        <CardDescription>
          Capture attendance updates directly from the teacher workspace and keep a short note when needed.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="attendance-student">Student name</Label>
              <Input
                id="attendance-student"
                name="studentName"
                value={form.studentName}
                onChange={handleChange}
                placeholder="Sara Hassan"
                className="h-11 rounded-2xl border-slate-200 bg-white px-4"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="attendance-class">Class</Label>
              <select
                id="attendance-class"
                name="className"
                value={form.className}
                onChange={handleChange}
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                required
              >
                <option value="">Select class</option>
                {classOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="attendance-date">Date</Label>
              <Input
                id="attendance-date"
                name="attendanceDate"
                type="date"
                value={form.attendanceDate}
                onChange={handleChange}
                className="h-11 rounded-2xl border-slate-200 bg-white px-4"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="attendance-status">Status</Label>
              <select
                id="attendance-status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="attendance-note">Note</Label>
            <Textarea
              id="attendance-note"
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="Optional attendance note for follow-up or parent communication."
              className="min-h-24 rounded-2xl border-slate-200 bg-white px-4 py-3"
            />
          </div>

          <Button type="submit" className="h-11 w-full rounded-2xl">
            Save attendance
          </Button>
        </form>

        {lastSaved ? (
          <div className="mt-4 rounded-[1.5rem] border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="size-4" />
              Attendance captured
            </div>
            <p className="mt-2 leading-6">
              {lastSaved.studentName} was marked {lastSaved.status} for {lastSaved.className} on{" "}
              {lastSaved.attendanceDate}.
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

export default AttendanceForm
