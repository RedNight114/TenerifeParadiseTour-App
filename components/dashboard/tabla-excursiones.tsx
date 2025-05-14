"use client"

import type React from "react"

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
import { ArrowUpDown, Edit, Loader2, MoreHorizontal, Star, Trash } from "lucide-react"
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
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { useExcursiones } from "@/contexts/excursion-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Excursion } from "@/types/excursion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMediaQuery } from "@/hooks/use-media-query"

// Componente para las acciones de excursión (separado para manejar estado)
function AccionesExcursion({ excursion }: { excursion: Excursion }) {
  const { eliminarExcursion } = useExcursiones()
  const [eliminando, setEliminando] = useState(false)
  const [alertaAbierta, setAlertaAbierta] = useState(false)

  const handleEliminar = async () => {
    setEliminando(true)
    await eliminarExcursion(excursion.id)
    setEliminando(false)
    setAlertaAbierta(false)
  }

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
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/excursiones/${excursion.id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault()
              setAlertaAbierta(true)
            }}
            className="text-red-600"
          >
            <Trash className="mr-2 h-4 w-4" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={alertaAbierta} onOpenChange={setAlertaAbierta}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente la excursión "{excursion.nombre}" y todos
              sus datos asociados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleEliminar} disabled={eliminando} className="bg-red-600 hover:bg-red-700">
              {eliminando ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Eliminando...
                </>
              ) : (
                "Eliminar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

// Componente para el switch de estado
function EstadoSwitch({ excursion }: { excursion: Excursion }) {
  const { cambiarEstadoExcursion } = useExcursiones()
  const [activa, setActiva] = useState(excursion.estado !== "inactiva")
  const [cambiando, setCambiando] = useState(false)

  const handleToggle = async () => {
    setCambiando(true)
    const nuevoEstado = activa ? "inactiva" : "activa"
    const exito = await cambiarEstadoExcursion(excursion.id, nuevoEstado)
    if (exito) {
      setActiva(!activa)
    }
    setCambiando(false)
  }

  return (
    <div className="flex items-center gap-2">
      <Switch checked={activa} onCheckedChange={handleToggle} disabled={cambiando} />
      <span className="hidden sm:inline">{cambiando ? "Actualizando..." : activa ? "Activa" : "Inactiva"}</span>
    </div>
  )
}

// Componente para tarjeta móvil de excursión
function ExcursionCard({ excursion }: { excursion: Excursion }) {
  const { destacarExcursion } = useExcursiones()
  const [destacando, setDestacando] = useState(false)

  const handleToggleDestacado = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setDestacando(true)
    await destacarExcursion(excursion.id, !excursion.destacado)
    setDestacando(false)
  }

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="truncate">{excursion.nombre}</span>
            <button
              onClick={handleToggleDestacado}
              disabled={destacando}
              className="focus:outline-none"
              title={excursion.destacado ? "Quitar de destacados" : "Destacar excursión"}
            >
              {destacando ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : (
                <Star
                  className={`h-4 w-4 ${
                    excursion.destacado ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                  }`}
                />
              )}
            </button>
          </div>
          <AccionesExcursion excursion={excursion} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Ubicación</p>
            <p>{excursion.ubicacion}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Duración</p>
            <p>{excursion.duracion}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Precio</p>
            <p className="font-medium">
              {new Intl.NumberFormat("es-ES", {
                style: "currency",
                currency: "EUR",
              }).format(excursion.precio)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Categoría</p>
            <Badge variant="outline">{excursion.categoria || "Sin categoría"}</Badge>
          </div>
        </div>
        <div className="pt-2 border-t">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground text-sm">Estado</p>
            <EstadoSwitch excursion={excursion} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const columns: ColumnDef<Excursion>[] = [
  {
    accessorKey: "nombre",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const excursion = row.original
      const { destacarExcursion } = useExcursiones()
      const [destacando, setDestacando] = useState(false)

      const handleToggleDestacado = async (e: React.MouseEvent) => {
        e.stopPropagation()
        setDestacando(true)
        await destacarExcursion(excursion.id, !excursion.destacado)
        setDestacando(false)
      }

      return (
        <div className="flex items-center gap-2">
          <div className="font-medium truncate max-w-[200px]">{excursion.nombre}</div>
          <button
            onClick={handleToggleDestacado}
            disabled={destacando}
            className="focus:outline-none"
            title={excursion.destacado ? "Quitar de destacados" : "Destacar excursión"}
          >
            {destacando ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : (
              <Star
                className={`h-4 w-4 ${
                  excursion.destacado ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                }`}
              />
            )}
          </button>
        </div>
      )
    },
  },
  {
    accessorKey: "ubicacion",
    header: "Ubicación",
    cell: ({ row }) => <div className="truncate max-w-[150px]">{row.getValue("ubicacion")}</div>,
  },
  {
    accessorKey: "duracion",
    header: "Duración",
    cell: ({ row }) => <div>{row.getValue("duracion")}</div>,
  },
  {
    accessorKey: "precio",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Precio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("precio"))
      const formatted = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "categoria",
    header: "Categoría",
    cell: ({ row }) => {
      const categoria = row.getValue("categoria") as string
      return <Badge variant="outline">{categoria || "Sin categoría"}</Badge>
    },
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => <EstadoSwitch excursion={row.original} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <AccionesExcursion excursion={row.original} />,
  },
]

interface TablaExcursionesProps {
  estado?: "activa" | "inactiva"
  destacada?: boolean
}

export function TablaExcursiones({ estado, destacada }: TablaExcursionesProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const { excursiones, cargando, error } = useExcursiones()
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Filtrar por estado o destacada si se proporciona
  let data = [...excursiones]
  if (estado) {
    data = data.filter((excursion) => excursion.estado === estado)
  }
  if (destacada !== undefined) {
    data = data.filter((excursion) => excursion.destacado === destacada)
  }

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
            table.getRowModel().rows.map((row) => <ExcursionCard key={row.id} excursion={row.original} />)
          ) : (
            <div className="text-center py-4 bg-muted rounded-md">No se encontraron excursiones.</div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-2">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredRowModel().rows.length} excursión(es) en total.
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
                    No se encontraron excursiones.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} excursión(es) en total.
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
