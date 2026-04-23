export type Role = "admin" | "teacher" | "student" | "parent" | "accountant"

export type Tone = "default" | "info" | "success" | "warning" | "danger"

export type CellValue =
  | string
  | number
  | {
      label: string
      tone?: Tone
      helper?: string
    }

export type TableColumn = {
  key: string
  label: string
  align?: "left" | "right"
}

export type TableRow = {
  id: string
  [key: string]: CellValue
}

export type Metric = {
  label: string
  value: string
  delta: string
  note: string
}

export type AlertItem = {
  title: string
  detail: string
  tone: Tone
}

export type QuickAction = {
  label: string
  detail: string
}

export type SidebarItem = {
  label: string
  icon:
    | "layout-dashboard"
    | "users"
    | "graduation-cap"
    | "calendar-check-2"
    | "book-open-text"
    | "clipboard-list"
    | "wallet"
    | "messages-square"
    | "bus-front"
    | "library"
    | "settings-2"
}

export type RoleConfig = {
  label: string
  title: string
  summary: string
  emphasis: string
  userName: string
  userTitle: string
  searchPlaceholder: string
  notificationCount: number
  activity: string[]
  metrics: Metric[]
  alerts: AlertItem[]
  quickActions: QuickAction[]
  nav: SidebarItem[]
}

export type ProfileSection = {
  key: string
  label: string
  items: Array<{
    label: string
    value: string
  }>
}

export type TimelineBar = {
  label: string
  value: number
}

export type FormField = {
  id: string
  label: string
  type: "text" | "email" | "date" | "select" | "textarea"
  placeholder: string
  helper: string
}

export const roles: Array<{ value: Role; label: string }> = [
  { value: "admin", label: "Admin" },
  { value: "teacher", label: "Teacher" },
  { value: "student", label: "Student" },
  { value: "parent", label: "Parent" },
  { value: "accountant", label: "Accountant" },
]

export function isRole(value: string): value is Role {
  return roles.some((role) => role.value === value)
}

