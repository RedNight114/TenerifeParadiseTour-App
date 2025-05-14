"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MapPin, Calendar, Search, X, Star, Heart, Grid3X3, List, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import type { Excursion } from "@/types/excursion"

interface ExcursionesGridProps {
  excursiones: Excursion[]
  showFilters?: boolean
}

export default function ExcursionesGrid({ excursiones, showFilters = true }: ExcursionesGridProps) {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(null)
  const [selectedUbicacion, setSelectedUbicacion] = useState<string | null>(null)
  const [precioRange, setPrecioRange] = useState<[number, number]>([0, 500])
  const [duracionFilter, setDuracionFilter] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<string>("popular")
  const [favoritos, setFavoritos] = useState<string[]>([])
  const [filtersVisible, setFiltersVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Obtener categorías y ubicaciones únicas
  const categorias = [...new Set(excursiones.map((excursion) => excursion.categoria))]
  const ubicaciones = [...new Set(excursiones.map((excursion) => excursion.ubicacion))]

  // Simular carga de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Gestionar favoritos
  const toggleFavorito = (id: string) => {
    setFavoritos((prev) => {
      if (prev.includes(id)) {
        toast({
          title: "Eliminado de favoritos",
          description: "La excursión ha sido eliminada de tus favoritos",
        })
        return prev.filter((favId) => favId !== id)
      } else {
        toast({
          title: "Añadido a favoritos",
          description: "La excursión ha sido añadida a tus favoritos",
        })
        return [...prev, id]
      }
    })
  }

  // Filtrar excursiones
  const filteredExcursiones = excursiones.filter((excursion) => {
    const matchesSearch =
      excursion.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (excursion.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)

    const matchesCategoria = !selectedCategoria || excursion.categoria === selectedCategoria
    const matchesUbicacion = !selectedUbicacion || excursion.ubicacion === selectedUbicacion
    const matchesPrecio = excursion.precio >= precioRange[0] && excursion.precio <= precioRange[1]

    const matchesDuracion =
      duracionFilter.length === 0 ||
      duracionFilter.some((filtro) => {
        if (filtro === "corta" && excursion.duracion.includes("hora")) return true
        if (filtro === "media" && (excursion.duracion.includes("4") || excursion.duracion.includes("5"))) return true
        if (filtro === "larga" && excursion.duracion.toLowerCase().includes("día")) return true
        return false
      })

    return matchesSearch && matchesCategoria && matchesUbicacion && matchesPrecio && matchesDuracion
  })

  // Ordenar excursiones
  const sortedExcursiones = [...filteredExcursiones].sort((a, b) => {
    switch (sortBy) {
      case "precio-asc":
        return a.precio - b.precio
      case "precio-desc":
        return b.precio - a.precio
      case "nombre":
        return a.nombre.localeCompare(b.nombre)
      case "duracion":
        return a.duracion.localeCompare(b.duracion)
      default: // popular
        return b.destacado === a.destacado ? 0 : b.destacado ? 1 : -1
    }
  })

  // Limpiar filtros
  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategoria(null)
    setSelectedUbicacion(null)
    setPrecioRange([0, 500])
    setDuracionFilter([])
  }

  // Renderizar skeleton durante la carga
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <CardContent className="p-4">
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center border-t border-gray-100">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {showFilters && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-dorado/20">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full md:w-1/3">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="search"
                  type="text"
                  placeholder="Buscar excursiones..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full md:w-1/4">
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <select
                id="categoria"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-turquesa focus:ring-turquesa"
                value={selectedCategoria || ""}
                onChange={(e) => setSelectedCategoria(e.target.value || null)}
              >
                <option value="">Todas las categorías</option>
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-1/4">
              <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-1">
                Ubicación
              </label>
              <select
                id="ubicacion"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-turquesa focus:ring-turquesa"
                value={selectedUbicacion || ""}
                onChange={(e) => setSelectedUbicacion(e.target.value || null)}
              >
                <option value="">Todas las ubicaciones</option>
                {ubicaciones.map((ubicacion) => (
                  <option key={ubicacion} value={ubicacion}>
                    {ubicacion}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => setFiltersVisible(!filtersVisible)}
                variant="outline"
                className="flex items-center"
              >
                <SlidersHorizontal className="h-4 w-4 mr-1" />
                {filtersVisible ? "Ocultar filtros" : "Más filtros"}
              </Button>
              <Button type="button" onClick={clearFilters} variant="outline" className="flex items-center">
                <X className="h-4 w-4 mr-1" /> Limpiar
              </Button>
            </div>
          </div>

          {/* Filtros avanzados */}
          {filtersVisible && (
            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Rango de precio</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 500]}
                      max={500}
                      step={10}
                      value={precioRange}
                      onValueChange={(value) => setPrecioRange(value as [number, number])}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{precioRange[0]}€</span>
                      <span>{precioRange[1]}€</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Duración</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox
                        id="duracion-corta"
                        checked={duracionFilter.includes("corta")}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setDuracionFilter((prev) => [...prev, "corta"])
                          } else {
                            setDuracionFilter((prev) => prev.filter((d) => d !== "corta"))
                          }
                        }}
                        className="mr-2"
                      />
                      <label htmlFor="duracion-corta" className="text-sm">
                        Corta (1-3 horas)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="duracion-media"
                        checked={duracionFilter.includes("media")}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setDuracionFilter((prev) => [...prev, "media"])
                          } else {
                            setDuracionFilter((prev) => prev.filter((d) => d !== "media"))
                          }
                        }}
                        className="mr-2"
                      />
                      <label htmlFor="duracion-media" className="text-sm">
                        Media (4-6 horas)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="duracion-larga"
                        checked={duracionFilter.includes("larga")}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setDuracionFilter((prev) => [...prev, "larga"])
                          } else {
                            setDuracionFilter((prev) => prev.filter((d) => d !== "larga"))
                          }
                        }}
                        className="mr-2"
                      />
                      <label htmlFor="duracion-larga" className="text-sm">
                        Día completo
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Filtros activos */}
          {(selectedCategoria ||
            selectedUbicacion ||
            searchTerm ||
            duracionFilter.length > 0 ||
            precioRange[0] > 0 ||
            precioRange[1] < 500) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-1 bg-dorado/20 text-negro">
                  Búsqueda: {searchTerm}
                  <button onClick={() => setSearchTerm("")} className="ml-1 hover:text-turquesa">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedCategoria && (
                <Badge variant="secondary" className="flex items-center gap-1 bg-dorado/20 text-negro">
                  Categoría: {selectedCategoria}
                  <button onClick={() => setSelectedCategoria(null)} className="ml-1 hover:text-turquesa">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedUbicacion && (
                <Badge variant="secondary" className="flex items-center gap-1 bg-dorado/20 text-negro">
                  Ubicación: {selectedUbicacion}
                  <button onClick={() => setSelectedUbicacion(null)} className="ml-1 hover:text-turquesa">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {(precioRange[0] > 0 || precioRange[1] < 500) && (
                <Badge variant="secondary" className="flex items-center gap-1 bg-dorado/20 text-negro">
                  Precio: {precioRange[0]}€ - {precioRange[1]}€
                  <button onClick={() => setPrecioRange([0, 500])} className="ml-1 hover:text-turquesa">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {duracionFilter.map((filtro) => (
                <Badge key={filtro} variant="secondary" className="flex items-center gap-1 bg-dorado/20 text-negro">
                  Duración: {filtro === "corta" ? "Corta" : filtro === "media" ? "Media" : "Día completo"}
                  <button
                    onClick={() => setDuracionFilter((prev) => prev.filter((d) => d !== filtro))}
                    className="ml-1 hover:text-turquesa"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Controles de visualización */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="text-sm text-gray-600 mr-2">{sortedExcursiones.length} excursiones encontradas</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Ordenar por:</span>
            <select
              className="rounded-md border-gray-300 text-sm focus:border-turquesa focus:ring-turquesa"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Popularidad</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="nombre">Nombre</option>
              <option value="duracion">Duración</option>
            </select>
          </div>

          <div className="flex border rounded-md overflow-hidden">
            <button
              className={`p-2 ${viewMode === "grid" ? "bg-turquesa text-white" : "bg-white text-gray-600"}`}
              onClick={() => setViewMode("grid")}
              aria-label="Ver en cuadrícula"
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              className={`p-2 ${viewMode === "list" ? "bg-turquesa text-white" : "bg-white text-gray-600"}`}
              onClick={() => setViewMode("list")}
              aria-label="Ver en lista"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Resultados en modo cuadrícula */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedExcursiones.map((excursion) => (
            <Card
              key={excursion.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-dorado/10 hover:border-dorado group"
            >
              <div className="relative h-48">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      excursion.imagen ||
                      `/placeholder.svg?height=600&width=800&text=${encodeURIComponent(excursion.nombre)}`
                    })`,
                  }}
                ></div>
                {excursion.destacado && (
                  <div className="absolute top-2 left-2 bg-dorado text-negro text-xs font-bold px-2 py-1 rounded">
                    Destacado
                  </div>
                )}
                {excursion.precioAnterior && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded ml-20">
                    Oferta
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    toggleFavorito(excursion.id)
                  }}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1.5 rounded-full transition-colors"
                >
                  <Heart
                    className={`h-4 w-4 ${favoritos.includes(excursion.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                  />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-negro/70 to-transparent p-4">
                  <h3 className="text-blanco font-bold text-xl">{excursion.nombre}</h3>
                  <div className="flex items-center text-blanco/90 text-sm">
                    <MapPin className="h-4 w-4 mr-1" /> {excursion.ubicacion}
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="outline" className="border-turquesa text-turquesa">
                    {excursion.categoria || "General"}
                  </Badge>
                  <div className="flex items-center text-dorado text-sm">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                    <span className="text-gray-600 ml-1">(120)</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mb-3">
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 mr-1 text-turquesa" />
                    <span className="font-medium">{excursion.ubicacion}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1 text-turquesa" /> {excursion.duracion}
                  </div>
                </div>

                <p className="text-gray-600 line-clamp-3 mb-4">{excursion.descripcionCorta}</p>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex justify-between items-center border-t border-gray-100">
                <div>
                  <span className="text-2xl font-bold text-turquesa">{excursion.precio}€</span>
                  {excursion.precioAnterior && (
                    <span className="text-sm text-gray-500 line-through ml-2">{excursion.precioAnterior}€</span>
                  )}
                  <span className="text-gray-500 text-sm ml-1">por persona</span>
                </div>
                <Button asChild variant="secondary">
                  <Link href={`/excursiones/${excursion.id}`}>Ver detalles</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Resultados en modo lista */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {sortedExcursiones.map((excursion) => (
            <Card
              key={excursion.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-dorado/10 hover:border-dorado"
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative h-48 md:h-auto md:w-1/3">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${excursion.imagen || "/tenerife-excursion.png"})` }}
                  ></div>
                  {excursion.destacado && (
                    <div className="absolute top-2 left-2 bg-dorado text-negro text-xs font-bold px-2 py-1 rounded">
                      Destacado
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      toggleFavorito(excursion.id)
                    }}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1.5 rounded-full transition-colors"
                  >
                    <Heart
                      className={`h-4 w-4 ${favoritos.includes(excursion.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                    />
                  </button>
                </div>

                <div className="p-4 md:w-2/3 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-negro">{excursion.nombre}</h3>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <MapPin className="h-4 w-4 mr-1" /> {excursion.ubicacion}
                        <span className="mx-2">•</span>
                        <Calendar className="h-4 w-4 mr-1" /> {excursion.duracion}
                      </div>
                    </div>
                    <Badge variant="outline" className="border-turquesa text-turquesa">
                      {excursion.categoria}
                    </Badge>
                  </div>

                  <div className="flex items-center text-dorado text-sm mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                    <span className="text-gray-600 ml-1">(120)</span>
                  </div>

                  <p className="text-gray-600 mb-4 flex-grow">{excursion.descripcionCorta}</p>

                  <div className="flex justify-between items-center mt-auto">
                    <div>
                      <span className="text-2xl font-bold text-turquesa">{excursion.precio}€</span>
                      {excursion.precioAnterior && (
                        <span className="text-sm text-gray-500 line-through ml-2">{excursion.precioAnterior}€</span>
                      )}
                      <span className="text-gray-500 text-sm ml-1">por persona</span>
                    </div>
                    <Button asChild variant="secondary">
                      <Link href={`/excursiones/${excursion.id}`}>Ver detalles</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {sortedExcursiones.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold mb-2">No se encontraron excursiones</h3>
          <p className="text-gray-600 mb-4">Prueba con otros criterios de búsqueda</p>
          <Button onClick={clearFilters}>Ver todas las excursiones</Button>
        </div>
      )}
    </div>
  )
}
