"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

// Definir la interfaz para el cliente
export interface Cliente {
  id: string
  nombre: string
  email: string
  telefono: string
  fechaRegistro: string
  reservas: number
  ultimaReserva: string | null
  estado: "nuevo" | "activo" | "inactivo" | "bloqueado"
  vip: boolean
  direccion?: string
  notas?: string
  preferencias?: string
  categoriasPreferidas?: string[]
}

// Datos iniciales para un nuevo cliente
export const clienteNuevoInicial: Omit<Cliente, "id"> = {
  nombre: "",
  email: "",
  telefono: "",
  fechaRegistro: new Date().toISOString().split("T")[0],
  reservas: 0,
  ultimaReserva: null,
  estado: "nuevo",
  vip: false,
  direccion: "",
  notas: "",
  preferencias: "",
  categoriasPreferidas: [],
}

// Datos de ejemplo para clientes (simulando una base de datos)
const clientesIniciales: Cliente[] = [
  {
    id: "CLI-001",
    nombre: "María García",
    email: "maria.garcia@example.com",
    telefono: "+34 612 345 678",
    fechaRegistro: "2023-01-15",
    reservas: 5,
    ultimaReserva: "2023-05-10",
    estado: "activo",
    vip: true,
    direccion: "Calle Principal 123, Madrid",
    notas: "Cliente VIP. Prefiere excursiones culturales y gastronómicas.",
    preferencias: "Prefiere excursiones por la mañana. Interesada en historia y gastronomía local.",
    categoriasPreferidas: ["Cultura", "Gastronomía"],
  },
  {
    id: "CLI-002",
    nombre: "Carlos Rodríguez",
    email: "carlos.rodriguez@example.com",
    telefono: "+34 623 456 789",
    fechaRegistro: "2023-02-20",
    reservas: 3,
    ultimaReserva: "2023-04-25",
    estado: "activo",
    vip: false,
    direccion: "Avenida Central 45, Barcelona",
    notas: "Viaja frecuentemente por trabajo.",
    preferencias: "Interesado en excursiones de aventura y naturaleza.",
    categoriasPreferidas: ["Aventura", "Naturaleza"],
  },
  {
    id: "CLI-003",
    nombre: "Laura Martínez",
    email: "laura.martinez@example.com",
    telefono: "+34 634 567 890",
    fechaRegistro: "2023-03-10",
    reservas: 1,
    ultimaReserva: "2023-03-15",
    estado: "inactivo",
    vip: false,
    direccion: "Plaza Mayor 8, Valencia",
    notas: "Canceló su última reserva por enfermedad.",
    preferencias: "Prefiere grupos pequeños.",
    categoriasPreferidas: ["Cultura"],
  },
]

// Interfaz para el contexto
interface ClienteContextType {
  clientes: Cliente[]
  clienteActual: Cliente | null
  setClienteActual: (cliente: Cliente | null) => void
  obtenerCliente: (id: string) => Cliente | null
  guardarCliente: (cliente: Partial<Cliente>, esNuevo?: boolean) => Promise<boolean>
  eliminarCliente: (id: string) => Promise<boolean>
  cargando: boolean
  error: string | null
}

// Crear el contexto
const ClienteContext = createContext<ClienteContextType | undefined>(undefined)

// Hook personalizado para usar el contexto
export function useClientes() {
  const context = useContext(ClienteContext)
  if (context === undefined) {
    throw new Error("useClientes debe ser usado dentro de un ClienteProvider")
  }
  return context
}

// Proveedor del contexto
export function ClienteProvider({ children }: { children: React.ReactNode }) {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [clienteActual, setClienteActual] = useState<Cliente | null>(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  // Cargar datos iniciales (simulando una llamada a API)
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Simulamos una carga de datos
        await new Promise((resolve) => setTimeout(resolve, 500))
        setClientes(clientesIniciales)
        setCargando(false)
      } catch (err) {
        setError("Error al cargar los datos de clientes")
        setCargando(false)
      }
    }

    cargarDatos()
  }, [])

  // Obtener un cliente por ID
  const obtenerCliente = (id: string): Cliente | null => {
    return clientes.find((c) => c.id === id) || null
  }

  // Guardar un cliente (nuevo o existente)
  const guardarCliente = async (clienteData: Partial<Cliente>, esNuevo = false): Promise<boolean> => {
    try {
      setCargando(true)

      // Simulamos una llamada a API
      await new Promise((resolve) => setTimeout(resolve, 800))

      if (esNuevo) {
        // Generar un nuevo ID para el cliente
        const nuevoId = `CLI-${String(clientes.length + 1).padStart(3, "0")}`

        const nuevoCliente: Cliente = {
          ...clienteNuevoInicial,
          ...clienteData,
          id: nuevoId,
          fechaRegistro: clienteData.fechaRegistro || new Date().toISOString().split("T")[0],
        } as Cliente

        setClientes([...clientes, nuevoCliente])

        toast({
          title: "Cliente creado",
          description: `El cliente ${nuevoCliente.nombre} ha sido creado correctamente.`,
        })
      } else {
        // Actualizar cliente existente
        if (!clienteData.id) {
          throw new Error("ID de cliente no proporcionado para actualización")
        }

        const clienteIndex = clientes.findIndex((c) => c.id === clienteData.id)

        if (clienteIndex === -1) {
          throw new Error(`Cliente con ID ${clienteData.id} no encontrado`)
        }

        const clienteActualizado = {
          ...clientes[clienteIndex],
          ...clienteData,
        }

        const nuevosClientes = [...clientes]
        nuevosClientes[clienteIndex] = clienteActualizado

        setClientes(nuevosClientes)

        toast({
          title: "Cliente actualizado",
          description: `Los datos de ${clienteActualizado.nombre} han sido actualizados correctamente.`,
        })
      }

      setCargando(false)
      return true
    } catch (err) {
      const mensaje = err instanceof Error ? err.message : "Error al guardar el cliente"
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

  // Eliminar un cliente
  const eliminarCliente = async (id: string): Promise<boolean> => {
    try {
      setCargando(true)

      // Simulamos una llamada a API
      await new Promise((resolve) => setTimeout(resolve, 800))

      const clienteIndex = clientes.findIndex((c) => c.id === id)

      if (clienteIndex === -1) {
        throw new Error(`Cliente con ID ${id} no encontrado`)
      }

      const clienteEliminado = clientes[clienteIndex]
      const nuevosClientes = clientes.filter((c) => c.id !== id)

      setClientes(nuevosClientes)

      toast({
        title: "Cliente eliminado",
        description: `El cliente ${clienteEliminado.nombre} ha sido eliminado correctamente.`,
      })

      setCargando(false)
      return true
    } catch (err) {
      const mensaje = err instanceof Error ? err.message : "Error al eliminar el cliente"
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
    clientes,
    clienteActual,
    setClienteActual,
    obtenerCliente,
    guardarCliente,
    eliminarCliente,
    cargando,
    error,
  }

  return <ClienteContext.Provider value={value}>{children}</ClienteContext.Provider>
}
