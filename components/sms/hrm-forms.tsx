import { BriefcaseBusiness, Building2, CreditCard, UserRound } from "lucide-react"

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
import { cn } from "@/lib/utils"
import type { DashboardSection } from "@/lib/dashboard-data"

type HrmFormSection = Extract<
  DashboardSection,
  "employee-details" | "employee-add" | "payroll" | "designation"
>

type SelectOption = {
  label: string
  value: string
}

type BaseField = {
  id: string
  label: string
  helper: string
}

type InputField = BaseField & {
  kind: "input"
  type: "text" | "email" | "tel" | "date" | "number"
  placeholder: string
}

type SelectField = BaseField & {
  kind: "select"
  placeholder: string
  options: SelectOption[]
}

type TextareaField = BaseField & {
  kind: "textarea"
  placeholder: string
}

type HrmField = InputField | SelectField | TextareaField

type HrmFormDefinition = {
  eyebrow: string
  title: string
  description: string
  actionLabel: string
  icon: typeof UserRound
  highlights: string[]
  groups: Array<{
    legend: string
    description: string
    fields: HrmField[]
  }>
}

const departmentOptions: SelectOption[] = [
  { label: "Human Resources", value: "human-resources" },
  { label: "Academics", value: "academics" },
  { label: "Finance", value: "finance" },
  { label: "Operations", value: "operations" },
  { label: "Transport", value: "transport" },
]

const employmentStatusOptions: SelectOption[] = [
  { label: "Active", value: "active" },
  { label: "Probation", value: "probation" },
  { label: "On leave", value: "on-leave" },
  { label: "Contract", value: "contract" },
]

const payScheduleOptions: SelectOption[] = [
  { label: "Monthly", value: "monthly" },
  { label: "Semi-monthly", value: "semi-monthly" },
  { label: "Weekly", value: "weekly" },
]

const gradeOptions: SelectOption[] = [
  { label: "Level 1", value: "level-1" },
  { label: "Level 2", value: "level-2" },
  { label: "Level 3", value: "level-3" },
  { label: "Level 4", value: "level-4" },
]

