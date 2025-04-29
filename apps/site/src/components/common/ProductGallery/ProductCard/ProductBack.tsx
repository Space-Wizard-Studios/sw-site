import { cn } from '@lib/utils';
import { motion } from 'motion/react';

interface Props {
    isActive: boolean;
    description?: string;
}

export function ProductBack({ isActive, description }: Props) {
    const closedClipPath = 'circle(0% at 50% 90%)';
    const openedClipPath = 'circle(150% at 50% 90%)';

    // Ensure description is a string, even if undefined
    const htmlContent = description || '';

    return (
        <div className={cn('h-full w-full text-sm', 'text-on-surface')}>
            <motion.div
                initial={{ clipPath: closedClipPath }}
                animate={{
                    clipPath: isActive ? openedClipPath : closedClipPath,
                }}
                transition={{ delay: isActive ? 0.7 : 0, duration: 0.4, ease: 'easeInOut' }}
                className='bg-linear-30 from-surface-container-high to-surface-container-highest h-full w-full p-4 pb-14'
            >
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            ></motion.div>
        </div>
    );
}
