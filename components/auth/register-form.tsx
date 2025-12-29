"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, GraduationCap, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type UserRole = "student" | "parent"

export function RegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState<UserRole>("student")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulation - sera remplacé par le backend
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <Card className="w-full max-w-md border-0 shadow-xl bg-card">
      <CardHeader className="space-y-1 text-center pb-2">
        <CardTitle className="text-2xl font-bold tracking-tight">Crée ton compte</CardTitle>
        <CardDescription className="text-muted-foreground">Rejoins TaNote et commence à progresser</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
              role === "student" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
            )}
          >
            <div
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center",
                role === "student" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
              )}
            >
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className={cn("text-sm font-medium", role === "student" ? "text-primary" : "text-muted-foreground")}>
              Je suis élève
            </span>
          </button>

          <button
            type="button"
            onClick={() => setRole("parent")}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
              role === "parent" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
            )}
          >
            <div
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center",
                role === "parent" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
              )}
            >
              <Users className="h-5 w-5" />
            </div>
            <span className={cn("text-sm font-medium", role === "parent" ? "text-primary" : "text-muted-foreground")}>
              Je suis parent
            </span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">
                Prénom
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Prénom"
                  className="pl-10 h-11"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium">
                Nom
              </Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Nom"
                className="h-11"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Adresse email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="ton.email@exemple.com"
                className="pl-10 h-11"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Mot de passe
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 pr-10 h-11"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirmer le mot de passe
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 h-11"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-11 font-semibold" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Création du compte...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Créer mon compte
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </Button>
        </form>

        <p className="mt-4 text-xs text-center text-muted-foreground">
          En créant un compte, tu acceptes nos{" "}
          <Link href="/terms" className="text-primary hover:underline">
            conditions d'utilisation
          </Link>{" "}
          et notre{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            politique de confidentialité
          </Link>
        </p>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">Déjà un compte ? </span>
          <Link href="/auth/login" className="text-primary font-medium hover:underline">
            Connecte-toi
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
