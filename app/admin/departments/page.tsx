"use client"

import { useState } from "react"
import type { KeyboardEvent } from "react"

import { departmentOptions } from "@/lib/admin-hr-data"

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState(departmentOptions)

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return
    }

    event.preventDefault()

    const value = event.currentTarget.value.trim()

    if (!value) {
      return
    }

    setDepartments((current) => [...current, value])
    event.currentTarget.value = ""
  }

  return (
    <div className="min-h-screen space-y-6 bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Departments</h1>
          <p className="text-sm text-slate-600">
            Manage the departments available for employee records and reporting.
          </p>
        </div>

        <div className="rounded-xl bg-white p-4 shadow">
          {departments.map((department) => (
            <div key={department} className="border-b py-3 last:border-b-0">
              {department}
            </div>
          ))}
        </div>

        <input
          placeholder="New Department"
          className="input bg-white"
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  )
}
