"use client"

import { useMemo, useState } from "react"

import { EmployeePreviewModal } from "@/components/admin/employee-preview-modal"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { employeeProfiles } from "@/lib/admin-hr-data"
import { cn } from "@/lib/utils"

function SelectField({
  id,
  label,
  value,
  options,
  helper,
  onChange,
}: {
  id: string
  label: string
  value: string
  options: string[]
  helper: string
  onChange?: (value: string) => void
}) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <select
        id={id}
        value={value}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        className={cn(
          "h-10 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-sm text-slate-700 outline-none transition-colors",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        )}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FieldDescription>{helper}</FieldDescription>
    </Field>
  )
}

function InputField({
  id,
  label,
  defaultValue,
  helper,
  type = "text",
}: {
  id: string
  label: string
  defaultValue: string
  helper: string
  type?: React.ComponentProps<"input">["type"]
}) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        type={type}
        defaultValue={defaultValue}
        className="h-10 border-slate-200 bg-white"
      />
      <FieldDescription>{helper}</FieldDescription>
    </Field>
  )
}

function TextareaField({
  id,
  label,
  defaultValue,
  helper,
}: {
  id: string
  label: string
  defaultValue: string
  helper: string
}) {
  return (
    <Field className="md:col-span-2">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Textarea
        id={id}
        defaultValue={defaultValue}
        className="min-h-24 border-slate-200 bg-white"
      />
      <FieldDescription>{helper}</FieldDescription>
    </Field>
  )
}

function SummarySection({
  title,
  description,
  items,
}: {
  title: string
  description: string
  items: Array<{ label: string; value: string }>
}) {
  return (
    <FieldSet className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 md:p-5">
      <FieldLegend className="text-base text-slate-950">{title}</FieldLegend>
      <p className="text-sm leading-6 text-slate-600">{description}</p>
      <FieldGroup className="mt-4 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <InputField
            key={item.label}
            id={`${title}-${item.label}`.toLowerCase().replaceAll(" ", "-")}
            label={item.label}
            defaultValue={item.value}
            helper={`Update the ${item.label.toLowerCase()} value for this profile.`}
          />
        ))}
      </FieldGroup>
    </FieldSet>
  )
}

