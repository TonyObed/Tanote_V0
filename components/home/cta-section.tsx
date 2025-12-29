import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Sparkles, Zap, Users } from "lucide-react"

const benefits = [
  { icon: Zap, text: "Inscription en 30 secondes" },
  { icon: CheckCircle2, text: "Sans carte bancaire" },
  { icon: Users, text: "+12 500 élèves nous font confiance" },
]

export function CTASection() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-3xl p-8 sm:p-10 lg:p-14 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-center mb-5">
              <div className="inline-flex items-center gap-2 bg-white text-primary rounded-full px-5 py-2 text-sm font-bold shadow-lg">
                <Sparkles className="h-4 w-4" />
                <span>Rejoins la communauté TaNote</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 text-center text-balance drop-shadow-md">
              Prêt à transformer tes résultats scolaires ?
            </h2>
            <p className="text-white/95 max-w-2xl mx-auto mb-6 text-base sm:text-lg text-center leading-relaxed drop-shadow-sm">
              Ne laisse plus les exercices difficiles te bloquer. Avec TaNote, chaque problème devient une opportunité
              d'apprendre.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 h-12 gap-2 group font-semibold shadow-lg bg-white text-primary border-white hover:bg-primary hover:text-white hover:border-white transition-all duration-300"
                >
                  Commencer gratuitement maintenant
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 text-white">
                  <benefit.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
