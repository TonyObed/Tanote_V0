"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface SubjectProgressProps {
  subjects: {
    name: string
    progress: number
    color: string
    lastActivity?: string
  }[]
}

export function SubjectProgress({ subjects }: SubjectProgressProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Progression par matière</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {subjects.map((subject, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={cn("h-3 w-3 rounded-full", subject.color)} />
                <span className="text-sm font-medium">{subject.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{subject.progress}%</span>
            </div>
            <Progress value={subject.progress} className="h-2" />
            {subject.lastActivity && (
              <p className="text-xs text-muted-foreground">Dernière activité : {subject.lastActivity}</p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
