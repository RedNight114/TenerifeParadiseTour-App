"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  Search,
  Plus,
  Trash2,
  Edit,
  Star,
  StarOff,
  Eye,
  EyeOff,
  Upload,
  X,
  Tag,
  MoveVertical,
  Check,
  Info,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { galeriaService } from "@/lib/api/galeria-service"
import type { ImagenGaleria, FiltrosGaleria } from "@/types/galeria"

export default function AdminGaleria() {
  const [imagenes, setImagenes] = useState<ImagenGaleria[]>([])
  const [categorias, setCategorias] = useState<string[]>([])
  const [filtros, setFiltros] = useState<FiltrosGaleria>({})
  const [cargando, setCargando] = useState(true)
  const [imagenSeleccionada, setImagenSeleccionada] = useState<ImagenGaleria | null>(null)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [modoReordenar, setModoReordenar] = useState(false)
  const [nuevaCategoria, setNuevaCategoria] = useState("")
  const [busqueda, setBusqueda] = useState("")
  const [dialogoSubirAbierto, setDialogoSubirAbierto] = useState(false)

  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Cargar datos
  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true)
      try {
        // Aplicar filtro de búsqueda
        const filtrosActuales = { ...filtros }
        if (busqueda) {
          filtrosActuales.busqueda = busqueda
        }

        const [imagenesData, categoriasData] = await Promise.all([
          galeriaService.getImagenes(filtrosActuales),
          galeriaService.getCategorias(),
        ])
        setImagenes(imagenesData)
        setCategorias(categoriasData)
      } catch (error) {
        console.error("Error al cargar datos de la galería:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar las imágenes de la galería",
          variant: "destructive",
        })
      } finally {
        setCargando(false)
      }
    }

    cargarDatos()
  }, [filtros, busqueda, toast])

  // Manejar filtro de categoría
  const handleFiltroCategoria = (categoria: string) => {
    setFiltros((prev) => ({
      ...prev,
      categoria: prev.categoria === categoria ? undefined : categoria,
    }))
  }

  // Manejar filtro de destacadas
  const handleFiltroDestacadas = () => {
    setFiltros((prev) => ({
      ...prev,
      destacadas: !prev.destacadas,
    }))
  }

  // Manejar búsqueda
  const handleBusqueda = (e: React.FormEvent) => {
    e.preventDefault()
    // La búsqueda se aplica en el useEffect a través del estado busqueda
  }

  // Manejar selección de imagen
  const handleSeleccionarImagen = (imagen: ImagenGaleria) => {
    setImagenSeleccionada(imagen)
    setModoEdicion(false)
  }

  // Manejar cambio de estado destacado
  const handleToggleDestacada = async (id: string, destacada: boolean) => {
    try {
      const exito = await galeriaService.actualizarImagen(id, { destacada })
      if (exito) {
        setImagenes((prev) => prev.map((img) => (img.id === id ? { ...img, destacada } : img)))
        toast({
          title: destacada ? "Imagen destacada" : "Imagen no destacada",
          description: `La imagen ha sido ${destacada ? "marcada como destacada" : "desmarcada como destacada"} correctamente`,
        })
      }
    } catch (error) {
      console.error("Error al actualizar estado destacado:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado de la imagen",
        variant: "destructive",
      })
    }
  }

  // Manejar cambio de estado activo
  const handleToggleActiva = async (id: string, activa: boolean) => {
    try {
      const exito = await galeriaService.actualizarImagen(id, { activa })
      if (exito) {
        setImagenes((prev) => prev.map((img) => (img.id === id ? { ...img, activa } : img)))
        toast({
          title: activa ? "Imagen activada" : "Imagen desactivada",
          description: `La imagen ha sido ${activa ? "activada" : "desactivada"} correctamente`,
        })
      }
    } catch (error) {
      console.error("Error al actualizar estado activo:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado de la imagen",
        variant: "destructive",
      })
    }
  }

  // Manejar eliminación de imagen
  const handleEliminarImagen = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta imagen? Esta acción no se puede deshacer.")) {
      return
    }

    try {
      const exito = await galeriaService.eliminarImagen(id)
      if (exito) {
        setImagenes((prev) => prev.filter((img) => img.id !== id))
        if (imagenSeleccionada?.id === id) {
          setImagenSeleccionada(null)
        }
        toast({
          title: "Imagen eliminada",
          description: "La imagen ha sido eliminada correctamente",
        })
      }
    } catch (error) {
      console.error("Error al eliminar imagen:", error)
      toast({
        title: "Error",
        description: "No se pudo eliminar la imagen",
        variant: "destructive",
      })
    }
  }

  // Manejar subida de imagen
  const handleSubirImagen = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const file = formData.get("imagen") as File
    if (!file || file.size === 0) {
      toast({
        title: "Error",
        description: "Por favor, selecciona una imagen",
        variant: "destructive",
      })
      return
    }

    const metadata = {
      titulo: formData.get("titulo") as string,
      descripcion: formData.get("descripcion") as string,
      categoria: formData.get("categoria") as string,
      destacada: formData.get("destacada") === "on",
      tags: (formData.get("tags") as string)
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    }

    try {
      const nuevaImagen = await galeriaService.subirImagen(file, metadata)
      if (nuevaImagen) {
        setImagenes((prev) => [...prev, nuevaImagen])
        setDialogoSubirAbierto(false)
        form.reset()
        toast({
          title: "Imagen subida",
          description: "La imagen ha sido subida correctamente",
        })
      }
    } catch (error) {
      console.error("Error al subir imagen:", error)
      toast({
        title: "Error",
        description: "No se pudo subir la imagen",
        variant: "destructive",
      })
    }
  }

  // Manejar actualización de imagen
  const handleActualizarImagen = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!imagenSeleccionada) return

    const form = e.currentTarget
    const formData = new FormData(form)

    const datos = {
      titulo: formData.get("titulo") as string,
      descripcion: formData.get("descripcion") as string,
      categoria: formData.get("categoria") as string,
      destacada: formData.get("destacada") === "on",
      tags: (formData.get("tags") as string)
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    }

    try {
      const exito = await galeriaService.actualizarImagen(imagenSeleccionada.id, datos)
      if (exito) {
        setImagenes((prev) => prev.map((img) => (img.id === imagenSeleccionada.id ? { ...img, ...datos } : img)))
        setImagenSeleccionada((prev) => (prev ? { ...prev, ...datos } : null))
        setModoEdicion(false)
        toast({
          title: "Imagen actualizada",
          description: "La imagen ha sido actualizada correctamente",
        })
      }
    } catch (error) {
      console.error("Error al actualizar imagen:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar la imagen",
        variant: "destructive",
      })
    }
  }

  // Manejar reordenamiento de imágenes
  const handleReordenarImagenes = async () => {
    try {
      const idsOrdenados = imagenes.map((img) => img.id)
      const exito = await galeriaService.reordenarImagenes(idsOrdenados)
      if (exito) {
        setModoReordenar(false)
        toast({
          title: "Orden actualizado",
          description: "El orden de las imágenes ha sido actualizado correctamente",
        })
      }
    } catch (error) {
      console.error("Error al reordenar imágenes:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el orden de las imágenes",
        variant: "destructive",
      })
    }
  }

  // Manejar movimiento de imagen en el reordenamiento
  const handleMoverImagen = (id: string, direccion: "arriba" | "abajo") => {
    setImagenes((prev) => {
      const index = prev.findIndex((img) => img.id === id)
      if (index === -1) return prev

      const nuevasImagenes = [...prev]
      if (direccion === "arriba" && index > 0) {
        // Intercambiar con la imagen anterior
        ;[nuevasImagenes[index], nuevasImagenes[index - 1]] = [nuevasImagenes[index - 1], nuevasImagenes[index]]
      } else if (direccion === "abajo" && index < nuevasImagenes.length - 1) {
        // Intercambiar con la imagen siguiente
        ;[nuevasImagenes[index], nuevasImagenes[index + 1]] = [nuevasImagenes[index + 1], nuevasImagenes[index]]
      }

      return nuevasImagenes
    })
  }

  // Manejar adición de nueva categoría
  const handleAgregarCategoria = () => {
    if (!nuevaCategoria.trim()) return

    if (!categorias.includes(nuevaCategoria)) {
      setCategorias((prev) => [...prev, nuevaCategoria])
      setNuevaCategoria("")
      toast({
        title: "Categoría agregada",
        description: `La categoría "${nuevaCategoria}" ha sido agregada correctamente`,
      })
    } else {
      toast({
        title: "Categoría duplicada",
        description: "Esta categoría ya existe",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Galería de Imágenes</h1>
          <p className="text-muted-foreground">Gestiona las imágenes que se muestran en la galería de tu sitio web.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setModoReordenar(!modoReordenar)} variant={modoReordenar ? "default" : "outline"}>
            <MoveVertical className="mr-2 h-4 w-4" />
            {modoReordenar ? "Guardar Orden" : "Reordenar"}
          </Button>
          <Dialog open={dialogoSubirAbierto} onOpenChange={setDialogoSubirAbierto}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Subir Imagen
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Subir nueva imagen</DialogTitle>
                <DialogDescription>
                  Sube una nueva imagen a la galería. Las imágenes deben estar en formato JPG, PNG o WebP.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubirImagen} className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="imagen">Imagen</Label>
                  <Input id="imagen" name="imagen" type="file" accept="image/*" required />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="titulo">Título</Label>
                  <Input id="titulo" name="titulo" placeholder="Título de la imagen" required />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea id="descripcion" name="descripcion" placeholder="Descripción de la imagen" rows={3} />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="categoria">Categoría</Label>
                  <div className="flex gap-2">
                    <Select name="categoria">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categorias.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const categoria = prompt("Introduce el nombre de la nueva categoría:")
                        if (categoria && !categorias.includes(categoria)) {
                          setCategorias((prev) => [...prev, categoria])
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="tags">Etiquetas</Label>
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <Input id="tags" name="tags" placeholder="Etiquetas separadas por comas" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="destacada" name="destacada" />
                  <Label htmlFor="destacada">Marcar como destacada</Label>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setDialogoSubirAbierto(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Subir Imagen</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Panel izquierdo: Lista de imágenes */}
        <div className="md:col-span-2 space-y-4">
          {/* Filtros y búsqueda */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Filtros</CardTitle>
              <CardDescription>Filtra las imágenes por categoría, estado o búsqueda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Búsqueda */}
                <form onSubmit={handleBusqueda} className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar por título, descripción o etiquetas..."
                    className="pl-8 w-full"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                </form>

                {/* Filtros de categoría */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Categorías</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={!filtros.categoria ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFiltros((prev) => ({ ...prev, categoria: undefined }))}
                    >
                      Todas
                    </Button>
                    {categorias.map((categoria) => (
                      <Button
                        key={categoria}
                        variant={filtros.categoria === categoria ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleFiltroCategoria(categoria)}
                      >
                        {categoria}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-dashed"
                      onClick={() => {
                        const categoria = prompt("Introduce el nombre de la nueva categoría:")
                        if (categoria && !categorias.includes(categoria)) {
                          setCategorias((prev) => [...prev, categoria])
                        }
                      }}
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      Nueva
                    </Button>
                  </div>
                </div>

                {/* Otros filtros */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={filtros.destacadas ? "default" : "outline"}
                    size="sm"
                    onClick={handleFiltroDestacadas}
                  >
                    <Star className={`h-3.5 w-3.5 mr-1 ${filtros.destacadas ? "fill-white" : ""}`} />
                    Destacadas
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de imágenes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Imágenes ({imagenes.length})</CardTitle>
              <CardDescription>
                {modoReordenar
                  ? "Arrastra las imágenes para cambiar su orden de visualización"
                  : "Haz clic en una imagen para ver sus detalles o editarla"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {cargando ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : imagenes.length === 0 ? (
                <div className="text-center py-12">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No se encontraron imágenes</p>
                  <Button className="mt-4" onClick={() => setDialogoSubirAbierto(true)}>
                    <Upload className="mr-2 h-4 w-4" />
                    Subir primera imagen
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {imagenes.map((imagen) => (
                    <div
                      key={imagen.id}
                      className={`relative group cursor-pointer rounded-md overflow-hidden border ${
                        imagenSeleccionada?.id === imagen.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => handleSeleccionarImagen(imagen)}
                    >
                      {/* Imagen */}
                      <div className="aspect-square relative">
                        <img
                          src={imagen.url || "/placeholder.svg"}
                          alt={imagen.titulo}
                          className="object-cover w-full h-full"
                        />

                        {/* Overlay con acciones rápidas */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200">
                          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 bg-white/80 hover:bg-white text-gray-700 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleToggleDestacada(imagen.id, !imagen.destacada)
                              }}
                              title={imagen.destacada ? "Quitar destacada" : "Marcar como destacada"}
                            >
                              {imagen.destacada ? (
                                <StarOff className="h-3.5 w-3.5" />
                              ) : (
                                <Star className="h-3.5 w-3.5" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 bg-white/80 hover:bg-white text-gray-700 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleToggleActiva(imagen.id, !imagen.activa)
                              }}
                              title={imagen.activa ? "Desactivar" : "Activar"}
                            >
                              {imagen.activa ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 bg-white/80 hover:bg-white text-red-600 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEliminarImagen(imagen.id)
                              }}
                              title="Eliminar"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>

                        {/* Indicadores de estado */}
                        <div className="absolute top-2 left-2 flex gap-1">
                          {imagen.destacada && (
                            <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
                              <Star className="h-3 w-3 fill-white mr-1" />
                              Destacada
                            </Badge>
                          )}
                          {!imagen.activa && (
                            <Badge variant="outline" className="bg-gray-100 text-gray-700">
                              Inactiva
                            </Badge>
                          )}
                        </div>

                        {/* Controles de reordenamiento */}
                        {modoReordenar && (
                          <div className="absolute inset-x-0 bottom-0 p-2 bg-black/50 flex justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 bg-white/80 hover:bg-white text-gray-700 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleMoverImagen(imagen.id, "arriba")
                              }}
                              disabled={imagenes.indexOf(imagen) === 0}
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 bg-white/80 hover:bg-white text-gray-700 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleMoverImagen(imagen.id, "abajo")
                              }}
                              disabled={imagenes.indexOf(imagen) === imagenes.length - 1}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* Título */}
                      <div className="p-2 bg-gray-50 border-t">
                        <p className="text-sm font-medium truncate">{imagen.titulo}</p>
                        <p className="text-xs text-muted-foreground truncate">{imagen.categoria}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            {modoReordenar && (
              <CardFooter className="flex justify-end gap-2 pt-0">
                <Button variant="outline" onClick={() => setModoReordenar(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleReordenarImagenes}>
                  <Check className="mr-2 h-4 w-4" />
                  Guardar Orden
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>

        {/* Panel derecho: Detalles y edición */}
        <div>
          <Card className="sticky top-4">
            {!imagenSeleccionada ? (
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Selecciona una imagen para ver sus detalles</p>
                </div>
              </CardContent>
            ) : (
              <>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>{modoEdicion ? "Editar imagen" : "Detalles de la imagen"}</CardTitle>
                    <div className="flex gap-2">
                      {!modoEdicion && (
                        <Button variant="outline" size="sm" onClick={() => setModoEdicion(true)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => setImagenSeleccionada(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {modoEdicion ? (
                    <form onSubmit={handleActualizarImagen} className="space-y-4">
                      <div className="aspect-video rounded-md overflow-hidden mb-4">
                        <img
                          src={imagenSeleccionada.url || "/placeholder.svg"}
                          alt={imagenSeleccionada.titulo}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="grid w-full gap-1.5">
                        <Label htmlFor="edit-titulo">Título</Label>
                        <Input id="edit-titulo" name="titulo" defaultValue={imagenSeleccionada.titulo} required />
                      </div>
                      <div className="grid w-full gap-1.5">
                        <Label htmlFor="edit-descripcion">Descripción</Label>
                        <Textarea
                          id="edit-descripcion"
                          name="descripcion"
                          defaultValue={imagenSeleccionada.descripcion || ""}
                          rows={3}
                        />
                      </div>
                      <div className="grid w-full gap-1.5">
                        <Label htmlFor="edit-categoria">Categoría</Label>
                        <div className="flex gap-2">
                          <Select name="categoria" defaultValue={imagenSeleccionada.categoria}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                            <SelectContent>
                              {categorias.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                  {cat}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const categoria = prompt("Introduce el nombre de la nueva categoría:")
                              if (categoria && !categorias.includes(categoria)) {
                                setCategorias((prev) => [...prev, categoria])
                              }
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid w-full gap-1.5">
                        <Label htmlFor="edit-tags">Etiquetas</Label>
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="edit-tags"
                            name="tags"
                            defaultValue={imagenSeleccionada.tags?.join(", ") || ""}
                            placeholder="Etiquetas separadas por comas"
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="edit-destacada" name="destacada" defaultChecked={imagenSeleccionada.destacada} />
                        <Label htmlFor="edit-destacada">Marcar como destacada</Label>
                      </div>
                      <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => setModoEdicion(false)}>
                          Cancelar
                        </Button>
                        <Button type="submit">Guardar Cambios</Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="aspect-video rounded-md overflow-hidden mb-4">
                        <img
                          src={imagenSeleccionada.url || "/placeholder.svg"}
                          alt={imagenSeleccionada.titulo}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{imagenSeleccionada.titulo}</h3>
                        {imagenSeleccionada.descripcion && (
                          <p className="text-sm text-gray-600 mt-1">{imagenSeleccionada.descripcion}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Categoría</p>
                          <p className="font-medium">{imagenSeleccionada.categoria || "Sin categoría"}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Fecha de subida</p>
                          <p className="font-medium">{imagenSeleccionada.fechaSubida}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Estado</p>
                          <div className="flex items-center gap-1">
                            {imagenSeleccionada.activa ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Activa
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                                Inactiva
                              </Badge>
                            )}
                            {imagenSeleccionada.destacada && (
                              <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
                                <Star className="h-3 w-3 fill-white mr-1" />
                                Destacada
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Orden</p>
                          <p className="font-medium">{imagenSeleccionada.orden}</p>
                        </div>
                      </div>
                      {imagenSeleccionada.tags && imagenSeleccionada.tags.length > 0 && (
                        <div>
                          <p className="text-muted-foreground text-sm mb-1">Etiquetas</p>
                          <div className="flex flex-wrap gap-1">
                            {imagenSeleccionada.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex justify-between pt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className={imagenSeleccionada.activa ? "text-red-600" : "text-green-600"}
                          onClick={() => handleToggleActiva(imagenSeleccionada.id, !imagenSeleccionada.activa)}
                        >
                          {imagenSeleccionada.activa ? (
                            <>
                              <EyeOff className="h-4 w-4 mr-1" />
                              Desactivar
                            </>
                          ) : (
                            <>
                              <Eye className="h-4 w-4 mr-1" />
                              Activar
                            </>
                          )}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleEliminarImagen(imagenSeleccionada.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
