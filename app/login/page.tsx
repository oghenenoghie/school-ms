import type { Metadata } from "next"

import { AuthShell } from "@/components/auth/auth-shell"

export const metadata: Metadata = {
  title: "Login | Northfield Academy SMS",
  description: "Login entry page for the School Management System dashboard.",
}

export default function LoginPage() {
  return <AuthShell mode="login" />
}
