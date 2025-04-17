import { getCollection, type CollectionEntry } from 'astro:content';
import type { z } from 'astro:content';

import { slugify } from '@helpers/slugify';
import { projectSchema } from '@schemas/projectSchema';

// Define the proper type for a project using the Zod schema
export type Project = CollectionEntry<'projects'>;

export type ProcessedProject = Project & {
    slug: string;
};

export async function getAllProjects(locale: string = '') {
    const allProjects = await getCollection('projects');
    // console.log('All Projects:', allProjects);

    // if (allProjects.length > 0) {
    //     console.log('Raw project data:', JSON.stringify(allProjects[0].data, null, 2));
    // }

    return allProjects
        .map((project: Project) => ({
            ...project,
            slug: slugify(project.data.title),
        }))
        .filter((project: Project) => !project.data.draft)
        .sort((projectA: Project, projectB: Project) => {
            const dateA = new Date(projectA.data.date).getTime();
            const dateB = new Date(projectB.data.date).getTime();
            return dateB - dateA;
        }) as ProcessedProject[];
}
