import { Gender } from "@/app/types/user.types.js";
import { z } from "zod";

export const userRegisterSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .trim()
      .min(3, "First name must be at least 3 characters")
      .max(20, "First name must be at most 20 characters")
      .regex(/^[A-Za-z]+$/, "First name must contain letters only"),

    lastName: z
      .string()
      .trim()
      .min(3, "Last name must be at least 3 characters")
      .max(20, "Last name must be at most 20 characters")
      .regex(/^[A-Za-z]+$/, "Last name must contain letters only"),

    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be at most 30 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ),

    email: z.email("Invalid email address").trim().toLowerCase(),

    password: z.string().min(8, "Password must be at least 8 characters"),

    phone: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),

    age: z.number().int().min(13, "Minimum age is 13").max(120, "Invalid age"),

    gender: z.enum(Object.values(Gender)).default(Gender.NOT_SPECIFIED),
  }),
});
