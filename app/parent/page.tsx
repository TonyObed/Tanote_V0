"use client"

import { useState } from "react"
import { ChildSelector } from "@/components/parent/child-selector"
import { ChildOverviewCard } from "@/components/parent/child-overview-card"
import { ActivityTimeline } from "@/components/parent/activity-timeline"
import { AlertsCard } from "@/components/parent/alerts-card"
import { Card, CardContent } from "@/components/ui/card"
import { Users, TrendingUp, Clock, Target } from "lucide-react"

// Mock data
const children = [
  { id: "1", name: "Kouamé Yao", class: "Terminale D" },
  { id: "2", name: "Aya Koné", class: "Seconde C" },
]

const childrenDetails = [
  {
    id: "1",
    name: "Kouamé Yao",
    class: "Terminale D",
    lastActivity: "Il y a 2h",
    weeklyTime: "4h 30m",
    exercisesCompleted: 23,
    averageScore: 72,
    scoreTrend: 5,
    subjects: [
      { name: "Mathématiques", progress: 68 },
      { name: "Physique-Chimie", progress: 54 },
      { name: "SVT", progress: 82 },
    ],
  },
  {
    id: "2",
    name: "Aya Koné",
    class: "Seconde C",
    lastActivity: "Hier",
    weeklyTime: "2h 15m",
    exercisesCompleted: 15,
    averageScore: 78,
    scoreTrend: -3,
    subjects: [
      { name: "Mathématiques", progress: 75 },
      { name: "Français", progress: 82 },
      { name: "Anglais", progress: 68 },
    ],
  },
]

const recentActivities = [
  {
    id: "1",
    childName: "Kouamé",
    type: "exercise" as const,
    title: "Exercice complété",
    description: "Équations du second degré - Mathématiques",
    time: "Il y a 2h",
    score: 85,
  },
  {
    id: "2",
    childName: "Aya",
    type: "achievement" as const,
    title: "Nouveau badge obtenu",
    description: "Série de 7 jours consécutifs",
    time: "Hier",
  },
  {
    id: "3",
    childName: "Kouamé",
    type: "diagnostic" as const,
    title: "Diagnostic terminé",
    description: "Physique-Chimie - Score : 68%",
    time: "Il y a 2 jours",
    score: 68,
  },
  {
    id: "4",
    childName: "Aya",
    type: "exercise" as const,
    title: "Exercice complété",
    description: "Conjugaison - Français",
    time: "Il y a 3 jours",
    score: 92,
  },
]

const alerts = [
  {
    id: "1",
    type: "warning" as const,
    childName: "Kouamé",
    message: "Score en baisse en Physique-Chimie (-12% ce mois)",
  },
  {
    id: "2",
    type: "info" as const,
    childName: "Aya",
    message: "N'a pas pratiqué depuis 2 jours",
  },
]

export default function ParentDashboard() {
  const [selectedChildId, setSelectedChildId] = useState(children[0].id)

  const globalStats = {
    totalChildren: children.length,
    averageScore: Math.round(childrenDetails.reduce((acc, c) => acc + c.averageScore, 0) / childrenDetails.length),
    totalTime: "6h 45m",
    totalExercises: childrenDetails.reduce((acc, c) => acc + c.exercisesCompleted, 0),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Bonjour, M. Koné</h1>
          <p className="text-muted-foreground">Suivez la progression de vos enfants</p>
        </div>
        <ChildSelector children={children} selectedChildId={selectedChildId} onSelect={setSelectedChildId} />
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{globalStats.totalChildren}</p>
              <p className="text-xs text-muted-foreground">Enfants</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{globalStats.averageScore}%</p>
              <p className="text-xs text-muted-foreground">Score moyen</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">{globalStats.totalTime}</p>
              <p className="text-xs text-muted-foreground">Cette semaine</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
              <Target className="h-5 w-5 text-chart-4" />
            </div>
            <div>
              <p className="text-2xl font-bold">{globalStats.totalExercises}</p>
              <p className="text-xs text-muted-foreground">Exercices faits</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Children Overview */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-semibold">Vos enfants</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {childrenDetails.map((child) => (
              <ChildOverviewCard key={child.id} child={child} />
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <AlertsCard alerts={alerts} />
          <ActivityTimeline activities={recentActivities} />
        </div>
      </div>
    </div>
  )
}
