import type { CmsCollection } from 'netlify-cms-core';

const PrivacyCollection: CmsCollection = {
	name: 'policies',
	label: 'Policies',
	label_singular: 'Policy',
	files: [
		{
			name: 'privacy',
			label: 'Privacy Page',
			description: 'Privacy Page',
			file: 'src/collections/policies/privacy.md',
			fields: [
				{
					name: 'body',
					label: 'Body',
					widget: 'markdown',
				},
			],
		},
		{
			name: 'terms',
			label: 'Terms Page',
			description: 'Terms Page',
			file: 'src/collections/policies/terms.md',
			fields: [
				{
					name: 'body',
					label: 'Body',
					widget: 'markdown',
				},
			],
		},
	],
};

export default PrivacyCollection;
