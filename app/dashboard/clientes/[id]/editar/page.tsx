"use client"

import { Button } from "@/components/ui/button"
import { FormularioCliente } from "@/components/dashboard/formulario-cliente"
import { ChevronLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useClientes } from "@/contexts/cliente-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function EditarClientePage() {
  const params = useParams()
  const clienteId = params?.id as string
  const { obtenerCliente, cargando, error } = useClientes()

  // Verificar si el cliente existe
  const cliente = obtenerCliente(clienteId)

  if (cargando) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !cliente) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/clientes">
            <ChevronLeft className="h-4 w-4" />
            Volver
          </Link>
        </Button>

        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || "No se pudo encontrar el cliente solicitado. Verifica el ID e intenta de nuevo."}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/dashboard/clientes/${clienteId}`}>
            <ChevronLeft className="h-4 w-4" />
            Volver
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Editar Cliente</h1>
        <p className="text-muted-foreground">Modifica la información de {cliente.nombre}.</p>
      </div>

      <FormularioCliente clienteId={clienteId} modo="editar" />
    </div>
  )
}
