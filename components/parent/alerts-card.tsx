"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, TrendingDown, Clock, ChevronRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Alert {
  id: string
  type: "warning" | "info" | "urgent"
  childName: string
  message: string
  action?: string
}

interface AlertsCardProps {
  alerts: Alert[]
}

export function AlertsCard({ alerts }: AlertsCardProps) {
  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "warning":
        return <TrendingDown className="h-4 w-4" />
      case "info":
        return <Clock className="h-4 w-4" />
      case "urgent":
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getAlertColors = (type: Alert["type"]) => {
    switch (type) {
      case "warning":
        return "bg-chart-4/10 text-chart-4 border-chart-4/20"
      case "info":
        return "bg-primary/10 text-primary border-primary/20"
      case "urgent":
        return "bg-destructive/10 text-destructive border-destructive/20"
    }
  }

  if (alerts.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Aucune alerte pour le moment</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Alertes</CardTitle>
        <Link href="/parent/notifications">
          <Button variant="ghost" size="sm" className="text-primary">
            Voir tout
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className={cn("p-3 rounded-lg border", getAlertColors(alert.type))}>
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
              <div className="flex-1">
                <p className="text-sm font-medium">{alert.childName}</p>
                <p className="text-xs opacity-80">{alert.message}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
