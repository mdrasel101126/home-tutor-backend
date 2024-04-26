"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const createBookingZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        tutorId: zod_1.z.string({
            required_error: 'tutorId is required',
        }),
        teachingStartDate: zod_1.z.string({
            required_error: 'teachingStartDate is required',
        }),
        message: zod_1.z
            .object({
            dayPerWeek: zod_1.z.number({
                required_error: 'dayPerWeek is required',
            }),
            teachingTime: zod_1.z.string({
                required_error: 'teachingTime is required',
            }),
            maxSalary: zod_1.z.number({
                required_error: 'maxSalary is required',
            }),
            location: zod_1.z.string({
                required_error: 'location is required',
            }),
            description: zod_1.z.string({
                required_error: 'description is required',
            }),
        })
            .strict(),
    })
        .strict(),
});
exports.BookingValidation = {
    createBookingZodSchema,
};
