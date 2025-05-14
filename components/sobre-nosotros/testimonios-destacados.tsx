import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TestimoniosDestacados() {
  const testimonios = [
    {
      nombre: "María García",
      ubicacion: "Madrid",
      avatar: "/diverse-group.png",
      texto:
        "Nuestra excursión a la Sierra de Guadarrama fue increíble. El guía conocía cada rincón y nos contó historias fascinantes. La organización fue impecable y el grupo reducido permitió una experiencia muy personalizada. ¡Volveremos seguro!",
      valoracion: 5,
    },
    {
      nombre: "Javier Martínez",
      ubicacion: "Barcelona",
      avatar: "/thoughtful-man.png",
      texto:
        "He viajado con muchas empresas, pero TravelExcursiones ofrece un nivel de personalización y atención que no había experimentado antes. Los guías son verdaderos expertos y apasionados por su trabajo. Cada detalle está cuidadosamente planificado.",
      valoracion: 5,
    },
    {
      nombre: "Laura Sánchez",
      ubicacion: "Valencia",
      avatar: "/diverse-woman-portrait.png",
      texto:
        "La excursión a los pueblos medievales superó todas mis expectativas. Grupos pequeños, guías expertos y lugares fuera de lo común. Aprendimos muchísimo sobre la historia local y disfrutamos de una gastronomía excepcional. Una experiencia completa.",
      valoracion: 4,
    },
  ]

  return (
    <section id="testimonios" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px flex-1 bg-muted"></div>
        <h2 className="text-3xl font-bold text-center">Lo Que Dicen Nuestros Clientes</h2>
        <div className="h-px flex-1 bg-muted"></div>
      </div>

      <div className="text-center mb-10">
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Descubre las experiencias de quienes ya han disfrutado de nuestras excursiones y por qué nos recomiendan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonios.map((testimonio, index) => (
          <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 relative">
              <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/10" />

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < testimonio.valoracion ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                  />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 italic">"{testimonio.texto}"</p>

              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={testimonio.avatar || "/placeholder.svg"} alt={testimonio.nombre} />
                  <AvatarFallback>{testimonio.nombre.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{testimonio.nombre}</p>
                  <p className="text-sm text-muted-foreground">{testimonio.ubicacion}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
