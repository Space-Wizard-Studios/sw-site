import { defineCollection, z } from 'astro:content';

import { projectSchema } from '@shared';
import { policySchema } from '@shared';
import { teamSchema } from '@shared';

const projectsCollection = defineCollection({
    type: 'data',
    schema: projectSchema,
});

const policyCollection = defineCollection({
    schema: policySchema,
});

const teamCollection = defineCollection({
    schema: teamSchema,
});

export const collections = {
    projects: projectsCollection,
    policies: policyCollection,
    team: teamCollection,
};
