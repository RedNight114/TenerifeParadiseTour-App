import { NextResponse } from "next/server"
import { excursiones } from "@/data/excursiones"

// GET /api/excursiones/destacadas
export async function GET() {
  try {
    const excursionesDestacadas = excursiones.filter((e) => e.destacado)
    return NextResponse.json(excursionesDestacadas)
  } catch (error) {
    console.error("Error al obtener excursiones destacadas:", error)
    return NextResponse.json({ message: "Error al obtener las excursiones destacadas" }, { status: 500 })
  }
}