export const roleConfigs: Record<Role, RoleConfig> = {
  admin: {
    label: "Admin",
    title: "School operations command center",
    summary:
      "Track enrollment, attendance, exams, revenue, and urgent exceptions from one calm workspace.",
    emphasis: "Campus pulse is healthy, but fees and grade publishing need attention this week.",
    userName: "Nadia Hamza",
    userTitle: "Operational admin",
    searchPlaceholder: "Search students, invoices, messages...",
    notificationCount: 5,
    activity: [
      "Admissions team shortlisted 5 new applicants this morning.",
      "Midterm publishing moved 3 classes into final review.",
      "Transport timing change was approved for Route 4.",
      "Fee reminder batch sent to 18 families.",
    ],
    metrics: [
      { label: "Students", value: "1,248", delta: "+4.8%", note: "24 new admissions this month" },
      { label: "Teachers", value: "86", delta: "+2", note: "3 vacancies still open" },
      { label: "Attendance", value: "96.8%", delta: "+1.1%", note: "Compared with last week" },
      { label: "Revenue", value: "$214K", delta: "+9.4%", note: "Collected this term" },
    ],
    alerts: [
      {
        title: "18 fee invoices are overdue",
        detail: "Most are from Grade 10 and need follow-up before Monday.",
        tone: "warning",
      },
      {
        title: "Science lab timetable conflict detected",
        detail: "Two sections are assigned to Lab B at 10:30 AM.",
        tone: "danger",
      },
      {
        title: "Attendance dips in Grade 8B",
        detail: "Seven students fell below the 90% threshold this month.",
        tone: "info",
      },
    ],
    quickActions: [
      { label: "Approve admissions", detail: "Review 12 pending applications" },
      { label: "Publish results", detail: "Midterm results ready for release" },
      { label: "Broadcast notice", detail: "Send assembly reminder to all parents" },
    ],
    nav: [
      { label: "Dashboard", icon: "layout-dashboard" },
      { label: "Students", icon: "users" },
      { label: "Attendance", icon: "calendar-check-2" },
      { label: "Academics", icon: "book-open-text" },
      { label: "Exams", icon: "clipboard-list" },
      { label: "Finance", icon: "wallet" },
      { label: "Messages", icon: "messages-square" },
      { label: "Settings", icon: "settings-2" },
    ],
  },
  teacher: {
    label: "Teacher",
    title: "Daily teaching workspace",
    summary:
      "Stay on top of classes, attendance, lesson planning, grading, and parent communication without jumping screens.",
    emphasis: "Your Grade 9 classes are on schedule, with one quiz still awaiting review.",
    userName: "Noor Rahman",
    userTitle: "Physics teacher",
    searchPlaceholder: "Search students, classes, assignments...",
    notificationCount: 7,
    activity: [
      "Grade 9A attendance was submitted 10 minutes ago.",
      "Physics worksheet received 6 new submissions since lunch.",
      "Parent meeting request from Sara Hassan is awaiting reply.",
      "Lab inventory was confirmed for tomorrow's practical session.",
    ],
    metrics: [
      { label: "Today's classes", value: "5", delta: "2 next", note: "Next class starts at 10:15 AM" },
      { label: "Pending grading", value: "34", delta: "-11", note: "Since yesterday evening" },
      { label: "Marked attendance", value: "92%", delta: "+8%", note: "Across assigned sections" },
      { label: "Parent messages", value: "7", delta: "+3", note: "Unread this morning" },
    ],
    alerts: [
      {
        title: "Grade 9A quiz needs moderation",
        detail: "Average score is 54%; flagging for review before publishing.",
        tone: "warning",
      },
      {
        title: "Two assignment deadlines are today",
        detail: "Physics worksheet and literature response close at 11:59 PM.",
        tone: "info",
      },
      {
        title: "Parent meeting request received",
        detail: "Sara Hassan's parent requested a call about attendance.",
        tone: "default",
      },
    ],
    quickActions: [
      { label: "Mark attendance", detail: "Use the quick roster for current class" },
      { label: "Create assignment", detail: "Post a new task with attachments" },
      { label: "Open lesson planner", detail: "Review this week's curriculum coverage" },
    ],
    nav: [
      { label: "Dashboard", icon: "layout-dashboard" },
      { label: "My Students", icon: "users" },
      { label: "Attendance", icon: "calendar-check-2" },
      { label: "Lessons", icon: "book-open-text" },
      { label: "Assignments", icon: "clipboard-list" },
      { label: "Messages", icon: "messages-square" },
      { label: "Settings", icon: "settings-2" },
    ],
  },
  student: {
    label: "Student",
    title: "Your academic hub",
    summary:
      "Keep your timetable, assignments, grades, announcements, and exam readiness in one clear place.",
    emphasis: "You are on track academically and have two assignments due in the next three days.",
    userName: "Mariam Hassan",
    userTitle: "Grade 9A student",
    searchPlaceholder: "Search classes, assignments, results...",
    notificationCount: 3,
    activity: [
      "English oral feedback was published this morning.",
      "Chemistry lab report reminder sent for Friday.",
      "Library renewal window opens after class today.",
      "Sports day schedule was added to announcements.",
    ],
    metrics: [
      { label: "Upcoming classes", value: "4", delta: "1 in 40m", note: "Mathematics is next" },
      { label: "Assignments due", value: "2", delta: "-1", note: "One submitted this morning" },
      { label: "Attendance", value: "97.6%", delta: "+0.4%", note: "Above the school target" },
      { label: "Current GPA", value: "3.82", delta: "+0.12", note: "Projected after midterms" },
    ],
    alerts: [
      {
        title: "Chemistry lab report due Friday",
        detail: "Upload PDF or DOC before 4:00 PM.",
        tone: "warning",
      },
      {
        title: "English oral marks published",
        detail: "View feedback from your teacher in Results.",
        tone: "success",
      },
      {
        title: "Sports day schedule posted",
        detail: "Check announcements for house timings and venues.",
        tone: "info",
      },
    ],
    quickActions: [
      { label: "View timetable", detail: "Today's full schedule and rooms" },
      { label: "Open results", detail: "Latest grades and report card preview" },
      { label: "Submit work", detail: "Upload your pending assignment files" },
    ],
    nav: [
      { label: "Dashboard", icon: "layout-dashboard" },
      { label: "Classes", icon: "graduation-cap" },
      { label: "Attendance", icon: "calendar-check-2" },
      { label: "Assignments", icon: "clipboard-list" },
      { label: "Results", icon: "book-open-text" },
      { label: "Messages", icon: "messages-square" },
      { label: "Settings", icon: "settings-2" },
    ],
  },
  parent: {
    label: "Parent",
    title: "Family overview workspace",
    summary:
      "Follow your child's attendance, grades, fees, timetable, and teacher updates without waiting for a report cycle.",
    emphasis: "Attendance is strong overall, though one invoice and a science exam update need attention.",
    userName: "Amina Hassan",
    userTitle: "Parent account",
    searchPlaceholder: "Search children, invoices, teacher updates...",
    notificationCount: 4,
    activity: [
      "Physics teacher shared new feedback for Mariam Hassan.",
      "Quarterly invoice reminder was delivered by email and SMS.",
      "Route 4 pickup timing update was posted for Monday.",
      "Science exam venue notice was added to family messages.",
    ],
    metrics: [
      { label: "Children linked", value: "2", delta: "1 primary", note: "Mariam and Omar" },
      { label: "Attendance health", value: "95.9%", delta: "-0.8%", note: "Across linked students" },
      { label: "Open invoices", value: "$1,420", delta: "$320 due", note: "Next payment due April 22" },
      { label: "Unread updates", value: "5", delta: "+2", note: "Teacher and school messages" },
    ],
    alerts: [
      {
        title: "Transport route updated",
        detail: "Morning pickup moved 10 minutes earlier for Route 4.",
        tone: "info",
      },
      {
        title: "Quarterly fee installment due soon",
        detail: "Pay before April 22 to avoid late charges.",
        tone: "warning",
      },
      {
        title: "Science exam venue changed",
        detail: "Room now updated to Lab A for Grade 9A.",
        tone: "default",
      },
    ],
    quickActions: [
      { label: "Pay fees", detail: "Settle outstanding invoices securely" },
      { label: "Message teacher", detail: "Ask a follow-up about recent marks" },
      { label: "Review report card", detail: "Open progress summary for both children" },
    ],
    nav: [
      { label: "Dashboard", icon: "layout-dashboard" },
      { label: "Children", icon: "users" },
      { label: "Attendance", icon: "calendar-check-2" },
      { label: "Fees", icon: "wallet" },
      { label: "Messages", icon: "messages-square" },
      { label: "Transport", icon: "bus-front" },
      { label: "Settings", icon: "settings-2" },
    ],
  },
  accountant: {
    label: "Accountant",
    title: "Finance and collections desk",
    summary:
      "Oversee billing, receipts, revenue targets, payroll signals, and overdue follow-ups in a single financial cockpit.",
    emphasis: "Collections are strong this month, but scholarship adjustments and three large balances remain open.",
    userName: "Yousef Karim",
    userTitle: "Finance office",
    searchPlaceholder: "Search invoices, balances, receipts...",
    notificationCount: 6,
    activity: [
      "Gateway settlement completed and reconciled this morning.",
      "Three overdue high-balance accounts were escalated for review.",
      "Scholarship validation batch moved into finance approval.",
      "Payroll draft update was shared with the operations office.",
    ],
    metrics: [
      { label: "Collected this month", value: "$143K", delta: "+12.7%", note: "Against monthly target" },
      { label: "Outstanding balance", value: "$38.6K", delta: "-6.1%", note: "Across 42 families" },
      { label: "Receipts issued", value: "312", delta: "+29", note: "Since last Friday" },
      { label: "Payroll ready", value: "84%", delta: "2 drafts", note: "Staff adjustments pending approval" },
    ],
    alerts: [
      {
        title: "Three invoices exceed $2,000",
        detail: "Priority follow-up required before term close.",
        tone: "danger",
      },
      {
        title: "Scholarship batch awaiting validation",
        detail: "Nine student discounts need finance approval.",
        tone: "warning",
      },
      {
        title: "Online gateway settlement complete",
        detail: "Yesterday's transactions have been reconciled.",
        tone: "success",
      },
    ],
    quickActions: [
      { label: "Generate invoices", detail: "Create term billing for Grade 7 and 8" },
      { label: "Review receipts", detail: "Audit high-value transactions" },
      { label: "Open financial dashboard", detail: "Inspect cash flow and aging buckets" },
    ],
    nav: [
      { label: "Dashboard", icon: "layout-dashboard" },
      { label: "Invoices", icon: "wallet" },
      { label: "Collections", icon: "clipboard-list" },
      { label: "Messages", icon: "messages-square" },
      { label: "Library", icon: "library" },
      { label: "Settings", icon: "settings-2" },
    ],
  },
}

