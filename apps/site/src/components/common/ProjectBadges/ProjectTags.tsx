import { IconBadge } from './IconBadge';

import type { ResolvedTag } from '@lib/resolveProjectCategories';

interface Props {
    tags: ResolvedTag[];
}

export function ProjectTags({ tags }: Props) {
    return (
        <>
            {tags.map((tag) => (
                <IconBadge
                    key={tag.id}
                    icon={''}
                    label={tag.title || tag.id}
                    showLabel={true}
                    variant='default'
                    className='transition-colors duration-200'
                />
            ))}
        </>
    );
}