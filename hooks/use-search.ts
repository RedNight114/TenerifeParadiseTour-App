"use client"

import { useState, useEffect, useCallback } from "react"
import { useExcursiones } from "@/contexts/excursion-context"
import { useClientes } from "@/contexts/cliente-context"
import { useReservas } from "@/contexts/reserva-context"
import { useRouter } from "next/navigation"

// Tipos de resultados
export type SearchResultType = "excursion" | "cliente" | "reserva" | "pagina"

export interface SearchResult {
  id: string
  title: string
  description?: string
  type: SearchResultType
  url: string
  icon?: string
}

// Páginas predefinidas para búsqueda
const PAGES: SearchResult[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Panel principal con resumen de actividad",
    type: "pagina",
    url: "/dashboard",
    icon: "layout-dashboard",
  },
  {
    id: "excursiones",
    title: "Excursiones",
    description: "Gestión de excursiones y tours",
    type: "pagina",
    url: "/dashboard/excursiones",
    icon: "map",
  },
  {
    id: "clientes",
    title: "Clientes",
    description: "Gestión de clientes y contactos",
    type: "pagina",
    url: "/dashboard/clientes",
    icon: "users",
  },
  {
    id: "reservas",
    title: "Reservas",
    description: "Gestión de reservas y bookings",
    type: "pagina",
    url: "/dashboard/reservas",
    icon: "calendar",
  },
  {
    id: "estadisticas",
    title: "Estadísticas",
    description: "Análisis y reportes de actividad",
    type: "pagina",
    url: "/dashboard/estadisticas",
    icon: "bar-chart",
  },
]

export function useSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const { excursiones } = useExcursiones()
  const { clientes } = useClientes()
  const { reservas } = useReservas()
  const router = useRouter()

  // Función para realizar la búsqueda
  const performSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([])
        return
      }

      setIsSearching(true)

      const normalizedQuery = searchQuery.toLowerCase().trim()
      const searchResults: SearchResult[] = []

      // Buscar en excursiones
      const excursionResults = excursiones
        .filter(
          (e) =>
            e.nombre.toLowerCase().includes(normalizedQuery) ||
            (e.descripcionCorta && e.descripcionCorta.toLowerCase().includes(normalizedQuery)),
        )
        .slice(0, 5)
        .map((e) => ({
          id: `excursion-${e.id}`,
          title: e.nombre,
          description: e.descripcionCorta,
          type: "excursion" as const,
          url: `/dashboard/excursiones/${e.id}`,
          icon: "map-pin",
        }))

      searchResults.push(...excursionResults)

      // Buscar en clientes
      const clienteResults = clientes
        .filter(
          (c) => c.nombre.toLowerCase().includes(normalizedQuery) || c.email.toLowerCase().includes(normalizedQuery),
        )
        .slice(0, 5)
        .map((c) => ({
          id: `cliente-${c.id}`,
          title: c.nombre,
          description: c.email,
          type: "cliente" as const,
          url: `/dashboard/clientes/${c.id}`,
          icon: "user",
        }))

      searchResults.push(...clienteResults)

      // Buscar en reservas
      const reservaResults = reservas
        .filter(
          (r) =>
            r.cliente.toLowerCase().includes(normalizedQuery) ||
            r.excursion.toLowerCase().includes(normalizedQuery) ||
            r.id.toLowerCase().includes(normalizedQuery),
        )
        .slice(0, 5)
        .map((r) => ({
          id: `reserva-${r.id}`,
          title: `${r.excursion} - ${r.cliente}`,
          description: `${r.fecha} | ${r.estado}`,
          type: "reserva" as const,
          url: `/dashboard/reservas/${r.id}`,
          icon: "calendar",
        }))

      searchResults.push(...reservaResults)

      // Buscar en páginas
      const pageResults = PAGES.filter(
        (p) =>
          p.title.toLowerCase().includes(normalizedQuery) ||
          (p.description && p.description.toLowerCase().includes(normalizedQuery)),
      ).map((p) => ({ ...p }))

      searchResults.push(...pageResults)

      setResults(searchResults)
      setIsSearching(false)
    },
    [excursiones, clientes, reservas],
  )

  // Actualizar resultados cuando cambia la consulta
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query, performSearch])

  // Navegar a un resultado
  const navigateToResult = (result: SearchResult) => {
    router.push(result.url)
    setIsOpen(false)
    setQuery("")
  }

  // Abrir el modal de búsqueda
  const openSearch = useCallback(() => {
    setIsOpen(true)
  }, [])

  // Cerrar el modal de búsqueda
  const closeSearch = useCallback(() => {
    setIsOpen(false)
    setQuery("")
  }, [])

  // Escuchar atajos de teclado para abrir la búsqueda
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K o Cmd+K para abrir la búsqueda
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        openSearch()
      }

      // Escape para cerrar la búsqueda
      if (e.key === "Escape" && isOpen) {
        closeSearch()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, openSearch, closeSearch])

  return {
    query,
    setQuery,
    results,
    isSearching,
    isOpen,
    openSearch,
    closeSearch,
    navigateToResult,
  }
}