export const overviewBars: TimelineBar[] = [
  { label: "Mon", value: 82 },
  { label: "Tue", value: 94 },
  { label: "Wed", value: 77 },
  { label: "Thu", value: 96 },
  { label: "Fri", value: 88 },
]

export const revenueBars: TimelineBar[] = [
  { label: "Week 1", value: 54 },
  { label: "Week 2", value: 71 },
  { label: "Week 3", value: 86 },
  { label: "Week 4", value: 68 },
]

export const studentColumns: TableColumn[] = [
  { key: "student", label: "Student" },
  { key: "class", label: "Class" },
  { key: "attendance", label: "Attendance" },
  { key: "fees", label: "Fees" },
  { key: "performance", label: "Performance" },
]

export const studentRows: TableRow[] = [
  {
    id: "st-01",
    student: "Mariam Hassan",
    class: "Grade 9A",
    attendance: "98.4%",
    fees: { label: "Paid", tone: "success" },
    performance: { label: "Above target", tone: "info" },
  },
  {
    id: "st-02",
    student: "Youssef Ali",
    class: "Grade 8B",
    attendance: "88.2%",
    fees: { label: "Overdue", tone: "warning" },
    performance: { label: "Needs support", tone: "warning" },
  },
  {
    id: "st-03",
    student: "Sara Ibrahim",
    class: "Grade 10C",
    attendance: "95.7%",
    fees: { label: "Scholarship", tone: "default" },
    performance: { label: "Excellent", tone: "success" },
  },
  {
    id: "st-04",
    student: "Omar Khaled",
    class: "Grade 7A",
    attendance: "97.9%",
    fees: { label: "Partial", tone: "info" },
    performance: { label: "Steady", tone: "default" },
  },
]

