"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function ScrollReset() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Resetear el scroll a la parte superior cuando cambia la ruta o los parámetros de búsqueda
    window.scrollTo(0, 0)
  }, [pathname, searchParams])

  return null
}
