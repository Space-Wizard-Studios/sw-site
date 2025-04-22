import { z } from "zod";

export const socialSchema = z.object({
    title: z.string(),
    draft: z.boolean().optional(),
    // icon: z.string().optional(),
});

export type Social = z.infer<typeof socialSchema>;