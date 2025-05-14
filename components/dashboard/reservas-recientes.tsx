import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { reservas } from "@/data/reservas"

export function ReservasRecientes() {
  // Obtener las 5 reservas más recientes
  const reservasRecientes = [...reservas]
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reservas Recientes</CardTitle>
        <CardDescription>Has recibido 12 reservas esta semana</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {reservasRecientes.map((reserva) => (
            <div key={reserva.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarFallback>
                  {reserva.cliente
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{reserva.cliente}</p>
                <p className="text-sm text-muted-foreground">
                  {reserva.excursion} - {new Date(reserva.fecha).toLocaleDateString()}
                </p>
              </div>
              <div className="ml-auto font-medium">
                {new Intl.NumberFormat("es-ES", {
                  style: "currency",
                  currency: "EUR",
                }).format(reserva.total)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