const employeeForms: Record<HrmFormSection, HrmFormDefinition> = {
  "employee-details": {
    eyebrow: "Employee record",
    title: "Employee details form",
    description:
      "Review contact information, employment status, and reporting context before updating the staff file.",
    actionLabel: "Save employee details",
    icon: UserRound,
    highlights: [
      "Use official name and staff ID from the contract file.",
      "Keep payroll email and emergency contact current before each pay cycle.",
      "HR approval is required when department or status changes.",
    ],
    groups: [
      {
        legend: "Identity and contact",
        description: "Core employee record fields used across HR and payroll.",
        fields: [
          {
            id: "employee-id",
            kind: "input",
            label: "Employee ID",
            type: "text",
            placeholder: "EMP-2026-014",
            helper: "Match the internal staff register and ID card.",
          },
          {
            id: "employee-full-name",
            kind: "input",
            label: "Full name",
            type: "text",
            placeholder: "Enter employee full name",
            helper: "Use the same spelling as the employee contract.",
          },
          {
            id: "employee-email",
            kind: "input",
            label: "Work email",
            type: "email",
            placeholder: "name@northfield.edu",
            helper: "Primary address for payroll notices and internal updates.",
          },
          {
            id: "employee-phone",
            kind: "input",
            label: "Mobile number",
            type: "tel",
            placeholder: "+966 5X XXX XXXX",
            helper: "Use the direct contact number for urgent HR outreach.",
          },
        ],
      },
      {
        legend: "Employment profile",
        description: "Operational ownership and current staff status.",
        fields: [
          {
            id: "employee-joining-date",
            kind: "input",
            label: "Date of joining",
            type: "date",
            placeholder: "YYYY-MM-DD",
            helper: "This drives tenure reporting and probation milestones.",
          },
          {
            id: "employee-department",
            kind: "select",
            label: "Department",
            placeholder: "Select department",
            options: departmentOptions,
            helper: "Assign the home department for reporting and budgets.",
          },
          {
            id: "employee-status",
            kind: "select",
            label: "Employment status",
            placeholder: "Select employment status",
            options: employmentStatusOptions,
            helper: "Status controls dashboard visibility and payroll handling.",
          },
          {
            id: "employee-manager",
            kind: "input",
            label: "Reporting manager",
            type: "text",
            placeholder: "Enter line manager name",
            helper: "Immediate approver for leave, payroll changes, and reviews.",
          },
          {
            id: "employee-emergency-contact",
            kind: "input",
            label: "Emergency contact",
            type: "text",
            placeholder: "Name and phone number",
            helper: "Keep one reachable contact on every active staff record.",
          },
          {
            id: "employee-notes",
            kind: "textarea",
            label: "HR notes",
            placeholder: "Add context for visa status, contract renewals, or special approvals",
            helper: "Visible to HR admins during employee record review.",
          },
        ],
      },
    ],
  },
  "employee-add": {
    eyebrow: "Onboarding",
    title: "Add new employee",
    description:
      "Create a complete staff profile for faculty, finance, or operations without leaving the admin workspace.",
    actionLabel: "Create employee profile",
    icon: BriefcaseBusiness,
    highlights: [
      "Start with role, department, and joining date so access can be provisioned correctly.",
      "Banking and payroll preferences should be confirmed before activating the record.",
      "Probation end dates are useful for HR review scheduling.",
    ],
    groups: [
      {
        legend: "Starter profile",
        description: "Basic employee identity and placement details.",
        fields: [
          {
            id: "new-employee-name",
            kind: "input",
            label: "Employee full name",
            type: "text",
            placeholder: "Enter full legal name",
            helper: "Use the employee name exactly as it appears on official documents.",
          },
          {
            id: "new-employee-designation",
            kind: "input",
            label: "Designation",
            type: "text",
            placeholder: "Senior Mathematics Teacher",
            helper: "This title will appear in the employee directory and approvals.",
          },
          {
            id: "new-employee-department",
            kind: "select",
            label: "Department",
            placeholder: "Select department",
            options: departmentOptions,
            helper: "Maps the employee to the right operational team.",
          },
          {
            id: "new-employee-type",
            kind: "select",
            label: "Employment type",
            placeholder: "Select employment type",
            options: [
              { label: "Full-time", value: "full-time" },
              { label: "Part-time", value: "part-time" },
              { label: "Contract", value: "contract" },
              { label: "Temporary", value: "temporary" },
            ],
            helper: "Used for benefits eligibility and payroll structure.",
          },
          {
            id: "new-employee-joining-date",
            kind: "input",
            label: "Joining date",
            type: "date",
            placeholder: "YYYY-MM-DD",
            helper: "Controls onboarding checklist timing and account activation.",
          },
          {
            id: "new-employee-probation-end",
            kind: "input",
            label: "Probation end date",
            type: "date",
            placeholder: "YYYY-MM-DD",
            helper: "Optional, but helpful for HR review reminders.",
          },
        ],
      },
      {
        legend: "Payroll and access",
        description: "Initial finance and communication setup for a new staff member.",
        fields: [
          {
            id: "new-employee-email",
            kind: "input",
            label: "Work email",
            type: "email",
            placeholder: "name@northfield.edu",
            helper: "Will be used for staff access and policy communication.",
          },
          {
            id: "new-employee-phone",
            kind: "input",
            label: "Mobile number",
            type: "tel",
            placeholder: "+966 5X XXX XXXX",
            helper: "Required for staff contact and emergency coordination.",
          },
          {
            id: "new-employee-pay-schedule",
            kind: "select",
            label: "Pay schedule",
            placeholder: "Select pay schedule",
            options: payScheduleOptions,
            helper: "Choose the payroll cadence that matches the contract.",
          },
          {
            id: "new-employee-salary",
            kind: "input",
            label: "Base salary",
            type: "number",
            placeholder: "0.00",
            helper: "Enter the gross agreed amount before deductions.",
          },
          {
            id: "new-employee-bank",
            kind: "input",
            label: "Bank account reference",
            type: "text",
            placeholder: "IBAN or payroll account reference",
            helper: "Used by finance during salary disbursement setup.",
          },
          {
            id: "new-employee-onboarding-note",
            kind: "textarea",
            label: "Onboarding note",
            placeholder: "Add role-specific setup notes, approvals, or pending documents",
            helper: "Useful for tracking missing credentials or contract attachments.",
          },
        ],
      },
    ],
  },
  payroll: {
    eyebrow: "Salary processing",
    title: "Payroll preparation form",
    description:
      "Capture the fields finance and HR need before a payroll batch is approved and sent to banking.",
    actionLabel: "Review payroll run",
    icon: CreditCard,
    highlights: [
      "Lock the pay period before entering adjustment amounts.",
      "Allowances and deductions should include a short audit note when changed manually.",
      "Approver and transfer date should be confirmed before the batch is marked ready.",
    ],
    groups: [
      {
        legend: "Payroll cycle",
        description: "Define the run window and the employee group being processed.",
        fields: [
          {
            id: "payroll-period",
            kind: "input",
            label: "Pay period",
            type: "text",
            placeholder: "April 2026",
            helper: "Use the month or period name shown in payroll reports.",
          },
          {
            id: "payroll-group",
            kind: "select",
            label: "Payroll group",
            placeholder: "Select payroll group",
            options: [
              { label: "Teaching staff", value: "teaching-staff" },
              { label: "Operations staff", value: "operations-staff" },
              { label: "Finance and admin", value: "finance-admin" },
              { label: "Transport and support", value: "transport-support" },
            ],
            helper: "Group by staff type to simplify batch approvals and exports.",
          },
          {
            id: "payroll-schedule",
            kind: "select",
            label: "Pay schedule",
            placeholder: "Select pay schedule",
            options: payScheduleOptions,
            helper: "Keep the run aligned with the employee contract type.",
          },
          {
            id: "payroll-transfer-date",
            kind: "input",
            label: "Bank transfer date",
            type: "date",
            placeholder: "YYYY-MM-DD",
            helper: "Finance uses this to schedule the payout release.",
          },
        ],
      },
      {
        legend: "Adjustments and approval",
        description: "Document changes before the payroll batch is finalized.",
        fields: [
          {
            id: "payroll-allowances",
            kind: "input",
            label: "Allowances total",
            type: "number",
            placeholder: "0.00",
            helper: "Include transport, housing, and one-time allowances.",
          },
          {
            id: "payroll-deductions",
            kind: "input",
            label: "Deductions total",
            type: "number",
            placeholder: "0.00",
            helper: "List approved deductions already cleared by HR or finance.",
          },
          {
            id: "payroll-overtime",
            kind: "input",
            label: "Overtime amount",
            type: "number",
            placeholder: "0.00",
            helper: "Use the approved overtime amount for this pay period only.",
          },
          {
            id: "payroll-approver",
            kind: "input",
            label: "Approving officer",
            type: "text",
            placeholder: "Enter approver name",
            helper: "This person signs off before the batch moves to payout.",
          },
          {
            id: "payroll-status",
            kind: "select",
            label: "Payroll status",
            placeholder: "Select payroll status",
            options: [
              { label: "Draft", value: "draft" },
              { label: "Under review", value: "under-review" },
              { label: "Approved", value: "approved" },
              { label: "Ready for payout", value: "ready-for-payout" },
            ],
            helper: "Reflect the current approval stage for the batch.",
          },
          {
            id: "payroll-note",
            kind: "textarea",
            label: "Adjustment note",
            placeholder: "Explain manual adjustments, exceptions, or approval context",
            helper: "Useful for payroll audits and month-end reconciliation.",
          },
        ],
      },
    ],
  },
  designation: {
    eyebrow: "Role structure",
    title: "Designation setup form",
    description:
      "Maintain job titles, reporting levels, and department ownership so employees are placed consistently.",
    actionLabel: "Save designation",
    icon: Building2,
    highlights: [
      "Keep title names standardized to avoid duplicate reporting lines.",
      "Designation grade should align with salary bands and approval authority.",
      "List the core responsibilities that define the role for hiring and appraisal workflows.",
    ],
    groups: [
      {
        legend: "Designation definition",
        description: "Create or update the core title metadata.",
        fields: [
          {
            id: "designation-title",
            kind: "input",
            label: "Designation title",
            type: "text",
            placeholder: "HR Business Partner",
            helper: "Use a single standardized title for all matching roles.",
          },
          {
            id: "designation-code",
            kind: "input",
            label: "Designation code",
            type: "text",
            placeholder: "HR-BP-03",
            helper: "Helpful for exports, approvals, and payroll mapping.",
          },
          {
            id: "designation-department",
            kind: "select",
            label: "Department",
            placeholder: "Select department",
            options: departmentOptions,
            helper: "Each designation should have a clear operational owner.",
          },
          {
            id: "designation-level",
            kind: "select",
            label: "Designation grade",
            placeholder: "Select level",
            options: gradeOptions,
            helper: "This controls seniority, approval paths, and compensation bands.",
          },
        ],
      },
      {
        legend: "Reporting and scope",
        description: "Clarify where the designation sits in the organization.",
        fields: [
          {
            id: "designation-manager",
            kind: "input",
            label: "Reports to",
            type: "text",
            placeholder: "Director of Operations",
            helper: "Use the official reporting title, not a personal name, when possible.",
          },
          {
            id: "designation-headcount",
            kind: "input",
            label: "Planned headcount",
            type: "number",
            placeholder: "1",
            helper: "Track how many employees can be assigned to this designation.",
          },
          {
            id: "designation-status",
            kind: "select",
            label: "Designation status",
            placeholder: "Select designation status",
            options: [
              { label: "Active", value: "active" },
              { label: "Hiring", value: "hiring" },
              { label: "Frozen", value: "frozen" },
              { label: "Archived", value: "archived" },
            ],
            helper: "Use archived for retired titles that should remain in history only.",
          },
          {
            id: "designation-responsibilities",
            kind: "textarea",
            label: "Key responsibilities",
            placeholder: "Outline the primary responsibilities and authority of this designation",
            helper: "Supports recruitment, onboarding, and annual appraisal alignment.",
          },
        ],
      },
    ],
  },
}

