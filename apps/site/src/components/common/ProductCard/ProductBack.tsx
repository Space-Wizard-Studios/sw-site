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
                'absolute left-0 top-0 h-full w-full overflow-hidden rounded-2xl text-sm',
                'bg-radial-[at_15%_15%] shadow-xl',
                'text-on-surface from-surface-container-low to-surface-container',
                'transition-all duration-300 ease-in-out',
                isOpen ? 'z-10' : 'z-0',
                isOpen ? 'opacity-100' : 'opacity-0',
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
