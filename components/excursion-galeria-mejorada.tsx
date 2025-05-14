"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ExcursionGaleriaMejoradaProps {
  imagenPrincipal: string
  imagenesAdicionales?: string[]
  nombre: string
}

export function ExcursionGaleriaMejorada({
  imagenPrincipal,
  imagenesAdicionales = [],
  nombre,
}: ExcursionGaleriaMejoradaProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Combinar todas las imágenes en un solo array
  const allImages = [imagenPrincipal, ...imagenesAdicionales].filter(Boolean)

  const openModal = (index: number) => {
    setCurrentImageIndex(index)
    setModalOpen(true)
    document.body.style.overflow = "hidden" // Prevenir scroll
  }

  const closeModal = () => {
    setModalOpen(false)
    document.body.style.overflow = "" // Restaurar scroll
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  // Manejar teclas para navegación
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeModal()
    if (e.key === "ArrowRight") nextImage()
    if (e.key === "ArrowLeft") prevImage()
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Imagen principal */}
        <div
          className="md:col-span-2 relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
          onClick={() => openModal(0)}
        >
          <Image
            src={imagenPrincipal || "/placeholder.svg?height=600&width=800&text=Imagen no disponible"}
            alt={nombre}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 66vw"
            priority
          />
        </div>

        {/* Grid de imágenes adicionales */}
        <div className="grid grid-cols-2 gap-4">
          {imagenesAdicionales.slice(0, 4).map((img, index) => (
            <div
              key={index}
              className={cn(
                "relative aspect-square rounded-lg overflow-hidden cursor-pointer",
                index >= 2 && "hidden md:block",
              )}
              onClick={() => openModal(index + 1)}
            >
              <Image
                src={img || "/placeholder.svg"}
                alt={`${nombre} - Imagen ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 20vw"
              />

              {/* Indicador de más imágenes */}
              {index === 3 && imagenesAdicionales.length > 4 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">+{imagenesAdicionales.length - 4}</span>
                </div>
              )}
            </div>
          ))}

          {/* Placeholders si hay menos de 4 imágenes adicionales */}
          {Array.from({ length: Math.max(0, 4 - imagenesAdicionales.length) }).map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className={cn(
                "relative aspect-square rounded-lg overflow-hidden bg-muted",
                index >= 2 && "hidden md:block",
              )}
            />
          ))}
        </div>
      </div>

      {/* Modal de galería */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative w-full max-w-5xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
            {/* Imagen actual */}
            <div className="relative w-full h-[80vh]">
              <Image
                src={allImages[currentImageIndex] || "/placeholder.svg"}
                alt={`${nombre} - Imagen ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>

            {/* Controles */}
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white" onClick={closeModal}>
              <X className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            {/* Contador de imágenes */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full">
              {currentImageIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
