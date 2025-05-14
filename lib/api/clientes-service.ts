/**
 * Servicio para gestionar los clientes
 */

import { apiClient } from "./client"
import type { Cliente } from "@/contexts/cliente-context"

// Endpoints
const ENDPOINTS = {
  BASE: "/clientes",
  ESTADISTICAS: "/clientes/estadisticas",
}

export const clientesService = {
  /**
   * Obtiene todos los clientes
   */
  async getAll(params?: { estado?: string; vip?: boolean }) {
    const queryParams = new URLSearchParams()

    if (params?.estado) {
      queryParams.append("estado", params.estado)
    }

    if (params?.vip !== undefined) {
      queryParams.append("vip", params.vip.toString())
    }

    const query = queryParams.toString() ? `?${queryParams.toString()}` : ""
    return apiClient.get<Cliente[]>(`${ENDPOINTS.BASE}${query}`)
  },

  /**
   * Obtiene un cliente por su ID
   */
  async getById(id: string) {
    return apiClient.get<Cliente>(`${ENDPOINTS.BASE}/${id}`)
  },

  /**
   * Crea un nuevo cliente
   */
  async create(cliente: Omit<Cliente, "id">) {
    return apiClient.post<Cliente>(ENDPOINTS.BASE, cliente)
  },

  /**
   * Actualiza un cliente existente
   */
  async update(id: string, cliente: Partial<Cliente>) {
    return apiClient.put<Cliente>(`${ENDPOINTS.BASE}/${id}`, cliente)
  },

  /**
   * Elimina un cliente
   */
  async delete(id: string) {
    return apiClient.delete<{ success: boolean }>(`${ENDPOINTS.BASE}/${id}`)
  },

  /**
   * Obtiene estadísticas de clientes
   */
  async getEstadisticas() {
    return apiClient.get<{
      total: number
      activos: number
      inactivos: number
      nuevos: number
      vip: number
    }>(ENDPOINTS.ESTADISTICAS)
  },
}
