import { motion, LayoutGroup, AnimatePresence } from 'motion/react';
import { socials, type Socials } from '@common/SocialLinks';
import { Toggle } from './Toggle';

interface Props {
    links: Socials;
    isActive: boolean;
    toggleOpen: React.MouseEventHandler<HTMLButtonElement>;
}

export function MemberSocials({ links, isActive, toggleOpen }: Props) {
    const validLinks = links.filter((link) => link && link.name && socials[link.name.toLowerCase()]);
    const n_links = validLinks.length;
    const variants = {
        hidden: {
            opacity: 0,
            scale: 0,
            translateX: '-100%',
        },
        show: (index: number) => ({
            opacity: 1,
            scale: 1,
            translateX: '0%',
            transition: {
                delay: 0.15 * (index + 1),
                duration: 0.25,
            },
        }),
        hide: (index: number) => ({
            opacity: 0,
            scale: 0,
            translateX: '-50%',
            transition: {
                delay: 0.075 * (n_links - index),
                duration: 0.12,
            },
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
                            validLinks.map((link, index) => {
                                const socialKey = link.name.toLowerCase();
                                const socialInfo = socials[socialKey];
                                const IconComponent = socialInfo.icon;

                                return (
                                    <motion.a
                                        key={link.name}
                                        href={link.url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        title={socialInfo.name}
                                        variants={variants}
                                        custom={index}
                                        initial='hidden'
                                        animate='show'
                                        exit='hide'
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
