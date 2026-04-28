"use client"

import { useEffect, useState } from "react"
import { Download, FileText, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { EmployeeDetailProfile } from "@/lib/admin-hr-data"
import { cn } from "@/lib/utils"

type PreviewTab = "personal-info" | "employee-details" | "attendance" | "leave" | "payroll"

const previewTabs: Array<{ value: PreviewTab; label: string }> = [
  { value: "personal-info", label: "Personal Info" },
  { value: "employee-details", label: "Employee Details" },
  { value: "attendance", label: "Attendance" },
  { value: "leave", label: "Leave" },
  { value: "payroll", label: "Payroll" },
]

function DetailGrid({
  title,
  items,
}: {
  title: string
  items: Array<{ label: string; value: string }>
}) {
  return (
    <Card className="border border-slate-200 bg-white shadow-none">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
            <div className="text-sm text-slate-500">{item.label}</div>
            <div className="mt-2 font-medium text-slate-950">{item.value}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function EmployeePreviewModal({
  employee,
  open,
  onClose,
}: {
  employee: EmployeeDetailProfile | null
  open: boolean
  onClose: () => void
}) {
  const [activeTab, setActiveTab] = useState<PreviewTab>("personal-info")

  useEffect(() => {
    if (!open) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose, open])

  if (!open || !employee) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_120px_-40px_rgba(15,23,42,0.55)]">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-700">
              Dashboard / HRM / Employee Details
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              {employee.name}
            </h2>
            <p className="mt-1 text-sm text-slate-500">ID: {employee.id}</p>
            <p className="mt-3 text-sm text-slate-600">
              Subject: <span className="font-medium text-slate-950">{employee.subject}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveTab("employee-details")}
            >
              Edit details
            </Button>
            <Button type="button" variant="outline" size="icon" onClick={onClose}>
              <X />
            </Button>
          </div>
        </div>

        <div className="max-h-[calc(92vh-96px)] overflow-y-auto bg-slate-50/80 px-6 py-6">
          <div className="mb-6 rounded-[2rem] bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex size-16 items-center justify-center rounded-3xl bg-slate-950 text-xl font-semibold text-white">
                  {employee.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <div className="text-xl font-semibold text-slate-950">
                    {employee.name}
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    {employee.designation} • {employee.department}
                  </div>
                </div>
              </div>
              <span className="w-fit rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                {employee.status}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {employee.personalInfo.map((item) => (
                <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">{item.label}</div>
                  <div className="mt-2 font-medium text-slate-950">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {previewTabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  activeTab === tab.value
                    ? "bg-slate-950 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-5">
            {activeTab === "personal-info" ? (
              <DetailGrid title="Personal Info" items={employee.personalInfo} />
            ) : null}

            {activeTab === "employee-details" ? (
              <>
                <DetailGrid title="Profile Detail" items={employee.profileDetail} />
                <DetailGrid
                  title="Previous School Details"
                  items={employee.previousSchoolDetails}
                />
                <DetailGrid title="Address" items={employee.addressDetails} />
                <DetailGrid title="Bank Details" items={employee.bankDetails} />
                <DetailGrid title="Medical Details" items={employee.medicalDetails} />
                <Card className="border border-slate-200 bg-white shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle>Documents</CardTitle>
                    <CardDescription>Uploaded employee files available for review.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {employee.documents.map((document) => (
                      <div
                        key={document}
                        className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-2xl bg-white text-slate-600">
                            <FileText className="size-4" />
                          </div>
                          <span className="font-medium text-slate-950">{document}</span>
                        </div>
                        <Button type="button" variant="outline" size="sm">
                          <Download />
                          Download
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            ) : null}

            {activeTab === "attendance" ? (
              <DetailGrid title="Attendance Summary" items={employee.attendanceSummary} />
            ) : null}

            {activeTab === "leave" ? (
              <DetailGrid title="Leave Summary" items={employee.leaveSummary} />
            ) : null}

            {activeTab === "payroll" ? (
              <DetailGrid title="Payroll Summary" items={employee.payrollSummary} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
