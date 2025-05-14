"use client"

import { useState } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// Datos de ejemplo para las ventas mensuales
const datosVentasMensuales = [
  { name: "Ene", ventas: 4000, reservas: 120 },
  { name: "Feb", ventas: 3000, reservas: 98 },
  { name: "Mar", ventas: 5000, reservas: 142 },
  { name: "Abr", ventas: 2780, reservas: 89 },
  { name: "May", ventas: 1890, reservas: 65 },
  { name: "Jun", ventas: 2390, reservas: 78 },
  { name: "Jul", ventas: 3490, reservas: 105 },
  { name: "Ago", ventas: 4000, reservas: 122 },
  { name: "Sep", ventas: 2780, reservas: 87 },
  { name: "Oct", ventas: 1890, reservas: 64 },
  { name: "Nov", ventas: 2390, reservas: 77 },
  { name: "Dic", ventas: 3490, reservas: 106 },
]

// Datos de ejemplo para ventas por categoría
const datosVentasCategoria = [
  { name: "Cultura", value: 35 },
  { name: "Aventura", value: 25 },
  { name: "Gastronomía", value: 20 },
  { name: "Romántico", value: 10 },
  { name: "Actividades", value: 10 },
]

// Colores para las categorías
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

interface EstadisticasVentasProps {
  tipo?: "tiempo" | "categoria"
}

const gradientOffset = () => {
  const dataMax = Math.max(...datosVentasMensuales.map((item) => item.ventas))
  const dataMin = Math.min(...datosVentasMensuales.map((item) => item.ventas))

  if (dataMax <= 0) {
    return 0
  }
  if (dataMin >= 0) {
    return 1
  }

  return dataMax / (dataMax - dataMin)
}

export function EstadisticasVentas({ tipo = "tiempo" }: EstadisticasVentasProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (tipo === "categoria") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            data={datosVentasCategoria}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={(_, index) => setActiveIndex(index)}
          >
            {datosVentasCategoria.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}%`, "Porcentaje"]} contentStyle={{ borderRadius: "8px" }} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart
        data={datosVentasMensuales}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" style={{ fontSize: "12px" }} />
        <YAxis yAxisId="left" tickFormatter={(value) => `€${value}`} style={{ fontSize: "12px" }} />
        <YAxis yAxisId="right" orientation="right" style={{ fontSize: "12px" }} />
        <Tooltip
          contentStyle={{ backgroundColor: "#242526", color: "#fff", borderRadius: "8px" }}
          formatter={(value: number, name: string) => {
            if (name === "ventas") {
              return [`€${value}`, "Ventas"]
            } else {
              return [value, "Reservas"]
            }
          }}
          labelFormatter={(label) => `Mes: ${label}`}
        />
        <Legend wrapperStyle={{ fontSize: "14px" }} />
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="rgba(56, 189, 248, 0.8)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="rgba(56, 189, 248, 0.2)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="ventas"
          stroke="#0284c7"
          fill="url(#colorUv)"
          yAxisId="left"
          name="Ventas (€)"
          strokeWidth={2}
        />
        <Line type="monotone" dataKey="reservas" stroke="#82ca9d" yAxisId="right" name="Reservas" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

// Necesitamos definir el componente Cell para el gráfico de pastel
function Cell({ key, fill, ...props }: any) {
  return <Pie.Cell key={key} fill={fill} {...props} />
}
