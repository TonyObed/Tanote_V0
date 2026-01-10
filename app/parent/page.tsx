"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, BookOpen, Clock, ChevronLeft, ChevronRight, FileText, Users, Check, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts"

const childrenData = [
  {
    id: "1",
    name: "Kouamé",
    fullName: "Kouamé Yao",
    avatar: "KY",
    color: "from-blue-500 to-cyan-500",
    stats: {
      score: 78,
      trend: 5,
      exercises: 23,
      weeklyTime: "4h 30m",
    },
    subjectProgress: [
      { name: "Maths", reussi: 18, echoue: 5, color: "#3b82f6" },
      { name: "Physique", reussi: 15, echoue: 7, color: "#8b5cf6" },
      { name: "Chimie", reussi: 12, echoue: 3, color: "#06b6d4" },
    ],
    progressHistory: [
      { month: "Sep", score: 65 },
      { month: "Oct", score: 70 },
      { month: "Nov", score: 73 },
      { month: "Déc", score: 75 },
      { month: "Jan", score: 78 },
    ],
  },
  {
    id: "2",
    name: "Aya",
    fullName: "Aya Koné",
    avatar: "AK",
    color: "from-purple-500 to-pink-500",
    stats: {
      score: 82,
      trend: -3,
      exercises: 15,
      weeklyTime: "2h 15m",
    },
    subjectProgress: [
      { name: "Maths", reussi: 20, echoue: 2, color: "#3b82f6" },
      { name: "Français", reussi: 18, echoue: 4, color: "#f59e0b" },
      { name: "Anglais", reussi: 16, echoue: 3, color: "#ef4444" },
    ],
    progressHistory: [
      { month: "Sep", score: 80 },
      { month: "Oct", score: 85 },
      { month: "Nov", score: 84 },
      { month: "Déc", score: 83 },
      { month: "Jan", score: 82 },
    ],
  },
]

const goalsData = [
  {
    title: "Terminer 13 sessions",
    description: "9 sessions faites • 4 restantes",
    progress: 69,
    total: "Total",
  },
  {
    title: "Terminer 7 sessions",
    description: "2 sessions faites • 5 restantes",
    progress: 29,
    total: "Algèbre Linéaire",
  },
]

const tutorsData = [
  {
    id: "1",
    name: "Jonathan",
    subject: "Algèbre Linéaire II",
    description: "Cherche tuteur pour développement personnel",
    avatar: "J",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "2",
    name: "Kate",
    subject: "Calculus",
    description: "Cherche tuteur pour préparation test",
    avatar: "K",
    color: "from-pink-500 to-rose-500",
  },
]

const subjectsData = [
  {
    id: "1",
    title: "Algèbre Linéaire I",
    tutor: "Tuteur: Oliver Smith",
    schedule: "Lundis • 4:30 - 6:00 PM",
    icon: BookOpen,
  },
  {
    id: "2",
    title: "Géométrie",
    tutor: "Tuteur: Oliver Smith",
    schedule: "Lundis • 4:30 - 6:00 PM",
    icon: BookOpen,
  },
]

const activityData = [
  { day: "Dim", value: 5 },
  { day: "Lun", value: 8 },
  { day: "Mar", value: 6 },
  { day: "Mer", value: 7 },
  { day: "Jeu", value: 5 },
  { day: "Ven", value: 9 },
  { day: "Sam", value: 10 },
]

const upcomingLessons = [
  {
    id: "1",
    subject: "Mathématiques",
    date: "19 Mai • 4:30 - 6:00 PM",
    attendees: ["Kouamé", "2 autres"],
    day: "Lun",
  },
  {
    id: "2",
    subject: "Physique-Chimie",
    date: "19 Mai • 4:30 - 6:00 PM",
    attendees: ["Kouamé", "2 autres"],
    day: "Mar",
  },
  {
    id: "3",
    subject: "SVT",
    date: "20 Mai • 4:30 - 6:00 PM",
    attendees: ["Kouamé", "2 autres"],
    day: "Mer",
  },
  {
    id: "4",
    subject: "Français",
    date: "21 Mai • 4:30 - 6:00 PM",
    attendees: ["Kouamé", "2 autres"],
    day: "Jeu",
  },
]

const alerts = [
  {
    id: "1",
    type: "warning",
    childName: "Kouamé",
    message: "Score en baisse en Physique-Chimie (-12% ce mois)",
    icon: Heart,
  },
  {
    id: "2",
    type: "info",
    childName: "Aya",
    message: "N'a pas pratiqué depuis 2 jours",
    icon: FileText,
  },
]

const recentActivities = [
  {
    id: "1",
    childName: "Kouamé",
    childAvatar: "KY",
    type: "exercise",
    title: "Exercice complété",
    description: "Équations du second degré - Mathématiques",
    time: "Il y a 2h",
    score: 85,
    badge: "RÉUSSI",
    badgeColor: "bg-cyan-500",
  },
  {
    id: "2",
    childName: "Aya",
    childAvatar: "AK",
    type: "achievement",
    title: "Nouveau badge obtenu",
    description: "Série de 7 jours consécutifs",
    time: "Hier",
    badge: "BADGE",
    badgeColor: "bg-purple-500",
  },
  {
    id: "3",
    childName: "Kouamé",
    childAvatar: "KY",
    type: "diagnostic",
    title: "Diagnostic terminé",
    description: "Physique-Chimie",
    time: "Il y a 2 jours",
    score: 68,
    badge: "URGENT",
    badgeColor: "bg-pink-500",
  },
]

