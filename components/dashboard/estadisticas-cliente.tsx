"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useReservas } from "@/contexts/reserva-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import type { Cliente } from "@/contexts/cliente-context"

interface EstadisticasClienteProps {
  cliente: Cliente
}

export function EstadisticasCliente({ cliente }: EstadisticasClienteProps) {
  const { obtenerReservasPorCliente, cargando, error } = useReservas()

  // Obtener reservas del cliente
  const reservasCliente = obtenerReservasPorCliente(cliente.id)

  // Calcular el valor total de las reservas
  const valorTotalReservas = reservasCliente.reduce((total, reserva) => total + reserva.total, 0)

  // Calcular el valor medio por reserva
  const valorMedioPorReserva = cliente.reservas > 0 ? valorTotalReservas / cliente.reservas : 0

  // Preparar datos para el gráfico de gasto mensual
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
  const datosGastoMensual = meses.map((mes) => {
    return { mes, gasto: 0 }
  })

  // Rellenar datos reales
  reservasCliente.forEach((reserva) => {
    const fecha = new Date(reserva.fecha)
    const mes = fecha.getMonth()
    datosGastoMensual[mes].gasto += reserva.total
  })

  // Preparar datos para el gráfico de categorías
  const categorias = ["Cultura", "Gastronomía", "Aventura", "Romántico", "Actividades"]
  const datosReservasPorCategoria = categorias.map((categoria) => {
    const reservasCategoria = reservasCliente.filter((r) => {
      // Aquí deberíamos tener la categoría de la excursión, pero como es un ejemplo, usamos una lógica simple
      if (categoria === "Cultura" && r.excursion.includes("Ciudad")) return true
      if (categoria === "Gastronomía" && r.excursion.includes("Gastronómico")) return true
      if (categoria === "Aventura" && r.excursion.includes("Montaña")) return true
      if (categoria === "Romántico" && r.excursion.includes("Atardecer")) return true
      if (categoria === "Actividades" && r.excursion.includes("Bicicleta")) return true
      return false
    }).length

    return { categoria, reservas: reservasCategoria }
  })

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (cargando) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Gastado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("es-ES", {
                style: "currency",
                currency: "EUR",
              }).format(valorTotalReservas)}
            </div>
            <p className="text-xs text-muted-foreground">En todas las reservas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valor Medio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("es-ES", {
                style: "currency",
                currency: "EUR",
              }).format(valorMedioPorReserva)}
            </div>
            <p className="text-xs text-muted-foreground">Por reserva</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Fidelidad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {cliente.reservas > 5 ? "Alta" : cliente.reservas > 2 ? "Media" : "Baja"}
            </div>
            <p className="text-xs text-muted-foreground">Basado en frecuencia de reservas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Gasto Mensual</CardTitle>
            <CardDescription>Evolución del gasto en los últimos 12 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={datosGastoMensual}>
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [
                      `${new Intl.NumberFormat("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      }).format(value as number)}`,
                      "Gasto",
                    ]}
                    contentStyle={{ borderRadius: "8px" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="gasto"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reservas por Categoría</CardTitle>
            <CardDescription>Distribución de reservas por tipo de excursión</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={datosReservasPorCategoria}>
                  <XAxis dataKey="categoria" />
                  <YAxis allowDecimals={false} />
                  <Tooltip
                    formatter={(value) => [`${value} reservas`, "Reservas"]}
                    contentStyle={{ borderRadius: "8px" }}
                  />
                  <Bar dataKey="reservas" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recomendaciones</CardTitle>
          <CardDescription>Sugerencias basadas en el comportamiento del cliente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-md bg-muted/50">
              <h3 className="font-medium mb-2">Excursiones recomendadas</h3>
              <ul className="list-disc pl-5 space-y-1">
                {cliente.categoriasPreferidas?.includes("Gastronomía") && (
                  <li>Tour Gastronómico - Basado en preferencias anteriores</li>
                )}
                {cliente.categoriasPreferidas?.includes("Cultura") && (
                  <li>Visita Guiada al Museo - Categoría de interés: Cultura</li>
                )}
                <li>Tour por la Ciudad Histórica - Excursión popular entre clientes similares</li>
              </ul>
            </div>

            <div className="p-4 border rounded-md bg-muted/50">
              <h3 className="font-medium mb-2">Oportunidades de venta</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Ofrecer descuento por reserva anticipada para la temporada alta</li>
                {cliente.vip && <li>Proponer paquete de excursiones exclusivas para clientes VIP</li>}
                {cliente.reservas > 3 && <li>Ofrecer programa de fidelización con beneficios especiales</li>}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
