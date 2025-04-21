import { getCollection, type CollectionEntry } from 'astro:content';

import { slugify } from '@helpers/slugify';

// Define the proper type for a project using the Zod schema
export type Project = CollectionEntry<'projects'>;

export type ProcessedProject = Project & {
    slug: string;
};

export async function getAllProjects(locale: string = '') {
    const allProjects = await getCollection('projects');

    return allProjects
        .map((project) => ({
            ...project,
            slug: slugify(project.data.title),
        }))
        .filter((project) => !project.data.draft)
        .sort((projectA, projectB) => {
            // Ordenação por slug
            // return projectA.slug.localeCompare(projectB.slug);

            // Ordenação por data
            const dateA = new Date(projectA.data.date).getTime();
            const dateB = new Date(projectB.data.date).getTime();
            return dateB - dateA;
        }) as ProcessedProject[];
}