export const attendanceColumns: TableColumn[] = [
  { key: "class", label: "Class" },
  { key: "teacher", label: "Teacher" },
  { key: "present", label: "Present", align: "right" },
  { key: "absent", label: "Absent", align: "right" },
  { key: "status", label: "Status" },
]

export const attendanceRows: TableRow[] = [
  {
    id: "at-01",
    class: "Grade 9A",
    teacher: "Noor Rahman",
    present: 29,
    absent: 2,
    status: { label: "Marked", tone: "success" },
  },
  {
    id: "at-02",
    class: "Grade 8B",
    teacher: "Hadi Salim",
    present: 24,
    absent: 5,
    status: { label: "Low attendance", tone: "warning" },
  },
  {
    id: "at-03",
    class: "Grade 10C",
    teacher: "Rana Issa",
    present: 31,
    absent: 0,
    status: { label: "Perfect", tone: "success" },
  },
  {
    id: "at-04",
    class: "Grade 7A",
    teacher: "Lina Saad",
    present: 27,
    absent: 1,
    status: { label: "Pending note", tone: "info" },
  },
]

export const examColumns: TableColumn[] = [
  { key: "exam", label: "Exam" },
  { key: "class", label: "Class" },
  { key: "date", label: "Date" },
  { key: "result", label: "Result status" },
  { key: "average", label: "Average", align: "right" },
]

export const examRows: TableRow[] = [
  {
    id: "ex-01",
    exam: "Mathematics Midterm",
    class: "Grade 9A",
    date: "Apr 20",
    result: { label: "Ready to publish", tone: "success" },
    average: "82%",
  },
  {
    id: "ex-02",
    exam: "Physics Quiz 3",
    class: "Grade 10C",
    date: "Apr 21",
    result: { label: "Under review", tone: "warning" },
    average: "54%",
  },
  {
    id: "ex-03",
    exam: "English Oral",
    class: "Grade 8B",
    date: "Apr 24",
    result: { label: "Scheduled", tone: "info" },
    average: "TBD",
  },
]

