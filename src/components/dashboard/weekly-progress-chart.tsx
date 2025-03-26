"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function WeeklyProgressChart() {
  const data = [
    { day: "Mon", completed: 3, created: 5 },
    { day: "Tue", completed: 5, created: 4 },
    { day: "Wed", completed: 4, created: 6 },
    { day: "Thu", completed: 6, created: 3 },
    { day: "Fri", completed: 4, created: 5 },
    { day: "Sat", completed: 2, created: 1 },
    { day: "Sun", completed: 1, created: 2 },
  ];

  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, bottom: 30, left: 10 }}
        >
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
          <Line
            type="monotone"
            dataKey="completed"
            stroke="rgba(16, 185, 129, 0.8)" // Emerald
            strokeWidth={2}
            dot={{ fill: "rgba(16, 185, 129, 0.8)", r: 4 }}
            activeDot={{ r: 6, fill: "rgb(16, 185, 129)" }}
          />
          <Line
            type="monotone"
            dataKey="created"
            stroke="rgba(79, 70, 229, 0.8)" // Indigo
            strokeWidth={2}
            dot={{ fill: "rgba(79, 70, 229, 0.8)", r: 4 }}
            activeDot={{ r: 6, fill: "rgb(79, 70, 229)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
