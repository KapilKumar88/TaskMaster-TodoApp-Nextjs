import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

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