export const feeColumns: TableColumn[] = [
  { key: "family", label: "Family" },
  { key: "invoice", label: "Invoice" },
  { key: "due", label: "Due date" },
  { key: "amount", label: "Amount", align: "right" },
  { key: "status", label: "Status" },
]

export const feeRows: TableRow[] = [
  {
    id: "fe-01",
    family: "Hassan Family",
    invoice: "INV-2038",
    due: "Apr 22",
    amount: "$820",
    status: { label: "Due soon", tone: "warning" },
  },
  {
    id: "fe-02",
    family: "Ali Family",
    invoice: "INV-2019",
    due: "Apr 10",
    amount: "$2,160",
    status: { label: "Overdue", tone: "danger" },
  },
  {
    id: "fe-03",
    family: "Ibrahim Family",
    invoice: "INV-2051",
    due: "May 02",
    amount: "$540",
    status: { label: "Paid", tone: "success" },
  },
  {
    id: "fe-04",
    family: "Khaled Family",
    invoice: "INV-2055",
    due: "Apr 30",
    amount: "$600",
    status: { label: "Installment", tone: "info" },
  },
]

export const messageColumns: TableColumn[] = [
  { key: "thread", label: "Thread" },
  { key: "participants", label: "Participants" },
  { key: "updated", label: "Last update" },
  { key: "channel", label: "Channel" },
  { key: "status", label: "Status" },
]

export const messageRows: TableRow[] = [
  {
    id: "msg-01",
    thread: "Attendance follow-up",
    participants: "Teacher + Parent",
    updated: "10 min ago",
    channel: "In-app chat",
    status: { label: "Needs reply", tone: "warning" },
  },
  {
    id: "msg-02",
    thread: "Exam timetable update",
    participants: "Admin + Students",
    updated: "42 min ago",
    channel: "Broadcast",
    status: { label: "Delivered", tone: "success" },
  },
  {
    id: "msg-03",
    thread: "Transport route notice",
    participants: "School + Parents",
    updated: "1 hr ago",
    channel: "SMS + email",
    status: { label: "Scheduled", tone: "info" },
  },
]

export const profileSections: ProfileSection[] = [
  {
    key: "personal",
    label: "Personal Info",
    items: [
      { label: "Student ID", value: "SMS-00984" },
      { label: "Guardian", value: "Amina Hassan" },
      { label: "House", value: "Falcon" },
      { label: "Transport", value: "Route 4" },
    ],
  },
  {
    key: "academic",
    label: "Academic Records",
    items: [
      { label: "Current GPA", value: "3.82 / 4.00" },
      { label: "Homeroom", value: "Grade 9A - Blue" },
      { label: "Advisor", value: "Noor Rahman" },
      { label: "Focus area", value: "Math enrichment" },
    ],
  },
  {
    key: "attendance",
    label: "Attendance",
    items: [
      { label: "Present days", value: "146" },
      { label: "Late arrivals", value: "3" },
      { label: "Absence flags", value: "1 warning" },
      { label: "Last absence", value: "Mar 28" },
    ],
  },
  {
    key: "fees",
    label: "Fees",
    items: [
      { label: "Balance", value: "$320" },
      { label: "Payment plan", value: "Quarterly" },
      { label: "Last receipt", value: "Apr 03" },
      { label: "Scholarship", value: "10% merit" },
    ],
  },
  {
    key: "documents",
    label: "Documents",
    items: [
      { label: "Birth certificate", value: "Verified" },
      { label: "Medical form", value: "Updated Apr 01" },
      { label: "Parent ID", value: "On file" },
      { label: "Transfer letter", value: "Not required" },
    ],
  },
  {
    key: "behavior",
    label: "Behavior Logs",
    items: [
      { label: "Merit points", value: "14" },
      { label: "Pastoral notes", value: "2 positive mentions" },
      { label: "Detentions", value: "0" },
      { label: "Latest note", value: "Peer mentor support" },
    ],
  },
]

