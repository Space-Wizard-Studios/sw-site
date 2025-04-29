import { z } from 'zod';

export const heroSchema = z.object({
    src: z.string(),
    title: z.string().optional(),
    alt: z.string().optional()
});

export type Hero = z.infer<typeof heroSchema>;