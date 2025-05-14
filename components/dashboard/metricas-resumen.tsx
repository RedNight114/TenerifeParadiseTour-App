"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, CalendarRange, Euro, Users, Globe } from "lucide-react"

export function MetricasResumen() {
  // Datos de ejemplo
  const metricas = [
    {
      title: "Ingresos Totales",
      value: "12,543€",
      change: "+12.5%",
      changeType: "positive",
      icon: Euro,
      description: "Comparado con el mes anterior",
    },
    {
      title: "Reservas",
      value: "324",
      change: "+18.2%",
      changeType: "positive",
      icon: CalendarRange,
      description: "Comparado con el mes anterior",
    },
    {
      title: "Clientes Nuevos",
      value: "132",
      change: "+5.3%",
      changeType: "positive",
      icon: Users,
      description: "Comparado con el mes anterior",
    },
    {
      title: "Tasa de Ocupación",
      value: "78%",
      change: "-2.1%",
      changeType: "negative",
      icon: Globe,
      description: "Comparado con el mes anterior",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metricas.map((metrica, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metrica.title}</CardTitle>
            <metrica.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrica.value}</div>
            <div className="flex items-center space-x-1 text-xs">
              {metrica.changeType === "positive" ? (
                <ArrowUp className="h-3 w-3 text-green-500" />
              ) : (
                <ArrowDown className="h-3 w-3 text-red-500" />
              )}
              <span className={metrica.changeType === "positive" ? "text-green-500" : "text-red-500"}>
                {metrica.change}
              </span>
              <p className="text-muted-foreground">{metrica.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
