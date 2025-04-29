import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import { Star } from '@icons/Brand';
import { cn } from '@lib/utils';

type Props = {
    magic: boolean;
    setMagic: React.Dispatch<React.SetStateAction<boolean>>;
    setClickCount: React.Dispatch<React.SetStateAction<number>>;
    defaultColorClass?: string;
    magicColorClass?: string;
    className?: string;
};

export default function MagicButton({
    magic,
    setMagic,
    setClickCount,
    defaultColorClass = 'text-gray-500',
    magicColorClass = 'text-red-500',
    className,
}: Props) {
    return (
        <motion.span
            animate='normal'
            whileHover='hover'
            whileFocus='hover'
            whileTap='tap'
            variants={buttonVariants}
            className={cn('inline-block h-6 w-6 shrink-0 grow-0 cursor-pointer', className)}
            onClick={() => {
                setMagic((prev) => !prev);
                setClickCount((prev) => prev + 1);
            }}
            role='button'
            aria-pressed={magic}
            aria-label={magic ? 'Deactivate magic' : 'Activate magic'}
        >
            <motion.div
                initial='noMagic'
                animate={magic ? 'magic' : 'noMagic'}
                variants={starVariants}
                data-magic={magic}
                className={cn('h-full w-full', `${magic ? magicColorClass : defaultColorClass}`)}
            >
                <Star className={cn('h-full w-full', `${magic ? magicColorClass : defaultColorClass}`)} />
            </motion.div>
        </motion.span>
    );
}

const buttonVariants: Variants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.15,
        transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
    tap: {
        scale: 0.85,
    },
};

const starVariants: Variants = {
    noMagic: {
        rotate: 0,
        transition: { type: 'spring', stiffness: 300, damping: 15 },
    },
    magic: {
        rotate: 360,
        transition: {
            rotate: {
                ease: 'linear',
                duration: 2.5,
                repeat: Infinity,
            },
        },
    },
};
