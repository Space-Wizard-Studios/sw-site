import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

import image from '@astrojs/image';

// https://astro.build/config
export default defineConfig({
	site: 'https://Space-Wizard-Studios.github.io',
	base: '/',
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
		image(),
	],
});
