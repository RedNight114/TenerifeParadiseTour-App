import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DatePickerWithRange } from "@/components/dashboard/date-range-picker"
import { EstadisticasVentas } from "@/components/dashboard/estadisticas-ventas"
import { EstadisticasExcursiones } from "@/components/dashboard/estadisticas-excursiones"
import { MetricasResumen } from "@/components/dashboard/metricas-resumen"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EstadisticasPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Estadísticas</h1>
          <p className="text-muted-foreground">Análisis detallado del rendimiento de tus excursiones y reservas.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <DatePickerWithRange className="w-full sm:w-auto" />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filtrar</span>
          </Button>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Métricas Resumen</h2>
        <p className="text-muted-foreground">Visión general de las métricas clave de rendimiento.</p>
        <MetricasResumen />
      </section>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Ventas</CardTitle>
                <CardDescription>Evolución de ventas en el tiempo</CardDescription>
              </div>
              <Select defaultValue="6meses">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Periodo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30dias">Últimos 30 días</SelectItem>
                  <SelectItem value="3meses">Últimos 3 meses</SelectItem>
                  <SelectItem value="6meses">Últimos 6 meses</SelectItem>
                  <SelectItem value="12meses">Último año</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="pl-2">
            <EstadisticasVentas />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Excursiones Populares</CardTitle>
            <CardDescription>Por número de reservas</CardDescription>
          </CardHeader>
          <CardContent>
            <EstadisticasExcursiones />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
