"use client"

import { useDeferredValue, useMemo, useState } from "react"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { CellValue, TableColumn, TableRow as DataRow } from "@/lib/sms-data"
import { cn } from "@/lib/utils"
import { StatusBadge } from "@/components/sms/status-badge"

function stringifyCellValue(value: CellValue) {
  if (typeof value === "string" || typeof value === "number") {
    return String(value)
  }

  return [value.label, value.helper].filter(Boolean).join(" ")
}

function renderCellValue(value: CellValue) {
  if (typeof value === "string" || typeof value === "number") {
    return value
  }

  return <StatusBadge label={value.label} tone={value.tone} />
}

export function DataTable({
  title,
  columns,
  rows,
  searchPlaceholder,
  className,
}: {
  title: string
  columns: TableColumn[]
  rows: DataRow[]
  searchPlaceholder: string
  className?: string
}) {
  const [query, setQuery] = useState("")
  const deferredQuery = useDeferredValue(query)

  const filteredRows = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase()

    if (!normalizedQuery) {
      return rows
    }

    return rows.filter((row) =>
      columns.some((column) =>
        stringifyCellValue(row[column.key] ?? "").toLowerCase().includes(normalizedQuery)
      )
    )
  }, [columns, deferredQuery, rows])

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-950">{title}</h3>
          <p className="text-sm text-slate-500">
            {filteredRows.length} of {rows.length} records visible
          </p>
        </div>
        <div className="relative w-full md:max-w-xs">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            className="border-slate-200 bg-white pl-9"
          />
        </div>
      </div>

      <Table className="min-w-full">
        <TableCaption className="sr-only">{title}</TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={cn(column.align === "right" && "text-right")}
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell
                  key={`${row.id}-${column.key}`}
                  className={cn(column.align === "right" && "text-right")}
                >
                  {renderCellValue(row[column.key] ?? "")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
