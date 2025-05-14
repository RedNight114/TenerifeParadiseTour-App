"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useConfig } from "@/contexts/config-context"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Edit, Trash, Mail, Phone, Calendar, User, ArrowUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMediaQuery } from "@/hooks/use-media-query"

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

// Datos de ejemplo
const clientesData: Cliente[] = Array.from({ length: 50 }).map((_, i) => {
  const estados = ["activo", "inactivo", "pendiente"] as const
  const fechaRegistro = new Date()
  fechaRegistro.setDate(fechaRegistro.getDate() - Math.floor(Math.random() * 365))

  const ultimaReserva = Math.random() > 0.2 ? new Date() : null
  if (ultimaReserva) {
    ultimaReserva.setDate(ultimaReserva.getDate() - Math.floor(Math.random() * 60))
  }

  return {
    id: `CL-${1000 + i}`,
    nombre: `Cliente ${i + 1}`,
    email: `cliente${i + 1}@ejemplo.com`,
    telefono: `+34 ${600000000 + Math.floor(Math.random() * 99999999)}`.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3"),
    fechaRegistro: fechaRegistro.toISOString().split("T")[0],
    estado: estados[Math.floor(Math.random() * estados.length)],
    reservas: Math.floor(Math.random() * 10),
    ultimaReserva: ultimaReserva ? ultimaReserva.toISOString().split("T")[0] : null,
    gastoTotal: Math.floor(Math.random() * 5000),
  }
})

