import { object, string } from "zod";

export const loginSchema = object({
  email: string({ required_error: "Email is required" })
    .trim()
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .trim()
    .min(1, "Password is required"),
});

export const registerSchema = object({
  email: string({ required_error: "Email is required" })
    .trim()
    .min(1, "Email is required")
    .email("Invalid email")
    .default("Invalid Email"),
  fullName: string({ required_error: "Full Name is required" })
    .trim()
    .min(1, "Full Name is required"),
  password: string({ required_error: "Password is required" })
    .trim()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  confirmPassword: string({ required_error: "Confirm Password is required" })
    .trim()
    .min(1, "Confirm Password is required")
    .min(8, "Confirm Password must be more than 8 characters")
    .max(32, "Confirm Password must be less than 32 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});

export const changePasswordSchema = object({
  currentPassword: string({ required_error: "Confirm Password is required" })
    .trim()
    .min(1, "Confirm Password is required"),
  newPassword: string({ required_error: "Password is required" })
    .trim()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  confirmPassword: string({ required_error: "Confirm Password is required" })
    .trim()
    .min(1, "Confirm Password is required")
    .min(8, "Confirm Password must be more than 8 characters")
    .max(32, "Confirm Password must be less than 32 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});
