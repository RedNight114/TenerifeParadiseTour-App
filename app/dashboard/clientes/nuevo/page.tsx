import { Button } from "@/components/ui/button"
import { FormularioCliente } from "@/components/dashboard/formulario-cliente"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function NuevoClientePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/clientes">
            <ChevronLeft className="h-4 w-4" />
            Volver
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nuevo Cliente</h1>
        <p className="text-muted-foreground">Añade un nuevo cliente a tu base de datos.</p>
      </div>

      <FormularioCliente modo="crear" />
    </div>
  )
}
