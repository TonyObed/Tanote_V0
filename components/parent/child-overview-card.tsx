"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Clock, Target, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ChildOverviewCardProps {
  child: {
    id: string
    name: string
    class: string
    avatar?: string
    lastActivity: string
    weeklyTime: string
    exercisesCompleted: number
    averageScore: number
    scoreTrend: number
    subjects: {
      name: string
      progress: number
    }[]
  }
}

export function ChildOverviewCard({ child }: ChildOverviewCardProps) {
  const isPositiveTrend = child.scoreTrend >= 0

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={child.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {child.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{child.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{child.class}</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {child.lastActivity}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="text-xl font-bold">{child.averageScore}%</span>
              {isPositiveTrend ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">Score moyen</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-xl font-bold">{child.exercisesCompleted}</span>
            </div>
            <p className="text-xs text-muted-foreground">Exercices</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Clock className="h-4 w-4 text-accent" />
              <span className="text-xl font-bold">{child.weeklyTime}</span>
            </div>
            <p className="text-xs text-muted-foreground">Cette semaine</p>
          </div>
        </div>

        {/* Subject Progress */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Progression par matière</p>
          {child.subjects.slice(0, 3).map((subject, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{subject.name}</span>
                <span className="font-medium">{subject.progress}%</span>
              </div>
              <Progress value={subject.progress} className="h-1.5" />
            </div>
          ))}
        </div>

        {/* Action */}
        <Link href={`/parent/children/${child.id}`}>
          <Button variant="outline" className="w-full bg-transparent">
            Voir le détail
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
