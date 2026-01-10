"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCheck, AlertCircle, Info, Award } from "lucide-react"
import { cn } from "@/lib/utils"

const notifications = [
  {
    id: 1,
    type: "warning",
    icon: AlertCircle,
    title: "Baisse de performance détectée",
    description: "Kouamé a obtenu 55% en Physique-Chimie (-12% ce mois)",
    time: "Il y a 2h",
    read: false,
    color: "text-red-600 bg-red-50",
  },
  {
    id: 2,
    type: "info",
    icon: Info,
    title: "Rappel de pratique",
    description: "Aya n'a pas pratiqué depuis 2 jours",
    time: "Il y a 5h",
    read: false,
    color: "text-blue-600 bg-blue-50",
  },
  {
    id: 3,
    type: "success",
    icon: Award,
    title: "Nouvel accomplissement",
    description: "Kouamé a terminé 10 exercices consécutifs avec succès",
    time: "Hier",
    read: true,
    color: "text-green-600 bg-green-50",
  },
]

export default function ParentNotificationsPage() {
  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 text-sm">Restez informé de l'activité de vos enfants</p>
        </div>
        <Button variant="outline">
          <CheckCheck className="h-4 w-4 mr-2" />
          Tout marquer comme lu
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <Card key={notif.id} className={cn("hover:shadow-md transition-shadow", !notif.read && "border-blue-200")}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", notif.color)}>
                  <notif.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">{notif.title}</h3>
                    <span className="text-xs text-gray-500">{notif.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notif.description}</p>
                  {!notif.read && <Badge className="bg-blue-600 text-white">Nouveau</Badge>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
