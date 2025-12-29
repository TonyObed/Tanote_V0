"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface NotificationSetting {
  id: string
  label: string
  description: string
  enabled: boolean
}

export function NotificationSettings() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "email_progress",
      label: "Rapports de progression",
      description: "Recevoir un résumé hebdomadaire de votre progression par email",
      enabled: true,
    },
    {
      id: "email_reminder",
      label: "Rappels d'activité",
      description: "Recevoir un rappel si vous n'avez pas pratiqué depuis 3 jours",
      enabled: true,
    },
    {
      id: "email_diagnostic",
      label: "Résultats de diagnostic",
      description: "Recevoir les résultats détaillés de vos diagnostics par email",
      enabled: false,
    },
    {
      id: "push_exercise",
      label: "Nouveaux exercices",
      description: "Être notifié quand de nouveaux exercices sont disponibles",
      enabled: true,
    },
    {
      id: "push_achievement",
      label: "Badges et récompenses",
      description: "Être notifié quand vous débloquez un nouveau badge",
      enabled: true,
    },
  ])

  const toggleSetting = (id: string) => {
    setSettings((prev) => prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Gérez vos préférences de notification</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {settings.map((setting) => (
          <div key={setting.id} className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor={setting.id} className="text-sm font-medium">
                {setting.label}
              </Label>
              <p className="text-xs text-muted-foreground">{setting.description}</p>
            </div>
            <Switch id={setting.id} checked={setting.enabled} onCheckedChange={() => toggleSetting(setting.id)} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
