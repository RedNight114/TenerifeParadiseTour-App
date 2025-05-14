import { FormularioExcursion } from "@/components/dashboard/formulario-excursion"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { excursiones } from "@/data/excursiones"

interface EditarExcursionPageProps {
  params: {
    id: string
  }
}

export default function EditarExcursionPage({ params }: EditarExcursionPageProps) {
  const excursion = excursiones.find((e) => e.id === params.id)

  if (!excursion) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/excursiones">
            <ChevronLeft className="h-4 w-4" />
            Volver
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Editar Excursión</h1>
        <p className="text-muted-foreground">Modifica los detalles de la excursión "{excursion.nombre}".</p>
      </div>

      <FormularioExcursion excursion={excursion} />
    </div>
  )
}
