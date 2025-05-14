import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, ThumbsUp, Clock, MapPin, HeartHandshake } from "lucide-react"

export function PorQueElegirnos() {
  const razones = [
    {
      icon: Award,
      title: "Experiencia y Calidad",
      description: "Más de 13 años creando experiencias turísticas de alta calidad.",
    },
    {
      icon: Users,
      title: "Grupos Reducidos",
      description: "Excursiones en grupos pequeños para una atención más personalizada.",
    },
    {
      icon: ThumbsUp,
      title: "Guías Expertos",
      description: "Profesionales con amplio conocimiento local y pasión por su trabajo.",
    },
    {
      icon: Clock,
      title: "Flexibilidad",
      description: "Adaptamos nuestras excursiones a tus necesidades y preferencias.",
    },
    {
      icon: MapPin,
      title: "Destinos Únicos",
      description: "Acceso a lugares exclusivos fuera de las rutas turísticas convencionales.",
    },
    {
      icon: HeartHandshake,
      title: "Compromiso Social",
      description: "Colaboramos con comunidades locales y proyectos de conservación.",
    },
  ]

  return (
    <section id="por-que-elegirnos" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px flex-1 bg-muted"></div>
        <h2 className="text-3xl font-bold text-center">¿Por Qué Elegirnos?</h2>
        <div className="h-px flex-1 bg-muted"></div>
      </div>

      <div className="text-center mb-10">
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Descubre lo que nos diferencia y por qué miles de viajeros nos eligen año tras año para sus experiencias
          turísticas.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {razones.map((razon, index) => (
          <Card
            key={index}
            className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300"
          >
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <razon.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{razon.title}</h3>
                <p className="text-muted-foreground">{razon.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 bg-primary/5 rounded-lg p-8 border border-primary/10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/3 text-center">
            <div className="text-5xl font-bold text-primary mb-2">98%</div>
            <p className="text-lg font-medium">Clientes Satisfechos</p>
          </div>
          <div className="md:w-1/3 text-center">
            <div className="text-5xl font-bold text-primary mb-2">500+</div>
            <p className="text-lg font-medium">Excursiones Realizadas</p>
          </div>
          <div className="md:w-1/3 text-center">
            <div className="text-5xl font-bold text-primary mb-2">50K+</div>
            <p className="text-lg font-medium">Viajeros Felices</p>
          </div>
        </div>
      </div>
    </section>
  )
}
