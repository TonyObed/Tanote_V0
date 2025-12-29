import type React from "react"
import { ParentSidebar } from "@/components/parent/parent-sidebar"
import { ParentMobileNav } from "@/components/parent/parent-mobile-nav"
import { Header } from "@/components/dashboard/header"
import { HeaderNav } from "@/components/home/header"

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <HeaderNav />

      {/* Desktop Sidebar - adjusted for navbar */}
      <div className="hidden lg:block pt-16">
        <ParentSidebar />
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 pt-16">
        <Header userName="M. Koné" userClass="Parent" />
        <main className="p-4 lg:p-6 pb-20 lg:pb-6">{children}</main>
      </div>

      {/* Mobile Navigation */}
      <ParentMobileNav />
    </div>
  )
}
