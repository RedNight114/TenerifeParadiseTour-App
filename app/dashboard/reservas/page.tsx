import { TablaReservas } from "@/components/dashboard/tabla-reservas"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Download, Search } from "lucide-react"

export default function ReservasPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reservas</h1>
          <p className="text-muted-foreground">Gestiona todas las reservas recibidas para tus excursiones.</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nombre, email o excursión..."
            className="pl-8 w-full md:max-w-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filtrar por fecha</span>
        </div>
      </div>

      <Tabs defaultValue="todas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
          <TabsTrigger value="confirmadas">Confirmadas</TabsTrigger>
          <TabsTrigger value="canceladas">Canceladas</TabsTrigger>
        </TabsList>
        <TabsContent value="todas">
          <Card>
            <CardHeader>
              <CardTitle>Todas las reservas</CardTitle>
              <CardDescription>Lista completa de todas las reservas recibidas para tus excursiones.</CardDescription>
            </CardHeader>
            <CardContent>
              <TablaReservas />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pendientes">
          <Card>
            <CardHeader>
              <CardTitle>Reservas pendientes</CardTitle>
              <CardDescription>Reservas que aún no han sido confirmadas o procesadas.</CardDescription>
            </CardHeader>
            <CardContent>
              <TablaReservas estado="pendiente" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="confirmadas">
          <Card>
            <CardHeader>
              <CardTitle>Reservas confirmadas</CardTitle>
              <CardDescription>Reservas que han sido confirmadas y están listas para realizarse.</CardDescription>
            </CardHeader>
            <CardContent>
              <TablaReservas estado="confirmada" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="canceladas">
          <Card>
            <CardHeader>
              <CardTitle>Reservas canceladas</CardTitle>
              <CardDescription>Reservas que han sido canceladas por el cliente o por el sistema.</CardDescription>
            </CardHeader>
            <CardContent>
              <TablaReservas estado="cancelada" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
