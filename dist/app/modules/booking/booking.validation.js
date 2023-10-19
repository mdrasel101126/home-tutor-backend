"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const createBookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string({
            required_error: "User is required",
        }),
        tutor: zod_1.z.string({
            required_error: "Tutor is required",
        }),
    }),
});
exports.BookingValidation = {
    createBookingZodSchema,
};
