"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/components/ui/use-toast"
import { ClienteProvider } from "@/contexts/cliente-context"
import { ExcursionProvider } from "@/contexts/excursion-context"
import { ReservaProvider } from "@/contexts/reserva-context"

interface AppContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp debe ser usado dentro de un AppProvider")
  }
  return context
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const { toast } = useToast()

  // Efecto para mostrar mensajes de sistema
  useEffect(() => {
    // Ejemplo de cómo mostrar mensajes del sistema
    const showSystemMessages = async () => {
      // Aquí podrías verificar si hay mensajes del sistema para mostrar
      // Por ejemplo, actualizaciones, mantenimiento programado, etc.
    }

    if (isAuthenticated && !authLoading) {
      showSystemMessages()
    }
  }, [isAuthenticated, authLoading, toast])

  const value = {
    isLoading,
    setIsLoading,
    sidebarOpen,
    setSidebarOpen,
  }

  return (
    <AppContext.Provider value={value}>
      <ClienteProvider>
        <ExcursionProvider>
          <ReservaProvider>{children}</ReservaProvider>
        </ExcursionProvider>
      </ClienteProvider>
    </AppContext.Provider>
  )
}
