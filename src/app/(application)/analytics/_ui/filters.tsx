"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Download } from "lucide-react";
import type { DateRange } from "react-day-picker";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

export default function AnalyticsFilter() {
  const router = useRouter();
  const [customDateRange, setCustomDateRange] = useState<DateRange | undefined>(
    {
      from: startOfWeek(new Date()),
      to: endOfWeek(new Date()),
    }
  );

  const [period, setPeriod] = useState<string>("weekly");

  useEffect(() => {
    let startDate = null;
    let endDate = null;
    const currentDate = new Date();
    if (period === "daily") {
      startDate = startOfDay(currentDate);
      endDate = endOfDay(currentDate);
      setCustomDateRange({
        from: startDate,
        to: endDate,
      });
    } else if (period === "weekly") {
      startDate = startOfWeek(currentDate);
      endDate = endOfWeek(currentDate);
      setCustomDateRange({
        from: startDate,
        to: endDate,
      });
    } else if (period === "monthly") {
      startDate = startOfMonth(currentDate);
      endDate = endOfMonth(currentDate);
      setCustomDateRange({
        from: startDate,
        to: endDate,
      });
    } else if (period === "yearly") {
      startDate = startOfYear(currentDate);
      endDate = endOfYear(currentDate);
      setCustomDateRange({
        from: startDate,
        to: endDate,
      });
    }

    if (startDate !== null && endDate !== null) {
      router.push(
        `/analytics?startDate=${encodeURIComponent(
          format(startDate, "yyyy-MM-dd")
        )}&endDate=${encodeURIComponent(format(endDate, "yyyy-MM-dd"))}`
      );
    }
  }, [period]);

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full sm:w-auto justify-start text-left font-normal border-white/30 bg-white/40",
              !customDateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {customDateRange?.from ? (
              customDateRange.to ? (
                <>
                  {format(customDateRange.from, "LLL dd, y")} -{" "}
                  {format(customDateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(customDateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-white/90 backdrop-blur-xl border-white/30"
          align="end"
        >
          {/* <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setCustomDateRange}
            numberOfMonths={1}
            className="bg-transparent md:hidden"
          /> */}
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={customDateRange?.from}
            selected={customDateRange}
            onSelect={setCustomDateRange}
            numberOfMonths={2}
            className="bg-transparent hidden md:block"
          />
          <Button className="hidden bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white sm:flex">
            Apply
          </Button>
        </PopoverContent>
      </Popover>

      <Select
        value={period}
        onValueChange={(value) => {
          setPeriod(value);
        }}
      >
        <SelectTrigger className="w-full sm:w-[180px] border-white/30 bg-white/40">
          <SelectValue placeholder="Select view" />
        </SelectTrigger>
        <SelectContent className="bg-white/90 backdrop-blur-xl border-white/30">
          <SelectItem value="daily">Daily</SelectItem>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
          <SelectItem value="yearly">Yearly</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" className="border-white/30 bg-white/40">
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
    </div>
  );
}
