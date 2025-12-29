"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Une question ? Contactez-nous</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-semibold text-lg mb-6">Nos coordonnées</h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:contact@tanote.ci"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      contact@tanote.ci
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <a href="tel:+2250700000000" className="text-muted-foreground hover:text-primary transition-colors">
                      +225 07 00 00 00 00
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-muted-foreground">
                      Cocody, Abidjan
                      <br />
                      Côte d'Ivoire
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <a
                      href="https://wa.me/2250700000000"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +225 07 00 00 00 00
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl border border-primary/20 p-6">
              <p className="text-sm">
                <span className="font-semibold">Horaires de support :</span>
                <br />
                Lundi - Vendredi : 8h - 18h
                <br />
                Samedi : 9h - 14h
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <h3 className="font-semibold text-lg mb-6">Envoyez-nous un message</h3>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <Label htmlFor="subject">Sujet</Label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => setFormData({ ...formData, subject: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisissez un sujet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Question générale</SelectItem>
                    <SelectItem value="subscription">Abonnement & Tarifs</SelectItem>
                    <SelectItem value="technical">Problème technique</SelectItem>
                    <SelectItem value="school">Offre établissement scolaire</SelectItem>
                    <SelectItem value="partnership">Partenariat</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 mb-6">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Décrivez votre demande..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full gap-2">
                <Send className="h-4 w-4" />
                Envoyer le message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
