"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { FileText, Loader2 } from "lucide-react"
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import type { Cliente } from "@/contexts/cliente-context"

interface ClienteInformeProps {
  cliente: Cliente
  onClose?: () => void
}

export function ClienteInforme({ cliente, onClose }: ClienteInformeProps) {
  const [generando, setGenerando] = useState(false)
  const [opciones, setOpciones] = useState({
    datosPersonales: true,
    historialReservas: true,
    preferencias: true,
    estadisticas: false,
    notas: true,
  })
  const { toast } = useToast()

  const handleGenerarInforme = () => {
    setGenerando(true)

    // Simulamos la generación del informe
    setTimeout(() => {
      // Creamos un nuevo documento para imprimir
      const printWindow = window.open("", "_blank")

      if (!printWindow) {
        toast({
          title: "Error",
          description: "No se pudo abrir la ventana de impresión. Por favor, permite las ventanas emergentes.",
          variant: "destructive",
        })
        setGenerando(false)
        return
      }

      // Contenido del informe
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Informe de Cliente - ${cliente.nombre}</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            @media print {
              @page {
                size: A4;
                margin: 1.5cm;
              }
            }
            
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 30px;
              border-bottom: 1px solid #ddd;
              padding-bottom: 20px;
            }
            
            .logo {
              max-width: 200px;
            }
            
            .title {
              text-align: right;
            }
            
            h1 {
              color: #0f766e;
              margin: 0;
              font-size: 24px;
            }
            
            h2 {
              color: #0f766e;
              font-size: 18px;
              margin-top: 30px;
              margin-bottom: 15px;
              border-bottom: 1px solid #eee;
              padding-bottom: 5px;
            }
            
            .subtitle {
              color: #666;
              margin: 5px 0;
              font-size: 14px;
            }
            
            .info-block {
              margin-bottom: 25px;
            }
            
            .info-row {
              display: flex;
              margin-bottom: 10px;
            }
            
            .info-label {
              font-weight: bold;
              width: 200px;
              color: #555;
            }
            
            .info-value {
              flex: 1;
            }
            
            .badge {
              display: inline-block;
              background-color: #e6f7f5;
              color: #0f766e;
              padding: 3px 8px;
              border-radius: 4px;
              font-size: 12px;
              margin-right: 5px;
              margin-bottom: 5px;
            }
            
            .vip-badge {
              background-color: #fef3c7;
              color: #92400e;
            }
            
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            
            th, td {
              border: 1px solid #ddd;
              padding: 10px;
              text-align: left;
            }
            
            th {
              background-color: #f5f5f5;
            }
            
            .footer {
              margin-top: 50px;
              text-align: center;
              font-size: 12px;
              color: #666;
              border-top: 1px solid #ddd;
              padding-top: 20px;
            }
            
            .print-date {
              font-style: italic;
              margin-bottom: 5px;
            }
            
            .confidential {
              color: #999;
            }
            
            .note {
              background-color: #f9f9f9;
              padding: 15px;
              border-left: 4px solid #0f766e;
              margin-bottom: 15px;
            }
            
            .note-date {
              font-size: 12px;
              color: #666;
              margin-bottom: 5px;
            }
            
            .note-important {
              border-left-color: #f59e0b;
            }
            
            @media print {
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <img src="/logo.png" alt="Tenerife Paradise Tours" class="logo">
            </div>
            <div class="title">
              <h1>Informe de Cliente</h1>
              <p class="subtitle">Generado el ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}</p>
            </div>
          </div>
          
          ${
            opciones.datosPersonales
              ? `
          <div class="info-block">
            <h2>Datos Personales</h2>
            <div class="info-row">
              <div class="info-label">Nombre:</div>
              <div class="info-value">${cliente.nombre} ${cliente.vip ? '<span class="badge vip-badge">VIP</span>' : ""}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Email:</div>
              <div class="info-value">${cliente.email}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Teléfono:</div>
              <div class="info-value">${cliente.telefono}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Dirección:</div>
              <div class="info-value">${cliente.direccion || "No disponible"}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Cliente desde:</div>
              <div class="info-value">${new Date(cliente.fechaRegistro).toLocaleDateString()}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Estado:</div>
              <div class="info-value"><span class="badge">${cliente.estado}</span></div>
            </div>
          </div>
          `
              : ""
          }
          
          ${
            opciones.historialReservas
              ? `
          <div class="info-block">
            <h2>Historial de Reservas</h2>
            <div class="info-row">
              <div class="info-label">Total de reservas:</div>
              <div class="info-value">${cliente.reservas}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Última reserva:</div>
              <div class="info-value">${cliente.ultimaReserva ? new Date(cliente.ultimaReserva).toLocaleDateString() : "No hay reservas"}</div>
            </div>
            
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Excursión</th>
                  <th>Personas</th>
                  <th>Importe</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${cliente.ultimaReserva ? new Date(cliente.ultimaReserva).toLocaleDateString() : "-"}</td>
                  <td>Tour del Teide</td>
                  <td>2</td>
                  <td>120€</td>
                </tr>
                <tr>
                  <td>10/03/2023</td>
                  <td>Senderismo Anaga</td>
                  <td>2</td>
                  <td>90€</td>
                </tr>
                <tr>
                  <td>15/01/2023</td>
                  <td>Avistamiento de Cetáceos</td>
                  <td>3</td>
                  <td>150€</td>
                </tr>
              </tbody>
            </table>
          </div>
          `
              : ""
          }
          
          ${
            opciones.preferencias
              ? `
          <div class="info-block">
            <h2>Preferencias</h2>
            <div class="info-row">
              <div class="info-label">Categorías preferidas:</div>
              <div class="info-value">
                ${
                  cliente.categoriasPreferidas && cliente.categoriasPreferidas.length > 0
                    ? cliente.categoriasPreferidas.map((cat) => `<span class="badge">${cat}</span>`).join(" ")
                    : "No hay categorías preferidas registradas"
                }
              </div>
            </div>
            <div class="info-row">
              <div class="info-label">Preferencias adicionales:</div>
              <div class="info-value">${cliente.preferencias || "No hay preferencias adicionales registradas"}</div>
            </div>
          </div>
          `
              : ""
          }
          
          ${
            opciones.estadisticas
              ? `
          <div class="info-block">
            <h2>Estadísticas</h2>
            <div class="info-row">
              <div class="info-label">Gasto total:</div>
              <div class="info-value">360€</div>
            </div>
            <div class="info-row">
              <div class="info-label">Promedio por reserva:</div>
              <div class="info-value">120€</div>
            </div>
            <div class="info-row">
              <div class="info-label">Excursión más reservada:</div>
              <div class="info-value">Tour del Teide (2 veces)</div>
            </div>
          </div>
          `
              : ""
          }
          
          ${
            opciones.notas
              ? `
          <div class="info-block">
            <h2>Notas</h2>
            ${
              cliente.notas
                ? `
            <div class="note note-important">
              <div class="note-date">Nota importante</div>
              <p>${cliente.notas}</p>
            </div>
            `
                : "<p>No hay notas registradas para este cliente.</p>"
            }
          </div>
          `
              : ""
          }
          
          <div class="footer">
            <p class="print-date">Documento generado el ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}</p>
            <p class="confidential">CONFIDENCIAL - USO INTERNO</p>
            <p>Tenerife Paradise Tours & Excursions Pro</p>
          </div>
          
          <div class="no-print" style="text-align: center; margin-top: 30px;">
            <button onclick="window.print()" style="padding: 10px 20px; background: #0f766e; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">
              Imprimir Informe
            </button>
          </div>
        </body>
        </html>
      `)

      printWindow.document.close()

      // Esperar a que los recursos se carguen y luego imprimir
      printWindow.onload = () => {
        // Dar tiempo para que se carguen las imágenes
        setTimeout(() => {
          printWindow.focus()
          // La impresión se maneja con el botón en la página
          setGenerando(false)

          if (onClose) {
            onClose()
          }

          toast({
            title: "Informe generado",
            description: "El informe se ha generado correctamente.",
          })
        }, 1000)
      }
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle>Generar informe de cliente</DialogTitle>
        <DialogDescription>
          Selecciona las secciones que deseas incluir en el informe de {cliente.nombre}.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="datosPersonales"
            checked={opciones.datosPersonales}
            onCheckedChange={(checked) => setOpciones({ ...opciones, datosPersonales: checked as boolean })}
          />
          <Label htmlFor="datosPersonales">Datos personales</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="historialReservas"
            checked={opciones.historialReservas}
            onCheckedChange={(checked) => setOpciones({ ...opciones, historialReservas: checked as boolean })}
          />
          <Label htmlFor="historialReservas">Historial de reservas</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="preferencias"
            checked={opciones.preferencias}
            onCheckedChange={(checked) => setOpciones({ ...opciones, preferencias: checked as boolean })}
          />
          <Label htmlFor="preferencias">Preferencias</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="estadisticas"
            checked={opciones.estadisticas}
            onCheckedChange={(checked) => setOpciones({ ...opciones, estadisticas: checked as boolean })}
          />
          <Label htmlFor="estadisticas">Estadísticas</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="notas"
            checked={opciones.notas}
            onCheckedChange={(checked) => setOpciones({ ...opciones, notas: checked as boolean })}
          />
          <Label htmlFor="notas">Notas</Label>
        </div>
      </div>

      <Separator />

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button onClick={handleGenerarInforme} disabled={generando}>
          {generando ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generando...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Generar informe
            </>
          )}
        </Button>
      </DialogFooter>
    </div>
  )
}
