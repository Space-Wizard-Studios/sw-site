import { type JSX } from 'react';

import {
    ArtStation,
    GitHub,
    Instagram,
    IMDb,
    LinkedIn,
    LinkTree,
    Portfolio,
    SoundCloud,
    YouTube,
} from '@icons/ProductCardIcons';

import type { IconProps } from '@icons/ProductCardIcons';

export type SocialLinkItem = {
    name: string;
    url: string;
};
export type Socials = SocialLinkItem[];

type Social = {
    name: string;
    icon: (props: IconProps) => JSX.Element;
};

// Keep the socials object for icon lookup
export const socials: Record<string, Social> = {
    artstation: {
        name: 'Artstation',
        icon: (props: IconProps): JSX.Element => {
            return <ArtStation {...props} />;
        },
    },
    github: {
        name: 'GitHub',
        icon: (props: IconProps): JSX.Element => {
            return <GitHub {...props} />;
        },
    },
    instagram: {
        name: 'Instagram',
        icon: (props: IconProps): JSX.Element => {
            return <Instagram {...props} />;
        },
    },
    imdb: {
        name: 'IMDb',
        icon: (props: IconProps): JSX.Element => {
            return <IMDb {...props} />;
        },
    },
    linkedin: {
        name: 'LinkedIn',
        icon: (props: IconProps): JSX.Element => {
            return <LinkedIn {...props} />;
        },
    },
    linktree: {
        name: 'LinkTree',
        icon: (props: IconProps): JSX.Element => {
            return <LinkTree {...props} />;
        },
    },
    portfolio: {
        name: 'Portfólio',
        icon: (props: IconProps): JSX.Element => {
            return <Portfolio {...props} />;
        },
    },
    soundcloud: {
        name: 'SoundCloud',
        icon: (props: IconProps): JSX.Element => {
            return <SoundCloud {...props} />;
        },
    },
    youtube: {
        name: 'YouTube',
        icon: (props: IconProps): JSX.Element => {
            return <YouTube {...props} />;
        },
    },
};