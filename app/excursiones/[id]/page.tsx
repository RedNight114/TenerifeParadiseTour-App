import { excursiones } from "@/data/excursiones"
import { notFound } from "next/navigation"
import ExcursionDetalle from "@/components/excursion-detalle"
import type { Metadata, ResolvingMetadata } from "next"
import { ForceScrollTop } from "@/components/force-scroll-top"

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const excursion = excursiones.find((e) => e.id === params.id)

  if (!excursion) {
    return {
      title: "Excursión no encontrada",
      description: "La excursión que buscas no existe",
    }
  }

  return {
    title: `${excursion.nombre} | Tenerife Paradise Tours`,
    description: excursion.descripcion,
  }
}

export default function ExcursionPage({ params }: Props) {
  const excursion = excursiones.find((e) => e.id === params.id)

  if (!excursion) {
    notFound()
  }

  return (
    <>
      <ForceScrollTop />
      <ExcursionDetalle excursion={excursion} />
    </>
  )
}
