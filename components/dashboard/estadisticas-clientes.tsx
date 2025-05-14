"use client"

import { useState } from "react"
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos de ejemplo para la distribución por edad
const datosEdad = [
  { name: "18-24", value: 15 },
  { name: "25-34", value: 30 },
  { name: "35-44", value: 25 },
  { name: "45-54", value: 20 },
  { name: "55+", value: 10 },
]

// Datos de ejemplo para la distribución por género
const datosGenero = [
  { name: "Hombres", value: 45 },
  { name: "Mujeres", value: 55 },
]

// Datos de ejemplo para la procedencia
const datosProcedencia = [
  { name: "Nacional", value: 60 },
  { name: "Internacional", value: 40 },
]

// Datos de ejemplo para la frecuencia de compra
const datosFrecuencia = [
  { name: "Primera vez", value: 65 },
  { name: "Recurrente", value: 35 },
]

// Datos de ejemplo para el canal de reserva
const datosCanal = [
  { name: "Web", value: 45 },
  { name: "Teléfono", value: 25 },
  { name: "Agencias", value: 20 },
  { name: "Presencial", value: 10 },
]

// Colores para los gráficos
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

export function EstadisticasClientes() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <Tabs defaultValue="demograficos" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="demograficos">Datos Demográficos</TabsTrigger>
        <TabsTrigger value="comportamiento">Comportamiento</TabsTrigger>
      </TabsList>
      <TabsContent value="demograficos" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-[300px]">
            <h3 className="text-sm font-medium text-center mb-2">Distribución por Edad</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  data={datosEdad}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                >
                  {datosEdad.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Porcentaje"]} contentStyle={{ borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="h-[300px]">
            <h3 className="text-sm font-medium text-center mb-2">Distribución por Género</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={datosGenero}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {datosGenero.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Porcentaje"]} contentStyle={{ borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="h-[300px]">
            <h3 className="text-sm font-medium text-center mb-2">Procedencia</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={datosProcedencia}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {datosProcedencia.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Porcentaje"]} contentStyle={{ borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="comportamiento" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-[300px]">
            <h3 className="text-sm font-medium text-center mb-2">Frecuencia de Compra</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={datosFrecuencia}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {datosFrecuencia.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Porcentaje"]} contentStyle={{ borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="h-[300px]">
            <h3 className="text-sm font-medium text-center mb-2">Canal de Reserva</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={datosCanal}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, "Porcentaje"]} contentStyle={{ borderRadius: "8px" }} />
                <Bar dataKey="value" fill="#8884d8">
                  {datosCanal.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
