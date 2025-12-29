"use client"

import { useState } from "react"
import { Check, X, Zap, Crown, Sparkles, Star, Building2, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import Image from "next/image"

const plans = [
  {
    name: "Découverte",
    icon: Zap,
    description: "Accès gratuit",
    monthlyPrice: 0,
    yearlyPrice: 0,
    trial: null,
    features: [
      "10 questions par mois",
      "1 examen par mois (sans limite de temps)",
      "Explications simples et progressives",
      "Accès à plusieurs matières scolaires",
      "Test de niveau de base",
    ],
    notIncluded: ["Achat de questions supplémentaires", "Exercices personnalisés", "Envoi d'exercices en photo"],
    cta: "Commencer gratuitement",
    popular: false,
  },
  {
    name: "Essentiel",
    icon: Sparkles,
    description: "Le plus populaire",
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
    notIncluded: ["Envoi de photos (OCR)", "Analyse avancée du mode examen"],
    cta: "Choisir le plan Essentiel",
    popular: true,
  },
  {
    name: "Avancé",
    icon: Star,
    description: "Conçu pour les élèves exigeants",
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
    notIncluded: [],
    cta: "Passer au plan Avancé",
    popular: false,
  },
  {
    name: "Famille",
    icon: Crown,
    description: "Une solution complète",
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
    notIncluded: ["Ajout d'enfant supplémentaire (payant)"],
    cta: "Choisir le plan Famille",
    popular: false,
  },
]

const paymentMethods = [
  {
    name: "Wave",
    logo: "/wave-mobile-money-logo-blue.jpg",
  },
  {
    name: "Orange Money",
    logo: "/orange-money-logo.jpg",
  },
  {
    name: "Visa",
    logo: "/visa-card-logo-blue-gold.jpg",
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
    <section
      id="pricing"
      className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#A04BDE]/5 via-[#3B82F6]/5 to-[#00C2FF]/5"
    >
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
                plan.popular ? "border-[#3B82F6] shadow-lg shadow-[#3B82F6]/10 ring-2 ring-[#3B82F6]" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#A04BDE] to-[#3B82F6] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Le plus choisi
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`h-10 w-10 rounded-xl ${
                    plan.popular ? "bg-gradient-to-br from-[#A04BDE] to-[#3B82F6]" : "bg-[#3B82F6]/10"
                  } flex items-center justify-center`}
                >
                  <plan.icon className={`h-5 w-5 ${plan.popular ? "text-white" : "text-[#3B82F6]"}`} />
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
                <Button
                  className={`w-full mb-4 transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-[#A04BDE] to-[#3B82F6] hover:opacity-90"
                      : "bg-foreground text-background border-foreground hover:bg-background hover:text-foreground border"
                  }`}
                  size="sm"
                >
                  {plan.cta}
                </Button>
              </Link>

              <ul className="space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.notIncluded.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <X className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
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
            <Button
              variant="outline"
              className="gap-2 bg-foreground text-background border-foreground hover:bg-background hover:text-foreground transition-all duration-300"
            >
              <Mail className="h-4 w-4" />
              Contactez-nous pour un devis
            </Button>
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground mb-4">Paiement sécurisé par :</p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="h-12 w-28 relative bg-white rounded-lg border border-border overflow-hidden flex items-center justify-center p-2 shadow-sm"
              >
                <Image
                  src={method.logo || "/placeholder.svg"}
                  alt={method.name}
                  width={100}
                  height={50}
                  className="object-contain max-h-8"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
