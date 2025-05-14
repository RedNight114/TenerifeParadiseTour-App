/**
 * Servicio para gestionar las excursiones
 */

import { apiClient } from "./client"
import type { Excursion } from "@/types/excursion"

// Endpoints
const ENDPOINTS = {
  BASE: "/excursiones",
  DESTACADAS: "/excursiones/destacadas",
  CATEGORIAS: "/excursiones/categorias",
  UBICACIONES: "/excursiones/ubicaciones",
}

export const excursionesService = {
  /**
   * Obtiene todas las excursiones
   */
  async getAll(params?: { categoria?: string; ubicacion?: string }) {
    const queryParams = new URLSearchParams()

    if (params?.categoria) {
      queryParams.append("categoria", params.categoria)
    }

    if (params?.ubicacion) {
      queryParams.append("ubicacion", params.ubicacion)
    }

    const query = queryParams.toString() ? `?${queryParams.toString()}` : ""
    return apiClient.get<Excursion[]>(`${ENDPOINTS.BASE}${query}`)
  },

  /**
   * Obtiene una excursión por su ID
   */
  async getById(id: string) {
    return apiClient.get<Excursion>(`${ENDPOINTS.BASE}/${id}`)
  },

  /**
   * Obtiene las excursiones destacadas
   */
  async getDestacadas() {
    return apiClient.get<Excursion[]>(ENDPOINTS.DESTACADAS)
  },

  /**
   * Crea una nueva excursión
   */
  async create(excursion: Omit<Excursion, "id">) {
    // Asegurarse de que todos los campos requeridos estén presentes
    const excursionCompleta = {
      nombre: excursion.nombre || "Nueva Excursión",
      descripcionCorta: excursion.descripcionCorta || "",
      descripcion: excursion.descripcion || "",
      precio: excursion.precio || 0,
      ubicacion: excursion.ubicacion || "",
      duracion: excursion.duracion || "",
      grupoMaximo: excursion.grupoMaximo || 10,
      destacado: excursion.destacado || false,
      categoria: excursion.categoria || "General",
      estado: excursion.estado || "activa",
      ...excursion,
    }

    return apiClient.post<Excursion>(ENDPOINTS.BASE, excursionCompleta)
  },

  /**
   * Actualiza una excursión existente
   */
  async update(id: string, excursion: Partial<Excursion>) {
    // Filtrar campos undefined para no sobrescribir con valores vacíos
    const excursionFiltrada = Object.fromEntries(Object.entries(excursion).filter(([_, value]) => value !== undefined))

    return apiClient.put<Excursion>(`${ENDPOINTS.BASE}/${id}`, excursionFiltrada)
  },

  /**
   * Elimina una excursión
   */
  async delete(id: string) {
    return apiClient.delete<{ success: boolean }>(`${ENDPOINTS.BASE}/${id}`)
  },

  /**
   * Destaca o quita el destacado de una excursión
   */
  async toggleDestacado(id: string, destacado: boolean) {
    return apiClient.put<Excursion>(`${ENDPOINTS.BASE}/${id}/destacado`, { destacado })
  },

  /**
   * Obtiene todas las categorías disponibles
   */
  async getCategorias() {
    return apiClient.get<string[]>(ENDPOINTS.CATEGORIAS)
  },

  /**
   * Obtiene todas las ubicaciones disponibles
   */
  async getUbicaciones() {
    return apiClient.get<string[]>(ENDPOINTS.UBICACIONES)
  },
}
