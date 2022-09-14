import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx(), tailwind(), partytown(), sitemap()]
});