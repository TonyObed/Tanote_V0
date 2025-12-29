import { Check, MessageSquare, FileText, BarChart3, BookMarked, Clock, Zap, Shield } from "lucide-react"

const features = [
  {
    icon: Check,
    title: "Résolution pas à pas",
    description:
      "Obtiens des explications détaillées pour résoudre tes exercices, étape par étape, avec des concepts clairs.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: MessageSquare,
    title: "Conseils méthodologiques",
    description:
      "Reçois des conseils pour organiser ta méthode de travail et maintenir ton efficacité dans tes études.",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    icon: FileText,
    title: "Exercices interactifs",
    description:
      "Pratique autant d'exercices interactifs que nécessaire à ton niveau pour renforcer tes connaissances.",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    icon: BarChart3,
    title: "Suivi de progression",
    description:
      "Visualise tes progrès dans le temps et identifie les domaines à améliorer grâce à des statistiques détaillées.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: BookMarked,
    title: "Cours personnalisés",
    description:
      "Des leçons adaptées à ton niveau scolaire et à ton rythme d'apprentissage pour progresser efficacement.",
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
  {
    icon: Clock,
    title: "Chat IA 24/7",
    description: "Pose tes questions à tout moment à notre assistant IA qui t'aide dans toutes les matières scolaires.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

export function FeaturesGrid() {
  return (
    <section id="features" className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-balance">Tout ce qu'il te faut pour réussir</h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Découvre comment TaNote transforme l'apprentissage en une expérience personnalisée et efficace.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl p-5 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`h-10 w-10 rounded-lg ${feature.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className={`h-5 w-5 ${feature.color}`} />
              </div>
              <h3 className="text-base font-semibold mb-1.5">{feature.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-4 flex-wrap justify-center">
            <div className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-muted-foreground">Réponses instantanées</span>
            </div>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-success" />
              <span className="text-muted-foreground">Données protégées</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
