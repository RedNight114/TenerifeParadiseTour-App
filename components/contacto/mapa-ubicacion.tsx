import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation } from "lucide-react"

export default function MapaUbicacion() {
  return (
    <div className="rounded-lg overflow-hidden border border-border shadow-sm">
      <div className="relative w-full h-0" style={{ paddingBottom: "56.25%" }}>
        <div className="absolute inset-0 bg-muted">
          <Image
            src="/madrid-city-map.png"
            alt="Mapa de ubicación de nuestra oficina en Madrid"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-primary text-primary-foreground rounded-full p-2 shadow-lg animate-pulse">
              <MapPin className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-card">
        <h3 className="font-medium mb-1">Oficina central</h3>
        <p className="text-sm text-muted-foreground">Calle Gran Vía, 28, 28013 Madrid, España</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button size="sm" variant="outline" asChild>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
              <MapPin className="mr-1 h-4 w-4" /> Ver en Google Maps
            </a>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <a href="#">
              <Navigation className="mr-1 h-4 w-4" /> Cómo llegar
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
