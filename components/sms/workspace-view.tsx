"use client"

import { useEffect, useMemo, useState } from "react"
import dynamic from "next/dynamic"

import { DashboardCards } from "@/components/dashboard/cards"
import { DashboardHeader } from "@/components/dashboard/header"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { EmployeeDirectory } from "@/components/admin/employee-directory"
import { HrmForms } from "@/components/sms/hrm-forms"
import { StatusBadge } from "@/components/sms/status-badge"
import { FormBuilder } from "@/components/sms/form-builder"
import { AssignmentForm } from "@/components/teacher/assignment-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Sidebar } from "@/components/ui/sidebar"
import {
  calendarEventsByRole,
  chartContentByRole,
  sectionTitles,
  type DashboardSection,
} from "@/lib/dashboard-data"
import { roleConfigs, type Role } from "@/lib/sms-data"
import { cn } from "@/lib/utils"

const DashboardCharts = dynamic(
  () => import("@/components/dashboard/charts").then((module) => module.DashboardCharts),
  {
    ssr: false,
    loading: () => (
      <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <Card className="h-[420px] border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]" />
        <Card className="h-[420px] border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]" />
      </div>
    ),
  }
)

const EventCalendar = dynamic(
  () => import("@/components/calendar/event-calendar"),
  {
    ssr: false,
    loading: () => (
      <Card className="h-[760px] border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]" />
    ),
  }
)

function QuickActionsPanel({
  activeTitle,
  activeDescription,
  actions,
}: {
  activeTitle: string
  activeDescription: string
  actions: Array<{ label: string; detail: string }>
}) {
  return (
    <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
      <CardHeader>
        <CardTitle>{activeTitle}</CardTitle>
        <CardDescription>{activeDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
          >
            <div className="font-medium text-slate-950">{action.label}</div>
            <div className="mt-2 text-sm leading-6 text-slate-600">{action.detail}</div>
          </button>
        ))}
      </CardContent>
    </Card>
  )
}

