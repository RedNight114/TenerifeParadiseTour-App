import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { excursiones } from "@/data/excursiones"

export function ExcursionesPopulares() {
  // Simulamos datos de popularidad
  const excursionesConReservas = excursiones.map((excursion) => ({
    ...excursion,
    reservas: Math.floor(Math.random() * 50) + 5,
    ingresos: (Math.floor(Math.random() * 50) + 5) * excursion.precio,
  }))

  // Ordenamos por número de reservas
  const excursionesPopulares = [...excursionesConReservas].sort((a, b) => b.reservas - a.reservas).slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Excursiones Populares</CardTitle>
        <CardDescription>Las excursiones más reservadas este mes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {excursionesPopulares.map((excursion) => (
            <div key={excursion.id} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{excursion.nombre}</p>
                <p className="text-sm text-muted-foreground">{excursion.ubicacion}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-sm font-medium">{excursion.reservas} reservas</p>
                <p className="text-sm text-muted-foreground">
                  {new Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: "EUR",
                  }).format(excursion.ingresos)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
