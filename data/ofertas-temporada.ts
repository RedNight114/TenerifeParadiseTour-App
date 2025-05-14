export interface OfertaTemporada {
  id: string
  titulo: string
  descripcion: string
  imagen: string
  precioOriginal: number
  precioOferta: number
  porcentajeDescuento: number
  fechaFin: string // ISO date string
  destacada: boolean
  etiquetas: string[]
  urlExcursion: string
  limitado?: boolean
  plazasRestantes?: number
}

export const ofertasTemporada: OfertaTemporada[] = [
  {
    id: "oferta-verano-teide",
    titulo: "Excursión al Teide - Oferta de Verano",
    descripcion: "Disfruta del amanecer en el Teide con un 25% de descuento. Incluye transporte, guía y desayuno.",
    imagen: "/placeholder.svg?height=600&width=800&text=Teide Amanecer",
    precioOriginal: 60,
    precioOferta: 45,
    porcentajeDescuento: 25,
    fechaFin: "2025-08-31T23:59:59",
    destacada: true,
    etiquetas: ["Verano", "Naturaleza", "Amanecer"],
    urlExcursion: "/excursiones/tour-ciudad-historica",
    limitado: true,
    plazasRestantes: 8,
  },
  {
    id: "oferta-pareja-masca",
    titulo: "Pack Romántico Masca y Acantilados",
    descripcion:
      "Excursión para parejas con cena romántica incluida y vistas al atardecer en los acantilados de Los Gigantes.",
    imagen: "/placeholder.svg?height=600&width=800&text=Masca Atardecer",
    precioOriginal: 120,
    precioOferta: 89,
    porcentajeDescuento: 26,
    fechaFin: "2025-07-15T23:59:59",
    destacada: true,
    etiquetas: ["Romántico", "Atardecer", "Cena"],
    urlExcursion: "/excursiones/excursion-montana",
  },
  {
    id: "oferta-familia-loro-parque",
    titulo: "Pack Familiar Loro Parque",
    descripcion: "Entrada familiar (2 adultos + 2 niños) con transporte incluido y acceso VIP sin colas.",
    imagen: "/placeholder.svg?height=600&width=800&text=Loro Parque",
    precioOriginal: 180,
    precioOferta: 135,
    porcentajeDescuento: 25,
    fechaFin: "2025-09-10T23:59:59",
    destacada: false,
    etiquetas: ["Familia", "Niños", "Parque"],
    urlExcursion: "/excursiones/tour-gastronomico",
  },
  {
    id: "oferta-flash-anaga",
    titulo: "¡OFERTA FLASH! Bosque de Anaga",
    descripcion: "Solo 48h - Ruta guiada por el bosque de Anaga con almuerzo tradicional canario incluido.",
    imagen: "/placeholder.svg?height=600&width=800&text=Bosque Anaga",
    precioOriginal: 50,
    precioOferta: 30,
    porcentajeDescuento: 40,
    fechaFin: "2025-06-20T23:59:59",
    destacada: true,
    etiquetas: ["Flash", "Senderismo", "Naturaleza"],
    urlExcursion: "/excursiones/paseo-bicicleta",
    limitado: true,
    plazasRestantes: 5,
  },
]
