"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSupabaseAuth } from "@/hooks/use-supabase-auth"
import { SupabaseConnectionStatus } from "@/components/supabase-connection-status"
import { getSupabaseClient, STORAGE_BUCKETS } from "@/lib/supabase-config"
import { Loader2, Database, User, FileImage, ShieldCheck } from "lucide-react"

export default function SupabaseTestPage() {
  const { user, isAuthenticated } = useSupabaseAuth()
  const [isTestingStorage, setIsTestingStorage] = useState(false)
  const [isTestingDatabase, setIsTestingDatabase] = useState(false)
  const [isTestingAuth, setIsTestingAuth] = useState(false)
  const [storageResult, setStorageResult] = useState<{ success: boolean; message: string } | null>(null)
  const [databaseResult, setDatabaseResult] = useState<{ success: boolean; message: string } | null>(null)
  const [authResult, setAuthResult] = useState<{ success: boolean; message: string } | null>(null)

  const supabase = getSupabaseClient()

  const testStorage = async () => {
    setIsTestingStorage(true)
    setStorageResult(null)

    try {
      // Verificar que el bucket existe
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()

      if (bucketsError) {
        throw new Error(`Error al listar buckets: ${bucketsError.message}`)
      }

      // Verificar si existe el bucket EXCURSIONES
      const excursionesBucket = buckets.find((bucket) => bucket.name === STORAGE_BUCKETS.EXCURSIONES)

      if (!excursionesBucket) {
        throw new Error(`No se encontró el bucket ${STORAGE_BUCKETS.EXCURSIONES}`)
      }

      // Listar archivos
      const { data: files, error: filesError } = await supabase.storage.from(STORAGE_BUCKETS.EXCURSIONES).list()

      if (filesError) {
        throw new Error(`Error al listar archivos: ${filesError.message}`)
      }

      setStorageResult({
        success: true,
        message: `Conexión exitosa. Se encontraron ${files.length} archivos en el bucket ${STORAGE_BUCKETS.EXCURSIONES}.`,
      })
    } catch (error: any) {
      setStorageResult({
        success: false,
        message: error.message || "Error al probar el almacenamiento",
      })
    } finally {
      setIsTestingStorage(false)
    }
  }

  const testDatabase = async () => {
    setIsTestingDatabase(true)
    setDatabaseResult(null)

    try {
      // Intentar leer de la tabla profiles (debe existir para la autenticación)
      const { data, error, count } = await supabase.from("profiles").select("*", { count: "exact" }).limit(1)

      if (error) {
        throw new Error(`Error al consultar la base de datos: ${error.message}`)
      }

      setDatabaseResult({
        success: true,
        message: `Conexión exitosa. Se encontraron ${count} perfiles en la base de datos.`,
      })
    } catch (error: any) {
      setDatabaseResult({
        success: false,
        message: error.message || "Error al probar la base de datos",
      })
    } finally {
      setIsTestingDatabase(false)
    }
  }

  const testAuth = async () => {
    setIsTestingAuth(true)
    setAuthResult(null)

    try {
      const { data: session, error } = await supabase.auth.getSession()

      if (error) {
        throw new Error(`Error al obtener la sesión: ${error.message}`)
      }

      setAuthResult({
        success: true,
        message: session.session
          ? `Sesión activa para el usuario: ${session.session.user.email}`
          : "No hay sesión activa actualmente.",
      })
    } catch (error: any) {
      setAuthResult({
        success: false,
        message: error.message || "Error al probar la autenticación",
      })
    } finally {
      setIsTestingAuth(false)
    }
  }

  useEffect(() => {
    // Al cargar la página, probamos la autenticación
    testAuth()
  }, [])

  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-2xl font-bold">Test de conexión Supabase</h1>

      <SupabaseConnectionStatus />

      <Tabs defaultValue="overview" className="mt-4">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="auth">Autenticación</TabsTrigger>
          <TabsTrigger value="storage">Almacenamiento</TabsTrigger>
          <TabsTrigger value="database">Base de datos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información general</CardTitle>
              <CardDescription>Estado de la conexión con Supabase</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Card
                  className={`${authResult?.success ? "border-green-200" : authResult?.success === false ? "border-red-200" : "border-gray-200"}`}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <User className="h-5 w-5" />
                      <span>Autenticación</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isTestingAuth ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Verificando...</span>
                      </div>
                    ) : authResult ? (
                      <p className={`text-sm ${authResult.success ? "text-green-600" : "text-red-600"}`}>
                        {authResult.message}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">No verificado</p>
                    )}
                  </CardContent>
                </Card>

                <Card
                  className={`${databaseResult?.success ? "border-green-200" : databaseResult?.success === false ? "border-red-200" : "border-gray-200"}`}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Database className="h-5 w-5" />
                      <span>Base de datos</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isTestingDatabase ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Verificando...</span>
                      </div>
                    ) : databaseResult ? (
                      <p className={`text-sm ${databaseResult.success ? "text-green-600" : "text-red-600"}`}>
                        {databaseResult.message}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">No verificado</p>
                    )}
                  </CardContent>
                </Card>

                <Card
                  className={`${storageResult?.success ? "border-green-200" : storageResult?.success === false ? "border-red-200" : "border-gray-200"}`}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <FileImage className="h-5 w-5" />
                      <span>Almacenamiento</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isTestingStorage ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Verificando...</span>
                      </div>
                    ) : storageResult ? (
                      <p className={`text-sm ${storageResult.success ? "text-green-600" : "text-red-600"}`}>
                        {storageResult.message}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">No verificado</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex flex-wrap gap-2">
                <Button onClick={testAuth} disabled={isTestingAuth} size="sm" className="flex items-center gap-1">
                  {isTestingAuth && <Loader2 className="h-4 w-4 animate-spin" />}
                  Probar autenticación
                </Button>
                <Button
                  onClick={testDatabase}
                  disabled={isTestingDatabase}
                  size="sm"
                  className="flex items-center gap-1"
                >
                  {isTestingDatabase && <Loader2 className="h-4 w-4 animate-spin" />}
                  Probar base de datos
                </Button>
                <Button onClick={testStorage} disabled={isTestingStorage} size="sm" className="flex items-center gap-1">
                  {isTestingStorage && <Loader2 className="h-4 w-4 animate-spin" />}
                  Probar almacenamiento
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuración actual</CardTitle>
              <CardDescription>Información sobre la configuración de Supabase</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">URL de Supabase: </span>
                  <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                    {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✓ Configurado" : "❌ No configurado"}
                  </code>
                </div>
                <div>
                  <span className="font-medium">Clave anónima: </span>
                  <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                    {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✓ Configurado" : "❌ No configurado"}
                  </code>
                </div>
                <div>
                  <span className="font-medium">Usuario autenticado: </span>
                  {isAuthenticated ? (
                    <span className="text-green-600">✓ {user?.email}</span>
                  ) : (
                    <span className="text-amber-600">❌ No hay sesión activa</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auth" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                <span>Test de autenticación</span>
              </CardTitle>
              <CardDescription>Verifica la configuración de autenticación de Supabase</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="mb-2 font-medium">Estado actual:</h3>
                {isTestingAuth ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Verificando la autenticación...</span>
                  </div>
                ) : authResult ? (
                  <div
                    className={`rounded-md ${authResult.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"} p-3`}
                  >
                    {authResult.message}
                  </div>
                ) : (
                  <p className="text-gray-500">Haz clic en "Probar autenticación" para verificar</p>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Detalles del usuario:</h3>
                {isAuthenticated ? (
                  <div className="space-y-1">
                    <p>
                      <span className="font-medium">ID:</span> {user?.id}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> {user?.email}
                    </p>
                    <p>
                      <span className="font-medium">Nombre:</span> {user?.name || "No establecido"}
                    </p>
                    <p>
                      <span className="font-medium">Rol:</span> {user?.role}
                    </p>
                  </div>
                ) : (
                  <p className="text-amber-600">
                    No hay sesión activa. Inicia sesión para ver los detalles del usuario.
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={testAuth} disabled={isTestingAuth}>
                {isTestingAuth ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  "Probar autenticación"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileImage className="h-5 w-5" />
                <span>Test de almacenamiento</span>
              </CardTitle>
              <CardDescription>Verifica el acceso a los buckets de almacenamiento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="mb-2 font-medium">Estado actual:</h3>
                {isTestingStorage ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Verificando el almacenamiento...</span>
                  </div>
                ) : storageResult ? (
                  <div
                    className={`rounded-md ${storageResult.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"} p-3`}
                  >
                    {storageResult.message}
                  </div>
                ) : (
                  <p className="text-gray-500">Haz clic en "Probar almacenamiento" para verificar</p>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Buckets configurados:</h3>
                <ul className="list-inside list-disc space-y-1">
                  {Object.entries(STORAGE_BUCKETS).map(([key, value]) => (
                    <li key={key} className="text-sm">
                      <span className="font-medium">{key}:</span> {value}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={testStorage} disabled={isTestingStorage}>
                {isTestingStorage ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  "Probar almacenamiento"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                <span>Test de base de datos</span>
              </CardTitle>
              <CardDescription>Verifica la conexión a la base de datos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="mb-2 font-medium">Estado actual:</h3>
                {isTestingDatabase ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Verificando la base de datos...</span>
                  </div>
                ) : databaseResult ? (
                  <div
                    className={`rounded-md ${databaseResult.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"} p-3`}
                  >
                    {databaseResult.message}
                  </div>
                ) : (
                  <p className="text-gray-500">Haz clic en "Probar base de datos" para verificar</p>
                )}
              </div>

              <div>
                <h3 className="font-medium">Tablas requeridas:</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Para el funcionamiento de la autenticación y el almacenamiento de perfiles, asegúrate de tener creadas
                  las siguientes tablas en tu base de datos:
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li className="text-sm">
                    <code className="rounded bg-gray-100 px-1">profiles</code> - Datos de perfil de usuario
                  </li>
                  <li className="text-sm">
                    <code className="rounded bg-gray-100 px-1">excursiones</code> - Datos de excursiones
                  </li>
                  <li className="text-sm">
                    <code className="rounded bg-gray-100 px-1">reservas</code> - Datos de reservas
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={testDatabase} disabled={isTestingDatabase}>
                {isTestingDatabase ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  "Probar base de datos"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
