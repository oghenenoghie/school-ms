"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  CalendarCheck2,
  ChevronDown,
  ClipboardCheck,
  LayoutDashboard,
  Menu,
  Settings2,
  Users,
  X,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type TeacherMenuItem = {
  name: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  children?: Array<{
    name: string
    href: string
  }>
}

const teacherMenu: TeacherMenuItem[] = [
  { name: "Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard },
  {
    name: "Classes",
    icon: BookOpen,
    children: [
      { name: "My Classes", href: "/teacher/classes" },
      { name: "Timetable", href: "/teacher/timetable" },
    ],
  },
  {
    name: "Students",
    icon: Users,
    children: [{ name: "Student List", href: "/teacher/students" }],
  },
  {
    name: "Attendance",
    icon: CalendarCheck2,
    children: [{ name: "Mark Attendance", href: "/teacher/attendance/mark" }],
  },
  {
    name: "Assignments",
    icon: ClipboardCheck,
    children: [{ name: "Create", href: "/teacher/assignments/create" }],
  },
  { name: "Settings", href: "/dashboard/teacher?section=settings", icon: Settings2 },
]

function isActivePath(pathname: string, href?: string) {
  if (!href) {
    return false
  }

  return pathname === href
}

export function TeacherSidebar({
  collapsed,
  mobileOpen,
  onCloseMobile,
  onDesktopToggle,
}: {
  collapsed: boolean
  mobileOpen: boolean
  onCloseMobile: () => void
  onDesktopToggle: () => void
}) {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const initials = useMemo(() => "NR", [])

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onCloseMobile}
      />

      <aside
        className={cn(
          "fixed top-4 bottom-4 left-4 z-50 flex w-72 flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_24px_100px_-48px_rgba(15,23,42,0.45)] backdrop-blur transition-all duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-[120%]",
          collapsed ? "lg:-translate-x-[calc(100%+1.25rem)]" : "lg:translate-x-0"
        )}
      >
        <div className="flex items-center gap-3 p-4">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-950 text-base font-semibold tracking-[0.24em] text-white">
            SMS
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">
              Teacher OS
            </div>
            <div className="truncate text-lg font-semibold text-slate-950">Noor Rahman</div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="ml-auto hidden rounded-full lg:inline-flex"
            onClick={onDesktopToggle}
            aria-label={collapsed ? "Expand teacher navigation" : "Collapse teacher navigation"}
          >
            <Menu />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full lg:hidden"
            onClick={onCloseMobile}
            aria-label="Close teacher navigation"
          >
            <X />
          </Button>
        </div>

        <div className="mx-4 rounded-[1.75rem] bg-slate-950 p-4 text-white">
          <div className="text-sm font-medium text-white/70">Teaching workspace</div>
          <div className="mt-2 text-xl font-semibold">Physics teacher dashboard</div>
          <p className="mt-2 text-sm leading-6 text-white/70">
            Classes, attendance, assignments, and your weekly timetable in one focused surface.
          </p>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto px-3 pb-3">
          <nav className="flex flex-col gap-1">
            {teacherMenu.map((item) => {
              const hasChildren = Boolean(item.children?.length)
              const activeChild = item.children?.find((child) => isActivePath(pathname, child.href))
              const isOpen = openMenu === item.name || (openMenu === null && Boolean(activeChild))
              const isActive = isActivePath(pathname, item.href) || Boolean(activeChild)
              const Icon = item.icon

              return (
                <div key={item.name}>
                  <div
                    className={cn(
                      "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-300",
                      isActive
                        ? "bg-slate-950 text-white shadow-lg"
                        : "text-slate-600 hover:bg-white hover:text-slate-950"
                    )}
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="flex min-w-0 flex-1 items-center gap-3"
                        onClick={() => {
                          if (window.innerWidth < 1024) {
                            onCloseMobile()
                          }
                        }}
                      >
                        <span
                          className={cn(
                            "inline-flex size-10 shrink-0 items-center justify-center rounded-2xl transition-colors",
                            isActive ? "bg-white/15" : "bg-white text-slate-900 shadow-sm"
                          )}
                        >
                          <Icon className="size-4" />
                        </span>
                        <span className="truncate">{item.name}</span>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="flex min-w-0 flex-1 items-center gap-3 text-left"
                        onClick={() => setOpenMenu(openMenu === item.name ? null : item.name)}
                      >
                        <span
                          className={cn(
                            "inline-flex size-10 shrink-0 items-center justify-center rounded-2xl transition-colors",
                            isActive ? "bg-white/15" : "bg-white text-slate-900 shadow-sm"
                          )}
                        >
                          <Icon className="size-4" />
                        </span>
                        <span className="truncate">{item.name}</span>
                      </button>
                    )}

                    {hasChildren ? (
                      <button
                        type="button"
                        className="rounded-xl p-2 transition-colors hover:bg-white/10"
                        onClick={() => setOpenMenu(openMenu === item.name ? null : item.name)}
                        aria-label={isOpen ? `Collapse ${item.name}` : `Expand ${item.name}`}
                      >
                        <ChevronDown
                          className={cn("size-4 transition-transform duration-300", isOpen && "rotate-180")}
                        />
                      </button>
                    ) : null}
                  </div>

                  {hasChildren && isOpen ? (
                    <div className="mt-2 ml-5 flex flex-col gap-1 border-l border-slate-200 pl-4">
                      {item.children?.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={cn(
                            "rounded-xl px-3 py-2 text-left text-sm transition-colors",
                            isActivePath(pathname, child.href)
                              ? "bg-slate-50 text-slate-950"
                              : "text-slate-500 hover:bg-slate-50 hover:text-slate-950"
                          )}
                          onClick={() => {
                            if (window.innerWidth < 1024) {
                              onCloseMobile()
                            }
                          }}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </nav>
        </div>

        <div className="border-t border-slate-200/80 p-3">
          <div className="flex items-center gap-3 rounded-[1.5rem] bg-slate-50 p-3">
            <Avatar>
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-slate-950">Noor Rahman</div>
              <div className="truncate text-xs text-slate-500">Physics teacher</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
