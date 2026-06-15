import { email, object, string } from 'zod';

export const loginSchema = object({
  email: email('Invalid email').trim().min(1, 'Email is required'),
  password: string({ error: 'Password is required' })
    .trim()
    .min(1, 'Password is required'),
});

export const registerSchema = object({
  email: email('Invalid email')
    .trim()
    .min(1, 'Email is required')
    .default('Invalid Email'),
  fullName: string({ error: 'Full Name is required' })
    .trim()
    .min(1, 'Full Name is required'),
  password: string({ error: 'Password is required' })
    .trim()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  confirmPassword: string({ error: 'Confirm Password is required' })
    .trim()
    .min(1, 'Confirm Password is required')
    .min(8, 'Confirm Password must be more than 8 characters')
    .max(32, 'Confirm Password must be less than 32 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const forgotPasswordSchema = object({
  email: email('Invalid email')
    .trim()
    .min(1, 'Email is required')
    .default('Invalid Email'),
});

export const resetPasswordSchema = object({
  token: string({
    error: 'Token is required',
    message: 'Token is required',
  })
    .trim()
    .min(1, 'Token is required'),
  password: string({ error: 'Password is required' })
    .trim()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  confirmPassword: string({ error: 'Confirm Password is required' })
    .trim()
    .min(1, 'Confirm Password is required')
    .min(8, 'Confirm Password must be more than 8 characters')
    .max(32, 'Confirm Password must be less than 32 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const changePasswordSchema = object({
  currentPassword: string({ error: 'Confirm Password is required' })
    .trim()
    .min(1, 'Confirm Password is required'),
  newPassword: string({ error: 'Password is required' })
    .trim()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  confirmPassword: string({ error: 'Confirm Password is required' })
    .trim()
    .min(1, 'Confirm Password is required')
    .min(8, 'Confirm Password must be more than 8 characters')
    .max(32, 'Confirm Password must be less than 32 characters'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});
