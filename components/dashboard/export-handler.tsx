"use client"

import { useState } from "react"
import { saveAs } from "file-saver"
import { useToast } from "@/components/ui/use-toast"
import { useConfig } from "@/contexts/config-context"

// Tipos de datos que podemos exportar
export type ExportDataType = "clientes" | "excursiones" | "reservas" | "estadisticas"

// Formatos de exportación
export type ExportFormat = "csv" | "excel" | "pdf" | "json"

interface ExportOptions {
  includeHeaders?: boolean
  dateFormat?: string
  decimalSeparator?: string
  fileName?: string
}

export function useExport() {
  const { toast } = useToast()
  const { config } = useConfig()
  const [isExporting, setIsExporting] = useState(false)

  // Función para exportar datos
  const exportData = async (data: any[], type: ExportDataType, format: ExportFormat, options: ExportOptions = {}) => {
    try {
      setIsExporting(true)

      // Notificar inicio de exportación
      toast({
        title: "Exportación iniciada",
        description: `Exportando datos de ${type} en formato ${format.toUpperCase()}`,
      })

      // Opciones por defecto
      const defaultOptions: ExportOptions = {
        includeHeaders: true,
        dateFormat: "YYYY-MM-DD",
        decimalSeparator: config.export.decimalSeparator || ".",
        fileName: `${type}_${new Date().toISOString().split("T")[0]}`,
      }

      const mergedOptions = { ...defaultOptions, ...options }

      // Simular tiempo de procesamiento
      await new Promise((resolve) => setTimeout(resolve, 1000))

      let result
      let mimeType
      let fileExtension

      switch (format) {
        case "csv":
          result = convertToCSV(data, mergedOptions)
          mimeType = "text/csv;charset=utf-8"
          fileExtension = "csv"
          break

        case "json":
          result = JSON.stringify(data, null, 2)
          mimeType = "application/json"
          fileExtension = "json"
          break

        case "excel":
          // En un caso real, usaríamos una biblioteca como xlsx
          // Aquí simulamos un CSV que Excel puede abrir
          result = convertToCSV(data, mergedOptions)
          mimeType = "application/vnd.ms-excel"
          fileExtension = "xls"
          break

        case "pdf":
          // En un caso real, usaríamos una biblioteca como jsPDF
          // Aquí simulamos un texto plano
          result = data.map((item) => JSON.stringify(item)).join("\n")
          mimeType = "application/pdf"
          fileExtension = "pdf"
          break

        default:
          throw new Error(`Formato no soportado: ${format}`)
      }

      // Crear y descargar el archivo
      const blob = new Blob([result], { type: mimeType })
      saveAs(blob, `${mergedOptions.fileName}.${fileExtension}`)

      // Notificar éxito
      toast({
        title: "Exportación completada",
        description: `Los datos han sido exportados correctamente en formato ${format.toUpperCase()}`,
      })

      return true
    } catch (error) {
      console.error("Error al exportar datos:", error)

      // Notificar error
      toast({
        title: "Error en la exportación",
        description: `Ha ocurrido un error al exportar los datos: ${error instanceof Error ? error.message : "Error desconocido"}`,
        variant: "destructive",
      })

      return false
    } finally {
      setIsExporting(false)
    }
  }

  // Convertir datos a formato CSV
  const convertToCSV = (data: any[], options: ExportOptions): string => {
    if (!data || data.length === 0) return ""

    const headers = Object.keys(data[0])
    let csv = options.includeHeaders ? headers.join(",") + "\n" : ""

    csv += data
      .map((row) => {
        return headers
          .map((header) => {
            let value = row[header]

            // Formatear fechas
            if (value instanceof Date) {
              value = value.toISOString().split("T")[0]
            }

            // Formatear números
            if (typeof value === "number") {
              value = value.toString().replace(".", options.decimalSeparator || ".")
            }

            // Escapar comas y comillas
            if (typeof value === "string") {
              if (value.includes(",") || value.includes('"') || value.includes("\n")) {
                value = `"${value.replace(/"/g, '""')}"`
              }
            }

            return value === null || value === undefined ? "" : value
          })
          .join(",")
      })
      .join("\n")

    return csv
  }

  return {
    exportData,
    isExporting,
  }
}
