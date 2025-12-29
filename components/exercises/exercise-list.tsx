"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Target, Play, CheckCircle2, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Exercise {
  id: string
  title: string
  subject: string
  topic: string
  difficulty: "easy" | "medium" | "hard"
  duration: number
  questionsCount: number
  status: "available" | "completed" | "locked"
  score?: number
  isRecommended?: boolean
}

interface ExerciseListProps {
  exercises: Exercise[]
  onStartExercise: (exerciseId: string) => void
}

export function ExerciseList({ exercises, onStartExercise }: ExerciseListProps) {
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
    <div className="space-y-4">
      {exercises.map((exercise) => (
        <Card
          key={exercise.id}
          className={cn(
            "transition-all",
            exercise.status === "locked" && "opacity-60",
            exercise.isRecommended && "border-primary/50 bg-primary/5",
          )}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {exercise.isRecommended && (
                    <Badge className="bg-primary text-primary-foreground text-xs">Recommandé</Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    {exercise.subject}
                  </Badge>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full", difficultyColors[exercise.difficulty])}>
                    {difficultyLabels[exercise.difficulty]}
                  </span>
                </div>

                <h3 className="font-semibold">{exercise.title}</h3>
                <p className="text-sm text-muted-foreground">{exercise.topic}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {exercise.duration} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    {exercise.questionsCount} questions
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                {exercise.status === "completed" && exercise.score !== undefined && (
                  <div className="flex items-center gap-1 text-success">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="font-semibold">{exercise.score}%</span>
                  </div>
                )}

                {exercise.status === "available" && (
                  <Button size="sm" onClick={() => onStartExercise(exercise.id)}>
                    <Play className="mr-1 h-4 w-4" />
                    Commencer
                  </Button>
                )}

                {exercise.status === "completed" && (
                  <Button variant="outline" size="sm" onClick={() => onStartExercise(exercise.id)}>
                    Refaire
                  </Button>
                )}

                {exercise.status === "locked" && (
                  <Button variant="ghost" size="sm" disabled>
                    <Lock className="mr-1 h-4 w-4" />
                    Verrouillé
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
