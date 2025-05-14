"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { useConfig } from "@/contexts/config-context"
import NotificationHandler from "@/components/dashboard/notification-handler"
import Topbar from "@/components/dashboard/topbar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { config } = useConfig()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Detectar si es móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    // Comprobar al cargar
    checkIfMobile()

    // Comprobar al cambiar el tamaño de la ventana
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Aplicar estilos según la configuración
  const getMainClasses = () => {
    let classes = "flex-1 overflow-auto"

    if (config?.display?.compactMode) {
      classes = cn(classes, "p-2")
    } else {
      classes = cn(classes, "p-4")
    }

    return classes
  }

  // Aplicar estilos de fuente según la configuración
  useEffect(() => {
    if (typeof document !== "undefined" && config?.display?.fontSize) {
      document.documentElement.style.fontSize =
        config.display.fontSize === "small" ? "14px" : config.display.fontSize === "large" ? "18px" : "16px"
    }
  }, [config?.display?.fontSize])

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} isMobile={isMobile} />

      {/* Contenido principal */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        {/* Barra superior */}
        <Topbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Contenido */}
        <ScrollArea className={getMainClasses()}>{children}</ScrollArea>
      </div>

      {/* Manejador de notificaciones */}
      {config?.notifications?.enabled && <NotificationHandler />}
    </div>
  )
}
