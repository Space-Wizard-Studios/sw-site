import { z } from 'zod';

export const partnerSchema = z.object({
    title: z.string(),
    draft: z.boolean().optional(),
    url: z.string().optional(),
    logo: z.string().optional(),
});

export type Partner = z.infer<typeof partnerSchema>;
