"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Clock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TarjetaOferta } from "./tarjeta-oferta"
import { ofertasTemporada } from "@/data/ofertas-temporada"

export default function OfertasTemporada() {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemsPerPage = { mobile: 1, tablet: 2, desktop: 3 }
  const totalPages = Math.ceil(ofertasTemporada.length / itemsPerPage.desktop)

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  // Animación para el título
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  // Animación para la descripción
  const descriptionVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
    },
  }

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={titleVariants}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full mb-3"
          >
            <Sparkles className="h-4 w-4" />
            <span className="font-medium text-sm">Ofertas por tiempo limitado</span>
          </motion.div>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={titleVariants}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
          >
            Ofertas de Temporada
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={descriptionVariants}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Aprovecha estas promociones exclusivas por tiempo limitado y disfruta de las mejores experiencias en
            Tenerife a precios increíbles.
          </motion.p>
        </div>

        {/* Carrusel de ofertas */}
        <div className="relative">
          {/* Controles de navegación */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md hover:bg-gray-100"
              onClick={handlePrev}
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
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Siguiente</span>
            </Button>
          </div>

          {/* Tarjetas de ofertas */}
          <div className="overflow-hidden px-4">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
                display: "grid",
                gridTemplateColumns: `repeat(${ofertasTemporada.length}, 100%)`,
                gap: "1rem",
              }}
            >
              {ofertasTemporada.map((oferta) => (
                <div key={oferta.id} className="w-full px-2" style={{ gridColumn: "span 1" }}>
                  <TarjetaOferta oferta={oferta} />
                </div>
              ))}
            </div>
          </div>

          {/* Indicadores de página */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === index ? "w-6 bg-primary" : "w-2 bg-gray-300"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <span className="sr-only">Página {index + 1}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Nota de urgencia */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full">
            <Clock className="h-4 w-4" />
            <span className="font-medium text-sm">¡No esperes más! Estas ofertas tienen plazas limitadas</span>
          </div>
        </div>
      </div>
    </section>
  )
}
