"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, ChevronLeft, ChevronRight, FileText, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const scoreData = [
  { name: "Réussi", value: 156, color: "#06b6d4" },
  { name: "Échoué", value: 44, color: "#ec4899" },
]

const subjectsData = [
  {
    name: "Mathématiques",
    reussi: 35,
    echoue: 10,
    total: 45,
    color: "#3b82f6",
    failColor: "#ec4899",
  },
  {
    name: "Physique",
    reussi: 28,
    echoue: 7,
    total: 35,
    color: "#8b5cf6",
    failColor: "#ec4899",
  },
  {
    name: "Chimie",
    reussi: 22,
    echoue: 8,
    total: 30,
    color: "#06b6d4",
    failColor: "#ec4899",
  },
  {
    name: "SVT",
    reussi: 26,
    echoue: 4,
    total: 30,
    color: "#10b981",
    failColor: "#ec4899",
  },
  {
    name: "Français",
    reussi: 25,
    echoue: 10,
    total: 35,
    color: "#f59e0b",
    failColor: "#ec4899",
  },
  {
    name: "Anglais",
    reussi: 20,
    echoue: 5,
    total: 25,
    color: "#ef4444",
    failColor: "#ec4899",
  },
]

const progressData = [
  { month: "Août", score: 320 },
  { month: "Sep", score: 380 },
  { month: "Oct", score: 420 },
  { month: "Nov", score: 460 },
  { month: "Déc", score: 490 },
  { month: "Jan", score: 510 },
]

const weeklyActivity = [
  { day: "Jan", rate: 65 },
  { day: "Fév", rate: 70 },
  { day: "Mar", rate: 85 },
  { day: "Avr", rate: 75 },
  { day: "Mai", rate: 90 },
  { day: "Juin", rate: 78 },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Examen de Mathématiques - Algèbre",
    date: "22 Déc 2024",
    time: "09:00 AM",
    duration: "2h 30min",
    type: "exam",
    badge: "URGENT",
    badgeColor: "bg-red-500",
  },
  {
    id: 2,
    title: "Devoir de Physique - Mécanique",
    date: "23 Déc 2024",
    time: "14:00 PM",
    duration: "1h 45min",
    type: "homework",
    badge: "TODAY",
    badgeColor: "bg-amber-500",
  },
  {
    id: 3,
    title: "Quiz SVT - Génétique",
    date: "24 Déc 2024",
    time: "10:30 AM",
    duration: "45min",
    type: "quiz",
    badge: "NOTES",
    badgeColor: "bg-purple-500",
  },
  {
    id: 4,
    title: "Révision Français - Littérature",
    date: "25 Déc 2024",
    time: "16:00 PM",
    duration: "1h 30min",
    type: "review",
    badge: "REPORTS",
    badgeColor: "bg-blue-500",
  },
  {
    id: 5,
    title: "Diagnostic Chimie - Réactions",
    date: "26 Déc 2024",
    time: "11:00 AM",
    duration: "1h 15min",
    type: "diagnostic",
    badge: "REPORTS",
    badgeColor: "bg-blue-500",
  },
]

const recentExercises = [
  {
    id: 1,
    student: "Équations Quadratiques",
    avatar: "EQ",
    subject: "Mathématiques",
    time: "09:00 AM",
    duration: "45 Min",
    status: "completed",
    badges: ["NOTES", "REPORTS"],
  },
  {
    id: 2,
    student: "Forces et Mouvements",
    avatar: "FM",
    subject: "Physique",
    time: "11:30 AM",
    duration: "30 Min",
    status: "in-progress",
    badges: ["REPORTS"],
  },
  {
    id: 3,
    student: "Mitose et Méiose",
    avatar: "MM",
    subject: "SVT",
    time: "02:00 PM",
    duration: "40 Min",
    status: "completed",
    badges: ["NOTES"],
  },
  {
    id: 4,
    student: "Oxydoréduction",
    avatar: "OX",
    subject: "Chimie",
    time: "04:30 PM",
    duration: "35 Min",
    status: "pending",
    badges: ["NOTES", "REPORTS"],
  },
]

const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1)
const currentDay = 22
const totalExercises = 200

