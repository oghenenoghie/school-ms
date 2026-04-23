"use client"

import { Chart } from "@/components/sms/chart"
import { DataTable } from "@/components/sms/data-table"
import { FormBuilder } from "@/components/sms/form-builder"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  activityFeed,
  admissionStages,
  attendanceColumns,
  examColumns,
  examRows,
  feeColumns,
  feeRows,
  financeChecklist,
  formFields,
  lessonPlanner,
  messageColumns,
  messageRows,
  overviewBars,
  parentChildren,
  parentUpdates,
  profileSections,
  revenueBars,
  studentAssignments,
  studentColumns,
  studentHighlights,
  studentRows,
  teacherAssignments,
  timetable,
  type Role,
  type TableRow,
} from "@/lib/sms-data"

const roleTabs: Record<Role, Array<{ value: string; label: string }>> = {
  admin: [
    { value: "students", label: "Students" },
    { value: "operations", label: "Operations" },
    { value: "finance", label: "Finance" },
  ],
  teacher: [
    { value: "classes", label: "Classes" },
    { value: "attendance", label: "Attendance" },
    { value: "grading", label: "Grading" },
  ],
  student: [
    { value: "today", label: "Today" },
    { value: "assignments", label: "Assignments" },
    { value: "results", label: "Results" },
  ],
  parent: [
    { value: "children", label: "Children" },
    { value: "fees", label: "Fees" },
    { value: "messages", label: "Messages" },
  ],
  accountant: [
    { value: "invoices", label: "Invoices" },
    { value: "collections", label: "Collections" },
    { value: "audit", label: "Audit" },
  ],
}

