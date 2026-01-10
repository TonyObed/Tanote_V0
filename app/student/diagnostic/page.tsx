"use client"

import { useState } from "react"
import { Brain, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SubjectSelector } from "@/components/diagnostic/subject-selector"
import { QuestionCard } from "@/components/diagnostic/question-card"
import { DiagnosticResults } from "@/components/diagnostic/diagnostic-results"

type Step = "intro" | "select-subjects" | "questions" | "results"

const subjects = [
  { id: "math", name: "Mathématiques", icon: "📐", color: "bg-chart-1" },
  { id: "physics", name: "Physique-Chimie", icon: "⚗️", color: "bg-chart-2" },
  { id: "svt", name: "SVT", icon: "🧬", color: "bg-chart-3" },
  { id: "french", name: "Français", icon: "📚", color: "bg-chart-4" },
  { id: "history", name: "Histoire-Géo", icon: "🌍", color: "bg-chart-5" },
  { id: "english", name: "Anglais", icon: "🇬🇧", color: "bg-accent" },
]

// Mock questions - sera remplacé par les données du backend
const mockQuestions = [
  {
    id: "1",
    text: "Résoudre l'équation : 2x² - 5x + 3 = 0",
    options: [
      { id: "a", text: "x = 1 ou x = 3/2" },
      { id: "b", text: "x = -1 ou x = -3/2" },
      { id: "c", text: "x = 1 ou x = -3/2" },
      { id: "d", text: "x = -1 ou x = 3/2" },
    ],
    subject: "Mathématiques",
    difficulty: "medium" as const,
  },
  {
    id: "2",
    text: "Quelle est la formule de la vitesse ?",
    options: [
      { id: "a", text: "v = d × t" },
      { id: "b", text: "v = d / t" },
      { id: "c", text: "v = t / d" },
      { id: "d", text: "v = d + t" },
    ],
    subject: "Physique-Chimie",
    difficulty: "easy" as const,
  },
  {
    id: "3",
    text: "Quel organite est responsable de la photosynthèse ?",
    options: [
      { id: "a", text: "Mitochondrie" },
      { id: "b", text: "Chloroplaste" },
      { id: "c", text: "Ribosome" },
      { id: "d", text: "Noyau" },
    ],
    subject: "SVT",
    difficulty: "easy" as const,
  },
  {
    id: "4",
    text: "Quelle est la dérivée de f(x) = x³ + 2x ?",
    options: [
      { id: "a", text: "f'(x) = 3x² + 2" },
      { id: "b", text: "f'(x) = 3x + 2" },
      { id: "c", text: "f'(x) = x² + 2" },
      { id: "d", text: "f'(x) = 3x² + 2x" },
    ],
    subject: "Mathématiques",
    difficulty: "hard" as const,
  },
  {
    id: "5",
    text: "La loi d'Ohm s'écrit :",
    options: [
      { id: "a", text: "U = R × I" },
      { id: "b", text: "U = R / I" },
      { id: "c", text: "I = U × R" },
      { id: "d", text: "R = U × I" },
    ],
    subject: "Physique-Chimie",
    difficulty: "medium" as const,
  },
]

const mockResults = [
  {
    subject: "Mathématiques",
    score: 72,
    strengths: ["Équations du 1er degré", "Calcul algébrique"],
    weaknesses: ["Dérivation", "Suites numériques"],
    recommendedTopics: ["Dérivées", "Limites", "Suites arithmétiques"],
  },
  {
    subject: "Physique-Chimie",
    score: 58,
    strengths: ["Loi d'Ohm", "Cinématique"],
    weaknesses: ["Réactions chimiques", "Électromagnétisme"],
    recommendedTopics: ["Équilibrage d'équations", "Champ magnétique", "Ondes"],
  },
  {
    subject: "SVT",
    score: 85,
    strengths: ["Biologie cellulaire", "Génétique"],
    weaknesses: ["Géologie"],
    recommendedTopics: ["Tectonique des plaques", "Roches et minéraux"],
  },
]

export default function DiagnosticPage() {
  const [step, setStep] = useState<Step>("intro")
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId) ? prev.filter((id) => id !== subjectId) : [...prev, subjectId],
    )
  }

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setStep("results")
    }
  }

  const handleRetake = () => {
    setStep("intro")
    setSelectedSubjects([])
    setCurrentQuestionIndex(0)
    setAnswers({})
  }

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Intro Step */}
      {step === "intro" && (
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Brain className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Diagnostic de niveau</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Notre IA va évaluer ton niveau dans les matières de ton choix pour te proposer des exercices personnalisés
            adaptés à tes lacunes.
          </p>
          <div className="space-y-4 text-left bg-muted/50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold">Comment ça marche ?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="font-medium text-primary">1.</span>
                Choisis jusqu'à 3 matières à évaluer
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium text-primary">2.</span>
                Réponds à une série de questions (environ 15-20 questions)
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium text-primary">3.</span>
                Reçois ton analyse détaillée avec tes forces et faiblesses
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium text-primary">4.</span>
                Obtiens des exercices personnalisés pour progresser
              </li>
            </ul>
          </div>
          <Button size="lg" onClick={() => setStep("select-subjects")}>
            Commencer le diagnostic
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Subject Selection Step */}
      {step === "select-subjects" && (
        <div className="max-w-2xl mx-auto py-8">
          <Button variant="ghost" className="mb-6" onClick={() => setStep("intro")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <h1 className="text-2xl font-bold mb-2">Choisis tes matières</h1>
          <p className="text-muted-foreground mb-6">
            Sélectionne jusqu'à 3 matières pour ton diagnostic ({selectedSubjects.length}/3)
          </p>
          <SubjectSelector
            subjects={subjects}
            selectedSubjects={selectedSubjects}
            onSelect={handleSubjectSelect}
            maxSelection={3}
          />
          <div className="mt-8 flex justify-end">
            <Button size="lg" disabled={selectedSubjects.length === 0} onClick={() => setStep("questions")}>
              Continuer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Questions Step */}
      {step === "questions" && (
        <div className="py-8">
          <Button variant="ghost" className="mb-6" onClick={() => setStep("select-subjects")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au choix des matières
          </Button>
          <QuestionCard
            question={mockQuestions[currentQuestionIndex]}
            currentIndex={currentQuestionIndex}
            totalQuestions={mockQuestions.length}
            onAnswer={handleAnswer}
            onNext={handleNext}
            selectedAnswer={answers[mockQuestions[currentQuestionIndex].id]}
          />
        </div>
      )}

      {/* Results Step */}
      {step === "results" && <DiagnosticResults overallScore={72} results={mockResults} onRetake={handleRetake} />}
    </div>
  )
}
