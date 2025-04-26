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
    href: string;
}

type TabType = 'overview' | 'tech' | 'details';

export function ProjectCard({ project, className, href }: ProjectCardProps) {
    const { data } = project;
    const { title, subtitle, hero } = data;

    const imageUrl = hero?.src ?? '';

    const [isActive, setIsActive] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('overview');

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsActive(!isActive);
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
            animate={{
                scale: isActive ? 1.025 : 1,
                zIndex: isActive ? 10 : 0,
            }}
            className={cn(
                'group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl',
                'bg-radial-[at_15%_15%]',
                isActive
                    ? 'from-surface-container-high to-surface-container-highest'
                    : 'from-surface-container-low/40 to-surface-container/40',
                'text-on-surface border-surface/40 border-1 backdrop-blur-xl',
                'transition-shadow duration-300',
                isActive ? 'shadow-primary/15 shadow-md' : 'hover:shadow-primary/10 shadow-xl',
                className,
            )}
            layout
        >
            <div className='flex h-full min-h-96 w-full flex-col'>
                <div className='min-h-3/4 relative h-full w-full'>
                    <a href={href} rel='noopener noreferrer' className='h-full w-full'>
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={hero?.alt ?? title ?? 'Project image'}
                                className='h-full w-full object-cover transition-all duration-500 ease-out'
                                style={{
                                    transform: isActive ? 'scale(1.2)' : 'scale(1)',
                                    opacity: isActive ? 0.5 : 1,
                                }}
                                loading='lazy'
                            />
                        ) : (
                            <div className='bg-surface-container-lowest flex h-full w-full items-center justify-center'>
                                <span className='text-on-surface/50'>Sem Imagem</span>
                            </div>
                        )}
                    </a>

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
                <ProjectCardContent href={href} title={title} subtitle={subtitle} isActive={isActive} handleToggle={handleToggle} />
            </div>
        </motion.div>
    );
}
