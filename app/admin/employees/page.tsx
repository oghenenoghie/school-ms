import Link from "next/link"

import { EmployeeDirectory } from "@/components/admin/employee-directory"

export default function EmployeesPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Employees</h1>
            <p className="text-sm text-slate-600">
              Review employee records, departments, and current staff status.
            </p>
          </div>
          <Link
            href="/admin/employees/create"
            className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
          >
            Add Employee
          </Link>
        </div>

        <EmployeeDirectory />
      </div>
    </div>
  )
}
