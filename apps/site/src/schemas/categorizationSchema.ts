import { z } from "zod";

const badgeSchema = z.object({
    border: z.string().optional(),
    background: z.string().optional(),
    icon: z.string().optional(),
}).optional();

export const categorySchema = z.object({
    title: z.string(),
    draft: z.boolean().optional(),
    abbreviation: z.string(),
    // badge: badgeSchema,
});

export const frameworkSchema = z.object({
    title: z.string(),
    draft: z.boolean().optional(),
    // badge: badgeSchema,
});

export const tagSchema = z.object({
    title: z.string(),
    draft: z.boolean().optional(),
});

export type Category = z.infer<typeof categorySchema>;
export type Framework = z.infer<typeof frameworkSchema>;
export type Tag = z.infer<typeof tagSchema>;