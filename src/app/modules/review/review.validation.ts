import { z } from "zod";

const createReviewZodSchema = z.object({
  body: z.object({
    review: z.string({
      required_error: "Review is required",
    }),
    user: z.string({
      required_error: "User is required",
    }),
    tutor: z.string({
      required_error: "Tutor is required",
    }),
  }),
});

export const ReviewValidation = {
  createReviewZodSchema,
};
