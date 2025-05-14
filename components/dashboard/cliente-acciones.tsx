"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Edit, FileText, Loader2, MessageSquare, Plus, Printer, Star, Trash } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useClientes } from "@/contexts/cliente-context"
import type { Cliente } from "@/contexts/cliente-context"
import { ClienteInforme } from "./cliente-informe"
import { ClienteNotas } from "./cliente-notas"

interface ClienteAccionesProps {
  cliente: Cliente
}

export function ClienteAcciones({ cliente }: ClienteAccionesProps) {
  const router = useRouter()
  const { eliminarCliente } = useClientes()
  const [eliminando, setEliminando] = useState(false)
  const [imprimiendo, setImprimiendo] = useState(false)
  const [dialogoInforme, setDialogoInforme] = useState(false)
  const [dialogoNotas, setDialogoNotas] = useState(false)

  // Manejar eliminación de cliente
  const handleEliminarCliente = async () => {
    if (!cliente) return

    setEliminando(true)
    const exito = await eliminarCliente(cliente.id)
    setEliminando(false)

    if (exito) {
      router.push("/dashboard/clientes")
    }
  }

  // Simular impresión de ficha de cliente
  const handleImprimirFicha = () => {
    setImprimiendo(true)
    setTimeout(() => {
      window.print()
      setImprimiendo(false)
    }, 1000)
  }

  return (
    <div className="flex items-center gap-3">
      <TooltipProvider>
        {/* Botón de mensaje */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <MessageSquare className="h-4 w-4 mr-1" />
              Mensaje
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Enviar mensaje al cliente</p>
          </TooltipContent>
        </Tooltip>

        {/* Botón de imprimir */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1" onClick={handleImprimirFicha} disabled={imprimiendo}>
              {imprimiendo ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  Imprimiendo...
                </>
              ) : (
                <>
                  <Printer className="h-4 w-4 mr-1" />
                  Imprimir
                </>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Imprimir ficha del cliente</p>
          </TooltipContent>
        </Tooltip>

        {/* Menú desplegable de más acciones */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" size="sm">
              Más acciones
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Acciones de cliente</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/clientes/${cliente.id}/editar`}>
                <Edit className="mr-2 h-4 w-4" />
                Editar Cliente
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem disabled className="opacity-70">
              <Calendar className="mr-2 h-4 w-4" />
              Nueva Reserva <span className="text-xs ml-1 text-muted-foreground">(próximamente)</span>
            </DropdownMenuItem>

            {/* Generar informe con diálogo */}
            <Dialog open={dialogoInforme} onOpenChange={setDialogoInforme}>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <FileText className="mr-2 h-4 w-4" />
                  Generar informe
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <ClienteInforme cliente={cliente} onClose={() => setDialogoInforme(false)} />
              </DialogContent>
            </Dialog>

            {/* Añadir nota con diálogo */}
            <Dialog open={dialogoNotas} onOpenChange={setDialogoNotas}>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Añadir nota
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <ClienteNotas cliente={cliente} />
              </DialogContent>
            </Dialog>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => alert(`Cliente ${cliente.vip ? "eliminado de" : "añadido a"} VIP`)}>
              <Star className="mr-2 h-4 w-4" />
              {cliente.vip ? "Quitar estado VIP" : "Marcar como VIP"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                  <Trash className="mr-2 h-4 w-4" />
                  Eliminar Cliente
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. Se eliminará permanentemente el cliente {cliente.nombre} y todos
                    sus datos asociados.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleEliminarCliente}
                    disabled={eliminando}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {eliminando ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Eliminando...
                      </>
                    ) : (
                      "Eliminar"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipProvider>
    </div>
  )
}
