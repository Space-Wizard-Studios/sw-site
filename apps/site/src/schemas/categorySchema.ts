import { z } from 'zod';

const badgeSchema = z
    .object({
        border: z.string().optional(),
        background: z.string().optional(),
    })
    .optional();

export const platformSchema = z.object({
    title: z.string(),
    draft: z.boolean().optional(),
    abbreviation: z.string().optional(),
    badge: badgeSchema,
});

export const frameworkSchema = z.object({
    title: z.string(),
    draft: z.boolean().optional(),
    badge: badgeSchema,
});

export const tagSchema = z.object({
    title: z.string(),
    draft: z.boolean().optional(),
});

export type Platform = z.infer<typeof platformSchema>;
export type Framework = z.infer<typeof frameworkSchema>;
export type Tag = z.infer<typeof tagSchema>;
export type Badge = z.infer<typeof badgeSchema>;

export type Category = Platform | Framework | Tag;