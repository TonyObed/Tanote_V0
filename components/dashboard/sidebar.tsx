"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Brain, BookOpen, TrendingUp, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import { TaNoteLogo } from "@/components/tanote-logo"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    label: "Tableau de bord",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Diagnostic",
    href: "/dashboard/diagnostic",
    icon: Brain,
  },
  {
    label: "Exercices",
    href: "/dashboard/exercises",
    icon: BookOpen,
  },
  {
    label: "Progression",
    href: "/dashboard/progress",
    icon: TrendingUp,
  },
  {
    label: "Paramètres",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64",
      )}
    >
      {/* Header */}
      <div className={cn("h-16 flex items-center border-b border-sidebar-border px-4", collapsed && "justify-center")}>
        <TaNoteLogo size="sm" showText={!collapsed} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent",
                collapsed && "justify-center px-2",
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          className={cn("w-full", collapsed ? "px-2" : "justify-start")}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span className="ml-2">Réduire</span>}
        </Button>
      </div>

      {/* User Section */}
      <div className={cn("p-3 border-t border-sidebar-border", collapsed && "flex justify-center")}>
        <Link
          href="/auth/login"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
            collapsed && "px-2",
          )}
          title={collapsed ? "Déconnexion" : undefined}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </Link>
      </div>
    </aside>
  )
}
