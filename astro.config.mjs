import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';
import partytown from '@astrojs/partytown';

import legacy from '@vitejs/plugin-legacy'

import { SITE } from './src/config.mjs'

export default defineConfig({
	// site: SITE.origin,
	// base: SITE.basePathname,
	output: 'static',

	integrations: [
		react(),
		mdx(),
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
		image(),

		// SEO | Analytics
		sitemap(),
		partytown({
			config: { forward: ['dataLayer.push'] },
		}),
	],

	vite: {
		plugins: [
			legacy({
				targets: ['defaults', 'not IE 11']
			})
		]
	},
});
