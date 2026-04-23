import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { RecentActivityRow } from "@/lib/dashboard-data"
import { StatusBadge } from "@/components/sms/status-badge"

function statusTone(status: RecentActivityRow["status"]) {
  switch (status) {
    case "Present":
    case "Paid":
    case "Excellent":
      return "success" as const
    case "Pending":
      return "warning" as const
    case "Review":
      return "info" as const
    case "Absent":
      return "danger" as const
  }
}

export function RecentActivity({
  rows,
  title,
  description,
}: {
  rows: RecentActivityRow[]
  title: string
  description: string
}) {
  return (
    <Card className="border border-white/80 bg-white/85 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.5)]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student name</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium text-slate-950">{row.student}</TableCell>
                <TableCell>{row.className}</TableCell>
                <TableCell>
                  <StatusBadge label={row.status} tone={statusTone(row.status)} />
                </TableCell>
                <TableCell className="text-right text-slate-500">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
