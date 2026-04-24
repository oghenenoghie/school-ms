"use client"

import { useState } from "react"
import type { KeyboardEvent } from "react"

import { designationOptions } from "@/lib/admin-hr-data"

export default function DesignationsPage() {
  const [designations, setDesignations] = useState(designationOptions)

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return
    }

    event.preventDefault()

    const value = event.currentTarget.value.trim()

    if (!value) {
      return
    }

    setDesignations((current) => [...current, value])
    event.currentTarget.value = ""
  }

  return (
    <div className="min-h-screen space-y-6 bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Designations
          </h1>
          <p className="text-sm text-slate-600">
            Maintain employee titles used across HR and payroll pages.
          </p>
        </div>

        <div className="rounded-xl bg-white p-4 shadow">
          {designations.map((designation) => (
            <div key={designation} className="border-b py-3 last:border-b-0">
              {designation}
            </div>
          ))}
        </div>

        <input
          placeholder="New Designation"
          className="input bg-white"
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  )
}
