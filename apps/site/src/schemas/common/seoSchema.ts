import { z } from 'zod';

export const seoSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    robots: z.object({
        noindex: z.boolean().optional(),
        nofollow: z.boolean().optional(),
    }),
    og: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        type: z.string().optional(),
        image: z.string().optional(),
    }),
});

export type Seo = z.infer<typeof seoSchema>;