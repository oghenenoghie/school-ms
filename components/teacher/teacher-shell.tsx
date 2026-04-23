"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { ThemeToggle } from "@/components/dashboard/theme-toggle"
import { TeacherSidebar } from "@/components/teacher/teacher-sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const pageMeta: Record<string, { title: string; description: string }> = {
  "/teacher/dashboard": {
    title: "Teacher Dashboard",
    description: "Overview of students, attendance, weekly timetable, and active teaching tasks.",
  },
  "/teacher/classes": {
    title: "My Classes",
    description: "Review your active sections, room allocations, and next teaching blocks.",
  },
  "/teacher/timetable": {
    title: "Weekly Timetable",
    description: "Track this week's teaching calendar and school duties in one place.",
  },
  "/teacher/students": {
    title: "Student List",
    description: "Browse your assigned students and classroom readiness at a glance.",
  },
  "/teacher/attendance/mark": {
    title: "Mark Attendance",
    description: "Capture attendance updates and note follow-ups directly from the dashboard.",
  },
  "/teacher/assignments/create": {
    title: "Create Assignment",
    description: "Draft and prepare assignments for your classes without leaving the workspace.",
  },
}

export function TeacherShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window === "undefined") {
      return false
    }

    return window.localStorage.getItem("teacher-sidebar-collapsed") === "true"
  })
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    window.localStorage.setItem("teacher-sidebar-collapsed", String(sidebarCollapsed))
  }, [sidebarCollapsed])

  const activeMeta = useMemo(
    () => pageMeta[pathname] ?? pageMeta["/teacher/dashboard"],
    [pathname]
  )

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f5f7ff_0%,#edf2f7_42%,#e7edf4_100%)] text-slate-950 dark:bg-[radial-gradient(circle_at_top,#0f172a_0%,#111827_42%,#020617_100%)] dark:text-slate-100">
      <TeacherSidebar
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
          <header className="sticky top-4 z-30 rounded-[2rem] border border-white/70 bg-white/75 px-5 py-4 shadow-[0_20px_70px_-52px_rgba(15,23,42,0.45)] backdrop-blur lg:px-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-start gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-full lg:hidden"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open teacher navigation"
                >
                  <Menu />
                </Button>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">
                    Teacher workspace
                  </div>
                  <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                    {activeMeta.title}
                  </h1>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                    {activeMeta.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <Input
                  placeholder="Search classes, assignments, students..."
                  className="h-11 w-full min-w-0 rounded-full border-slate-200 bg-white px-4 lg:w-80"
                />
                <ThemeToggle />
                <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
                  <Avatar>
                    <AvatarFallback>NR</AvatarFallback>
                  </Avatar>
                  <div className="hidden min-w-0 text-left sm:block">
                    <div className="text-sm font-medium text-slate-950">Noor Rahman</div>
                    <div className="truncate text-xs text-slate-500">Physics teacher</div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="space-y-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
