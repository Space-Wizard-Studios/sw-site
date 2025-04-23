import { getCollection, type CollectionEntry } from 'astro:content';

import { slugify } from '@lib/slugify';

export type Category = CollectionEntry<'categories'>;
export type Tag = CollectionEntry<'tags'>;
export type Framework = CollectionEntry<'frameworks'>;

// export type ProcessedCategorization = Project & {
//     slug: string;
// };

// export async function getAllProjects(locale: string = '') {

// }
