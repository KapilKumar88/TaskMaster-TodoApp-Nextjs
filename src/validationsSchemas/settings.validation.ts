import { TimeFrequency, WeekStartDay } from "@prisma/client";
import z, { object } from "zod";

export const generalTaskSchema = object({
  timeZone: z
    .string({ required_error: "Time Zone is required" })
    .trim()
    .min(1, "Time Zone required")
    .default("Time Zone is required"),
  dateFormat: z
    .string({ required_error: "Date Format is required" })
    .trim()
    .min(1, "Date Format is required"),
  weekStartDay: z.enum(
    [WeekStartDay.monday, WeekStartDay.sunday, WeekStartDay.saturday],
    {
      message: "Week Start Day is required",
    }
  ),
  autoArchive: z.boolean({ message: "Auto Archive is required" }),
  autoArchiveTime: z
    .number({ message: "Auto Archive Time is required" })
    .min(1)
    .optional(),
  timeFrequency: z
    .enum([TimeFrequency.day, TimeFrequency.hour, TimeFrequency.min], {
      message: "Time Frequency is required",
    })
    .optional(),
}).refine(
  (data) => {
    if (data.autoArchive) {
      return !(
        data.autoArchiveTime === undefined || data.timeFrequency === undefined
      );
    }
    return true;
  },
  {
    message: "Auto Archive Time is required and must be at least 1 day",
    path: ["autoArchiveTime"],
  }
);
