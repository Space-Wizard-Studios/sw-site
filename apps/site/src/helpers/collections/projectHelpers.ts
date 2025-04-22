import { getCollection } from 'astro:content';
import type { Project } from '@schemas/projectSchema';

import { slugify } from '@helpers/slugify';

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
