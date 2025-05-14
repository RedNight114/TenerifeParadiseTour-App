import { TablaExcursiones } from "@/components/dashboard/tabla-excursiones"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Search } from "lucide-react"
import Link from "next/link"

export default function ExcursionesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Excursiones</h1>
          <p className="text-muted-foreground">Gestiona las excursiones disponibles en tu sitio web.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/excursiones/nueva">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nueva Excursión
          </Link>
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por nombre, ubicación o categoría..."
          className="pl-8 w-full md:max-w-sm"
        />
      </div>

      <Tabs defaultValue="todas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="activas">Activas</TabsTrigger>
          <TabsTrigger value="destacadas">Destacadas</TabsTrigger>
          <TabsTrigger value="inactivas">Inactivas</TabsTrigger>
        </TabsList>
        <TabsContent value="todas">
          <Card>
            <CardHeader>
              <CardTitle>Todas las excursiones</CardTitle>
              <CardDescription>Lista completa de todas las excursiones disponibles en tu sitio web.</CardDescription>
            </CardHeader>
            <CardContent>
              <TablaExcursiones />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activas">
          <Card>
            <CardHeader>
              <CardTitle>Excursiones activas</CardTitle>
              <CardDescription>Excursiones que están actualmente disponibles para reserva.</CardDescription>
            </CardHeader>
            <CardContent>
              <TablaExcursiones estado="activa" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="destacadas">
          <Card>
            <CardHeader>
              <CardTitle>Excursiones destacadas</CardTitle>
              <CardDescription>Excursiones que aparecen como destacadas en la página principal.</CardDescription>
            </CardHeader>
            <CardContent>
              <TablaExcursiones destacada={true} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inactivas">
          <Card>
            <CardHeader>
              <CardTitle>Excursiones inactivas</CardTitle>
              <CardDescription>Excursiones que no están disponibles actualmente para reserva.</CardDescription>
            </CardHeader>
            <CardContent>
              <TablaExcursiones estado="inactiva" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
