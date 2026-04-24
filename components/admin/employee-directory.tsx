"use client"

import { useState } from "react"

import { EmployeePreviewModal } from "@/components/admin/employee-preview-modal"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { employeeProfiles } from "@/lib/admin-hr-data"

export function EmployeeDirectory({
  title = "Employee Details",
  description = "Preview employee records and open the full profile in a modal.",
}: {
  title?: string
  description?: string
}) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null)

  const selectedEmployee =
    employeeProfiles.find((employee) => employee.id === selectedEmployeeId) ?? null

  return (
    <>
      <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="border-b text-slate-600">
                <tr>
                  <th className="py-3 pr-4 font-medium">Name</th>
                  <th className="py-3 pr-4 font-medium">ID</th>
                  <th className="py-3 pr-4 font-medium">Department</th>
                  <th className="py-3 pr-4 font-medium">Designation</th>
                  <th className="py-3 pr-4 font-medium">Phone</th>
                  <th className="py-3 pr-4 font-medium">Status</th>
                  <th className="py-3 font-medium">Preview</th>
                </tr>
              </thead>

              <tbody>
                {employeeProfiles.map((employee) => (
                  <tr key={employee.id} className="border-t text-slate-700">
                    <td className="py-3 pr-4 font-medium text-slate-950">
                      {employee.name}
                    </td>
                    <td className="py-3 pr-4">{employee.id}</td>
                    <td className="py-3 pr-4">{employee.department}</td>
                    <td className="py-3 pr-4">{employee.designation}</td>
                    <td className="py-3 pr-4">{employee.phone}</td>
                    <td className="py-3 pr-4">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {employee.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setSelectedEmployeeId(employee.id)}
                      >
                        Preview
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <EmployeePreviewModal
        key={selectedEmployee?.id ?? "empty"}
        employee={selectedEmployee}
        open={selectedEmployee !== null}
        onClose={() => setSelectedEmployeeId(null)}
      />
    </>
  )
}
