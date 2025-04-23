import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import type { Project } from '@schemas/projectSchema';

import { slugify } from '@lib/slugify';
import { getImageMetadataByPath } from '@lib/getImageMetadataByPath';

type ProcessedProjectData = Omit<Project, 'hero'> & {
    slug: string;
    hero?: Omit<NonNullable<Project['hero']>, 'src'> & {
        src?: string | undefined;
    };
};

export type ProcessedProject = Omit<CollectionEntry<'projects'>, 'data'> & {
    data: ProcessedProjectData;
};

export async function getAllProjects(locale: string = ''): Promise<ProcessedProject[]> {
    const allProjects = await getCollection('projects');

    const nonDraftProjects = allProjects.filter((project) => !project.data.draft);

    const processedProjects = await Promise.all(
        nonDraftProjects.map(async (project) => {
            let processedHero: ProcessedProjectData['hero'] = undefined;
            let heroImageSrc: string | undefined = undefined;

            // needs to process the image
            if (project.data.hero?.src) {
                const heroImageMetadata = getImageMetadataByPath(project.data.hero.src);
                heroImageSrc = heroImageMetadata?.src ?? undefined;
                processedHero = {
                    ...project.data.hero,
                    src: heroImageSrc,
                };
            } else if (project.data.hero) {
                processedHero = {
                    ...project.data.hero, // spread other properties of the hero (alt, title)
                    src: undefined,
                };
            }

            // builds the processed data object
            const processedData: ProcessedProjectData = {
                ...project.data, // original data
                data: slugify(project.data.title), // add the custom slug
                hero: processedHero, // assign the processed hero object
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
        const dateA = new Date(projectA.data?.date ?? 0).getTime();
        const dateB = new Date(projectB.data?.date ?? 0).getTime();
        return dateB - dateA;
    });

    // console.log('[getAllProjects] processed projects:', processedProjects);

    return processedProjects;
}
