import { ChevronDown } from "lucide-react"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { FormField } from "@/lib/sms-data"

export function FormBuilder({ fields }: { fields: FormField[] }) {
  return (
    <FieldGroup>
      {fields.map((field) => (
        <Field key={field.id}>
          <FieldLabel htmlFor={field.id}>{field.label}</FieldLabel>
          {field.type === "textarea" ? (
            <Textarea id={field.id} placeholder={field.placeholder} className="min-h-24 border-slate-200 bg-white" />
          ) : field.type === "select" ? (
            <div className="flex h-10 items-center justify-between rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-500">
              <span>{field.placeholder}</span>
              <ChevronDown className="size-4 text-slate-400" />
            </div>
          ) : (
            <Input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              className="border-slate-200 bg-white"
            />
          )}
          <FieldDescription>{field.helper}</FieldDescription>
        </Field>
      ))}
    </FieldGroup>
  )
}
