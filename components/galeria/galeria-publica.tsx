"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Camera, ChevronLeft, ChevronRight, Expand } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { galeriaService } from "@/lib/api/galeria-service"
import type { ImagenGaleria, FiltrosGaleria } from "@/types/galeria"

export default function GaleriaPublica() {
  const [imagenes, setImagenes] = useState<ImagenGaleria[]>([])
  const [categorias, setCategorias] = useState<string[]>([])
  const [filtros, setFiltros] = useState<FiltrosGaleria>({})
  const [imagenSeleccionada, setImagenSeleccionada] = useState<ImagenGaleria | null>(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true)
      try {
        const [imagenesData, categoriasData] = await Promise.all([
          galeriaService.getImagenes(filtros),
          galeriaService.getCategorias(),
        ])
        setImagenes(imagenesData)
        setCategorias(categoriasData)
      } catch (error) {
        console.error("Error al cargar datos de la galería:", error)
      } finally {
        setCargando(false)
      }
    }

    cargarDatos()
  }, [filtros])

  const handleFiltroCategoria = (categoria: string) => {
    setFiltros((prev) => ({
      ...prev,
      categoria: prev.categoria === categoria ? undefined : categoria,
    }))
  }

  const handleAbrirImagen = (imagen: ImagenGaleria) => {
    setImagenSeleccionada(imagen)
  }

  const handleCerrarImagen = () => {
    setImagenSeleccionada(null)
  }

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full mb-3"
          >
            <Camera className="h-4 w-4" />
            <span className="font-medium text-sm">Explora Tenerife</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
          >
            Galería de Imágenes
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Descubre la belleza de Tenerife a través de nuestra colección de imágenes. Paisajes impresionantes,
            experiencias únicas y momentos inolvidables.
          </motion.p>
        </div>

        {/* Filtros de categoría */}
        {categorias.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button
              variant={!filtros.categoria ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setFiltros((prev) => ({ ...prev, categoria: undefined }))}
            >
              Todas
            </Button>
            {categorias.map((categoria) => (
              <Button
                key={categoria}
                variant={filtros.categoria === categoria ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => handleFiltroCategoria(categoria)}
              >
                {categoria}
              </Button>
            ))}
          </div>
        )}

        {/* Galería de imágenes */}
        {cargando ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : imagenes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron imágenes</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {imagenes.map((imagen) => (
              <GaleriaItem
                key={imagen.id}
                imagen={imagen}
                onClick={() => handleAbrirImagen(imagen)}
                variants={itemVariants}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Modal de imagen */}
      <Dialog open={!!imagenSeleccionada} onOpenChange={handleCerrarImagen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/95">
          <div className="relative">
            {/* Imagen */}
            <div className="flex items-center justify-center h-[80vh] p-4">
              <img
                src={imagenSeleccionada?.url || "/placeholder.svg"}
                alt={imagenSeleccionada?.titulo || "Imagen de galería"}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Información */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-xl font-bold text-white mb-1">{imagenSeleccionada?.titulo}</h3>
              {imagenSeleccionada?.descripcion && (
                <p className="text-white/80 mb-2">{imagenSeleccionada.descripcion}</p>
              )}
              {imagenSeleccionada?.categoria && (
                <Badge variant="outline" className="text-white border-white/30">
                  {imagenSeleccionada.categoria}
                </Badge>
              )}
            </div>

            {/* Botones de navegación */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-black/30 rounded-full"
              onClick={() => {
                const index = imagenes.findIndex((img) => img.id === imagenSeleccionada?.id)
                if (index > 0) {
                  setImagenSeleccionada(imagenes[index - 1])
                }
              }}
              disabled={imagenes.findIndex((img) => img.id === imagenSeleccionada?.id) === 0}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-black/30 rounded-full"
              onClick={() => {
                const index = imagenes.findIndex((img) => img.id === imagenSeleccionada?.id)
                if (index < imagenes.length - 1) {
                  setImagenSeleccionada(imagenes[index + 1])
                }
              }}
              disabled={imagenes.findIndex((img) => img.id === imagenSeleccionada?.id) === imagenes.length - 1}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

interface GaleriaItemProps {
  imagen: ImagenGaleria
  onClick: () => void
  variants?: any
}

function GaleriaItem({ imagen, onClick, variants }: GaleriaItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg aspect-square cursor-pointer group"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={variants}
      whileHover={{ y: -5 }}
    >
      {/* Imagen */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
        style={{
          backgroundImage: `url(${imagen.url})`,
          transform: isHovered ? "scale(1.05)" : "scale(1)",
        }}
      />

      {/* Overlay al hacer hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />

      {/* Información */}
      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white font-bold text-lg mb-1 drop-shadow-md">{imagen.titulo}</h3>
        {imagen.categoria && (
          <Badge variant="outline" className="text-white border-white/30">
            {imagen.categoria}
          </Badge>
        )}
      </div>

      {/* Icono de expandir */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Expand className="h-10 w-10 text-white drop-shadow-lg" />
      </div>
    </motion.div>
  )
}
