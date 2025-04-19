import { motion } from 'motion/react';

interface Props {
    name: string;
    photoSrc: string;
    isActive: boolean;
}

const variants = {
    closed: {
        scale: 1,
    },
    opened: {
        scale: 1.2,
    },
};

export function MemberPicture({ name, photoSrc, isActive }: Props) {
    return (
        <motion.div
            variants={variants}
            initial='closed'
            animate={isActive ? 'opened' : 'closed'}
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
                className='sw-reflected-gradient absolute -mt-8 h-[6.5rem] w-[6.5rem] rounded-full'
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
