import type React from 'react';
import { cn } from '@lib/utils';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface ProjectCardContentProps {
    title: string;
    subtitle?: string;
    isExpanded: boolean;
    handleToggle: (e: React.MouseEvent) => void;
}

export function ProjectCardContent({ title, subtitle, isExpanded, handleToggle }: ProjectCardContentProps) {
    return (
        <div className='bg-surface text-on-surface relative flex h-full flex-row items-center p-4'>
            <div className='flex w-full flex-row items-center justify-between gap-2'>
                <div className='flex flex-col'>
                    <h4 className='font-bold leading-tight'>{title}</h4>
                    {subtitle && <p className='text-on-surface/80 text-sm'>{subtitle}</p>}
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <button
                        onClick={handleToggle}
                        className={cn(
                            'bg-surface-container text-on-container flex h-10 w-10 cursor-pointer flex-row items-center justify-center rounded-full border-none p-2',
                            isExpanded ? '' : '',
                        )}
                        aria-label={isExpanded ? 'Hide details' : 'Show details'}
                    >
                        {isExpanded ? <ChevronDown className='h-4 w-4' /> : <ChevronUp className='h-4 w-4' />}
                    </button>
                </div>
            </div>
        </div>
    );
}
