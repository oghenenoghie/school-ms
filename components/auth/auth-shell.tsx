import Link from "next/link"
import { ArrowLeft, BadgeCheck, GraduationCap, ShieldCheck, Sparkles } from "lucide-react"

import { ThemeToggle } from "@/components/dashboard/theme-toggle"
import { AuthForm } from "@/components/auth/auth-form"
import { Button } from "@/components/ui/button"

const authBenefits = [
  "Role-specific dashboards without duplicated information",
  "Attendance, fees, results, and communication in one interface",
  "Responsive flow that matches the dashboard visual system",
]

export function AuthShell({ mode }: { mode: "login" | "signup" }) {
  const isSignup = mode === "signup"

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,rgba(243,247,255,0.96),rgba(233,239,248,0.92))] px-4 py-5 text-slate-950 dark:bg-[linear-gradient(180deg,rgba(6,23,43,0.98),rgba(3,10,24,1))] dark:text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between rounded-full border border-white/70 bg-white/70 px-3 py-3 shadow-[0_16px_60px_-42px_rgba(15,23,42,0.45)] backdrop-blur dark:border-white/10 dark:bg-slate-950/55">
        <Button asChild variant="ghost" className="rounded-full px-4">
          <Link href="/">
            <ArrowLeft data-icon="inline-start" />
            Back home
          </Link>
        </Button>
        <ThemeToggle />
      </div>

      <div className="mx-auto mt-6 grid max-w-[1440px] gap-6 lg:min-h-[calc(100vh-7rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(460px,0.95fr)]">
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-slate-950 px-6 py-8 text-white shadow-[0_40px_120px_-56px_rgba(15,23,42,0.56)] dark:border-white/10 sm:px-8 sm:py-10">
          <div className="absolute -top-16 right-[-8%] h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute bottom-0 left-[-8%] h-64 w-64 rounded-full bg-amber-300/15 blur-3xl" />

          <div className="relative flex h-full flex-col">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-white/75">
              <Sparkles className="size-4 text-cyan-300" />
              Northfield Academy SMS
            </div>

            <div className="mt-8 max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">
                {isSignup ? "Create workspace" : "Welcome back"}
              </div>
              <h1 className="mt-4 text-4xl leading-tight font-semibold sm:text-5xl">
                {isSignup
                  ? "Start with account setup, then continue straight into your dashboard."
                  : "Sign in, choose your role, and return to the dashboard that matches your work."}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
                {isSignup
                  ? "Set up the public entry flow now, then connect credentials, invitations, and role permissions later without rebuilding the UI."
                  : "This entry layer gives the product a clear front door before users move into the operational dashboards."}
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-white/10 bg-white/6 p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white/10 p-3 text-cyan-300">
                    <GraduationCap className="size-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Role-aware product flow</div>
                    <div className="text-xs text-white/60">
                      Public entry, then private workspace
                    </div>
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  {authBenefits.map((benefit) => (
                    <div key={benefit} className="flex gap-3 text-sm leading-6 text-white/75">
                      <BadgeCheck className="mt-1 size-4 shrink-0 text-cyan-300" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/6 p-5">
                <div className="text-xs uppercase tracking-[0.24em] text-white/50">
                  Entry sequence
                </div>
                <div className="mt-4 space-y-4">
                  {[
                    "Landing page introduces the product and directs to auth.",
                    "Login or sign up collects the user context and intended role.",
                    "Successful entry continues to the matching dashboard route.",
                  ].map((step, index) => (
                    <div key={step} className="flex gap-4">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-medium text-slate-950">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-6 text-white/75">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/70">
                <ShieldCheck className="size-4 text-cyan-300" />
                Public entry route added before dashboard access
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-white/70 bg-white/78 p-6 shadow-[0_40px_120px_-56px_rgba(15,23,42,0.5)] backdrop-blur dark:border-white/10 dark:bg-slate-950/70 sm:p-8">
          <div className="max-w-xl">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700 dark:text-cyan-300">
              {isSignup ? "Sign up" : "Login"}
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              {isSignup ? "Create your school access point" : "Access your school workspace"}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              {isSignup
                ? "Create the account shell, choose the target role, and continue into the matching dashboard."
                : "Enter your credentials, choose the role you want to open, and continue to the dashboard."}
            </p>
          </div>

          <div className="mt-8">
            <AuthForm mode={mode} />
          </div>
        </section>
      </div>
    </main>
  )
}