function AlertsPanel({
  alerts,
}: {
  alerts: Array<{ title: string; detail: string; tone: "default" | "info" | "success" | "warning" | "danger" }>
}) {
  return (
    <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
      <CardHeader>
        <CardTitle>Live alerts</CardTitle>
        <CardDescription>Current warnings and operational updates.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {alerts.map((alert) => (
          <div key={alert.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <StatusBadge label={alert.tone.toUpperCase()} tone={alert.tone} />
            <div className="mt-3 font-medium text-slate-950">{alert.title}</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{alert.detail}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function SectionFallback({
  activeTitle,
  activeDescription,
  actions,
  alerts,
}: {
  activeTitle: string
  activeDescription: string
  actions: Array<{ label: string; detail: string }>
  alerts: Array<{ title: string; detail: string; tone: "default" | "info" | "success" | "warning" | "danger" }>
}) {
  return (
    <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
        <CardHeader>
          <CardTitle>{activeTitle} workspace</CardTitle>
          <CardDescription>{activeDescription}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
              Focus area
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              This section now stays separate from the main dashboard overview so the workflow
              remains focused and easier to scan.
            </p>
          </div>

          <div className="grid gap-3">
            {actions.map((action) => (
              <div
                key={action.label}
                className="rounded-2xl border border-slate-200 bg-white p-4"
              >
                <div className="font-medium text-slate-950">{action.label}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{action.detail}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AlertsPanel alerts={alerts} />
    </section>
  )
}

function ContextPanel({ activeSection }: { activeSection: DashboardSection }) {
  if (activeSection === "student-add") {
    return (
      <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
        <CardHeader>
          <CardTitle>Quick add student</CardTitle>
          <CardDescription>
            A streamlined student intake form from the sidebar workflow.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormBuilder
            fields={[
              {
                id: "student-name-inline",
                label: "Student name",
                type: "text",
                placeholder: "Enter full legal name",
                helper: "Used for the initial record setup.",
              },
              {
                id: "guardian-email-inline",
                label: "Guardian email",
                type: "email",
                placeholder: "parent@example.com",
                helper: "Primary contact for alerts and approvals.",
              },
              {
                id: "grade-level-inline",
                label: "Grade level",
                type: "select",
                placeholder: "Choose grade",
                helper: "Assign the intended class level.",
              },
            ]}
          />
          <Button className="mt-5 w-full">Create student profile</Button>
        </CardContent>
      </Card>
    )
  }

  if (activeSection === "employee-details") {
    return (
      <EmployeeDirectory
        title="Employee Details"
        description="Preview employee profiles and open the full detail modal from the HRM workspace."
      />
    )
  }

  if (
    activeSection === "employee-add" ||
    activeSection === "payroll" ||
    activeSection === "designation"
  ) {
    return <HrmForms section={activeSection} />
  }

  return null
}

export function WorkspaceView({
  role,
  activeSection,
}: {
  role: Role
  activeSection: DashboardSection
}) {
  const config = roleConfigs[role]
  const chartContent = chartContentByRole[role]
  const isOverviewSection = activeSection === "dashboard"
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window === "undefined") {
      return false
    }

    return window.localStorage.getItem("sms-sidebar-collapsed") === "true"
  })
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    window.localStorage.setItem("sms-sidebar-collapsed", String(sidebarCollapsed))
  }, [sidebarCollapsed])

  const activeMeta = useMemo(
    () => sectionTitles[activeSection] ?? sectionTitles.dashboard,
    [activeSection]
  )
  const hasContextPanel =
    activeSection === "student-add" ||
    activeSection === "employee-details" ||
    activeSection === "employee-add" ||
    activeSection === "payroll" ||
    activeSection === "designation"
  const contextContent = hasContextPanel ? (
    <ContextPanel activeSection={activeSection} />
  ) : null

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f5f7ff_0%,#edf2f7_42%,#e7edf4_100%)] text-slate-950 dark:bg-[radial-gradient(circle_at_top,#0f172a_0%,#111827_42%,#020617_100%)] dark:text-slate-100">
      <Sidebar
        role={role}
        config={config}
        activeSection={activeSection}
        collapsed={sidebarCollapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        onDesktopToggle={() => setSidebarCollapsed((current) => !current)}
      />

      <div
        className={cn(
          "transition-all duration-300",
          sidebarCollapsed ? "lg:pl-0" : "lg:pl-[19rem]"
        )}
      >
        <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-4 lg:px-6 lg:py-4">
          <DashboardHeader
            config={config}
            sectionTitle={activeMeta.title}
            sectionDescription={activeMeta.description}
            sidebarCollapsed={sidebarCollapsed}
            onDesktopToggle={() => setSidebarCollapsed((current) => !current)}
            onMobileToggle={() => setMobileOpen(true)}
          />

          {isOverviewSection ? <DashboardCards metrics={config.metrics} /> : null}

          {isOverviewSection ? (
            <section className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
              <DashboardCharts
                barTitle={chartContent.barTitle}
                barDescription={chartContent.barDescription}
                barData={chartContent.barData}
                pieTitle={chartContent.pieTitle}
                pieDescription={chartContent.pieDescription}
                pieData={chartContent.pieData}
              />
              <div className="flex flex-col gap-6">
                <QuickActionsPanel
                  activeTitle={activeMeta.title}
                  activeDescription={activeMeta.description}
                  actions={config.quickActions}
                />
                {role === "teacher" ? <AssignmentForm /> : null}
                <AlertsPanel alerts={config.alerts} />
              </div>
            </section>
          ) : contextContent ? (
            contextContent
          ) : (
            <SectionFallback
              activeTitle={activeMeta.title}
              activeDescription={activeMeta.description}
              actions={config.quickActions}
              alerts={config.alerts}
            />
          )}

          {isOverviewSection ? (
            <EventCalendar initialEvents={calendarEventsByRole[role]} />
          ) : null}

          {isOverviewSection ? (
            <RecentActivity
              rows={chartContent.recentActivity}
              title="Recent activity"
              description="A concise feed of student and finance activity for the current dashboard."
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
