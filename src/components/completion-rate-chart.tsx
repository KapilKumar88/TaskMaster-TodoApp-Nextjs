"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function CompletionRateChart() {
  const data = [
    { month: "Jan", rate: 62 },
    { month: "Feb", rate: 58 },
    { month: "Mar", rate: 65 },
    { month: "Apr", rate: 70 },
    { month: "May", rate: 68 },
    { month: "Jun", rate: 72 },
    { month: "Jul", rate: 75 },
    { month: "Aug", rate: 80 },
    { month: "Sep", rate: 82 },
    { month: "Oct", rate: 85 },
    { month: "Nov", rate: 88 },
    { month: "Dec", rate: 92 },
  ]

  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, bottom: 30, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "0.5rem",
            }}
          />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="rgba(16, 185, 129, 0.8)" // Emerald
            strokeWidth={2}
            dot={{ fill: "rgba(16, 185, 129, 0.8)", r: 4 }}
            activeDot={{ r: 6, fill: "rgb(16, 185, 129)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

