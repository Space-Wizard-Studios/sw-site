import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

import { projectSchema } from '@schemas/projectSchema';
import { policySchema } from '@schemas/policySchema';
import { teamSchema } from '@schemas/teamSchema';
import { socialSchema } from '@schemas/common/socialSchema';
import { platformSchema, tagSchema, frameworkSchema } from '@schemas/categorySchema';
import { productSchema } from '@schemas/productSchema';

const productsCollection = defineCollection({
    loader: glob({ pattern: '**/[!_]*.yaml', base: 'src/content/products' }),
    schema: productSchema,
});

const teamCollection = defineCollection({
    loader: glob({ pattern: '**/[!_]*.yaml', base: 'src/content/team' }),
    schema: teamSchema,
});

const socialsCollection = defineCollection({
    loader: glob({ pattern: '**/[!_]*.yaml', base: 'src/content/socials' }),
    schema: socialSchema,
});

const policyCollection = defineCollection({
    loader: glob({ pattern: '**/*.md', base: 'src/content/policies' }),
    schema: policySchema,
});

const projectsCollection = defineCollection({
    loader: glob({ pattern: '**/[!_]*.yaml', base: 'src/content/projects' }),
    schema: projectSchema,
});

// Collections used for categories

const platformsCollection = defineCollection({
    loader: glob({ pattern: '**/[!_]*.yaml', base: 'src/content/platforms' }),
    schema: platformSchema,
});

const tagsCollection = defineCollection({
    loader: glob({ pattern: '**/[!_]*.yaml', base: 'src/content/tags' }),
    schema: tagSchema,
});

const frameworksCollection = defineCollection({
    loader: glob({ pattern: '**/[!_]*.yaml', base: 'src/content/frameworks' }),
    schema: frameworkSchema,
});

export const collections = {
    products: productsCollection,

    team: teamCollection,
    socials: socialsCollection,

    policies: policyCollection,

    projects: projectsCollection,

    // Categories
    platforms: platformsCollection,
    tags: tagsCollection,
    frameworks: frameworksCollection,
};
