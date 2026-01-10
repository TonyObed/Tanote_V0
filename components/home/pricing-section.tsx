"use client"

import { useState } from "react"
import { Check, Zap, Sparkles, Star, Crown, Building2, Mail, X } from "lucide-react"
import { ButtonWithPixel } from "@/components/ui/button-with-pixel"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { LogoCloud } from "@/components/ui/logo-cloud"

const plans = [
  {
    name: "Découverte",
    icon: Zap,
    description: "Accès gratuit",
    subtitle: "Idéal pour découvrir TaNote sans engagement",
    monthlyPrice: 0,
    yearlyPrice: 0,
    trial: null,
    features: [
      "10 questions par mois",
      "1 examen par mois (sans limite de temps)",
      "Explications simples et progressives",
      "Accès à plusieurs matières scolaires",
      "Test de niveau de base",
      "Achat de questions supplémentaires",
    ],
    limitations: ["Exercices personnalisés", "Envoi d'exercices en photo"],
    cta: "Commencer gratuitement",
    popular: false,
  },
  {
    name: "Essentiel",
    icon: Sparkles,
    description: "Le plus populaire",
    subtitle: "Le meilleur équilibre entre prix et efficacité",
    monthlyPrice: 4000,
    yearlyPrice: 38400,
    trial: null,
    features: [
      "40 questions par mois",
      "3 examens par mois (chronométrés)",
      "Exercices générés par IA selon le niveau",
      "Exercices ciblés sur les lacunes",
      "Mode « Apprendre la méthode »",
      "Mode examen standard (conditions réelles)",
      "Test de niveau complet",
      "Suivi de progression",
      "Historique des activités",
      "Toutes les matières scolaires",
    ],
    limitations: ["Envoi de photos (OCR)", "Analyse avancée du mode examen"],
    cta: "Choisir le plan Essentiel",
    popular: true,
  },
  {
    name: "Avancé",
    icon: Star,
    description: "Le plus choisi",
    subtitle: "Conçu pour les élèves exigeants et les objectifs académiques élevés",
    monthlyPrice: 7500,
    yearlyPrice: 72000,
    trial: null,
    features: [
      "100 questions par mois",
      "7 examens par mois",
      "Exercices avancés et personnalisés",
      "Diagnostic approfondi des lacunes",
      "Mode professeur IA avec reformulation",
      "Mode examen intelligent adapté au niveau",
      "Analyse détaillée des erreurs",
      "Suivi de progression avancé",
      "Envoi d'exercices en photo (OCR)",
      "Traitement prioritaire des demandes",
      "Toutes les matières scolaires",
    ],
    limitations: [],
    subtitle2: "Une expérience proche d'un accompagnement individuel",
    cta: "Passer au plan Avancé",
    popular: false,
  },
  {
    name: "Famille",
    icon: Crown,
    description: "Une solution complète",
    subtitle: "La solution idéale pour une réussite scolaire encadrée à domicile",
    monthlyPrice: 13000,
    yearlyPrice: 124800,
    trial: null,
    features: [
      "220 questions par mois",
      "15 examens par mois par enfant",
      "2 enfants inclus par défaut",
      "Comptes séparés pour chaque enfant",
      "Exercices personnalisés par enfant",
      "Cours adaptés à chaque niveau",
      "Mode examen individuel",
      "Suivi de progression détaillé par enfant",
      "Tableau de bord parents avec statistiques",
      "Rapports de progression et alertes",
      "Envoi d'exercices en photo (OCR)",
      "Support prioritaire parents",
    ],
    limitations: ["Ajout d'enfant supplémentaire (payant)"],
    cta: "Choisir le plan Famille",
    popular: false,
  },
]

