import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Excursion } from "@/types/excursion"

interface ExcursionesRelacionadasProps {
  excursiones: Excursion[]
}

export default function ExcursionesRelacionadas({ excursiones }: ExcursionesRelacionadasProps) {
  if (excursiones.length === 0) return null

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Excursiones relacionadas</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {excursiones.map((excursion) => (
          <Card key={excursion.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={
                  excursion.imagen ||
                  `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(excursion.nombre)}`
                }
                alt={excursion.nombre}
                fill
                className="object-cover"
              />
            </div>

            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2">{excursion.nombre}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{excursion.descripcionCorta}</p>
              <p className="font-bold">{excursion.precio} €</p>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button asChild className="w-full">
                <Link href={`/excursiones/${excursion.id}`}>Ver detalles</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
