import { defineCollection } from 'astro:content';

import { projectSchema } from '@schemas/projectSchema';
import { policySchema } from '@schemas/policySchema';
import { teamSchema } from '@schemas/teamSchema';
import { socialSchema } from '@schemas/common/socialSchema'; // Import the social schema
import { platformSchema, tagSchema, frameworkSchema } from '@schemas/categorySchema';
import { productSchema } from '@schemas/productSchema';

const productsCollection = defineCollection({
    type: 'data',
    schema: productSchema,
});

const teamCollection = defineCollection({
    type: 'data',
    schema: teamSchema,
});

const socialsCollection = defineCollection({
    type: 'data',
    schema: socialSchema,
});

const policyCollection = defineCollection({
    type: 'content',
    schema: policySchema,
});

const projectsCollection = defineCollection({
    type: 'data',
    schema: projectSchema,
});

// Collections used for categories

const platformsCollection = defineCollection({
    type: 'data',
    schema: platformSchema,
});

const tagsCollection = defineCollection({
    type: 'data',
    schema: tagSchema,
});

const frameworksCollection = defineCollection({
    type: 'data',
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
