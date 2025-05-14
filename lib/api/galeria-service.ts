import { v4 as uuidv4 } from "uuid"
import type { ImagenGaleria, FiltrosGaleria } from "@/types/galeria"
import { getSupabaseClient } from "@/lib/supabase-config"

// Obtener la instancia del cliente de Supabase
const supabase = getSupabaseClient()

// Inicializar cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Nombre del bucket donde se almacenarán las imágenes de la galería
const GALERIA_BUCKET = "galeria"

// Datos de ejemplo para desarrollo (se reemplazarán con datos reales de Supabase)
const imagenesMuestra: ImagenGaleria[] = [
  {
    id: "1",
    url: "/tenerife-teide-landscape.png",
    titulo: "Amanecer en el Teide",
    descripcion: "Impresionante amanecer desde la cima del Teide",
    categoria: "Paisajes",
    destacada: true,
    fechaSubida: "2023-05-15",
    orden: 1,
    activa: true,
    tags: ["teide", "amanecer", "montaña"],
  },
  {
    id: "2",
    url: "/tenerife-excursion.png",
    titulo: "Senderismo en Anaga",
    descripcion: "Ruta de senderismo por los bosques de Anaga",
    categoria: "Actividades",
    destacada: true,
    fechaSubida: "2023-06-20",
    orden: 2,
    activa: true,
    tags: ["senderismo", "anaga", "bosque"],
  },
  {
    id: "3",
    url: "/acantilados-los-gigantes-tenerife-paradise.jpg",
    titulo: "Acantilados de Los Gigantes",
    descripcion: "Majestuosos acantilados vistos desde el mar",
    categoria: "Paisajes",
    destacada: false,
    fechaSubida: "2023-07-10",
    orden: 3,
    activa: true,
    tags: ["acantilados", "mar", "barco"],
  },
  {
    id: "4",
    url: "/tenerife-landscape-panorama.png",
    titulo: "Panorámica de Tenerife",
    descripcion: "Vista panorámica de la isla desde las montañas",
    categoria: "Paisajes",
    destacada: true,
    fechaSubida: "2023-08-05",
    orden: 4,
    activa: true,
    tags: ["panorámica", "isla", "montañas"],
  },
  {
    id: "5",
    url: "/mountain-landscape-tourists.png",
    titulo: "Grupo de excursionistas",
    descripcion: "Grupo disfrutando de una excursión guiada",
    categoria: "Grupos",
    destacada: false,
    fechaSubida: "2023-09-12",
    orden: 5,
    activa: true,
    tags: ["grupo", "excursión", "guía"],
  },
]

