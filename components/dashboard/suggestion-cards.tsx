"use client"

import { FileQuestion, Lightbulb, TrendingUp, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const suggestions = [
  {
    icon: FileQuestion,
    title: "Exercice",
    description: "Entraîne-toi sur un sujet",
    color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
    iconColor: "text-blue-600",
  },
  {
    icon: Lightbulb,
    title: "Cours",
    description: "Comprends une leçon",
    color: "bg-amber-50 hover:bg-amber-100 border-amber-200",
    iconColor: "text-amber-600",
  },
  {
    icon: TrendingUp,
    title: "Diagnostic",
    description: "Évalue ton niveau",
    color: "bg-green-50 hover:bg-green-100 border-green-200",
    iconColor: "text-green-600",
  },
  {
    icon: HelpCircle,
    title: "Question",
    description: "Pose ta question",
    color: "bg-purple-50 hover:bg-purple-100 border-purple-200",
    iconColor: "text-purple-600",
  },
]

interface SuggestionCardsProps {
  onSelect?: (title: string) => void
}

export function SuggestionCards({ onSelect }: SuggestionCardsProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.title}
            onClick={() => onSelect?.(suggestion.title)}
            className={cn(
              "flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all text-center group",
              suggestion.color,
            )}
          >
            <div className={cn("p-3 rounded-xl bg-white shadow-sm", suggestion.iconColor)}>
              <suggestion.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{suggestion.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{suggestion.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
