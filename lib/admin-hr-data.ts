export type Employee = {
  id: string
  name: string
  department: string
  designation: string
  phone: string
  status: "Active" | "Inactive" | "On Leave"
}

export type EmployeeDetailProfile = Employee & {
  email: string
  subject: string
  personalInfo: Array<{ label: string; value: string }>
  profileDetail: Array<{ label: string; value: string }>
  previousSchoolDetails: Array<{ label: string; value: string }>
  addressDetails: Array<{ label: string; value: string }>
  bankDetails: Array<{ label: string; value: string }>
  medicalDetails: Array<{ label: string; value: string }>
  documents: string[]
  attendanceSummary: Array<{ label: string; value: string }>
  leaveSummary: Array<{ label: string; value: string }>
  payrollSummary: Array<{ label: string; value: string }>
}

export type PayrollRow = {
  name: string
  salary: number
  allowance: number
  deduction: number
}

export const employeeProfiles: EmployeeDetailProfile[] = [
  {
    id: "AD1256589",
    name: "Marvin McKinney",
    department: "Science",
    designation: "Teacher",
    phone: "789678456",
    status: "Active",
    email: "set@example.com",
    subject: "Mathematics",
    personalInfo: [
      { label: "Class", value: "Class 6 (2025-26)" },
      { label: "Contract Type", value: "Permanent" },
      { label: "Shift", value: "Morning" },
      { label: "Work Location", value: "2nd Floor" },
      { label: "Date Of Birth", value: "10 Nov 2006" },
      { label: "Gender", value: "Male" },
      { label: "Join Date", value: "05 May 2012" },
      { label: "Phone Number", value: "789678456" },
      { label: "Email", value: "set@example.com" },
    ],
    profileDetail: [
      { label: "Date of Birth", value: "10 Nov 1995" },
      { label: "Marital Status", value: "Married" },
      { label: "Qualification", value: "MBA" },
      { label: "Experience", value: "7 Years" },
      { label: "Father Name", value: "Ralph Edwards" },
      { label: "Mother Name", value: "Floyd Miles" },
    ],
    previousSchoolDetails: [
      { label: "Previous School Name", value: "Stuyvesant High School" },
      { label: "Current School Name", value: "Bronx High School of Science" },
    ],
    addressDetails: [
      {
        label: "Current Address",
        value: "8502 Preston Rd. Inglewood, Maine 98380",
      },
      {
        label: "Permanent Address",
        value: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
      },
    ],
    bankDetails: [
      { label: "Bank Name", value: "Bank of America" },
      { label: "Branch", value: "New York" },
      { label: "IFSC Code", value: "5283209832" },
    ],
    medicalDetails: [
      { label: "Blood Group", value: "O+" },
      { label: "Height", value: "5.2" },
      { label: "Weight", value: "60kg" },
    ],
    documents: ["BirthCertificate.pdf"],
    attendanceSummary: [
      { label: "Present Days", value: "182" },
      { label: "Late Marks", value: "4" },
      { label: "Attendance Rate", value: "96%" },
    ],
    leaveSummary: [
      { label: "Annual Leave", value: "12 days left" },
      { label: "Medical Leave", value: "3 used" },
      { label: "Pending Requests", value: "1 request" },
    ],
    payrollSummary: [
      { label: "Basic Salary", value: "NGN 180,000" },
      { label: "Allowance", value: "NGN 20,000" },
      { label: "Deduction", value: "NGN 5,000" },
      { label: "Net Salary", value: "NGN 195,000" },
    ],
  },
  {
    id: "EMP002",
    name: "Amina Yusuf",
    department: "Administration",
    designation: "Accountant",
    phone: "08098765432",
    status: "Active",
    email: "amina@example.com",
    subject: "Finance",
    personalInfo: [
      { label: "Class", value: "Finance Office" },
      { label: "Contract Type", value: "Permanent" },
      { label: "Shift", value: "Morning" },
      { label: "Work Location", value: "Admin Block" },
      { label: "Date Of Birth", value: "18 Mar 1992" },
      { label: "Gender", value: "Female" },
      { label: "Join Date", value: "11 Jan 2018" },
      { label: "Phone Number", value: "08098765432" },
      { label: "Email", value: "amina@example.com" },
    ],
    profileDetail: [
      { label: "Date of Birth", value: "18 Mar 1992" },
      { label: "Marital Status", value: "Single" },
      { label: "Qualification", value: "BSc Accounting" },
      { label: "Experience", value: "5 Years" },
      { label: "Father Name", value: "David Yusuf" },
      { label: "Mother Name", value: "Martha Yusuf" },
    ],
    previousSchoolDetails: [
      { label: "Previous School Name", value: "Lagos Model College" },
      { label: "Current School Name", value: "Northfield Academy" },
    ],
    addressDetails: [
      { label: "Current Address", value: "14 Allen Avenue, Ikeja, Lagos" },
      { label: "Permanent Address", value: "22 Palm Street, Ibadan, Oyo" },
    ],
    bankDetails: [
      { label: "Bank Name", value: "Zenith Bank" },
      { label: "Branch", value: "Ikeja" },
      { label: "IFSC Code", value: "3328102211" },
    ],
    medicalDetails: [
      { label: "Blood Group", value: "A+" },
      { label: "Height", value: "5.5" },
      { label: "Weight", value: "64kg" },
    ],
    documents: ["AppointmentLetter.pdf"],
    attendanceSummary: [
      { label: "Present Days", value: "188" },
      { label: "Late Marks", value: "2" },
      { label: "Attendance Rate", value: "98%" },
    ],
    leaveSummary: [
      { label: "Annual Leave", value: "15 days left" },
      { label: "Medical Leave", value: "1 used" },
      { label: "Pending Requests", value: "No request" },
    ],
    payrollSummary: [
      { label: "Basic Salary", value: "NGN 220,000" },
      { label: "Allowance", value: "NGN 18,000" },
      { label: "Deduction", value: "NGN 8,000" },
      { label: "Net Salary", value: "NGN 230,000" },
    ],
  },
]

export const employees: Employee[] = employeeProfiles.map(
  ({ id, name, department, designation, phone, status }) => ({
    id,
    name,
    department,
    designation,
    phone,
    status,
  })
)

export const departmentOptions = ["Science", "Administration", "Arts", "ICT"]

export const designationOptions = [
  "Teacher",
  "Principal",
  "Accountant",
  "HR Officer",
]

export const payrollRows: PayrollRow[] = [
  {
    name: "Marvin McKinney",
    salary: 180000,
    allowance: 20000,
    deduction: 5000,
  },
  {
    name: "Amina Yusuf",
    salary: 220000,
    allowance: 18000,
    deduction: 8000,
  },
]
