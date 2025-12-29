import type React from "react"
import { TaNoteLogo } from "@/components/tanote-logo"
import { TypewriterInput } from "@/components/ui/typewriter-input"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex p-4 bg-muted/30">
      <div className="flex flex-1 max-w-7xl mx-auto overflow-hidden rounded-3xl shadow-2xl bg-background">
        <div
          className="hidden lg:flex lg:w-1/2 p-10 flex-col relative overflow-hidden rounded-l-3xl"
          style={{
            background:
              "linear-gradient(135deg, #1a1a2e 0%, #4a1c6b 20%, #6b2d8b 35%, #9c4dcc 50%, #e07b9a 65%, #f5b895 80%, #ffd4a8 100%)",
          }}
        >
          {/* Decorative gradient spheres */}
          <div
            className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle, #8b5cf6 0%, #6366f1 50%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-20 right-20 w-48 h-48 rounded-full opacity-50 blur-2xl"
            style={{ background: "radial-gradient(circle, #06b6d4 0%, #0ea5e9 50%, transparent 70%)" }}
          />
          <div
            className="absolute top-1/3 right-10 w-32 h-32 rounded-full opacity-40 blur-xl"
            style={{ background: "radial-gradient(circle, #f472b6 0%, #ec4899 50%, transparent 70%)" }}
          />

          <div className="relative z-10">
            <TaNoteLogo size="xl" showText={true} subtitle="Plateforme pour les élèves ivoiriens" light={true} />
          </div>

          <div className="relative z-10 flex-1 flex flex-col justify-center space-y-8 max-w-lg">
            <div>
              <h2 className="text-5xl font-bold text-white text-balance leading-tight">
                Apprends mieux,
                <br />
                progresse plus vite
              </h2>
              <p className="mt-6 text-white/80 text-lg">
                La plateforme éducative qui s'adapte à toi pour t'aider à réussir
              </p>
            </div>

            <div className="pt-4">
              <TypewriterInput />
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 flex flex-col rounded-r-3xl">
          {/* Mobile Header */}
          <div className="lg:hidden p-6 flex justify-center">
            <TaNoteLogo size="md" showText={true} />
          </div>

          <div className="flex-1 flex items-center justify-center p-6 lg:p-12">{children}</div>

          {/* Mobile Footer */}
          <div className="lg:hidden p-6 text-center text-sm text-muted-foreground">
            © 2025 TaNote. Tous droits réservés.
          </div>
        </div>
      </div>
    </div>
  )
}
