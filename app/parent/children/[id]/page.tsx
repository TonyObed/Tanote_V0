"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, TrendingUp, Clock, Target, Trophy, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Mock data for child detail
const childDetail = {
  id: "1",
  name: "Kouamé Yao",
  class: "Terminale D",
  school: "Lycée Classique d'Abidjan",
  email: "kouame.yao@email.com",
  joinedDate: "Septembre 2024",
  stats: {
    totalExercises: 127,
    averageScore: 72,
    totalTime: "24h 35m",
    streak: 12,
    diagnosticsCompleted: 3,
  },
  subjects: [
    { name: "Mathématiques", progress: 68, exercises: 45, score: 75, lastActivity: "Aujourd'hui" },
    { name: "Physique-Chimie", progress: 54, exercises: 32, score: 68, lastActivity: "Hier" },
    { name: "SVT", progress: 82, exercises: 28, score: 85, lastActivity: "Il y a 2 jours" },
    { name: "Français", progress: 45, exercises: 22, score: 62, lastActivity: "Il y a 3 jours" },
  ],
  recentExercises: [
    { title: "Équations du second degré", subject: "Mathématiques", score: 85, date: "Aujourd'hui" },
    { title: "Lois de Newton", subject: "Physique-Chimie", score: 72, date: "Hier" },
    { title: "La mitose", subject: "SVT", score: 92, date: "Il y a 2 jours" },
    { title: "Analyse littéraire", subject: "Français", score: 58, date: "Il y a 3 jours" },
  ],
  weeklyActivity: [
    { day: "Lun", exercises: 5, minutes: 45 },
    { day: "Mar", exercises: 3, minutes: 30 },
    { day: "Mer", exercises: 7, minutes: 60 },
    { day: "Jeu", exercises: 2, minutes: 20 },
    { day: "Ven", exercises: 6, minutes: 50 },
    { day: "Sam", exercises: 8, minutes: 75 },
    { day: "Dim", exercises: 4, minutes: 35 },
  ],
}

export default function ChildDetailPage() {
  const router = useRouter()
  const params = useParams()

  const maxExercises = Math.max(...childDetail.weeklyActivity.map((d) => d.exercises))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/parent")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-4 flex-1">
          <Avatar className="h-16 w-16">
            <AvatarImage src={`/student-avatar.png`} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              {childDetail.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{childDetail.name}</h1>
            <p className="text-muted-foreground">
              {childDetail.class} • {childDetail.school}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Membre depuis {childDetail.joinedDate}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-5 w-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{childDetail.stats.totalExercises}</p>
            <p className="text-xs text-muted-foreground">Exercices</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-5 w-5 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold">{childDetail.stats.averageScore}%</p>
            <p className="text-xs text-muted-foreground">Score moyen</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-5 w-5 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold">{childDetail.stats.totalTime}</p>
            <p className="text-xs text-muted-foreground">Temps total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-5 w-5 text-chart-4 mx-auto mb-2" />
            <p className="text-2xl font-bold">{childDetail.stats.streak} jours</p>
            <p className="text-xs text-muted-foreground">Série</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-5 w-5 text-chart-5 mx-auto mb-2" />
            <p className="text-2xl font-bold">{childDetail.stats.diagnosticsCompleted}</p>
            <p className="text-xs text-muted-foreground">Diagnostics</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Subject Progress */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progression par matière</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {childDetail.subjects.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{subject.name}</span>
                    <span className="text-sm font-medium">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {subject.exercises} exercices • Score moyen : {subject.score}%
                    </span>
                    <span>Dernière activité : {subject.lastActivity}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weekly Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activité de la semaine</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-2 h-32">
                {childDetail.weeklyActivity.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col items-center justify-end h-24">
                      <div
                        className={cn(
                          "w-full max-w-8 rounded-t-md transition-all",
                          day.exercises > 0 ? "bg-primary" : "bg-muted",
                        )}
                        style={{
                          height: day.exercises > 0 ? `${(day.exercises / maxExercises) * 100}%` : "4px",
                          minHeight: "4px",
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{day.day}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm">
                <div>
                  <span className="text-muted-foreground">Total exercices : </span>
                  <span className="font-medium">
                    {childDetail.weeklyActivity.reduce((acc, d) => acc + d.exercises, 0)}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Temps total : </span>
                  <span className="font-medium">
                    {childDetail.weeklyActivity.reduce((acc, d) => acc + d.minutes, 0)} min
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Exercises */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Exercices récents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {childDetail.recentExercises.map((exercise, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{exercise.title}</span>
                    <Badge
                      variant="secondary"
                      className={cn(
                        exercise.score >= 70 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
                      )}
                    >
                      {exercise.score}%
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {exercise.subject} • {exercise.date}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
