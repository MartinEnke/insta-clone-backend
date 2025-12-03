import { z } from "zod";

const createReelDtoSchema = z.object({
  video_url: z.string().url(),
  thumbnail_url: z.string().url(),
  caption: z.string().nullable().optional(),
  views: z.number().int().min(0).default(0),
});

const reelSchema = z.object({
  id: z.number(),
  video_url: z.string().url(),
  thumbnail_url: z.string().url(),
  caption: z.string().nullable(),
  views: z.number().int().min(0),
  created_at: z.string(), // DATETIME as string from SQLite
});

const reelsSchema = z.array(reelSchema);

type CreateReelDto = z.infer<typeof createReelDtoSchema>;
type Reel = z.infer<typeof reelSchema>;

export { createReelDtoSchema, reelSchema, reelsSchema };
export type { CreateReelDto, Reel };
