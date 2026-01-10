import type React from "react"
import { ParentSidebar } from "@/components/parent/parent-sidebar"

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <ParentSidebar />

      {/* Main Content */}
      <div className="pl-64">{children}</div>
    </div>
  )
}
