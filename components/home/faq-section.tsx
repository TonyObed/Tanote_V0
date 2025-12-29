"use client"

import { useState } from "react"
import { ChevronDown, MessageCircleQuestion } from "lucide-react"

const faqs = [
  {
    question: "Comment TaNote analyse-t-il mes exercices ?",
    answer:
      "TaNote utilise une intelligence artificielle avancée qui analyse tes réponses, identifie tes erreurs et comprend ta façon de raisonner. L'IA te fournit ensuite des explications personnalisées et adaptées à ton niveau pour t'aider à progresser.",
  },
  {
    question: "Est-ce que TaNote remplace un professeur particulier ?",
    answer:
      "TaNote est un complément idéal à l'enseignement traditionnel. Il t'offre une aide instantanée 24h/24, des explications détaillées et un suivi personnalisé. Pour les questions complexes, nos experts pédagogiques peuvent aussi intervenir.",
  },
  {
    question: "Quelles matières sont disponibles ?",
    answer:
      "TaNote couvre les principales matières du programme ivoirien : Mathématiques, Physique-Chimie, Français, Anglais, Histoire-Géographie, Sciences de la Vie et de la Terre (SVT), et Philosophie. De nouvelles matières sont ajoutées régulièrement.",
  },
  {
    question: "Comment fonctionne le suivi parental ?",
    answer:
      "Les parents peuvent créer un compte et lier les profils de leurs enfants. Ils ont accès à un tableau de bord complet avec les statistiques de progression, le temps passé, les matières travaillées et des alertes en cas de difficultés.",
  },
  {
    question: "Puis-je utiliser TaNote sur mobile ?",
    answer:
      "Oui ! TaNote est entièrement responsive et fonctionne parfaitement sur smartphone, tablette et ordinateur. Tu peux étudier où tu veux, quand tu veux, même hors connexion pour certaines fonctionnalités.",
  },
  {
    question: "Comment puis-je payer mon abonnement ?",
    answer:
      "TaNote accepte les paiements par Mobile Money (Orange Money, MTN Money, Moov Money), par carte bancaire (Visa, Mastercard) et par virement bancaire. Les abonnements sont sans engagement et peuvent être annulés à tout moment.",
  },
  {
    question: "Y a-t-il une période d'essai gratuite ?",
    answer:
      "Oui ! Le plan Standard offre 7 jours d'essai gratuit et le plan Famille offre 14 jours. Tu peux aussi utiliser le plan Gratuit sans limite de temps pour découvrir la plateforme avec des fonctionnalités limitées.",
  },
  {
    question: "Mes données sont-elles protégées ?",
    answer:
      "Absolument. TaNote est conforme au RGPD et applique des mesures de sécurité strictes pour protéger les données des mineurs. Tes données ne sont jamais partagées avec des tiers et tu peux demander leur suppression à tout moment.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Questions fréquentes</h2>
          <p className="text-muted-foreground">Tu as une question ? Trouve la réponse ici ou contacte notre support.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-card border border-border rounded-xl overflow-hidden">
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-200 ease-in-out ${
                  openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-4 text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-muted/50 rounded-full px-6 py-3">
            <MessageCircleQuestion className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              Tu ne trouves pas ta réponse ?{" "}
              <a href="mailto:support@tanote.ci" className="text-primary hover:underline font-medium">
                Contacte-nous
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