export function EmployeeDetailsForm() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(employeeProfiles[0]?.id ?? "")
  const [previewOpen, setPreviewOpen] = useState(false)

  const selectedEmployee = useMemo(
    () =>
      employeeProfiles.find((employee) => employee.id === selectedEmployeeId) ??
      employeeProfiles[0],
    [selectedEmployeeId]
  )

  if (!selectedEmployee) {
    return null
  }

  const personalInfoMap = Object.fromEntries(
    selectedEmployee.personalInfo.map((item) => [item.label, item.value])
  )
  const schoolMap = Object.fromEntries(
    selectedEmployee.previousSchoolDetails.map((item) => [item.label, item.value])
  )
  const addressMap = Object.fromEntries(
    selectedEmployee.addressDetails.map((item) => [item.label, item.value])
  )
  const bankMap = Object.fromEntries(
    selectedEmployee.bankDetails.map((item) => [item.label, item.value])
  )
  const medicalMap = Object.fromEntries(
    selectedEmployee.medicalDetails.map((item) => [item.label, item.value])
  )

  return (
    <>
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
          <CardHeader>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
              Employee record
            </div>
            <CardTitle className="mt-2">Employee details form</CardTitle>
            <CardDescription>
              This form now includes the same profile depth shown in the preview modal, so HR can
              update the full employee record in one place.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form key={selectedEmployee.id} className="flex flex-col gap-5">
              <FieldSet className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 md:p-5">
                <FieldLegend className="text-base text-slate-950">
                  Employee selection
                </FieldLegend>
                <p className="text-sm leading-6 text-slate-600">
                  Choose the employee profile you want to edit or preview.
                </p>
                <FieldGroup className="mt-4 grid gap-4 md:grid-cols-[1fr_auto]">
                  <SelectField
                    id="employee-profile"
                    label="Employee profile"
                    value={selectedEmployeeId}
                    options={employeeProfiles.map(
                      (employee) => `${employee.id} - ${employee.name}`
                    )}
                    helper="Switch between available employee records."
                    onChange={(value) => setSelectedEmployeeId(value.split(" - ")[0] ?? value)}
                  />
                  <div className="flex items-end">
                    <Button type="button" className="w-full md:w-auto" onClick={() => setPreviewOpen(true)}>
                      Preview modal
                    </Button>
                  </div>
                </FieldGroup>
              </FieldSet>

              <FieldSet className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 md:p-5">
                <FieldLegend className="text-base text-slate-950">Core employee record</FieldLegend>
                <p className="text-sm leading-6 text-slate-600">
                  Main identity fields used across dashboard, HRM, and staff profile views.
                </p>
                <FieldGroup className="mt-4 grid gap-4 md:grid-cols-2">
                  <InputField
                    id="employee-name"
                    label="Employee name"
                    defaultValue={selectedEmployee.name}
                    helper="Displayed across the employee directory and profile modal."
                  />
                  <InputField
                    id="employee-id"
                    label="Employee ID"
                    defaultValue={selectedEmployee.id}
                    helper="Internal identifier shown in HRM records."
                  />
                  <InputField
                    id="employee-subject"
                    label="Subject"
                    defaultValue={selectedEmployee.subject}
                    helper="Teaching or ownership area assigned to the employee."
                  />
                  <InputField
                    id="employee-department"
                    label="Department"
                    defaultValue={selectedEmployee.department}
                    helper="Operational team responsible for this employee."
                  />
                  <InputField
                    id="employee-designation"
                    label="Designation"
                    defaultValue={selectedEmployee.designation}
                    helper="Role title used in HR and payroll records."
                  />
                  <InputField
                    id="employee-status"
                    label="Status"
                    defaultValue={selectedEmployee.status}
                    helper="Current employment state for the employee record."
                  />
                </FieldGroup>
              </FieldSet>

              <FieldSet className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 md:p-5">
                <FieldLegend className="text-base text-slate-950">Personal info</FieldLegend>
                <p className="text-sm leading-6 text-slate-600">
                  Match the same personal info block shown in the employee preview modal.
                </p>
                <FieldGroup className="mt-4 grid gap-4 md:grid-cols-2">
                  <InputField
                    id="employee-class"
                    label="Class"
                    defaultValue={personalInfoMap.Class ?? ""}
                    helper="Assigned class or working group for the employee."
                  />
                  <InputField
                    id="employee-contract-type"
                    label="Contract Type"
                    defaultValue={personalInfoMap["Contract Type"] ?? ""}
                    helper="Current contract arrangement for the employee."
                  />
                  <InputField
                    id="employee-shift"
                    label="Shift"
                    defaultValue={personalInfoMap.Shift ?? ""}
                    helper="Default working shift recorded for daily operations."
                  />
                  <InputField
                    id="employee-work-location"
                    label="Work Location"
                    defaultValue={personalInfoMap["Work Location"] ?? ""}
                    helper="Primary working floor or office location."
                  />
                  <InputField
                    id="employee-date-of-birth-personal"
                    label="Date Of Birth"
                    defaultValue={personalInfoMap["Date Of Birth"] ?? ""}
                    helper="Personal info date shown in the modal header block."
                  />
                  <InputField
                    id="employee-gender"
                    label="Gender"
                    defaultValue={personalInfoMap.Gender ?? ""}
                    helper="Gender field used in personnel documentation."
                  />
                  <InputField
                    id="employee-join-date"
                    label="Join Date"
                    defaultValue={personalInfoMap["Join Date"] ?? ""}
                    helper="Employment start date visible in the preview."
                  />
                  <InputField
                    id="employee-phone-number"
                    label="Phone Number"
                    defaultValue={personalInfoMap["Phone Number"] ?? selectedEmployee.phone}
                    helper="Primary phone number for employee communication."
                  />
                  <InputField
                    id="employee-email"
                    label="Email"
                    defaultValue={personalInfoMap.Email ?? selectedEmployee.email}
                    helper="Official employee email address."
                    type="email"
                  />
                </FieldGroup>
              </FieldSet>

              <SummarySection
                title="Profile Detail"
                description="Detailed personal and family information used in the profile section."
                items={selectedEmployee.profileDetail}
              />

              <SummarySection
                title="Attendance"
                description="Attendance values also visible in the preview modal attendance tab."
                items={selectedEmployee.attendanceSummary}
              />

              <SummarySection
                title="Leave"
                description="Leave balances and pending requests for this employee."
                items={selectedEmployee.leaveSummary}
              />

              <SummarySection
                title="Payroll"
                description="Payroll summary values that match the payroll tab in the preview."
                items={selectedEmployee.payrollSummary}
              />

              <FieldSet className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 md:p-5">
                <FieldLegend className="text-base text-slate-950">
                  Previous school details
                </FieldLegend>
                <p className="text-sm leading-6 text-slate-600">
                  Track school history and current assignment details.
                </p>
                <FieldGroup className="mt-4 grid gap-4 md:grid-cols-2">
                  <InputField
                    id="employee-previous-school"
                    label="Previous School Name"
                    defaultValue={schoolMap["Previous School Name"] ?? ""}
                    helper="School or institution before the current appointment."
                  />
                  <InputField
                    id="employee-current-school"
                    label="Current School Name"
                    defaultValue={schoolMap["Current School Name"] ?? ""}
                    helper="Current school entry used in profile records."
                  />
                </FieldGroup>
              </FieldSet>

              <FieldSet className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 md:p-5">
                <FieldLegend className="text-base text-slate-950">Address</FieldLegend>
                <p className="text-sm leading-6 text-slate-600">
                  Keep both current and permanent addresses aligned with HR files.
                </p>
                <FieldGroup className="mt-4 grid gap-4 md:grid-cols-2">
                  <TextareaField
                    id="employee-current-address"
                    label="Current Address"
                    defaultValue={addressMap["Current Address"] ?? ""}
                    helper="Employee's current residential address."
                  />
                  <TextareaField
                    id="employee-permanent-address"
                    label="Permanent Address"
                    defaultValue={addressMap["Permanent Address"] ?? ""}
                    helper="Permanent address used for formal records."
                  />
                </FieldGroup>
              </FieldSet>

              <FieldSet className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 md:p-5">
                <FieldLegend className="text-base text-slate-950">Bank details</FieldLegend>
                <p className="text-sm leading-6 text-slate-600">
                  Banking details used for payroll transfers and finance review.
                </p>
                <FieldGroup className="mt-4 grid gap-4 md:grid-cols-2">
                  <InputField
                    id="employee-bank-name"
                    label="Bank Name"
                    defaultValue={bankMap["Bank Name"] ?? ""}
                    helper="Payroll bank registered for salary transfer."
                  />
                  <InputField
                    id="employee-branch"
                    label="Branch"
                    defaultValue={bankMap.Branch ?? ""}
                    helper="Branch recorded in employee bank details."
                  />
                  <InputField
                    id="employee-ifsc-code"
                    label="IFSC Code"
                    defaultValue={bankMap["IFSC Code"] ?? ""}
                    helper="Bank routing or transfer code."
                  />
                </FieldGroup>
              </FieldSet>

              <FieldSet className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 md:p-5">
                <FieldLegend className="text-base text-slate-950">Medical details</FieldLegend>
                <p className="text-sm leading-6 text-slate-600">
                  Health information retained for staff records and emergency needs.
                </p>
                <FieldGroup className="mt-4 grid gap-4 md:grid-cols-2">
                  <InputField
                    id="employee-blood-group"
                    label="Blood Group"
                    defaultValue={medicalMap["Blood Group"] ?? ""}
                    helper="Emergency health reference."
                  />
                  <InputField
                    id="employee-height"
                    label="Height"
                    defaultValue={medicalMap.Height ?? ""}
                    helper="Recorded staff height."
                  />
                  <InputField
                    id="employee-weight"
                    label="Weight"
                    defaultValue={medicalMap.Weight ?? ""}
                    helper="Recorded staff weight."
                  />
                </FieldGroup>
              </FieldSet>

              <FieldSet className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 md:p-5">
                <FieldLegend className="text-base text-slate-950">Documents</FieldLegend>
                <p className="text-sm leading-6 text-slate-600">
                  Attach or maintain the same file references visible in the modal.
                </p>
                <FieldGroup className="mt-4 grid gap-4 md:grid-cols-2">
                  <TextareaField
                    id="employee-documents"
                    label="Document list"
                    defaultValue={selectedEmployee.documents.join("\n")}
                    helper="One document reference per line, such as certificates or appointment files."
                  />
                </FieldGroup>
              </FieldSet>
            </form>
          </CardContent>
          <CardFooter className="justify-between gap-3 border-slate-200 bg-slate-50/80">
            <p className="text-sm text-slate-500">
              Save updates only after cross-checking the preview against the employee file.
            </p>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setPreviewOpen(true)}>
                Open preview
              </Button>
              <Button type="button">Save employee details</Button>
            </div>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
            <CardHeader>
              <CardTitle>Section guidance</CardTitle>
              <CardDescription>
                Keep the form aligned with the profile information shown in preview mode.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                The employee details form now includes personal info, profile detail, school,
                address, bank, medical, document, attendance, leave, and payroll sections.
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                Use preview to confirm the form still matches the expected modal presentation
                before saving changes.
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                Attendance, leave, and payroll values are included here for a single full-profile
                edit experience.
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-900/5 bg-slate-950 text-white shadow-[0_24px_70px_-50px_rgba(15,23,42,0.65)]">
            <CardHeader>
              <CardTitle className="text-white">Current profile</CardTitle>
              <CardDescription className="text-white/70">
                The selected employee updates both the form and the preview modal.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-xs uppercase tracking-[0.22em] text-white/60">Employee</div>
                <div className="mt-2 text-lg font-semibold">{selectedEmployee.name}</div>
                <div className="mt-1 text-sm text-white/70">{selectedEmployee.id}</div>
              </div>
              <div className="grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm text-white/60">Subject</div>
                  <div className="mt-2 text-xl font-semibold">{selectedEmployee.subject}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm text-white/60">Payroll net</div>
                  <div className="mt-2 text-xl font-semibold">
                    {selectedEmployee.payrollSummary.find((item) => item.label === "Net Salary")
                      ?.value ?? "N/A"}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm text-white/60">Documents</div>
                  <div className="mt-2 text-xl font-semibold">
                    {selectedEmployee.documents.length} file(s)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <EmployeePreviewModal
        key={selectedEmployee.id}
        employee={selectedEmployee}
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />
    </>
  )
}
