"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface ExerciseFiltersProps {
  subjects: string[]
  selectedSubject: string
  selectedDifficulty: string
  selectedStatus: string
  onSubjectChange: (subject: string) => void
  onDifficultyChange: (difficulty: string) => void
  onStatusChange: (status: string) => void
}

export function ExerciseFilters({
  subjects,
  selectedSubject,
  selectedDifficulty,
  selectedStatus,
  onSubjectChange,
  onDifficultyChange,
  onStatusChange,
}: ExerciseFiltersProps) {
  const statusOptions = [
    { value: "all", label: "Tous" },
    { value: "available", label: "Disponibles" },
    { value: "completed", label: "Complétés" },
    { value: "recommended", label: "Recommandés" },
  ]

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Subject Filter */}
      <Select value={selectedSubject} onValueChange={onSubjectChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Matière" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les matières</SelectItem>
          {subjects.map((subject) => (
            <SelectItem key={subject} value={subject}>
              {subject}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Difficulty Filter */}
      <Select value={selectedDifficulty} onValueChange={onDifficultyChange}>
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="Difficulté" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes</SelectItem>
          <SelectItem value="easy">Facile</SelectItem>
          <SelectItem value="medium">Moyen</SelectItem>
          <SelectItem value="hard">Difficile</SelectItem>
        </SelectContent>
      </Select>

      {/* Status Filter (Buttons on desktop) */}
      <div className="hidden md:flex items-center gap-2">
        {statusOptions.map((option) => (
          <Button
            key={option.value}
            variant={selectedStatus === option.value ? "default" : "outline"}
            size="sm"
            onClick={() => onStatusChange(option.value)}
            className={cn(selectedStatus !== option.value && "bg-transparent")}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* Status Filter (Select on mobile) */}
      <Select value={selectedStatus} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-[150px] md:hidden">
          <SelectValue placeholder="Statut" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
