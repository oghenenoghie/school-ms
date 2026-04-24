"use client"

import { startTransition, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import type {
  EventApi,
  EventChangeArg,
} from "@fullcalendar/core"
import type { DateClickArg } from "@fullcalendar/interaction"
import { CalendarDays, Plus } from "lucide-react"

import type { CalendarEventSeed } from "@/lib/dashboard-data"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const defaultEventColor = "#16a34a"

function serializeCalendarEvent(event: EventApi): CalendarEventSeed {
  return {
    id: event.id,
    title: event.title,
    start: event.startStr,
    end: event.endStr || undefined,
    allDay: event.allDay,
    color: event.backgroundColor || event.borderColor || defaultEventColor,
  }
}

export default function EventCalendar({
  title = "School Event Calendar",
  description = "Track exams, meetings, and school activities. Click any date to add a new event.",
  initialEvents,
}: {
  title?: string
  description?: string
  initialEvents: CalendarEventSeed[]
}) {
  const [events, setEvents] = useState(initialEvents)

  const handleDateClick = (info: DateClickArg) => {
    const enteredTitle = window.prompt("Enter Event Title")
    const nextTitle = enteredTitle?.trim()

    if (!nextTitle) {
      return
    }

    startTransition(() => {
      setEvents((currentEvents) => [
        ...currentEvents,
        {
          id: `event-${Date.now()}`,
          title: nextTitle,
          start: info.dateStr,
          allDay: true,
          color: defaultEventColor,
        },
      ])
    })
  }

  const handleEventChange = (changeInfo: EventChangeArg) => {
    const updatedEvent = serializeCalendarEvent(changeInfo.event)

    startTransition(() => {
      setEvents((currentEvents) =>
        currentEvents.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        )
      )
    })
  }

  return (
    <Card className="border border-white/80 bg-white/90 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
      <CardHeader className="gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CalendarDays className="size-5 text-teal-700" />
            {title}
          </CardTitle>
          <CardDescription className="mt-2 max-w-2xl">
            {description}
          </CardDescription>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
          <Plus className="size-3.5" />
          Click a date to add an event
        </div>
      </CardHeader>
      <CardContent>
        <div className="school-calendar rounded-[1.5rem] border border-slate-200 bg-slate-50/85 p-3 md:p-4">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={events}
            dateClick={handleDateClick}
            eventChange={handleEventChange}
            editable
            selectable
            dayMaxEvents={2}
            height="auto"
          />
        </div>
      </CardContent>
    </Card>
  )
}
