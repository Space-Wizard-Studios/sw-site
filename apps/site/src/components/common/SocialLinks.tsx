import { type JSX } from 'react';
import type { IconProps } from 'types/iconProps';
import type { CollectionEntry } from 'astro:content';

import {
    ArtStation,
    Behance,
    GitHub,
    Instagram,
    IMDb,
    LinkedIn,
    LinkTree,
    Portfolio,
    SoundCloud,
    YouTube,
} from '@icons/Socials';

export type SocialLinkItem = {
    type: CollectionEntry<'socials'>['id'];
    title: string;
    url: string;
};

export const Socials: Record<string, (props: IconProps) => JSX.Element> = {
    artstation: ArtStation,
    behance: Behance,
    github: GitHub,
    instagram: Instagram,
    imdb: IMDb,
    linkedin: LinkedIn,
    linktree: LinkTree,
    portfolio: Portfolio,
    soundcloud: SoundCloud,
    youtube: YouTube,
};
