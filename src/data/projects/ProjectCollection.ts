import type { CmsCollection } from 'netlify-cms-core';

export const ProjectCollection: CmsCollection = {
	name: 'projects',
	label: 'Project Posts',
	label_singular: 'Project Post',
	folder: 'src/data/projects',
	identifier_field: 'title',
	create: true,
	delete: true,
	fields: [
		{ name: 'title', widget: 'string', label: 'Title' },
		{ name: 'subtitle', widget: 'string', label: 'Subtitle' },
		{ name: 'description', widget: 'string', label: 'Description' },
		{
			name: 'category',
			widget: 'select',
			label: 'Category',
			default: 'WebDev',
			options: [
				{ label: 'GameDev', value: 'GameDev' },
				{ label: 'AR', value: 'AR' },
				{ label: 'WebDev', value: 'WebDev' },
			],
		},
		{
			name: 'date',
			widget: 'datetime',
			format: 'YYYY-MM',
			date_format: 'YYYY-MM',
			time_format: false,
			label: 'Date',
		},
		{ name: 'body', widget: 'markdown', label: 'Body' },
	],
};
