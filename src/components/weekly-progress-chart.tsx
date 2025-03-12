"use client"

import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"
import { BarChart } from "recharts"

export function WeeklyProgressChart() {
  const data = [
    { day: "Mon", completed: 3, created: 5 },
    { day: "Tue", completed: 5, created: 4 },
    { day: "Wed", completed: 4, created: 6 },
    { day: "Thu", completed: 6, created: 3 },
    { day: "Fri", completed: 4, created: 5 },
    { day: "Sat", completed: 2, created: 1 },
    { day: "Sun", completed: 1, created: 2 },
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
      <BarChart accessibilityLayer data={data}></BarChart>
      {/* <ChartContainer data={data} margin={{ top: 10, right: 10, bottom: 30, left: 10 }} className="h-full">
        <ChartGrid vertical={false} className="stroke-slate-300/50 dark:stroke-slate-700/50" />
        <ChartXAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "rgba(51, 65, 85, 0.8)" }} />
        <ChartYAxis tickLine={false} axisLine={false} tick={{ fill: "rgba(51, 65, 85, 0.8)" }} />
        <ChartLine
          dataKey="completed"
          stroke="rgba(16, 185, 129, 0.8)" // Emerald
          strokeWidth={2}
          dot={{ fill: "rgba(16, 185, 129, 0.8)", r: 4 }}
          activeDot={{ r: 6, fill: "rgb(16, 185, 129)" }}
        />
        <ChartLine
          dataKey="created"
          stroke="rgba(79, 70, 229, 0.8)" // Indigo
          strokeWidth={2}
          dot={{ fill: "rgba(79, 70, 229, 0.8)", r: 4 }}
          activeDot={{ r: 6, fill: "rgb(79, 70, 229)" }}
        />
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

