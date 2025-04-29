import { z } from "zod";

export const productSchema = z.object({
    title: z.string(),
    draft: z.boolean().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
});

export type Product = z.infer<typeof productSchema>;