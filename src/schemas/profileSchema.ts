import { z } from "zod";

export const profileEditSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  bio: z.string().max(500, "Bio must not exceed 500 characters").optional(),
  location: z
    .string()
    .max(100, "Location must not exceed 100 characters")
    .optional(),
  website: z.string().url("Invalid URL format").optional().or(z.literal("")),
  phone: z
    .string()
    .regex(/^[0-9+\s-()]*$/, "Invalid phone number format")
    .optional()
    .or(z.literal("")),
  dateOfBirth: z.string().optional(),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"]).optional(),
  currentCity: z
    .string()
    .max(100, "City name must not exceed 100 characters")
    .optional(),
  hometown: z
    .string()
    .max(100, "Hometown must not exceed 100 characters")
    .optional(),
  relationshipStatus: z
    .enum([
      "single",
      "in-relationship",
      "married",
      "complicated",
      "prefer-not-to-say",
    ])
    .optional(),
  education: z
    .string()
    .max(200, "Education must not exceed 200 characters")
    .optional(),
  work: z
    .string()
    .max(200, "Work information must not exceed 200 characters")
    .optional(),
});

export type ProfileEditFormData = z.infer<typeof profileEditSchema>;
