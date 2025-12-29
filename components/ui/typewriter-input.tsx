"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

const phrases = [
  "Bienvenue sur TaNote",
  "Votre répétiteur intelligent",
  "Comprenez mieux vos cours",
  "Résolvez vos exercices facilement",
]

export function TypewriterInput() {
  const [text, setText] = useState("")
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (charIndex < currentPhrase.length) {
            setText(currentPhrase.slice(0, charIndex + 1))
            setCharIndex(charIndex + 1)
          } else {
            // Pause before deleting
            setTimeout(() => setIsDeleting(true), 1200)
          }
        } else {
          // Deleting
          if (charIndex > 0) {
            setText(currentPhrase.slice(0, charIndex - 1))
            setCharIndex(charIndex - 1)
          } else {
            setIsDeleting(false)
            setPhraseIndex((phraseIndex + 1) % phrases.length)
          }
        }
      },
      isDeleting ? 60 : 90,
    )

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, phraseIndex])

  return (
    <div className="w-full max-w-lg">
      <div className="bg-white rounded-full shadow-lg border border-gray-200/50 px-6 py-4 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <span className="text-gray-700 text-base font-medium truncate">{text}</span>
          <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-pulse" />
        </div>
        <button className="flex-shrink-0 w-10 h-10 bg-gray-900 hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors">
          <ArrowUp className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  )
}
