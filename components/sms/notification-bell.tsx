import { Bell } from "lucide-react"

export function NotificationBell({ count }: { count: number }) {
  return (
    <button
      type="button"
      className="relative inline-flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
      aria-label={`Notifications (${count})`}
    >
      <Bell className="size-4" />
      <span className="absolute top-2 right-2 size-2 rounded-full bg-amber-500" />
    </button>
  )
}
