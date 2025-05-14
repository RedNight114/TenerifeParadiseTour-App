"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { excursiones } from "@/data/excursiones"

export default function Hero() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<typeof excursiones>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Actualizar sugerencias cuando cambia la búsqueda
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([])
      return
    }

    const filteredExcursiones = excursiones
      .filter(
        (excursion) =>
          excursion.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          excursion.descripcionCorta?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .slice(0, 5) // Limitar a 5 sugerencias

    setSuggestions(filteredExcursiones)
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/excursiones?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleSuggestionClick = (id: string) => {
    router.push(`/excursiones/${id}`)
    setShowSuggestions(false)
  }

  return (
    <section className="relative h-[500px] w-full">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/acantilados-los-gigantes-tenerife-paradise.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-negro/80 to-negro/50" />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-blanco text-center mb-6">Vive Tenerife como nunca antes</h1>
        <p className="text-xl text-blanco text-center mb-8 max-w-2xl">
          Explora excursiones inolvidables y descubre la esencia del auténtico paraíso canario.
        </p>

        <div className="w-full max-w-md relative">
          <form onSubmit={handleSearch} className="flex items-center gap-2 bg-blanco rounded-lg p-1">
            <Input
              type="text"
              placeholder="Buscar excursiones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              className="border-none shadow-none focus-visible:ring-0"
            />
            <Button type="submit" size="sm" className="bg-turquesa hover:bg-turquesa/90 text-blanco">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto"
            >
              {suggestions.map((excursion) => (
                <div
                  key={excursion.id}
                  className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                  onClick={() => handleSuggestionClick(excursion.id)}
                >
                  <div className="font-medium">{excursion.nombre}</div>
                  {excursion.descripcionCorta && (
                    <div className="text-sm text-gray-500 truncate">{excursion.descripcionCorta}</div>
                  )}
                  <div className="text-sm text-turquesa mt-1">
                    {excursion.precio}€ · {excursion.duracion}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
