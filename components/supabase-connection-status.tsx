"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { checkSupabaseConnection } from "@/lib/supabase-config"
import { Loader2, CheckCircle, AlertTriangle, RefreshCw } from "lucide-react"

export function SupabaseConnectionStatus() {
  const [status, setStatus] = useState<"loading" | "connected" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const checkConnection = async () => {
    setStatus("loading")
    setErrorMessage(null)

    try {
      const isConnected = await checkSupabaseConnection()

      if (isConnected) {
        setStatus("connected")
      } else {
        setStatus("error")
        setErrorMessage("No se pudo establecer conexión con Supabase")
      }
    } catch (error: any) {
      setStatus("error")
      setErrorMessage(error?.message || "Error al verificar la conexión con Supabase")
    }
  }

  useEffect(() => {
    checkConnection()
  }, [])

  return (
    <Alert
      className={`
      mb-4 border
      ${status === "connected" ? "border-green-200 bg-green-50" : ""}
      ${status === "error" ? "border-red-200 bg-red-50" : ""}
      ${status === "loading" ? "border-gray-200 bg-gray-50" : ""}
    `}
    >
      <div className="flex items-center gap-2">
        {status === "loading" && <Loader2 className="h-5 w-5 animate-spin text-gray-500" />}
        {status === "connected" && <CheckCircle className="h-5 w-5 text-green-500" />}
        {status === "error" && <AlertTriangle className="h-5 w-5 text-red-500" />}

        <AlertTitle>
          {status === "loading" && "Verificando conexión con Supabase..."}
          {status === "connected" && "Conexión establecida con Supabase"}
          {status === "error" && "Error de conexión con Supabase"}
        </AlertTitle>
      </div>

      {status === "error" && (
        <AlertDescription className="mt-2">
          <p className="mb-2 text-red-700">
            {errorMessage || "No se pudo conectar con Supabase. Verifica tu configuración."}
          </p>
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-1 border-red-300 bg-white text-red-700 hover:bg-red-50"
            onClick={checkConnection}
          >
            <RefreshCw className="h-4 w-4" />
            <span>Reintentar conexión</span>
          </Button>
        </AlertDescription>
      )}

      {status === "connected" && (
        <AlertDescription className="mt-1 text-green-700">
          Tu aplicación está correctamente conectada a Supabase.
        </AlertDescription>
      )}
    </Alert>
  )
}
