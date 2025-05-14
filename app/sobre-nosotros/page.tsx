import Link from "next/link"
import { ArrowLeft, BookOpen, Target, Users, Award, MessageSquareQuote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Historia } from "@/components/sobre-nosotros/historia"
import { MisionVision } from "@/components/sobre-nosotros/mision-vision"
import { Equipo } from "@/components/sobre-nosotros/equipo"
import { PorQueElegirnos } from "@/components/sobre-nosotros/por-que-elegirnos"
import { TestimoniosDestacados } from "@/components/sobre-nosotros/testimonios-destacados"

export const metadata = {
  title: "Sobre Nosotros | TravelExcursiones",
  description:
    "Conoce más sobre TravelExcursiones, nuestra historia, misión, visión y el equipo detrás de las mejores experiencias turísticas.",
}

export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <div className="relative bg-primary/10 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Button variant="outline" size="sm" className="mb-8 group" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Volver al inicio
            </Link>
          </Button>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary">Sobre Nosotros</h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Descubre quiénes somos, nuestra pasión por los viajes y nuestro compromiso con experiencias turísticas
              inolvidables.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-30 bg-gradient-to-r from-background/95 to-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm">
        <div className="container mx-auto px-4">
          <nav
            className="flex justify-center md:justify-start gap-2 py-3 overflow-x-auto scrollbar-hide"
            aria-label="Navegación de secciones"
          >
            <a
              href="#historia"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Ir a sección Historia"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              <span>Historia</span>
            </a>

            <a
              href="#mision-vision"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Ir a sección Misión y Visión"
            >
              <Target className="h-4 w-4" aria-hidden="true" />
              <span>Misión y Visión</span>
            </a>

            <a
              href="#equipo"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Ir a sección Nuestro Equipo"
            >
              <Users className="h-4 w-4" aria-hidden="true" />
              <span>Nuestro Equipo</span>
            </a>

            <a
              href="#por-que-elegirnos"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Ir a sección Por Qué Elegirnos"
            >
              <Award className="h-4 w-4" aria-hidden="true" />
              <span>Por Qué Elegirnos</span>
            </a>

            <a
              href="#testimonios"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Ir a sección Testimonios"
            >
              <MessageSquareQuote className="h-4 w-4" aria-hidden="true" />
              <span>Testimonios</span>
            </a>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-24">
          <Historia />
          <MisionVision />
          <Equipo />
          <PorQueElegirnos />
          <TestimoniosDestacados />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para vivir una experiencia inolvidable?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Descubre nuestras excursiones y déjanos mostrarte los destinos más fascinantes con guías expertos y grupos
            reducidos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/excursiones">Ver Excursiones</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link href="/contacto">Contactar</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
