"use client"

import { ButtonWithPixel } from "@/components/ui/button-with-pixel"
import Link from "next/link"
import { FaReact, FaGithub, FaTwitter, FaLinkedin, FaGoogle } from "react-icons/fa"
import { SiNextdotjs, SiTypescript, SiFacebook } from "react-icons/si"
import { BookOpen, Brain, Target, TrendingUp } from "lucide-react"

const iconConfigs = [
  { Icon: BookOpen, color: "#0ea5e9" },
  { Icon: Brain, color: "#8b5cf6" },
  { Icon: Target, color: "#f59e0b" },
  { Icon: TrendingUp, color: "#10b981" },
  { Icon: FaReact, color: "#61DAFB" },
  { Icon: SiNextdotjs, color: "#000000" },
  { Icon: SiTypescript, color: "#3178C6" },
  { Icon: FaGithub, color: "#181717" },
  { Icon: FaGoogle, color: "#DB4437" },
  { Icon: SiFacebook, color: "#1877F2" },
  { Icon: FaTwitter, color: "#1DA1F2" },
  { Icon: FaLinkedin, color: "#0077B5" },
]

export function CTASection() {
  const orbitCount = 3
  const orbitGap = 8
  const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount)

  return (
    <section className="relative max-w-6xl mx-auto my-32 pl-4 sm:pl-10 flex flex-col lg:flex-row items-center justify-between min-h-[30rem] border border-gray-200 dark:border-gray-700 bg-white dark:bg-black overflow-hidden rounded-3xl">
      <div className="w-full lg:w-1/2 z-10 p-8 lg:p-0">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-white text-balance">
          Prêt à transformer tes résultats scolaires ?
        </h1>
        <p className="text-gray-500 dark:text-gray-300 mb-6 max-w-lg">
          Ne laisse plus les exercices difficiles te bloquer. Avec TaNote, chaque problème devient une opportunité
          d'apprendre.
        </p>
        <div className="flex items-center gap-3">
          <Link href="/auth/register">
            <ButtonWithPixel size="lg" pixelColors={["#0ea5e9", "#7dd3fc", "#e0f2fe"]} pixelGap={8} pixelSpeed={30}>
              Commencer gratuitement
            </ButtonWithPixel>
          </Link>
          <ButtonWithPixel
            variant="outline"
            size="lg"
            pixelColors={["#94a3b8", "#cbd5e1", "#e2e8f0"]}
            pixelGap={8}
            pixelSpeed={25}
          >
            En savoir plus
          </ButtonWithPixel>
        </div>
      </div>

      <div className="relative w-full lg:w-1/2 h-full flex items-center justify-start overflow-hidden">
        <div className="relative w-[50rem] h-[50rem] translate-x-[50%] flex items-center justify-center">
          {/* Center Circle with TaNote logo */}
          <div className="w-24 h-24 rounded-full bg-primary shadow-lg flex items-center justify-center">
            <Brain className="w-12 h-12 text-primary-foreground" />
          </div>

          {/* Generate Orbits */}
          {[...Array(orbitCount)].map((_, orbitIdx) => {
            const size = `${12 + orbitGap * (orbitIdx + 1)}rem`
            const angleStep = (2 * Math.PI) / iconsPerOrbit

            return (
              <div
                key={orbitIdx}
                className="absolute rounded-full border-2 border-dotted border-gray-300 dark:border-gray-600"
                style={{
                  width: size,
                  height: size,
                  animation: `spin ${12 + orbitIdx * 6}s linear infinite`,
                }}
              >
                {iconConfigs
                  .slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit)
                  .map((cfg, iconIdx) => {
                    const angle = iconIdx * angleStep
                    const x = 50 + 50 * Math.cos(angle)
                    const y = 50 + 50 * Math.sin(angle)

                    return (
                      <div
                        key={iconIdx}
                        className="absolute bg-white dark:bg-gray-800 rounded-full p-1 shadow-md"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <cfg.Icon className="w-8 h-8" style={{ color: cfg.color }} />
                      </div>
                    )
                  })}
              </div>
            )
          })}
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  )
}
