import { NextResponse } from "next/server"
import { excursiones } from "@/data/excursiones"

// GET /api/excursiones/categorias
export async function GET() {
  try {
    const categorias = [...new Set(excursiones.map((e) => e.categoria).filter(Boolean))]
    return NextResponse.json(categorias)
  } catch (error) {
    console.error("Error al obtener categorías:", error)
    return NextResponse.json({ message: "Error al obtener las categorías" }, { status: 500 })
  }
}
