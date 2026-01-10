"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, MapPin, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const categories = [
  { id: "all", label: "Tous les emplois du temps", count: 12, color: "bg-blue-100 text-blue-700" },
  { id: "academic", label: "Académique", count: 4, color: "bg-purple-100 text-purple-700" },
  { id: "events", label: "Événements", count: 3, color: "bg-cyan-100 text-cyan-700" },
  { id: "finance", label: "Finance", count: 2, color: "bg-green-100 text-green-700" },
  { id: "admin", label: "Administration", count: 3, color: "bg-pink-100 text-pink-700" },
]

const events = [
  {
    id: 1,
    title: "Examen de littérature anglaise",
    date: "12 Mars, 2035",
    time: "09:00 AM - 11:00 AM",
    location: "Salle 204",
    category: "academic",
    color: "bg-purple-100 text-purple-700 border-purple-200",
    day: 12,
  },
  {
    id: 2,
    title: "Révision mensuelle des dépenses",
    date: "1 Mars, 2035",
    time: "03:00 PM - 06:00 PM",
    category: "finance",
    color: "bg-green-100 text-green-700 border-green-200",
    day: 1,
  },
]

export default function ParentCalendarPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [currentMonth, setCurrentMonth] = useState(2)
  const [currentYear, setCurrentYear] = useState(2035)
  const [isAddingEvent, setIsAddingEvent] = useState(false)

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ]

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendrier</h1>
          <p className="text-gray-500 text-sm">Gérez les emplois du temps de vos enfants</p>
        </div>
        <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter événement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouvel événement</DialogTitle>
              <DialogDescription>Créer un nouvel événement dans le calendrier</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Titre</Label>
                <Input id="title" placeholder="Ex: Réunion parent-professeur" />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start">Heure début</Label>
                  <Input id="start" type="time" />
                </div>
                <div>
                  <Label htmlFor="end">Heure fin</Label>
                  <Input id="end" type="time" />
                </div>
              </div>
              <div>
                <Label htmlFor="location">Lieu</Label>
                <Input id="location" placeholder="Ex: École primaire" />
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Informations complémentaires..." />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Créer événement</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  {monthNames[currentMonth]} {currentYear}
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (currentMonth === 0) {
                        setCurrentMonth(11)
                        setCurrentYear(currentYear - 1)
                      } else {
                        setCurrentMonth(currentMonth - 1)
                      }
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (currentMonth === 11) {
                        setCurrentMonth(0)
                        setCurrentYear(currentYear + 1)
                      } else {
                        setCurrentMonth(currentMonth + 1)
                      }
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                {categories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(selectedCategory === cat.id && "bg-blue-600 hover:bg-blue-700")}
                  >
                    {cat.label} <span className="ml-1 text-xs">({cat.count})</span>
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-2">
                {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const dayEvents = events.filter((e) => e.day === day)
                  return (
                    <button
                      key={day}
                      className={cn(
                        "aspect-square rounded-lg border p-2 hover:bg-gray-50 transition-colors relative",
                        day === 12 && "bg-blue-50 border-blue-200",
                      )}
                    >
                      <span className="text-sm font-medium">{day}</span>
                      {dayEvents.length > 0 && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                          {dayEvents.map((event) => (
                            <div key={event.id} className={cn("h-1 w-1 rounded-full", event.color.split(" ")[0])} />
                          ))}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-80">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Événements à venir</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {events.map((event) => (
                <Card
                  key={event.id}
                  className={cn("cursor-pointer hover:shadow-md transition-shadow", event.color)}
                  onClick={() => setSelectedEvent(event.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={event.color}>{categories.find((c) => c.id === event.category)?.label}</Badge>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
