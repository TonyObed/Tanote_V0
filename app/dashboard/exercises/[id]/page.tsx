"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Clock, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

// Mock exercise data
const mockExercise = {
  id: "1",
  title: "Équations du second degré",
  subject: "Mathématiques",
  questions: [
    {
      id: "q1",
      text: "Résoudre l'équation : x² - 5x + 6 = 0",
      options: [
        { id: "a", text: "x = 2 ou x = 3" },
        { id: "b", text: "x = -2 ou x = -3" },
        { id: "c", text: "x = 1 ou x = 6" },
        { id: "d", text: "x = -1 ou x = -6" },
      ],
      correctAnswer: "a",
      explanation: "En factorisant : x² - 5x + 6 = (x - 2)(x - 3) = 0, donc x = 2 ou x = 3",
    },
    {
      id: "q2",
      text: "Quel est le discriminant de l'équation 2x² + 3x - 2 = 0 ?",
      options: [
        { id: "a", text: "Δ = 25" },
        { id: "b", text: "Δ = 9" },
        { id: "c", text: "Δ = 16" },
        { id: "d", text: "Δ = 1" },
      ],
      correctAnswer: "a",
      explanation: "Δ = b² - 4ac = 3² - 4(2)(-2) = 9 + 16 = 25",
    },
    {
      id: "q3",
      text: "Combien de solutions a l'équation x² + 4x + 4 = 0 ?",
      options: [
        { id: "a", text: "Aucune solution réelle" },
        { id: "b", text: "Une solution double" },
        { id: "c", text: "Deux solutions distinctes" },
        { id: "d", text: "Impossible à déterminer" },
      ],
      correctAnswer: "b",
      explanation: "Δ = 16 - 16 = 0, donc une solution double : x = -2",
    },
  ],
}

export default function ExercisePage() {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const currentQuestion = mockExercise.questions[currentQuestionIndex]
  const totalQuestions = mockExercise.questions.length
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }))
  }

  const handleNext = () => {
    setShowExplanation(false)
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleCheck = () => {
    setShowExplanation(true)
  }

  const calculateScore = () => {
    let correct = 0
    mockExercise.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct++
    })
    return Math.round((correct / totalQuestions) * 100)
  }

  const isCorrect = answers[currentQuestion.id] === currentQuestion.correctAnswer

  if (showResults) {
    const score = calculateScore()
    return (
      <div className="max-w-2xl mx-auto py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <div
              className={cn(
                "h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6",
                score >= 70 ? "bg-success/10" : score >= 50 ? "bg-primary/10" : "bg-destructive/10",
              )}
            >
              {score >= 70 ? (
                <CheckCircle2 className="h-10 w-10 text-success" />
              ) : (
                <XCircle className="h-10 w-10 text-destructive" />
              )}
            </div>
            <h1 className="text-2xl font-bold mb-2">Exercice terminé !</h1>
            <p className={cn("text-4xl font-bold mb-4", score >= 70 ? "text-success" : "text-destructive")}>{score}%</p>
            <p className="text-muted-foreground mb-6">
              Tu as répondu correctement à{" "}
              {mockExercise.questions.filter((q) => answers[q.id] === q.correctAnswer).length} questions sur{" "}
              {totalQuestions}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" onClick={() => router.push("/dashboard/exercises")}>
                Retour aux exercices
              </Button>
              <Button
                onClick={() => {
                  setAnswers({})
                  setCurrentQuestionIndex(0)
                  setShowResults(false)
                }}
              >
                Refaire l'exercice
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard/exercises")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-semibold">{mockExercise.title}</h1>
          <p className="text-sm text-muted-foreground">{mockExercise.subject}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>15:00</span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">
            Question {currentQuestionIndex + 1}/{totalQuestions}
          </span>
          <span className="font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-6">{currentQuestion.text}</h2>

          <RadioGroup
            value={answers[currentQuestion.id]}
            onValueChange={handleAnswer}
            className="space-y-3"
            disabled={showExplanation}
          >
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers[currentQuestion.id] === option.id
              const isCorrectOption = option.id === currentQuestion.correctAnswer

              return (
                <div
                  key={option.id}
                  className={cn(
                    "flex items-center space-x-3 p-4 rounded-xl border-2 transition-all",
                    !showExplanation && isSelected && "border-primary bg-primary/5",
                    !showExplanation && !isSelected && "border-border hover:border-primary/50",
                    showExplanation && isCorrectOption && "border-success bg-success/5",
                    showExplanation && isSelected && !isCorrectOption && "border-destructive bg-destructive/5",
                    showExplanation && "cursor-default",
                    !showExplanation && "cursor-pointer",
                  )}
                  onClick={() => !showExplanation && handleAnswer(option.id)}
                >
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className={cn("flex-1 text-sm", !showExplanation && "cursor-pointer")}>
                    <span className="font-medium text-muted-foreground mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option.text}
                  </Label>
                  {showExplanation && isCorrectOption && <CheckCircle2 className="h-5 w-5 text-success" />}
                  {showExplanation && isSelected && !isCorrectOption && (
                    <XCircle className="h-5 w-5 text-destructive" />
                  )}
                </div>
              )
            })}
          </RadioGroup>

          {/* Explanation */}
          {showExplanation && (
            <div
              className={cn(
                "mt-6 p-4 rounded-xl",
                isCorrect ? "bg-success/10 border border-success/20" : "bg-destructive/10 border border-destructive/20",
              )}
            >
              <h3 className={cn("font-semibold mb-2", isCorrect ? "text-success" : "text-destructive")}>
                {isCorrect ? "Bonne réponse !" : "Mauvaise réponse"}
              </h3>
              <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-3">
            {!showExplanation ? (
              <Button onClick={handleCheck} disabled={!answers[currentQuestion.id]}>
                Vérifier
              </Button>
            ) : (
              <Button onClick={handleNext}>
                {currentQuestionIndex < totalQuestions - 1 ? "Question suivante" : "Voir les résultats"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
