"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Brain, BookOpen, TrendingUp, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    label: "Accueil",
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
    label: "Progrès",
    href: "/dashboard/progress",
    icon: TrendingUp,
  },
  {
    label: "Profil",
    href: "/dashboard/settings",
    icon: User,
  },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border lg:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
