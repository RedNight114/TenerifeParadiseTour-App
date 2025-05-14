// Mejorar la gestión de errores y la inicialización del cliente
import { createClient } from "@supabase/supabase-js"
import type { SupabaseClient } from "@supabase/supabase-js"

// Variables para almacenar la instancia singleton
let supabaseInstance: SupabaseClient | null = null
let isInitializing = false
let initPromise: Promise<SupabaseClient> | null = null

// Función para obtener la instancia del cliente de Supabase
export function getSupabaseClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Verificar que las credenciales estén configuradas
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("ERROR DE CONFIGURACIÓN: Supabase URL o Anon Key no configurados")
    throw new Error("Supabase URL y Anon Key son obligatorios. Verifica tus variables de entorno.")
  }

  // Devolver instancia existente si ya está inicializada
  if (supabaseInstance) return supabaseInstance

  // Si ya está en proceso de inicialización, devolver la promesa
  if (isInitializing && initPromise) return initPromise as unknown as SupabaseClient

  // Inicializar cliente con manejo de errores
  try {
    isInitializing = true

    // Crear nueva instancia
    initPromise = new Promise((resolve) => {
      const client = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      })
      supabaseInstance = client
      isInitializing = false
      resolve(client)
    })

    return initPromise as unknown as SupabaseClient
  } catch (error) {
    isInitializing = false
    console.error("Error al inicializar Supabase:", error)
    throw error
  }
}

// Exportar la instancia del cliente para compatibilidad con código existente
export const supabase = getSupabaseClient()

// Configuración de buckets
export const STORAGE_BUCKETS = {
  EXCURSIONES: "excursiones",
  PERFILES: "perfiles",
  GENERAL: "general",
  GALERIA: "galeria",
}

// Función para obtener la URL pública de un archivo
export function getPublicUrl(bucket: string, path: string): string {
  try {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    return data.publicUrl
  } catch (error) {
    console.error(`Error al obtener URL pública para ${bucket}/${path}:`, error)
    return ""
  }
}

// Verificar conexión con Supabase
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.from("profiles").select("count", { count: "exact", head: true })
    return !error
  } catch (error) {
    console.error("Error al verificar conexión con Supabase:", error)
    return false
  }
}
