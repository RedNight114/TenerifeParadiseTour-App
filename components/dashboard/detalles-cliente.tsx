import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Mail, MapPin, Phone, Star, User } from "lucide-react"
import type { Cliente } from "@/contexts/cliente-context"

interface DetallesClienteProps {
  cliente: Cliente
}

export function DetallesCliente({ cliente }: DetallesClienteProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Información Personal</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <User className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="font-medium">{cliente.nombre}</p>
                  <p className="text-sm text-muted-foreground">Nombre completo</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p>{cliente.email}</p>
                  <p className="text-sm text-muted-foreground">Email</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p>{cliente.telefono}</p>
                  <p className="text-sm text-muted-foreground">Teléfono</p>
                </div>
              </div>
              {cliente.direccion && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p>{cliente.direccion}</p>
                    <p className="text-sm text-muted-foreground">Dirección</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Información de Cliente</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estado:</span>
                <Badge
                  variant={
                    cliente.estado === "activo"
                      ? "default"
                      : cliente.estado === "inactivo"
                        ? "secondary"
                        : cliente.estado === "nuevo"
                          ? "outline"
                          : "destructive"
                  }
                >
                  {cliente.estado === "activo"
                    ? "Activo"
                    : cliente.estado === "inactivo"
                      ? "Inactivo"
                      : cliente.estado === "nuevo"
                        ? "Nuevo"
                        : "Bloqueado"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cliente desde:</span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(cliente.fechaRegistro).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total de reservas:</span>
                <span>{cliente.reservas}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Última reserva:</span>
                <span>
                  {cliente.ultimaReserva ? new Date(cliente.ultimaReserva).toLocaleDateString() : "Sin reservas"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cliente VIP:</span>
                <span className="flex items-center">
                  {cliente.vip ? (
                    <>
                      <Star className="h-4 w-4 mr-1 text-yellow-500" /> Sí
                    </>
                  ) : (
                    "No"
                  )}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {cliente.notas && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Notas</h3>
            <p>{cliente.notas}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
