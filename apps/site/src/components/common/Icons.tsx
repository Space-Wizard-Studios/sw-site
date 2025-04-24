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
    interactivity: Products.Interactivity,
    games: Products.Games,
    music: Products.Music,
    systems: Products.Systems,
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
    astro: Frameworks.Astro,
    blender: Frameworks.Blender,
    bootstrap: Frameworks.Bootstrap,
    cake: Frameworks.CakePHP,
    figma: Frameworks.Figma,
    firebase: Frameworks.Firebase,
    flutter: Frameworks.Flutter,
    godot: Frameworks.Godot,
    javascript: Frameworks.JavaScript,
    meta: Frameworks.Meta,
    next_js: Frameworks.NextJS,
    react: Frameworks.React,
    three_js: Frameworks.ThreeJS,
    typescript: Frameworks.TypeScript,
    unity: Frameworks.Unity,
};