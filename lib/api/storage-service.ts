/**
 * Servicio para gestionar el almacenamiento de archivos en Supabase Storage
 */

import { getSupabaseClient, getPublicUrl } from "@/lib/supabase-config"

// Obtener la instancia del cliente de Supabase
const supabase = getSupabaseClient()

// Nombre del bucket donde se almacenarán las imágenes de excursiones
const EXCURSIONES_BUCKET = "excursiones"

export const storageService = {
  /**
   * Sube una imagen al bucket de excursiones
   * @param file Archivo a subir
   * @param path Ruta dentro del bucket (opcional)
   * @returns URL pública de la imagen
   */
  async uploadExcursionImage(file: File, path?: string): Promise<{ url: string; error: string | null }> {
    try {
      // Generar un nombre de archivo único basado en timestamp y nombre original
      const timestamp = new Date().getTime()
      const fileExtension = file.name.split(".").pop()
      const fileName = path ? `${path}/${timestamp}-${file.name}` : `${timestamp}-${file.name}`

      // Subir archivo a Supabase Storage
      const { data, error } = await supabase.storage.from(EXCURSIONES_BUCKET).upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })

      if (error) {
        console.error("Error al subir imagen:", error)
        return { url: "", error: error.message }
      }

      // Obtener URL pública del archivo
      const publicURL = getPublicUrl(EXCURSIONES_BUCKET, data!.path)

      return { url: publicURL, error: null }
    } catch (error) {
      console.error("Error inesperado al subir imagen:", error)
      return {
        url: "",
        error: error instanceof Error ? error.message : "Error desconocido al subir la imagen",
      }
    }
  },

  /**
   * Sube múltiples imágenes al bucket de excursiones
   * @param files Archivos a subir
   * @param path Ruta dentro del bucket (opcional)
   * @returns Array de URLs públicas de las imágenes
   */
  async uploadMultipleImages(files: File[], path?: string): Promise<{ urls: string[]; errors: string[] }> {
    const results = await Promise.all(files.map((file) => this.uploadExcursionImage(file, path)))

    const urls = results.filter((r) => r.url).map((r) => r.url)
    const errors = results.filter((r) => r.error).map((r) => r.error as string)

    return { urls, errors }
  },

  /**
   * Elimina una imagen del bucket de excursiones
   * @param url URL pública de la imagen a eliminar
   */
  async deleteImage(url: string): Promise<{ success: boolean; error: string | null }> {
    try {
      // Extraer el path del archivo de la URL
      const urlObj = new URL(url)
      const pathParts = urlObj.pathname.split("/")
      const bucketIndex = pathParts.findIndex((part) => part === EXCURSIONES_BUCKET)

      if (bucketIndex === -1 || bucketIndex === pathParts.length - 1) {
        return { success: false, error: "URL de imagen inválida" }
      }

      const filePath = pathParts.slice(bucketIndex + 1).join("/")

      // Eliminar archivo de Supabase Storage
      const { error } = await supabase.storage.from(EXCURSIONES_BUCKET).remove([filePath])

      if (error) {
        console.error("Error al eliminar imagen:", error)
        return { success: false, error: error.message }
      }

      return { success: true, error: null }
    } catch (error) {
      console.error("Error inesperado al eliminar imagen:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido al eliminar la imagen",
      }
    }
  },
}
