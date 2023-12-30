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
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
  changePasswordZodSchema,
  changeRoleZodSchema,
};
