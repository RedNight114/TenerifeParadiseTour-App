import type { Excursion } from "@/types/excursion"
import ExcursionGaleria from "./excursion-galeria"
import ExcursionInfo from "./excursion-info"
import FormularioReserva from "./formulario-reserva"
import ExcursionesRelacionadas from "./excursiones-relacionadas"
import { excursiones } from "@/data/excursiones"

interface ExcursionDetalleProps {
  excursion: Excursion
}

export default function ExcursionDetalle({ excursion }: ExcursionDetalleProps) {
  // Obtener excursiones relacionadas (misma categoría)
  const relacionadas = excursiones
    .filter((e) => e.categoria === excursion.categoria && e.id !== excursion.id)
    .slice(0, 3)

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <ExcursionGaleria excursion={excursion} />
            <ExcursionInfo excursion={excursion} />
          </div>
          <div className="w-full lg:w-1/3">
            <FormularioReserva excursion={excursion} />
          </div>
        </div>

        <ExcursionesRelacionadas excursiones={relacionadas} />
      </div>
    </>
  )
}
