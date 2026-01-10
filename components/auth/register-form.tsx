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

  const handleGoogleSignup = () => {
    // Sera remplacé par l'intégration Google OAuth
    console.log("Google signup clicked with role:", role)
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

        <Button
          type="button"
          variant="outline"
          className="w-full h-11 font-medium mb-4 bg-transparent"
          onClick={handleGoogleSignup}
        >
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continuer avec Google
        </Button>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Ou avec ton email</span>
          </div>
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
