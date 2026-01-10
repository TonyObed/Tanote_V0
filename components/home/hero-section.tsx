"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ButtonWithPixel } from "@/components/ui/button-with-pixel"
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
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
      <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-110"
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
              className={`transition-all duration-700 ease-out ${
                isAnimating ? "opacity-0 translate-y-8 scale-95" : "opacity-100 translate-y-0 scale-100"
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
                  <ButtonWithPixel
                    size="lg"
                    className="text-base px-8 h-14 gap-2 rounded-full bg-white text-primary hover:bg-white/90 shadow-xl hover:scale-105 transition-transform"
                    pixelColors={["#e0f2fe", "#7dd3fc", "#0ea5e9"]}
                    pixelGap={8}
                    pixelSpeed={30}
                  >
                    <Play className="h-5 w-5 fill-current" />
                    Commencer maintenant
                  </ButtonWithPixel>
                </Link>
              </div>

              <div className="flex items-center gap-3 text-sm text-white/80 pt-6">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-xl hover:scale-105 transition-transform">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
                  <span className="font-medium">Gratuit pour démarrer</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-xl hover:scale-105 transition-transform">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
                  <span className="font-medium">+12 500 élèves actifs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300 flex items-center justify-center text-white group shadow-2xl"
        aria-label="Slide précédent"
      >
        <ChevronLeft className="h-7 w-7 group-hover:scale-125 transition-transform duration-300" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300 flex items-center justify-center text-white group shadow-2xl"
        aria-label="Slide suivant"
      >
        <ChevronRight className="h-7 w-7 group-hover:scale-125 transition-transform duration-300" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true)
                setCurrentSlide(index)
                setTimeout(() => setIsAnimating(false), 700)
              }
            }}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? "w-10 bg-white shadow-lg shadow-white/50 scale-110"
                : "w-2.5 bg-white/50 hover:bg-white/70 hover:scale-125"
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
