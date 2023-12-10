"use strict";
/* import { z } from "zod";
import { userRole } from "./customer.constants";

const createUserZodSchema = z.object({
  body: z.object({
    name: z.object(
      {
        firstName: z.string({
          required_error: "First names is required",
        }),
        lastName: z.string({
          required_error: "Last name is required",
        }),
      },
      {
        required_error: "Name is required",
      }
    ),
    email: z.string({
      required_error: "Email is required",
    }),
    address: z.string({
      required_error: "Address is requried",
    }),
    contactNo: z.string({
      required_error: "Contact No is required",
    }),
    profileImg: z.string().optional(),
    role: z.enum([...userRole] as [string, ...string[]]).optional(),
    password: z.string({
      required_error: "Passsword is required",
    }),
  }),
});
const updateUserZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    email: z.string().optional(),
    address: z.string().optional(),
    contactNo: z.string().optional(),
    profileImg: z.string().optional(),
    role: z.enum([...userRole] as [string, ...string[]]).optional(),
    password: z.string().optional(),
  }),
});
const loginUserZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    }),
    password: z.string({
      required_error: "Passsword is required",
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
  loginUserZodSchema,
}; */