export const admissionStages = [
  { label: "Pending", count: "12 applications" },
  { label: "Interview", count: "5 shortlisted" },
  { label: "Approved", count: "9 confirmed" },
  { label: "Enrolled", count: "24 this month" },
]

export const lessonPlanner = [
  { period: "08:00", title: "Homeroom and advisory", detail: "Attendance, notices, pastoral check-in" },
  { period: "09:15", title: "Mathematics - Quadratics", detail: "Guided practice and exit ticket" },
  { period: "10:30", title: "Physics lab prep", detail: "Safety briefing and group setup" },
  { period: "12:15", title: "Parent office hour", detail: "Two scheduled calls" },
]

export const timetable = [
  { day: "Mon", detail: "Math, English, ICT, PE" },
  { day: "Tue", detail: "Science, Arabic, History, Art" },
  { day: "Wed", detail: "Biology lab, Math, Library" },
  { day: "Thu", detail: "Physics, English, House activity" },
  { day: "Fri", detail: "Assembly, Geography, Clubs" },
]

export const formFields: FormField[] = [
  {
    id: "student-name",
    label: "Student name",
    type: "text",
    placeholder: "Enter full legal name",
    helper: "Use the name exactly as it appears on official documents.",
  },
  {
    id: "guardian-email",
    label: "Guardian email",
    type: "email",
    placeholder: "parent@example.com",
    helper: "Primary channel for approvals, receipts, and attendance alerts.",
  },
  {
    id: "date-of-birth",
    label: "Date of birth",
    type: "date",
    placeholder: "YYYY-MM-DD",
    helper: "Used for age validation and grade placement.",
  },
  {
    id: "grade-level",
    label: "Grade level",
    type: "select",
    placeholder: "Select target grade",
    helper: "Drives curriculum, fee structure, and class placement.",
  },
  {
    id: "admission-note",
    label: "Admission note",
    type: "textarea",
    placeholder: "Add a short context note for the admissions team",
    helper: "Optional, but useful for special support needs or transfer cases.",
  },
]

export const activityFeed = [
  "Fee reminder sent to 18 families",
  "Grade 9A attendance marked by Noor Rahman",
  "Midterm results exported to PDF",
  "Parent account auto-created for Omar Khaled",
  "Transport route 4 timing updated",
]

export const teacherAssignments = [
  { title: "Physics worksheet review", detail: "18 submissions still need scores before 2:00 PM." },
  { title: "Grade 9A parent follow-up", detail: "Share attendance update for Sara Hassan." },
  { title: "Lab preparation checklist", detail: "Confirm goggles, kits, and seating groups for period three." },
]

export const studentAssignments = [
  { title: "Chemistry lab report", detail: "Due Friday at 4:00 PM with PDF upload required." },
  { title: "English reading response", detail: "Draft submitted, teacher feedback expected tomorrow." },
  { title: "Mathematics practice set", detail: "8 of 10 problems completed with one retry left." },
]

export const parentChildren = [
  { name: "Mariam Hassan", detail: "Grade 9A · Attendance 97.8% · GPA 3.82" },
  { name: "Omar Khaled", detail: "Grade 7A · Attendance 95.1% · Fees installment active" },
]

export const parentUpdates = [
  { title: "Teacher follow-up queued", detail: "Physics teacher will reply by this evening." },
  { title: "Transport timing adjusted", detail: "Route 4 pickup is now 6:55 AM starting Monday." },
  { title: "Science exam reminder", detail: "Venue changed to Lab A with arrival 20 minutes early." },
]

export const financeChecklist = [
  { title: "High-value balances", detail: "3 accounts above $2,000 need manual review." },
  { title: "Scholarship validation", detail: "9 discounts pending finance verification." },
  { title: "Payroll draft review", detail: "2 staff adjustments still awaiting sign-off." },
]

export const studentHighlights = [
  "Assembly starts at 7:45 AM tomorrow with house registration open from 7:20 AM.",
  "Your English oral feedback was published with a distinction score this morning.",
  "Library renewal closes Friday for two currently borrowed science titles.",
]