function SelectInput({
  id,
  placeholder,
  options,
}: {
  id: string
  placeholder: string
  options: SelectOption[]
}) {
  return (
    <select
      id={id}
      defaultValue=""
      className={cn(
        "h-8 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-sm text-slate-700 outline-none transition-colors",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      )}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

function HrmFieldControl({ field }: { field: HrmField }) {
  if (field.kind === "textarea") {
    return (
      <Textarea
        id={field.id}
        placeholder={field.placeholder}
        className="min-h-24 border-slate-200 bg-white"
      />
    )
  }

  if (field.kind === "select") {
    return (
      <SelectInput
        id={field.id}
        placeholder={field.placeholder}
        options={field.options}
      />
    )
  }

  return (
    <Input
      id={field.id}
      type={field.type}
      placeholder={field.placeholder}
      className="h-10 border-slate-200 bg-white"
    />
  )
}

function HrmGroup({
  legend,
  description,
  fields,
}: HrmFormDefinition["groups"][number]) {
  return (
    <FieldSet className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 md:p-5">
      <FieldLegend className="text-base text-slate-950">{legend}</FieldLegend>
      <p className="text-sm leading-6 text-slate-600">{description}</p>
      <FieldGroup className="mt-4 grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <Field
            key={field.id}
            className={field.kind === "textarea" ? "md:col-span-2" : undefined}
          >
            <FieldLabel htmlFor={field.id}>{field.label}</FieldLabel>
            <HrmFieldControl field={field} />
            <FieldDescription>{field.helper}</FieldDescription>
          </Field>
        ))}
      </FieldGroup>
    </FieldSet>
  )
}

