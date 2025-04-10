import React from 'react'
import { type JSX } from 'react'
import { ArtStation, GitHub, Instagram, IMDb, LinkedIn, LinkTree, Portfolio, SoundCloud, YouTube } from '@icons/card_button'

import type { IconProps } from '@icons/card_button'

export interface Socials {
  artstation?: string
  github?: string
  instagram?: string
  imdb?: string
  linkedin?: string
  linktree?: string
  portfolio?: string
  soundcloud?: string
  youtube?: string
}

type Social = {
  name: string
  icon: (props: IconProps) => JSX.Element
}

export const socials: Record<string, Social> = {
  artstation: {
    name: 'Artstation',
    icon: (props: IconProps): JSX.Element => {
      return <ArtStation {...props} />
    }
  },
  github: {
    name: 'GitHub',
    icon: (props: IconProps): JSX.Element => {
      return <GitHub {...props} />
    }
  },
  instagram: {
    name: 'Instagram',
    icon: (props: IconProps): JSX.Element => {
      return <Instagram {...props} />
    }
  },
  imdb: {
    name: 'IMDb',
    icon: (props: IconProps): JSX.Element => {
      return <IMDb {...props} />
    }
  },
  linkedin: {
    name: 'LinkedIn',
    icon: (props: IconProps): JSX.Element => {
      return <LinkedIn {...props} />
    }
  },
  linktree: {
    name: 'LinkTree',
    icon: (props: IconProps): JSX.Element => {
      return <LinkTree {...props} />
    }
  },
  portfolio: {
    name: 'Portfólio',
    icon: (props: IconProps): JSX.Element => {
      return <Portfolio {...props} />
    }
  },
  soundcloud: {
    name: 'SoundCloud',
    icon: (props: IconProps): JSX.Element => {
      return <SoundCloud {...props} />
    }
  },
  youtube: {
    name: 'YouTube',
    icon: (props: IconProps): JSX.Element => {
      return <YouTube {...props} />
    }
  }
}
