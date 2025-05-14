"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Plus, Save, Trash } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import type { Cliente } from "@/contexts/cliente-context"

interface Nota {
  id: string
  texto: string
  fecha: string
  importante: boolean
}

interface ClienteNotasProps {
  cliente: Cliente
}

export function ClienteNotas({ cliente }: ClienteNotasProps) {
  const [notas, setNotas] = useState<Nota[]>([])
  const [nuevaNota, setNuevaNota] = useState("")
  const [importante, setImportante] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  // Cargar notas (simulado)
  useEffect(() => {
    // Aquí se cargarían las notas desde una API real
    // Por ahora usamos datos de ejemplo
    const notasEjemplo = cliente.notas
      ? [
          {
            id: "nota-1",
            texto: cliente.notas,
            fecha: new Date().toISOString(),
            importante: true,
          },
        ]
      : []

    setNotas(notasEjemplo)
  }, [cliente])

  const handleGuardarNota = () => {
    if (!nuevaNota.trim()) return

    setCargando(true)

    // Simulamos una llamada a API
    setTimeout(() => {
      const nuevaNotaObj: Nota = {
        id: `nota-${Date.now()}`,
        texto: nuevaNota,
        fecha: new Date().toISOString(),
        importante: importante,
      }

      setNotas([nuevaNotaObj, ...notas])
      setNuevaNota("")
      setImportante(false)
      setCargando(false)
      setOpen(false)

      toast({
        title: "Nota añadida",
        description: "La nota ha sido añadida correctamente.",
      })
    }, 800)
  }

  const handleEliminarNota = (id: string) => {
    setCargando(true)

    // Simulamos una llamada a API
    setTimeout(() => {
      setNotas(notas.filter((nota) => nota.id !== id))
      setCargando(false)

      toast({
        title: "Nota eliminada",
        description: "La nota ha sido eliminada correctamente.",
      })
    }, 500)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Notas del cliente</h3>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Añadir nota
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Añadir nueva nota</DialogTitle>
              <DialogDescription>
                Añade una nota sobre este cliente. Las notas te ayudarán a recordar detalles importantes.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <Textarea
                placeholder="Escribe aquí la nota..."
                value={nuevaNota}
                onChange={(e) => setNuevaNota(e.target.value)}
                className="min-h-[120px]"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="importante"
                  checked={importante}
                  onChange={(e) => setImportante(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="importante" className="text-sm font-medium">
                  Marcar como importante
                </label>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button onClick={handleGuardarNota} disabled={!nuevaNota.trim() || cargando}>
                {cargando ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar nota
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {notas.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No hay notas para este cliente.</p>
          <p className="text-sm mt-1">Añade una nota para registrar información importante.</p>
        </div>
      ) : (
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3">
            {notas.map((nota) => (
              <Card key={nota.id} className={nota.importante ? "border-primary/20 bg-primary/5" : ""}>
                <CardHeader className="py-3 px-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardDescription>
                        {new Date(nota.fecha).toLocaleDateString()} - {new Date(nota.fecha).toLocaleTimeString()}
                      </CardDescription>
                      {nota.importante && (
                        <Badge variant="outline" className="mt-1 bg-primary/10 text-primary border-primary/20">
                          Importante
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleEliminarNota(nota.id)}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Eliminar nota</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="py-2 px-4">
                  <p className="whitespace-pre-wrap text-sm">{nota.texto}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}
