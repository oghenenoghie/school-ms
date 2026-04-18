"use client"

import { startTransition, useMemo, useState } from "react"
import {
  ArrowRight,
  BookOpenText,
  BusFront,
  CalendarCheck2,
  ClipboardList,
  GraduationCap,
  Library,
  LayoutDashboard,
  MessagesSquare,
  Search,
  Settings2,
  Users,
  Wallet,
} from "lucide-react"

import { Chart } from "@/components/sms/chart"
import { DashboardCard } from "@/components/sms/dashboard-card"
import { DataTable } from "@/components/sms/data-table"
import { FormBuilder } from "@/components/sms/form-builder"
import { NotificationBell } from "@/components/sms/notification-bell"
import { StatusBadge } from "@/components/sms/status-badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  activityFeed,
  admissionStages,
  attendanceColumns,
  attendanceRows,
  examColumns,
  examRows,
  feeColumns,
  feeRows,
  formFields,
  lessonPlanner,
  messageColumns,
  messageRows,
  overviewBars,
  profileSections,
  revenueBars,
  roleConfigs,
  roles,
  studentColumns,
  studentRows,
  timetable,
  type Role,
  type SidebarItem,
} from "@/lib/sms-data"

const moduleTabs = [
  { value: "students", label: "Students" },
  { value: "attendance", label: "Attendance" },
  { value: "academics", label: "Academics" },
  { value: "exams", label: "Exams" },
  { value: "fees", label: "Fees" },
  { value: "communication", label: "Communication" },
] as const

const iconMap = {
  "layout-dashboard": LayoutDashboard,
  users: Users,
  "graduation-cap": GraduationCap,
  "calendar-check-2": CalendarCheck2,
  "book-open-text": BookOpenText,
  "clipboard-list": ClipboardList,
  wallet: Wallet,
  "messages-square": MessagesSquare,
  "bus-front": BusFront,
  library: Library,
  "settings-2": Settings2,
} satisfies Record<SidebarItem["icon"], typeof LayoutDashboard>

function SidebarLink({ item }: { item: SidebarItem }) {
  const Icon = iconMap[item.icon]

  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-white hover:text-slate-950"
    >
      <span className="inline-flex size-9 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm">
        <Icon className="size-4" />
      </span>
      <span>{item.label}</span>
    </button>
  )
}

