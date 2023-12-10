"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorValidation = void 0;
const zod_1 = require("zod");
const user_constants_1 = require("../user/user.constants");
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
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
        contactNo: zod_1.z.string({
            required_error: "Contact No is required",
        }),
        division: zod_1.z.string({
            required_error: "Division is requried",
        }),
        district: zod_1.z.string({
            required_error: "District is requried",
        }),
        sallaryRange: zod_1.z.string({
            required_error: "Salary Range is requried",
        }),
        tutionArea: zod_1.z.array(zod_1.z.string({
            required_error: "Tution area is required",
        })),
        isAvailable: zod_1.z.boolean().optional(),
        role: zod_1.z.enum([...user_constants_1.userRole]).optional(),
        description: zod_1.z.string({
            required_error: "Description is required",
        }),
        educationQualification: zod_1.z.string({
            required_error: "Education qualification is required",
        }),
        institutionName: zod_1.z.string({
            required_error: "Education name is required",
        }),
        preferedClasses: zod_1.z.array(zod_1.z.string({
            required_error: "Tution area is required",
        })),
        preferedSubjects: zod_1.z.array(zod_1.z.string({
            required_error: "Tution area is required",
        })),
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
        password: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
        division: zod_1.z.string().optional(),
        district: zod_1.z.string().optional(),
        tutionArea: zod_1.z.array(zod_1.z.string()).optional(),
        isAvailable: zod_1.z.boolean().optional(),
        description: zod_1.z.string().optional(),
        sallaryRange: zod_1.z.string().optional(),
        educationQualification: zod_1.z.string().optional(),
        institutionName: zod_1.z.string().optional(),
        preferedClasses: zod_1.z.array(zod_1.z.string()).optional(),
        preferedSubjects: zod_1.z.array(zod_1.z.string()).optional(),
        profileImg: zod_1.z.string().optional(),
    }),
});
const loginTutorZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
        password: zod_1.z.string({
            required_error: "Passsword is required",
        }),
    }),
});
exports.TutorValidation = {
    createTutorZodSchema,
    updateTutorZodSchema,
    loginTutorZodSchema,
};
