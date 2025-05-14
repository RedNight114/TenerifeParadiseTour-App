"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { reservas as reservasIniciales } from "@/data/reservas"

// Definir la interfaz para la reserva
export interface Reserva {
  id: string
  fecha: string
  hora: string
  cliente: string
  clienteId: string
  email: string
  telefono: string
  excursion: string
  excursionId: string
  ubicacion: string
  adultos: number
  ninos: number
  total: number
  estado: "pendiente" | "confirmada" | "completada" | "cancelada"
  puntoEncuentro: string
  comentarios?: string
}

interface ReservaContextType {
  reservas: Reserva[]
  reservaActual: Reserva | null
  setReservaActual: (reserva: Reserva | null) => void
  obtenerReserva: (id: string) => Reserva | null
  obtenerReservasPorCliente: (clienteId: string) => Reserva[]
  obtenerReservasPorExcursion: (excursionId: string) => Reserva[]
  guardarReserva: (reserva: Partial<Reserva>, esNueva?: boolean) => Promise<boolean>
  cambiarEstadoReserva: (id: string, estado: Reserva["estado"]) => Promise<boolean>
  eliminarReserva: (id: string) => Promise<boolean>
  cargando: boolean
  error: string | null
}

const ReservaContext = createContext<ReservaContextType | undefined>(undefined)

export function useReservas() {
  const context = useContext(ReservaContext)
  if (context === undefined) {
    throw new Error("useReservas debe ser usado dentro de un ReservaProvider")
  }
  return context
}

// Enriquecer los datos de reservas con IDs de excursión
const reservasEnriquecidas = reservasIniciales.map((reserva) => ({
  ...reserva,
  excursionId:
    reserva.excursion === "Tour por la Ciudad Histórica"
      ? "tour-ciudad-historica"
      : reserva.excursion === "Excursión a la Montaña"
        ? "excursion-montana"
        : reserva.excursion === "Tour Gastronómico"
          ? "tour-gastronomico"
          : reserva.excursion === "Paseo en Bicicleta"
            ? "paseo-bicicleta"
            : reserva.excursion === "Visita Guiada al Museo"
              ? "visita-museo"
              : reserva.excursion === "Crucero al Atardecer"
                ? "crucero-atardecer"
                : `excursion-${Date.now()}`,
}))

