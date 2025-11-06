import { z } from "zod";

export const postSchema = z.object({
  content: z
    .string()
    .min(1, "Post content is required")
    .max(5000, "Post content must not exceed 5000 characters"),
  visibility: z.enum(["public", "friends", "only-me"]),
  tags: z.string().optional(),
  location: z.string().optional(),
  feeling: z.string().optional(),
});

export type PostFormData = z.infer<typeof postSchema>;

export const commentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment must not exceed 1000 characters"),
});

export type CommentFormData = z.infer<typeof commentSchema>;
