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
                'relative grid h-full w-full grid-cols-1 justify-between gap-2 overflow-visible rounded-2xl px-4 pb-4 pt-24',
                'bg-radial-[at_15%_15%]',
                'text-on-surface from-surface-container-low/60 to-surface-container/60 backdrop-blur-md',
                'transition-shadow duration-300',
                isActive ? 'shadow-primary/15 shadow-md' : 'hover:shadow-primary/10 shadow-xl',
            )}
        >
            <MemberPicture name={name} photoSrc={photoSrc} isActive={isActive} />
            <MemberInfo name={name} roles={roles} skills={skills} isActive={isActive} />
            <MemberSocials links={links} isActive={isActive} toggleOpen={toggleOpen} />
        </motion.div>
    );
}

// from-secondary-300 to-secondary-600 text-secondary-500 relative grid grid-cols-1 gap-2 overflow-visible rounded-2xl bg-gradient-to-b px-4 pb-4 pt-24 transition-shadow duration-300
