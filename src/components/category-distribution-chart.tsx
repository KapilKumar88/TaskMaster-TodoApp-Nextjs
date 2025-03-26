"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export function CategoryDistributionChart() {
  const data = [
    { name: "Work", value: 10, color: "rgba(79, 70, 229, 0.8)" }, // Indigo
    { name: "Personal", value: 6, color: "rgba(139, 92, 246, 0.8)" }, // Violet
    { name: "Study", value: 5, color: "rgba(59, 130, 246, 0.8)" }, // Blue
    { name: "Health", value: 3, color: "rgba(20, 184, 166, 0.8)" }, // Teal
  ];

  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, bottom: 30, left: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "0.5rem",
            }}
          />
          <Bar dataKey="value" radius={4}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
