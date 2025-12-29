import { Header } from "@/components/home/header"
import { HeroSection } from "@/components/home/hero-section"
import { StatsSection } from "@/components/home/stats-section"
import { DemoSection } from "@/components/home/demo-section"
import { FeaturesGrid } from "@/components/home/features-grid"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { PricingSection } from "@/components/home/pricing-section"
import { ContactSection } from "@/components/home/contact-section"
import { CTASection } from "@/components/home/cta-section"
import { Footer } from "@/components/home/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <DemoSection />
        <FeaturesGrid />
        <TestimonialsSection />
        <PricingSection />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
