import defaultConfig from './defaultConfig';

import type { metaSEO } from '@schemas/common/seoSchema';

export const defaultSEO: metaSEO = {
    title: defaultConfig.defaultTitle,
    titleTemplate: '%s | ' + defaultConfig.defaultTitle,
    titleDefault: defaultConfig.name,
    description: defaultConfig.defaultDescription,
    canonical: defaultConfig.origin,
    robots: {
        noindex: false,
        nofollow: false,
    },
    og: {
        title: defaultConfig.defaultTitle,
        description: defaultConfig.defaultDescription,
        type: 'website',
        image: '/images/spacewiz_website.png',
    },
} as const;

export default defaultSEO;