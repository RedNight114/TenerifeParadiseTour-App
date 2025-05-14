export interface Excursion {
  id: string
  nombre: string
  descripcionCorta: string
  descripcion?: string
  precio: number
  precioAnterior?: number
  imagen?: string
  imagenes?: string[]
  ubicacion: string
  duracion: string
  incluye?: string[]
  noIncluye?: string[]
  puntoEncuentro?: string
  horarios?: string[]
  grupoMaximo: number
  destacado?: boolean
  categoria?: string
  estado?: "activa" | "inactiva"
}
