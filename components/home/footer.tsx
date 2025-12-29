import Link from "next/link"
import { TaNoteLogo } from "@/components/tanote-logo"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  product: [
    { href: "#features", label: "Fonctionnalités" },
    { href: "#pricing", label: "Tarifs" },
    { href: "#demo", label: "Démonstration" },
    { href: "#testimonials", label: "Témoignages" },
  ],
  resources: [
    { href: "#faq", label: "FAQ" },
    { href: "/blog", label: "Blog" },
    { href: "/support", label: "Support" },
    { href: "/guides", label: "Guides" },
  ],
  legal: [
    { href: "/terms", label: "Conditions d'utilisation" },
    { href: "/privacy", label: "Politique de confidentialité" },
    { href: "/cookies", label: "Cookies" },
    { href: "/rgpd", label: "RGPD" },
  ],
}

const socialLinks = [
  { href: "https://facebook.com/tanote", icon: Facebook, label: "Facebook" },
  { href: "https://twitter.com/tanote", icon: Twitter, label: "Twitter" },
  { href: "https://instagram.com/tanote", icon: Instagram, label: "Instagram" },
  { href: "https://linkedin.com/company/tanote", icon: Linkedin, label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 lg:py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <TaNoteLogo size="md" />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
              La plateforme d'apprentissage IA pour les élèves ivoiriens qui veulent exceller.
            </p>
            {/* Social links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="font-semibold mb-4">Produit</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Ressources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Légal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@tanote.ci"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  contact@tanote.ci
                </a>
              </li>
              <li>
                <a
                  href="tel:+2250700000000"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +225 07 00 00 00 00
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  Abidjan, Côte d'Ivoire
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2025 TaNote. Tous droits réservés.</p>
          <p className="text-sm text-muted-foreground">Fait avec passion en Côte d'Ivoire</p>
        </div>
      </div>
    </footer>
  )
}
