"use client"

import { useEffect, useState } from "react"
import { useConfig } from "@/contexts/config-context"
import { useToast } from "@/components/ui/use-toast"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  timestamp: Date
  read: boolean
}

// Simulación de notificaciones
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Nueva reserva",
    message: "Juan Pérez ha reservado Excursión al Teide para mañana",
    type: "success",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutos atrás
    read: false,
  },
  {
    id: "2",
    title: "Recordatorio",
    message: "Excursión a Anaga mañana a las 9:00",
    type: "info",
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hora atrás
    read: false,
  },
  {
    id: "3",
    title: "Alerta de disponibilidad",
    message: "Quedan solo 2 plazas para la Excursión al Teide del 15/05",
    type: "warning",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 horas atrás
    read: false,
  },
]

export default function NotificationHandler() {
  const { config } = useConfig()
  const { toast } = useToast()
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  // Mostrar notificaciones no leídas al cargar
  useEffect(() => {
    if (config?.notifications?.enabled) {
      // Filtrar notificaciones según configuración
      const unreadNotifications = notifications.filter((notification) => !notification.read)

      // Mostrar notificaciones según preferencias
      unreadNotifications.forEach((notification) => {
        // Mostrar notificación en el navegador si está habilitado
        if (config.notifications.desktop && "Notification" in window && Notification.permission === "granted") {
          new Notification(notification.title, {
            body: notification.message,
            icon: "/logo.png",
          })
        }

        // Mostrar toast para todas las notificaciones
        toast({
          title: notification.title,
          description: notification.message,
          variant: notification.type === "error" ? "destructive" : "default",
        })

        // Marcar como leída
        setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n)))
      })
    }
  }, [config?.notifications?.enabled, notifications, toast])

  // Simular recepción de nuevas notificaciones
  useEffect(() => {
    if (!config?.notifications?.enabled) return

    const interval = setInterval(() => {
      // 10% de probabilidad de recibir una notificación
      if (Math.random() < 0.1) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          title: "Nueva actividad",
          message: "Se ha registrado una nueva actividad en el sistema",
          type: "info",
          timestamp: new Date(),
          read: false,
        }

        setNotifications((prev) => [newNotification, ...prev])
      }
    }, 30000) // Cada 30 segundos

    return () => clearInterval(interval)
  }, [config?.notifications?.enabled])

  return null // Este componente no renderiza nada, solo maneja notificaciones
}