export function HrmForms({ section }: { section: HrmFormSection }) {
  const form = employeeForms[section]
  const Icon = form.icon

  return (
    <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
        <CardHeader>
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
            {form.eyebrow}
          </div>
          <CardTitle className="mt-2">{form.title}</CardTitle>
          <CardDescription>{form.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-5">
            {form.groups.map((group) => (
              <HrmGroup key={group.legend} {...group} />
            ))}
          </form>
        </CardContent>
        <CardFooter className="justify-between gap-3 border-slate-200 bg-slate-50/80">
          <p className="text-sm text-slate-500">
            Review required fields before sending this item for approval.
          </p>
          <div className="flex gap-2">
            <Button type="button" variant="outline">
              Reset
            </Button>
            <Button type="button">{form.actionLabel}</Button>
          </div>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-6">
        <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
          <CardHeader>
            <CardTitle>Section guidance</CardTitle>
            <CardDescription>
              Quick reminders for the current HRM workflow.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {form.highlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700"
              >
                {highlight}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-slate-900/5 bg-slate-950 text-white shadow-[0_24px_70px_-50px_rgba(15,23,42,0.65)]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-white/10">
                <Icon className="size-5" />
              </div>
              <div>
                <CardTitle className="text-white">HR review lane</CardTitle>
                <CardDescription className="text-white/70">
                  Keep employee records clean before final approval.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl bg-white/10 p-4">
              <div className="text-xs uppercase tracking-[0.22em] text-white/60">
                Recommended next step
              </div>
              <div className="mt-2 text-lg font-semibold">{form.actionLabel}</div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm text-white/60">Compliance</div>
                <div className="mt-2 text-xl font-semibold">Ready</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm text-white/60">Approvals</div>
                <div className="mt-2 text-xl font-semibold">2-step</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm text-white/60">Audit trail</div>
                <div className="mt-2 text-xl font-semibold">Tracked</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