const logos = [
  {
    src: "https://svgl.app/library/nvidia-wordmark-light.svg",
    alt: "Nvidia",
  },
  {
    src: "https://svgl.app/library/openai_wordmark_light.svg",
    alt: "OpenAI",
  },
  {
    src: "https://svgl.app/library/vercel_wordmark.svg",
    alt: "Vercel",
  },
  {
    src: "https://svgl.app/library/github_wordmark_light.svg",
    alt: "GitHub",
  },
  {
    src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
    alt: "Claude AI",
  },
]

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-CI", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <section id="pricing" className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-balance">Un plan adapté à chaque besoin</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Choisis le plan qui correspond à tes objectifs. Tu peux changer ou annuler à tout moment.
          </p>

          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm ${!isYearly ? "font-semibold" : "text-muted-foreground"}`}>Mensuel</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={`text-sm ${isYearly ? "font-semibold" : "text-muted-foreground"}`}>Annuel</span>
            {isYearly && (
              <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full font-medium">
                -20% d'économie
              </span>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-card rounded-2xl p-5 lg:p-6 border ${
                plan.popular ? "border-primary shadow-lg shadow-primary/10 ring-2 ring-primary" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Populaire
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`h-10 w-10 rounded-xl ${plan.popular ? "bg-primary" : "bg-primary/10"} flex items-center justify-center`}
                >
                  <plan.icon className={`h-5 w-5 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground">{plan.description}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">
                    {formatPrice(isYearly ? plan.yearlyPrice : plan.monthlyPrice)}
                  </span>
                  <span className="text-muted-foreground text-sm">FCFA/{isYearly ? "an" : "mois"}</span>
                </div>
                {isYearly && plan.monthlyPrice > 0 && (
                  <p className="text-xs text-success mt-1">
                    Économise {formatPrice(plan.monthlyPrice * 12 - plan.yearlyPrice)} FCFA/an
                  </p>
                )}
              </div>

              <Link href="/auth/register">
                <ButtonWithPixel
                  className={`w-full mb-4 transition-all duration-300 ${
                    plan.popular
                      ? ""
                      : "bg-foreground text-background border-foreground hover:bg-background hover:text-foreground border"
                  }`}
                  size="sm"
                  variant={plan.popular ? "default" : "outline"}
                  pixelColors={plan.popular ? ["#0ea5e9", "#7dd3fc", "#e0f2fe"] : ["#94a3b8", "#cbd5e1", "#e2e8f0"]}
                  pixelGap={8}
                  pixelSpeed={30}
                >
                  {plan.cta}
                </ButtonWithPixel>
              </Link>

              {plan.subtitle && <p className="text-xs text-muted-foreground mb-3 italic">{plan.subtitle}</p>}

              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.limitations.map((limitation, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <X className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                    <span>{limitation}</span>
                  </li>
                ))}
              </ul>

              {plan.subtitle2 && <p className="text-xs text-muted-foreground mt-3 italic">{plan.subtitle2}</p>}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-card border border-border rounded-2xl p-6 sm:p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-2">Vous êtes un établissement scolaire ?</h3>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Nous proposons des tarifs spéciaux pour les écoles, collèges, lycées et universités.
          </p>
          <Link href="#contact">
            <ButtonWithPixel
              variant="outline"
              className="gap-2 bg-foreground text-background border-foreground hover:bg-background hover:text-foreground transition-all duration-300"
              pixelColors={["#94a3b8", "#cbd5e1", "#e2e8f0"]}
              pixelGap={8}
              pixelSpeed={25}
            >
              <Mail className="h-4 w-4" />
              Contactez-nous pour un devis
            </ButtonWithPixel>
          </Link>
        </div>

        <div className="mt-8">
          <div
            aria-hidden="true"
            className={cn(
              "-top-1/2 -translate-x-1/2 pointer-events-none absolute left-1/2 h-[120vmin] w-[120vmin] rounded-b-full",
              "bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]",
              "blur-[30px]",
            )}
          />
          <div className="w-full">
            <h3 className="mb-5 text-center">
              <span className="block font-medium text-lg text-muted-foreground">Ils nous font confiance</span>
              <span className="font-black text-xl text-primary tracking-tight md:text-2xl">
                Partenaires technologiques
              </span>
            </h3>

            <LogoCloud logos={logos} />
          </div>
        </div>
      </div>
    </section>
  )
}
