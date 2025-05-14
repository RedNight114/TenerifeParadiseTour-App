"use client"

import { excursiones } from "@/data/excursiones"
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Generamos datos de ejemplo basados en las excursiones existentes
const datosExcursiones = excursiones
  .map((excursion) => ({
    name: excursion.nombre,
    reservas: Math.floor(Math.random() * 100) + 10,
    id: excursion.id,
  }))
  .sort((a, b) => b.reservas - a.reservas)
  .slice(0, 5)

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

const formatTooltip = (value: number, name: string) => {
  return [`${value} reservas`, name]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const excursion = excursiones.find((excursion) => excursion.nombre === payload[0].name)
    return (
      <div
        className="custom-tooltip"
        style={{ backgroundColor: "#f9f9f9", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}
      >
        <p className="label">{`${payload[0].payload.name}`}</p>
        <p className="intro">{`Reservas: ${payload[0].value}`}</p>
        {excursion && <p className="desc">{excursion.descripcion}</p>}
      </div>
    )
  }

  return null
}

const truncate = (str: string, n: number) => {
  return str.length > n ? str.substring(0, n - 3) + "..." : str
}

const renderCustomizedLabel = (props: any) => {
  const { x, y, width, value } = props
  const radius = 10

  return (
    <g>
      <text x={x + width + radius} y={y} dy={16} fill="#666" textAnchor="start">
        {value}
      </text>
    </g>
  )
}

export function EstadisticasExcursiones() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={datosExcursiones}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barCategoryGap={10}
      >
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" width={200} tickFormatter={(value) => truncate(value, 25)} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="reservas" radius={[0, 4, 4, 0]} label={renderCustomizedLabel}>
          {datosExcursiones.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
