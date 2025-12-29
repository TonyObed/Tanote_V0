"use client"

import { Calculator, FlaskConical, Leaf, BookText, Globe, Languages, Palette } from "lucide-react"
import { cn } from "@/lib/utils"

const subjects = [
  { name: "Maths", icon: Calculator, color: "bg-blue-100 text-blue-700 hover:bg-blue-200" },
  { name: "Physique-Chimie", icon: FlaskConical, color: "bg-purple-100 text-purple-700 hover:bg-purple-200" },
  { name: "SVT", icon: Leaf, color: "bg-green-100 text-green-700 hover:bg-green-200" },
  { name: "Français", icon: BookText, color: "bg-orange-100 text-orange-700 hover:bg-orange-200" },
  { name: "Histoire-Géo", icon: Globe, color: "bg-amber-100 text-amber-700 hover:bg-amber-200" },
  { name: "Anglais", icon: Languages, color: "bg-red-100 text-red-700 hover:bg-red-200" },
  { name: "Philo", icon: Palette, color: "bg-pink-100 text-pink-700 hover:bg-pink-200" },
]

interface QuickActionsProps {
  onSelect?: (subject: string) => void
}

export function QuickActions({ onSelect }: QuickActionsProps) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-2">
        {subjects.map((subject) => (
          <button
            key={subject.name}
            onClick={() => onSelect?.(subject.name)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
              subject.color,
            )}
          >
            <subject.icon className="h-3.5 w-3.5" />
            <span>{subject.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
