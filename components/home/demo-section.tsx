"use client"

import { useState } from "react"
import { Calculator, BookOpen, Clock, Globe, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"

const subjects = [
  { id: "math", name: "Mathématiques", icon: Calculator },
  { id: "francais", name: "Français", icon: BookOpen },
  { id: "histoire", name: "Histoire", icon: Clock },
  { id: "geo", name: "Géographie", icon: Globe },
  { id: "svt", name: "SVT", icon: Leaf },
]

const demoContent: Record<string, { question: string; steps: string[] }> = {
  math: {
    question: "Comment résoudre l'équation x² - 5x + 6 = 0 ?",
    steps: [
      "Je vais vous guider pas à pas pour résoudre cette équation qui est de la forme ax² + bx + c = 0",
      "Étape 1 : Identifier les coefficients\na = 1, b = -5, c = 6",
      "Étape 2 : Calculer le discriminant\nΔ = b² - 4ac = (-5)² - 4×1×6 = 25 - 24 = 1",
      "Étape 3 : Trouver les solutions\nx₁ = (-b - √Δ) / 2a = (5 - 1) / 2 = 2\nx₂ = (-b + √Δ) / 2a = (5 + 1) / 2 = 3",
      "Les solutions de l'équation x² - 5x + 6 = 0 sont : x = 2 et x = 3",
    ],
  },
  francais: {
    question: "Quelles sont les figures de style dans ce texte ?",
    steps: [
      "Je vais analyser les figures de style présentes dans votre texte.",
      'Étape 1 : Identifier les comparaisons\nRecherche des mots comme "comme", "tel que", "pareil à"',
      "Étape 2 : Repérer les métaphores\nExpressions où un mot est utilisé pour un autre par analogie",
      "Étape 3 : Trouver les personnifications\nQuand on attribue des caractéristiques humaines à des objets",
      "Voici l'analyse complète des figures de style de votre texte.",
    ],
  },
  histoire: {
    question: "Quelles sont les causes de la Première Guerre mondiale ?",
    steps: [
      "Je vais vous expliquer les principales causes de la Première Guerre mondiale.",
      "Cause 1 : Les rivalités territoriales\nL'Alsace-Lorraine, les Balkans...",
      "Cause 2 : La course aux armements\nChaque puissance renforce son armée",
      "Cause 3 : Le système d'alliances\nTriple-Entente vs Triple-Alliance",
      "L'assassinat de l'archiduc François-Ferdinand fut l'élément déclencheur.",
    ],
  },
  geo: {
    question: "Comment expliquer la répartition de la population mondiale ?",
    steps: [
      "La répartition de la population mondiale dépend de plusieurs facteurs.",
      "Facteur 1 : Le climat\nLes zones tempérées sont plus peuplées",
      "Facteur 2 : Le relief\nLes plaines et vallées concentrent plus d'habitants",
      "Facteur 3 : L'accès à l'eau\nLes populations se regroupent près des fleuves",
      "Ces facteurs expliquent les grandes concentrations en Asie et Europe.",
    ],
  },
  svt: {
    question: "Comment fonctionne la photosynthèse ?",
    steps: [
      "La photosynthèse est le processus par lequel les plantes produisent leur énergie.",
      "Étape 1 : Absorption de la lumière\nLa chlorophylle capte l'énergie lumineuse",
      "Étape 2 : Absorption du CO₂\nLes stomates absorbent le dioxyde de carbone",
      "Étape 3 : Production de glucose\n6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂",
      "La plante utilise le glucose pour sa croissance et rejette l'oxygène.",
    ],
  },
}

export function DemoSection() {
  const [activeSubject, setActiveSubject] = useState("math")

  return (
    <section id="demo" className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">TaNote en Action</h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Subject selector */}
          <div className="lg:w-56 shrink-0">
            <h3 className="text-base font-semibold mb-3">Matière</h3>
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => setActiveSubject(subject.id)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-all whitespace-nowrap",
                    activeSubject === subject.id
                      ? "bg-foreground text-background"
                      : "bg-secondary hover:bg-secondary/80 text-foreground",
                  )}
                >
                  <subject.icon className="h-4 w-4 shrink-0" />
                  <span className="font-medium text-sm">{subject.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Demo window */}
          <div className="flex-1 bg-card rounded-xl border border-border overflow-hidden shadow-lg">
            {/* Window header */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/50 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-muted-foreground ml-2">Question</span>
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              <div>
                <span className="text-xs font-medium text-muted-foreground">Question :</span>
                <p className="text-foreground text-sm mt-1">{demoContent[activeSubject].question}</p>
              </div>

              <div className="text-primary font-medium text-sm">{demoContent[activeSubject].steps[0]}</div>

              <div className="border-l-2 border-primary/30 pl-4 space-y-2">
                {demoContent[activeSubject].steps.slice(1, -1).map((step, index) => (
                  <p key={index} className="text-xs text-muted-foreground whitespace-pre-line">
                    {step}
                  </p>
                ))}
              </div>

              <p className="text-sm font-medium text-foreground">
                {demoContent[activeSubject].steps[demoContent[activeSubject].steps.length - 1]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
