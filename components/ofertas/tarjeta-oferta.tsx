"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, Tag, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCountdown } from "@/hooks/use-countdown"
import type { OfertaTemporada } from "@/data/ofertas-temporada"

interface TarjetaOfertaProps {
  oferta: OfertaTemporada
}

export function TarjetaOferta({ oferta }: TarjetaOfertaProps) {
  const [isHovered, setIsHovered] = useState(false)
  const timeLeft = useCountdown(oferta.fechaFin)

  const tiempoAgotado = timeLeft.total <= 0

  // Formatear el tiempo restante
  const formatearDigito = (num: number) => num.toString().padStart(2, "0")

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl"
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Etiqueta de descuento */}
      <div className="absolute left-0 top-4 z-10">
        <div className="bg-primary px-3 py-1 text-white font-bold rounded-r-full shadow-md">
          -{oferta.porcentajeDescuento}%
        </div>
      </div>

      {/* Imagen */}
      <div className="relative h-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
          style={{
            backgroundImage: `url(${oferta.imagen})`,
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Etiquetas */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
          {oferta.etiquetas.map((etiqueta) => (
            <Badge key={etiqueta} variant="secondary" className="bg-white/80 text-gray-800 backdrop-blur-sm">
              <Tag className="mr-1 h-3 w-3" />
              {etiqueta}
            </Badge>
          ))}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">{oferta.titulo}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{oferta.descripcion}</p>

        {/* Precios */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl font-bold text-primary">{oferta.precioOferta}€</span>
          <span className="text-gray-500 line-through text-sm">{oferta.precioOriginal}€</span>
          <span className="text-xs text-gray-500">por persona</span>
        </div>

        {/* Cuenta regresiva o plazas limitadas */}
        <div className="mb-4">
          {oferta.limitado && (
            <div className="flex items-center text-sm text-amber-600 font-medium mb-1">
              <Users className="h-4 w-4 mr-1" />
              <span>¡Solo {oferta.plazasRestantes} plazas disponibles!</span>
            </div>
          )}

          {!tiempoAgotado ? (
            <div className="flex flex-col">
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <Clock className="h-4 w-4 mr-1" />
                <span>La oferta termina en:</span>
              </div>
              <div className="grid grid-cols-4 gap-1 text-center">
                <div className="bg-gray-100 rounded p-1">
                  <span className="block text-lg font-bold">{formatearDigito(timeLeft.days)}</span>
                  <span className="text-xs text-gray-500">días</span>
                </div>
                <div className="bg-gray-100 rounded p-1">
                  <span className="block text-lg font-bold">{formatearDigito(timeLeft.hours)}</span>
                  <span className="text-xs text-gray-500">horas</span>
                </div>
                <div className="bg-gray-100 rounded p-1">
                  <span className="block text-lg font-bold">{formatearDigito(timeLeft.minutes)}</span>
                  <span className="text-xs text-gray-500">min</span>
                </div>
                <div className="bg-gray-100 rounded p-1">
                  <span className="block text-lg font-bold">{formatearDigito(timeLeft.seconds)}</span>
                  <span className="text-xs text-gray-500">seg</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-red-500 font-medium text-sm">¡Oferta finalizada!</div>
          )}
        </div>

        {/* Botón de acción */}
        <Button asChild className="w-full" disabled={tiempoAgotado}>
          <Link href={oferta.urlExcursion}>
            Reservar ahora
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}
