"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ExerciseList } from "@/components/exercises/exercise-list"
import { ExerciseFilters } from "@/components/exercises/exercise-filters"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Target, Trophy } from "lucide-react"

// Mock data - sera remplacé par les données du backend
const mockExercises = [
  {
    id: "1",
    title: "Équations du second degré",
    subject: "Mathématiques",
    topic: "Algèbre - Résolution d'équations polynomiales",
    difficulty: "medium" as const,
    duration: 15,
    questionsCount: 10,
    status: "available" as const,
    isRecommended: true,
  },
  {
    id: "2",
    title: "Dérivation de fonctions",
    subject: "Mathématiques",
    topic: "Analyse - Calcul de dérivées",
    difficulty: "hard" as const,
    duration: 20,
    questionsCount: 12,
    status: "available" as const,
    isRecommended: true,
  },
  {
    id: "3",
    title: "Lois de Newton",
    subject: "Physique-Chimie",
    topic: "Mécanique - Forces et mouvements",
    difficulty: "medium" as const,
    duration: 15,
    questionsCount: 8,
    status: "completed" as const,
    score: 85,
  },
  {
    id: "4",
    title: "Réactions acido-basiques",
    subject: "Physique-Chimie",
    topic: "Chimie - pH et solutions",
    difficulty: "hard" as const,
    duration: 20,
    questionsCount: 10,
    status: "available" as const,
    isRecommended: true,
  },
  {
    id: "5",
    title: "La mitose",
    subject: "SVT",
    topic: "Biologie cellulaire - Division cellulaire",
    difficulty: "easy" as const,
    duration: 10,
    questionsCount: 8,
    status: "completed" as const,
    score: 92,
  },
  {
    id: "6",
    title: "Tectonique des plaques",
    subject: "SVT",
    topic: "Géologie - Structure de la Terre",
    difficulty: "medium" as const,
    duration: 15,
    questionsCount: 10,
    status: "locked" as const,
  },
  {
    id: "7",
    title: "Analyse littéraire",
    subject: "Français",
    topic: "Commentaire composé - Méthode",
    difficulty: "hard" as const,
    duration: 25,
    questionsCount: 5,
    status: "available" as const,
  },
  {
    id: "8",
    title: "Conjugaison - Temps composés",
    subject: "Français",
    topic: "Grammaire - Verbes",
    difficulty: "easy" as const,
    duration: 10,
    questionsCount: 15,
    status: "completed" as const,
    score: 70,
  },
]

const subjects = ["Mathématiques", "Physique-Chimie", "SVT", "Français", "Histoire-Géo", "Anglais"]

export default function ExercisesPage() {
  const router = useRouter()
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredExercises = mockExercises.filter((exercise) => {
    if (selectedSubject !== "all" && exercise.subject !== selectedSubject) return false
    if (selectedDifficulty !== "all" && exercise.difficulty !== selectedDifficulty) return false
    if (selectedStatus === "available" && exercise.status !== "available") return false
    if (selectedStatus === "completed" && exercise.status !== "completed") return false
    if (selectedStatus === "recommended" && !exercise.isRecommended) return false
    return true
  })

  const handleStartExercise = (exerciseId: string) => {
    router.push(`/dashboard/exercises/${exerciseId}`)
  }

  const stats = {
    totalExercises: mockExercises.length,
    completedExercises: mockExercises.filter((e) => e.status === "completed").length,
    recommendedExercises: mockExercises.filter((e) => e.isRecommended).length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Exercices</h1>
        <p className="text-muted-foreground">Pratique et améliore-toi avec nos exercices personnalisés</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalExercises}</p>
              <p className="text-xs text-muted-foreground">Exercices</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Trophy className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.completedExercises}</p>
              <p className="text-xs text-muted-foreground">Complétés</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Brain className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.recommendedExercises}</p>
              <p className="text-xs text-muted-foreground">Recommandés</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <ExerciseFilters
        subjects={subjects}
        selectedSubject={selectedSubject}
        selectedDifficulty={selectedDifficulty}
        selectedStatus={selectedStatus}
        onSubjectChange={setSelectedSubject}
        onDifficultyChange={setSelectedDifficulty}
        onStatusChange={setSelectedStatus}
      />

      {/* Exercise List */}
      <ExerciseList exercises={filteredExercises} onStartExercise={handleStartExercise} />

      {filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun exercice ne correspond à tes filtres.</p>
        </div>
      )}
    </div>
  )
}
