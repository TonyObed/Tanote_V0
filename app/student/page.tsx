"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChatInput } from "@/components/dashboard/chat-input"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { SuggestionCards } from "@/components/dashboard/suggestion-cards"

export default function DashboardPage() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSend = (message: string) => {
    console.log("Message envoyé:", message)
  }

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject)
  }

  const handleSuggestionSelect = (suggestion: string) => {
    console.log("Suggestion sélectionnée:", suggestion)
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] lg:min-h-screen px-6 lg:px-8 py-8 transition-all duration-700",
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      )}
    >
      {/* Main Content - Centered */}
      <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
        <div className="text-center space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
            Bonjour Kouamé
          </h1>
          <p className="text-lg text-muted-foreground">Comment puis-je t'aider aujourd'hui ?</p>
        </div>

        {/* Suggestion Cards */}
        <SuggestionCards onSelect={handleSuggestionSelect} />

        {/* Chat Input */}
        <div className="w-full">
          <ChatInput onSend={handleSend} />
        </div>

        {/* Quick Actions - Subjects */}
        <QuickActions onSelect={handleSubjectSelect} />

        {/* Footer Note */}
        <p className="text-xs text-muted-foreground text-center max-w-md">
          TaNote peut faire des erreurs. Vérifie toujours les informations importantes avec ton professeur.
        </p>
      </div>
    </div>
  )
}
