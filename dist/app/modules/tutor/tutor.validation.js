"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorValidation = void 0;
const zod_1 = require("zod");
const createTutorZodSchema = zod_1.z.object({
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
        description: zod_1.z.string({
            required_error: "Description is required",
        }),
        educationQualification: zod_1.z.string({
            required_error: "Education qualification is required",
        }),
        preferedClasses: zod_1.z.string({
            required_error: "preferedClasses is required",
        }),
        profileImg: zod_1.z.string().optional(),
    }),
});
const updateTutorZodSchema = zod_1.z.object({
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
        description: zod_1.z.string().optional(),
        educationQualification: zod_1.z.string().optional(),
        preferedClasses: zod_1.z.string().optional(),
        profileImg: zod_1.z.string().optional(),
    }),
});
exports.TutorValidation = {
    createTutorZodSchema,
    updateTutorZodSchema,
};
