"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import type { Excursion } from "@/types/excursion"

interface FormularioReservaProps {
  excursion: Excursion
}

export default function FormularioReserva({ excursion }: FormularioReservaProps) {
  const [fecha, setFecha] = useState<Date>()
  const [adultos, setAdultos] = useState(2)
  const [ninos, setNinos] = useState(0)
  const [horario, setHorario] = useState("")
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [telefono, setTelefono] = useState("")
  const [comentarios, setComentarios] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [exito, setExito] = useState(false)

  // Calcular precio total
  const precioTotal = excursion.precio * adultos + excursion.precio * 0.5 * ninos

  // Horarios disponibles
  const horarios = excursion.horarios || ["09:00", "11:00", "15:00"]

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviando(true)

    // Simular envío de formulario
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setEnviando(false)
    setExito(true)

    // Reiniciar formulario después de 3 segundos
    setTimeout(() => {
      setExito(false)
    }, 3000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reserva tu excursión</CardTitle>
        <CardDescription>Completa el formulario para reservar tu plaza</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fecha">Fecha de la excursión</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !fecha && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {fecha ? format(fecha, "PPP", { locale: es }) : "Selecciona una fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={fecha}
                  onSelect={setFecha}
                  initialFocus
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                    date > new Date(new Date().setMonth(new Date().getMonth() + 3))
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="horario">Horario</Label>
            <Select value={horario} onValueChange={setHorario}>
              <SelectTrigger id="horario">
                <SelectValue placeholder="Selecciona un horario" />
              </SelectTrigger>
              <SelectContent>
                {horarios.map((h) => (
                  <SelectItem key={h} value={h}>
                    {h}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="adultos">Adultos</Label>
              <Select value={adultos.toString()} onValueChange={(value) => setAdultos(Number.parseInt(value))}>
                <SelectTrigger id="adultos">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ninos">Niños (4-12 años)</Label>
              <Select value={ninos.toString()} onValueChange={(value) => setNinos(Number.parseInt(value))}>
                <SelectTrigger id="ninos">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre completo</Label>
            <Input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comentarios">Comentarios adicionales</Label>
            <Textarea
              id="comentarios"
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
              placeholder="Indique cualquier necesidad especial o información adicional"
              className="resize-none"
            />
          </div>

          <div className="rounded-lg bg-muted p-4">
            <div className="flex justify-between mb-2">
              <span>Precio por adulto:</span>
              <span>{excursion.precio} €</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Precio por niño:</span>
              <span>{excursion.precio * 0.5} €</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>{adultos} adultos:</span>
              <span>{excursion.precio * adultos} €</span>
            </div>

            {ninos > 0 && (
              <div className="flex justify-between mb-2">
                <span>{ninos} niños:</span>
                <span>{excursion.precio * 0.5 * ninos} €</span>
              </div>
            )}

            <div className="border-t pt-2 mt-2 flex justify-between font-bold">
              <span>Total:</span>
              <span>{precioTotal} €</span>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!fecha || !horario || !nombre || !email || !telefono || enviando || exito}
          >
            {enviando ? "Procesando..." : exito ? "¡Reserva confirmada!" : "Confirmar reserva"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col items-start text-xs text-muted-foreground">
        <p>Al realizar la reserva, acepta nuestros términos y condiciones.</p>
        <p className="mt-1">Cancelación gratuita hasta 48 horas antes de la excursión.</p>
      </CardFooter>
    </Card>
  )
}
