"use client"

import { TablaClientes } from "@/components/dashboard/tabla-clientes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Search, UserPlus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useClientes } from "@/contexts/cliente-context"

export default function ClientesPage() {
  const [busqueda, setBusqueda] = useState("")
  const { clientes } = useClientes()

  // Estadísticas básicas
  const totalClientes = clientes.length
  const clientesActivos = clientes.filter((c) => c.estado === "activo").length
  const clientesNuevos = clientes.filter(
    (c) => c.estado === "nuevo" || new Date(c.fechaRegistro) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  ).length
  const clientesRecurrentes = clientes.filter((c) => c.reservas > 1).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground">Gestiona la información de tus clientes y su historial de reservas.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button asChild>
            <Link href="/dashboard/clientes/nuevo">
              <UserPlus className="mr-2 h-4 w-4" />
              Nuevo Cliente
            </Link>
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nombre, email o teléfono..."
            className="pl-8 w-full md:max-w-sm"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Filtros avanzados
          </Button>
        </div>
      </div>

      <Tabs defaultValue="todos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="todos">Todos ({totalClientes})</TabsTrigger>
          <TabsTrigger value="activos">Activos ({clientesActivos})</TabsTrigger>
          <TabsTrigger value="recurrentes">Recurrentes ({clientesRecurrentes})</TabsTrigger>
          <TabsTrigger value="nuevos">Nuevos ({clientesNuevos})</TabsTrigger>
        </TabsList>
        <TabsContent value="todos">
          <Card>
            <CardHeader>
              <CardTitle>Todos los clientes</CardTitle>
              <CardDescription>Lista completa de todos los clientes registrados.</CardDescription>
            </CardHeader>
            <CardContent>
              <TablaClientes />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activos">
          <Card>
            <CardHeader>
              <CardTitle>Clientes activos</CardTitle>
              <CardDescription>Clientes que han realizado reservas en los últimos 3 meses.</CardDescription>
            </CardHeader>
            <CardContent>
              <TablaClientes filtro="activos" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recurrentes">
          <Card>
            <CardHeader>
              <CardTitle>Clientes recurrentes</CardTitle>
              <CardDescription>Clientes que han realizado más de una reserva.</CardDescription>
            </CardHeader>
            <CardContent>
              <TablaClientes filtro="recurrentes" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="nuevos">
          <Card>
            <CardHeader>
              <CardTitle>Clientes nuevos</CardTitle>
              <CardDescription>Clientes registrados en los últimos 30 días.</CardDescription>
            </CardHeader>
            <CardContent>
              <TablaClientes filtro="nuevos" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
