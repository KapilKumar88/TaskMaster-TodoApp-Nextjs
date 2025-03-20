import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { TaskPriority, TaskStatus } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateHashedValue = async (value: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(value, salt);
};

export const verifyHash = async (value: string, hash: string) => {
  return bcrypt.compare(value, hash);
};

export function capitalizeFirstLetters(words: string): string {
  return words
    .split(" ")
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function sendResponse({
  status = "success",
  statusCode = 200,
  message,
  data,
}: {
  status?: string;
  statusCode?: number;
  message: string;
  data?: unknown;
}) {
  const resSchema = { status, statusCode, message, data };
  return NextResponse.json(resSchema, { status: statusCode });
}

export const getPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case TaskPriority.HIGH:
      return "bg-red-500/80 hover:bg-red-500"
    case TaskPriority.MEDIUM:
      return "bg-amber-500/80 hover:bg-amber-500"
    case TaskPriority.LOW:
      return "bg-emerald-500/80 hover:bg-emerald-500"
  }
}

export const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.ACTIVE:
      return "bg-blue-500/80 hover:bg-blue-500"
    case TaskStatus.COMPLETED:
      return "bg-emerald-500/80 hover:bg-emerald-500"
    case TaskStatus.OVERDUE:
      return "bg-red-500/80 hover:bg-red-500"
  }
}
