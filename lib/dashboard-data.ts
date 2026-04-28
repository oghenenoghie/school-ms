import type { Role } from "@/lib/sms-data"

export type DashboardSection =
  | "dashboard"
  | "students"
  | "student-list"
  | "student-add"
  | "timetable"
  | "assignments"
  | "messages"
  | "subjects"
  | "hrm"
  | "employee-details"
  | "employee-add"
  | "payroll"
  | "designation"
  | "department"
  | "teachers"
  | "classes"
  | "attendance"
  | "exams"
  | "results"
  | "fees"
  | "settings"

export type SidebarMenuItem = {
  id: DashboardSection
  label: string
  roles?: Role[]
  icon:
    | "layout-dashboard"
    | "users"
    | "graduation-cap"
    | "school"
    | "calendar-check-2"
    | "file-check-2"
    | "badge-percent"
    | "wallet"
    | "messages-square"
    | "book-open-text"
    | "clipboard-list"
    | "briefcase-business"
    | "settings-2"
  children?: Array<{
    id: DashboardSection
    label: string
  }>
}

export type ChartPoint = {
  name: string
  value: number
  secondary?: number
}

export type DistributionPoint = {
  name: string
  value: number
  color: string
}

export type CalendarEventSeed = {
  id: string
  title: string
  start: string
  end?: string
  allDay?: boolean
  color: string
}

export type RecentActivityRow = {
  id: string
  student: string
  className: string
  status: "Present" | "Absent" | "Paid" | "Pending" | "Excellent" | "Review"
  date: string
}

export const dashboardSections = [
  "dashboard",
  "students",
  "student-list",
  "student-add",
  "timetable",
  "assignments",
  "messages",
  "subjects",
  "hrm",
  "employee-details",
  "employee-add",
  "payroll",
  "designation",
  "department",
  "teachers",
  "classes",
  "attendance",
  "exams",
  "results",
  "fees",
  "settings",
] satisfies DashboardSection[]

export function isDashboardSection(value: string): value is DashboardSection {
  return dashboardSections.includes(value as DashboardSection)
}

export function getDashboardHref(role: Role, section: DashboardSection) {
  if (section === "dashboard") {
    return `/dashboard/${role}`
  }

  return `/dashboard/${role}?section=${section}`
}

export const sidebarMenu: SidebarMenuItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "layout-dashboard" },
  { id: "timetable", label: "Timetable", roles: ["student"], icon: "school" },
  { id: "assignments", label: "Assignments", roles: ["student"], icon: "clipboard-list" },
  { id: "results", label: "Results", roles: ["student"], icon: "badge-percent" },
  { id: "attendance", label: "Attendance", roles: ["student"], icon: "calendar-check-2" },
  { id: "messages", label: "Messages", roles: ["student"], icon: "messages-square" },
  { id: "fees", label: "Fees", roles: ["student"], icon: "wallet" },
  { id: "subjects", label: "Subjects", roles: ["student"], icon: "book-open-text" },
  { id: "settings", label: "Settings", roles: ["student"], icon: "settings-2" },
  {
    id: "students",
    label: "Students",
    roles: ["admin"],
    icon: "users",
    children: [
      { id: "student-list", label: "List" },
      { id: "student-add", label: "Add Student" },
    ],
  },
  {
    id: "hrm",
    label: "HRM",
    roles: ["admin"],
    icon: "briefcase-business",
    children: [
      { id: "employee-details", label: "Employee Details" },
      { id: "employee-add", label: "Add New Employee" },
      { id: "payroll", label: "Payroll" },
      { id: "designation", label: "Designation" },
      { id: "department", label: "Department" },
    ],
  },
  { id: "teachers", label: "Teachers", icon: "graduation-cap" },
  { id: "classes", label: "Classes", icon: "school" },
  { id: "attendance", label: "Attendance", icon: "calendar-check-2" },
  { id: "exams", label: "Exams", icon: "file-check-2" },
  { id: "results", label: "Results", icon: "badge-percent" },
  { id: "fees", label: "Fees", icon: "wallet" },
  { id: "settings", label: "Settings", icon: "settings-2" },
]

