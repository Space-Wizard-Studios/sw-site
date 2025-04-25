import { type JSX } from 'react';
import type { IconProps } from 'types/iconProps';

import * as Socials from '@components/icons/Socials';

export const SocialIcons: Record<string, (props: IconProps) => JSX.Element> = {
    artstation: Socials.ArtStation,
    behance: Socials.Behance,
    github: Socials.GitHub,
    instagram: Socials.Instagram,
    imdb: Socials.IMDb,
    linkedin: Socials.LinkedIn,
    linktree: Socials.LinkTree,
    portfolio: Socials.Portfolio,
    soundcloud: Socials.SoundCloud,
    youtube: Socials.YouTube,
};

import * as Products from '@components/icons/Products';
import * as Platforms from '@components/icons/Platforms';
import * as Frameworks from '@components/icons/Frameworks';

// Games, Interactivity, Music, Systems

export const ProductIcons: Record<string, (props: IconProps) => JSX.Element> = {
    default: Products.Default,
    interatividade: Products.Interactivity,
    jogos_e_gamificação: Products.Games,
    música: Products.Music,
    sistemas_web_e_apps: Products.Systems,
};

// AR, Desktop, Mobile, VR, Web

export const PlatformIcons: Record<string, (props: IconProps) => JSX.Element> = {
    default: Platforms.Default,
    ar: Platforms.AR,
    desktop: Platforms.Desktop,
    mobile: Platforms.Mobile,
    vr: Platforms.VR,
    web: Platforms.Web,
};


// Astro, Blender, Figma, Firebase, Flutter, Godot, JavaScript, Meta, Next.js, React, Three.js, TypeScript, Unity

export const FrameworkIcons: Record<string, (props: IconProps) => JSX.Element> = {
    default: Frameworks.Default,
    ajax: Frameworks.Ajax,
    astro: Frameworks.Astro,
    blender: Frameworks.Blender,
    bling: Frameworks.Bling,
    bootstrap: Frameworks.Bootstrap,
    cakephp: Frameworks.CakePHP, // Corrected key from 'cake'
    decap_cms: Frameworks.DecapCMS, // Added
    elementor: Frameworks.Elementor, // Added
    figma: Frameworks.Figma,
    firebase: Frameworks.Firebase,
    flutter: Frameworks.Flutter,
    godot: Frameworks.Godot,
    javascript: Frameworks.JavaScript,
    jquery: Frameworks.JQuery, // Added
    meta: Frameworks.Meta,
    mysql: Frameworks.MySQL, // Added
    next_js: Frameworks.NextJS,
    react: Frameworks.React,
    static_cms: Frameworks.StaticCMS, // Added
    tailwind: Frameworks.Tailwind, // Added
    three_js: Frameworks.ThreeJS,
    typescript: Frameworks.TypeScript,
    unity: Frameworks.Unity,
    woocommerce: Frameworks.WooCommerce,
    wordpress: Frameworks.WordPress,
};