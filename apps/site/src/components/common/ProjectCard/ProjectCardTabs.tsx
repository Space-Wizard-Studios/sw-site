import type React from 'react';
import { motion } from 'motion/react';
import { cn, getContrastColor } from '@lib/utils';

import { FileText, Tag, MapPin, Settings } from 'lucide-react';
import { Badge } from '@components/ui/badge';
import { IconBadge } from './IconBadge';
import { getIconComponent } from '@lib/getIconComponent';

import type { ProcessedProject } from '@lib/collections/projectHelpers';
import type { ResolvedProduct, ResolvedPlatform, ResolvedFramework, ResolvedTag } from '@lib/resolveProjectCategories';

type TabType = 'overview' | 'details';

interface ProjectCardTabsProps {
    projectData: ProcessedProject['data'];
    activeTab: TabType;
    handleTabChange: (tab: TabType) => (e: React.MouseEvent) => void;
}

export function ProjectCardTabs({ projectData, activeTab, handleTabChange }: ProjectCardTabsProps) {
    const { category, summary } = projectData;
    const products: ResolvedProduct[] = category?.products ?? [];
    const platforms: ResolvedPlatform[] = category?.platforms ?? [];
    const frameworks: ResolvedFramework[] = category?.frameworks ?? [];
    const tags: ResolvedTag[] = category?.tags ?? [];

    const hasCategories = products.length > 0 || platforms.length > 0 || frameworks.length > 0 || tags.length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className='bg-surface-container-low/60 text-on-surface absolute inset-0 flex h-full w-full flex-col p-2 backdrop-blur-lg'
        >
            <div className='border-on-surface/20 flex border-b'>
                {(summary || products.length > 0) && (
                    <button
                        onClick={handleTabChange('overview')}
                        className={cn(
                            'hover:bg-surface-container-lowest/50 flex cursor-pointer items-center rounded-t-xl border-b-2 px-3 py-2 transition-colors',
                            activeTab === 'overview' ? 'border-on-surface' : 'border-transparent',
                        )}
                    >
                        <FileText className='mr-1 h-3 w-3' />
                        Sobre
                    </button>
                )}

                {hasCategories && (
                    <button
                        onClick={handleTabChange('details')}
                        className={cn(
                            'hover:bg-surface-container-lowest/50 flex cursor-pointer items-center rounded-t-xl border-b-2 px-3 py-2 transition-colors',
                            activeTab === 'details' ? 'border-on-surface' : 'border-transparent',
                        )}
                    >
                        <Tag className='mr-1 h-3 w-3' />
                        Detalhes
                    </button>
                )}
            </div>

            {/* Tab Content */}
            <div className='flex-grow overflow-y-auto'>
                {activeTab === 'overview' && (
                    <div className='flex flex-col gap-4 p-4'>
                        {summary && (
                            <div>
                                <h5>Summary</h5>
                                <p>{summary}</p>
                            </div>
                        )}
                        {products.length > 0 && (
                            <div className='flex flex-row gap-4'>
                                <div className='flex flex-wrap'>
                                    {products.map((product) => {
                                        const Icon = getIconComponent('product', product.id);
                                        return (
                                            <IconBadge
                                                key={product.id}
                                                icon={Icon ? <Icon className='h-4 w-4' /> : null}
                                                label={product.title || product.id}
                                                showLabel={true}
                                                variant='default'
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'details' && hasCategories && (
                    <div className='flex flex-col gap-4 p-4'>
                        {platforms.length > 0 && (
                            <div className='flex flex-col gap-2'>
                                <h5>Plataformas</h5>
                                <div className='flex flex-wrap gap-2'>
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
                                </div>
                            </div>
                        )}

                        {frameworks.length > 0 && (
                            <div className='flex flex-col gap-2'>
                                <h5>Frameworks</h5>
                                <div className='flex flex-wrap gap-2'>
                                    {frameworks.map((framework) => {
                                        const Icon = getIconComponent('framework', framework.id);
                                        const badgeBgColor = framework.badge?.background;
                                        const badgeBorderColor = framework.badge?.border;

                                        console.log('Badge border', badgeBorderColor);
                                        const badgeStyle = badgeBgColor
                                            ? ({
                                                  '--badge-hover-bg': badgeBgColor,
                                                  '--badge-hover-border': badgeBorderColor ?? badgeBgColor,
                                              } as React.CSSProperties)
                                            : undefined;

                                        // Determine contrast color for hover state
                                        const hoverTextColorClass = badgeBgColor
                                            ? getContrastColor(badgeBgColor) === 'black'
                                                ? 'hover:text-black'
                                                : 'hover:text-white'
                                            : 'hover:text-black'; // Default hover text if no bg color

                                        return (
                                            <IconBadge
                                                key={framework.id}
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
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {tags.length > 0 && (
                            <div className='flex flex-col gap-2'>
                                <h5>Tags</h5>
                                <div className='flex flex-wrap gap-2'>
                                    {tags.map((tag) => (
                                        <IconBadge
                                            key={tag.id}
                                            icon={''}
                                            label={tag.title || tag.id}
                                            showLabel={true}
                                            variant='default'
                                        ></IconBadge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
