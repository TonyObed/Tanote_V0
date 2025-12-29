"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileForm } from "@/components/settings/profile-form"
import { PasswordForm } from "@/components/settings/password-form"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { PreferencesSettings } from "@/components/settings/preferences-settings"
import { DangerZone } from "@/components/settings/danger-zone"
import { User, Lock, Bell, Settings, AlertTriangle } from "lucide-react"

// Mock user data
const mockUser = {
  firstName: "Kouamé",
  lastName: "Yao",
  email: "kouame.yao@email.com",
  phone: "+225 07 12 34 56",
  class: "Terminale D",
  school: "Lycée Classique d'Abidjan",
  avatar: "/student-avatar.png",
  role: "student" as const,
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground">Gérez votre compte et vos préférences</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto p-1">
          <TabsTrigger value="profile" className="flex items-center gap-2 py-2.5">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="password" className="flex items-center gap-2 py-2.5">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Sécurité</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2 py-2.5">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2 py-2.5">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Préférences</span>
          </TabsTrigger>
          <TabsTrigger
            value="danger"
            className="flex items-center gap-2 py-2.5 text-destructive data-[state=active]:text-destructive"
          >
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">Danger</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileForm user={mockUser} />
        </TabsContent>

        <TabsContent value="password">
          <PasswordForm />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="preferences">
          <PreferencesSettings />
        </TabsContent>

        <TabsContent value="danger">
          <DangerZone />
        </TabsContent>
      </Tabs>
    </div>
  )
}