export const sectionTitles: Record<
  DashboardSection,
  { title: string; description: string }
> = {
  dashboard: {
    title: "School Dashboard",
    description: "Overview of academics, attendance, and fee performance.",
  },
  students: {
    title: "Students",
    description: "Student enrollment, onboarding, and profile visibility.",
  },
  "student-list": {
    title: "Student List",
    description: "Browse the current roster and review status at a glance.",
  },
  "student-add": {
    title: "Add Student",
    description: "Quick-create a new student profile from the sidebar flow.",
  },
  timetable: {
    title: "Timetable",
    description: "Review today's and weekly class schedule with teacher and subject timing.",
  },
  assignments: {
    title: "Assignments",
    description: "Track homework, submissions, and upcoming coursework deadlines.",
  },
  messages: {
    title: "Messages",
    description: "Read school and teacher conversations without leaving the student workspace.",
  },
  subjects: {
    title: "Subjects",
    description: "See subject ownership, classroom expectations, and course coverage.",
  },
  hrm: {
    title: "HRM",
    description: "Manage employee records, payroll, designations, and departments.",
  },
  "employee-details": {
    title: "Employee Details",
    description: "Review employee records, contact details, and employment status.",
  },
  "employee-add": {
    title: "Add New Employee",
    description: "Create a new employee profile for faculty or operations staff.",
  },
  payroll: {
    title: "Payroll",
    description: "Track salary processing, payouts, and payroll readiness.",
  },
  designation: {
    title: "Designation",
    description: "Maintain job titles, reporting levels, and role assignments.",
  },
  department: {
    title: "Department",
    description: "Organize employees by department and operational ownership.",
  },
  teachers: {
    title: "Teachers",
    description: "Faculty coverage, workload, and classroom allocation.",
  },
  classes: {
    title: "Classes",
    description: "Sections, timetables, and operational class health.",
  },
  attendance: {
    title: "Attendance",
    description: "Monitor daily marking and identify low-attendance patterns.",
  },
  exams: {
    title: "Exams",
    description: "Keep exam scheduling, moderation, and publishing in view.",
  },
  results: {
    title: "Results",
    description: "Review performance distribution and reporting readiness.",
  },
  fees: {
    title: "Fees",
    description: "Track collections, dues, and revenue movement across terms.",
  },
  settings: {
    title: "Settings",
    description: "Manage preferences, permissions, and dashboard behavior.",
  },
}

export const chartContentByRole: Record<
  Role,
  {
    barTitle: string
    barDescription: string
    barData: ChartPoint[]
    pieTitle: string
    pieDescription: string
    pieData: DistributionPoint[]
    recentActivity: RecentActivityRow[]
  }
