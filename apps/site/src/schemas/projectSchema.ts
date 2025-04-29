import { reference, type CollectionEntry } from 'astro:content';
import { z } from 'zod';

import { seoSchema } from './common/seoSchema';
import { carouselSchema } from './common/carouselSchema';
import { heroSchema } from './common/heroSchema';

const categorySchema = z.object({
    products: z.array(reference('products')).optional(),
    frameworks: z.array(reference('frameworks')).optional(),
    platforms: z.array(reference('platforms')).optional(),
    tags: z.array(reference('tags')).optional(),
});

export const projectSchema = z
    .object({
        title: z.string(),
        subtitle: z.string().optional(),
        date: z.string().optional(),
        draft: z.boolean().optional(),
        category: categorySchema.optional(),
        hero: heroSchema.optional(),
        carousel: carouselSchema.optional(),
        partners: z.array(reference('partners')).optional(),
        summary: z.string().optional(),
        description: z.string().optional(),
        seo: seoSchema.optional(),
    })
    .transform((data) => {
        if (!data.summary && data.description) {
            data.summary = data.description.slice(0, 200) + (data.description.length > 200 ? '...' : '');
        }
        return data;
    });

export type Project = z.infer<typeof projectSchema>;

// Infer the type of items after collection processing
export type ProjectCategory = CollectionEntry<'projects'>['data']['category'];
export type ProjectService = CollectionEntry<'projects'>['data']['category']['products'][number];
export type ProjectPlatform = CollectionEntry<'projects'>['data']['category']['platforms'][number];
export type ProjectTag = CollectionEntry<'projects'>['data']['category']['tags'][number];
export type ProjectFramework = CollectionEntry<'projects'>['data']['category']['frameworks'][number];

export type ProjectPartner = CollectionEntry<'projects'>['data']['partners'][number];
