// filepath: apps/site/src/components/common/SpaceMagic/index.tsx
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
// Removed useState as state is now in MagicStar
// Removed MagicButton, MagicExplosion, MagicSparkles imports
import MagicStar from './MagicStar'; // Import the new component
import './magic.css';

type Props = {
    developedBy: string;
};

export default function SpaceMagic({ developedBy }: Props) {

    return (
        <motion.div
            className='flex flex-wrap items-end gap-x-2 gap-y-1 md:text-right'
        >
            <div className='relative isolate'>
                {developedBy}
                <div className='text-gradient pointer-events-none absolute inset-0 select-none whitespace-nowrap bg-gradient-to-r from-[#f79338] via-[#ff62f2] to-[#f79338]'>
                    {developedBy.split('').map((character, i) => (
                        <motion.span key={i} variants={letterVariants} custom={i}>
                            {character}
                        </motion.span>
                    ))}
                </div>
            </div>

            <div className='inline-flex items-center gap-x-2'>
                <MagicStar />
                <a
                    href='https://spacewiz.dev'
                    target='_blank'
                    aria-label='Visit Space Wizard Studios website'
                    className='hover:text-fira-orange underline transition-colors'
                >
                    Space Wizard Studios
                </a>
            </div>
        </motion.div>
    );
}

const letterVariants: Variants = {
    noMagic: {
        opacity: 0,
    },
    magic: (i: number) => ({
        opacity: 1,
        transition: {
            delay: 0.02 * i,
        },
    }),
};
