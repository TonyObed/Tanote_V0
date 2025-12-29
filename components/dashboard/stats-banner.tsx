"use client"

import { Flame, Target, Clock, Trophy } from "lucide-react"

const stats = [
  { label: "Série", value: "5 jours", icon: Flame, color: "text-orange-500" },
  { label: "Score moyen", value: "72%", icon: Target, color: "text-blue-500" },
  { label: "Temps aujourd'hui", value: "45 min", icon: Clock, color: "text-green-500" },
  { label: "Exercices", value: "12", icon: Trophy, color: "text-purple-500" },
]

export function StatsBanner() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-center gap-6 lg:gap-10">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-2">
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
            <div className="text-center">
              <p className="text-sm font-semibold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
