"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constants_1 = require("./user.constants");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "First names is required",
            }),
            lastName: zod_1.z.string({
                required_error: "Last name is required",
            }),
        }, {
            required_error: "Name is required",
        }),
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
        address: zod_1.z.string({
            required_error: "Address is requried",
        }),
        contactNo: zod_1.z.string({
            required_error: "Contact No is required",
        }),
        profileImg: zod_1.z.string().optional(),
        role: zod_1.z.enum([...user_constants_1.userRole]).optional(),
        password: zod_1.z.string({
            required_error: "Passsword is required",
        }),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        })
            .optional(),
        email: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
        profileImg: zod_1.z.string().optional(),
        role: zod_1.z.enum([...user_constants_1.userRole]).optional(),
        password: zod_1.z.string().optional(),
    }),
});
const loginUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
        password: zod_1.z.string({
            required_error: "Passsword is required",
        }),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
    updateUserZodSchema,
    loginUserZodSchema,
};
