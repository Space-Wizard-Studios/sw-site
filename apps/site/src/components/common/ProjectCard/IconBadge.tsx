import type React from 'react';
import { Badge } from '@components/ui/badge';
import { cn } from '@lib/utils';

export interface IconBadgeProps {
    label: string;
    icon?: React.ReactNode;
    link?: string;
    showLabel?: boolean;
    variant?: 'default' | 'secondary' | 'outline' | 'destructive';
    className?: string;
    style?: React.CSSProperties;
}

export function IconBadge({
    label,
    icon = '',
    link,
    showLabel = false,
    variant = 'default',
    className,
    style,
}: IconBadgeProps) {
    return (
        <a href={link} className='no-underline' target='_blank' rel='noopener noreferrer'>
            <Badge
                variant={variant}
                className={cn(
                    'border-on-surface/40 bg-surface-container text-on-surface flex items-center gap-1 border-2',
                    className,
                )}
                style={style}
            >
                {icon && <span className='h-4 w-4 rounded-full'>{icon}</span>}
                {showLabel && <span className='ml-1'>{label}</span>}
            </Badge>
        </a>
    );
}
