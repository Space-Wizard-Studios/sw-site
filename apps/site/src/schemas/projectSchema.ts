import { z } from 'astro:content';

// title:
// subtitle:
// description:
// category:
// tags: []
// date: ''
// hero:
//     src: ''
//     title: ''
//     alt: ''
// carousel: []
// partners: []
// content: ''

// Define schema for a single language version
export const projectSchema = z
    .object({
        title: z.string(),
        draft: z.boolean().optional(),
        subtitle: z.string().optional(),
        summary: z.string().optional(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        date: z.string().optional(),
        hero: z
            .object({
                src: z.string(),
                title: z.string(),
                alt: z.string(),
            })
            .optional(),
        carousel: z
            .array(
                z.object({
                    src: z.string(),
                    title: z.string(),
                    alt: z.string(),
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
                    noindex: z.boolean(),
                    nofollow: z.boolean(),
                }),
                og: z.object({
                    title: z.string().optional(),
                    description: z.string().optional(),
                    type: z.string().optional(),
                    image: z.string().optional(),
                }),
            })
            .optional(),
    })
    .transform((data) => {
        if (!data.summary && data.content) {
            data.summary = data.content.slice(0, 150) + (data.content.length > 150 ? '...' : '');
        }
        return data;
    });
