import { reference, type CollectionEntry } from "astro:content";
import { z } from "zod";

// Define schema for a single language version
export const teamSchema = z.object({
    name: z.string(),
    draft: z.boolean().optional(),
    roles: z.array(z.string()).optional(),
    skills: z
        .array(
            z.object({
                name: z.string(),
                tooltip: z.string().optional(),
            }),
        )
        .optional(),
    socials: z.array(
        z.lazy(() => z.object({
            type: reference('socials'),
            url: z.string().url(),
        }))
    )
    .optional(),
    image: z.object({
        src: z.string(),
        alt: z.string().optional(),
    }).optional(),
});

export type TeamMember = z.infer<typeof teamSchema>;

// Infer the type of a single social link item *after* collection processing
// Access the 'socials' array type from the resolved CollectionEntry data,
// then get the element type using [number]
export type TeamMemberSocial = CollectionEntry<'team'>['data']['socials'][number];