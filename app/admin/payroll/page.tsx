import { payrollRows } from "@/lib/admin-hr-data"

function formatCurrency(amount: number) {
  return amount.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  })
}

export default function PayrollPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Payroll</h1>
          <p className="text-sm text-slate-600">
            Review salary, allowance, deduction, and net pay for staff.
          </p>
        </div>

        <div className="rounded-xl bg-white p-4 shadow">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b text-slate-600">
                <tr>
                  <th className="py-3 pr-4 font-medium">Name</th>
                  <th className="py-3 pr-4 font-medium">Salary</th>
                  <th className="py-3 pr-4 font-medium">Allowance</th>
                  <th className="py-3 pr-4 font-medium">Deduction</th>
                  <th className="py-3 font-medium">Net Pay</th>
                </tr>
              </thead>

              <tbody>
                {payrollRows.map((row) => {
                  const netPay = row.salary + row.allowance - row.deduction

                  return (
                    <tr key={row.name} className="border-t text-slate-700">
                      <td className="py-3 pr-4 font-medium text-slate-900">
                        {row.name}
                      </td>
                      <td className="py-3 pr-4">{formatCurrency(row.salary)}</td>
                      <td className="py-3 pr-4">
                        {formatCurrency(row.allowance)}
                      </td>
                      <td className="py-3 pr-4">
                        {formatCurrency(row.deduction)}
                      </td>
                      <td className="py-3 font-semibold text-slate-900">
                        {formatCurrency(netPay)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
