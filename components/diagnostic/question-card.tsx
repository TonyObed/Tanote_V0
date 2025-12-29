"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface Question {
  id: string
  text: string
  options: {
    id: string
    text: string
  }[]
  subject: string
  difficulty: "easy" | "medium" | "hard"
}

interface QuestionCardProps {
  question: Question
  currentIndex: number
  totalQuestions: number
  onAnswer: (questionId: string, answerId: string) => void
  onNext: () => void
  selectedAnswer?: string
}

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
  onNext,
  selectedAnswer,
}: QuestionCardProps) {
  const [localAnswer, setLocalAnswer] = useState<string | undefined>(selectedAnswer)

  const handleAnswer = (value: string) => {
    setLocalAnswer(value)
    onAnswer(question.id, value)
  }

  const difficultyColors = {
    easy: "bg-success/10 text-success",
    medium: "bg-primary/10 text-primary",
    hard: "bg-destructive/10 text-destructive",
  }

  const difficultyLabels = {
    easy: "Facile",
    medium: "Moyen",
    hard: "Difficile",
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Question {currentIndex + 1}/{totalQuestions}
            </span>
            <span className={cn("text-xs px-2 py-1 rounded-full", difficultyColors[question.difficulty])}>
              {difficultyLabels[question.difficulty]}
            </span>
          </div>
          <span className="text-sm font-medium text-primary">{question.subject}</span>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 bg-muted rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Question */}
        <h2 className="text-lg font-semibold mb-6 text-balance">{question.text}</h2>

        {/* Options */}
        <RadioGroup value={localAnswer} onValueChange={handleAnswer} className="space-y-3">
          {question.options.map((option, index) => (
            <div
              key={option.id}
              className={cn(
                "flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all",
                localAnswer === option.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
              )}
              onClick={() => handleAnswer(option.id)}
            >
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id} className="flex-1 cursor-pointer text-sm">
                <span className="font-medium text-muted-foreground mr-2">{String.fromCharCode(65 + index)}.</span>
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {/* Next Button */}
        <div className="mt-6 flex justify-end">
          <Button onClick={onNext} disabled={!localAnswer}>
            {currentIndex + 1 === totalQuestions ? "Terminer" : "Suivant"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
