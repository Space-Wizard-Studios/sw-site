import { getCollection } from 'astro:content';
import type { Project } from '@schemas/projectSchema';

import { slugify } from '@helpers/slugify';

export type ProcessedProject = Project & {
    slug: string;
};

export async function getAllProjects(locale: string = ''): Promise<ProcessedProject[]> {
    const allProjects = await getCollection('projects');

    const nonDraftProjects = allProjects.filter((project) => !project.data.draft);

    const processedProjects = nonDraftProjects.map((project) => {
        const processed: ProcessedProject = {
            ...project,
            slug: slugify(project.data.title),
        };
        return processed;
    });

    processedProjects.sort((projectA, projectB) => {
        // Ordenação por slug
        // return projectA.slug.localeCompare(projectB.slug);

        // Ordenação por data
        const dateA = new Date(projectA.data.date).getTime();
        const dateB = new Date(projectB.data.date).getTime();
        return dateB - dateA;
    });

    return processedProjects as ProcessedProject[];
}
