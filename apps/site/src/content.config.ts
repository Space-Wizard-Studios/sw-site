import { defineCollection, z } from 'astro:content';

import { projectSchema } from '@schemas/projectSchema';
import { policySchema } from '@schemas/policySchema';

const projectsCollection = defineCollection({
    type: 'data',
    schema: projectSchema,
});

const policyCollection = defineCollection({
    schema: policySchema,
});

export const collections = {
    projects: projectsCollection,
    policies: policyCollection,
};