> = {
  admin: {
    barTitle: "Attendance and performance",
    barDescription: "Compare weekly attendance with academic performance trend.",
    barData: [
      { name: "Mon", value: 94, secondary: 78 },
      { name: "Tue", value: 96, secondary: 82 },
      { name: "Wed", value: 91, secondary: 79 },
      { name: "Thu", value: 98, secondary: 86 },
      { name: "Fri", value: 93, secondary: 81 },
    ],
    pieTitle: "Student distribution",
    pieDescription: "Enrollment mix by school division.",
    pieData: [
      { name: "Primary", value: 420, color: "#0f766e" },
      { name: "Middle", value: 360, color: "#1d4ed8" },
      { name: "Secondary", value: 468, color: "#f59e0b" },
    ],
    recentActivity: [
      { id: "r1", student: "Mariam Hassan", className: "Grade 9A", status: "Present", date: "Apr 21" },
      { id: "r2", student: "Omar Khaled", className: "Grade 7A", status: "Paid", date: "Apr 21" },
      { id: "r3", student: "Youssef Ali", className: "Grade 8B", status: "Review", date: "Apr 20" },
      { id: "r4", student: "Sara Ibrahim", className: "Grade 10C", status: "Excellent", date: "Apr 20" },
    ],
  },
  teacher: {
    barTitle: "Classroom performance",
    barDescription: "Track lesson completion against average quiz score.",
    barData: [
      { name: "9A", value: 88, secondary: 74 },
      { name: "9B", value: 84, secondary: 71 },
      { name: "10A", value: 92, secondary: 79 },
      { name: "10C", value: 76, secondary: 58 },
      { name: "11B", value: 89, secondary: 81 },
    ],
    pieTitle: "Student distribution",
    pieDescription: "Assigned students by section.",
    pieData: [
      { name: "Grade 9", value: 62, color: "#0f766e" },
      { name: "Grade 10", value: 58, color: "#1d4ed8" },
      { name: "Grade 11", value: 41, color: "#f59e0b" },
    ],
    recentActivity: [
      { id: "r1", student: "Rayan Saif", className: "Grade 9A", status: "Present", date: "Apr 21" },
      { id: "r2", student: "Lina Adil", className: "Grade 10C", status: "Review", date: "Apr 21" },
      { id: "r3", student: "Huda Salem", className: "Grade 11B", status: "Excellent", date: "Apr 20" },
      { id: "r4", student: "Tariq Noor", className: "Grade 9B", status: "Absent", date: "Apr 20" },
    ],
  },
  student: {
    barTitle: "Weekly learning progress",
    barDescription: "Study completion compared with assignment performance.",
    barData: [
      { name: "Math", value: 92, secondary: 84 },
      { name: "English", value: 87, secondary: 89 },
      { name: "Science", value: 79, secondary: 73 },
      { name: "Arabic", value: 90, secondary: 86 },
      { name: "ICT", value: 95, secondary: 92 },
    ],
    pieTitle: "Student distribution",
    pieDescription: "Weekly effort by learning area.",
    pieData: [
      { name: "Assignments", value: 38, color: "#0f766e" },
      { name: "Revision", value: 27, color: "#1d4ed8" },
      { name: "Projects", value: 20, color: "#f59e0b" },
      { name: "Reading", value: 15, color: "#8b5cf6" },
    ],
    recentActivity: [
      { id: "r1", student: "Mariam Hassan", className: "Grade 9A", status: "Excellent", date: "Apr 21" },
      { id: "r2", student: "Mariam Hassan", className: "Grade 9A", status: "Present", date: "Apr 21" },
      { id: "r3", student: "Mariam Hassan", className: "Grade 9A", status: "Pending", date: "Apr 20" },
      { id: "r4", student: "Mariam Hassan", className: "Grade 9A", status: "Review", date: "Apr 20" },
    ],
  },
  parent: {
    barTitle: "Family dashboard insights",
    barDescription: "Attendance health against recent academic momentum.",
    barData: [
      { name: "Mariam", value: 97, secondary: 88 },
      { name: "Omar", value: 95, secondary: 81 },
      { name: "Week 1", value: 96, secondary: 83 },
      { name: "Week 2", value: 94, secondary: 84 },
      { name: "Week 3", value: 98, secondary: 89 },
    ],
    pieTitle: "Student distribution",
    pieDescription: "Children by current status area.",
    pieData: [
      { name: "Attendance", value: 42, color: "#0f766e" },
      { name: "Academics", value: 33, color: "#1d4ed8" },
      { name: "Fees", value: 15, color: "#f59e0b" },
      { name: "Messages", value: 10, color: "#8b5cf6" },
    ],
    recentActivity: [
      { id: "r1", student: "Mariam Hassan", className: "Grade 9A", status: "Present", date: "Apr 21" },
      { id: "r2", student: "Omar Khaled", className: "Grade 7A", status: "Pending", date: "Apr 21" },
      { id: "r3", student: "Mariam Hassan", className: "Grade 9A", status: "Excellent", date: "Apr 20" },
      { id: "r4", student: "Omar Khaled", className: "Grade 7A", status: "Paid", date: "Apr 20" },
    ],
  },
  accountant: {
    barTitle: "Collections overview",
    barDescription: "Collected fees against due invoices by week.",
    barData: [
      { name: "Week 1", value: 62, secondary: 74 },
      { name: "Week 2", value: 78, secondary: 69 },
      { name: "Week 3", value: 84, secondary: 66 },
      { name: "Week 4", value: 71, secondary: 58 },
      { name: "Week 5", value: 89, secondary: 61 },
    ],
    pieTitle: "Student distribution",
    pieDescription: "Accounts by payment state.",
    pieData: [
      { name: "Paid", value: 58, color: "#0f766e" },
      { name: "Installment", value: 23, color: "#1d4ed8" },
      { name: "Pending", value: 11, color: "#f59e0b" },
      { name: "Overdue", value: 8, color: "#ef4444" },
    ],
    recentActivity: [
      { id: "r1", student: "Hassan Family", className: "Invoice INV-2038", status: "Pending", date: "Apr 21" },
      { id: "r2", student: "Ali Family", className: "Invoice INV-2019", status: "Review", date: "Apr 21" },
      { id: "r3", student: "Khaled Family", className: "Invoice INV-2055", status: "Paid", date: "Apr 20" },
      { id: "r4", student: "Ibrahim Family", className: "Invoice INV-2051", status: "Paid", date: "Apr 20" },
    ],
  },
}

