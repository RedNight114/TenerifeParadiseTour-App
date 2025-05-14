import { NextResponse } from "next/server"
import { excursiones } from "@/data/excursiones"

// GET /api/excursiones/[id]
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const excursion = excursiones.find((e) => e.id === id)

    if (!excursion) {
      return NextResponse.json({ message: "Excursión no encontrada" }, { status: 404 })
    }

    return NextResponse.json(excursion)
  } catch (error) {
    console.error(`Error al obtener excursión ${params.id}:`, error)
    return NextResponse.json({ message: "Error al obtener la excursión" }, { status: 500 })
  }
}

// PUT /api/excursiones/[id]
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const excursion = excursiones.find((e) => e.id === id)

    if (!excursion) {
      return NextResponse.json({ message: "Excursión no encontrada" }, { status: 404 })
    }

    const body = await request.json()

    // En una aplicación real, aquí actualizaríamos en la base de datos
    // Para este ejemplo, simulamos una respuesta exitosa
    const excursionActualizada = {
      ...excursion,
      ...body,
      id, // Aseguramos que el ID no cambie
    }

    return NextResponse.json(excursionActualizada)
  } catch (error) {
    console.error(`Error al actualizar excursión ${params.id}:`, error)
    return NextResponse.json({ message: "Error al actualizar la excursión" }, { status: 500 })
  }
}

// DELETE /api/excursiones/[id]
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const excursion = excursiones.find((e) => e.id === id)

    if (!excursion) {
      return NextResponse.json({ message: "Excursión no encontrada" }, { status: 404 })
    }

    // En una aplicación real, aquí eliminaríamos de la base de datos
    // Para este ejemplo, simulamos una respuesta exitosa

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error al eliminar excursión ${params.id}:`, error)
    return NextResponse.json({ message: "Error al eliminar la excursión" }, { status: 500 })
  }
}
