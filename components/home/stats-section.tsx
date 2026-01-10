"use client"

import { useEffect, useState, useRef } from "react"
import { Users, BookOpen, Trophy, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: 12500,
    suffix: "+",
    label: "Élèves actifs",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: BookOpen,
    value: 250000,
    suffix: "+",
    label: "Exercices résolus",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    icon: Trophy,
    value: 94,
    suffix: "%",
    label: "Taux de réussite",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: TrendingUp,
    value: 3.2,
    suffix: " pts",
    label: "Amélioration moyenne",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span>
      {value >= 1000
        ? `${(count / 1000).toFixed(count >= value ? 1 : 0)}k`
        : value % 1 !== 0
          ? count.toFixed(1)
          : count}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-balance">Des résultats qui parlent d'eux-mêmes</h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Rejoins des milliers d'élèves qui améliorent leurs notes chaque jour.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`relative bg-card rounded-2xl p-5 border border-border text-center group hover:shadow-2xl hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:scale-105 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-accent/5 rounded-2xl transition-all duration-500" />

              <div className="relative z-10">
                <div
                  className={`mx-auto h-12 w-12 rounded-xl ${stat.bgColor} flex items-center justify-center mb-3 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500`}
                >
                  <stat.icon
                    className={`h-6 w-6 ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>
                <p className="text-2xl sm:text-3xl font-bold mb-1 group-hover:scale-110 transition-transform duration-300">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