function InfoListCard({
  title,
  description,
  items,
}: {
  title: string
  description: string
  items: Array<{ title: string; detail: string }>
}) {
  return (
    <Card className="border border-slate-200/80 bg-white/90">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="font-medium text-slate-950">{item.title}</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function SnapshotCard({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <Card className="border border-slate-200/80 bg-white/90">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

function QuickMarkCard({ onQuickMark }: { onQuickMark: () => void }) {
  return (
    <Card className="border border-slate-200/80 bg-white/90">
      <CardHeader>
        <CardTitle>Quick mark attendance</CardTitle>
        <CardDescription>
          Optimistic UI update for the active class roster.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="rounded-2xl bg-slate-950 p-5 text-white">
          <div className="text-sm text-white/70">Current class</div>
          <div className="mt-2 text-2xl font-semibold">Grade 8B - Hadi Salim</div>
          <p className="mt-2 text-sm leading-6 text-white/70">
            Low attendance was flagged earlier. Mark the section now to clear the alert.
          </p>
        </div>
        <Button onClick={onQuickMark} className="w-full">
          Mark current class
        </Button>
      </CardContent>
    </Card>
  )
}

function AdminModules({ attendance }: { attendance: TableRow[] }) {
  return (
    <>
      <TabsContent value="students" className="mt-6">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <SnapshotCard
            title="Student management"
            description="Admissions, directory search, and record review stay grouped for administrators."
          >
            <DataTable
              title="Student directory"
              columns={studentColumns}
              rows={studentRows}
              searchPlaceholder="Search students, classes, or fee status"
            />
          </SnapshotCard>

          <SnapshotCard
            title="Student profile"
            description="Profile tabs remain available, but only on the admin dashboard where full records are needed."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {profileSections.slice(0, 4).map((section) => (
                <div key={section.key} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {section.label}
                  </div>
                  <div className="mt-3 flex flex-col gap-2">
                    {section.items.slice(0, 2).map((item) => (
                      <div key={item.label} className="text-sm text-slate-700">
                        <span className="font-medium text-slate-950">{item.label}:</span> {item.value}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SnapshotCard>
        </div>
      </TabsContent>

      <TabsContent value="operations" className="mt-6">
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <SnapshotCard
            title="Admission workflow"
            description="Pipeline visibility and intake forms are reserved for operations."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {admissionStages.map((stage) => (
                <div key={stage.label} className="rounded-2xl bg-slate-950 p-4 text-white">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/60">{stage.label}</div>
                  <div className="mt-3 text-lg font-semibold">{stage.count}</div>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <FormBuilder fields={formFields} />
            </div>
          </SnapshotCard>

          <SnapshotCard
            title="Operations pulse"
            description="Attendance, delivery, and workflow monitoring stay on the admin side."
          >
            <DataTable
              title="Class attendance snapshot"
              columns={attendanceColumns}
              rows={attendance}
              searchPlaceholder="Search classes, teachers, or status"
            />
          </SnapshotCard>
        </div>
      </TabsContent>

      <TabsContent value="finance" className="mt-6">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <SnapshotCard
            title="Fee supervision"
            description="Leadership can view finance health without jumping into the accountant dashboard."
          >
            <DataTable
              title="Invoice overview"
              columns={feeColumns}
              rows={feeRows}
              searchPlaceholder="Search family, invoice, or status"
            />
          </SnapshotCard>

          <div className="flex flex-col gap-6">
            <Chart
              title="Revenue momentum"
              description="Weekly collection signal for executive monitoring."
              bars={revenueBars}
            />
            <SnapshotCard
              title="Communications overview"
              description="Broadcasts and delivery status are visible here for leadership review."
            >
              <DataTable
                title="Message threads"
                columns={messageColumns}
                rows={messageRows}
                searchPlaceholder="Search thread, participants, or channel"
              />
            </SnapshotCard>
          </div>
        </div>
      </TabsContent>
    </>
  )
}

function TeacherModules({
  attendance,
  onQuickMark,
}: {
  attendance: TableRow[]
  onQuickMark: () => void
}) {
  return (
    <>
      <TabsContent value="classes" className="mt-6">
        <div className="grid gap-6 xl:grid-cols-2">
          <InfoListCard
            title="Lesson planner"
            description="Today's teaching blocks and preparation checklist."
            items={lessonPlanner.map((item) => ({
              title: `${item.period} · ${item.title}`,
              detail: item.detail,
            }))}
          />
          <SnapshotCard
            title="Weekly timetable"
            description="A teacher-focused timetable view without admissions or finance noise."
          >
            <div className="grid gap-3">
              {timetable.map((item) => (
                <div
                  key={item.day}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <div className="font-medium text-slate-950">{item.day}</div>
                  <div className="text-sm text-slate-600">{item.detail}</div>
                </div>
              ))}
            </div>
          </SnapshotCard>
        </div>
      </TabsContent>

      <TabsContent value="attendance" className="mt-6">
        <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <QuickMarkCard onQuickMark={onQuickMark} />
          <SnapshotCard
            title="Attendance reporting"
            description="Only the teaching attendance tools remain in the teacher dashboard."
          >
            <DataTable
              title="Class attendance snapshot"
              columns={attendanceColumns}
              rows={attendance}
              searchPlaceholder="Search classes, teachers, or status"
            />
          </SnapshotCard>
        </div>
      </TabsContent>

      <TabsContent value="grading" className="mt-6">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <SnapshotCard
            title="Assessment queue"
            description="Grading and moderation stay centered for teachers."
          >
            <DataTable
              title="Exam sessions"
              columns={examColumns}
              rows={examRows}
              searchPlaceholder="Search exams, classes, or result status"
            />
          </SnapshotCard>
          <InfoListCard
            title="Teacher follow-ups"
            description="Assignments and family communication tasks for today."
            items={teacherAssignments}
          />
        </div>
      </TabsContent>
    </>
  )
}

function StudentModules() {
  return (
    <>
      <TabsContent value="today" className="mt-6">
        <div className="grid gap-6 xl:grid-cols-2">
          <SnapshotCard
            title="Today's timetable"
            description="A student view that focuses only on the current day."
          >
            <div className="grid gap-3">
              {timetable.map((item) => (
                <div key={item.day} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="font-medium text-slate-950">{item.day}</div>
                  <div className="mt-2 text-sm text-slate-600">{item.detail}</div>
                </div>
              ))}
            </div>
          </SnapshotCard>
          <InfoListCard
            title="Announcements"
            description="Important updates for the student dashboard only."
            items={studentHighlights.map((detail, index) => ({
              title: `Update ${index + 1}`,
              detail,
            }))}
          />
        </div>
      </TabsContent>

      <TabsContent value="assignments" className="mt-6">
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <InfoListCard
            title="Upcoming assignments"
            description="Tasks, submission status, and due dates from the student perspective."
            items={studentAssignments}
          />
          <SnapshotCard
            title="Assignment rhythm"
            description="A simplified workload pattern instead of staff operations data."
          >
            <Chart
              title="Weekly workload"
              description="Current study load across the week."
              bars={overviewBars}
            />
          </SnapshotCard>
        </div>
      </TabsContent>

      <TabsContent value="results" className="mt-6">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <SnapshotCard
            title="Recent results"
            description="Published assessments and academic progress."
          >
            <DataTable
              title="Exam sessions"
              columns={examColumns}
              rows={examRows}
              searchPlaceholder="Search exams or result status"
            />
          </SnapshotCard>
          <SnapshotCard
            title="Academic snapshot"
            description="Only the sections useful to a student are surfaced here."
          >
            <div className="grid gap-3">
              {profileSections.slice(1, 3).map((section) => (
                <div key={section.key} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="font-medium text-slate-950">{section.label}</div>
                  <div className="mt-3 flex flex-col gap-2">
                    {section.items.map((item) => (
                      <div key={item.label} className="text-sm text-slate-700">
                        <span className="font-medium text-slate-950">{item.label}:</span> {item.value}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SnapshotCard>
        </div>
      </TabsContent>
    </>
  )
}

function ParentModules() {
  return (
    <>
      <TabsContent value="children" className="mt-6">
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <InfoListCard
            title="Linked children"
            description="Only parent-relevant summaries appear here."
            items={parentChildren.map((child) => ({
              title: child.name,
              detail: child.detail,
            }))}
          />
          <SnapshotCard
            title="Children overview"
            description="A narrowed view of student data for family accounts."
          >
            <DataTable
              title="Linked students"
              columns={studentColumns}
              rows={studentRows.slice(0, 2)}
              searchPlaceholder="Search linked children"
            />
          </SnapshotCard>
        </div>
      </TabsContent>

      <TabsContent value="fees" className="mt-6">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <SnapshotCard
            title="Fee status"
            description="Billing and installment details stay separate from student-only tools."
          >
            <DataTable
              title="Family invoices"
              columns={feeColumns}
              rows={feeRows}
              searchPlaceholder="Search family, invoice, or status"
            />
          </SnapshotCard>
          <InfoListCard
            title="Family updates"
            description="Transport, fee, and exam notices relevant to parents."
            items={parentUpdates}
          />
        </div>
      </TabsContent>

      <TabsContent value="messages" className="mt-6">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <SnapshotCard
            title="Teacher communication"
            description="Parent messaging remains focused on school-family coordination."
          >
            <DataTable
              title="Message threads"
              columns={messageColumns}
              rows={messageRows}
              searchPlaceholder="Search thread, participants, or channel"
            />
          </SnapshotCard>
          <InfoListCard
            title="Next actions"
            description="Common parent follow-ups and reminders."
            items={[
              { title: "Confirm invoice plan", detail: "Approve the next quarterly installment before April 22." },
              { title: "Reply to physics teacher", detail: "Share Mariam's follow-up note about the lab report." },
              { title: "Review route timing", detail: "Transport pickup changed for Route 4 starting Monday." },
            ]}
          />
        </div>
      </TabsContent>
    </>
  )
}

function AccountantModules() {
  return (
    <>
      <TabsContent value="invoices" className="mt-6">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <SnapshotCard
            title="Invoice desk"
            description="Billing and account status stay isolated in the accountant dashboard."
          >
            <DataTable
              title="Invoice list"
              columns={feeColumns}
              rows={feeRows}
              searchPlaceholder="Search family, invoice, or status"
            />
          </SnapshotCard>
          <InfoListCard
            title="Finance checklist"
            description="Daily work queue for collections and approvals."
            items={financeChecklist}
          />
        </div>
      </TabsContent>

      <TabsContent value="collections" className="mt-6">
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <SnapshotCard
            title="Collections trend"
            description="Cash movement and collection momentum for the finance team."
          >
            <Chart
              title="Weekly collections"
              description="Current collection performance across the month."
              bars={revenueBars}
            />
          </SnapshotCard>
          <SnapshotCard
            title="Balance watch"
            description="Outstanding account categories and finance flags."
          >
            <div className="flex flex-col gap-3">
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                <div className="font-medium text-rose-900">High-risk overdue</div>
                <p className="mt-2 text-sm text-rose-900/80">3 accounts above $2,000 need a call today.</p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <div className="font-medium text-amber-950">Pending approvals</div>
                <p className="mt-2 text-sm text-amber-950/80">Scholarship and discount validations are still open.</p>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="font-medium text-emerald-900">Settlements complete</div>
                <p className="mt-2 text-sm text-emerald-900/80">Gateway settlement matched automatically this morning.</p>
              </div>
            </div>
          </SnapshotCard>
        </div>
      </TabsContent>

      <TabsContent value="audit" className="mt-6">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <SnapshotCard
            title="Audit trail"
            description="Finance-adjacent activity logs for reconciliation and review."
          >
            <div className="flex flex-col gap-3">
              {activityFeed.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </SnapshotCard>
          <SnapshotCard
            title="Receipts and communication"
            description="Payment acknowledgements and follow-up threads for the finance desk."
          >
            <DataTable
              title="Finance communication"
              columns={messageColumns}
              rows={messageRows}
              searchPlaceholder="Search thread, participants, or channel"
            />
          </SnapshotCard>
        </div>
      </TabsContent>
    </>
  )
}

export function RoleModuleView({
  role,
  attendance,
  onQuickMark,
}: {
  role: Role
  attendance: TableRow[]
  onQuickMark: () => void
}) {
  const tabs = roleTabs[role]

  return (
    <section className="rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-[0_20px_70px_-52px_rgba(15,23,42,0.45)] backdrop-blur lg:p-5">
      <Tabs defaultValue={tabs[0].value}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
              Role modules
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              Focused sections for the {role} dashboard
            </h2>
          </div>
          <TabsList variant="line">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {role === "admin" && <AdminModules attendance={attendance} />}
        {role === "teacher" && (
          <TeacherModules attendance={attendance} onQuickMark={onQuickMark} />
        )}
        {role === "student" && <StudentModules />}
        {role === "parent" && <ParentModules />}
        {role === "accountant" && <AccountantModules />}
      </Tabs>
    </section>
  )
}
