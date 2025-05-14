import type { Metadata } from "next"
import { excursiones } from "@/data/excursiones"
import ExcursionesGrid from "@/components/excursiones-grid"
import { Palmtree, Mountain, Ship, Compass, MapPin, Calendar, Users, Tag } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Excursiones en Tenerife | Tenerife Paradise Tours",
  description:
    "Descubre nuestras excursiones en Tenerife. Aventuras, tours guiados y experiencias únicas en el paraíso canario.",
}

export default function ExcursionesPage({ searchParams }: { searchParams: { q?: string; categoria?: string } }) {
  // Filtrar excursiones destacadas
  const excursionesDestacadas = excursiones.filter((e) => e.destacado)

  // Obtener categorías únicas para las tarjetas de categoría
  const categorias = [...new Set(excursiones.map((e) => e.categoria))]

  // Contar excursiones por categoría
  const excursionesPorCategoria = categorias.reduce(
    (acc, categoria) => {
      acc[categoria] = excursiones.filter((e) => e.categoria === categoria).length
      return acc
    },
    {} as Record<string, number>,
  )

  // Obtener ubicaciones únicas para el mapa de destinos
  const ubicaciones = [...new Set(excursiones.map((e) => e.ubicacion))]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero section */}
      <div className="relative rounded-xl overflow-hidden mb-12">
        <div
          className="h-64 bg-cover bg-center"
          style={{ backgroundImage: "url('/acantilados-los-gigantes-tenerife-paradise.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-negro/80 to-negro/40 flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-blanco mb-4">Excursiones en Tenerife</h1>
            <p className="text-xl text-blanco/90 max-w-2xl">
              Descubre la belleza y la magia de Tenerife con nuestras excursiones guiadas por expertos locales
            </p>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-turquesa text-center">
          <Palmtree className="h-8 w-8 mx-auto mb-2 text-turquesa" />
          <div className="text-2xl font-bold">{excursiones.length}+</div>
          <div className="text-gray-600">Excursiones</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-dorado text-center">
          <Mountain className="h-8 w-8 mx-auto mb-2 text-dorado" />
          <div className="text-2xl font-bold">{ubicaciones.length}+</div>
          <div className="text-gray-600">Destinos</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-turquesa text-center">
          <Ship className="h-8 w-8 mx-auto mb-2 text-turquesa" />
          <div className="text-2xl font-bold">5000+</div>
          <div className="text-gray-600">Clientes satisfechos</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-dorado text-center">
          <Compass className="h-8 w-8 mx-auto mb-2 text-dorado" />
          <div className="text-2xl font-bold">4.9/5</div>
          <div className="text-gray-600">Valoración media</div>
        </div>
      </div>

      {/* Categorías destacadas */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Explora por Categorías</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categorias.map((categoria) => (
            <Link href={`/excursiones?categoria=${categoria}`} key={categoria} className="group">
              <Card className="overflow-hidden h-40 relative group-hover:shadow-lg transition-shadow">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      categoria === "Naturaleza"
                        ? "/tenerife-teide-landscape.png"
                        : categoria === "Aventura"
                          ? "/tenerife-excursion.png"
                          : "/tenerife-landscape-panorama.png"
                    })`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-negro/80 to-negro/30 group-hover:from-negro/90 transition-colors" />
                </div>
                <CardContent className="relative h-full flex flex-col justify-end p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">{categoria}</h3>
                      <p className="text-white/80 text-sm">{excursionesPorCategoria[categoria]} excursiones</p>
                    </div>
                    <Tag className="h-8 w-8 text-dorado" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Tabs de contenido */}
      <Tabs defaultValue="todas" className="mb-12">
        <div className="bg-white rounded-lg shadow-md p-6 border border-dorado/20">
          <h2 className="text-2xl font-bold mb-6">Nuestras Excursiones</h2>

          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="todas">Todas las excursiones</TabsTrigger>
            <TabsTrigger value="destacadas">Destacadas</TabsTrigger>
            <TabsTrigger value="ofertas">Ofertas especiales</TabsTrigger>
          </TabsList>

          <TabsContent value="todas">
            <ExcursionesGrid excursiones={excursiones} showFilters={true} />
          </TabsContent>

          <TabsContent value="destacadas">
            <ExcursionesGrid excursiones={excursionesDestacadas} showFilters={true} />
          </TabsContent>

          <TabsContent value="ofertas">
            <ExcursionesGrid excursiones={excursiones.filter((e) => e.precioAnterior)} showFilters={true} />
          </TabsContent>
        </div>
      </Tabs>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-negro to-negro/90 rounded-lg shadow-md p-8 text-center mb-12">
        <h3 className="text-2xl font-bold text-dorado mb-4">¿Buscas una experiencia personalizada?</h3>
        <p className="text-blanco mb-6 max-w-2xl mx-auto">
          Podemos diseñar excursiones a medida según tus preferencias y necesidades. Contáctanos para crear tu aventura
          perfecta en Tenerife.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="bg-turquesa hover:bg-turquesa/90 text-blanco font-bold py-3 px-6 rounded-md">
            <Link href="/contacto">Contactar ahora</Link>
          </Button>
          <Button asChild className="bg-dorado hover:bg-dorado/90 text-negro font-bold py-3 px-6 rounded-md">
            <Link href="/excursiones?ofertas=true">Ver ofertas especiales</Link>
          </Button>
        </div>
      </div>

      {/* Mapa de destinos */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-dorado/20 mb-12">
        <h2 className="text-2xl font-bold mb-6">Destinos Populares</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ubicaciones.slice(0, 6).map((ubicacion) => (
            <Link
              href={`/excursiones?ubicacion=${ubicacion}`}
              key={ubicacion}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-turquesa hover:bg-turquesa/5 transition-colors"
            >
              <MapPin className="h-6 w-6 text-turquesa mr-3" />
              <div>
                <h3 className="font-medium">{ubicacion}</h3>
                <p className="text-sm text-gray-600">
                  {excursiones.filter((e) => e.ubicacion === ubicacion).length} excursiones
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Información adicional */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <Calendar className="h-10 w-10 text-turquesa mb-4" />
            <h3 className="text-xl font-bold mb-2">Reserva con Flexibilidad</h3>
            <p className="text-gray-600">
              Ofrecemos políticas de cancelación flexibles para que puedas planificar tu viaje con tranquilidad.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <Users className="h-10 w-10 text-turquesa mb-4" />
            <h3 className="text-xl font-bold mb-2">Guías Expertos Locales</h3>
            <p className="text-gray-600">
              Nuestros guías son expertos locales con amplio conocimiento de la historia y cultura de Tenerife.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <Compass className="h-10 w-10 text-turquesa mb-4" />
            <h3 className="text-xl font-bold mb-2">Experiencias Auténticas</h3>
            <p className="text-gray-600">
              Descubre Tenerife desde una perspectiva local con experiencias auténticas y fuera de lo común.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
