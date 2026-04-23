"use client"

import { useState } from "react"
import { BookMarked, CheckCircle2 } from "lucide-react"

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

type AssignmentDraft = {
  title: string
  description: string
  className: string
  dueDate: string
}

const initialForm: AssignmentDraft = {
  title: "",
  description: "",
  className: "",
  dueDate: "",
}

const classOptions = ["Grade 9A", "Grade 9B", "Grade 10C", "Grade 11B"]

export function AssignmentForm() {
  const [form, setForm] = useState<AssignmentDraft>(initialForm)
  const [lastCreated, setLastCreated] = useState<AssignmentDraft | null>(null)

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(form)
    setLastCreated(form)
    setForm(initialForm)
  }

  return (
    <Card className="border border-white/80 bg-white/90 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
            <BookMarked className="size-5" />
          </span>
          <span>Create assignment</span>
        </CardTitle>
        <CardDescription>
          Draft a classroom task, set the due date, and keep the form ready for API wiring.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="assignment-title">Assignment title</Label>
            <Input
              id="assignment-title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Physics worksheet 04"
              className="h-11 rounded-2xl border-slate-200 bg-white px-4"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignment-description">Description</Label>
            <Textarea
              id="assignment-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the task, grading rubric, and upload expectations."
              className="min-h-28 rounded-2xl border-slate-200 bg-white px-4 py-3"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="assignment-class">Class</Label>
              <select
                id="assignment-class"
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

            <div className="space-y-2">
              <Label htmlFor="assignment-due-date">Due date</Label>
              <Input
                id="assignment-due-date"
                name="dueDate"
                type="date"
                value={form.dueDate}
                onChange={handleChange}
                className="h-11 rounded-2xl border-slate-200 bg-white px-4"
                required
              />
            </div>
          </div>

          <Button type="submit" className="h-11 w-full rounded-2xl">
            Create assignment
          </Button>
        </form>

        {lastCreated ? (
          <div className="mt-4 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="size-4" />
              Assignment draft created
            </div>
            <p className="mt-2 leading-6">
              {lastCreated.title} for {lastCreated.className} was prepared with a due date of{" "}
              {lastCreated.dueDate}.
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

export default AssignmentForm
