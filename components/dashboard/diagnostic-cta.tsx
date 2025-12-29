"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

interface DiagnosticCTAProps {
  hasCompletedDiagnostic?: boolean
  lastDiagnosticDate?: string
}

export function DiagnosticCTA({ hasCompletedDiagnostic = false, lastDiagnosticDate }: DiagnosticCTAProps) {
  if (hasCompletedDiagnostic) {
    return (
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Diagnostic à jour</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Dernier diagnostic effectué le {lastDiagnosticDate}. Refais le diagnostic pour mettre à jour tes
                recommandations.
              </p>
              <Link href="/dashboard/diagnostic">
                <Button variant="outline" size="sm">
                  Refaire le diagnostic
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-primary bg-primary text-primary-foreground overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-foreground rounded-full blur-2xl" />
      </div>
      <CardContent className="p-6 relative z-10">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
            <Brain className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Commence par le diagnostic</h3>
            <p className="text-sm text-primary-foreground/80 mb-3">
              Notre IA va analyser ton niveau pour te proposer des exercices personnalisés adaptés à tes lacunes.
            </p>
            <Link href="/dashboard/diagnostic">
              <Button variant="secondary" size="sm">
                Faire le diagnostic
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
