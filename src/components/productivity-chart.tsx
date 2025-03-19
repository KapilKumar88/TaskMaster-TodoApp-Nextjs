"use client"

import {
  Chart,
  ChartBar,
  ChartContainer,
  ChartGrid,
  ChartTooltip,
  ChartTooltipContent,
  ChartXAxis,
  ChartYAxis,
} from "@/components/ui/chart"

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
    <Chart className="h-[240px]">
      <ChartContainer data={data} margin={{ top: 10, right: 10, bottom: 30, left: 10 }} className="h-full">
        <ChartGrid vertical={false} className="stroke-slate-300/50 dark:stroke-slate-700/50" />
        <ChartBar dataKey="tasks" radius={4} className="fill-indigo-500/80" />
        <ChartXAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "rgba(51, 65, 85, 0.8)" }} />
        <ChartYAxis tickLine={false} axisLine={false} tick={{ fill: "rgba(51, 65, 85, 0.8)" }} />
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

