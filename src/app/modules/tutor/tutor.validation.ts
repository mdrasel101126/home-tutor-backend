import { z } from 'zod';
import {
  tutorCurrentStatus,
  tutorGender,
  tutorGroup,
  tutorMedium,
  tutorPreferredClass,
} from './tutor.constant';

const createTutorZodSchema = z.object({
  body: z
    .object({
      fullName: z.string({
        required_error: 'fullName is required',
      }),
      email: z
        .string({
          required_error: 'email is required',
        })
        .email({ message: 'Invalid email format' }),
      phoneNumber: z.string({
        required_error: 'phoneNumber is required',
      }),
      password: z.string({
        required_error: 'password is required',
      }),
      gender: z.enum([...tutorGender] as [string, ...string[]], {
        required_error: 'gender is required',
      }),
      imgUrl: z.string().optional(),
      qualification: z.string({
        required_error: 'qualification is required',
      }),
      institution: z.string({
        required_error: 'institution is required',
      }),
      group: z.enum([...tutorGroup] as [string, ...string[]], {
        required_error: 'group is required',
      }),
      subject: z.string({
        required_error: 'subject is required',
      }),
      medium: z.enum([...tutorMedium] as [string, ...string[]], {
        required_error: 'medium is required',
      }),
      presentAddress: z.string({
        required_error: 'presentAddress is required',
      }),
      expertIn: z.array(z.string(), {
        required_error: 'expertIn are required',
      }),
      expectedMinSalary: z.number({
        required_error: 'expectedMinSalary is required',
      }),
      dayPerWeek: z.number({
        required_error: 'dayPerWeek is required',
      }),
      preferredClass: z
        .enum([...tutorPreferredClass] as [string, ...string[]])
        .optional(),
      preferredArea: z.string({
        required_error: 'preferredArea is required',
      }),
      preferredSubject: z.string({
        required_error: 'preferredSubject is required',
      }),
      preferredMedium: z.enum([...tutorMedium] as [string, ...string[]], {
        required_error: 'medium is required',
      }),
      currentTuition: z.number({
        required_error: 'currentTuition is required',
      }),
      maximumTuitionCapacity: z.number({
        required_error: 'maximumTuitionCapacity is required',
      }),
      currentStatus: z
        .enum([...tutorCurrentStatus] as [string, ...string[]])
        .optional(),
    })
    .strict(),
});

const updateTutorZodSchema = z.object({
  body: z
    .object({
      fullName: z.string().optional(),
      phoneNumber: z.string().optional(),
      gender: z.enum([...tutorGender] as [string, ...string[]]).optional(),
      imgUrl: z.string().optional(),
      qualification: z.string().optional(),
      institution: z.string().optional(),
      group: z.enum([...tutorGroup] as [string, ...string[]]).optional(),
      subject: z.string().optional(),
      medium: z.enum([...tutorMedium] as [string, ...string[]]).optional(),
      presentAddress: z.string().optional(),
      expertIn: z.array(z.string()).optional(),
      expectedMinSalary: z.number().optional(),
      dayPerWeek: z.number().optional(),
      preferredClass: z
        .enum([...tutorPreferredClass] as [string, ...string[]])
        .optional(),
      preferredArea: z.string().optional(),
      preferredSubject: z.string().optional(),
      preferredMedium: z
        .enum([...tutorMedium] as [string, ...string[]])
        .optional(),
      currentTuition: z.number().optional(),
      maximumTuitionCapacity: z.number().optional(),
      currentStatus: z
        .enum([...tutorCurrentStatus] as [string, ...string[]])
        .optional(),
    })
    .strict(),
});

const reviewTutorZodSchema = z.object({
  body: z
    .object({
      review: z.string({
        required_error: 'review is required',
      }),
      rating: z.number({
        required_error: 'rating is required',
      }),
    })
    .strict(),
});

export const TutorValidation = {
  createTutorZodSchema,
  updateTutorZodSchema,
  reviewTutorZodSchema,
};
