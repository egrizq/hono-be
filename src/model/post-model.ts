import { z } from "zod";

export interface TypePost {
  title: string;
  content: string;
}

export const TypePostSchema = z.object({
  title: z.string(),
  content: z.string(),
});
