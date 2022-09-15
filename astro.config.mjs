import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  site: 'https://Space-Wizard-Studios.github.io',
  base: '/sw_site',
  output: 'static',
  integrations: [react(), mdx(), tailwind({
    config: {
      applyBaseStyles: false
    }
  }), partytown(), sitemap(), image()]
});
