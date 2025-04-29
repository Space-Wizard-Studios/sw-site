import { getCollection } from 'astro:content';

import type { Product } from '@schemas/productSchema';

import { slugify } from '@lib/slugify';

export type ProcessedProduct = Product & {
    slug: string;
};

export async function getAllProducts(): Promise<ProcessedProduct[]> {
    const productEntries = await getCollection('products');

    const nonDraftProducts = productEntries.filter((product) => !product.data.draft);

    const processedProducts = nonDraftProducts.map((product) => {
        const processed: ProcessedProduct = {
            ...product.data,
            slug: slugify(product.data.title),
        };
        return processed;
    });

    processedProducts.sort((productA, productB) => {
        return productA.slug.localeCompare(productB.slug);
    });

    return processedProducts as ProcessedProduct[];
}
