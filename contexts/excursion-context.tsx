"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import type { Excursion } from "@/types/excursion"
import { excursionesService } from "@/lib/api/excursiones-service"

interface ExcursionContextType {
  excursiones: Excursion[]
  excursionActual: Excursion | null
  setExcursionActual: (excursion: Excursion | null) => void
  obtenerExcursion: (id: string) => Excursion | null
  guardarExcursion: (excursion: Partial<Excursion>, esNueva?: boolean) => Promise<boolean>
  eliminarExcursion: (id: string) => Promise<boolean>
  destacarExcursion: (id: string, destacada: boolean) => Promise<boolean>
  cambiarEstadoExcursion: (id: string, estado: "activa" | "inactiva") => Promise<boolean>
  cargando: boolean
  error: string | null
  recargarExcursiones: () => Promise<void>
}

const ExcursionContext = createContext<ExcursionContextType | undefined>(undefined)

export function useExcursiones() {
  const context = useContext(ExcursionContext)
  if (context === undefined) {
    throw new Error("useExcursiones debe ser usado dentro de un ExcursionProvider")
  }
  return context
}

export function ExcursionProvider({ children }: { children: React.ReactNode }) {
  const [excursiones, setExcursiones] = useState<Excursion[]>([])
  const [excursionActual, setExcursionActual] = useState<Excursion | null>(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Cargar datos iniciales
  const cargarExcursiones = async () => {
    try {
      setCargando(true)
      setError(null)

      const response = await excursionesService.getAll()

      if (response.success && response.data) {
        setExcursiones(response.data)
      } else {
        throw new Error(response.error || "Error al cargar las excursiones")
      }
    } catch (err) {
      const mensaje = err instanceof Error ? err.message : "Error al cargar los datos de excursiones"
      setError(mensaje)
      toast({
        title: "Error",
        description: mensaje,
        variant: "destructive",
      })
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarExcursiones()
  }, [])

  // Obtener una excursión por ID
  const obtenerExcursion = (id: string): Excursion | null => {
    return excursiones.find((e) => e.id === id) || null
  }

  // Guardar una excursión (nueva o existente)
  const guardarExcursion = async (excursionData: Partial<Excursion>, esNueva = false): Promise<boolean> => {
    try {
      setCargando(true)
      setError(null)

      // Asegurarse de que los campos de arrays estén correctamente formateados
      const datosFormateados = {
        ...excursionData,
        incluye: Array.isArray(excursionData.incluye)
          ? excursionData.incluye
          : typeof excursionData.incluye === "string"
            ? excursionData.incluye.split("\n").filter((i) => i.trim() !== "")
            : [],
        noIncluye: Array.isArray(excursionData.noIncluye)
          ? excursionData.noIncluye
          : typeof excursionData.noIncluye === "string"
            ? excursionData.noIncluye.split("\n").filter((i) => i.trim() !== "")
            : [],
        horarios: Array.isArray(excursionData.horarios)
          ? excursionData.horarios
          : typeof excursionData.horarios === "string"
            ? excursionData.horarios.split("\n").filter((i) => i.trim() !== "")
            : [],
      }

      let response

      if (esNueva) {
        response = await excursionesService.create(datosFormateados as Omit<Excursion, "id">)

        if (response.success && response.data) {
          setExcursiones([...excursiones, response.data])

          toast({
            title: "Excursión creada",
            description: `La excursión ${response.data.nombre} ha sido creada correctamente.`,
          })
        } else {
          throw new Error(response.error || "Error al crear la excursión")
        }
      } else {
        if (!datosFormateados.id) {
          throw new Error("ID de excursión no proporcionado para actualización")
        }

        response = await excursionesService.update(datosFormateados.id, datosFormateados)

        if (response.success && response.data) {
          const excursionActualizada = response.data

          setExcursiones(excursiones.map((e) => (e.id === excursionActualizada.id ? excursionActualizada : e)))

          toast({
            title: "Excursión actualizada",
            description: `La excursión ${excursionActualizada.nombre} ha sido actualizada correctamente.`,
          })
        } else {
          throw new Error(response.error || "Error al actualizar la excursión")
        }
      }

      return true
    } catch (err) {
      const mensaje = err instanceof Error ? err.message : "Error al guardar la excursión"
      setError(mensaje)
      toast({
        title: "Error",
        description: mensaje,
        variant: "destructive",
      })
      return false
    } finally {
      setCargando(false)
    }
  }

  // Eliminar una excursión
  const eliminarExcursion = async (id: string): Promise<boolean> => {
    try {
      setCargando(true)
      setError(null)

      const excursion = obtenerExcursion(id)
      if (!excursion) {
        throw new Error(`Excursión con ID ${id} no encontrada`)
      }

      const response = await excursionesService.delete(id)

      if (response.success) {
        setExcursiones(excursiones.filter((e) => e.id !== id))

        toast({
          title: "Excursión eliminada",
          description: `La excursión ${excursion.nombre} ha sido eliminada correctamente.`,
        })

        return true
      } else {
        throw new Error(response.error || "Error al eliminar la excursión")
      }
    } catch (err) {
      const mensaje = err instanceof Error ? err.message : "Error al eliminar la excursión"
      setError(mensaje)
      toast({
        title: "Error",
        description: mensaje,
        variant: "destructive",
      })
      return false
    } finally {
      setCargando(false)
    }
  }

  // Destacar/quitar destacado de una excursión
  const destacarExcursion = async (id: string, destacada: boolean): Promise<boolean> => {
    try {
      setCargando(true)
      setError(null)

      const excursion = obtenerExcursion(id)
      if (!excursion) {
        throw new Error(`Excursión con ID ${id} no encontrada`)
      }

      const response = await excursionesService.toggleDestacado(id, destacada)

      if (response.success && response.data) {
        const excursionActualizada = response.data

        setExcursiones(excursiones.map((e) => (e.id === excursionActualizada.id ? excursionActualizada : e)))

        toast({
          title: destacada ? "Excursión destacada" : "Excursión no destacada",
          description: `La excursión ${excursionActualizada.nombre} ha sido ${
            destacada ? "destacada" : "quitada de destacados"
          } correctamente.`,
        })

        return true
      } else {
        throw new Error(response.error || "Error al actualizar la excursión")
      }
    } catch (err) {
      const mensaje = err instanceof Error ? err.message : "Error al actualizar la excursión"
      setError(mensaje)
      toast({
        title: "Error",
        description: mensaje,
        variant: "destructive",
      })
      return false
    } finally {
      setCargando(false)
    }
  }

  // Cambiar estado de una excursión (activa/inactiva)
  const cambiarEstadoExcursion = async (id: string, estado: "activa" | "inactiva"): Promise<boolean> => {
    try {
      setCargando(true)
      setError(null)

      const excursion = obtenerExcursion(id)
      if (!excursion) {
        throw new Error(`Excursión con ID ${id} no encontrada`)
      }

      const response = await excursionesService.update(id, { estado })

      if (response.success && response.data) {
        const excursionActualizada = response.data

        setExcursiones(excursiones.map((e) => (e.id === excursionActualizada.id ? excursionActualizada : e)))

        toast({
          title: `Excursión ${estado === "activa" ? "activada" : "desactivada"}`,
          description: `La excursión ${excursionActualizada.nombre} ha sido ${
            estado === "activa" ? "activada" : "desactivada"
          } correctamente.`,
        })

        return true
      } else {
        throw new Error(response.error || "Error al actualizar el estado de la excursión")
      }
    } catch (err) {
      const mensaje = err instanceof Error ? err.message : "Error al actualizar el estado de la excursión"
      setError(mensaje)
      toast({
        title: "Error",
        description: mensaje,
        variant: "destructive",
      })
      return false
    } finally {
      setCargando(false)
    }
  }

  const value = {
    excursiones,
    excursionActual,
    setExcursionActual,
    obtenerExcursion,
    guardarExcursion,
    eliminarExcursion,
    destacarExcursion,
    cambiarEstadoExcursion,
    cargando,
    error,
    recargarExcursiones: cargarExcursiones,
  }

  return <ExcursionContext.Provider value={value}>{children}</ExcursionContext.Provider>
}
