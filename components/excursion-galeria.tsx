"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Excursion } from "@/types/excursion"

interface ExcursionGaleriaProps {
  excursion: Excursion
}

export default function ExcursionGaleria({ excursion }: ExcursionGaleriaProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showLightbox, setShowLightbox] = useState(false)

  // Asegurarse de que imagenes siempre sea un array
  const imagenes = excursion.imagenes || []

  // Si no hay imágenes específicas, usar la imagen principal
  const allImages = imagenes.length > 0 ? imagenes : excursion.imagen ? [excursion.imagen] : ["/tenerife-excursion.png"]

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0
    const newIndex = isFirstImage ? allImages.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastImage = currentIndex === allImages.length - 1
    const newIndex = isLastImage ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <>
      <div className="mb-8 relative">
        <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
          <Image
            src={allImages[currentIndex] || "/placeholder.svg"}
            alt={excursion.nombre}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />

          {excursion.destacado && <Badge className="absolute top-4 left-4 bg-dorado text-negro">Destacado</Badge>}

          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 bg-white/80 hover:bg-white border-none"
            onClick={() => setShowLightbox(true)}
          >
            <Maximize2 className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-none"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-none"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {allImages.length > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            {allImages.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-turquesa w-6" : "bg-gray-300"
                }`}
                onClick={() => goToImage(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 bg-transparent border-none hover:bg-white/20"
            onClick={() => setShowLightbox(false)}
          >
            <X className="h-6 w-6 text-white" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-transparent border-none hover:bg-white/20"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-8 w-8 text-white" />
          </Button>

          <div className="relative h-[80vh] w-[80vw]">
            <Image
              src={allImages[currentIndex] || "/placeholder.svg"}
              alt={excursion.nombre}
              fill
              className="object-contain"
              sizes="80vw"
            />
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent border-none hover:bg-white/20"
            onClick={goToNext}
          >
            <ChevronRight className="h-8 w-8 text-white" />
          </Button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {allImages.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-white w-6" : "bg-gray-500"
                }`}
                onClick={() => goToImage(index)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
