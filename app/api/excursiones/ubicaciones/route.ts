import { NextResponse } from "next/server"
import { excursiones } from "@/data/excursiones"

// GET /api/excursiones/ubicaciones
export async function GET() {
  try {
    const ubicaciones = [...new Set(excursiones.map((e) => e.ubicacion).filter(Boolean))]
    return NextResponse.json(ubicaciones)
  } catch (error) {
    console.error("Error al obtener ubicaciones:", error)
    return NextResponse.json({ message: "Error al obtener las ubicaciones" }, { status: 500 })
  }
}
