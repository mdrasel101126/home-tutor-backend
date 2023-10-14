import { z } from "zod";

const createBookingZodSchema = z.object({
  body: z.object({
    user: z.string({
      required_error: "User is required",
    }),
    tutor: z.string({
      required_error: "Tutor is required",
    }),
  }),
});

export const BookingValidation = {
  createBookingZodSchema,
};
