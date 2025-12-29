"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, AlertCircle, XCircle, ArrowRight, RotateCcw } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SubjectResult {
  subject: string
  score: number
  strengths: string[]
  weaknesses: string[]
  recommendedTopics: string[]
}

interface DiagnosticResultsProps {
  overallScore: number
  results: SubjectResult[]
  onRetake: () => void
}

export function DiagnosticResults({ overallScore, results, onRetake }: DiagnosticResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-success"
    if (score >= 50) return "text-primary"
    return "text-destructive"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 70) return <CheckCircle2 className="h-5 w-5 text-success" />
    if (score >= 50) return <AlertCircle className="h-5 w-5 text-primary" />
    return <XCircle className="h-5 w-5 text-destructive" />
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 70) return "Très bien"
    if (score >= 60) return "Bien"
    if (score >= 50) return "Passable"
    return "À améliorer"
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Overall Score Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-8 text-center">
          <h2 className="text-lg text-muted-foreground mb-2">Ton score global</h2>
          <div className={cn("text-6xl font-bold mb-2", getScoreColor(overallScore))}>{overallScore}%</div>
          <p className="text-xl font-medium text-foreground">{getScoreLabel(overallScore)}</p>
          <p className="text-sm text-muted-foreground mt-4 max-w-md mx-auto">
            Notre IA a analysé tes réponses et identifié tes forces et faiblesses. Voici tes recommandations
            personnalisées.
          </p>
        </CardContent>
      </Card>

      {/* Subject Results */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Résultats par matière</h3>
        {results.map((result, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getScoreIcon(result.score)}
                  <CardTitle className="text-base">{result.subject}</CardTitle>
                </div>
                <span className={cn("text-2xl font-bold", getScoreColor(result.score))}>{result.score}%</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={result.score} className="h-2" />

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Strengths */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-success flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    Points forts
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {result.strengths.map((strength, i) => (
                      <li key={i}>• {strength}</li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-destructive flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />À travailler
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {result.weaknesses.map((weakness, i) => (
                      <li key={i}>• {weakness}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommended Topics */}
              <div className="pt-2 border-t border-border">
                <h4 className="text-sm font-medium mb-2">Exercices recommandés</h4>
                <div className="flex flex-wrap gap-2">
                  {result.recommendedTopics.map((topic, i) => (
                    <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <Button variant="outline" onClick={onRetake}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Refaire le diagnostic
        </Button>
        <Link href="/dashboard/exercises">
          <Button>
            Commencer les exercices
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
