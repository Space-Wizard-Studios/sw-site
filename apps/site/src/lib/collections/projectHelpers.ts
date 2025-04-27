import { getCollection, type CollectionEntry } from 'astro:content';
import type { Project } from '@schemas/projectSchema';

import { slugify } from '@lib/slugify';
import { getImageMetadataByPath } from '@lib/getImageMetadataByPath';

import {
    resolveProjectCategories,
    type ResolvedProduct,
    type ResolvedPlatform,
    type ResolvedFramework,
    type ResolvedTag,
} from '../resolveProjectCategories';

type ProcessedProjectData = Omit<Project, 'hero' | 'category'> & {
    slug: string;
    hero?: Omit<NonNullable<Project['hero']>, 'src'> & {
        src?: string | undefined;
    };
    category?: {
        products: ResolvedProduct[];
        platforms: ResolvedPlatform[];
        frameworks: ResolvedFramework[];
        tags: ResolvedTag[];
    };
};

export type ProcessedProject = Omit<CollectionEntry<'projects'>, 'data'> & {
    data: ProcessedProjectData;
};

export async function getAllProjects(): Promise<ProcessedProject[]> {
    const allProjects = await getCollection('projects');

    const nonDraftProjects = allProjects.filter((project) => !project.data.draft);

    const processedProjects = await Promise.all(
        nonDraftProjects.map(async (project) => {
            let processedHero: ProcessedProjectData['hero'] = undefined;
            let heroImageSrc: string | undefined = undefined;

            // Process the hero image
            if (project.data.hero?.src) {
                const heroImageMetadata = getImageMetadataByPath(project.data.hero.src);
                heroImageSrc = heroImageMetadata?.src ?? undefined;
                processedHero = {
                    ...project.data.hero,
                    src: heroImageSrc,
                };
            } else if (project.data.hero) {
                processedHero = {
                    ...project.data.hero,
                    src: undefined,
                };
            }

            const resolvedCategories = await resolveProjectCategories(project.data.category);

            // Extract properties from project data
            const { hero, category, ...otherData } = project.data;

            // builds the processed data object
            const processedData: ProcessedProjectData = {
                ...otherData,
                slug: slugify(project.data.title),
                hero: processedHero,
                category: resolvedCategories, // Use the resolved categories
            };

            // build the processed project
            const processedProject: ProcessedProject = {
                ...project,
                data: processedData,
            };

            return processedProject;
        }),
    );

    processedProjects.sort((projectA, projectB) => {
        const dateA = projectA.data.date ? new Date(projectA.data.date).getTime() : 0;
        const dateB = projectB.data.date ? new Date(projectB.data.date).getTime() : 0;
        return dateB - dateA;
    });

    return processedProjects;
}
