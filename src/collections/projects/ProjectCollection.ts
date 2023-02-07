import type { CmsCollection } from 'netlify-cms-core';

const ProjectCollection: CmsCollection = {
	name: 'projects',
	label: 'Projects',
	label_singular: 'Project',
	folder: 'src/collections/projects',
	identifier_field: 'title',
	create: true,
	delete: true,
	fields: [
		{
			name: 'title',
			label: 'Title',
			widget: 'string',
		},
		{
			name: 'subtitle',
			label: 'Subtitle',
			widget: 'string',
		},
		{
			name: 'description',
			label: 'Description',
			widget: 'text',
		},
		{
			name: 'category',
			label: 'Category',
			widget: 'select',
			default: 'WebDev',
			options: [
				{ label: 'AR', value: 'AR' },
				{ label: 'GameDev', value: 'GameDev' },
				{ label: 'WebDev', value: 'WebDev' },
			],
		},
		{
			name: 'tags',
			label: 'Tags',
			widget: 'list',
		},
		{
			name: 'date',
			label: 'Date',
			widget: 'datetime',
			format: 'YYYY-MM',
			date_format: 'YYYY-MM',
			time_format: false,
		},
		{
			name: 'hero',
			label: 'Hero',
			widget: 'object',
			summary: '{{fields.image}} - {{fields.alt}}: {{fields.title}}',
			fields: [
				{
					label: 'Image',
					name: 'image',
					widget: 'image',
				},
				{
					label: 'Title',
					name: 'title',
					widget: 'string',
				},
				{
					label: 'Alt',
					name: 'alt',
					widget: 'string',
				},
			],
		},
		{
			name: 'carousel',
			label: 'Carousel',
			widget: 'list',
			summary: '{{fields.image}}',
			field: {
				label: 'Image',
				name: 'image',
				widget: 'image',
			},
		},
		{
			name: 'partners',
			label: 'Partners',
			widget: 'list',
			summary: '{{fields.image}}',
			field: {
				label: 'Image',
				name: 'image',
				widget: 'image',
			},
		},
		{
			name: 'body',
			label: 'Body',
			widget: 'markdown',
		},
	],
};

export default ProjectCollection;
