import { z } from "zod";

export const projectSchema = z.object({
    title: z.string(),
    draft: z.boolean().optional(),
    subtitle: z.string().optional(),
    summary: z.string().optional(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    frameworks: z.array(z.string()).optional(),
    date: z.string().optional(),
    hero: z
        .object({
            src: z.string(),
            title: z.string().optional(),
            alt: z.string().optional(),
        })
        .optional(),
    carousel: z
        .array(
            z.object({
                src: z.string(),
                title: z.string().optional(),
                alt: z.string().optional(),
            }),
        )
        .optional(),
    partners: z.array(z.string()).optional(),
    content: z.string().optional(),
    seo: z
        .object({
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
        })
        .optional(),
}).transform((data) => {
    if (!data.summary && data.content) {
        data.summary = data.content.slice(0, 200) + (data.content.length > 200 ? '...' : '');
    }
    return data;
});

export type Project = z.infer<typeof projectSchema>;
