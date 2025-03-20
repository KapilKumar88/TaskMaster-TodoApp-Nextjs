import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";

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
