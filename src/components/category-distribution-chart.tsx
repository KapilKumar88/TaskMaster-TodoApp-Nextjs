"use client"

import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"
import { BarChart } from "recharts"

export function CategoryDistributionChart() {
  const data = [
    { name: "Work", value: 10, color: "rgba(79, 70, 229, 0.8)" }, // Indigo
    { name: "Personal", value: 6, color: "rgba(139, 92, 246, 0.8)" }, // Violet
    { name: "Study", value: 5, color: "rgba(59, 130, 246, 0.8)" }, // Blue
    { name: "Health", value: 3, color: "rgba(20, 184, 166, 0.8)" }, // Teal
  ]

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className="h-[240px]">
      <BarChart accessibilityLayer data={data}>
        {/* <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} /> */}
        {/* <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} /> */}
      </BarChart>
      {/* <ChartContainer data={data} margin={{ top: 10, right: 10, bottom: 30, left: 10 }} className="h-full">
        <ChartGrid vertical={false} className="stroke-slate-300/50 dark:stroke-slate-700/50" />
        <ChartBar dataKey="value" radius={4} className="fill-current" nameKey="name" colorKey="color" />
        <ChartXAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "rgba(51, 65, 85, 0.8)" }} />
        <ChartYAxis tickLine={false} axisLine={false} tick={{ fill: "rgba(51, 65, 85, 0.8)" }} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="border-white/30 bg-white/80 backdrop-blur-xl text-slate-900"
              labelClassName="text-slate-900 font-medium"
            />
          }
        />
      </ChartContainer> */}
    </ChartContainer>
  )
}

