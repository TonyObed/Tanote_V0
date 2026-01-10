"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    title: "Apprentissage innovant pour tous",
    description: "Les élèves obtiennent des résultats liés à leur niveau d'études ou à leur objectif de carrière",
    image: "/african-student-wearing-vr-headset-and-headphones-.jpg",
    gradient: "from-cyan-400 via-blue-500 to-purple-600",
  },
  {
    title: "Diagnostics IA personnalisés",
    description: "Une intelligence artificielle qui identifie tes lacunes et crée des exercices adaptés à ton niveau",
    image: "/african-student-studying-with-books-smiling.jpg",
    gradient: "from-orange-400 via-red-500 to-pink-600",
  },
  {
    title: "Réussis tes examens avec confiance",
    description: "Prépare-toi efficacement avec nos exercices et examens chronométrés adaptés au programme ivoirien",
    image: "/african-graduate-student-in-cap-and-gown-celebrati.jpg",
    gradient: "from-green-400 via-teal-500 to-cyan-600",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-[calc(100vh-80px)] min-h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Gradient overlay pour la lisibilité */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-70`} />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            <div
              className={`transition-all duration-700 ${
                isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 text-balance leading-[1.1] drop-shadow-2xl">
                {slides[currentSlide].title}
              </h1>

              <p className="text-lg sm:text-xl text-white/90 max-w-2xl mb-8 leading-relaxed drop-shadow-lg">
                {slides[currentSlide].description}
              </p>

              <div className="flex items-center gap-4">
                <Link href="/auth/register">
                  <Button
                    size="lg"
                    className="text-base px-8 h-14 gap-2 rounded-full bg-white text-primary hover:bg-white/90 shadow-xl hover:scale-105 transition-transform"
                  >
                    <Play className="h-5 w-5 fill-current" />
                    Commencer maintenant
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-3 text-sm text-white/80 pt-6">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  <span>Gratuit pour démarrer</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  <span>+12 500 élèves actifs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all flex items-center justify-center text-white group"
        aria-label="Slide précédent"
      >
        <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all flex items-center justify-center text-white group"
        aria-label="Slide suivant"
      >
        <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true)
                setCurrentSlide(index)
                setTimeout(() => setIsAnimating(false), 500)
              }
            }}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
