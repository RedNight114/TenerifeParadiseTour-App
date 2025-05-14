import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center">
        <div className="container max-w-lg mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-6">TravelExcursiones</h1>
          <p className="text-xl mb-8">Bienvenido al sistema de administración de excursiones.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/dashboard">Ir al Dashboard</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
