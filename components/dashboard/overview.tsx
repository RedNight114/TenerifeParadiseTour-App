"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip } from "recharts"

// Datos simplificados de reservas por excursión
const data = [
  { name: "Tour Teide", reservas: 42 },
  { name: "Anaga", reservas: 38 },
  { name: "Gastronomía", reservas: 31 },
  { name: "Bicicleta", reservas: 25 },
  { name: "Museo", reservas: 19 },
  { name: "Crucero", reservas: 27 },
  { name: "Vinos", reservas: 15 },
  { name: "Kayak", reservas: 22 },
]

export function Overview() {
  return (
    <Card className="bg-white dark:bg-gray-950 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Reservas por Excursión</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 0, right: 60, bottom: 0, left: 80 }}>
              <XAxis
                type="number"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <YAxis type="category" dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <RechartsTooltip
                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Excursión</span>
                            <span className="font-bold text-sm">{payload[0].payload.name}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">Reservas</span>
                            <span className="font-bold text-sm">{payload[0].value}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar
                dataKey="reservas"
                fill="hsl(var(--primary))"
                radius={[0, 4, 4, 0]}
                label={{
                  position: "right",
                  fill: "#333333",
                  fontSize: 12,
                  formatter: (value) => `${value.value}`,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between border-b pb-2">
            <p className="text-sm font-medium">Excursión más popular:</p>
            <p className="text-sm font-bold text-primary">Tour Teide (42 reservas)</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Total de reservas:</p>
            <p className="text-sm font-bold">{data.reduce((sum, item) => sum + item.reservas, 0)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