export function WorkspaceView() {
  const [role, setRole] = useState<Role>("admin")
  const [attendance, setAttendance] = useState(attendanceRows)
  const config = roleConfigs[role]

  const focusBars = useMemo(
    () => (role === "admin" || role === "accountant" ? revenueBars : overviewBars),
    [role]
  )

  function handleQuickMark() {
    startTransition(() => {
      setAttendance((current) =>
        current.map((row, index) =>
          index === 1
            ? {
                ...row,
                absent: 2,
                status: { label: "Marked", tone: "success" },
              }
            : row
        )
      )
    })
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f5f7ff_0%,#edf2f7_42%,#e7edf4_100%)] text-slate-950">
      <div className="mx-auto flex max-w-[1580px] flex-col gap-6 px-4 py-4 lg:px-6 lg:py-6 xl:flex-row">
        <aside className="flex w-full flex-col gap-5 rounded-[2rem] border border-white/70 bg-white/65 p-5 shadow-[0_24px_100px_-48px_rgba(15,23,42,0.45)] backdrop-blur xl:sticky xl:top-6 xl:w-[280px] xl:self-start">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-950 text-base font-semibold tracking-[0.24em] text-white">
              SMS
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">
                School OS
              </div>
              <div className="text-lg font-semibold">Northfield Academy</div>
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-slate-950 p-4 text-white">
            <div className="text-sm font-medium text-white/70">Active surface</div>
            <div className="mt-2 text-xl font-semibold">{config.label} workspace</div>
            <p className="mt-2 text-sm leading-6 text-white/70">{config.summary}</p>
          </div>

          <nav className="flex flex-col gap-1">
            {config.nav.map((item) => (
              <SidebarLink key={item.label} item={item} />
            ))}
          </nav>

          <Separator />

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm font-semibold text-slate-950">Suggested build order</div>
            <ol className="mt-3 flex list-decimal flex-col gap-2 pl-5 text-sm text-slate-600">
              <li>Auth and role dashboards</li>
              <li>Student module and profile tabs</li>
              <li>Attendance and alerts</li>
              <li>Exams and publishing flow</li>
              <li>Fees and communication</li>
            </ol>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col gap-6">
          <div className="flex flex-col gap-4 rounded-[2rem] border border-white/70 bg-white/75 p-4 shadow-[0_20px_70px_-52px_rgba(15,23,42,0.45)] backdrop-blur lg:p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">
                  Role-based frontend architecture
                </div>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                  {config.title}
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                  {config.emphasis}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative w-full min-w-0 sm:w-80">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search students, invoices, messages..."
                    className="border-slate-200 bg-white pl-9"
                  />
                </div>
                <NotificationBell count={5} />
                <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2">
                  <Avatar>
                    <AvatarFallback>NH</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-slate-950">Nadia Hamza</div>
                    <div className="truncate text-xs text-slate-500">Operational admin</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {roles.map((roleOption) => (
                <Button
                  key={roleOption.value}
                  variant={role === roleOption.value ? "default" : "outline"}
                  onClick={() => setRole(roleOption.value)}
                  className="rounded-full"
                >
                  {roleOption.label}
                </Button>
              ))}
            </div>
          </div>

          <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
            {config.metrics.map((metric) => (
              <DashboardCard
                key={metric.label}
                label={metric.label}
                value={metric.value}
                delta={metric.delta}
                note={metric.note}
              />
            ))}
          </section>

          <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="flex min-w-0 flex-col gap-6">
              <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <Chart
                  title={
                    role === "admin" || role === "accountant"
                      ? "Collections trend"
                      : "Attendance pulse"
                  }
                  description="A compact visual block for the dashboard's weekly monitoring surface."
                  bars={focusBars}
                />

                <Card className="border border-slate-200/80 bg-white/90">
                  <CardHeader>
                    <CardTitle>Quick actions</CardTitle>
                    <CardDescription>
                      Priority actions adapt when the visible role changes.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3">
                    {config.quickActions.map((action) => (
                      <button
                        key={action.label}
                        type="button"
                        className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left transition-colors hover:bg-slate-100"
                      >
                        <div>
                          <div className="font-medium text-slate-950">{action.label}</div>
                          <div className="mt-1 text-sm leading-6 text-slate-600">
                            {action.detail}
                          </div>
                        </div>
                        <ArrowRight className="size-4 text-slate-400" />
                      </button>
                    ))}
                  </CardContent>
                </Card>
              </section>

              <section className="rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-[0_20px_70px_-52px_rgba(15,23,42,0.45)] backdrop-blur lg:p-5">
                <Tabs defaultValue="students">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                        Feature modules
                      </div>
                      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                        Production-ready frontend sections
                      </h2>
                    </div>
                    <TabsList variant="line">
                      {moduleTabs.map((tab) => (
                        <TabsTrigger key={tab.value} value={tab.value}>
                          {tab.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>

                  <TabsContent value="students" className="mt-6">
                    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                      <Card className="border border-slate-200/80 bg-white/90">
                        <CardHeader>
                          <CardTitle>Student management</CardTitle>
                          <CardDescription>
                            List, filter, and review student records from a shared table component.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <DataTable
                            title="Student directory"
                            columns={studentColumns}
                            rows={studentRows}
                            searchPlaceholder="Search students, classes, or fee status"
                          />
                        </CardContent>
                      </Card>

                      <Card className="border border-slate-200/80 bg-white/90">
                        <CardHeader>
                          <CardTitle>Student profile</CardTitle>
                          <CardDescription>
                            Personal, academic, attendance, fee, document, and behavior tabs.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Tabs defaultValue={profileSections[0].key}>
                            <TabsList variant="line" className="flex-wrap">
                              {profileSections.map((section) => (
                                <TabsTrigger key={section.key} value={section.key}>
                                  {section.label}
                                </TabsTrigger>
                              ))}
                            </TabsList>
                            {profileSections.map((section) => (
                              <TabsContent key={section.key} value={section.key} className="pt-5">
                                <div className="grid gap-3 sm:grid-cols-2">
                                  {section.items.map((item) => (
                                    <div
                                      key={item.label}
                                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                                    >
                                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                        {item.label}
                                      </div>
                                      <div className="mt-2 text-sm font-medium text-slate-950">
                                        {item.value}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </TabsContent>
                            ))}
                          </Tabs>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                      <Card className="border border-slate-200/80 bg-white/90">
                        <CardHeader>
                          <CardTitle>Admission workflow</CardTitle>
                          <CardDescription>
                            Online applications move from pending to enrolled with a clear pipeline.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-3 sm:grid-cols-2">
                          {admissionStages.map((stage) => (
                            <div key={stage.label} className="rounded-2xl bg-slate-950 p-4 text-white">
                              <div className="text-xs uppercase tracking-[0.22em] text-white/60">
                                {stage.label}
                              </div>
                              <div className="mt-3 text-lg font-semibold">{stage.count}</div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card className="border border-slate-200/80 bg-white/90">
                        <CardHeader>
                          <CardTitle>Dynamic form builder</CardTitle>
                          <CardDescription>
                            Admission and student setup forms can be driven by field configuration.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <FormBuilder fields={formFields} />
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="attendance" className="mt-6">
                    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
                      <Card className="border border-slate-200/80 bg-white/90">
                        <CardHeader>
                          <CardTitle>Quick mark attendance</CardTitle>
                          <CardDescription>
                            Optimistic UI update for the active class roster.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                          <div className="rounded-2xl bg-slate-950 p-5 text-white">
                            <div className="text-sm text-white/70">Current class</div>
                            <div className="mt-2 text-2xl font-semibold">Grade 8B - Hadi Salim</div>
                            <p className="mt-2 text-sm leading-6 text-white/70">
                              Low attendance was flagged earlier. Mark the section now to clear the alert.
                            </p>
                          </div>
                          <Button onClick={handleQuickMark} className="w-full">
                            Mark current class
                          </Button>
                          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                            Calendar view, bulk import, and absence alerts are represented here by the same shared attendance dataset used below.
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border border-slate-200/80 bg-white/90">
                        <CardHeader>
                          <CardTitle>Attendance reporting</CardTitle>
                          <CardDescription>
                            Tables remain searchable and pagination-ready for later backend hookup.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <DataTable
                            title="Class attendance snapshot"
                            columns={attendanceColumns}
                            rows={attendance}
                            searchPlaceholder="Search classes, teachers, or status"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="academics" className="mt-6">
                    <div className="grid gap-6 xl:grid-cols-2">
                      <Card className="border border-slate-200/80 bg-white/90">
                        <CardHeader>
                          <CardTitle>Lesson planner</CardTitle>
                          <CardDescription>
                            Subjects, classes, sections, and curriculum planning in one teaching flow.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3">
                          {lessonPlanner.map((item) => (
                            <div
                              key={item.period}
                              className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                            >
                              <div className="text-sm font-semibold text-teal-700">
                                {item.period}
                              </div>
                              <div>
                                <div className="font-medium text-slate-950">{item.title}</div>
                                <div className="mt-1 text-sm leading-6 text-slate-600">
                                  {item.detail}
                                </div>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card className="border border-slate-200/80 bg-white/90">
                        <CardHeader>
                          <CardTitle>Weekly timetable</CardTitle>
                          <CardDescription>
                            Drag-and-drop scheduling can evolve from this schedule grid and conflict summary.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                          {timetable.map((item) => (
                            <div
                              key={item.day}
                              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                            >
                              <div className="font-medium text-slate-950">{item.day}</div>
                              <div className="text-sm text-slate-600">{item.detail}</div>
                            </div>
                          ))}
                          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
                            Conflict detection sample: Lab B is double-booked Thursday at 10:30 AM.
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="exams" className="mt-6">
                    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                      <Card className="border border-slate-200/80 bg-white/90">
                        <CardHeader>
                          <CardTitle>Exam and result system</CardTitle>
                          <CardDescription>
                            Setup, grading, publishing, GPA, and report card visibility from one exam module.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <DataTable
                            title="Exam sessions"
                            columns={examColumns}
                            rows={examRows}
                            searchPlaceholder="Search exams, classes, or result status"
                          />
                        </CardContent>
                      </Card>

                      <Card className="border border-slate-200/80 bg-white/90">
                        <CardHeader>
                          <CardTitle>Publishing flow</CardTitle>
                          <CardDescription>
                            Result generation and report card output stay visible to leadership and teachers.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                          <div className="rounded-2xl bg-slate-950 p-5 text-white">
                            <div className="text-xs uppercase tracking-[0.22em] text-white/60">
                              Midterm release
                            </div>
                            <div className="mt-3 text-3xl font-semibold">84%</div>
                            <p className="mt-2 text-sm text-white/70">
                              Result publishing pipeline is complete for 21 of 25 exam groups.
                            </p>
                          </div>
                          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="font-medium text-slate-950">GPA configuration</div>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                              Grade bands, weighted subjects, and promotion thresholds are grouped as configurable frontend controls.
                            </p>
                          </div>
                          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="font-medium text-slate-950">Export surfaces</div>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                              Report cards, result sheets, and parent-facing summaries can branch from this module.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="fees" className="mt-6">
                    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                      <Card className="border border-slate-200/80 bg-white/90">
                        <CardHeader>
                          <CardTitle>Fees and accounting</CardTitle>
                          <CardDescription>
                            Invoices, payment history, receipts, and collection states share the same financial dataset.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <DataTable
                            title="Invoice list"
                            columns={feeColumns}
                            rows={feeRows}
                            searchPlaceholder="Search family, invoice, or status"
                          />
                        </CardContent>
                      </Card>

                      <div className="flex flex-col gap-6">
                        <Chart
                          title="Financial velocity"
                          description="A lightweight analytics component ready for a richer charting layer later."
                          bars={revenueBars}
                        />
                        <Card className="border border-slate-200/80 bg-white/90">
                          <CardHeader>
                            <CardTitle>Payment experience</CardTitle>
                            <CardDescription>
                              The fee module is designed to support online payments, receipts, and aging buckets.
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="flex flex-col gap-3">
                            <StatusBadge label="Gateway connected" tone="success" />
                            <StatusBadge label="3 families require follow-up" tone="warning" />
                            <StatusBadge label="Receipts export queued" tone="info" />
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="communication" className="mt-6">
                    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                      <Card className="border border-slate-200/80 bg-white/90">
                        <CardHeader>
                          <CardTitle>Communication center</CardTitle>
                          <CardDescription>
                            Teacher-parent chat, announcements, and delivery status live in a unified surface.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <DataTable
                            title="Message threads"
                            columns={messageColumns}
                            rows={messageRows}
                            searchPlaceholder="Search thread, participants, or channel"
                          />
                        </CardContent>
                      </Card>

                      <Card className="border border-slate-200/80 bg-white/90">
                        <CardHeader>
                          <CardTitle>Announcement composer</CardTitle>
                          <CardDescription>
                            Broadcasts can be routed to in-app, email, and SMS channels from a single entry point.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                              Draft target
                            </div>
                            <div className="mt-2 text-sm font-medium text-slate-950">
                              Parents of Grade 8B and Grade 9A
                            </div>
                          </div>
                          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                            Message template: &quot;Tomorrow&apos;s assembly begins at 7:45 AM. Please ensure students arrive in full uniform and carry their ID cards.&quot;
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <StatusBadge label="In-app" tone="success" />
                            <StatusBadge label="Email" tone="info" />
                            <StatusBadge label="SMS" tone="warning" />
                          </div>
                          <Button className="w-full">Schedule broadcast</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </section>
            </div>

            <aside className="flex flex-col gap-6">
              <Card className="border border-slate-200/80 bg-white/90">
                <CardHeader>
                  <CardTitle>Live alerts</CardTitle>
                  <CardDescription>
                    Time-sensitive items surfaced for the active role.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  {config.alerts.map((alert) => (
                    <div
                      key={alert.title}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <StatusBadge label={alert.tone.toUpperCase()} tone={alert.tone} />
                      <div className="mt-3 font-medium text-slate-950">{alert.title}</div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{alert.detail}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border border-slate-200/80 bg-white/90">
                <CardHeader>
                  <CardTitle>Recent activity</CardTitle>
                  <CardDescription>
                    Right-rail activity keeps the dashboard feeling operational.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  {activityFeed.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                      <span className="mt-1 size-2 rounded-full bg-teal-600" />
                      <p className="text-sm leading-6 text-slate-600">{item}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}
