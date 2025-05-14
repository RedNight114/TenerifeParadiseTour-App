"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, Eye, Loader2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DetallesReserva } from "./detalles-reserva"
import { useReservas, type Reserva } from "@/contexts/reserva-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMediaQuery } from "@/hooks/use-media-query"

// Componente para tarjeta móvil de reserva
function ReservaCard({ reserva }: { reserva: Reserva }) {
  const [showDetails, setShowDetails] = useState(false)
  const fecha = new Date(reserva.fecha)

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs">#{reserva.id}</span>
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
              <DropdownMenuItem onClick={() => setShowDetails(true)}>
                <Eye className="mr-2 h-4 w-4" />
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Enviar recordatorio</DropdownMenuItem>
              <DropdownMenuItem>Enviar email</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Fecha</p>
            <p>{fecha.toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Cliente</p>
            <p className="truncate">{reserva.cliente}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Excursión</p>
            <p className="truncate">{reserva.excursion}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Personas</p>
            <p>
              {reserva.adultos} adultos{reserva.ninos > 0 ? `, ${reserva.ninos} niños` : ""}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Total</p>
            <p className="font-medium">
              {new Intl.NumberFormat("es-ES", {
                style: "currency",
                currency: "EUR",
              }).format(reserva.total)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Estado</p>
            <Badge
              variant={
                reserva.estado === "confirmada"
                  ? "default"
                  : reserva.estado === "pendiente"
                    ? "outline"
                    : reserva.estado === "completada"
                      ? "secondary"
                      : "destructive"
              }
            >
              {reserva.estado === "confirmada"
                ? "Confirmada"
                : reserva.estado === "pendiente"
                  ? "Pendiente"
                  : reserva.estado === "completada"
                    ? "Completada"
                    : "Cancelada"}
            </Badge>
          </div>
        </div>
      </CardContent>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalles de la Reserva #{reserva.id}</DialogTitle>
            <DialogDescription>
              Información completa de la reserva realizada el {fecha.toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          <DetallesReserva reserva={reserva} />
        </DialogContent>
      </Dialog>
    </Card>
  )
}

const columns: ColumnDef<Reserva>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-mono text-xs">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "fecha",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Fecha
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const fecha = new Date(row.getValue("fecha"))
      return <div>{fecha.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
    cell: ({ row }) => <div className="truncate max-w-[150px]">{row.getValue("cliente")}</div>,
  },
  {
    accessorKey: "excursion",
    header: "Excursión",
    cell: ({ row }) => <div className="truncate max-w-[150px]">{row.getValue("excursion")}</div>,
  },
  {
    accessorKey: "personas",
    header: "Personas",
    cell: ({ row }) => {
      const reserva = row.original
      return (
        <div>
          {reserva.adultos} adultos{reserva.ninos > 0 ? `, ${reserva.ninos} niños` : ""}
        </div>
      )
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("total"))
      const formatted = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const estado = row.getValue("estado") as string

      return (
        <Badge
          variant={
            estado === "confirmada"
              ? "default"
              : estado === "pendiente"
                ? "outline"
                : estado === "completada"
                  ? "secondary"
                  : "destructive"
          }
        >
          {estado === "confirmada"
            ? "Confirmada"
            : estado === "pendiente"
              ? "Pendiente"
              : estado === "completada"
                ? "Completada"
                : "Cancelada"}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const reserva = row.original
      const [showDetails, setShowDetails] = useState(false)

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menú</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setShowDetails(true)}>
                <Eye className="mr-2 h-4 w-4" />
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Enviar recordatorio</DropdownMenuItem>
              <DropdownMenuItem>Enviar email</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={showDetails} onOpenChange={setShowDetails}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Detalles de la Reserva #{reserva.id}</DialogTitle>
                <DialogDescription>
                  Información completa de la reserva realizada el {new Date(reserva.fecha).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              <DetallesReserva reserva={reserva} />
            </DialogContent>
          </Dialog>
        </>
      )
    },
  },
]

interface TablaReservasProps {
  estado?: "pendiente" | "confirmada" | "completada" | "cancelada"
}

export function TablaReservas({ estado }: TablaReservasProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const { reservas, cargando, error } = useReservas()
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Filtrar por estado si se proporciona
  const data = estado ? reservas.filter((reserva) => reserva.estado === estado) : reservas

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (cargando) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Vista móvil con tarjetas
  if (isMobile) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => <ReservaCard key={row.id} reserva={row.original} />)
          ) : (
            <div className="text-center py-4 bg-muted rounded-md">No se encontraron reservas.</div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-2">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredRowModel().rows.length} reserva(s) en total.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
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
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No se encontraron reservas.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} reserva(s) en total.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
