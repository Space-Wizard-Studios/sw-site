import type React from 'react';
import { Badge } from '@components/ui/badge';
import { cn } from '@lib/utils';

export interface IconBadgeProps {
    label: string;
    icon?: React.ReactNode;
    showLabel?: boolean;
    variant?: 'default' | 'secondary' | 'outline' | 'ghost';
    className?: string;
    style?: React.CSSProperties;
}

export function IconBadge({
    label,
    icon = '',
    showLabel = false,
    variant = 'default',
    className,
    style,
}: IconBadgeProps) {
    return (
            <Badge
                variant={variant}
                className={cn(
                    'border-on-surface/40 bg-surface-container text-on-surface flex items-center gap-1 border-1',
                    className,
                )}
                style={style}
            >
                {icon && <span className='h-4 w-4 rounded-full'>{icon}</span>}
                {showLabel && <span className='ml-1'>{label}</span>}
            </Badge>
    );
}
