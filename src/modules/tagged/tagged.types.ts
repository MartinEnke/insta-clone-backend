// src/modules/tagged/tagged.types.ts
import { z } from "zod";

const taggedPostSchema = z.object({
  id: z.number(),
  img_url: z.string().url(),
  caption: z.string().nullable(),
  tagged_by: z.string(),
  created_at: z.string(),
});

const createTaggedPostSchema = taggedPostSchema.omit({
  id: true,
  created_at: true,
});

type TaggedPost = z.infer<typeof taggedPostSchema>;
type CreateTaggedPostDto = z.infer<typeof createTaggedPostSchema>;

export { taggedPostSchema, createTaggedPostSchema };
export type { TaggedPost, CreateTaggedPostDto };