const currentDate = new Date()
const currentDay = currentDate.getDate()
const currentMonth = currentDate.toLocaleString("fr-FR", { month: "long" })
const currentYear = currentDate.getFullYear()
const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1)

export default function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState(childrenData[0])
  const [selectedDate, setSelectedDate] = useState<number | null>(currentDay)
  const [tutorIndex, setTutorIndex] = useState(0)

  const globalStats = {
    totalChildren: childrenData.length,
    averageScore: Math.round(childrenData.reduce((acc, c) => acc + c.stats.score, 0) / childrenData.length),
    totalExercises: childrenData.reduce((acc, c) => acc + c.stats.exercises, 0),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content Container */}
      <div className="flex">
        {/* Center Content */}
        <div className="flex-1 p-8 max-w-4xl">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Bienvenue, {selectedChild.fullName.split(" ")[1]}!
            </h1>
            <p className="text-gray-500 text-sm">Planifiez le processus d'apprentissage de vos enfants</p>
          </div>

          {/* Children Selector */}
          <div className="flex items-center gap-3 mb-8">
            {childrenData.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child)}
                className={cn(
                  "flex flex-col items-center gap-2 pb-3 transition-all",
                  selectedChild.id === child.id && "border-b-2 border-blue-600",
                )}
              >
                <Avatar
                  className={cn("h-14 w-14", selectedChild.id === child.id && "ring-2 ring-blue-600 ring-offset-2")}
                >
                  <AvatarFallback className={cn("bg-gradient-to-br text-white font-semibold", child.color)}>
                    {child.avatar}
                  </AvatarFallback>
                </Avatar>
                <span
                  className={cn(
                    "text-sm font-medium",
                    selectedChild.id === child.id ? "text-gray-900" : "text-gray-500",
                  )}
                >
                  {child.name}
                </span>
              </button>
            ))}
            <button className="flex flex-col items-center gap-2">
              <div className="h-14 w-14 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors">
                <Plus className="h-6 w-6 text-gray-400" />
              </div>
              <span className="text-sm font-medium text-gray-500">Ajouter</span>
            </button>
          </div>

          {/* Goals for Child */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Objectifs pour {selectedChild.name}</h2>
            <div className="grid grid-cols-2 gap-4">
              {goalsData.map((goal, idx) => (
                <Card key={idx} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="relative w-16 h-16">
                        <svg className="w-16 h-16 transform -rotate-90">
                          <circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="#3b82f6"
                            strokeWidth="6"
                            fill="none"
                            strokeDasharray={`${goal.progress * 1.76} 176`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-gray-900">{goal.progress}%</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{goal.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">{goal.description}</p>
                    <p className="text-xs text-gray-400">{goal.total}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recommended Tutors */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Tuteurs recommandés</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-transparent"
                  onClick={() => setTutorIndex(Math.max(0, tutorIndex - 1))}
                  disabled={tutorIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-transparent"
                  onClick={() => setTutorIndex(Math.min(tutorsData.length - 1, tutorIndex + 1))}
                  disabled={tutorIndex === tutorsData.length - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {tutorsData.map((tutor) => (
                <Card key={tutor.id} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-gray-900">{tutor.subject}</CardTitle>
                    <p className="text-sm text-gray-500">{tutor.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className={cn("bg-gradient-to-br text-white font-semibold", tutor.color)}>
                            {tutor.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{tutor.name}</p>
                          <Button variant="link" className="text-xs p-0 h-auto text-blue-600 hover:text-blue-700">
                            voir profil
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 rounded-full border-gray-200 bg-transparent"
                        >
                          <Heart className="h-4 w-4 text-gray-400" />
                        </Button>
                        <Button size="icon" className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700">
                          <Check className="h-5 w-5 text-white" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Subjects */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Matières</h2>
            <div className="grid grid-cols-2 gap-4">
              {subjectsData.map((subject) => (
                <Card key={subject.id} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <subject.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{subject.title}</h3>
                        <p className="text-xs text-gray-500">{subject.tutor}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full text-sm bg-transparent">
                      <Clock className="h-4 w-4 mr-2" />
                      Planifier
                    </Button>
                    <p className="text-xs text-gray-500 mt-3">{subject.schedule}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 p-6 space-y-6 overflow-y-auto sticky top-0 h-screen">
          {/* Daily Activity */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Activité quotidienne</h3>
            <ResponsiveContainer width="100%" height={100}>
              <BarChart data={activityData}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Upcoming Lessons */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Cours à venir</h3>
            <div className="space-y-3">
              {upcomingLessons.map((lesson) => (
                <Card key={lesson.id} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-center min-w-[40px]">
                        <p className="text-xs font-medium text-gray-500">{lesson.day}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm mb-1">{lesson.subject}</p>
                        <p className="text-xs text-gray-500 mb-2">{lesson.date}</p>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-gray-400" />
                          <p className="text-xs text-gray-500">{lesson.attendees.join(" et ")}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
