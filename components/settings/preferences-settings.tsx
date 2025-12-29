"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export function PreferencesSettings() {
  const [preferences, setPreferences] = useState({
    language: "fr",
    theme: "system",
    difficulty: "adaptive",
    showTimer: true,
    showHints: true,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences</CardTitle>
        <CardDescription>Personnalisez votre expérience d'apprentissage</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Language */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium">Langue</Label>
            <p className="text-xs text-muted-foreground">Langue de l'interface</p>
          </div>
          <Select
            value={preferences.language}
            onValueChange={(value) => setPreferences({ ...preferences, language: value })}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Theme */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium">Thème</Label>
            <p className="text-xs text-muted-foreground">Apparence de l'application</p>
          </div>
          <Select value={preferences.theme} onValueChange={(value) => setPreferences({ ...preferences, theme: value })}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Clair</SelectItem>
              <SelectItem value="dark">Sombre</SelectItem>
              <SelectItem value="system">Système</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Difficulty */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium">Difficulté</Label>
            <p className="text-xs text-muted-foreground">Niveau des exercices proposés</p>
          </div>
          <Select
            value={preferences.difficulty}
            onValueChange={(value) => setPreferences({ ...preferences, difficulty: value })}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="adaptive">Adaptatif</SelectItem>
              <SelectItem value="easy">Facile</SelectItem>
              <SelectItem value="medium">Moyen</SelectItem>
              <SelectItem value="hard">Difficile</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Show Timer */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium">Afficher le chronomètre</Label>
            <p className="text-xs text-muted-foreground">Montrer le temps pendant les exercices</p>
          </div>
          <Switch
            checked={preferences.showTimer}
            onCheckedChange={(checked) => setPreferences({ ...preferences, showTimer: checked })}
          />
        </div>

        {/* Show Hints */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium">Afficher les indices</Label>
            <p className="text-xs text-muted-foreground">Proposer des indices pendant les exercices</p>
          </div>
          <Switch
            checked={preferences.showHints}
            onCheckedChange={(checked) => setPreferences({ ...preferences, showHints: checked })}
          />
        </div>
      </CardContent>
    </Card>
  )
}
