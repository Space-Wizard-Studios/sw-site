import { motion } from 'motion/react';

interface Props {
    name: string;
    photoSrc: string;
    isOpen: boolean;
}

const variants = {
    closed: {
        scale: 1,
    },
    opened: {
        scale: 1.2,
    },
};

export function MemberPicture({ name, photoSrc, isOpen }: Props) {
    return (
        <motion.div
            variants={variants}
            initial='closed'
            animate={isOpen ? 'opened' : 'closed'}
            className='absolute flex h-24 w-full content-center items-center justify-center'
        >
            <motion.div
                animate={{
                    rotate: '360deg',
                    transition: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 3.5,
                        ease: 'linear',
                    },
                }}
                className='from-sw-navy-800 via-sw-navy-400 to-sw-navy-800 dark:from-sw-flamingo-800 dark:via-sw-flamingo-400 dark:to-sw-flamingo-800 absolute -mt-8 h-[6.5rem] w-[6.5rem] rounded-full bg-gradient-to-bl'
            >
                <div className='w-full'></div>
            </motion.div>
            <div className='absolute -mt-8'>
                <div className='h-full w-24 overflow-hidden rounded-full'>
                    {photoSrc && <img src={photoSrc} width='100%' height='100%' title={name} alt={name} />}
                </div>
            </div>
        </motion.div>
    );
}
