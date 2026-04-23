"use client"

import { Menu, PanelLeftClose, PanelLeftOpen, Search } from "lucide-react"

import { NotificationBell } from "@/components/sms/notification-bell"
import { ThemeToggle } from "@/components/dashboard/theme-toggle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { RoleConfig } from "@/lib/sms-data"

export function DashboardHeader({
  config,
  sectionTitle,
  sectionDescription,
  sidebarCollapsed,
  onDesktopToggle,
  onMobileToggle,
}: {
  config: RoleConfig
  sectionTitle: string
  sectionDescription: string
  sidebarCollapsed: boolean
  onDesktopToggle: () => void
  onMobileToggle: () => void
}) {
  const initials = config.userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)

  return (
    <header className="sticky top-4 z-30 rounded-[2rem] border border-white/70 bg-white/75 px-5 py-4 shadow-[0_20px_70px_-52px_rgba(15,23,42,0.45)] backdrop-blur lg:px-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-start gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full lg:hidden"
            onClick={onMobileToggle}
            aria-label="Open navigation menu"
          >
            <Menu />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="hidden rounded-full lg:inline-flex"
            onClick={onDesktopToggle}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
          </Button>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">
              School Dashboard
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              {sectionTitle}
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              {sectionDescription}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative w-full min-w-0 lg:w-80">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder={config.searchPlaceholder}
              className="border-slate-200 bg-white pl-9"
            />
          </div>
          <ThemeToggle />
          <NotificationBell count={config.notificationCount} />
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <Avatar>
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="hidden min-w-0 text-left sm:block">
                <div className="text-sm font-medium text-slate-950">{config.userName}</div>
                <div className="truncate text-xs text-slate-500">{config.userTitle}</div>
              </div>
            </summary>
            <div className="invisible absolute right-0 mt-3 w-56 rounded-3xl border border-slate-200 bg-white p-3 opacity-0 shadow-xl transition-all duration-200 group-open:visible group-open:opacity-100">
              <div className="rounded-2xl bg-slate-50 p-3">
                <div className="text-sm font-semibold text-slate-950">{config.userName}</div>
                <div className="mt-1 text-xs text-slate-500">{config.userTitle}</div>
              </div>
              <div className="mt-3 flex flex-col gap-1">
                <button
                  type="button"
                  className="rounded-2xl px-3 py-2 text-left text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-950"
                >
                  Profile
                </button>
                <button
                  type="button"
                  className="rounded-2xl px-3 py-2 text-left text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-950"
                >
                  Preferences
                </button>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}
