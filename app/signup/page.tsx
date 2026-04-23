import type { Metadata } from "next"

import { AuthShell } from "@/components/auth/auth-shell"

export const metadata: Metadata = {
  title: "Sign Up | Northfield Academy SMS",
  description: "Sign up entry page for the School Management System dashboard.",
}

export default function SignupPage() {
  return <AuthShell mode="signup" />
}