export const calendarEventsByRole: Record<Role, CalendarEventSeed[]> = {
  admin: [
    {
      id: "admin-staff-meeting",
      title: "Staff Meeting",
      start: "2026-04-26",
      color: "#2563eb",
    },
    {
      id: "admin-math-exam",
      title: "Math Exam",
      start: "2026-04-28",
      color: "#16a34a",
    },
    {
      id: "admin-parent-council",
      title: "Parent Council",
      start: "2026-05-03",
      color: "#f59e0b",
    },
  ],
  teacher: [
    {
      id: "teacher-lab-prep",
      title: "Lab Preparation",
      start: "2026-04-27",
      color: "#0f766e",
    },
    {
      id: "teacher-physics-quiz",
      title: "Physics Quiz",
      start: "2026-04-28",
      color: "#2563eb",
    },
    {
      id: "teacher-parent-call",
      title: "Parent Call Window",
      start: "2026-04-29",
      color: "#7c3aed",
    },
  ],
  student: [
    {
      id: "student-chemistry-report",
      title: "Chemistry Lab Report",
      start: "2026-04-27",
      color: "#0f766e",
    },
    {
      id: "student-math-revision",
      title: "Math Revision Session",
      start: "2026-04-29",
      color: "#2563eb",
    },
    {
      id: "student-sports-day",
      title: "Sports Day",
      start: "2026-05-01",
      color: "#f59e0b",
    },
  ],
  parent: [
    {
      id: "parent-fee-reminder",
      title: "Fee Reminder",
      start: "2026-04-26",
      color: "#dc2626",
    },
    {
      id: "parent-science-exam",
      title: "Science Exam",
      start: "2026-04-30",
      color: "#2563eb",
    },
    {
      id: "parent-transport-update",
      title: "Transport Update",
      start: "2026-05-02",
      color: "#16a34a",
    },
  ],
  accountant: [
    {
      id: "accountant-invoice-review",
      title: "Invoice Review",
      start: "2026-04-26",
      color: "#2563eb",
    },
    {
      id: "accountant-payroll-cutoff",
      title: "Payroll Cutoff",
      start: "2026-04-28",
      color: "#0f766e",
    },
    {
      id: "accountant-settlement-day",
      title: "Settlement Day",
      start: "2026-05-04",
      color: "#f59e0b",
    },
  ],
}
