"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface WeeklyActivityProps {
  data: {
    day: string
    exercises: number
    minutes: number
  }[]
}

export function WeeklyActivity({ data }: WeeklyActivityProps) {
  const maxExercises = Math.max(...data.map((d) => d.exercises))

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Activité de la semaine</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-2 h-32">
          {data.map((day, index) => (
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
            <span className="font-medium">{data.reduce((acc, d) => acc + d.exercises, 0)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Temps total : </span>
            <span className="font-medium">{data.reduce((acc, d) => acc + d.minutes, 0)} min</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
