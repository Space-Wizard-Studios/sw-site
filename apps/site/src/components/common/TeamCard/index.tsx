// filepath: apps/site/src/components/common/TeamCard/index.tsx
import { useState } from 'react';
import { motion } from 'motion/react';

import { MemberPicture } from './MemberPicture';
import { MemberSocials } from './MemberSocials';
import { MemberInfo } from './MemberInfo';
import { cn } from '@lib/utils';

import type { ProcessedTeamMember } from '@lib/collections/teamHelpers';

export interface Props {
    teamMember: ProcessedTeamMember;
}

const variants = {
    closed: { y: 0 },
    opened: { y: -8 },
};

export default function TeamCard({ teamMember }: Props) {
    const [isActive, setOpen] = useState(false);

    function toggleOpen() {
        setOpen(!isActive);
    }

    return (
        <motion.div
            variants={variants}
            initial='closed'
            animate={isActive ? 'opened' : 'closed'}
            className={cn(
                'flex h-full w-full flex-col overflow-visible rounded-2xl p-4',
                'bg-radial-[at_15%_15%]',
                isActive
                    ? 'from-surface-container-high to-surface-container-highest'
                    : 'from-surface-container-low/60 to-surface-container/60',
                'text-on-surface border-surface/60 border-1 backdrop-blur-md',
                'transition-shadow duration-300',
                isActive ? 'shadow-primary/15 shadow-md' : 'hover:shadow-primary/10 shadow-xl',
            )}
        >
            <div className='flex h-full w-full flex-col gap-4'>
                <div className='relative -mt-12 flex h-full w-full flex-col gap-4'>
                    <MemberPicture teamMember={teamMember} isActive={isActive} />
                    <MemberInfo teamMember={teamMember} isActive={isActive} />
                </div>
                <MemberSocials teamMember={teamMember} isActive={isActive} toggleOpen={toggleOpen} />
            </div>
        </motion.div>
    );
}
