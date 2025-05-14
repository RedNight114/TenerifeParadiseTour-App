import type { Metadata } from "next"
import FormularioContacto from "@/components/contacto/formulario-contacto"
import InfoContacto from "@/components/contacto/info-contacto"
import MapaUbicacion from "@/components/contacto/mapa-ubicacion"
import PreguntasFrecuentes from "@/components/contacto/preguntas-frecuentes"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Contacto | Tenerife Paradise Tours",
  description: "Ponte en contacto con nosotros para cualquier consulta sobre nuestras excursiones o servicios.",
}

export default function ContactoPage() {
  return (
    <main className="container mx-auto py-6 md:py-12 px-4">
      <div className="max-w-5xl mx-auto mb-6">
        <Button variant="ghost" size="sm" asChild className="group mb-4 hover:bg-muted">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Volver al inicio
          </Link>
        </Button>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 md:mb-4">Contacto</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Estamos aquí para ayudarte. Ponte en contacto con nosotros para cualquier consulta o sugerencia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          <FormularioContacto />
          <InfoContacto />
        </div>

        <div className="mb-8 md:mb-12">
          <MapaUbicacion />
        </div>

        <div className="mb-8 md:mb-12">
          <PreguntasFrecuentes />
        </div>
      </div>
    </main>
  )
}