// Componente para tarjeta móvil de cliente
function ClienteCard({
  cliente,
  onEdit,
  onDelete,
  onSendEmail,
}: {
  cliente: Cliente
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onSendEmail: (email: string) => void
}) {
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

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getAvatarColor(cliente.nombre)}`}
            >
              {getInitials(cliente.nombre)}
            </div>
            <span className="truncate">{cliente.nombre}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menú</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onEdit(cliente.id)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSendEmail(cliente.email)}>
                <Mail className="mr-2 h-4 w-4" />
                Enviar email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onDelete(cliente.id)} className="text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{cliente.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{cliente.telefono}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Registro: {new Date(cliente.fechaRegistro).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>Estado: {renderEstado(cliente.estado)}</span>
          </div>
        </div>
        <div className="pt-2 border-t mt-2">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Reservas</p>
              <p>{cliente.reservas}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Gasto total</p>
              <p className="font-medium">
                {new Intl.NumberFormat("es-ES", {
                  style: "currency",
                  currency: "EUR",
                }).format(cliente.gastoTotal)}
              </p>
            </div>
            {cliente.ultimaReserva && (
              <div className="col-span-2">
                <p className="text-muted-foreground">Última reserva</p>
                <p>{new Date(cliente.ultimaReserva).toLocaleDateString()}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function TablaClientes() {
  const router = useRouter()
  const { toast } = useToast()
  const { config } = useConfig()
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Estados
  const [clientes, setClientes] = useState<Cliente[]>(clientesData)
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>(clientesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Cliente | null
    direction: "ascending" | "descending"
  }>({ key: null, direction: "ascending" })
  const [filtros, setFiltros] = useState({
    estado: "todos",
    reservasMin: "",
    reservasMax: "",
    fechaDesde: "",
    fechaHasta: "",
  })

  // Calcular filas por página basado en la configuración
  const rowsPerPage = config.display.rowsPerPage || 10

  // Ordenar
  const requestSort = (key: keyof Cliente) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Aplicar ordenación y filtros
  useEffect(() => {
    let filtered = [...clientes]

    // Aplicar búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (cliente) =>
          cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cliente.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Aplicar filtros
    if (filtros.estado !== "todos") {
      filtered = filtered.filter((cliente) => cliente.estado === filtros.estado)
    }

    if (filtros.reservasMin) {
      filtered = filtered.filter((cliente) => cliente.reservas >= Number.parseInt(filtros.reservasMin))
    }

    if (filtros.reservasMax) {
      filtered = filtered.filter((cliente) => cliente.reservas <= Number.parseInt(filtros.reservasMax))
    }

    if (filtros.fechaDesde) {
      filtered = filtered.filter((cliente) => new Date(cliente.fechaRegistro) >= new Date(filtros.fechaDesde))
    }

    if (filtros.fechaHasta) {
      filtered = filtered.filter((cliente) => new Date(cliente.fechaRegistro) <= new Date(filtros.fechaHasta))
    }

    // Aplicar ordenación
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }

    setFilteredClientes(filtered)
  }, [clientes, searchTerm, sortConfig, filtros])

  // Paginación
  const totalPages = Math.ceil(filteredClientes.length / rowsPerPage)
  const paginatedClientes = filteredClientes.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  // Exportar datos
  const exportData = (format: "csv" | "excel" | "pdf") => {
    // Simulación de exportación
    toast({
      title: "Exportación iniciada",
      description: `Exportando datos en formato ${format.toUpperCase()}`,
    })

    setTimeout(() => {
      toast({
        title: "Exportación completada",
        description: `Los datos han sido exportados en formato ${format.toUpperCase()}`,
      })

      // En un caso real, aquí se generaría y descargaría el archivo
      if (format === "csv") {
        // Crear CSV
        const headers = "ID,Nombre,Email,Teléfono,Fecha Registro,Estado,Reservas,Última Reserva,Gasto Total\n"
        const csvContent =
          headers +
          filteredClientes
            .map(
              (cliente) =>
                `${cliente.id},${cliente.nombre},${cliente.email},${cliente.telefono},${cliente.fechaRegistro},${cliente.estado},${cliente.reservas},${cliente.ultimaReserva || ""},${cliente.gastoTotal}`,
            )
            .join("\n")

        // Crear blob y descargar
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.setAttribute("href", url)
        link.setAttribute("download", `clientes_${new Date().toISOString().split("T")[0]}.csv`)
        link.style.visibility = "hidden"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }, 1500)
  }

  // Eliminar cliente
  const eliminarCliente = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      setClientes(clientes.filter((cliente) => cliente.id !== id))
      toast({
        title: "Cliente eliminado",
        description: `El cliente ${id} ha sido eliminado correctamente`,
      })
    }
  }

  // Enviar email
  const enviarEmail = (email: string) => {
    toast({
      title: "Email enviado",
      description: `Se ha enviado un email a ${email}`,
    })
  }

  // Editar cliente
  const editarCliente = (id: string) => {
    router.push(`/dashboard/clientes/${id}/editar`)
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

  // Vista móvil con tarjetas
  if (isMobile) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          {paginatedClientes.length > 0 ? (
            paginatedClientes.map((cliente) => (
              <ClienteCard
                key={cliente.id}
                cliente={cliente}
                onEdit={editarCliente}
                onDelete={eliminarCliente}
                onSendEmail={enviarEmail}
              />
            ))
          ) : (
            <div className="text-center py-4 bg-muted rounded-md">No se encontraron clientes.</div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-2">
          <div className="flex-1 text-sm text-muted-foreground">{filteredClientes.length} cliente(s) en total.</div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Vista desktop con tabla
  return (
    <div className="space-y-4">
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => requestSort("email")} className="flex items-center">
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => requestSort("fechaRegistro")} className="flex items-center">
                    Registro
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => requestSort("reservas")} className="flex items-center">
                    Reservas
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => requestSort("gastoTotal")} className="flex items-center">
                    Gasto Total
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedClientes.length > 0 ? (
                paginatedClientes.map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getAvatarColor(cliente.nombre)}`}
                        >
                          {getInitials(cliente.nombre)}
                        </div>
                        <div className="font-medium">{cliente.nombre}</div>
                      </div>
                    </TableCell>
                    <TableCell className="truncate max-w-[150px]">{cliente.email}</TableCell>
                    <TableCell>{cliente.telefono}</TableCell>
                    <TableCell>{new Date(cliente.fechaRegistro).toLocaleDateString()}</TableCell>
                    <TableCell>{renderEstado(cliente.estado)}</TableCell>
                    <TableCell>{cliente.reservas}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      }).format(cliente.gastoTotal)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => editarCliente(cliente.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => enviarEmail(cliente.email)}>
                            <Mail className="mr-2 h-4 w-4" />
                            Enviar email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => eliminarCliente(cliente.id)} className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No se encontraron clientes.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">{filteredClientes.length} cliente(s) en total.</div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
