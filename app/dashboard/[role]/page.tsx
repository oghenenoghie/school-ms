import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { WorkspaceView } from "@/components/sms/workspace-view"
import { isDashboardSection, type DashboardSection } from "@/lib/dashboard-data"
import { isRole, roleConfigs, roles } from "@/lib/sms-data"

type DashboardPageProps = {
  params: Promise<{ role: string }>
  searchParams: Promise<{ section?: string }>
}

export function generateStaticParams() {
  return roles.map((role) => ({ role: role.value }))
}

export async function generateMetadata({
  params,
}: DashboardPageProps): Promise<Metadata> {
  const { role } = await params

  if (!isRole(role)) {
    return {
      title: "Dashboard not found",
    }
  }

  return {
    title: `${roleConfigs[role].label} Dashboard | Northfield Academy SMS`,
    description: roleConfigs[role].summary,
  }
}

export default async function DashboardRolePage({
  params,
  searchParams,
}: DashboardPageProps) {
  const { role } = await params
  const { section } = await searchParams

  if (!isRole(role)) {
    notFound()
  }

  const activeSection: DashboardSection =
    typeof section === "string" && isDashboardSection(section) ? section : "dashboard"

  return <WorkspaceView key={`${role}-${activeSection}`} role={role} activeSection={activeSection} />
}
