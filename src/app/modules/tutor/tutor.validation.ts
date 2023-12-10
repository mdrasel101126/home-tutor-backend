import { z } from "zod";
import { userRole } from "../user/user.constants";

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
    password: z.string({
      required_error: "Password is required",
    }),
    contactNo: z.string({
      required_error: "Contact No is required",
    }),
    division: z.string({
      required_error: "Division is requried",
    }),
    district: z.string({
      required_error: "District is requried",
    }),
    sallaryRange: z.string({
      required_error: "Salary Range is requried",
    }),

    tutionArea: z.array(
      z.string({
        required_error: "Tution area is required",
      })
    ),
    isAvailable: z.boolean().optional(),
    role: z.enum([...userRole] as [string, ...string[]]).optional(),

    description: z.string({
      required_error: "Description is required",
    }),
    educationQualification: z.string({
      required_error: "Education qualification is required",
    }),
    institutionName: z.string({
      required_error: "Education name is required",
    }),
    preferedClasses: z.array(
      z.string({
        required_error: "Tution area is required",
      })
    ),
    preferedSubjects: z.array(
      z.string({
        required_error: "Tution area is required",
      })
    ),
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
    password: z.string().optional(),
    contactNo: z.string().optional(),
    division: z.string().optional(),
    district: z.string().optional(),
    tutionArea: z.array(z.string()).optional(),
    isAvailable: z.boolean().optional(),
    description: z.string().optional(),
    sallaryRange: z.string().optional(),
    educationQualification: z.string().optional(),
    institutionName: z.string().optional(),
    preferedClasses: z.array(z.string()).optional(),
    preferedSubjects: z.array(z.string()).optional(),
    profileImg: z.string().optional(),
  }),
});

const loginTutorZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    }),
    password: z.string({
      required_error: "Passsword is required",
    }),
  }),
});

export const TutorValidation = {
  createTutorZodSchema,
  updateTutorZodSchema,
  loginTutorZodSchema,
};
