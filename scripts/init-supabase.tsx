"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getSupabaseClient } from "@/lib/supabase-config"
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react"

export default function InitSupabaseScript() {
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<Array<{ step: string; success: boolean; message: string }>>([])
  const supabase = getSupabaseClient()

  const runInitialization = async () => {
    setIsRunning(true)
    setResults([])

    try {
      // 1. Verificar conexión
      try {
        const { error } = await supabase.from("profiles").select("count", { count: "exact", head: true })
        if (error) throw error
        addResult("Verificación de conexión", true, "Conexión a Supabase establecida correctamente")
      } catch (error: any) {
        addResult("Verificación de conexión", false, `Error: ${error.message}`)
        throw new Error("No se pudo establecer conexión con Supabase")
      }

      // 2. Crear bucket para excursiones si no existe
      try {
        const { data: buckets } = await supabase.storage.listBuckets()
        const excursionesBucket = buckets?.find((b) => b.name === "excursiones")

        if (!excursionesBucket) {
          const { error } = await supabase.storage.createBucket("excursiones", {
            public: true,
            fileSizeLimit: 10485760, // 10MB
          })

          if (error) throw error
          addResult("Bucket de excursiones", true, "Bucket 'excursiones' creado correctamente")
        } else {
          addResult("Bucket de excursiones", true, "Bucket 'excursiones' ya existe")
        }
      } catch (error: any) {
        addResult("Bucket de excursiones", false, `Error: ${error.message}`)
      }

      // 3. Crear bucket para perfiles si no existe
      try {
        const { data: buckets } = await supabase.storage.listBuckets()
        const perfilesBucket = buckets?.find((b) => b.name === "perfiles")

        if (!perfilesBucket) {
          const { error } = await supabase.storage.createBucket("perfiles", {
            public: true,
            fileSizeLimit: 5242880, // 5MB
          })

          if (error) throw error
          addResult("Bucket de perfiles", true, "Bucket 'perfiles' creado correctamente")
        } else {
          addResult("Bucket de perfiles", true, "Bucket 'perfiles' ya existe")
        }
      } catch (error: any) {
        addResult("Bucket de perfiles", false, `Error: ${error.message}`)
      }

      // 4. Crear bucket para galería si no existe
      try {
        const { data: buckets } = await supabase.storage.listBuckets()
        const galeriaBucket = buckets?.find((b) => b.name === "galeria")

        if (!galeriaBucket) {
          const { error } = await supabase.storage.createBucket("galeria", {
            public: true,
            fileSizeLimit: 10485760, // 10MB
          })

          if (error) throw error
          addResult("Bucket de galería", true, "Bucket 'galeria' creado correctamente")
        } else {
          addResult("Bucket de galería", true, "Bucket 'galeria' ya existe")
        }
      } catch (error: any) {
        addResult("Bucket de galería", false, `Error: ${error.message}`)
      }

      // 5. Verificar tabla de perfiles
      try {
        const { error } = await supabase.from("profiles").select("count", { count: "exact", head: true })

        if (error) {
          if (error.code === "42P01") {
            // tabla no existe
            // Crear tabla de perfiles
            await supabase.rpc("create_profiles_table")
            addResult("Tabla de perfiles", true, "Tabla 'profiles' creada correctamente")
          } else {
            throw error
          }
        } else {
          addResult("Tabla de perfiles", true, "Tabla 'profiles' ya existe")
        }
      } catch (error: any) {
        addResult("Tabla de perfiles", false, `Error: ${error.message}`)
      }
    } catch (error: any) {
      addResult("Inicialización", false, `Error general: ${error.message}`)
    } finally {
      setIsRunning(false)
    }
  }

  const addResult = (step: string, success: boolean, message: string) => {
    setResults((prev) => [...prev, { step, success, message }])
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Button onClick={runInitialization} disabled={isRunning} className="flex items-center gap-2">
          {isRunning && <Loader2 className="h-4 w-4 animate-spin" />}
          {isRunning ? "Inicializando..." : "Inicializar Supabase"}
        </Button>
        <p className="text-xs text-gray-500">
          Este script verificará la conexión a Supabase y creará los buckets y tablas necesarios.
        </p>
      </div>

      {results.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium">Resultados:</h3>
          {results.map((result, index) => (
            <Alert key={index} className={result.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              <div className="flex items-center gap-2">
                {result.success ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                )}
                <AlertTitle>{result.step}</AlertTitle>
              </div>
              <AlertDescription className={result.success ? "text-green-700" : "text-red-700"}>
                {result.message}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}
    </div>
  )
}
