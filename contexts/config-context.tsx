"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Definición de tipos para la configuración
export interface ConfigState {
  notifications: {
    enabled: boolean
    email: boolean
    push: boolean
    desktop: boolean
    reservaAlerts: boolean
    reservaAlertsTime: number // horas antes
    lowInventoryAlerts: boolean
    systemUpdates: boolean
    browser: boolean
  }
  display: {
    defaultView: "tabla" | "tarjetas" | "calendario"
    compactMode: boolean
    rowsPerPage: number
    showFilters: boolean
    animationsEnabled: boolean
    fontSize: "small" | "medium" | "large"
    dataDensity: "compact" | "normal" | "comfortable"
    animations: boolean
  }
  export: {
    defaultFormat: "excel" | "csv" | "pdf" | "json"
    includeHeaders: boolean
    dateFormat: string
    autoFileName: boolean
  }
  system: {
    language: string
    autoBackup: boolean
    backupFrequency: "diario" | "semanal" | "mensual"
    dataRetention: number // días
    sessionTimeout: number // minutos
    autoRefresh: boolean
    refreshInterval: number // minutos
  }
  privacy: {
    anonymizeData: boolean
    showCustomerDetails: boolean
    logUserActivity: boolean
  }
}

// Configuración por defecto
const defaultConfig: ConfigState = {
  notifications: {
    enabled: true,
    email: true,
    push: false,
    desktop: true,
    reservaAlerts: true,
    reservaAlertsTime: 24, // horas antes
    lowInventoryAlerts: true,
    systemUpdates: false,
    browser: false,
  },
  display: {
    defaultView: "tabla",
    compactMode: false,
    rowsPerPage: 10,
    showFilters: true,
    animationsEnabled: true,
    fontSize: "medium",
    dataDensity: "normal",
    animations: true,
  },
  export: {
    defaultFormat: "excel",
    includeHeaders: true,
    dateFormat: "DD/MM/YYYY",
    autoFileName: true,
  },
  system: {
    language: "es",
    autoBackup: false,
    backupFrequency: "semanal",
    dataRetention: 90, // días
    sessionTimeout: 30, // minutos
    autoRefresh: true,
    refreshInterval: 5, // minutos
  },
  privacy: {
    anonymizeData: false,
    showCustomerDetails: true,
    logUserActivity: true,
  },
}

// Tipo para el contexto
interface ConfigContextType {
  config: ConfigState
  setConfig: React.Dispatch<React.SetStateAction<ConfigState>>
  saveConfig: () => void
  resetConfig: () => void
  hasChanges: boolean
}

// Crear el contexto
const ConfigContext = createContext<ConfigContextType | undefined>(undefined)

// Proveedor del contexto
export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ConfigState>(defaultConfig)
  const [savedConfig, setSavedConfig] = useState<ConfigState>(defaultConfig)
  const [hasChanges, setHasChanges] = useState(false)

  // Cargar configuración al iniciar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedConfig = localStorage.getItem("dashboardConfig")
      if (savedConfig) {
        try {
          const parsedConfig = JSON.parse(savedConfig)
          setConfig({ ...defaultConfig, ...parsedConfig })
          setSavedConfig({ ...defaultConfig, ...parsedConfig })
        } catch (e) {
          console.error("Error al cargar la configuración:", e)
        }
      }
    }
  }, [])

  // Detectar cambios en la configuración
  useEffect(() => {
    setHasChanges(JSON.stringify(config) !== JSON.stringify(savedConfig))
  }, [config, savedConfig])

  // Aplicar configuraciones
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Aplicar densidad de datos
      document.documentElement.style.setProperty(
        "--data-density",
        config.display.dataDensity === "compact" ? "0.75" : config.display.dataDensity === "comfortable" ? "1.25" : "1",
      )

      // Aplicar tamaño de fuente
      document.documentElement.style.setProperty(
        "--font-size-multiplier",
        config.display.fontSize === "small" ? "0.9" : config.display.fontSize === "large" ? "1.1" : "1",
      )

      // Aplicar animaciones
      document.documentElement.style.setProperty("--transition-speed", config.display.animations ? "0.2s" : "0s")

      // Aplicar modo compacto
      if (config.display.compactMode) {
        document.body.classList.add("compact-mode")
      } else {
        document.body.classList.remove("compact-mode")
      }

      // Aplicar animaciones
      if (config.display.animationsEnabled) {
        document.body.classList.add("animations-enabled")
      } else {
        document.body.classList.remove("animations-enabled")
      }
    }
  }, [config.display])

  // Guardar configuración
  const saveConfig = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dashboardConfig", JSON.stringify(config))
      setSavedConfig(config)
      setHasChanges(false)
    }
  }

  // Restablecer configuración
  const resetConfig = () => {
    setConfig(defaultConfig)
    setHasChanges(true)
  }

  return (
    <ConfigContext.Provider value={{ config, setConfig, saveConfig, resetConfig, hasChanges }}>
      {children}
    </ConfigContext.Provider>
  )
}

// Hook para usar el contexto
export function useConfig() {
  const context = useContext(ConfigContext)
  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider")
  }
  return context
}
