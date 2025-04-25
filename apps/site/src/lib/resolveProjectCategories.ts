import { getCollection, type CollectionEntry } from 'astro:content';

import type { Product } from '@schemas/productSchema';
import type { Platform, Framework, Tag } from '@schemas/categorySchema';
import type { ProjectCategory } from '@schemas/projectSchema';

export interface ResolvedProduct extends Product {
    id: string;
}

export interface ResolvedPlatform extends Platform {
    id: string;
}

export interface ResolvedFramework extends Framework {
    id: string;
}

export interface ResolvedTag extends Tag {
    id: string;
}

export interface ResolvedCategories {
    products: ResolvedProduct[];
    platforms: ResolvedPlatform[];
    frameworks: ResolvedFramework[];
    tags: ResolvedTag[];
}

// Cache for pre-fetched categories entries
let productsMapCache: Map<string, CollectionEntry<'products'>['data']> | null = null;
let platformsMapCache: Map<string, CollectionEntry<'platforms'>['data']> | null = null;
let frameworksMapCache: Map<string, CollectionEntry<'frameworks'>['data']> | null = null;
let tagsMapCache: Map<string, CollectionEntry<'tags'>['data']> | null = null;

async function getProductsMap(): Promise<Map<string, CollectionEntry<'products'>['data']>> {
    if (productsMapCache) {
        return productsMapCache;
    }
    const entries = await getCollection('products');
    productsMapCache = new Map(entries.map((entry) => [entry.id, entry.data]));
    return productsMapCache;
}

async function getPlatformsMap(): Promise<Map<string, CollectionEntry<'platforms'>['data']>> {
    if (platformsMapCache) {
        return platformsMapCache;
    }
    const entries = await getCollection('platforms');
    platformsMapCache = new Map(entries.map((entry) => [entry.id, entry.data]));
    return platformsMapCache;
}

async function getFrameworksMap(): Promise<Map<string, CollectionEntry<'frameworks'>['data']>> {
    if (frameworksMapCache) {
        return frameworksMapCache;
    }
    const entries = await getCollection('frameworks');
    frameworksMapCache = new Map(entries.map((entry) => [entry.id, entry.data]));
    return frameworksMapCache;
}

async function getTagsMap(): Promise<Map<string, CollectionEntry<'tags'>['data']>> {
    if (tagsMapCache) {
        return tagsMapCache;
    }
    const entries = await getCollection('tags');
    tagsMapCache = new Map(entries.map((entry) => [entry.id, entry.data]));
    return tagsMapCache;
}

export async function resolveProjectCategories(category: ProjectCategory | undefined): Promise<ResolvedCategories> {
    if (!category) {
        return { products: [], platforms: [], frameworks: [], tags: [] };
    }

    const [productsMap, platformsMap, frameworksMap, tagsMap] = await Promise.all([
        getProductsMap(),
        getPlatformsMap(),
        getFrameworksMap(),
        getTagsMap(),
    ]);

    const resolvedProducts = Array.isArray(category.products)
        ? await Promise.all(
              category.products.map(async (item) => {
                  const id = typeof item === 'string' ? item : item.id;
                  const data = productsMap.get(id) || { title: id };
                  return {
                      ...data,
                      id,
                  };
              }),
          )
        : [];

    const resolvedPlatforms = Array.isArray(category.platforms)
        ? await Promise.all(
              category.platforms.map(async (item) => {
                  const id = typeof item === 'string' ? item : item.id;
                  const data = platformsMap.get(id) || { title: id };
                  return {
                      ...data,
                      id,
                  };
              }),
          )
        : [];

    const resolvedFrameworks = Array.isArray(category.frameworks)
        ? await Promise.all(
              category.frameworks.map(async (item) => {
                  const id = typeof item === 'string' ? item : item.id;
                  const data = frameworksMap.get(id) || { title: id };
                  return {
                      ...data,
                      id,
                  };
              }),
          )
        : [];

    const resolvedTags = Array.isArray(category.tags)
        ? await Promise.all(
              category.tags.map(async (item) => {
                  const id = typeof item === 'string' ? item : item.id;
                  return {
                      ...(tagsMap.get(id) || { title: id }),
                      id,
                  };
              }),
          )
        : [];

    // Sort arrays alphabetically by title
    const sortAlphabetically = (a: { title?: string; id: string }, b: { title?: string; id: string }) => {
        const titleA = a.title || a.id;
        const titleB = b.title || b.id;
        return titleA.localeCompare(titleB);
    };

    resolvedProducts.sort(sortAlphabetically);
    resolvedPlatforms.sort(sortAlphabetically);
    resolvedFrameworks.sort(sortAlphabetically);
    resolvedTags.sort(sortAlphabetically);

    return {
        products: resolvedProducts,
        platforms: resolvedPlatforms,
        frameworks: resolvedFrameworks,
        tags: resolvedTags,
    };
}