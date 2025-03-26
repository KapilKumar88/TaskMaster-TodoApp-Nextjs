"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function ProductivityChart() {
  const data = [
    { day: "Mon", tasks: 7 },
    { day: "Tue", tasks: 9 },
    { day: "Wed", tasks: 10 },
    { day: "Thu", tasks: 8 },
    { day: "Fri", tasks: 11 },
    { day: "Sat", tasks: 5 },
    { day: "Sun", tasks: 3 },
  ]

  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, bottom: 30, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "0.5rem",
            }}
          />
          <Bar dataKey="tasks" fill="rgba(79, 70, 229, 0.8)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

