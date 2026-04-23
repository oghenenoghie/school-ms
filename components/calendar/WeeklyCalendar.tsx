import { Clock3, MapPin } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const weeklySchedule = [
  {
    day: "Monday",
    items: [
      { time: "08:00", title: "Grade 9A Physics", room: "Lab B" },
      { time: "10:15", title: "Grade 10C Physics", room: "Room 14" },
    ],
  },
  {
    day: "Tuesday",
    items: [
      { time: "09:00", title: "Grade 11B Revision", room: "Room 22" },
      { time: "12:00", title: "Parent office hour", room: "Online" },
    ],
  },
  {
    day: "Wednesday",
    items: [
      { time: "08:30", title: "Grade 9B Lab briefing", room: "Lab A" },
      { time: "11:15", title: "Assignment review block", room: "Faculty Hub" },
    ],
  },
  {
    day: "Thursday",
    items: [
      { time: "08:00", title: "Grade 10C Practical", room: "Lab B" },
      { time: "01:00", title: "Science department sync", room: "Room 5" },
    ],
  },
  {
    day: "Friday",
    items: [
      { time: "07:45", title: "Assembly duty", room: "Main Hall" },
      { time: "09:30", title: "Grade 9A Quiz review", room: "Room 14" },
    ],
  },
]

export default function WeeklyCalendar() {
  return (
    <Card className="border border-white/80 bg-white/90 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
      <CardHeader>
        <CardTitle>Weekly timetable</CardTitle>
        <CardDescription>Track this week&apos;s classes, office hours, and school duties.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-5">
        {weeklySchedule.map((day) => (
          <div key={day.day} className="rounded-[1.5rem] border border-slate-200 bg-slate-50/90 p-4">
            <div className="text-sm font-semibold text-slate-950">{day.day}</div>
            <div className="mt-4 space-y-3">
              {day.items.map((item) => (
                <div key={`${day.day}-${item.time}-${item.title}`} className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200/70">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-teal-700">
                    <Clock3 className="size-3.5" />
                    {item.time}
                  </div>
                  <div className="mt-2 text-sm font-medium text-slate-950">{item.title}</div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="size-3.5" />
                    {item.room}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
