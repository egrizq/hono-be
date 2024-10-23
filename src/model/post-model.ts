import { z } from "zod";

export interface TypePost {
  title?: string;
  content?: string;
}

export const TypePostSchema = z
  .object({
    title: z.string().min(5, "Title must be at least 5 characters long"),
    content: z.string().min(5, "Content must be at least 5 characters long"),
  })
  .strict();

export const TypeUpdatePostSchema = z
  .object({
    title: z
      .string()
      .min(5, "Title must be at least 5 characters long")
      .optional(),
    content: z
      .string()
      .min(5, "Content must be at least 5 characters long")
      .optional(),
  })
  .strict();

export interface TypeReturnedUpdatedData {
  message: string;
  data: {
    id: number;
    title: string | null;
    content: string | null;
  };
}
