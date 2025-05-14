/**
 * Servicio para gestionar las reservas
 */

import { apiClient } from "./client"
import type { Reserva } from "@/contexts/reserva-context"

// Endpoints
const ENDPOINTS = {
  BASE: "/reservas",
  POR_CLIENTE: "/reservas/cliente",
  POR_EXCURSION: "/reservas/excursion",
  ESTADISTICAS: "/reservas/estadisticas",
}

export const reservasService = {
  /**
   * Obtiene todas las reservas
   */
  async getAll(params?: { estado?: string; fechaInicio?: string; fechaFin?: string }) {
    const queryParams = new URLSearchParams()

    if (params?.estado) {
      queryParams.append("estado", params.estado)
    }

    if (params?.fechaInicio) {
      queryParams.append("fechaInicio", params.fechaInicio)
    }

    if (params?.fechaFin) {
      queryParams.append("fechaFin", params.fechaFin)
    }

    const query = queryParams.toString() ? `?${queryParams.toString()}` : ""
    return apiClient.get<Reserva[]>(`${ENDPOINTS.BASE}${query}`)
  },

  /**
   * Obtiene una reserva por su ID
   */
  async getById(id: string) {
    return apiClient.get<Reserva>(`${ENDPOINTS.BASE}/${id}`)
  },

  /**
   * Obtiene las reservas de un cliente
   */
  async getByCliente(clienteId: string) {
    return apiClient.get<Reserva[]>(`${ENDPOINTS.POR_CLIENTE}/${clienteId}`)
  },

  /**
   * Obtiene las reservas de una excursión
   */
  async getByExcursion(excursionId: string) {
    return apiClient.get<Reserva[]>(`${ENDPOINTS.POR_EXCURSION}/${excursionId}`)
  },

  /**
   * Crea una nueva reserva
   */
  async create(reserva: Omit<Reserva, "id">) {
    return apiClient.post<Reserva>(ENDPOINTS.BASE, reserva)
  },

  /**
   * Actualiza una reserva existente
   */
  async update(id: string, reserva: Partial<Reserva>) {
    return apiClient.put<Reserva>(`${ENDPOINTS.BASE}/${id}`, reserva)
  },

  /**
   * Cambia el estado de una reserva
   */
  async cambiarEstado(id: string, estado: Reserva["estado"]) {
    return apiClient.put<Reserva>(`${ENDPOINTS.BASE}/${id}/estado`, { estado })
  },

  /**
   * Elimina una reserva
   */
  async delete(id: string) {
    return apiClient.delete<{ success: boolean }>(`${ENDPOINTS.BASE}/${id}`)
  },

  /**
   * Obtiene estadísticas de reservas
   */
  async getEstadisticas(params?: { periodo?: "dia" | "semana" | "mes" | "año" }) {
    const queryParams = new URLSearchParams()

    if (params?.periodo) {
      queryParams.append("periodo", params.periodo)
    }

    const query = queryParams.toString() ? `?${queryParams.toString()}` : ""
    return apiClient.get<{
      total: number
      confirmadas: number
      pendientes: number
      canceladas: number
      ingresos: number
    }>(`${ENDPOINTS.ESTADISTICAS}${query}`)
  },
}
