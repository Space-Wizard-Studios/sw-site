import { useState } from 'react';
import { motion } from 'motion/react';

import type { Socials } from '@common/SocialLinks';
import { MemberPicture } from './MemberPicture';
import { MemberSocials } from './MemberSocials';
import { MemberInfo } from './MemberInfo';
import { cn } from '@helpers/cn';

export interface Props {
    photoSrc: string;
    name: string;
    roles: string[];
    skills: { name: string; tooltip: string }[];
    links: Socials;
}

const variants = {
    closed: {
        y: 0,
    },
    opened: {
        y: -8,
    },
};

export default function TeamCard({ photoSrc, name, roles, skills, links }: Props) {
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
                'text-on-surface backdrop-blur-md',
                'transition-shadow duration-300',
                isActive ? 'shadow-primary/15 shadow-md' : 'hover:shadow-primary/10 shadow-xl',
            )}
        >
            <div className='relative -mt-12 flex h-full w-full flex-col gap-4'>
                <MemberPicture name={name} photoSrc={photoSrc} isActive={isActive} />
                <MemberInfo name={name} roles={roles} skills={skills} isActive={isActive} />
                <MemberSocials links={links} isActive={isActive} toggleOpen={toggleOpen} />
            </div>
        </motion.div>
    );
}
