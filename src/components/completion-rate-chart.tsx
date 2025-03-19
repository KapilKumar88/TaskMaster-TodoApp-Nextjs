"use client"

import {
  Chart,
  ChartContainer,
  ChartGrid,
  ChartLine,
  ChartTooltip,
  ChartTooltipContent,
  ChartXAxis,
  ChartYAxis,
} from "@/components/ui/chart"

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
    <Chart className="h-[240px]">
      <ChartContainer data={data} margin={{ top: 10, right: 10, bottom: 30, left: 10 }} className="h-full">
        <ChartGrid vertical={false} className="stroke-slate-300/50 dark:stroke-slate-700/50" />
        <ChartXAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "rgba(51, 65, 85, 0.8)" }} />
        <ChartYAxis tickLine={false} axisLine={false} tick={{ fill: "rgba(51, 65, 85, 0.8)" }} />
        <ChartLine
          dataKey="rate"
          stroke="rgba(16, 185, 129, 0.8)" // Emerald
          strokeWidth={2}
          dot={{ fill: "rgba(16, 185, 129, 0.8)", r: 4 }}
          activeDot={{ r: 6, fill: "rgb(16, 185, 129)" }}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="border-white/30 bg-white/80 backdrop-blur-xl text-slate-900"
              labelClassName="text-slate-900 font-medium"
            />
          }
        />
      </ChartContainer>
    </Chart>
  )
}

