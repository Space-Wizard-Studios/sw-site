import type React from 'react';
import { motion } from 'motion/react';

import { cn, getContrastColor, darkenColor } from '@lib/utils';

import { FileText, Layers, Tag } from 'lucide-react';

import { ProjectProducts } from '@common/ProjectBadges/ProjectProducts';
import { ProjectPlatforms } from '@common/ProjectBadges/ProjectPlatforms';
import { ProjectFrameworks } from '@common/ProjectBadges/ProjectFrameworks';
import { ProjectTags } from '@common/ProjectBadges/ProjectTags';

import type { ProcessedProject } from '@lib/collections/projectHelpers';
import type { ResolvedProduct, ResolvedPlatform, ResolvedFramework, ResolvedTag } from '@lib/resolveProjectCategories';

type TabType = 'overview' | 'tech' | 'details';

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

    const projectDate = new Date(projectData.date);
    const formattedDate = projectDate.toLocaleDateString('pt-BR', {
        year: '2-digit',
        month: '2-digit',
    });

    const hasProducts = products.length > 0;
    const hasTech = platforms.length > 0 || frameworks.length > 0;
    const hasTags = tags.length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className='bg-surface-container-low/60 text-on-surface absolute inset-0 flex h-full w-full flex-col p-2 backdrop-blur-lg'
        >
            <div className='border-on-surface/20 flex border-b'>
                {(summary || hasProducts) && (
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

                {hasTech && (
                    <button
                        onClick={handleTabChange('tech')}
                        className={cn(
                            'hover:bg-surface-container-lowest/50 flex cursor-pointer items-center rounded-t-xl border-b-2 px-3 py-2 transition-colors',
                            activeTab === 'tech' ? 'border-on-surface' : 'border-transparent',
                        )}
                    >
                        <Layers className='mr-1 h-3 w-3' />
                        Tech
                    </button>
                )}

                {hasTags && (
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
                    <div className='flex flex-col gap-4 p-2'>
                        {summary && (
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-row items-center justify-between gap-2'>
                                    <div className='text-on-surface/50 flex items-center gap-2'>
                                        <span>{formattedDate}</span>
                                    </div>
                                </div>
                                <p>{summary}</p>
                            </div>
                        )}
                        {hasProducts && (
                            <div className='flex flex-row gap-4'>
                                <div className='flex flex-wrap gap-2'>
                                    <ProjectProducts products={products} />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'tech' && hasTech && (
                    <div className='flex flex-col gap-4 p-2'>
                        {platforms.length > 0 && (
                            <div className='flex flex-col gap-2'>
                                <h5>Plataformas</h5>
                                <div className='flex flex-wrap gap-2'>
                                    <ProjectPlatforms platforms={platforms} />
                                </div>
                            </div>
                        )}

                        {frameworks.length > 0 && (
                            <div className='flex flex-col gap-2'>
                                <h5>Frameworks</h5>
                                <div className='flex flex-wrap gap-2'>
                                    <ProjectFrameworks frameworks={frameworks} />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'details' && hasTags && (
                    <div className='flex flex-col gap-4 p-2'>
                        <div className='flex flex-col gap-2'>
                            <h5>Tags</h5>
                            <div className='flex flex-wrap gap-2'>
                                <ProjectTags tags={tags} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
