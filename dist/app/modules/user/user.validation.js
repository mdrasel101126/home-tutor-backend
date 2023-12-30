"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        fullName: zod_1.z.string({
            required_error: 'fullName is required',
        }),
        email: zod_1.z
            .string({
            required_error: 'email is required',
        })
            .email({ message: 'Invalid email format' }),
        phoneNumber: zod_1.z.string({
            required_error: 'phoneNumber is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
    })
        .strict(),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        fullName: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.string().optional(),
    })
        .strict(),
});
const changePasswordZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        oldPassword: zod_1.z.string({
            required_error: 'Old password is required',
        }),
        newPassword: zod_1.z.string({
            required_error: 'New password is required',
        }),
    })
        .strict(),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
const changeRoleZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        role: zod_1.z.enum([...user_constant_1.userRoles], {
            required_error: 'role is required',
        }),
    })
        .strict(),
});
exports.UserValidation = {
    createUserZodSchema,
    updateUserZodSchema,
    loginZodSchema,
    refreshTokenZodSchema,
    changePasswordZodSchema,
    changeRoleZodSchema,
};
