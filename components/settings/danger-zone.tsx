"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2, Download } from "lucide-react"

export function DangerZone() {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteAccount = () => {
    setIsDeleting(true)
    // Simulation
    setTimeout(() => {
      setIsDeleting(false)
    }, 2000)
  }

  return (
    <Card className="border-destructive/50">
      <CardHeader>
        <CardTitle className="text-destructive">Zone dangereuse</CardTitle>
        <CardDescription>Actions irréversibles concernant votre compte</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Export Data */}
        <div className="flex items-center justify-between p-4 rounded-lg border border-border">
          <div>
            <p className="font-medium text-sm">Exporter mes données</p>
            <p className="text-xs text-muted-foreground">Téléchargez toutes vos données personnelles (RGPD)</p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>

        {/* Delete Account */}
        <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/30 bg-destructive/5">
          <div>
            <p className="font-medium text-sm text-destructive">Supprimer mon compte</p>
            <p className="text-xs text-muted-foreground">
              Cette action est irréversible. Toutes vos données seront supprimées.
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer votre compte ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible. Toutes vos données personnelles, votre progression et vos résultats
                  seront définitivement supprimés.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? "Suppression..." : "Oui, supprimer mon compte"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  )
}
