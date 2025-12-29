"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle2, BookOpen, Brain, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

interface Activity {
  id: string
  childName: string
  childAvatar?: string
  type: "exercise" | "diagnostic" | "achievement" | "milestone"
  title: string
  description: string
  time: string
  score?: number
}

interface ActivityTimelineProps {
  activities: Activity[]
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "exercise":
        return <BookOpen className="h-4 w-4" />
      case "diagnostic":
        return <Brain className="h-4 w-4" />
      case "achievement":
        return <Trophy className="h-4 w-4" />
      case "milestone":
        return <CheckCircle2 className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "exercise":
        return "bg-primary/10 text-primary"
      case "diagnostic":
        return "bg-accent/10 text-accent"
      case "achievement":
        return "bg-chart-4/10 text-chart-4"
      case "milestone":
        return "bg-success/10 text-success"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Activité récente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id} className="flex gap-3">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center",
                    getActivityColor(activity.type),
                  )}
                >
                  {getActivityIcon(activity.type)}
                </div>
                {index < activities.length - 1 && <div className="w-0.5 flex-1 bg-border mt-2" />}
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={activity.childAvatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-[10px] bg-muted">
                      {activity.childName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{activity.childName}</span>
                  <span className="text-xs text-muted-foreground">• {activity.time}</span>
                </div>
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
                {activity.score !== undefined && (
                  <span
                    className={cn(
                      "inline-block mt-1 text-xs px-2 py-0.5 rounded-full",
                      activity.score >= 70 ? "bg-success/10 text-success" : "bg-primary/10 text-primary",
                    )}
                  >
                    Score : {activity.score}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