export default function OverviewPage() {
  const [selectedDate, setSelectedDate] = useState<number | null>(currentDay)
  const [showAddEventDialog, setShowAddEventDialog] = useState(false)
  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "", type: "exam" })

  return (
    <div className="min-h-screen bg-[#1a1625] p-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Vue d'ensemble</h1>
            <p className="text-slate-400">Suivi détaillé de tes performances et événements</p>
          </div>
          <Button onClick={() => setShowAddEventDialog(true)} className="bg-cyan-500 hover:bg-cyan-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter événement
          </Button>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Stats Cards */}
          <div className="lg:col-span-3 space-y-6">
            {/* Score Card with Donut Chart */}
            <Card className="bg-[#231d30] border-[#2d2640] shadow-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-white">TON SCORE</CardTitle>
                <p className="text-xs text-slate-400">{totalExercises} exercices au total</p>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="relative w-48 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={scoreData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {scoreData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-4xl font-bold text-white">78%</p>
                    <p className="text-sm text-slate-400">de réussite</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 mt-4 w-full justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-500" />
                    <span className="text-xs text-slate-300">Réussi ({scoreData[0].value})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-pink-500" />
                    <span className="text-xs text-slate-300">Échoué ({scoreData[1].value})</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Track Exercises Card */}
            <Card className="bg-[#231d30] border-[#2d2640] shadow-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-white">SUIVI PAR MATIÈRE</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {subjectsData.map((subject, idx) => {
                  const successRate = Math.round((subject.reussi / subject.total) * 100)
                  const pieData = [
                    { value: subject.reussi, color: subject.color },
                    { value: subject.echoue, color: subject.failColor },
                  ]

                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={20}
                              outerRadius={28}
                              paddingAngle={0}
                              dataKey="value"
                              startAngle={90}
                              endAngle={450}
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-xs font-bold text-white">{successRate}%</p>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{subject.name}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: subject.color }} />
                            <span className="text-[10px] text-slate-400">{subject.reussi}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-pink-500" />
                            <span className="text-[10px] text-slate-400">{subject.echoue}</span>
                          </div>
                          <span className="text-[10px] text-slate-500">/ {subject.total}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Live Streaming Card */}
            <Card className="bg-[#0f0d15] border-[#2d2640] shadow-2xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white text-sm font-medium">En direct</p>
                  <Button size="icon" variant="ghost" className="h-6 w-6 text-slate-400">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-slate-400 text-xs">Aucune session en cours</div>
              </CardContent>
            </Card>
          </div>

          {/* Middle - Charts */}
          <div className="lg:col-span-6 space-y-6">
            {/* Progress History Chart */}
            <Card className="bg-[#231d30] border-[#2d2640] shadow-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white">HISTORIQUE DE PROGRESSION</CardTitle>
                  <select className="bg-[#1a1625] border-[#2d2640] text-slate-300 text-xs rounded-lg px-3 py-1.5">
                    <option>6 derniers mois</option>
                    <option>3 derniers mois</option>
                    <option>Ce mois-ci</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={progressData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2d2640" vertical={false} />
                    <XAxis dataKey="month" stroke="#64748b" tick={{ fill: "#64748b", fontSize: 12 }} />
                    <YAxis
                      stroke="#64748b"
                      tick={{ fill: "#64748b", fontSize: 12 }}
                      domain={[0, 600]}
                      ticks={[0, 200, 400, 600]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1625",
                        border: "1px solid #2d2640",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: "#ec4899", r: 6 }}
                      activeDot={{ r: 8, fill: "#ec4899" }}
                      fill="url(#colorScore)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Re-booking Rate Chart */}
            <Card className="bg-[#231d30] border-[#2d2640] shadow-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white">TAUX DE RÉUSSITE</CardTitle>
                  <select className="bg-[#1a1625] border-[#2d2640] text-slate-300 text-xs rounded-lg px-3 py-1.5">
                    <option>Cette semaine</option>
                    <option>Ce mois-ci</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={weeklyActivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2d2640" vertical={false} />
                    <XAxis dataKey="day" stroke="#64748b" tick={{ fill: "#64748b", fontSize: 12 }} />
                    <YAxis
                      stroke="#64748b"
                      tick={{ fill: "#64748b", fontSize: 12 }}
                      domain={[0, 100]}
                      ticks={[0, 20, 40, 60, 80, 100]}
                      label={{ value: "%", angle: 0, position: "top", fill: "#64748b", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1625",
                        border: "1px solid #2d2640",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                    />
                    <Bar dataKey="rate" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Latest Exercises */}
            <Card className="bg-[#231d30] border-[#2d2640] shadow-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-white">DERNIERS EXERCICES</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentExercises.map((exercise) => (
                    <div key={exercise.id} className="flex items-center gap-4 p-4 bg-[#1a1625] rounded-xl">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-white font-bold text-sm">
                          {exercise.avatar}
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{exercise.student}</p>
                          <p className="text-slate-400 text-xs">{exercise.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Clock className="h-3 w-3" />
                        <span>{exercise.time}</span>
                        <span>•</span>
                        <span>{exercise.duration}</span>
                      </div>
                      <div className="flex gap-2">
                        {exercise.badges.map((badge, idx) => (
                          <Badge
                            key={idx}
                            className={cn(
                              "text-[10px] px-2 py-0.5",
                              badge === "NOTES"
                                ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                                : "bg-blue-500/20 text-blue-400 border-blue-500/30",
                            )}
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Calendar & Events */}
          <div className="lg:col-span-3 space-y-6">
            {/* Mini Calendar */}
            <Card className="bg-[#231d30] border-[#2d2640] shadow-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white">CALENDRIER</CardTitle>
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 text-slate-400 hover:text-white hover:bg-[#2d2640]"
                      onClick={() => console.log("[v0] Previous month")}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 text-slate-400 hover:text-white hover:bg-[#2d2640]"
                      onClick={() => console.log("[v0] Next month")}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-slate-400">Juin 2024</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-3">
                  {["D", "L", "M", "M", "J", "V", "S"].map((day, idx) => (
                    <div key={idx} className="text-center text-[10px] font-medium text-slate-500 py-1">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {[25, 26, 27, 28, 29, 30].map((day) => (
                    <div
                      key={`prev-${day}`}
                      className="aspect-square flex items-center justify-center text-[11px] text-slate-600"
                    >
                      {day}
                    </div>
                  ))}
                  {daysInMonth.slice(0, 25).map((day) => (
                    <button
                      key={day}
                      onClick={() => {
                        setSelectedDate(day)
                        console.log(`[v0] Selected date: ${day}`)
                      }}
                      className={cn(
                        "aspect-square flex items-center justify-center rounded-lg text-[11px] font-medium transition-all relative",
                        day === currentDay
                          ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/50"
                          : day === selectedDate
                            ? "bg-[#2d2640] text-white"
                            : "text-slate-300 hover:bg-[#2d2640]/50 hover:text-white",
                      )}
                    >
                      {day}
                      {[1, 7, 14, 22, 23, 24].includes(day) && day !== currentDay && (
                        <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-pink-500" />
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card className="bg-[#231d30] border-[#2d2640] shadow-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-white">ÉVÉNEMENTS À VENIR</CardTitle>
                <Badge className="bg-amber-500 text-white text-[10px] w-fit">TODAY</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 bg-[#1a1625] rounded-xl border border-[#2d2640] hover:border-cyan-500/30 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div
                              className={cn(
                                "w-2 h-2 rounded-full",
                                event.type === "exam"
                                  ? "bg-pink-500"
                                  : event.type === "homework"
                                    ? "bg-cyan-500"
                                    : event.type === "quiz"
                                      ? "bg-purple-500"
                                      : "bg-blue-500",
                              )}
                            />
                            <p className="text-white text-sm font-medium">{event.title}</p>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 ml-4">
                            <CalendarIcon className="h-3 w-3" />
                            <span>{event.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between ml-4">
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <Clock className="h-3 w-3" />
                          <span>
                            {event.time} • {event.duration}
                          </span>
                        </div>
                        <Badge className={cn("text-[9px] px-2 py-0.5", event.badgeColor)}>{event.badge}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Simple dialog for adding events */}
        {showAddEventDialog && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowAddEventDialog(false)}
          >
            <div
              className="bg-[#231d30] border-[#2d2640] rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-white mb-4">Ajouter un événement</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-400 block mb-2">Titre</label>
                  <input
                    type="text"
                    className="w-full bg-[#1a1625] border-[#2d2640] text-white rounded-lg px-3 py-2 text-sm"
                    placeholder="Ex: Examen de Mathématiques"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 block mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full bg-[#1a1625] border-[#2d2640] text-white rounded-lg px-3 py-2 text-sm"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 block mb-2">Heure</label>
                  <input
                    type="time"
                    className="w-full bg-[#1a1625] border-[#2d2640] text-white rounded-lg px-3 py-2 text-sm"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 block mb-2">Type</label>
                  <select
                    className="w-full bg-[#1a1625] border-[#2d2640] text-white rounded-lg px-3 py-2 text-sm"
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                  >
                    <option>Examen</option>
                    <option>Devoir</option>
                    <option>Quiz</option>
                    <option>Révision</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={() => setShowAddEventDialog(false)}
                    variant="outline"
                    className="flex-1 border-[#2d2640] text-slate-300 hover:bg-[#2d2640]"
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={() => {
                      console.log("[v0] Event added")
                      setShowAddEventDialog(false)
                    }}
                    className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white"
                  >
                    Ajouter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
