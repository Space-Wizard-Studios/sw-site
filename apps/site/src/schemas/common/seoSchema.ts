import { z } from 'zod';

export const seoSchema = z.object({
    title: z.string(),
    titleTemplate: z.string().optional(),
    titleDefault: z.string().optional(),
    canonical: z.string().optional(),
    description: z.string().optional(),
    robots: z.object({
        noindex: z.boolean().optional(),
        nofollow: z.boolean().optional(),
    }),
    og: z
        .object({
            title: z.string().optional(),
            description: z.string().optional(),
            type: z.string().optional(),
            image: z.string().optional(),
        })
        .optional(),
});

export type metaSEO = z.infer<typeof seoSchema>;
