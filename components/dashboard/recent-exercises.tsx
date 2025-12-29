"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, XCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Exercise {
  id: string
  title: string
  subject: string
  status: "completed" | "in-progress" | "failed"
  score?: number
  date: string
}

interface RecentExercisesProps {
  exercises: Exercise[]
}

export function RecentExercises({ exercises }: RecentExercisesProps) {
  const getStatusIcon = (status: Exercise["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-success" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-primary" />
      case "failed":
        return <XCircle className="h-4 w-4 text-destructive" />
    }
  }

  const getStatusBadge = (status: Exercise["status"], score?: number) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20">
            {score}%
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
            En cours
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="secondary" className="bg-destructive/10 text-destructive hover:bg-destructive/20">
            À refaire
          </Badge>
        )
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Exercices récents</CardTitle>
        <Link href="/dashboard/exercises">
          <Button variant="ghost" size="sm" className="text-primary">
            Voir tout
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {exercises.map((exercise) => (
            <Link
              key={exercise.id}
              href={`/dashboard/exercises/${exercise.id}`}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg border border-border",
                "hover:bg-muted/50 transition-colors",
              )}
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(exercise.status)}
                <div>
                  <p className="text-sm font-medium">{exercise.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {exercise.subject} • {exercise.date}
                  </p>
                </div>
              </div>
              {getStatusBadge(exercise.status, exercise.score)}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
