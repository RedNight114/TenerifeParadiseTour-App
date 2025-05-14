"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, Trash2, Eye, Mail, Phone, Calendar, CreditCard } from "lucide-react"
import { useRouter } from "next/navigation"
import { useConfig } from "@/contexts/config-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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

interface ClientesTarjetasProps {
  clientes: Cliente[]
  onDelete: (id: string) => void
  onEmail: (email: string) => void
}

export default function ClientesTarjetas({ clientes, onDelete, onEmail }: ClientesTarjetasProps) {
  const router = useRouter()
  const { config } = useConfig()
  const { toast } = useToast()

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

  // Obtener color de fondo para el avatar basado en el nombre
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

    // Usar la suma de los códigos de caracteres para determinar el color
    const sum = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[sum % colors.length]
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {clientes.length > 0 ? (
        clientes.map((cliente) => (
          <Card key={cliente.id} className={config.display.enableAnimations ? "transition-all hover:shadow-md" : ""}>
            <CardContent className={`p-4 ${config.display.layoutMode === "compact" ? "space-y-2" : "space-y-4"}`}>
              <div className="flex items-start gap-3">
                <Avatar className={`h-10 w-10 ${getAvatarColor(cliente.nombre)}`}>
                  <AvatarFallback>{getInitials(cliente.nombre)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{cliente.nombre}</h3>
                      <p className="text-sm text-muted-foreground">{cliente.id}</p>
                    </div>
                    {renderEstado(cliente.estado)}
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{cliente.email}</span>
                </div>

                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{cliente.telefono}</span>
                </div>

                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Registro: {new Date(cliente.fechaRegistro).toLocaleDateString("es-ES")}</span>
                </div>

                <div className="flex items-center text-sm">
                  <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Gasto total: {cliente.gastoTotal.toLocaleString("es-ES")} €</span>
                </div>
              </div>

              {cliente.ultimaReserva && (
                <div className="text-sm bg-muted/50 p-2 rounded">
                  <span className="font-medium">Última reserva:</span>{" "}
                  {new Date(cliente.ultimaReserva).toLocaleDateString("es-ES")}
                </div>
              )}
            </CardContent>

            <CardFooter
              className={`flex justify-between ${config.display.layoutMode === "compact" ? "p-2" : "p-4"} pt-0 border-t`}
            >
              <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/clientes/${cliente.id}`)}>
                <Eye className="h-4 w-4 mr-2" />
                Ver detalles
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push(`/dashboard/clientes/${cliente.id}/editar`)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEmail(cliente.email)}>
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar email
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500" onClick={() => onDelete(cliente.id)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="col-span-full text-center py-8">No se encontraron clientes con los criterios de búsqueda.</div>
      )}
    </div>
  )
}
