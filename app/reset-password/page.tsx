"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, ArrowRight, Info, Home } from "lucide-react"
import { useSupabaseAuth } from "@/hooks/use-supabase-auth"
import { getSupabaseClient } from "@/lib/supabase-config"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isValidLink, setIsValidLink] = useState(false)
  const { changePassword } = useSupabaseAuth()
  const router = useRouter()
  const supabase = getSupabaseClient()

  // Verificar si el enlace de restablecimiento es válido
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error || !data.session) {
        setIsValidLink(false)
        setError("El enlace de restablecimiento no es válido o ha expirado.")
      } else {
        setIsValidLink(true)
      }
    }

    checkSession()
  }, [supabase.auth])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Validación básica
      if (!password) {
        setError("Por favor, introduce una contraseña")
        setIsLoading(false)
        return
      }

      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden")
        setIsLoading(false)
        return
      }

      if (password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres")
        setIsLoading(false)
        return
      }

      // Cambiar contraseña
      await changePassword(password)
      router.push("/login")
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al restablecer la contraseña. Por favor, inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      {/* Botón para volver al Home */}
      <div className="absolute left-4 top-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
            <Home className="h-4 w-4" />
            <span>Volver al inicio</span>
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-md px-4">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <div className="relative h-20 w-20 overflow-hidden rounded-full bg-white p-1 shadow-md">
            <Image
              src="/logo.png"
              alt="Tenerife Paradise Tours"
              width={80}
              height={80}
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="mb-1 text-2xl font-bold text-gray-800">Restablecer contraseña</h1>
            <p className="text-sm text-gray-600">Introduce tu nueva contraseña</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                {error}
              </AlertDescription>
            </Alert>
          )}

          {isValidLink ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Nueva contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirmar contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-teal-600 py-2.5 text-white transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    <span>Restableciendo...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>Restablecer contraseña</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <p className="mb-4 text-red-600">El enlace de restablecimiento no es válido o ha expirado.</p>
              <Button
                asChild
                className="w-full bg-teal-600 py-2.5 text-white transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                <Link href="/forgot-password">
                  <div className="flex items-center justify-center gap-2">
                    <span>Solicitar nuevo enlace</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </Button>
            </div>
          )}

          <div className="mt-4 text-center text-sm">
            <Link href="/login" className="font-medium text-teal-600 hover:text-teal-500">
              Volver al inicio de sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
