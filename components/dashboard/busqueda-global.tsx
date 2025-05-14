"use client"

import { useState, useEffect, useRef } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Search, User, Map, Calendar, Settings, FileText, BarChart, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useConfig } from "@/contexts/config-context"
import { useToast } from "@/components/ui/use-toast"

export default function BusquedaGlobal() {
  const [open, setOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const { config } = useConfig()
  const { toast } = useToast()

  // Referencia para el input de búsqueda
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Efecto para escuchar el atajo de teclado (Ctrl+K o Cmd+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Efecto para realizar la búsqueda
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([])
      return
    }

    // Simular búsqueda con un retraso
    const timer = setTimeout(() => {
      // Datos de ejemplo para la búsqueda
      const clientes = [
        { id: "CL-1001", nombre: "Ana Martínez", tipo: "cliente" },
        { id: "CL-1002", nombre: "Carlos López", tipo: "cliente" },
        { id: "CL-1003", nombre: "María García", tipo: "cliente" },
      ]

      const excursiones = [
        { id: "EX-001", nombre: "Teide al Amanecer", tipo: "excursion" },
        { id: "EX-002", nombre: "Anaga y sus Senderos", tipo: "excursion" },
        { id: "EX-003", nombre: "Masca y Los Gigantes", tipo: "excursion" },
      ]

      const reservas = [
        { id: "RES-2001", cliente: "Ana Martínez", excursion: "Teide al Amanecer", tipo: "reserva" },
        { id: "RES-2002", cliente: "Carlos López", excursion: "Anaga y sus Senderos", tipo: "reserva" },
        { id: "RES-2003", cliente: "María García", excursion: "Masca y Los Gigantes", tipo: "reserva" },
      ]

      const paginas = [
        { id: "dashboard", nombre: "Panel Principal", tipo: "pagina" },
        { id: "clientes", nombre: "Gestión de Clientes", tipo: "pagina" },
        { id: "excursiones", nombre: "Gestión de Excursiones", tipo: "pagina" },
        { id: "reservas", nombre: "Gestión de Reservas", tipo: "pagina" },
        { id: "estadisticas", nombre: "Estadísticas", tipo: "pagina" },
        { id: "configuracion", nombre: "Configuración", tipo: "pagina" },
      ]

      // Filtrar resultados
      const term = searchTerm.toLowerCase()
      const filteredClientes = clientes.filter(
        (c) => c.nombre.toLowerCase().includes(term) || c.id.toLowerCase().includes(term),
      )

      const filteredExcursiones = excursiones.filter(
        (e) => e.nombre.toLowerCase().includes(term) || e.id.toLowerCase().includes(term),
      )

      const filteredReservas = reservas.filter(
        (r) =>
          r.cliente.toLowerCase().includes(term) ||
          r.excursion.toLowerCase().includes(term) ||
          r.id.toLowerCase().includes(term),
      )

      const filteredPaginas = paginas.filter((p) => p.nombre.toLowerCase().includes(term))

      // Combinar resultados
      setSearchResults([...filteredClientes, ...filteredExcursiones, ...filteredReservas, ...filteredPaginas])
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Manejar la selección de un resultado
  const handleSelect = (item: any) => {
    setOpen(false)

    // Navegar según el tipo de resultado
    switch (item.tipo) {
      case "cliente":
        router.push(`/dashboard/clientes/${item.id}`)
        break

      case "excursion":
        router.push(`/dashboard/excursiones/${item.id}`)
        break

      case "reserva":
        router.push(`/dashboard/reservas/${item.id}`)
        break

      case "pagina":
        router.push(`/dashboard/${item.id}`)
        break

      default:
        toast({
          title: "Navegación",
          description: `Navegando a ${item.nombre}`,
        })
    }
  }

  // Renderizar icono según el tipo
  const renderIcon = (tipo: string) => {
    switch (tipo) {
      case "cliente":
        return <User className="h-4 w-4 mr-2" />

      case "excursion":
        return <Map className="h-4 w-4 mr-2" />

      case "reserva":
        return <Calendar className="h-4 w-4 mr-2" />

      case "pagina":
        return <FileText className="h-4 w-4 mr-2" />

      default:
        return <Search className="h-4 w-4 mr-2" />
    }
  }

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Buscar en el panel...</span>
        <span className="inline-flex lg:hidden">Buscar...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <CommandInput
            ref={searchInputRef}
            placeholder="Buscar clientes, excursiones, reservas..."
            value={searchTerm}
            onValueChange={setSearchTerm}
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
          {searchTerm && (
            <Button variant="ghost" size="icon" onClick={() => setSearchTerm("")} className="h-6 w-6">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <CommandList>
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>

          {searchResults.length > 0 && (
            <>
              {/* Agrupar resultados por tipo */}
              {["cliente", "excursion", "reserva", "pagina"].map((tipo) => {
                const resultadosPorTipo = searchResults.filter((r) => r.tipo === tipo)

                if (resultadosPorTipo.length === 0) return null

                return (
                  <CommandGroup
                    key={tipo}
                    heading={
                      tipo === "cliente"
                        ? "Clientes"
                        : tipo === "excursion"
                          ? "Excursiones"
                          : tipo === "reserva"
                            ? "Reservas"
                            : "Páginas"
                    }
                  >
                    {resultadosPorTipo.map((item) => (
                      <CommandItem key={`${item.tipo}-${item.id}`} onSelect={() => handleSelect(item)}>
                        {renderIcon(item.tipo)}
                        <span>{item.nombre}</span>
                        {item.id && <span className="ml-2 text-xs text-muted-foreground">{item.id}</span>}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )
              })}
            </>
          )}

          <CommandSeparator />

          <CommandGroup heading="Navegación rápida">
            <CommandItem onSelect={() => router.push("/dashboard")}>
              <BarChart className="h-4 w-4 mr-2" />
              <span>Panel principal</span>
            </CommandItem>
            <CommandItem onSelect={() => router.push("/dashboard/clientes")}>
              <User className="h-4 w-4 mr-2" />
              <span>Clientes</span>
            </CommandItem>
            <CommandItem onSelect={() => router.push("/dashboard/excursiones")}>
              <Map className="h-4 w-4 mr-2" />
              <span>Excursiones</span>
            </CommandItem>
            <CommandItem onSelect={() => router.push("/dashboard/reservas")}>
              <Calendar className="h-4 w-4 mr-2" />
              <span>Reservas</span>
            </CommandItem>
            <CommandItem onSelect={() => router.push("/dashboard/estadisticas")}>
              <BarChart className="h-4 w-4 mr-2" />
              <span>Estadísticas</span>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <Settings className="h-4 w-4 mr-2" />
              <span>Configuración</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
