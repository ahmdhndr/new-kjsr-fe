import { z } from "zod";

import { ContentNode } from "@/shared/interfaces/article.interface";

export const markSchema = z
  .object({
    type: z.string(),
    attrs: z.record(z.any()).optional(),
  })
  .passthrough();

export const contentNodeSchema: z.ZodType<ContentNode> = z
  .object({
    type: z.string().optional(),
    attrs: z.record(z.union([z.string(), z.number()])).optional(),
    content: z.lazy(() => z.array(contentNodeSchema)).optional(),
    text: z.string().optional(),
  })
  .passthrough();

export const articleSchema = z.object({
  title: z
    .string({ message: "property `title` is missing" })
    .nonempty("Name cannot be empty"),
  coverUrl: z.string({ message: "property `coverUrl` is missing" }).nullable(),
  coverPath: z.string(),
  categories: z.array(z.string()).default([]),
  content: z
    .object({
      type: z.string().optional(),
      content: z.array(contentNodeSchema).optional(),
    })
    .nullable()
    .default(null)
    .optional(),
});

export type ArticleDto = z.infer<typeof articleSchema>;

export type ArticleWithId = ArticleDto & { id?: string };
