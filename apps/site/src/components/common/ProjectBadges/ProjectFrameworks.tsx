import { IconBadge } from './IconBadge';
import { getIconComponent } from '@lib/getIconComponent';
import { cn, darkenColor, getContrastColor } from '@lib/utils';

import type { ResolvedFramework } from '@lib/resolveProjectCategories';

interface Props {
    frameworks: ResolvedFramework[];
}

export function ProjectFrameworks({ frameworks }: Props) {
    return (
        <>
            {frameworks.map((framework) => {
                const Icon = getIconComponent('framework', framework.id);
                const badgeBgColor = framework.badge?.background;
                const badgeHoverBorderColor = badgeBgColor ? darkenColor(badgeBgColor, 80) : undefined;

                const badgeStyle = badgeBgColor
                    ? ({
                          '--badge-hover-bg': badgeBgColor,
                          '--badge-hover-border': badgeHoverBorderColor ?? badgeBgColor,
                      } as React.CSSProperties)
                    : undefined;

                const hoverTextColorClass = badgeBgColor
                    ? getContrastColor(badgeBgColor) === 'black'
                        ? 'hover:text-black'
                        : 'hover:text-white'
                    : 'hover:text-black';

                return (
                    <a
                        key={framework.id}
                        href={framework.link}
                        className='no-underline'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <IconBadge
                            icon={Icon ? <Icon className='h-4 w-4' /> : null}
                            label={framework.title || framework.id}
                            showLabel={true}
                            variant='default'
                            style={badgeStyle}
                            className={cn(
                                'transition-colors duration-200',
                                badgeBgColor &&
                                    `hover:border-[var(--badge-hover-border)]/40 hover:bg-[var(--badge-hover-bg)] ${hoverTextColorClass}`,
                            )}
                        />
                    </a>
                );
            })}
        </>
    );
}