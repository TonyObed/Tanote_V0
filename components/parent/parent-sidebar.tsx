"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, MessageSquare, Calendar, Wallet, Bell, Settings, LogOut } from "lucide-react"
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
]

export function ParentSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    router.push("/auth/login")
  }

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
      </nav>

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

      <div className="border-t border-gray-100 p-4 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-semibold">
              MK
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">M. Koné</p>
            <p className="text-xs text-gray-500">Parent</p>
          </div>
        </div>

        {/* Settings and Logout buttons */}
        <div className="space-y-2">
          <Link href="/parent/settings" className="block">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <Settings className="h-4 w-4 mr-2" />
              Paramètres
            </Button>
          </Link>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Se déconnecter
          </Button>
        </div>
      </div>
    </aside>
  )
}
