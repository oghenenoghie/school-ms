"use client"

import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"

import {
  departmentOptions,
  designationOptions,
} from "@/lib/admin-hr-data"

type EmployeeFormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  department: string
  designation: string
  salary: string
}

const initialForm: EmployeeFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  department: departmentOptions[0],
  designation: designationOptions[0],
  salary: "",
}

export default function CreateEmployeePage() {
  const [form, setForm] = useState<EmployeeFormState>(initialForm)

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl bg-white p-6 shadow"
        >
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-slate-900">
              Add Employee
            </h1>
            <p className="text-sm text-slate-600">
              Create a new employee profile for staff records and payroll setup.
            </p>
          </div>

          <input
            name="firstName"
            value={form.firstName}
            placeholder="First Name"
            onChange={handleChange}
            className="input"
          />
          <input
            name="lastName"
            value={form.lastName}
            placeholder="Last Name"
            onChange={handleChange}
            className="input"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            placeholder="Email"
            onChange={handleChange}
            className="input"
          />
          <input
            name="phone"
            value={form.phone}
            placeholder="Phone"
            onChange={handleChange}
            className="input"
          />

          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            className="input"
          >
            {departmentOptions.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>

          <select
            name="designation"
            value={form.designation}
            onChange={handleChange}
            className="input"
          >
            {designationOptions.map((designation) => (
              <option key={designation} value={designation}>
                {designation}
              </option>
            ))}
          </select>

          <input
            name="salary"
            type="number"
            value={form.salary}
            placeholder="Salary"
            onChange={handleChange}
            className="input"
          />

          <button className="rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700">
            Save Employee
          </button>
        </form>
      </div>
    </div>
  )
}
