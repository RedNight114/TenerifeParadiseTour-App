"use client"

import { useState, useEffect } from "react"
import Hero from "@/components/hero"
import ExcursionesDestacadas from "@/components/excursiones-destacadas/excursiones-destacadas"
import Testimonios from "@/components/testimonios"
import OfertasTemporada from "@/components/ofertas/ofertas-temporada"
import GaleriaPublica from "@/components/galeria/galeria-publica"

export default function ExcursionesPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <main>
      <Hero />
      <ExcursionesDestacadas />
      <GaleriaPublica />
      <OfertasTemporada />
      <Testimonios />
    </main>
  )
}
