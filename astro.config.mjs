import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';

import { SITE } from './src/config.mjs';

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
	],

	vite: {
		build: {
			target: 'es2020',
		},
	},
});
