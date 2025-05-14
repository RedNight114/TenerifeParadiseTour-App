"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Clock, Loader2, Mail, MapPin, Phone, User } from "lucide-react"
import { useState } from "react"
import { useReservas, type Reserva } from "@/contexts/reserva-context"
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

interface DetallesReservaProps {
  reserva: Reserva
  mostrarAcciones?: boolean
}

export function DetallesReserva({ reserva, mostrarAcciones = true }: DetallesReservaProps) {
  const { cambiarEstadoReserva, eliminarReserva } = useReservas()
  const [procesando, setProcesando] = useState(false)
  const [accionActual, setAccionActual] = useState<string | null>(null)

  // Manejar cambio de estado
  const handleCambiarEstado = async (nuevoEstado: Reserva["estado"]) => {
    setProcesando(true)
    setAccionActual(`cambiar-estado-${nuevoEstado}`)
    await cambiarEstadoReserva(reserva.id, nuevoEstado)
    setProcesando(false)
    setAccionActual(null)
  }

  // Manejar eliminación
  const handleEliminar = async () => {
    setProcesando(true)
    setAccionActual("eliminar")
    await eliminarReserva(reserva.id)
    setProcesando(false)
    setAccionActual(null)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Información de la Reserva</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estado:</span>
                <Badge
                  variant={
                    reserva.estado === "confirmada"
                      ? "default"
                      : reserva.estado === "pendiente"
                        ? "outline"
                        : reserva.estado === "completada"
                          ? "secondary"
                          : "destructive"
                  }
                >
                  {reserva.estado === "confirmada"
                    ? "Confirmada"
                    : reserva.estado === "pendiente"
                      ? "Pendiente"
                      : reserva.estado === "completada"
                        ? "Completada"
                        : "Cancelada"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fecha de reserva:</span>
                <span className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {format(new Date(reserva.fecha), "dd/MM/yyyy", { locale: es })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hora:</span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {reserva.hora}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Adultos:</span>
                <span>{reserva.adultos}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Niños:</span>
                <span>{reserva.ninos}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total:</span>
                <span className="font-bold">
                  {new Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: "EUR",
                  }).format(reserva.total)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Información del Cliente</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <User className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="font-medium">{reserva.cliente}</p>
                  <p className="text-sm text-muted-foreground">Nombre completo</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p>{reserva.email}</p>
                  <p className="text-sm text-muted-foreground">Email</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p>{reserva.telefono}</p>
                  <p className="text-sm text-muted-foreground">Teléfono</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Detalles de la Excursión</h3>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-lg">{reserva.excursion}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {reserva.ubicacion}
              </div>
            </div>

            <Separator />

            <div>
              <p className="font-medium">Punto de encuentro</p>
              <p className="text-sm text-muted-foreground">{reserva.puntoEncuentro}</p>
            </div>

            {reserva.comentarios && (
              <>
                <Separator />
                <div>
                  <p className="font-medium">Comentarios adicionales</p>
                  <p className="text-sm text-muted-foreground">{reserva.comentarios}</p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {mostrarAcciones && (
        <div className="flex justify-end gap-2">
          <Button variant="outline">Enviar Email</Button>
          <Button variant="outline">Imprimir</Button>

          {reserva.estado === "pendiente" && (
            <Button
              onClick={() => handleCambiarEstado("confirmada")}
              disabled={procesando && accionActual === "cambiar-estado-confirmada"}
            >
              {procesando && accionActual === "cambiar-estado-confirmada" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                "Confirmar Reserva"
              )}
            </Button>
          )}

          {reserva.estado === "confirmada" && (
            <Button
              variant="secondary"
              onClick={() => handleCambiarEstado("completada")}
              disabled={procesando && accionActual === "cambiar-estado-completada"}
            >
              {procesando && accionActual === "cambiar-estado-completada" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                "Marcar como Completada"
              )}
            </Button>
          )}

          {(reserva.estado === "pendiente" || reserva.estado === "confirmada") && (
            <Button
              variant="destructive"
              onClick={() => handleCambiarEstado("cancelada")}
              disabled={procesando && accionActual === "cambiar-estado-cancelada"}
            >
              {procesando && accionActual === "cambiar-estado-cancelada" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                "Cancelar Reserva"
              )}
            </Button>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                Eliminar
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Se eliminará permanentemente la reserva #{reserva.id} y todos sus
                  datos asociados.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleEliminar}
                  disabled={procesando && accionActual === "eliminar"}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {procesando && accionActual === "eliminar" ? (
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
        </div>
      )}
    </div>
  )
}
