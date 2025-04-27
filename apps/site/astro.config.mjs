import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';

import { defaultConfig } from './src/config/defaultConfig';

export default defineConfig({
    site: defaultConfig.origin,
    base: import.meta.env.VITE_BASE_PATH ?? '/',
    output: 'static',

    integrations: [
        react(),
        mdx(),
        sitemap(),
        partytown({
            config: {
                forward: ['dataLayer.push'],
            },
        }),
    ],

    vite: {
        plugins: [tailwindcss()],
    },
});
