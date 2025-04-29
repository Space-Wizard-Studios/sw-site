import { z } from "zod";

export const policySchema = z.object({
    title: z.string(),
});

export type Policy = z.infer<typeof policySchema>;