import { Gender, Role, type IUser } from "@/app/types/user.types.js";
import mongoose, { Schema } from "mongoose";
import type { SchemaTypeOptions } from "mongoose";

const nameValidator: SchemaTypeOptions<string> = {
  type: String,
  required: [true, "Name is required"],
  minlength: [3, "Name must be at least 3 characters"],
  maxlength: [20, "Name must be at most 20 characters"],
  trim: true,
  match: [/^[A-Za-z]+$/, "Name must contain letters only"],
  set: (value: string) =>
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
};

const userSchema = new Schema<IUser>(
  {
    firstName: nameValidator,
    lastName: nameValidator,

    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    phone: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
      min: [18, "Minimum age is 18 years old"],
    },

    gender: {
      type: String,
      enum: Object.values(Gender),
      default: Gender.NOT_SPECIFIED,
    },

    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        const { _id, __v, password, ...user } = ret;

        return {
          id: _id.toString(),
          ...user,
        };
      },
    },
  },
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
