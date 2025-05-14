"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useClientes, type Cliente, clienteNuevoInicial } from "@/contexts/cliente-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface FormularioClienteProps {
  clienteId?: string
  modo?: "crear" | "editar"
}

export function FormularioCliente({ clienteId, modo = "crear" }: FormularioClienteProps) {
  const router = useRouter()
  const { obtenerCliente, guardarCliente, cargando } = useClientes()

  // Estados para los campos del formulario
  const [formData, setFormData] = useState<Partial<Cliente>>(clienteNuevoInicial)
  const [fechaRegistro, setFechaRegistro] = useState<Date | undefined>(new Date())
  const [errores, setErrores] = useState<Record<string, string>>({})
  const [enviando, setEnviando] = useState(false)
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null)

  // Categorías de preferencias
  const categorias = ["Cultura", "Aventura", "Gastronomía", "Romántico", "Actividades", "Naturaleza", "Playa"]

  // Cargar datos del cliente si estamos en modo edición
  useEffect(() => {
    if (modo === "editar" && clienteId) {
      const cliente = obtenerCliente(clienteId)
      if (cliente) {
        setFormData(cliente)
        setFechaRegistro(cliente.fechaRegistro ? new Date(cliente.fechaRegistro) : undefined)
      } else {
        setErrorGeneral("No se pudo cargar la información del cliente")
      }
    }
  }, [clienteId, modo, obtenerCliente])

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpiar error del campo si existe
    if (errores[name]) {
      setErrores((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Manejar cambios en el switch de VIP
  const handleVipChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, vip: checked }))
  }

  // Manejar cambios en el estado
  const handleEstadoChange = (value: string) => {
    setFormData((prev) => ({ ...prev, estado: value as Cliente["estado"] }))
  }

  // Manejar cambios en las categorías preferidas
  const toggleCategoria = (categoria: string) => {
    setFormData((prev) => {
      const categoriasActuales = prev.categoriasPreferidas || []
      let nuevasCategorias: string[]

      if (categoriasActuales.includes(categoria)) {
        nuevasCategorias = categoriasActuales.filter((c) => c !== categoria)
      } else {
        nuevasCategorias = [...categoriasActuales, categoria]
      }

      return { ...prev, categoriasPreferidas: nuevasCategorias }
    })
  }

  // Validar el formulario
  const validarFormulario = (): boolean => {
    const nuevosErrores: Record<string, string> = {}

    if (!formData.nombre?.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio"
    }

    if (!formData.email?.trim()) {
      nuevosErrores.email = "El email es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nuevosErrores.email = "El email no es válido"
    }

    if (!formData.telefono?.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio"
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar formulario
    if (!validarFormulario()) {
      return
    }

    setEnviando(true)
    setErrorGeneral(null)

    try {
      // Actualizar fecha de registro desde el estado del datepicker
      const datosCompletos = {
        ...formData,
        fechaRegistro: fechaRegistro
          ? fechaRegistro.toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
      }

      const exito = await guardarCliente(datosCompletos, modo === "crear")

      if (exito) {
        // Redirigir a la lista de clientes o a la página de detalles
        if (modo === "crear") {
          router.push("/dashboard/clientes")
        } else {
          router.push(`/dashboard/clientes/${clienteId}`)
        }
      } else {
        setErrorGeneral("No se pudo guardar el cliente. Inténtalo de nuevo.")
      }
    } catch (error) {
      setErrorGeneral("Ocurrió un error inesperado. Inténtalo de nuevo.")
      console.error(error)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorGeneral && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorGeneral}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="informacion" className="space-y-6">
        <TabsList>
          <TabsTrigger value="informacion">Información Personal</TabsTrigger>
          <TabsTrigger value="preferencias">Preferencias</TabsTrigger>
          <TabsTrigger value="configuracion">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="informacion" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="nombre" className={errores.nombre ? "text-destructive" : ""}>
                    Nombre completo <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    placeholder="Ej: María García"
                    value={formData.nombre || ""}
                    onChange={handleChange}
                    className={errores.nombre ? "border-destructive" : ""}
                  />
                  {errores.nombre && <p className="text-sm text-destructive">{errores.nombre}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email" className={errores.email ? "text-destructive" : ""}>
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Ej: cliente@example.com"
                      value={formData.email || ""}
                      onChange={handleChange}
                      className={errores.email ? "border-destructive" : ""}
                    />
                    {errores.email && <p className="text-sm text-destructive">{errores.email}</p>}
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="telefono" className={errores.telefono ? "text-destructive" : ""}>
                      Teléfono <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      placeholder="Ej: +34 612 345 678"
                      value={formData.telefono || ""}
                      onChange={handleChange}
                      className={errores.telefono ? "border-destructive" : ""}
                    />
                    {errores.telefono && <p className="text-sm text-destructive">{errores.telefono}</p>}
                  </div>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    name="direccion"
                    placeholder="Ej: Calle Principal 123, Madrid"
                    value={formData.direccion || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="fechaRegistro">Fecha de registro</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !fechaRegistro && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {fechaRegistro ? (
                            format(fechaRegistro, "PPP", { locale: es })
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={fechaRegistro}
                          onSelect={setFechaRegistro}
                          initialFocus
                          locale={es}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="estado">Estado</Label>
                    <Select value={formData.estado || "nuevo"} onValueChange={handleEstadoChange}>
                      <SelectTrigger id="estado">
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nuevo">Nuevo</SelectItem>
                        <SelectItem value="activo">Activo</SelectItem>
                        <SelectItem value="inactivo">Inactivo</SelectItem>
                        <SelectItem value="bloqueado">Bloqueado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="notas">Notas</Label>
                  <Textarea
                    id="notas"
                    name="notas"
                    placeholder="Añade notas o comentarios sobre este cliente"
                    className="min-h-32"
                    value={formData.notas || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferencias" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label>Categorías de interés</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {categorias.map((categoria) => (
                      <div key={categoria} className="flex items-center space-x-2">
                        <Switch
                          checked={(formData.categoriasPreferidas || []).includes(categoria)}
                          onCheckedChange={() => toggleCategoria(categoria)}
                          id={`categoria-${categoria}`}
                        />
                        <Label htmlFor={`categoria-${categoria}`}>{categoria}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="preferencias">Preferencias adicionales</Label>
                  <Textarea
                    id="preferencias"
                    name="preferencias"
                    placeholder="Detalles sobre preferencias del cliente (tipo de excursiones, horarios preferidos, etc.)"
                    className="min-h-32"
                    value={formData.preferencias || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuracion" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6">
                <div className="flex items-center space-x-2">
                  <Switch checked={formData.vip || false} onCheckedChange={handleVipChange} id="vip" />
                  <Label htmlFor="vip">Cliente VIP</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Los clientes VIP reciben trato preferencial, descuentos especiales y acceso a excursiones exclusivas.
                </p>

                <div className="grid gap-3">
                  <Label htmlFor="comunicaciones">Preferencias de comunicación</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="email-marketing" defaultChecked />
                      <Label htmlFor="email-marketing">Recibir emails de marketing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sms-notificaciones" defaultChecked />
                      <Label htmlFor="sms-notificaciones">Recibir notificaciones por SMS</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="recordatorios" defaultChecked />
                      <Label htmlFor="recordatorios">Recordatorios de excursiones</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(clienteId ? `/dashboard/clientes/${clienteId}` : "/dashboard/clientes")}
          disabled={enviando}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={enviando}>
          {enviando ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {modo === "crear" ? "Creando..." : "Guardando..."}
            </>
          ) : modo === "crear" ? (
            "Crear Cliente"
          ) : (
            "Guardar Cambios"
          )}
        </Button>
      </div>
    </form>
  )
}
