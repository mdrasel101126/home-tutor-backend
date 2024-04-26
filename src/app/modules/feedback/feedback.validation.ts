import { z } from 'zod';

const createFeedbackZodSchema = z.object({
  body: z
    .object({
      feedback: z.string({
        required_error: 'feedback is required.',
      }),
    })
    .strict(),
});

export const FeedbackValidation = {
  createFeedbackZodSchema,
};
