import CMS from 'netlify-cms-app';
import { useEffect } from 'react';

import config from './config';

export function CMSPage() {
	useEffect(() => {
		CMS.init({
			config: { ...config, load_config_file: false },
		});
		// CMS.registerPreviewTemplate('my-template', MyTemplate)
	}, []);

	return <></>;
}
