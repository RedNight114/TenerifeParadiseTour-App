/**
 * Cliente API centralizado para todas las peticiones
 */

import { toast } from "@/components/ui/use-toast"

// Tipos de respuesta de la API
export interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
  success: boolean
}

// Opciones para las peticiones
export interface ApiOptions {
  headers?: Record<string, string>
  cache?: RequestCache
  revalidate?: number
  tags?: string[]
}

// Configuración por defecto
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
}

// Función para construir la URL completa
const buildUrl = (endpoint: string): string => {
  const url = endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  return `${API_BASE_URL}${url}`
}

// Función para manejar errores
const handleError = (error: unknown, endpoint: string): ApiResponse<never> => {
  console.error(`Error en petición a ${endpoint}:`, error)

  const errorMessage = error instanceof Error ? error.message : "Error desconocido en la petición"

  toast({
    title: "Error de conexión",
    description: "No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.",
    variant: "destructive",
  })

  return {
    error: errorMessage,
    status: 500,
    success: false,
  }
}

// Cliente API con métodos para cada tipo de petición
export const apiClient = {
  /**
   * Realiza una petición GET
   */
  async get<T>(endpoint: string, options?: ApiOptions): Promise<ApiResponse<T>> {
    try {
      const url = buildUrl(endpoint)
      const response = await fetch(url, {
        method: "GET",
        headers: {
          ...DEFAULT_HEADERS,
          ...(options?.headers || {}),
        },
        cache: options?.cache,
        next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
      })

      const data = await response.json()

      return {
        data,
        status: response.status,
        success: response.ok,
        error: !response.ok ? data.message || "Error en la petición" : undefined,
      }
    } catch (error) {
      return handleError(error, endpoint)
    }
  },

  /**
   * Realiza una petición POST
   */
  async post<T, D = unknown>(endpoint: string, body: D, options?: ApiOptions): Promise<ApiResponse<T>> {
    try {
      const url = buildUrl(endpoint)
      const response = await fetch(url, {
        method: "POST",
        headers: {
          ...DEFAULT_HEADERS,
          ...(options?.headers || {}),
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      return {
        data,
        status: response.status,
        success: response.ok,
        error: !response.ok ? data.message || "Error en la petición" : undefined,
      }
    } catch (error) {
      return handleError(error, endpoint)
    }
  },

  /**
   * Realiza una petición PUT
   */
  async put<T, D = unknown>(endpoint: string, body: D, options?: ApiOptions): Promise<ApiResponse<T>> {
    try {
      const url = buildUrl(endpoint)
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          ...DEFAULT_HEADERS,
          ...(options?.headers || {}),
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      return {
        data,
        status: response.status,
        success: response.ok,
        error: !response.ok ? data.message || "Error en la petición" : undefined,
      }
    } catch (error) {
      return handleError(error, endpoint)
    }
  },

  /**
   * Realiza una petición DELETE
   */
  async delete<T>(endpoint: string, options?: ApiOptions): Promise<ApiResponse<T>> {
    try {
      const url = buildUrl(endpoint)
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          ...DEFAULT_HEADERS,
          ...(options?.headers || {}),
        },
      })

      const data = await response.json()

      return {
        data,
        status: response.status,
        success: response.ok,
        error: !response.ok ? data.message || "Error en la petición" : undefined,
      }
    } catch (error) {
      return handleError(error, endpoint)
    }
  },
}
