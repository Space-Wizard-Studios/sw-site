import { defineCollection, z } from 'astro:content';

import { projectSchema } from '@schemas/projectSchema';
import { policySchema } from '@schemas/policySchema';
import { teamSchema } from '@schemas/teamSchema';
import { socialSchema } from '@schemas/socialSchema'; // Import the social schema
import { categorySchema, tagSchema, frameworkSchema } from '@schemas/categorizationSchema';

const projectsCollection = defineCollection({
    type: 'data',
    schema: projectSchema,
});

const policyCollection = defineCollection({
    type: 'content',
    schema: policySchema,
});

const teamCollection = defineCollection({
    type: 'data',
    schema: teamSchema,
});

const categoriesCollection = defineCollection({
    type: 'data',
    schema: categorySchema,
});

const tagsCollection = defineCollection({
    type: 'data',
    schema: tagSchema,
});

const frameworksCollection = defineCollection({
    type: 'data',
    schema: frameworkSchema,
});

const socialsCollection = defineCollection({
    type: 'data',
    schema: socialSchema,
});

export const collections = {
    projects: projectsCollection,
    policies: policyCollection,
    team: teamCollection,
    socials: socialsCollection,
    categories: categoriesCollection,
    tags: tagsCollection,
    frameworks: frameworksCollection,
};