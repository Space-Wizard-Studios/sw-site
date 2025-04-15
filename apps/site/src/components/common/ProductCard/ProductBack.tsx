import { cn } from '@helpers/cn';
import { motion } from 'motion/react';

interface Props {
    isOpen: boolean;
    description?: React.ReactNode;
}

export function ProductBack({ isOpen, description }: Props) {
    const closedClipPath = 'circle(0% at 100% 100%)';
    const openedClipPath = 'circle(150% at 100% 100%)';

    return (
        <div
            className={cn(
                'absolute bottom-0 right-0 h-full w-full text-sm',
                'bg-linear-30',
                'text-on-surface from-surface-container-high to-surface-container-highest',
                'transition-all duration-1000 ease-in-out',
                isOpen ? 'pointer-events-auto' : 'pointer-events-none',
                isOpen ? '' : 'hidden',
            )}
        >
            <motion.div
                initial={{ clipPath: closedClipPath }}
                animate={{
                    clipPath: isOpen ? openedClipPath : closedClipPath,
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className='p-6'
            >
                {description}
            </motion.div>
        </div>
    );
}
