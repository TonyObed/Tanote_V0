import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
})

export const metadata: Metadata = {
  title: "TaNote - Apprends mieux, progresse plus vite",
  description:
    "Plateforme éducative IA pour les élèves ivoiriens. Diagnostic personnalisé, exercices adaptés et suivi de progression.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${plusJakarta.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
