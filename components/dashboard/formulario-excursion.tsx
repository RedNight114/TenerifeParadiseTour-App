"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import type { Excursion } from "@/types/excursion"
import { storageService } from "@/lib/api/storage-service"
import Image from "next/image"
import { Loader2, X, Upload, Plus, ImageIcon } from "lucide-react"

interface FormularioExcursionProps {
  excursion?: Excursion
}

export function FormularioExcursion({ excursion }: FormularioExcursionProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadingGallery, setUploadingGallery] = useState(false)

  // Estado para las imágenes
  const [mainImage, setMainImage] = useState<string>(excursion?.imagen || "")
  const [galleryImages, setGalleryImages] = useState<string[]>(excursion?.imagenes || [])

  // Referencias a los inputs de archivo
  const mainImageInputRef = useRef<HTMLInputElement>(null)
  const galleryImagesInputRef = useRef<HTMLInputElement>(null)

  // Manejar subida de imagen principal
  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploadingImage(true)
    try {
      const { url, error } = await storageService.uploadExcursionImage(files[0], "principal")

      if (error) {
        toast({
          title: "Error al subir imagen",
          description: error,
          variant: "destructive",
        })
        return
      }

      setMainImage(url)
      toast({
        title: "Imagen subida",
        description: "La imagen principal se ha subido correctamente.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error al subir la imagen.",
        variant: "destructive",
      })
    } finally {
      setUploadingImage(false)
    }
  }

  // Manejar subida de imágenes de galería
  const handleGalleryImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploadingGallery(true)
    try {
      const { urls, errors } = await storageService.uploadMultipleImages(Array.from(files), "galeria")

      if (errors.length > 0) {
        toast({
          title: "Errores al subir imágenes",
          description: `${errors.length} imágenes no se pudieron subir.`,
          variant: "destructive",
        })
      }

      if (urls.length > 0) {
        setGalleryImages([...galleryImages, ...urls])
        toast({
          title: "Imágenes subidas",
          description: `${urls.length} imágenes se han subido correctamente.`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error al subir las imágenes.",
        variant: "destructive",
      })
    } finally {
      setUploadingGallery(false)
    }
  }

  // Eliminar imagen de galería
  const removeGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index))
  }

  // Eliminar imagen principal
  const removeMainImage = () => {
    setMainImage("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Recopilar todos los datos del formulario
    const formData = new FormData(e.target as HTMLFormElement)

    // Crear objeto de excursión con todos los campos
    const excursionData: Partial<Excursion> = {
      id: excursion?.id,
      nombre: formData.get("nombre") as string,
      descripcionCorta: formData.get("descripcionCorta") as string,
      descripcion: formData.get("descripcion") as string,
      precio: Number.parseFloat(formData.get("precio") as string),
      precioAnterior: formData.get("precioAnterior")
        ? Number.parseFloat(formData.get("precioAnterior") as string)
        : undefined,
      ubicacion: formData.get("ubicacion") as string,
      duracion: formData.get("duracion") as string,
      grupoMaximo: Number.parseInt(formData.get("grupoMaximo") as string),
      destacado: (document.getElementById("destacado") as HTMLInputElement).checked,
      categoria: formData.get("categoria") as string,
      puntoEncuentro: formData.get("puntoEncuentro") as string,
      incluye: formData.get("incluye")
        ? (formData.get("incluye") as string).split("\n").filter((item) => item.trim() !== "")
        : [],
      noIncluye: formData.get("noIncluye")
        ? (formData.get("noIncluye") as string).split("\n").filter((item) => item.trim() !== "")
        : [],
      horarios: formData.get("horarios")
        ? (formData.get("horarios") as string).split("\n").filter((item) => item.trim() !== "")
        : [],
      estado: "activa",
      // Añadir las imágenes
      imagen: mainImage,
      imagenes: galleryImages,
    }

    // Simular envío a la API
    try {
      // En una implementación real, aquí se enviaría a la API
      // const response = await excursionesService.guardarExcursion(excursionData, !excursion);

      // Simular respuesta exitosa
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSubmitting(false)
      toast({
        title: excursion ? "Excursión actualizada" : "Excursión creada",
        description: excursion
          ? "La excursión ha sido actualizada correctamente."
          : "La excursión ha sido creada correctamente.",
      })

      router.push("/dashboard/excursiones")
    } catch (error) {
      setIsSubmitting(false)
      toast({
        title: "Error",
        description: "Ha ocurrido un error al guardar la excursión.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">Información General</TabsTrigger>
          <TabsTrigger value="detalles">Detalles</TabsTrigger>
          <TabsTrigger value="imagenes">Imágenes</TabsTrigger>
          <TabsTrigger value="horarios">Horarios y Precios</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="nombre">Nombre de la excursión</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    placeholder="Ej: Tour por la Ciudad Histórica"
                    defaultValue={excursion?.nombre}
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="descripcionCorta">Descripción corta</Label>
                  <Textarea
                    id="descripcionCorta"
                    name="descripcionCorta"
                    placeholder="Breve descripción para mostrar en las tarjetas"
                    defaultValue={excursion?.descripcionCorta}
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="descripcion">Descripción completa</Label>
                  <Textarea
                    id="descripcion"
                    name="descripcion"
                    placeholder="Descripción detallada de la excursión"
                    className="min-h-32"
                    defaultValue={excursion?.descripcion}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="ubicacion">Ubicación</Label>
                    <Input
                      id="ubicacion"
                      name="ubicacion"
                      placeholder="Ej: Centro Histórico"
                      defaultValue={excursion?.ubicacion}
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="categoria">Categoría</Label>
                    <Input
                      id="categoria"
                      name="categoria"
                      placeholder="Ej: Cultura, Aventura, Gastronomía"
                      defaultValue={excursion?.categoria}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="destacado" name="destacado" defaultChecked={excursion?.destacado} />
                  <Label htmlFor="destacado">Destacar en la página principal</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detalles" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="duracion">Duración</Label>
                    <Input
                      id="duracion"
                      name="duracion"
                      placeholder="Ej: 2 horas"
                      defaultValue={excursion?.duracion}
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="grupoMaximo">Tamaño máximo del grupo</Label>
                    <Input
                      id="grupoMaximo"
                      name="grupoMaximo"
                      type="number"
                      placeholder="Ej: 15"
                      defaultValue={excursion?.grupoMaximo}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="puntoEncuentro">Punto de encuentro</Label>
                  <Input
                    id="puntoEncuentro"
                    name="puntoEncuentro"
                    placeholder="Ej: Plaza Mayor, junto a la Oficina de Turismo"
                    defaultValue={excursion?.puntoEncuentro}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="incluye">Qué incluye (un elemento por línea)</Label>
                  <Textarea
                    id="incluye"
                    name="incluye"
                    placeholder="Ej: Guía turístico profesional&#10;Auriculares para grupos grandes&#10;Mapa de la ciudad"
                    className="min-h-24"
                    defaultValue={excursion?.incluye?.join("\n")}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="noIncluye">Qué no incluye (un elemento por línea)</Label>
                  <Textarea
                    id="noIncluye"
                    name="noIncluye"
                    placeholder="Ej: Comidas y bebidas&#10;Entradas a monumentos&#10;Transporte"
                    className="min-h-24"
                    defaultValue={excursion?.noIncluye?.join("\n")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="imagenes" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6">
                {/* Imagen principal */}
                <div className="grid gap-3">
                  <Label>Imagen principal</Label>

                  {/* Previsualización de imagen principal */}
                  {mainImage ? (
                    <div className="relative w-full h-48 bg-muted rounded-md overflow-hidden">
                      <Image
                        src={mainImage || "/placeholder.svg"}
                        alt="Imagen principal"
                        fill
                        className="object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={removeMainImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="flex flex-col items-center justify-center w-full h-48 bg-muted rounded-md cursor-pointer border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors"
                      onClick={() => mainImageInputRef.current?.click()}
                    >
                      {uploadingImage ? (
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                      ) : (
                        <>
                          <ImageIcon className="h-8 w-8 mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Haz clic para subir una imagen</p>
                        </>
                      )}
                    </div>
                  )}

                  {/* Input oculto para subir imagen principal */}
                  <input
                    ref={mainImageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleMainImageUpload}
                    disabled={uploadingImage}
                  />

                  {/* Botón para subir imagen principal */}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => mainImageInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="w-full"
                  >
                    {uploadingImage ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Subiendo...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        {mainImage ? "Cambiar imagen principal" : "Subir imagen principal"}
                      </>
                    )}
                  </Button>
                </div>

                {/* Imágenes de galería */}
                <div className="grid gap-3">
                  <Label>Imágenes adicionales</Label>

                  {/* Previsualización de imágenes de galería */}
                  {galleryImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {galleryImages.map((img, index) => (
                        <div key={index} className="relative w-full h-32 bg-muted rounded-md overflow-hidden">
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={`Imagen de galería ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => removeGalleryImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}

                      {/* Botón para añadir más imágenes */}
                      <div
                        className="flex flex-col items-center justify-center w-full h-32 bg-muted rounded-md cursor-pointer border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors"
                        onClick={() => galleryImagesInputRef.current?.click()}
                      >
                        <Plus className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </div>
                  )}

                  {/* Si no hay imágenes, mostrar área para subir */}
                  {galleryImages.length === 0 && (
                    <div
                      className="flex flex-col items-center justify-center w-full h-48 bg-muted rounded-md cursor-pointer border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors"
                      onClick={() => galleryImagesInputRef.current?.click()}
                    >
                      {uploadingGallery ? (
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                      ) : (
                        <>
                          <ImageIcon className="h-8 w-8 mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Haz clic para subir imágenes adicionales</p>
                        </>
                      )}
                    </div>
                  )}

                  {/* Input oculto para subir imágenes de galería */}
                  <input
                    ref={galleryImagesInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleGalleryImagesUpload}
                    disabled={uploadingGallery}
                  />

                  {/* Botón para subir imágenes de galería */}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => galleryImagesInputRef.current?.click()}
                    disabled={uploadingGallery}
                    className="w-full"
                  >
                    {uploadingGallery ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Subiendo...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Subir imágenes adicionales
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="horarios" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="precio">Precio por adulto (€)</Label>
                    <Input
                      id="precio"
                      name="precio"
                      type="number"
                      step="0.01"
                      placeholder="Ej: 25"
                      defaultValue={excursion?.precio}
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="precioAnterior">Precio anterior (opcional)</Label>
                    <Input
                      id="precioAnterior"
                      name="precioAnterior"
                      type="number"
                      step="0.01"
                      placeholder="Ej: 30"
                      defaultValue={excursion?.precioAnterior}
                    />
                  </div>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="horarios">Horarios disponibles (uno por línea)</Label>
                  <Textarea
                    id="horarios"
                    name="horarios"
                    placeholder="Ej: 10:00&#10;12:00&#10;16:00"
                    className="min-h-24"
                    defaultValue={excursion?.horarios?.join("\n")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/dashboard/excursiones")}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {excursion ? "Actualizando..." : "Creando..."}
            </>
          ) : excursion ? (
            "Actualizar Excursión"
          ) : (
            "Crear Excursión"
          )}
        </Button>
      </div>
    </form>
  )
}
