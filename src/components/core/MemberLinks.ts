export interface MemberLinks {
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

type Link = {
	name: string;
};

export const memberLinks: Record<string, Link> = {
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
