import type React from 'react';
import { cn } from '@lib/utils';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface ProjectCardContentProps {
    title: string;
    subtitle?: string;
    isActive: boolean;
    handleToggle: (e: React.MouseEvent) => void;
    href?: string;
}

export function ProjectCardContent({ title, subtitle, isActive, handleToggle, href }: ProjectCardContentProps) {
    return (
        <div
            className={cn(
                'relative flex h-full flex-row items-center p-4',
                'bg-radial-[at_15%_15%]',
                isActive
                    ? 'from-surface-container-high to-surface-container-highest'
                    : 'from-surface-container-low/60 to-surface-container/60',
                'bg-surface text-on-surface',
            )}
        >
            <div className='flex w-full flex-row items-center justify-between gap-2'>
                <div className='flex flex-col gap-2 w-full'>
                    <a href={href} className='w-fit no-underline' onClick={(e) => e.stopPropagation()}>
                        <h4 className='font-bold leading-tight'>{title}</h4>
                    </a>
                    {subtitle && <p className='text-on-surface/80 text-sm'>{subtitle}</p>}
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <button
                        onClick={handleToggle}
                        className={cn(
                            'bg-surface-container text-on-container flex h-10 w-10 cursor-pointer flex-row items-center justify-center rounded-full border-none p-2',
                            isActive ? '' : '',
                        )}
                        aria-label={isActive ? 'Hide details' : 'Show details'}
                    >
                        {isActive ? <ChevronDown className='h-4 w-4' /> : <ChevronUp className='h-4 w-4' />}
                    </button>
                </div>
            </div>
        </div>
    );
}
