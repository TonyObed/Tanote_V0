"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Aminata Koné",
    role: "Élève en Terminale D",
    location: "Abidjan",
    avatar: "/african-girl-student-portrait.jpg",
    rating: 5,
    content:
      "Grâce à TaNote, j'ai enfin compris les équations différentielles ! Les explications pas à pas sont vraiment claires et adaptées à mon niveau. Ma moyenne en maths est passée de 8 à 14.",
  },
  {
    id: 2,
    name: "Kouadio Yao",
    role: "Élève en 3ème",
    location: "Bouaké",
    avatar: "/african-boy-student-portrait.jpg",
    rating: 5,
    content:
      "L'IA m'aide à comprendre mes erreurs au lieu de juste me donner la réponse. C'est comme avoir un prof particulier disponible 24h/24. Je recommande à tous mes camarades !",
  },
  {
    id: 3,
    name: "Marie-Claire Bamba",
    role: "Parent d'élève",
    location: "San-Pédro",
    avatar: "/african-woman-professional-portrait.png",
    rating: 5,
    content:
      "En tant que maman, je peux suivre les progrès de mes enfants facilement. Le tableau de bord parent est très bien fait. Mes deux enfants ont nettement amélioré leurs résultats.",
  },
  {
    id: 4,
    name: "Ibrahim Touré",
    role: "Élève en Seconde C",
    location: "Yamoussoukro",
    avatar: "/african-teenage-boy-student-portrait.jpg",
    rating: 5,
    content:
      "La physique-chimie était ma bête noire. Maintenant, avec les exercices personnalisés de TaNote, je comprends mieux les concepts et j'ai confiance en moi pour les examens.",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section id="testimonials" className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-balance">Ce que disent nos utilisateurs</h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Découvre les expériences des élèves et parents qui utilisent TaNote au quotidien.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow relative"
            >
              <Quote className="absolute top-5 right-5 h-8 w-8 text-primary/10" />
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{testimonial.content}</p>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden">
          <div className="bg-card rounded-xl p-5 border border-border relative">
            <Quote className="absolute top-4 right-4 h-6 w-6 text-primary/10" />
            <div className="flex items-center gap-3 mb-3">
              <img
                src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                alt={testimonials[currentIndex].name}
                className="h-12 w-12 rounded-full object-cover border-2 border-primary/20"
              />
              <div>
                <h4 className="font-semibold text-sm">{testimonials[currentIndex].name}</h4>
                <p className="text-xs text-muted-foreground">{testimonials[currentIndex].role}</p>
              </div>
            </div>
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed mb-4">{testimonials[currentIndex].content}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentIndex ? "w-5 bg-primary" : "w-1.5 bg-muted"
                    }`}
                    onClick={() => setCurrentIndex(i)}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prev}
                  className="h-7 w-7 bg-transparent hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={next}
                  className="h-7 w-7 bg-transparent hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
