"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Eye, CalendarIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useConfig } from "@/contexts/config-context"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Tipos
interface Cliente {
  id: string
  nombre: string
  email: string
  telefono: string
  fechaRegistro: string
  estado: "activo" | "inactivo" | "pendiente"
  reservas: number
  ultimaReserva: string | null
  gastoTotal: number
}

interface ClientesCalendarioProps {
  clientes: Cliente[]
}

export default function ClientesCalendario({ clientes }: ClientesCalendarioProps) {
  const router = useRouter()
  const { config } = useConfig()
  const { toast } = useToast()

  // Estado para el mes y año actual
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendarData, setCalendarData] = useState<Record<string, Cliente[]>>({})

  // Efectos
  useEffect(() => {
    // Agrupar clientes por fecha de registro
    const clientesPorFecha: Record<string, Cliente[]> = {}

    clientes.forEach((cliente) => {
      const fecha = cliente.fechaRegistro
      if (!clientesPorFecha[fecha]) {
        clientesPorFecha[fecha] = []
      }
      clientesPorFecha[fecha].push(cliente)
    })

    setCalendarData(clientesPorFecha)
  }, [clientes])

  // Funciones para navegar entre meses
  const prevMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() - 1)
      return newDate
    })
  }

  const nextMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() + 1)
      return newDate
    })
  }

  // Obtener días del mes actual
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Obtener el primer día de la semana del mes
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // Renderizar estado con color
  const renderEstado = (estado: string) => {
    switch (estado) {
      case "activo":
        return <Badge className="bg-green-500">Activo</Badge>
      case "inactivo":
        return <Badge className="bg-gray-500">Inactivo</Badge>
      case "pendiente":
        return <Badge className="bg-yellow-500">Pendiente</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  // Obtener iniciales para el avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Obtener color de fondo para el avatar
  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-red-500",
      "bg-green-500",
      "bg-blue-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ]

    const sum = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[sum % colors.length]
  }

  // Renderizar calendario
  const renderCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)

    // Nombres de los días de la semana
    const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

    // Crear array con los días del mes
    const days = []

    // Añadir días vacíos al principio
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Añadir días del mes
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    // Función para obtener clientes de un día específico
    const getClientesDelDia = (day: number) => {
      if (!day) return []

      const fecha = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      return calendarData[fecha] || []
    }

    return (
      <div className="space-y-4">
        {/* Cabecera del calendario */}
        <div className="flex justify-between items-center">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <h2 className="text-xl font-semibold">
            {currentDate.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
          </h2>

          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-1 text-center font-medium">
          {weekDays.map((day) => (
            <div key={day} className="p-2">
              {day}
            </div>
          ))}
        </div>

        {/* Días del mes */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const clientesDelDia = day ? getClientesDelDia(day) : []
            const hasClientes = clientesDelDia.length > 0

            return (
              <div
                key={index}
                className={`min-h-[100px] border rounded-md ${day ? "bg-white" : "bg-gray-50"} ${hasClientes ? "border-blue-200" : ""}`}
              >
                {day && (
                  <>
                    <div className="p-1 text-right text-sm font-medium">
                      {day}
                      {hasClientes && <Badge className="ml-1 bg-blue-500">{clientesDelDia.length}</Badge>}
                    </div>

                    <div className="p-1 overflow-y-auto max-h-[80px]">
                      {clientesDelDia.map((cliente) => (
                        <div
                          key={cliente.id}
                          className="flex items-center gap-1 p-1 text-xs hover:bg-gray-50 rounded cursor-pointer"
                          onClick={() => router.push(`/dashboard/clientes/${cliente.id}`)}
                        >
                          <Avatar className={`h-5 w-5 ${getAvatarColor(cliente.nombre)}`}>
                            <AvatarFallback className="text-[10px]">{getInitials(cliente.nombre)}</AvatarFallback>
                          </Avatar>
                          <span className="truncate">{cliente.nombre}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {renderCalendar()}

      {/* Lista de clientes del mes */}
      <div className="mt-8">
        <h3 className="font-medium mb-4 flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2" />
          Clientes registrados en {currentDate.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
        </h3>

        <div className="space-y-2">
          {Object.entries(calendarData)
            .filter(([fecha]) => {
              const fechaObj = new Date(fecha)
              return (
                fechaObj.getMonth() === currentDate.getMonth() && fechaObj.getFullYear() === currentDate.getFullYear()
              )
            })
            .sort(([fechaA], [fechaB]) => new Date(fechaA).getTime() - new Date(fechaB).getTime())
            .map(([fecha, clientesDelDia]) => (
              <div key={fecha} className="border rounded-lg overflow-hidden">
                <div className="bg-muted p-2 font-medium text-sm">
                  {new Date(fecha).toLocaleDateString("es-ES", {
                    weekday: "long",
                    day: "numeric",
                  })}
                  <span className="ml-2 text-muted-foreground">
                    ({clientesDelDia.length} cliente{clientesDelDia.length !== 1 ? "s" : ""})
                  </span>
                </div>

                <div className="divide-y">
                  {clientesDelDia.map((cliente) => (
                    <div
                      key={cliente.id}
                      className={`p-2 flex justify-between items-center ${config.display.enableAnimations ? "hover:bg-muted/50 transition-colors" : ""}`}
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className={`h-6 w-6 ${getAvatarColor(cliente.nombre)}`}>
                          <AvatarFallback>{getInitials(cliente.nombre)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{cliente.nombre}</div>
                          <div className="text-xs text-muted-foreground">{cliente.email}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {renderEstado(cliente.estado)}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => router.push(`/dashboard/clientes/${cliente.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
