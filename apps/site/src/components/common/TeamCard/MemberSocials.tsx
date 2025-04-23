import { motion, LayoutGroup, AnimatePresence } from 'motion/react';

import { Socials, type SocialLinkItem } from '@common/SocialLinks';
import type { ProcessedTeamMember } from '@lib/collections/teamHelpers';
import { Toggle } from './Toggle';

interface Props {
    teamMember: ProcessedTeamMember;
    isActive: boolean;
    toggleOpen: React.MouseEventHandler<HTMLButtonElement>;
}

export function MemberSocials({ teamMember, isActive, toggleOpen }: Props) {
    const { socials } = teamMember.data;
    const n_socials = (socials || []).length;
    const variants = {
        hidden: { opacity: 0, scale: 0, translateX: '-100%' },
        show: (index: number) => ({
            opacity: 1,
            scale: 1,
            translateX: '0%',
            transition: { delay: 0.15 * (index + 1), duration: 0.25 },
        }),
        hide: (index: number) => ({
            opacity: 0,
            scale: 0,
            translateX: '-50%',
            transition: { delay: 0.075 * (n_socials - index), duration: 0.12 },
        }),
    };

    return (
        <LayoutGroup>
            <div className='mb-auto flex w-full justify-center'>
                <motion.div
                    layout
                    style={{ borderRadius: '99999px' }}
                    className='bg-surface-container-lowest flex flex-wrap items-center justify-center gap-2 rounded-full p-2'
                >
                    <Toggle isActive={isActive} onClick={toggleOpen} />
                    <AnimatePresence>
                        {isActive &&
                            (socials || []).map((social, index) => {
                                const socialKey = social.type.toLowerCase();
                                const IconComponent = Socials[socialKey];

                                if (!IconComponent) {
                                    console.warn(`[MemberSocials] Icon not found for social type: ${social.type}`);
                                    return null;
                                }

                                return (
                                    <motion.a
                                        key={social.type}
                                        href={social.url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        title={social.title}
                                        variants={variants}
                                        custom={index}
                                        initial='hidden'
                                        animate='show'
                                        exit='hide'
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 1.1 }}
                                        className='bg-surface-container-low text-inverse-on-surface z-0 flex h-10 w-10 flex-row items-center justify-center rounded-full border-none p-2'
                                    >
                                        <IconComponent className='m-auto h-6 w-6' />
                                    </motion.a>
                                );
                            })}
                    </AnimatePresence>
                </motion.div>
            </div>
        </LayoutGroup>
    );
}
