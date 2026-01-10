"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Target, Clock, Trophy, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data
const overallStats = {
  totalExercises: 127,
  averageScore: 72,
  totalTime: "24h 35m",
  streak: 12,
  scoreChange: 8,
}

const subjectProgress = [
  { name: "Mathématiques", progress: 68, exercisesCompleted: 45, averageScore: 75, trend: "up" },
  { name: "Physique-Chimie", progress: 54, exercisesCompleted: 32, averageScore: 68, trend: "up" },
  { name: "SVT", progress: 82, exercisesCompleted: 28, averageScore: 85, trend: "stable" },
  { name: "Français", progress: 45, exercisesCompleted: 22, averageScore: 62, trend: "down" },
]

const recentActivity = [
  { date: "Aujourd'hui", exercises: 5, time: "45 min", score: 78 },
  { date: "Hier", exercises: 3, time: "30 min", score: 82 },
  { date: "Avant-hier", exercises: 7, time: "1h 10min", score: 71 },
  { date: "Il y a 3 jours", exercises: 4, time: "40 min", score: 88 },
  { date: "Il y a 4 jours", exercises: 2, time: "20 min", score: 65 },
]

const achievements = [
  { title: "Premier diagnostic", description: "Complète ton premier diagnostic", achieved: true },
  { title: "Série de 7 jours", description: "Pratique 7 jours d'affilée", achieved: true },
  { title: "Expert en maths", description: "Atteins 80% en mathématiques", achieved: false },
  { title: "Perfectionniste", description: "Obtiens 100% à un exercice", achieved: true },
]

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Ma progression</h1>
        <p className="text-muted-foreground">Suis tes progrès et atteins tes objectifs</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{overallStats.totalExercises}</p>
                <p className="text-xs text-muted-foreground">Exercices faits</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-bold">{overallStats.averageScore}%</p>
                  <span className="text-xs text-success">+{overallStats.scoreChange}%</span>
                </div>
                <p className="text-xs text-muted-foreground">Score moyen</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{overallStats.totalTime}</p>
                <p className="text-xs text-muted-foreground">Temps total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold">{overallStats.streak} jours</p>
                <p className="text-xs text-muted-foreground">Série en cours</p>
              </div>
            </div>
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
              {subjectProgress.map((subject, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{subject.name}</span>
                      {subject.trend === "up" && <TrendingUp className="h-4 w-4 text-success" />}
                      {subject.trend === "down" && <TrendingDown className="h-4 w-4 text-destructive" />}
                    </div>
                    <span className="text-sm font-medium">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{subject.exercisesCompleted} exercices</span>
                    <span>Score moyen : {subject.averageScore}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activité récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-background flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{activity.date}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.exercises} exercices • {activity.time}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={cn(
                        activity.score >= 80
                          ? "bg-success/10 text-success"
                          : activity.score >= 60
                            ? "bg-primary/10 text-primary"
                            : "bg-destructive/10 text-destructive",
                      )}
                    >
                      {activity.score}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Badges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all",
                    achievement.achieved ? "border-primary/20 bg-primary/5" : "border-border bg-muted/30 opacity-60",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center",
                        achievement.achieved ? "bg-primary text-primary-foreground" : "bg-muted",
                      )}
                    >
                      <Trophy className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
