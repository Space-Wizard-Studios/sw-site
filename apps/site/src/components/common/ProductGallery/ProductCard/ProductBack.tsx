import { cn } from '@helpers/cn';
import { motion } from 'motion/react';

interface Props {
    isActive: boolean;
    description?: string;
}

export function ProductBack({ isActive, description }: Props) {
    const closedClipPath = 'circle(0% at 100% 100%)';
    const openedClipPath = 'circle(150% at 100% 100%)';

    return (
        <div
            className={cn(
                'absolute bottom-0 right-0 h-full w-full text-sm',
                'bg-linear-30',
                'text-on-surface from-surface-container-high to-surface-container-highest',
                'transition-all duration-1000 ease-in-out',
                isActive ? 'pointer-events-auto' : 'pointer-events-none',
                isActive ? '' : 'hidden',
            )}
        >
            <motion.div
                initial={{ clipPath: closedClipPath }}
                animate={{
                    clipPath: isActive ? openedClipPath : closedClipPath,
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className='p-6'
            >
                {description}
            </motion.div>
        </div>
    );
}
