// filepath: apps/site/src/components/common/TeamCard/index.tsx
import { useState, type PointerEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';

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
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const neonBorder = useMotionTemplate`
        radial-gradient(
            100px circle at ${mouseX}px ${mouseY}px,
            rgba(255, 80, 200, 1),
            rgba(168, 85, 247, 0.9) 40%,
            rgba(34, 211, 238, 0.4) 60%,
            transparent 30%
        )
    `;

    const neonGlow = useMotionTemplate`
        radial-gradient(
            260px circle at ${mouseX}px ${mouseY}px,
            rgba(255, 80, 200, 0.55),
            rgba(168, 85, 247, 0.35),
            transparent 15%
        )
    `;

    const updatePointerPosition = ({ currentTarget, clientX, clientY }: PointerEvent<HTMLDivElement>) => {
        const rect = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - rect.left);
        mouseY.set(clientY - rect.top);
    };

    function toggleOpen() {
        setOpen(!isActive);
    }

    return (
        <div className='group relative'>
            <motion.div
                aria-hidden='true'
                className='pointer-events-none absolute -inset-0.5 rounded-[calc(1rem+2px)] opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-50'
                style={{ background: neonGlow }}
            />

            <motion.div
                variants={variants}
                initial='closed'
                animate={isActive ? 'opened' : 'closed'}
                onPointerEnter={updatePointerPosition}
                onPointerMove={updatePointerPosition}
                className={cn(
                    'relative flex h-full w-full flex-col overflow-visible rounded-2xl p-4',
                    'bg-radial-[at_15%_15%]',
                    isActive
                        ? 'from-surface-container-high to-surface-container-highest'
                        : 'from-surface-container-low/60 to-surface-container/60',
                    'text-on-surface border-surface/60 border backdrop-blur-md',
                    'transition-shadow duration-300',
                    isActive ? 'shadow-primary/15 shadow-md' : 'hover:shadow-primary/10 shadow-xl',
                )}
            >
                <motion.div
                    aria-hidden='true'
                    className='pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-30'
                    style={{
                        background: neonBorder,
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        padding: '2px',
                    }}
                />

                <div className='flex h-full w-full flex-col gap-4'>
                    <div className='relative -mt-12 flex h-full w-full flex-col gap-4'>
                        <div className='relative z-20'>
                            <MemberPicture teamMember={teamMember} isActive={isActive} />
                        </div>
                        <MemberInfo teamMember={teamMember} />
                    </div>
                    <MemberSocials teamMember={teamMember} isActive={isActive} toggleOpen={toggleOpen} />
                </div>
            </motion.div>
        </div>
    );
}
