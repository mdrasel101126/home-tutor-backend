"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorValidation = void 0;
const zod_1 = require("zod");
const tutor_constant_1 = require("./tutor.constant");
const createTutorZodSchema = zod_1.z.object({
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
        gender: zod_1.z.enum([...tutor_constant_1.tutorGender], {
            required_error: 'gender is required',
        }),
        imgUrl: zod_1.z.string().optional(),
        qualification: zod_1.z.string({
            required_error: 'qualification is required',
        }),
        institution: zod_1.z.string({
            required_error: 'institution is required',
        }),
        group: zod_1.z.enum([...tutor_constant_1.tutorGroup], {
            required_error: 'group is required',
        }),
        subject: zod_1.z.string({
            required_error: 'subject is required',
        }),
        medium: zod_1.z.enum([...tutor_constant_1.tutorMedium], {
            required_error: 'medium is required',
        }),
        presentAddress: zod_1.z.string({
            required_error: 'presentAddress is required',
        }),
        expertIn: zod_1.z.array(zod_1.z.string(), {
            required_error: 'expertIn are required',
        }),
        expectedMinSalary: zod_1.z.number({
            required_error: 'expectedMinSalary is required',
        }),
        dayPerWeek: zod_1.z.number({
            required_error: 'dayPerWeek is required',
        }),
        preferredClass: zod_1.z
            .enum([...tutor_constant_1.tutorPreferredClass])
            .optional(),
        preferredArea: zod_1.z.string({
            required_error: 'preferredArea is required',
        }),
        preferredSubject: zod_1.z.string({
            required_error: 'preferredSubject is required',
        }),
        preferredMedium: zod_1.z.enum([...tutor_constant_1.tutorMedium], {
            required_error: 'medium is required',
        }),
        currentTuition: zod_1.z.number({
            required_error: 'currentTuition is required',
        }),
        maximumTuitionCapacity: zod_1.z.number({
            required_error: 'maximumTuitionCapacity is required',
        }),
        currentStatus: zod_1.z
            .enum([...tutor_constant_1.tutorCurrentStatus])
            .optional(),
    })
        .strict(),
});
const updateTutorZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        fullName: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.string().optional(),
        gender: zod_1.z.enum([...tutor_constant_1.tutorGender]).optional(),
        imgUrl: zod_1.z.string().optional(),
        qualification: zod_1.z.string().optional(),
        institution: zod_1.z.string().optional(),
        group: zod_1.z.enum([...tutor_constant_1.tutorGroup]).optional(),
        subject: zod_1.z.string().optional(),
        medium: zod_1.z.enum([...tutor_constant_1.tutorMedium]).optional(),
        presentAddress: zod_1.z.string().optional(),
        expertIn: zod_1.z.array(zod_1.z.string()).optional(),
        expectedMinSalary: zod_1.z.number().optional(),
        dayPerWeek: zod_1.z.number().optional(),
        preferredClass: zod_1.z
            .enum([...tutor_constant_1.tutorPreferredClass])
            .optional(),
        preferredArea: zod_1.z.string().optional(),
        preferredSubject: zod_1.z.string().optional(),
        preferredMedium: zod_1.z
            .enum([...tutor_constant_1.tutorMedium])
            .optional(),
        currentTuition: zod_1.z.number().optional(),
        maximumTuitionCapacity: zod_1.z.number().optional(),
        currentStatus: zod_1.z
            .enum([...tutor_constant_1.tutorCurrentStatus])
            .optional(),
    })
        .strict(),
});
const reviewTutorZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        review: zod_1.z.string({
            required_error: 'review is required',
        }),
        rating: zod_1.z.number({
            required_error: 'rating is required',
        }),
    })
        .strict(),
});
exports.TutorValidation = {
    createTutorZodSchema,
    updateTutorZodSchema,
    reviewTutorZodSchema,
};
