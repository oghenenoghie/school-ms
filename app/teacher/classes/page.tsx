import { BookOpen, Users } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const classes = [
  { name: "Grade 9A", students: 31, nextBlock: "08:00 AM", room: "Lab B" },
  { name: "Grade 9B", students: 29, nextBlock: "10:15 AM", room: "Room 14" },
  { name: "Grade 10C", students: 26, nextBlock: "12:30 PM", room: "Lab A" },
  { name: "Grade 11B", students: 22, nextBlock: "Tomorrow", room: "Room 22" },
]

export default function TeacherClassesPage() {
  return (
    <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
      {classes.map((item) => (
        <Card
          key={item.name}
          className="border border-white/80 bg-white/90 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]"
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <BookOpen className="size-5" />
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                {item.room}
              </div>
            </div>
            <CardTitle className="mt-3">{item.name}</CardTitle>
            <CardDescription>Next teaching block at {item.nextBlock}</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-2 text-sm text-slate-600">
            <Users className="size-4" />
            {item.students} students assigned
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
