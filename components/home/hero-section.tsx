"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    title: "Apprentissage innovant",
    subtitle: "pour tous",
    description: "Progresse à ton rythme avec une IA qui s'adapte à ton niveau",
    image: "/african-student-wearing-vr-headset-and-headphones-.jpg",
    badge: "Gratuit pour démarrer",
  },
  {
    title: "Exercices personnalisés",
    subtitle: "selon tes lacunes",
    description: "L'IA identifie tes points faibles et crée des exercices sur mesure",
    image: "/african-student-studying-with-books-smiling.jpg",
    badge: "+12 500 élèves actifs",
  },
  {
    title: "Réussis tes examens",
    subtitle: "avec confiance",
    description: "Prépare-toi efficacement avec des simulations d'examens réalistes",
    image: "/african-graduate-student-in-cap-and-gown-celebrati.jpg",
    badge: "Taux de réussite 92%",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#A04BDE] via-[#3B82F6] to-[#00C2FF]" />

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 h-full items-center">
              {/* Left Content */}
              <div className="space-y-6 text-white z-10 relative pt-20 lg:pt-0">
                <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
                  {slide.badge}
                </div>

                <div className="space-y-3">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1]">
                    {slide.title}
                    <span className="block mt-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                      {slide.subtitle}
                    </span>
                  </h1>

                  <p className="text-lg sm:text-xl text-white/90 max-w-lg leading-relaxed">{slide.description}</p>
                </div>

                <Link href="/auth/register">
                  <Button
                    size="lg"
                    className="bg-white text-[#3B82F6] hover:bg-white/90 text-base px-8 h-12 gap-2 rounded-full font-semibold shadow-xl"
                  >
                    <Play className="h-5 w-5 fill-current" />
                    Commencer maintenant
                  </Button>
                </Link>
              </div>

              {/* Right Content - Full Image */}
              <div className="relative h-full flex items-center justify-end">
                <div className="relative w-full h-[400px] lg:h-[600px]">
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    fill
                    className="object-cover object-center rounded-3xl lg:rounded-none"
                    priority={index === 0}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors"
          aria-label="Slide précédent"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>

        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40"
              }`}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors"
          aria-label="Slide suivant"
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </button>
      </div>
    </section>
  )
}
