import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  CalendarRange,
  ShieldCheck,
  Wallet,
} from "lucide-react"

import { ThemeToggle } from "@/components/dashboard/theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const platformSignals = [
  "Role-based dashboards for admins, teachers, parents, and students",
  "Attendance, results, fees, and communication in one system",
  "Built for responsive school operations on desktop and mobile",
]

const workflowMoments = [
  {
    title: "Admissions to enrollment",
    copy: "Track applicants, verify documents, and turn approvals into enrolled students without losing context.",
    icon: BadgeCheck,
  },
  {
    title: "Daily academic operations",
    copy: "Run classes, assignments, attendance, and exams from a single operational surface.",
    icon: CalendarRange,
  },
  {
    title: "Finance and family updates",
    copy: "Keep fee collections, receipts, alerts, and parent communication aligned in real time.",
    icon: Wallet,
  },
]

const roleSpine = [
  "Admin control room",
  "Teacher classroom workflow",
  "Student learning hub",
  "Parent family overview",
]

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,rgba(243,247,255,0.96),rgba(232,239,248,0.92))] text-slate-950 dark:bg-[linear-gradient(180deg,rgba(6,23,43,0.98),rgba(3,10,24,1))] dark:text-slate-50">
      <section className="relative isolate min-h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 left-[-12%] h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl dark:bg-cyan-500/20" />
          <div className="absolute right-[-10%] bottom-10 h-96 w-96 rounded-full bg-amber-200/45 blur-3xl dark:bg-amber-400/10" />
          <div className="absolute inset-x-0 top-[28%] h-px bg-gradient-to-r from-transparent via-slate-300/70 to-transparent dark:via-slate-700/70" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-[1440px] flex-col px-4 py-5 sm:px-6 lg:px-8">
          <header className="flex items-center justify-between rounded-full border border-white/70 bg-white/70 px-3 py-3 shadow-[0_16px_60px_-42px_rgba(15,23,42,0.45)] backdrop-blur dark:border-white/10 dark:bg-slate-950/55">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold tracking-[0.28em] text-white dark:bg-white dark:text-slate-950">
                SMS
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.32em] text-teal-700 dark:text-cyan-300">
                  Northfield Academy
                </div>
                <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  School Management System
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button asChild variant="ghost" className="rounded-full px-4">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="rounded-full px-4">
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          </header>

          <div className="grid flex-1 items-center gap-14 py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:py-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/75 px-4 py-2 text-sm text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                <ShieldCheck className="size-4 text-teal-700 dark:text-cyan-300" />
                One operating system for admissions, academics, finance, and families
              </div>

              <h1 className="mt-8 max-w-4xl text-5xl leading-[0.95] font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
                Run the entire school day from one calm, role-aware workspace.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Bring attendance, results, fees, communication, and student records into a single modern dashboard that feels clear at 7 AM and still holds up at dismissal.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link href="/signup">
                    Create school account
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                  <Link href="/login">Login to dashboard</Link>
                </Button>
              </div>

              <ul className="mt-10 space-y-3">
                {platformSignals.map((signal) => (
                  <li key={signal} className="flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    <span className="mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-teal-600/10 text-teal-700 dark:bg-cyan-400/10 dark:text-cyan-300">
                      <BadgeCheck className="size-3.5" />
                    </span>
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-cyan-200/40 via-transparent to-amber-200/40 blur-2xl dark:from-cyan-500/10 dark:to-amber-400/10" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/78 p-5 shadow-[0_40px_120px_-56px_rgba(15,23,42,0.5)] backdrop-blur dark:border-white/10 dark:bg-slate-950/70">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 dark:border-white/10">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700 dark:text-cyan-300">
                      Live Command View
                    </div>
                    <div className="mt-2 text-2xl font-semibold">School Dashboard</div>
                  </div>
                  <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                    5 roles active
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-[2rem] bg-slate-950 p-5 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-[0.24em] text-white/60">
                          Campus pulse
                        </div>
                        <div className="mt-2 text-4xl font-semibold">96.8%</div>
                      </div>
                      <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                        Attendance
                      </div>
                    </div>
                    <div className="mt-6 space-y-3">
                      {["Admissions review", "Fees collected", "Results publishing"].map((row, index) => (
                        <div key={row} className="space-y-2">
                          <div className="flex items-center justify-between text-sm text-white/75">
                            <span>{row}</span>
                            <span>{[72, 88, 64][index]}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-white/10">
                            <div
                              className={cn(
                                "h-2 rounded-full bg-gradient-to-r",
                                index === 0 && "from-teal-300 to-cyan-400",
                                index === 1 && "from-amber-300 to-orange-400",
                                index === 2 && "from-sky-300 to-indigo-400"
                              )}
                              style={{ width: `${[72, 88, 64][index]}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[2rem] border border-slate-200/80 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-white p-3 text-slate-950 shadow-sm dark:bg-slate-900 dark:text-slate-50">
                          <BellRing className="size-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Urgent notices</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            18 overdue invoices need follow-up today
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                      <div className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                        Role spine
                      </div>
                      <div className="mt-4 space-y-3">
                        {roleSpine.map((role) => (
                          <div
                            key={role}
                            className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
                          >
                            <span>{role}</span>
                            <ArrowRight className="size-4" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 border-t border-slate-200/80 pt-5 md:grid-cols-3 dark:border-white/10">
                  {workflowMoments.map((moment) => {
                    const Icon = moment.icon

                    return (
                      <div key={moment.title}>
                        <div className="flex items-center gap-3">
                          <div className="rounded-2xl bg-slate-950 p-3 text-white dark:bg-white dark:text-slate-950">
                            <Icon className="size-4" />
                          </div>
                          <div className="text-sm font-medium">{moment.title}</div>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                          {moment.copy}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200/80 px-4 py-16 sm:px-6 lg:px-8 dark:border-white/10">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700 dark:text-cyan-300">
              Why teams switch
            </div>
            <h2 className="mt-4 max-w-lg text-3xl leading-tight font-semibold sm:text-4xl">
              Less tab-hopping, fewer blind spots, and a cleaner handoff between school teams.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Student records stay attached to real workflows",
                copy: "Profiles, fees, attendance, documents, and behavior logs live in one connected operating layer.",
              },
              {
                title: "Every role gets its own working surface",
                copy: "Admins, teachers, students, parents, and finance staff see the right tools without repeated clutter.",
              },
              {
                title: "Operational signals arrive fast",
                copy: "Fee delays, attendance dips, scheduling conflicts, and result publishing issues stay visible before they escalate.",
              },
            ].map((item) => (
              <div key={item.title}>
                <div className="text-lg font-medium">{item.title}</div>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px] rounded-[2.5rem] border border-slate-200/80 bg-slate-950 px-6 py-10 text-white shadow-[0_24px_100px_-60px_rgba(15,23,42,0.65)] sm:px-8 lg:flex lg:items-center lg:justify-between dark:border-white/10">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Ready to start
            </div>
            <h3 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Enter through sign up or login, then land inside the right dashboard.
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
              Set up a new school workspace, or sign in and continue to the role dashboard that matches your day-to-day work.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <Button asChild size="lg" className="rounded-full bg-white px-6 text-slate-950 hover:bg-white/90">
              <Link href="/signup">Create account</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white/20 bg-white/5 px-6 text-white hover:bg-white/10">
              <Link href="/login">Go to login</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
