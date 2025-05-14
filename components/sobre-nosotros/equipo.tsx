import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { miembrosEquipo } from "@/data/equipo"
import { Instagram, Linkedin, Twitter } from "lucide-react"

export function Equipo() {
  return (
    <section id="equipo" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px flex-1 bg-muted"></div>
        <h2 className="text-3xl font-bold text-center">Nuestro Equipo</h2>
        <div className="h-px flex-1 bg-muted"></div>
      </div>

      <div className="text-center mb-10">
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Conoce a las personas apasionadas que hacen posible que cada excursión sea una experiencia inolvidable.
          Nuestro equipo combina experiencia, conocimiento local y entusiasmo por los viajes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {miembrosEquipo.map((miembro, index) => (
          <Card key={index} className="overflow-hidden border-none shadow-lg group">
            <div className="relative h-80">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
              <Image
                src={miembro.foto || "/placeholder.svg"}
                alt={miembro.nombre}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-xl font-bold text-white">{miembro.nombre}</h3>
                <p className="text-primary-foreground font-medium mb-2">{miembro.cargo}</p>
                <div className="flex space-x-3 mt-4">
                  <a href="#" className="text-white/80 hover:text-white transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <p className="text-muted-foreground">{miembro.descripcion}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
