"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

interface Subject {
  id: string
  name: string
  icon: string
  color: string
}

interface SubjectSelectorProps {
  subjects: Subject[]
  selectedSubjects: string[]
  onSelect: (subjectId: string) => void
  maxSelection?: number
}

export function SubjectSelector({ subjects, selectedSubjects, onSelect, maxSelection = 3 }: SubjectSelectorProps) {
  const isSelected = (id: string) => selectedSubjects.includes(id)
  const canSelect = selectedSubjects.length < maxSelection

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {subjects.map((subject) => (
        <Card
          key={subject.id}
          className={cn(
            "cursor-pointer transition-all border-2",
            isSelected(subject.id)
              ? "border-primary bg-primary/5"
              : canSelect
                ? "border-border hover:border-primary/50"
                : "border-border opacity-50 cursor-not-allowed",
          )}
          onClick={() => {
            if (isSelected(subject.id) || canSelect) {
              onSelect(subject.id)
            }
          }}
        >
          <CardContent className="p-4 flex flex-col items-center text-center relative">
            {isSelected(subject.id) && <CheckCircle2 className="absolute top-2 right-2 h-5 w-5 text-primary" />}
            <span className="text-3xl mb-2">{subject.icon}</span>
            <span className={cn("text-sm font-medium", isSelected(subject.id) ? "text-primary" : "text-foreground")}>
              {subject.name}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
