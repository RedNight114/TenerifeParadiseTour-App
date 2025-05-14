"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DetallesCliente } from "@/components/dashboard/detalles-cliente"
import { HistorialReservas } from "@/components/dashboard/historial-reservas"
import { EstadisticasCliente } from "@/components/dashboard/estadisticas-cliente"
import { ChevronLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useClientes } from "@/contexts/cliente-context"
import { ClienteAcciones } from "@/components/dashboard/cliente-acciones"

export default function ClientePage() {
  const params = useParams()
  const clienteId = params?.id as string
  const router = useRouter()
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
          <Link href="/dashboard/clientes">
            <ChevronLeft className="h-4 w-4" />
            Volver
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight">{cliente.nombre}</h1>
          {cliente.vip && (
            <Badge variant="outline" className="border-yellow-500 text-yellow-500 flex items-center gap-1">
              <span className="text-yellow-500">★</span> VIP
            </Badge>
          )}
        </div>

        {/* Aquí usamos el nuevo componente de acciones */}
        <ClienteAcciones cliente={cliente} />
      </div>

      <div className="text-sm text-muted-foreground">
        Cliente desde {new Date(cliente.fechaRegistro).toLocaleDateString()} · {cliente.reservas} reservas
      </div>

      <Tabs defaultValue="detalles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="detalles">Detalles</TabsTrigger>
          <TabsTrigger value="reservas">Historial de Reservas</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          <TabsTrigger value="preferencias">Preferencias</TabsTrigger>
        </TabsList>
        <TabsContent value="detalles">
          <Card>
            <CardHeader>
              <CardTitle>Información del Cliente</CardTitle>
              <CardDescription>Datos personales y de contacto.</CardDescription>
            </CardHeader>
            <CardContent>
              <DetallesCliente cliente={cliente} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reservas">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Historial de Reservas</CardTitle>
                <CardDescription>Todas las reservas realizadas por este cliente.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <HistorialReservas clienteId={cliente.id} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="estadisticas">
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas del Cliente</CardTitle>
              <CardDescription>Análisis de comportamiento y patrones de compra.</CardDescription>
            </CardHeader>
            <CardContent>
              <EstadisticasCliente cliente={cliente} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preferencias">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias</CardTitle>
              <CardDescription>Preferencias y configuración del cliente.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Categorías de interés</h3>
                  <div className="flex flex-wrap gap-2">
                    {cliente.categoriasPreferidas?.map((categoria) => (
                      <Badge key={categoria} variant="secondary">
                        {categoria}
                      </Badge>
                    ))}
                    {(!cliente.categoriasPreferidas || cliente.categoriasPreferidas.length === 0) && (
                      <p className="text-sm text-muted-foreground">No hay categorías preferidas registradas.</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Preferencias adicionales</h3>
                  <p className="text-sm">{cliente.preferencias || "No hay preferencias adicionales registradas."}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Configuración de comunicaciones</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <span>Emails de marketing</span>
                      <Badge variant="outline" className="bg-green-50">
                        Activado
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <span>Notificaciones SMS</span>
                      <Badge variant="outline" className="bg-green-50">
                        Activado
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <span>Recordatorios de excursiones</span>
                      <Badge variant="outline" className="bg-green-50">
                        Activado
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
