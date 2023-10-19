"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const createReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        review: zod_1.z.string({
            required_error: "Review is required",
        }),
        user: zod_1.z.string({
            required_error: "User is required",
        }),
        tutor: zod_1.z.string({
            required_error: "Tutor is required",
        }),
    }),
});
exports.ReviewValidation = {
    createReviewZodSchema,
};
