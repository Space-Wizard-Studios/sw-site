import { z } from 'zod';

export const carouselSchema = z.array(
    z.object({
        src: z.string(),
        title: z.string().optional(),
        alt: z.string().optional(),
    }),
);

export type Carousel = z.infer<typeof carouselSchema>;