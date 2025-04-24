import type React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@lib/utils';

import { ProjectCardTabs } from './ProjectCardTabs';
import { ProjectCardContent } from './ProjectCardContent';

import type { ProcessedProject } from '@lib/collections/projectHelpers';

interface ProjectCardProps {
    project: ProcessedProject;
    className?: string;
}

type TabType = 'overview' | 'details';

export function ProjectCard({ project, className }: ProjectCardProps) {
    const { data } = project;
    const { title, subtitle, hero } = data;

    const imageUrl = hero?.src ?? '';

    const [isActive, setIsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('overview');

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isActive);
        if (!isActive) {
            setActiveTab('overview');
        }
    };

    const handleTabChange = (tab: TabType) => (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveTab(tab);
    };

    return (
        <motion.div
            className={cn(
                'group relative flex h-full min-h-96 w-full flex-col justify-between overflow-hidden rounded-2xl',
                'bg-radial-[at_15%_15%]',
                isActive
                    ? 'from-surface-container-high to-surface-container-highest'
                    : 'from-surface-container-low/60 to-surface-container/60',
                'text-on-surface border-surface/60 border-2 backdrop-blur-md',
                'transition-shadow duration-300',
                isActive ? 'shadow-primary/15 shadow-md' : 'hover:shadow-primary/10 shadow-xl',
                className,
            )}
            layout
        >
            <div className='flex h-full w-full flex-col'>
                <div className='min-h-3/4 relative h-full w-full'>
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={hero?.alt ?? title ?? 'Project image'}
                            className='h-full w-full object-cover transition-all duration-500 ease-out'
                            style={{
                                transform: isActive ? 'scale(1.2)' : 'scale(1)',
                                opacity: isActive ? .5 : 1,
                            }}
                            loading='lazy'
                        />
                    ) : (
                        <div className='bg-surface-container-lowest flex h-full w-full items-center justify-center'>
                            <span className='text-on-surface/50'>Sem Imagem</span>
                        </div>
                    )}

                    <AnimatePresence>
                        {isActive && (
                            <ProjectCardTabs
                                projectData={data}
                                activeTab={activeTab}
                                handleTabChange={handleTabChange}
                            />
                        )}
                    </AnimatePresence>
                </div>

                <ProjectCardContent
                    title={title}
                    subtitle={subtitle}
                    isExpanded={isActive}
                    handleToggle={handleToggle}
                />
            </div>
        </motion.div>
    );
}
