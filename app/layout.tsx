import type { Metadata } from "next"

import "./globals.css"

export const metadata: Metadata = {
  title: "Northfield Academy SMS",
  description:
    "Role-based school management frontend for admins, teachers, students, parents, and finance teams.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full font-sans">{children}</body>
    </html>
  )
}
