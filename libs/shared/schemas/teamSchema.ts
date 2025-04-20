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
    links: z
    .array(
        z.object({
            name: z.string(),
            url: z.string().url(),
            icon: z.string().optional(),
        })
    )
    .optional(),
    photoSrc: z.string().optional(),
});