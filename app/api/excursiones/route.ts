import { NextResponse } from "next/server"
import { excursiones } from "@/data/excursiones"
import type { Excursion } from "@/types/excursion"

// GET /api/excursiones
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoria = searchParams.get("categoria")
    const ubicacion = searchParams.get("ubicacion")

    let filteredExcursiones = [...excursiones]

    if (categoria) {
      filteredExcursiones = filteredExcursiones.filter((e) => e.categoria === categoria)
    }

    if (ubicacion) {
      filteredExcursiones = filteredExcursiones.filter((e) => e.ubicacion === ubicacion)
    }

    return NextResponse.json(filteredExcursiones)
  } catch (error) {
    console.error("Error al obtener excursiones:", error)
    return NextResponse.json({ message: "Error al obtener las excursiones" }, { status: 500 })
  }
}

// POST /api/excursiones
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validar datos requeridos
    if (!body.nombre || body.precio === undefined || !body.ubicacion || !body.duracion) {
      return NextResponse.json(
        {
          success: false,
          error: "Faltan campos requeridos: nombre, precio, ubicación y duración son obligatorios",
        },
        { status: 400 },
      )
    }

    // Generar ID único basado en el nombre y timestamp
    const id = `excursion-${body.nombre.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`

    const nuevaExcursion: Excursion = {
      id,
      nombre: body.nombre,
      descripcionCorta: body.descripcionCorta || "",
      descripcion: body.descripcion || "",
      precio: Number.parseFloat(body.precio),
      precioAnterior: body.precioAnterior ? Number.parseFloat(body.precioAnterior) : undefined,
      ubicacion: body.ubicacion,
      duracion: body.duracion,
      grupoMaximo: Number.parseInt(body.grupoMaximo) || 10,
      destacado: body.destacado === true,
      categoria: body.categoria || "General",
      estado: body.estado || "activa",
      imagen: body.imagen || `/placeholder.svg?height=600&width=800&text=${encodeURIComponent(body.nombre)}`,
      imagenes: body.imagenes || [],
      incluye: Array.isArray(body.incluye) ? body.incluye : [],
      noIncluye: Array.isArray(body.noIncluye) ? body.noIncluye : [],
      horarios: Array.isArray(body.horarios) ? body.horarios : [],
      puntoEncuentro: body.puntoEncuentro || "",
    }

    // En una aplicación real, aquí guardaríamos en la base de datos
    // Para este ejemplo, simulamos una respuesta exitosa

    return NextResponse.json(
      {
        success: true,
        data: nuevaExcursion,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error al crear excursión:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error al crear la excursión",
      },
      { status: 500 },
    )
  }
}
