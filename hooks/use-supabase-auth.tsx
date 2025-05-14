"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import {
  type UserSession,
  getCurrentUser,
  signInWithEmail,
  signUpWithEmail,
  signOut,
  resetPassword,
  updatePassword,
  updateProfile,
  uploadAvatar,
} from "@/lib/auth/supabase-auth"

// Tipo para errores de Supabase
interface SupabaseAuthError {
  message: string
  status?: number
}

// Función para normalizar errores de Supabase
function normalizeSupabaseError(error: any): SupabaseAuthError {
  // Si ya es un objeto con mensaje, lo devolvemos
  if (error?.message) {
    return {
      message: error.message,
      status: error.status || error.statusCode,
    }
  }

  // Si es un string, lo convertimos a objeto
  if (typeof error === "string") {
    return { message: error }
  }

  // Si no podemos identificar el error, devolvemos un mensaje genérico
  return {
    message: "Ha ocurrido un error desconocido en la autenticación",
  }
}

type AuthContextType = {
  user: UserSession | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  changePassword: (password: string) => Promise<void>
  updateUserProfile: (profile: Partial<UserSession>) => Promise<void>
  uploadUserAvatar: (file: File) => Promise<string>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function SupabaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  // Cargar el usuario al iniciar
  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error("Error al cargar el usuario:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  // Función para iniciar sesión
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      await signInWithEmail(email, password)
      const currentUser = await getCurrentUser()
      setUser(currentUser)

      toast({
        title: "Inicio de sesión exitoso",
        description: `Bienvenido ${currentUser?.name || currentUser?.email}`,
      })

      router.push("/dashboard")
    } catch (error: any) {
      const normalizedError = normalizeSupabaseError(error)
      toast({
        title: "Error al iniciar sesión",
        description: normalizedError.message,
        variant: "destructive",
      })
      throw normalizedError
    } finally {
      setIsLoading(false)
    }
  }

  // Función para registrar un nuevo usuario
  const register = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true)
      await signUpWithEmail(email, password, name)

      toast({
        title: "Registro exitoso",
        description: "Se ha enviado un correo de confirmación a tu email",
      })

      router.push("/login")
    } catch (error: any) {
      const normalizedError = normalizeSupabaseError(error)
      toast({
        title: "Error al registrarse",
        description: normalizedError.message,
        variant: "destructive",
      })
      throw normalizedError
    } finally {
      setIsLoading(false)
    }
  }

  // Función para cerrar sesión
  const logout = async () => {
    try {
      setIsLoading(true)
      await signOut()
      setUser(null)

      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      })

      router.push("/login")
    } catch (error: any) {
      const normalizedError = normalizeSupabaseError(error)
      toast({
        title: "Error al cerrar sesión",
        description: normalizedError.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Función para solicitar restablecimiento de contraseña
  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true)
      await resetPassword(email)

      toast({
        title: "Correo enviado",
        description: "Se ha enviado un correo para restablecer tu contraseña",
      })
    } catch (error: any) {
      const normalizedError = normalizeSupabaseError(error)
      toast({
        title: "Error",
        description: normalizedError.message,
        variant: "destructive",
      })
      throw normalizedError
    } finally {
      setIsLoading(false)
    }
  }

  // Función para cambiar la contraseña
  const changePassword = async (password: string) => {
    try {
      setIsLoading(true)
      await updatePassword(password)

      toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña ha sido actualizada correctamente",
      })
    } catch (error: any) {
      const normalizedError = normalizeSupabaseError(error)
      toast({
        title: "Error",
        description: normalizedError.message,
        variant: "destructive",
      })
      throw normalizedError
    } finally {
      setIsLoading(false)
    }
  }

  // Función para actualizar el perfil
  const updateUserProfile = async (profile: Partial<UserSession>) => {
    try {
      setIsLoading(true)
      await updateProfile(profile)

      // Actualizar el usuario en el estado
      const updatedUser = await getCurrentUser()
      setUser(updatedUser)

      toast({
        title: "Perfil actualizado",
        description: "Tu perfil ha sido actualizado correctamente",
      })
    } catch (error: any) {
      const normalizedError = normalizeSupabaseError(error)
      toast({
        title: "Error",
        description: normalizedError.message,
        variant: "destructive",
      })
      throw normalizedError
    } finally {
      setIsLoading(false)
    }
  }

  // Función para subir un avatar
  const uploadUserAvatar = async (file: File) => {
    try {
      setIsLoading(true)
      const avatarUrl = await uploadAvatar(file)

      // Actualizar el usuario en el estado
      const updatedUser = await getCurrentUser()
      setUser(updatedUser)

      toast({
        title: "Avatar actualizado",
        description: "Tu avatar ha sido actualizado correctamente",
      })

      return avatarUrl
    } catch (error: any) {
      const normalizedError = normalizeSupabaseError(error)
      toast({
        title: "Error",
        description: normalizedError.message,
        variant: "destructive",
      })
      throw normalizedError
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        forgotPassword,
        changePassword,
        updateUserProfile,
        uploadUserAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useSupabaseAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useSupabaseAuth debe ser usado dentro de un SupabaseAuthProvider")
  }

  return context
}
