import { FormularioExcursion } from "@/components/dashboard/formulario-excursion"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function NuevaExcursionPage() {
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
        <h1 className="text-3xl font-bold tracking-tight">Nueva Excursión</h1>
        <p className="text-muted-foreground">Crea una nueva excursión para tu sitio web.</p>
      </div>

      <FormularioExcursion />
    </div>
  )
}
