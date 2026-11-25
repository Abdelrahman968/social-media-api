import type { userRegisterSchema } from "@/app/module/auth/auth.zod.js";
import type { z } from "zod";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  NOT_SPECIFIED = "N/A",
}

export enum Role {
  BAN = "BAN",
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  age: number;
  gender: Gender;
  role: Role;
  isActive: boolean;
}

export type CreateUserDTO = z.infer<typeof userRegisterSchema>["body"];
