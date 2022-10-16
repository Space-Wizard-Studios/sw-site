export interface Socials {
	artstation?: string;
	github?: string;
	instagram?: string;
	imdb?: string;
	linkedin?: string;
	linktree?: string;
	portfolio?: string;
	soundcloud?: string;
	youtube?: string;
}

type Social = {
	name: string;
};

export const socials: Record<string, Social> = {
	artstation: {
		name: 'Artstation',
	},
	github: {
		name: 'GitHub',
	},
	instagram: {
		name: 'Instagram',
	},
	imdb: {
		name: 'IMDb',
	},
	linkedin: {
		name: 'LinkedIn',
	},
	linktree: {
		name: 'LinkTree',
	},
	portfolio: {
		name: 'Portfólio',
	},
	soundcloud: {
		name: 'SoundCloud',
	},
	youtube: {
		name: 'YouTube',
	},
};
