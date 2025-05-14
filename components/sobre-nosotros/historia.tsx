import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Historia() {
  const hitos = [
    {
      año: 2025,
      titulo: "Fundación",
      descripcion:
        "Nace Tenerife Paradise Tours & Excursions Pro, iniciando actividades con excursiones al Teide y experiencias únicas por la costa y naturaleza de Tenerife.",
    },
    {
      año: 2025,
      titulo: "Lanzamiento Digital",
      descripcion:
        "Presentación de nuestra plataforma digital optimizada para reservas online, facilitando el acceso a turistas internacionales.",
    },
    {
      año: 2025,
      titulo: "Primeros Clientes",
      descripcion:
        "Recepción de los primeros visitantes y establecimiento de colaboraciones con guías locales certificados para garantizar calidad y seguridad.",
    },
    {
      año: 2025,
      titulo: "Compromiso Sostenible",
      descripcion:
        "Adhesión voluntaria a principios sostenibles y responsables, integrando prácticas ecológicas desde nuestro inicio.",
    },
    {
      año: 2025,
      titulo: "Crecimiento Inicial",
      descripcion:
        "Ampliación del catálogo inicial con tours marítimos de avistamiento de cetáceos y opciones personalizadas según demanda del cliente.",
    },
    {
      año: "Actualidad",
      titulo: "Mirando al Futuro",
      descripcion:
        "Consolidación del proyecto con el objetivo firme de convertirnos en un referente del turismo digital sostenible en Tenerife, conectando cada vez más visitantes con experiencias auténticas y locales.",
    },
  ]

  return (
    <section id="historia" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px flex-1 bg-muted"></div>
        <h2 className="text-3xl font-bold text-center">Nuestra Historia</h2>
        <div className="h-px flex-1 bg-muted"></div>
      </div>

      <Card className="overflow-hidden border-none shadow-lg">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-80 md:h-auto order-1 md:order-none">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 md:hidden"></div>
              <Image
                src="/images/oficina.png"
                alt="Historia de TravelExcursiones"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute bottom-4 left-4 z-20 md:hidden">
                <Badge variant="secondary" className="mb-2">
                  Desde 2025
                </Badge>
                <h3 className="text-2xl font-bold text-white">De un sueño a la realidad</h3>
              </div>
            </div>
            <div className="p-8 md:p-10 bg-card">
              <div className="hidden md:block">
                <Badge variant="secondary" className="mb-2">
                  Desde 2025
                </Badge>
                <h3 className="text-2xl font-bold mb-6">De un sueño a la realidad</h3>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Tenerife Paradise Tours & Excursions Pro nació en 2025 gracias a un grupo de profesionales locales
                  apasionados por mostrar al mundo las maravillas de Tenerife. Lo que empezó como un sueño compartido
                  entre amantes de la naturaleza y la cultura canaria se ha convertido rápidamente en una referencia en
                  experiencias turísticas digitales en las Islas Canarias.
                </p>
                <p>
                  Desde nuestros inicios, nos especializamos en excursiones al Teide y recorridos únicos por la costa,
                  ampliando luego nuestra oferta con tours marítimos y experiencias personalizadas. Nuestra cercanía, el
                  compromiso con el entorno local y la calidad en cada servicio nos han permitido crecer rápidamente y
                  conectar con visitantes internacionales.
                </p>
                <p>
                  Hoy, seguimos fieles a nuestra misión inicial: ofrecer experiencias inolvidables que acerquen a las
                  personas a la auténtica esencia de Tenerife.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-16">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px flex-1 bg-muted"></div>
          <h3 className="text-2xl font-bold text-center">Nuestra Trayectoria</h3>
          <div className="h-px flex-1 bg-muted"></div>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20"></div>
          <div className="space-y-16">
            {hitos.map((hito, index) => (
              <div
                key={index}
                className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
              >
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "pr-8 md:pr-12 text-right" : "pl-8 md:pl-12"}`}>
                  <div className="bg-sky-50 dark:bg-sky-950/30 p-6 rounded-lg shadow-md border border-sky-100 dark:border-sky-900 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                    <Badge variant="outline" className="mb-2 bg-primary/10 text-primary border-primary/20">
                      {hito.año}
                    </Badge>
                    <h4 className="text-lg font-semibold mb-3 text-sky-800 dark:text-sky-300">{hito.titulo}</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{hito.descripcion}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-sm"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
