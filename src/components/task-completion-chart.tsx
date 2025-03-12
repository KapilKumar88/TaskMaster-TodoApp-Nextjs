"use client"
import { ChartConfig, ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function TaskCompletionChart() {
  const data = [
    { name: "Completed", value: 16, color: "rgb(16, 185, 129)" }, // Emerald
    { name: "In Progress", value: 5, color: "rgb(79, 70, 229)" }, // Indigo
    { name: "Overdue", value: 3, color: "rgb(239, 68, 68)" }, // Red
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
    // <Chart className="h-[240px]">
      <ChartContainer config={chartConfig}  className="h-full">
        <p>hello</p>
        {/* <ChartPie
          dataKey="value"
          nameKey="name"
          colorKey="color"
          className="fill-current"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          cornerRadius={5}
        /> */}
        {/* <ChartTooltip
          content={
            <ChartTooltipContent
              className="border-white/30 bg-white/80 backdrop-blur-xl text-slate-900"
              labelClassName="text-slate-900 font-medium"
            />
          }
        />
        <ChartLegend
          className="text-slate-700 dark:text-slate-300"
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        /> */}
      </ChartContainer>
    //</Chart> */}
  )
}

