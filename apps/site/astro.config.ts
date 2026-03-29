import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';

import { defaultConfig } from './src/config/defaultConfig';

// Workaround: Vite 7 Environment API registers @vite/env only in the "client"
// environment, but in pnpm monorepos Astro can process client.mjs in a context
// where that environment isn't active, so we register it manually.
function viteEnvPolyfill() {
    let config: { isProduction: boolean; mode: string; base: string };
    return {
        name: 'vite-env-polyfill' as const,
        enforce: 'pre' as const,
        configResolved(resolved: { isProduction: boolean; mode: string; base: string }) {
            config = resolved;
        },
        resolveId(id: string) {
            if (id === '@vite/env') return '\0vite-env-polyfill';
        },
        load(id: string) {
            if (id === '\0vite-env-polyfill') {
                const isProd = config.isProduction;
                return [
                    `export const MODE = ${JSON.stringify(config.mode)}`,
                    `export const BASE_URL = ${JSON.stringify(config.base)}`,
                    `export const PROD = ${isProd}`,
                    `export const DEV = ${!isProd}`,
                    `export const SSR = false`,
                    `export const LEGACY = false`,
                ].join('\n');
            }
        },
    };
}

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
        plugins: [viteEnvPolyfill(), tailwindcss()],
    },
});
