import { z } from "zod";
 
export const SignupSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First Name is required")
      .min(2, "First Name must be at least 2 characters"),
 
    lastName: z
      .string()
      .min(1, "Last Name is required")
      .min(2, "Last Name must be at least 2 characters"),
 
    email: z.string().min(1, "Email is required").email("Invalid email format"),
 
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /[A-Z]/,
        "Password must contain at least one uppercase letter (A-Z)"
      )
      .regex(
        /[a-z]/,
        "Password must contain at least one lowercase letter (a-z)"
      )
      .regex(/[0-9]/, "Password must contain at least one number (0-9)")
      .regex(
        /[@#$%^&*]/,
        "Password must contain at least one special symbol (@ # $ % ^ & *)"
      ),
 
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
 
export const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});
 
export const ForgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
});
 
export const OtpSchema = z.object({
  otp: z.string().min(4, "OTP is required").max(10, "OTP is too long"),
});
 
export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /[A-Z]/,
        "Password must contain at least one uppercase letter (A-Z)"
      )
      .regex(
        /[a-z]/,
        "Password must contain at least one lowercase letter (a-z)"
      )
      .regex(/[0-9]/, "Password must contain at least one number (0-9)")
      .regex(
        /[@#$%^&*]/,
        "Password must contain at least one special symbol (@ # $ % ^ & *)"
      ),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
 
export interface SignupForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}
 
export type LoginForm = z.infer<typeof LoginSchema>;
export type ForgotPasswordForm = z.infer<typeof ForgotPasswordSchema>;
export type OtpForm = z.infer<typeof OtpSchema>;
export type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;