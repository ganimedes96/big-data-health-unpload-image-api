import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3000),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  CLOUD_NAME: z.string(),
  API_KEY: z.string(),
  API_SECRET: z.string(),
  CLOUDINARY_BUCKET_PATH: z.string(),
});

export type Env = z.infer<typeof envSchema>;
