"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  BadgePercent,
  BriefcaseBusiness,
  CalendarCheck2,
  ChevronDown,
  FileCheck2,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  School,
  Settings2,
  Users,
  Wallet,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import {
  getDashboardHref,
  sidebarMenu,
  type DashboardSection,
  type SidebarMenuItem,
} from "@/lib/dashboard-data"
import type { Role, RoleConfig } from "@/lib/sms-data"

const iconMap = {
  "layout-dashboard": LayoutDashboard,
  users: Users,
  "graduation-cap": GraduationCap,
  school: School,
  "calendar-check-2": CalendarCheck2,
  "file-check-2": FileCheck2,
  "badge-percent": BadgePercent,
  wallet: Wallet,
  "briefcase-business": BriefcaseBusiness,
  "settings-2": Settings2,
} satisfies Record<SidebarMenuItem["icon"], typeof LayoutDashboard>

function SidebarItemButton({
  role,
  item,
  active,
  isOpen,
  onToggleOpen,
  activeSection,
  onNavigate,
}: {
  role: Role
  item: SidebarMenuItem
  active: boolean
  isOpen: boolean
  onToggleOpen: () => void
  activeSection: DashboardSection
  onNavigate: () => void
}) {
  const Icon = iconMap[item.icon]
  const hasChildren = Boolean(item.children?.length)
  const href = getDashboardHref(role, item.id)
  const handleNavigate = () => {
    if (window.innerWidth < 1024) {
      onNavigate()
    }
  }

  return (
    <div className="relative">
      <div
        className={cn(
          "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-300",
          active
            ? "bg-slate-950 text-white shadow-lg"
            : "text-slate-600 hover:bg-white hover:text-slate-950"
        )}
      >
        <Link
          href={href}
          className="flex min-w-0 flex-1 items-center gap-3"
          onClick={handleNavigate}
        >
          <span
            className={cn(
              "inline-flex size-10 shrink-0 items-center justify-center rounded-2xl transition-colors",
              active ? "bg-white/15" : "bg-white text-slate-900 shadow-sm"
            )}
          >
            <Icon className="size-4" />
          </span>
          <span className="truncate">{item.label}</span>
        </Link>
        {hasChildren && (
          <button
            type="button"
            className="rounded-xl p-2 transition-colors hover:bg-white/10"
            onClick={onToggleOpen}
            aria-label={isOpen ? `Collapse ${item.label} menu` : `Expand ${item.label} menu`}
          >
            <ChevronDown
              className={cn(
                "size-4 transition-transform duration-300",
                isOpen && "rotate-180"
              )}
            />
          </button>
        )}
      </div>

      {hasChildren && isOpen && (
        <div className="mt-2 ml-5 flex flex-col gap-1 border-l border-slate-200 pl-4">
          {item.children?.map((child) => {
            const childHref = getDashboardHref(role, child.id)

            return (
              <Link
                key={child.id}
                href={childHref}
                className={cn(
                  "rounded-xl px-3 py-2 text-left text-sm transition-colors",
                  activeSection === child.id
                    ? "bg-slate-50 text-slate-950"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-950"
                )}
                onClick={handleNavigate}
              >
                {child.label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function Sidebar({
  role,
  config,
  activeSection,
  collapsed,
  mobileOpen,
  onCloseMobile,
  onDesktopToggle,
}: {
  role: Role
  config: RoleConfig
  activeSection: DashboardSection
  collapsed: boolean
  mobileOpen: boolean
  onCloseMobile: () => void
  onDesktopToggle: () => void
}) {
  const initials = useMemo(
    () =>
      config.userName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2),
    [config.userName]
  )

  const defaultStudentsOpen =
    activeSection === "students" ||
    activeSection === "student-list" ||
    activeSection === "student-add"
  const defaultHrmOpen =
    activeSection === "hrm" ||
    activeSection === "employee-details" ||
    activeSection === "employee-add" ||
    activeSection === "payroll" ||
    activeSection === "designation" ||
    activeSection === "department"
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    students: defaultStudentsOpen,
    hrm: defaultHrmOpen,
  })
  const menuItems = useMemo(
    () => sidebarMenu.filter((item) => !item.roles || item.roles.includes(role)),
    [role]
  )

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
          "fixed top-4 bottom-4 left-4 z-50 flex w-72 flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 shadow-[0_24px_100px_-48px_rgba(15,23,42,0.45)] backdrop-blur transition-all duration-300",
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
              School OS
            </div>
            <div className="truncate text-lg font-semibold text-slate-950">
              Northfield Academy
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="ml-auto hidden rounded-full lg:inline-flex"
            onClick={onDesktopToggle}
            aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          >
            <Menu />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full lg:hidden"
            onClick={onCloseMobile}
            aria-label="Close navigation"
          >
            <X />
          </Button>
        </div>

        <div className="mx-4 rounded-[1.75rem] bg-slate-950 p-4 text-white">
          <div className="text-sm font-medium text-white/70">Active surface</div>
          <div className="mt-2 text-xl font-semibold">{config.label} workspace</div>
          <p className="mt-2 text-sm leading-6 text-white/70">{config.summary}</p>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto px-3 pb-3">
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const isActive =
                activeSection === item.id ||
                item.children?.some((child) => child.id === activeSection) ||
                false
              const defaultOpen =
                activeSection === item.id ||
                item.children?.some((child) => child.id === activeSection) ||
                false
              const isOpen = openSections[item.id] ?? defaultOpen

              return (
                <SidebarItemButton
                  key={item.id}
                  role={role}
                  item={item}
                  active={isActive}
                  isOpen={isOpen}
                  onToggleOpen={() =>
                    setOpenSections((current) => ({
                      ...current,
                      [item.id]: !isOpen,
                    }))
                  }
                  activeSection={activeSection}
                  onNavigate={onCloseMobile}
                />
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
              <div className="truncate text-sm font-semibold text-slate-950">
                {config.userName}
              </div>
              <div className="truncate text-xs text-slate-500">{config.userTitle}</div>
            </div>
          </div>

          <Button type="button" variant="outline" className="mt-3 w-full rounded-2xl">
            <LogOut data-icon="inline-start" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  )
}
