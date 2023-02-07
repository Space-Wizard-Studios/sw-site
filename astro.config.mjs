import { defineConfig } from 'astro/config';

import NetlifyCMS from 'astro-netlify-cms';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';

import { SITE } from './src/config.mjs';

import ProjectCollection from '@collections/projects/ProjectCollection';
import PoliciesCollection from '@collections/policies/PoliciesCollection';

export default defineConfig({
	site: SITE.origin,
	base: SITE.basePathname,
	output: 'static',

	integrations: [
		react(),
		mdx(),
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
		sitemap(),
		partytown({
			config: {
				forward: ['dataLayer.push']
			},
		}),
		NetlifyCMS({
			config: {
				backend: {
					name: 'github',
					branch: 'main',
					repo: 'Space-Wizard-Studios/sw-site',
				},
				// Configure where our media assets are stored & served from
				media_folder: 'public/images/projects',
				public_folder: '/images/projects',
				// Configure the content collections
				collections: [
					ProjectCollection,
					PoliciesCollection,
				],
			},
		}),
	],

	vite: {
		build: {
			target: 'es2020',
		},
	},
});
