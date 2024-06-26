import { z } from 'zod';
import { userRoles } from './user.constant';

const createUserZodSchema = z.object({
  body: z
    .object({
      fullName: z.string({
        required_error: 'fullName is required',
      }),
      email: z
        .string({
          required_error: 'email is required',
        })
        .email({ message: 'Invalid email format' }),
      phoneNumber: z.string({
        required_error: 'phoneNumber is required',
      }),
      password: z.string({
        required_error: 'password is required',
      }),
    })
    .strict(),
});

const updateUserZodSchema = z.object({
  body: z
    .object({
      fullName: z.string().optional(),
      phoneNumber: z.string().optional(),
    })
    .strict(),
});

const changePasswordZodSchema = z.object({
  body: z
    .object({
      oldPassword: z.string({
        required_error: 'Old password is required',
      }),
      newPassword: z.string({
        required_error: 'New password is required',
      }),
    })
    .strict(),
});

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
<<<<<<< HEAD
    role: z.enum([...userRole] as [string, ...string[]]).optional(),
    password: z.string({
      required_error: "Passsword is required",
    }),
    profileImg: z.string().optional(),
    customer: z.object(
      {
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
        division: z.string({
          required_error: "Division is required",
        }),
        district: z.string({
          required_error: "District is required",
        }),
        policeStation: z.string({
          required_error: "Police Station is required",
        }),
        contactNo: z.string({
          required_error: "Contact No is required",
        }),
        profileImg: z.string().optional(),
      },
      {
        required_error: "Customer is Reequired",
      }
    ),
  }),
});
const createAdminZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    }),
    role: z.enum([...userRole] as [string, ...string[]]).optional(),
    password: z.string({
      required_error: "Passsword is required",
    }),
    profileImg: z.string().optional(),
    admin: z.object(
      {
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
        division: z.string({
          required_error: "Division is required",
        }),
        district: z.string({
          required_error: "District is required",
        }),
        policeStation: z.string({
          required_error: "Police Station is required",
        }),
        contactNo: z.string({
          required_error: "Contact No is required",
        }),
        profileImg: z.string().optional(),
      },
      {
        required_error: "Admin is Reequired",
      }
    ),
  }),
});

const createTutorZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
    profileImg: z.string().optional(),
    tutor: z.object(
      {
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
        contactNo: z.string({
          required_error: "Contact No is required",
        }),
        division: z.string({
          required_error: "Division is requried",
        }),
        district: z.string({
          required_error: "District is requried",
        }),
        policeStation: z.string({
          required_error: "Police station is requried",
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
      },
      {
        required_error: "Tutor is required",
      }
    ),
  }),
=======
  }),
});

const changeRoleZodSchema = z.object({
  body: z
    .object({
      role: z.enum([...userRoles] as [string, ...string[]], {
        required_error: 'role is required',
      }),
    })
    .strict(),
>>>>>>> 3ed703440065482e8dcc4c18cd46ffab1b180ede
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
  changePasswordZodSchema,
  changeRoleZodSchema,
};
