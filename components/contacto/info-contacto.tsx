import { Mail, MapPin, Phone, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function InfoContacto() {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Información de contacto</CardTitle>
        <CardDescription>Encuentra la mejor manera de comunicarte con nosotros.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-medium flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            Dirección
          </h3>
          <p className="text-sm pl-6">
            Calle Gran Vía, 28
            <br />
            28013 Madrid, España
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium flex items-center">
            <Phone className="h-4 w-4 mr-2 text-primary" />
            Teléfono
          </h3>
          <div className="text-sm pl-6 space-y-1">
            <p>
              Reservas:{" "}
              <a href="tel:+34911234567" className="hover:underline">
                +34 91 123 45 67
              </a>
            </p>
            <p>
              Atención al cliente:{" "}
              <a href="tel:+34911234568" className="hover:underline">
                +34 91 123 45 68
              </a>
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium flex items-center">
            <Mail className="h-4 w-4 mr-2 text-primary" />
            Email
          </h3>
          <div className="text-sm pl-6 space-y-1">
            <p>
              Información:{" "}
              <a href="mailto:info@tenerifeparadisetours.com" className="hover:underline">
                info@tenerifeparadisetours.com
              </a>
            </p>
            <p>
              Reservas:{" "}
              <a href="mailto:reservas@tenerifeparadisetours.com" className="hover:underline">
                reservas@tenerifeparadisetours.com
              </a>
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium flex items-center">
            <Clock className="h-4 w-4 mr-2 text-primary" />
            Horario de atención
          </h3>
          <div className="text-sm pl-6 space-y-1">
            <p>Lunes a Viernes: 9:00 - 20:00</p>
            <p>Sábados: 10:00 - 14:00</p>
            <p>Domingos: Cerrado</p>
          </div>
        </div>

        <div className="pt-2">
          <h3 className="font-medium mb-3">Síguenos en redes sociales</h3>
          <div className="flex space-x-4">
            <Button variant="outline" size="icon" asChild>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
