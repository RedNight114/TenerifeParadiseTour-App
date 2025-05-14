"use client"

import { useState } from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, Eye, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DetallesReserva } from "./detalles-reserva"
import { useReservas, type Reserva } from "@/contexts/reserva-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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
    accessorKey: "excursion",
    header: "Excursión",
    cell: ({ row }) => <div>{row.getValue("excursion")}</div>,
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
          <Button variant="ghost" size="icon" onClick={() => setShowDetails(true)}>
            <Eye className="h-4 w-4" />
            <span className="sr-only">Ver detalles</span>
          </Button>

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

interface HistorialReservasProps {
  clienteId: string
}

export function HistorialReservas({ clienteId }: HistorialReservasProps) {
  const { obtenerReservasPorCliente, cargando, error } = useReservas()

  // Obtener reservas del cliente
  const reservasCliente = obtenerReservasPorCliente(clienteId)

  const table = useReactTable({
    data: reservasCliente,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [{ id: "fecha", desc: true }],
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

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
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
                  Este cliente no tiene reservas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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
