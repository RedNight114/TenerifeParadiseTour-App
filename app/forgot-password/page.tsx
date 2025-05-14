"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, ArrowRight, Info, Home, ArrowLeft } from "lucide-react"
import { useSupabaseAuth } from "@/hooks/use-supabase-auth"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const { forgotPassword } = useSupabaseAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setIsLoading(true)

    try {
      // Validación básica
      if (!email.trim()) {
        setError("Por favor, introduce tu email")
        setIsLoading(false)
        return
      }

      // Enviar correo de recuperación
      await forgotPassword(email)
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al enviar el correo. Por favor, inténtalo de nuevo.")
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
            <h1 className="mb-1 text-2xl font-bold text-gray-800">Recuperar contraseña</h1>
            <p className="text-sm text-gray-600">
              Introduce tu email y te enviaremos un enlace para restablecer tu contraseña
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                {error}
              </AlertDescription>
            </Alert>
          )}

          {success ? (
            <div className="space-y-4">
              <Alert className="mb-4 bg-green-50 text-green-800">
                <AlertDescription className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Se ha enviado un correo a {email} con instrucciones para restablecer tu contraseña.
                </AlertDescription>
              </Alert>

              <Button
                asChild
                className="w-full bg-teal-600 py-2.5 text-white transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                <Link href="/login">
                  <div className="flex items-center justify-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Volver al inicio de sesión</span>
                  </div>
                </Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10 pr-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    <span>Enviando...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>Enviar enlace</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>

              <div className="mt-4 text-center text-sm">
                <Link href="/login" className="font-medium text-teal-600 hover:text-teal-500">
                  Volver al inicio de sesión
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
