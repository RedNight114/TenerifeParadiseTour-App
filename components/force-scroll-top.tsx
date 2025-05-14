"use client"

import { useEffect } from "react"

export function ForceScrollTop() {
  useEffect(() => {
    // Forzar el scroll al inicio inmediatamente cuando el componente se monta
    window.scrollTo(0, 0)

    // También intentar después de un breve retraso para asegurar que funcione después de la hidratación
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [])

  return null
}
