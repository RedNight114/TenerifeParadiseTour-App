export interface ImagenGaleria {
  id: string
  url: string
  titulo: string
  descripcion?: string
  categoria?: string
  destacada: boolean
  fechaSubida: string
  orden: number
  activa: boolean
  creditos?: string
  tags?: string[]
}

export interface FiltrosGaleria {
  categoria?: string
  destacadas?: boolean
  busqueda?: string
}
