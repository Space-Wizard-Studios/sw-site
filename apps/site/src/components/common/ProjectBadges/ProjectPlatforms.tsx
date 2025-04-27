import { IconBadge } from './IconBadge';
import { getIconComponent } from '@lib/getIconComponent';

import type { ResolvedPlatform } from '@lib/resolveProjectCategories';

interface Props {
    platforms: ResolvedPlatform[];
}

export function ProjectPlatforms({ platforms }: Props) {
    return (
        <>
            {platforms.map((platform) => {
                const Icon = getIconComponent('platform', platform.id);
                return (
                    <IconBadge
                        key={platform.id}
                        icon={Icon ? <Icon className='h-4 w-4' /> : null}
                        label={platform.title || platform.id}
                        showLabel={true}
                        variant='default'
                    />
                );
            })}
        </>
    );
}