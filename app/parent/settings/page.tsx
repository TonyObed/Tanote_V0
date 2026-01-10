"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileForm } from "@/components/settings/profile-form"
import { PasswordForm } from "@/components/settings/password-form"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Lock, Bell, UserPlus } from "lucide-react"

// Mock parent data
const mockParent = {
  firstName: "Amadou",
  lastName: "Koné",
  email: "amadou.kone@email.com",
  phone: "+225 07 98 76 54",
  role: "parent" as const,
}

function AddChildCard() {
  const [childCode, setChildCode] = useState("")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter un enfant</CardTitle>
        <CardDescription>Liez le compte de votre enfant avec son code unique</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="childCode">Code de liaison</Label>
          <Input
            id="childCode"
            placeholder="ABC-123-XYZ"
            value={childCode}
            onChange={(e) => setChildCode(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Demandez à votre enfant de générer un code de liaison depuis son compte TaNote.
          </p>
        </div>
        <Button disabled={!childCode} className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="mr-2 h-4 w-4" />
          Lier le compte
        </Button>
      </CardContent>
    </Card>
  )
}

export default function ParentSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-500 text-sm">Gérez votre compte parent et vos préférences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-auto p-1">
          <TabsTrigger value="profile" className="flex items-center gap-2 py-2.5">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="password" className="flex items-center gap-2 py-2.5">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Sécurité</span>
          </TabsTrigger>
          <TabsTrigger value="children" className="flex items-center gap-2 py-2.5">
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Enfants</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2 py-2.5">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileForm user={mockParent} />
        </TabsContent>

        <TabsContent value="password">
          <PasswordForm />
        </TabsContent>

        <TabsContent value="children">
          <AddChildCard />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
