import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const students = [
  { name: "Sara Hassan", className: "Grade 9A", attendance: "97%", status: "Excellent" },
  { name: "Khaled Noor", className: "Grade 9B", attendance: "92%", status: "Steady" },
  { name: "Mina Adel", className: "Grade 10C", attendance: "88%", status: "Needs follow-up" },
  { name: "Layan Omar", className: "Grade 11B", attendance: "95%", status: "Excellent" },
]

export default function TeacherStudentsPage() {
  return (
    <Card className="border border-white/80 bg-white/90 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
      <CardHeader>
        <CardTitle>Student list</CardTitle>
        <CardDescription>Quick view of your assigned students and classroom readiness.</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Student</th>
              <th className="px-4 py-3 font-medium">Class</th>
              <th className="px-4 py-3 font-medium">Attendance</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.name} className="border-b border-slate-100 last:border-b-0">
                <td className="px-4 py-4 font-medium text-slate-950">{student.name}</td>
                <td className="px-4 py-4 text-slate-600">{student.className}</td>
                <td className="px-4 py-4 text-slate-600">{student.attendance}</td>
                <td className="px-4 py-4 text-slate-600">{student.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
