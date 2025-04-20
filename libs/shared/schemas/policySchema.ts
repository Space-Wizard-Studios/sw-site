import { z } from "zod";

// Define schema for a single language version
export const policySchema = z.object({
    title: z.string(),
});
