import { Clock, MapPin, Users, Check, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Excursion } from "@/types/excursion"

interface ExcursionInfoProps {
  excursion: Excursion
}

export default function ExcursionInfo({ excursion }: ExcursionInfoProps) {
  // Generar datos de ejemplo si no existen
  const incluye = excursion.incluye || [
    "Guía turístico profesional",
    "Transporte en vehículo climatizado",
    "Entradas a las atracciones mencionadas",
    "Seguro de viaje básico",
  ]

  const noIncluye = excursion.noIncluye || [
    "Comidas y bebidas no especificadas",
    "Propinas para el guía y conductor",
    "Gastos personales",
    "Recogida en hotel (opcional con cargo adicional)",
  ]

  const descripcion =
    excursion.descripcion ||
    `Disfruta de esta increíble excursión a ${excursion.nombre}. Durante ${excursion.duracion} explorarás los lugares más emblemáticos de ${excursion.ubicacion} acompañado de guías expertos que te contarán todos los secretos e historias de este fascinante destino. Esta excursión está diseñada para grupos de hasta ${excursion.grupoMaximo} personas, lo que garantiza una experiencia personalizada y de calidad. No olvides traer tu cámara para capturar los momentos más especiales de esta aventura inolvidable.`

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center">
          <MapPin className="h-5 w-5 mr-1 text-primary" />
          <span>{excursion.ubicacion}</span>
        </div>

        <div className="flex items-center">
          <Clock className="h-5 w-5 mr-1 text-primary" />
          <span>{excursion.duracion}</span>
        </div>

        <div className="flex items-center">
          <Users className="h-5 w-5 mr-1 text-primary" />
          <span>Máximo {excursion.grupoMaximo} personas</span>
        </div>
      </div>

      <Tabs defaultValue="descripcion">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="descripcion">Descripción</TabsTrigger>
          <TabsTrigger value="incluye">Qué incluye</TabsTrigger>
          <TabsTrigger value="informacion">Información útil</TabsTrigger>
        </TabsList>

        <TabsContent value="descripcion" className="mt-4">
          <div className="prose max-w-none">
            <p>{descripcion}</p>
          </div>
        </TabsContent>

        <TabsContent value="incluye" className="mt-4 space-y-4">
          <div>
            <h3 className="font-medium mb-2">La excursión incluye:</h3>
            <ul className="space-y-2">
              {incluye.map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 mr-2 text-green-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-2">La excursión no incluye:</h3>
            <ul className="space-y-2">
              {noIncluye.map((item, index) => (
                <li key={index} className="flex items-start">
                  <X className="h-5 w-5 mr-2 text-red-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="informacion" className="mt-4 space-y-4">
          <div>
            <h3 className="font-medium mb-2">Punto de encuentro:</h3>
            <p>
              {excursion.puntoEncuentro ||
                "Plaza Central, junto a la Oficina de Turismo. Busque a nuestro guía con el logo de TravelExcursiones."}
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Horarios disponibles:</h3>
            <div className="flex flex-wrap gap-2">
              {(excursion.horarios || ["09:00", "11:00", "15:00"]).map((horario, index) => (
                <span key={index} className="px-3 py-1 bg-muted rounded-full text-sm">
                  {horario}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Recomendaciones:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Lleve ropa y calzado cómodo</li>
              <li>Traiga protección solar y agua</li>
              <li>Se recomienda llegar 15 minutos antes de la hora de salida</li>
              <li>No olvide su cámara fotográfica</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-2">Política de cancelación:</h3>
            <p>
              Cancelación gratuita hasta 48 horas antes. Las cancelaciones con menos de 48 horas de antelación no son
              reembolsables.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
