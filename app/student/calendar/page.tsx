"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Search, Settings, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const categoryColors = {
  academic: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  events: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  finance: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  administration: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
}

const categories = [
  { id: "all", label: "Tous les cours", count: 12, color: "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20" },
  { id: "academic", label: "Académique", count: 4, color: categoryColors.academic },
  { id: "events", label: "Événements", count: 3, color: categoryColors.events },
  { id: "finance", label: "Finance", count: 2, color: categoryColors.finance },
  { id: "administration", label: "Administration", count: 3, color: categoryColors.administration },
]

const events = [
  {
    id: 1,
    title: "Examen Littérature Anglaise",
    date: "12 Mars 2035",
    time: "09:00 - 11:00",
    location: "Salle 204",
    category: "academic",
    notes: "Apportez votre propre papeterie; aucun appareil électronique n'est autorisé.",
    day: 12,
  },
  {
    id: 2,
    title: "Rencontre Parent-Enseignant (7e & 8e)",
    date: "12 Mars 2035",
    time: "14:00 - 16:00",
    location: "Auditorium",
    category: "events",
    notes: "Les parents sont priés d'arriver 15 minutes à l'avance pour l'inscription.",
    day: 12,
  },
  {
    id: 3,
    title: "Soumission Projet Sciences",
    date: "1 Mars 2035",
    time: "10:00",
    category: "academic",
    day: 1,
  },
  {
    id: 4,
    title: "Révision Dépenses Mensuelles",
    date: "1 Mars 2035",
    time: "15:00 - 16:00",
    category: "finance",
    day: 1,
  },
  {
    id: 5,
    title: "Compétition Sportive",
    date: "6 Mars 2035",
    time: "08:30 - 12:00",
    category: "events",
    day: 6,
  },
]

const daysOfWeek = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
const months = [
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

export default function CalendarPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedEvent, setSelectedEvent] = useState(events[0])
  const [currentMonth, setCurrentMonth] = useState(2) // Mars = 2
  const [currentYear, setCurrentYear] = useState(2035)
  const [view, setView] = useState<"day" | "week" | "month">("month")

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const day = i - firstDay + 1
    return day > 0 && day <= daysInMonth ? day : null
  })

  const getEventsForDay = (day: number | null) => {
    if (!day) return []
    return events.filter((e) => e.day === day)
  }

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  return (
    <div className="h-[calc(100vh-3.5rem)] lg:h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="h-16 border-b border-border/50 bg-background/50 backdrop-blur-lg flex items-center justify-between px-6 sticky top-0 z-10">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold font-display bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Calendrier
          </h1>
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-foreground font-medium">Dashboard</span>
            <ChevronRight className="h-4 w-4" />
            <span>Calendrier</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher..." className="pl-10 w-64 bg-background/50 border-border/50 rounded-xl" />
          </div>
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar className="h-9 w-9 ring-2 ring-primary/20">
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold text-sm">
              KY
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1600px] mx-auto">
          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md",
                  selectedCategory === cat.id
                    ? cat.color + " ring-2 ring-offset-2 ring-primary/50"
                    : "bg-card hover:bg-muted",
                )}
              >
                <div className={cn("h-8 w-8 rounded-xl flex items-center justify-center", cat.color)}>
                  <div className="h-5 w-5 rounded-lg bg-current opacity-20" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">{cat.label}</div>
                  <div className="text-2xl font-bold">{cat.count}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6">
            {/* Calendar */}
            <Card className="p-6 shadow-lg border-border/50 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-bold font-display">
                    {months[currentMonth]} {currentYear}
                  </h2>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={previousMonth}
                      className="h-8 w-8 rounded-lg bg-transparent"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextMonth}
                      className="h-8 w-8 rounded-lg bg-transparent"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {["Jour", "Semaine", "Mois"].map((v) => (
                    <Button
                      key={v}
                      variant={view === v.toLowerCase() ? "default" : "outline"}
                      size="sm"
                      className="rounded-lg"
                      onClick={() => setView(v.toLowerCase() as any)}
                    >
                      {v}
                    </Button>
                  ))}
                  <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-primary/80 rounded-lg shadow-md">
                    <Plus className="h-4 w-4" />
                    Ajouter
                  </Button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
                {calendarDays.map((day, idx) => {
                  const dayEvents = getEventsForDay(day)
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "min-h-24 p-2 rounded-xl border transition-all duration-200",
                        day
                          ? "bg-card hover:bg-muted/50 cursor-pointer border-border/50"
                          : "bg-muted/20 border-transparent",
                      )}
                    >
                      {day && (
                        <>
                          <div className="text-sm font-semibold mb-1">{day}</div>
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map((event) => (
                              <div
                                key={event.id}
                                onClick={() => setSelectedEvent(event)}
                                className={cn(
                                  "text-[10px] p-1.5 rounded-lg font-medium cursor-pointer hover:opacity-80 transition-opacity",
                                  categoryColors[event.category as keyof typeof categoryColors],
                                )}
                              >
                                {event.title.length > 20 ? event.title.slice(0, 20) + "..." : event.title}
                                {event.time && <div className="text-[9px] opacity-75 mt-0.5">{event.time}</div>}
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-[10px] text-muted-foreground font-medium">
                                +{dayEvents.length - 2} de plus
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Event Details */}
            <Card className="p-6 shadow-lg border-border/50 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold font-display">Détails du cours</h3>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>

              {selectedEvent && (
                <div className="space-y-6">
                  <div
                    className={cn(
                      "p-6 rounded-2xl",
                      categoryColors[selectedEvent.category as keyof typeof categoryColors],
                    )}
                  >
                    <Badge className="mb-3 text-xs">
                      {categories.find((c) => c.id === selectedEvent.category)?.label}
                    </Badge>
                    <h4 className="text-xl font-bold mb-4">{selectedEvent.title}</h4>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="font-medium">{selectedEvent.date}</span>
                      </div>

                      {selectedEvent.time && (
                        <div className="flex items-center gap-3">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="font-medium">{selectedEvent.time}</span>
                        </div>
                      )}

                      {selectedEvent.location && (
                        <div className="flex items-center gap-3">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="font-medium">{selectedEvent.location}</span>
                        </div>
                      )}
                    </div>

                    {selectedEvent.notes && (
                      <div className="mt-6 pt-6 border-t border-current/20">
                        <h5 className="font-semibold mb-2 flex items-center gap-2">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          Notes
                        </h5>
                        <p className="text-sm leading-relaxed">{selectedEvent.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Other event on the same day */}
                  {events.filter((e) => e.day === selectedEvent.day && e.id !== selectedEvent.id).length > 0 && (
                    <div>
                      <h5 className="font-semibold mb-3 text-sm text-muted-foreground">Autres événements ce jour</h5>
                      <div className="space-y-2">
                        {events
                          .filter((e) => e.day === selectedEvent.day && e.id !== selectedEvent.id)
                          .map((event) => (
                            <div
                              key={event.id}
                              onClick={() => setSelectedEvent(event)}
                              className={cn(
                                "p-4 rounded-xl cursor-pointer hover:opacity-80 transition-all",
                                categoryColors[event.category as keyof typeof categoryColors],
                              )}
                            >
                              <div className="font-semibold text-sm mb-1">{event.title}</div>
                              {event.time && <div className="text-xs opacity-75">{event.time}</div>}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
