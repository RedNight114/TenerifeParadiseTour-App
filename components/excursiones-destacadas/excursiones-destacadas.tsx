"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Compass, Star, ChevronLeft, ChevronRight, MapPin, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { excursiones } from "@/data/excursiones"
import type { Excursion } from "@/types/excursion"

export default function ExcursionesDestacadas() {
  // Usar useMemo para calcular las excursiones destacadas solo una vez
  const excursionesDestacadas = useMemo(() => {
    return excursiones.filter((excursion) => excursion.destacado)
  }, [])

  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleExcursiones, setVisibleExcursiones] = useState<Excursion[]>([])
  const [itemsPerView, setItemsPerView] = useState(3)

  // Determinar cuántos elementos mostrar según el ancho de la pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Actualizar las excursiones visibles cuando cambia el índice activo o el número de elementos por vista
  useEffect(() => {
    if (excursionesDestacadas.length === 0) return

    const startIndex = activeIndex
    const endIndex = Math.min(startIndex + itemsPerView, excursionesDestacadas.length)
    setVisibleExcursiones(excursionesDestacadas.slice(startIndex, endIndex))
  }, [activeIndex, itemsPerView, excursionesDestacadas])

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(excursionesDestacadas.length - itemsPerView, prev + 1))
  }

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Si no hay excursiones destacadas, no renderizar nada
  if (excursionesDestacadas.length === 0) {
    return null
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
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
            <Compass className="h-4 w-4" />
            <span className="font-medium text-sm">Nuestras mejores experiencias</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
          >
            Excursiones Destacadas
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Descubre nuestras excursiones más populares y mejor valoradas por nuestros clientes. Experiencias únicas que
            no te puedes perder en tu visita a Tenerife.
          </motion.p>
        </div>

        {/* Carrusel de excursiones */}
        <div className="relative px-6">
          {/* Controles de navegación */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md hover:bg-gray-100"
              onClick={handlePrev}
              disabled={activeIndex === 0}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Anterior</span>
            </Button>
          </div>

          <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md hover:bg-gray-100"
              onClick={handleNext}
              disabled={activeIndex >= excursionesDestacadas.length - itemsPerView}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Siguiente</span>
            </Button>
          </div>

          {/* Tarjetas de excursiones */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {visibleExcursiones.map((excursion) => (
              <ExcursionCard key={excursion.id} excursion={excursion} />
            ))}
          </motion.div>
        </div>

        {/* Botón para ver todas */}
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="px-8">
            <Link href="/excursiones">Ver todas las excursiones</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

// Componente de tarjeta de excursión
function ExcursionCard({ excursion }: { excursion: Excursion }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      {/* Imagen */}
      <div className="relative h-52 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
          style={{
            backgroundImage: `url(${excursion.imagenes?.[0] || `/placeholder.svg?height=600&width=800&text=${encodeURIComponent(excursion.nombre)}`})`,
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Etiqueta de categoría */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm">{excursion.categoria}</Badge>
        </div>

        {/* Valoración */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center bg-white/90 text-amber-500 px-2 py-1 rounded-md backdrop-blur-sm">
            <Star className="h-3.5 w-3.5 fill-current mr-1" />
            <span className="text-xs font-medium">5.0</span>
          </div>
        </div>

        {/* Título */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white">{excursion.nombre}</h3>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        {/* Detalles */}
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 text-primary mr-2" />
            <span>{excursion.ubicacion}</span>
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="h-4 w-4 text-primary mr-2" />
            <span>{excursion.duracion}</span>
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <Users className="h-4 w-4 text-primary mr-2" />
            <span>Máximo {excursion.grupoMaximo} personas</span>
          </div>
        </div>

        {/* Descripción */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{excursion.descripcionCorta}</p>

        {/* Precio y botón */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">{excursion.precio}€</span>
            {excursion.precioAnterior && (
              <span className="text-sm text-gray-500 line-through ml-2">{excursion.precioAnterior}€</span>
            )}
          </div>

          <Button asChild variant="secondary">
            <Link href={`/excursiones/${excursion.id}`}>Ver detalles</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
