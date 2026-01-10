"use client"

import type React from "react"
import { useState } from "react"
import { ConversationSidebar } from "@/components/dashboard/conversation-sidebar"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <ConversationSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onCollapseChange={setSidebarCollapsed}
      />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className={sidebarCollapsed ? "lg:pl-16" : "lg:pl-64"}>
        {/* Mobile Header */}
        <header className="h-14 border-b border-border flex items-center justify-between px-4 lg:hidden sticky top-0 bg-background/95 backdrop-blur z-30">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <span className="font-semibold text-primary">TaNote</span>
          <div className="w-10" />
        </header>

        <main className="min-h-[calc(100vh-3.5rem)] lg:min-h-screen">{children}</main>
      </div>
    </div>
  )
}
