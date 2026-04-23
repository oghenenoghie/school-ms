"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { roles, type Role } from "@/lib/sms-data"
import { cn } from "@/lib/utils"

const roleDescriptions: Record<Role, string> = {
  admin: "School-wide operations, admissions, attendance, and reporting",
  teacher: "Classes, grading, assignments, and classroom coordination",
  student: "Timetable, results, assignments, and announcements",
  parent: "Fees, attendance, messages, and child performance",
  accountant: "Collections, receipts, billing, and finance workflows",
}

function getRoleDestination(role: Role) {
  if (role === "teacher") {
    return "/teacher/dashboard"
  }

  return `/dashboard/${role}`
}

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<Role>(mode === "signup" ? "admin" : "teacher")
  const [isPending, startTransition] = useTransition()

  const isSignup = mode === "signup"

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    startTransition(() => {
      router.push(getRoleDestination(selectedRole))
    })
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {isSignup && (
        <>
          <div className="space-y-2">
            <Label htmlFor="school-name">School name</Label>
            <Input
              id="school-name"
              name="schoolName"
              placeholder="Northfield Academy"
              className="h-11 rounded-2xl border-slate-200 bg-white/85 px-4 dark:border-white/10 dark:bg-slate-950/40"
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="full-name">Full name</Label>
              <Input
                id="full-name"
                name="fullName"
                placeholder="Nadia Hamza"
                className="h-11 rounded-2xl border-slate-200 bg-white/85 px-4 dark:border-white/10 dark:bg-slate-950/40"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="work-email">Work email</Label>
              <Input
                id="work-email"
                name="email"
                type="email"
                placeholder="admin@northfield.edu"
                className="h-11 rounded-2xl border-slate-200 bg-white/85 px-4 dark:border-white/10 dark:bg-slate-950/40"
                required
              />
            </div>
          </div>
        </>
      )}

      {!isSignup && (
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            name="email"
            type="email"
            placeholder="you@school.edu"
            className="h-11 rounded-2xl border-slate-200 bg-white/85 px-4 dark:border-white/10 dark:bg-slate-950/40"
            required
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="password">{isSignup ? "Create password" : "Password"}</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder={isSignup ? "Create a secure password" : "Enter your password"}
          className="h-11 rounded-2xl border-slate-200 bg-white/85 px-4 dark:border-white/10 dark:bg-slate-950/40"
          required
        />
      </div>

      <div className="space-y-3 rounded-[1.75rem] border border-slate-200/80 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <Label htmlFor="role">Continue as</Label>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Pick the workspace you want after authentication.
            </p>
          </div>
          <div className="rounded-full bg-white px-3 py-1 text-xs text-slate-600 shadow-sm dark:bg-slate-950 dark:text-slate-300">
            Mock entry flow
          </div>
        </div>

        <div className="relative">
          <select
            id="role"
            name="role"
            value={selectedRole}
            onChange={(event) => setSelectedRole(event.target.value as Role)}
            className="h-11 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-950 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:border-white/10 dark:bg-slate-950 dark:text-slate-50"
          >
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
          <ArrowRight className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-slate-400" />
        </div>

        <div className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-600 shadow-sm dark:bg-slate-950/80 dark:text-slate-300">
          {roleDescriptions[selectedRole]}
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="h-12 w-full rounded-full"
      >
        {isPending ? "Opening workspace..." : isSignup ? "Create account and continue" : "Login and continue"}
        <ArrowRight data-icon="inline-end" />
      </Button>

      <div className="flex items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
          <ShieldCheck className="size-4 text-teal-700 dark:text-cyan-300" />
          Role-based access ready
        </div>
        <Link
          href={isSignup ? "/login" : "/signup"}
          className="font-medium text-slate-700 underline-offset-4 hover:underline dark:text-slate-200"
        >
          {isSignup ? "Have an account? Login" : "New here? Sign up"}
        </Link>
      </div>

      <div
        className={cn(
          "rounded-[1.5rem] border px-4 py-3 text-sm",
          "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-100"
        )}
      >
        This is a frontend entry flow. The form routes you into the selected dashboard so we can keep building the product experience before wiring real authentication.
      </div>
    </form>
  )
}
