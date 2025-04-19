import { motion } from 'motion/react';
import { ChevronRight } from '@icons/ProductCardIcons';

interface Props {
    isActive: boolean;
    constraintsRef: React.Ref<HTMLDivElement>;
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            opacity: {
                duration: 1,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'linear',
            },
            staggerChildren: 0.1,
            staggerDirection: -1,
        },
    },
};

const item = {
    hidden: {
        translateX: 0,
        opacity: 0,
    },
    show: {
        opacity: [0, 1, 0],
        translateX: [-100, 100],
        transition: {
            translateX: {
                duration: 2,
                repeat: Infinity,
                ease: 'circInOut',
            },
            opacity: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
            },
        },
    },
};

export function Track({ isActive, constraintsRef }: Props) {
    return (
        <motion.div animate={{ opacity: isActive ? 0 : 1 }} ref={constraintsRef}>
            <div className='bg-sw-secondary-900 dark:bg-sw-primary-900 absolute bottom-3 left-6 right-6 mx-auto my-3 h-4 rounded-full'>
                <div className='relative h-full w-full'>
                    <motion.div
                        className='grid grid-flow-col justify-center'
                        variants={container}
                        initial='hidden'
                        animate='show'
                    >
                        <motion.div variants={item}>
                            <ChevronRight className='text-sw-navy dark:text-sw-flamingo h-4 w-4' />
                        </motion.div>
                        <motion.div variants={item}>
                            <ChevronRight className='text-sw-navy dark:text-sw-flamingo h-4 w-4' />
                        </motion.div>
                        <motion.div variants={item}>
                            <ChevronRight className='text-sw-navy dark:text-sw-flamingo h-4 w-4' />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <div className='bg-sw-secondary-900 dark:bg-sw-primary-900 absolute bottom-0 left-0 m-4 h-8 w-8 rounded-full' />
        </motion.div>
    );
}