export function ReservaProvider({ children }: { children: React.ReactNode }) {
  const [reservas, setReservas] = useState<Reserva[]>([])
  const [reservaActual, setReservaActual] = useState<Reserva | null>(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Cargar datos iniciales
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Simulamos una carga de datos
        await new Promise((resolve) => setTimeout(resolve, 500))
        setReservas(reservasEnriquecidas)
        setCargando(false)
      } catch (err) {
        setError("Error al cargar los datos de reservas")
        setCargando(false)
      }
    }

    cargarDatos()
  }, [])

  // Obtener una reserva por ID
  const obtenerReserva = (id: string): Reserva | null => {
    return reservas.find((r) => r.id === id) || null
  }

  // Obtener reservas por cliente
  const obtenerReservasPorCliente = (clienteId: string): Reserva[] => {
    return reservas.filter((r) => r.clienteId === clienteId)
  }

  // Obtener reservas por excursión
  const obtenerReservasPorExcursion = (excursionId: string): Reserva[] => {
    return reservas.filter((r) => r.excursionId === excursionId)
  }

  // Guardar una reserva (nueva o existente)
  const guardarReserva = async (reservaData: Partial<Reserva>, esNueva = false): Promise<boolean> => {
    try {
      setCargando(true)

      // Simulamos una llamada a API
      await new Promise((resolve) => setTimeout(resolve, 800))

      if (esNueva) {
        // Generar un nuevo ID para la reserva
        const nuevoId = `RES-${String(reservas.length + 1).padStart(3, "0")}`

        const nuevaReserva: Reserva = {
          id: nuevoId,
          fecha: reservaData.fecha || new Date().toISOString().split("T")[0],
          hora: reservaData.hora || "10:00",
          cliente: reservaData.cliente || "",
          clienteId: reservaData.clienteId || "",
          email: reservaData.email || "",
          telefono: reservaData.telefono || "",
          excursion: reservaData.excursion || "",
          excursionId: reservaData.excursionId || "",
          ubicacion: reservaData.ubicacion || "",
          adultos: reservaData.adultos || 1,
          ninos: reservaData.ninos || 0,
          total: reservaData.total || 0,
          estado: reservaData.estado || "pendiente",
          puntoEncuentro: reservaData.puntoEncuentro || "",
          comentarios: reservaData.comentarios || "",
        } as Reserva

        setReservas([...reservas, nuevaReserva])

        toast({
          title: "Reserva creada",
          description: `La reserva para ${nuevaReserva.cliente} ha sido creada correctamente.`,
        })
      } else {
        // Actualizar reserva existente
        if (!reservaData.id) {
          throw new Error("ID de reserva no proporcionado para actualización")
        }

        const reservaIndex = reservas.findIndex((r) => r.id === reservaData.id)

        if (reservaIndex === -1) {
          throw new Error(`Reserva con ID ${reservaData.id} no encontrada`)
        }

        const reservaActualizada = {
          ...reservas[reservaIndex],
          ...reservaData,
        }

        const nuevasReservas = [...reservas]
        nuevasReservas[reservaIndex] = reservaActualizada

        setReservas(nuevasReservas)

        toast({
          title: "Reserva actualizada",
          description: `La reserva para ${reservaActualizada.cliente} ha sido actualizada correctamente.`,
        })
      }

      setCargando(false)
      return true
    } catch (err) {
      const mensaje = err instanceof Error ? err.message : "Error al guardar la reserva"
      setError(mensaje)
      toast({
        title: "Error",
        description: mensaje,
        variant: "destructive",
      })
      setCargando(false)
      return false
    }
  }

  // Cambiar estado de una reserva
  const cambiarEstadoReserva = async (id: string, estado: Reserva["estado"]): Promise<boolean> => {
    try {
      setCargando(true)

      // Simulamos una llamada a API
      await new Promise((resolve) => setTimeout(resolve, 500))

      const reservaIndex = reservas.findIndex((r) => r.id === id)

      if (reservaIndex === -1) {
        throw new Error(`Reserva con ID ${id} no encontrada`)
      }

      const reservaActualizada = {
        ...reservas[reservaIndex],
        estado,
      }

      const nuevasReservas = [...reservas]
      nuevasReservas[reservaIndex] = reservaActualizada

      setReservas(nuevasReservas)

      const mensajeEstado =
        estado === "confirmada"
          ? "confirmada"
          : estado === "completada"
            ? "marcada como completada"
            : estado === "cancelada"
              ? "cancelada"
              : "actualizada a pendiente"

      toast({
        title: `Reserva ${mensajeEstado}`,
        description: `La reserva para ${reservaActualizada.cliente} ha sido ${mensajeEstado} correctamente.`,
      })

      setCargando(false)
      return true
    } catch (err) {
      const mensaje = err instanceof Error ? err.message : "Error al cambiar el estado de la reserva"
      setError(mensaje)
      toast({
        title: "Error",
        description: mensaje,
        variant: "destructive",
      })
      setCargando(false)
      return false
    }
  }

  // Eliminar una reserva
  const eliminarReserva = async (id: string): Promise<boolean> => {
    try {
      setCargando(true)

      // Simulamos una llamada a API
      await new Promise((resolve) => setTimeout(resolve, 800))

      const reservaIndex = reservas.findIndex((r) => r.id === id)

      if (reservaIndex === -1) {
        throw new Error(`Reserva con ID ${id} no encontrada`)
      }

      const reservaEliminada = reservas[reservaIndex]
      const nuevasReservas = reservas.filter((r) => r.id !== id)

      setReservas(nuevasReservas)

      toast({
        title: "Reserva eliminada",
        description: `La reserva para ${reservaEliminada.cliente} ha sido eliminada correctamente.`,
      })

      setCargando(false)
      return true
    } catch (err) {
      const mensaje = err instanceof Error ? err.message : "Error al eliminar la reserva"
      setError(mensaje)
      toast({
        title: "Error",
        description: mensaje,
        variant: "destructive",
      })
      setCargando(false)
      return false
    }
  }

  const value = {
    reservas,
    reservaActual,
    setReservaActual,
    obtenerReserva,
    obtenerReservasPorCliente,
    obtenerReservasPorExcursion,
    guardarReserva,
    cambiarEstadoReserva,
    eliminarReserva,
    cargando,
    error,
  }

  return <ReservaContext.Provider value={value}>{children}</ReservaContext.Provider>
}
