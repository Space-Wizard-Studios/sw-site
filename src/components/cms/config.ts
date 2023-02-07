import { CmsConfig } from 'netlify-cms-core';

import ProjectCollection from './projectCollection';
import PoliciesCollection from './policiesCollection';

const config: CmsConfig = {
	backend: {
		name: 'github',
		branch: 'main',
		repo: 'Space-Wizard-Studios/sw-site',
	},
	media_folder: 'public/images/uploads',
	public_folder: '/images/uploads',
	collections: [ProjectCollection, PoliciesCollection],
};

export default config;