export const galeriaService = {
  /**
   * Obtiene todas las imágenes de la galería
   */
  async getImagenes(filtros?: FiltrosGaleria): Promise<ImagenGaleria[]> {
    try {
      // En una implementación real, aquí se haría una consulta a Supabase
      // Por ahora, usamos los datos de muestra y aplicamos filtros
      let imagenes = [...imagenesMuestra]

      if (filtros) {
        if (filtros.categoria) {
          imagenes = imagenes.filter((img) => img.categoria === filtros.categoria)
        }

        if (filtros.destacadas) {
          imagenes = imagenes.filter((img) => img.destacada)
        }

        if (filtros.busqueda) {
          const busqueda = filtros.busqueda.toLowerCase()
          imagenes = imagenes.filter(
            (img) =>
              img.titulo.toLowerCase().includes(busqueda) ||
              img.descripcion?.toLowerCase().includes(busqueda) ||
              img.tags?.some((tag) => tag.toLowerCase().includes(busqueda)),
          )
        }
      }

      // Ordenar por el campo orden
      return imagenes.filter((img) => img.activa).sort((a, b) => a.orden - b.orden)
    } catch (error) {
      console.error("Error al obtener imágenes de la galería:", error)
      return []
    }
  },

  /**
   * Obtiene las imágenes destacadas de la galería
   */
  async getImagenesDestacadas(): Promise<ImagenGaleria[]> {
    return this.getImagenes({ destacadas: true })
  },

  /**
   * Obtiene las categorías disponibles en la galería
   */
  async getCategorias(): Promise<string[]> {
    try {
      // En una implementación real, aquí se haría una consulta a Supabase
      const categorias = new Set(imagenesMuestra.map((img) => img.categoria).filter(Boolean) as string[])
      return Array.from(categorias)
    } catch (error) {
      console.error("Error al obtener categorías de la galería:", error)
      return []
    }
  },

  /**
   * Sube una imagen a la galería
   */
  async subirImagen(file: File, metadata: Partial<ImagenGaleria>): Promise<ImagenGaleria | null> {
    try {
      // Generar un nombre de archivo único
      const timestamp = new Date().getTime()
      const fileExtension = file.name.split(".").pop()
      const fileName = `${timestamp}-${uuidv4()}.${fileExtension}`

      // Subir archivo a Supabase Storage
      const { data, error } = await supabase.storage.from(GALERIA_BUCKET).upload(`imagenes/${fileName}`, file, {
        cacheControl: "3600",
        upsert: false,
      })

      if (error) {
        console.error("Error al subir imagen:", error)
        return null
      }

      // Obtener URL pública del archivo
      const { data: urlData } = supabase.storage.from(GALERIA_BUCKET).getPublicUrl(data.path)

      // Crear registro de imagen
      const nuevaImagen: ImagenGaleria = {
        id: uuidv4(),
        url: urlData.publicUrl,
        titulo: metadata.titulo || file.name,
        descripcion: metadata.descripcion,
        categoria: metadata.categoria,
        destacada: metadata.destacada || false,
        fechaSubida: new Date().toISOString().split("T")[0],
        orden: imagenesMuestra.length + 1,
        activa: true,
        creditos: metadata.creditos,
        tags: metadata.tags,
      }

      // En una implementación real, aquí se guardaría el registro en Supabase
      // Por ahora, simulamos añadiendo a nuestro array de muestra
      imagenesMuestra.push(nuevaImagen)

      return nuevaImagen
    } catch (error) {
      console.error("Error inesperado al subir imagen:", error)
      return null
    }
  },

  /**
   * Actualiza los metadatos de una imagen
   */
  async actualizarImagen(id: string, datos: Partial<ImagenGaleria>): Promise<boolean> {
    try {
      // En una implementación real, aquí se actualizaría el registro en Supabase
      const index = imagenesMuestra.findIndex((img) => img.id === id)
      if (index === -1) return false

      imagenesMuestra[index] = { ...imagenesMuestra[index], ...datos }
      return true
    } catch (error) {
      console.error("Error al actualizar imagen:", error)
      return false
    }
  },

  /**
   * Elimina una imagen de la galería
   */
  async eliminarImagen(id: string): Promise<boolean> {
    try {
      // En una implementación real, aquí se eliminaría el archivo de Supabase Storage
      // y se eliminaría el registro de la base de datos

      const index = imagenesMuestra.findIndex((img) => img.id === id)
      if (index === -1) return false

      // Simulamos la eliminación
      imagenesMuestra.splice(index, 1)
      return true
    } catch (error) {
      console.error("Error al eliminar imagen:", error)
      return false
    }
  },

  /**
   * Reordena las imágenes de la galería
   */
  async reordenarImagenes(idsOrdenados: string[]): Promise<boolean> {
    try {
      // En una implementación real, aquí se actualizarían los órdenes en Supabase

      // Actualizamos el orden en nuestro array de muestra
      idsOrdenados.forEach((id, index) => {
        const imagen = imagenesMuestra.find((img) => img.id === id)
        if (imagen) {
          imagen.orden = index + 1
        }
      })

      return true
    } catch (error) {
      console.error("Error al reordenar imágenes:", error)
      return false
    }
  },
}
