import { motion } from 'motion/react';

import type { ProcessedTeamMember } from '@lib/collections/teamHelpers';

interface Props {
    teamMember: ProcessedTeamMember;
    isActive: boolean;
}

const variants = {
    closed: { scale: 1 },
    opened: { scale: 1.2 },
};

export function MemberPicture({ teamMember, isActive }: Props) {
    const { name, image } = teamMember.data;
    const photoSrc = image?.src || '/images/placeholder.png';

    return (
        <motion.div
            variants={variants}
            initial='closed'
            animate={isActive ? 'opened' : 'closed'}
            className='relative flex h-auto w-full flex-row items-center justify-center'
        >
            <motion.div
                animate={{
                    rotate: '360deg',
                    transition: { repeat: Infinity, repeatType: 'loop', duration: 3.5, ease: 'linear' },
                }}
                className='sw-reflected-gradient h-26 w-26 rounded-full'
            >
                <div className='w-full'></div>
            </motion.div>
            <div className='absolute'>
                <div className='h-full w-24 overflow-hidden rounded-full'>
                    {photoSrc && <img src={photoSrc} width='100%' height='100%' title={name} alt={name} />}
                </div>
            </div>
        </motion.div>
    );
}
