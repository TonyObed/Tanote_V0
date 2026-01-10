"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, MessageSquare, Calendar, Wallet, Bell, GraduationCap, MoreHorizontal } from "lucide-react"
import { TaNoteLogo } from "@/components/tanote-logo"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const navItems = [
  { label: "Tableau de bord", href: "/parent", icon: LayoutDashboard },
  { label: "Messages", href: "/parent/messages", icon: MessageSquare },
  { label: "Calendrier", href: "/parent/calendar", icon: Calendar },
  { label: "Finances", href: "/parent/finances", icon: Wallet },
  { label: "Notifications", href: "/parent/notifications", icon: Bell },
  { label: "Cours", href: "/parent/courses", icon: GraduationCap },
]

export function ParentSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-gray-100">
        <TaNoteLogo size="md" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
        <Button
          variant="ghost"
          className="w-full justify-start px-4 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        >
          <MoreHorizontal className="h-5 w-5 mr-3" />
          Plus
        </Button>
      </nav>

      {/* Request Session Button */}
      <div className="px-4 pb-4">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-6 text-base font-semibold shadow-lg">
          Demander une session
        </Button>
      </div>

      {/* Balance */}
      <div className="px-4 pb-4">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-2xl font-bold text-gray-900">15 000 F</span>
            <Button variant="link" className="text-blue-600 hover:text-blue-700 text-sm p-0 h-auto font-medium">
              + Recharger
            </Button>
          </div>
          <p className="text-xs text-gray-500">Solde</p>
        </div>
      </div>

      {/* User Profile */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-3 px-2 py-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-semibold">
              MK
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">M. Koné</p>
            <p className="text-xs text-gray-500">Parent</p>
          </div>
          <MoreHorizontal className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Footer Branding */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-2 px-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-900">TaNote</p>
            <p className="text-[10px] text-gray-500">Dashboard pour Parent</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
