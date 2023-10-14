import { z } from "zod";

const createTutorZodSchema = z.object({
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
    description: z.string({
      required_error: "Description is required",
    }),
    educationQualification: z.string({
      required_error: "Education qualification is required",
    }),
    preferedClasses: z.string({
      required_error: "preferedClasses is required",
    }),
    profileImg: z.string().optional(),
  }),
});
const updateTutorZodSchema = z.object({
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
    description: z.string().optional(),
    educationQualification: z.string().optional(),
    preferedClasses: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

export const TutorValidation = {
  createTutorZodSchema,
  updateTutorZodSchema,
};
