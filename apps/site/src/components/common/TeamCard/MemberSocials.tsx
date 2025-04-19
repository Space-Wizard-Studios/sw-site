import { motion, LayoutGroup, AnimatePresence } from 'motion/react';
import { socials, type Socials } from '@common/SocialLinks';
import { Toggle } from './Toggle';

interface Props {
    links: Socials;
    isActive: boolean;
    toggleOpen: React.MouseEventHandler<HTMLButtonElement>;
}

export function MemberSocials({ links, isActive, toggleOpen }: Props) {
    const links_dict = Object.entries(links);
    const n_links = links_dict.length;

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
                            links_dict.map(([key, value], index) => {
                                return (
                                    <motion.a
                                        key={key}
                                        target='_blank'
                                        href={value}
                                        variants={variants}
                                        custom={index}
                                        initial='hidden'
                                        animate='show'
                                        exit='hide'
                                        className='bg-surface-container-low text-inverse-on-surface z-0 flex h-12 w-12 flex-row items-center justify-center rounded-full border-none p-2'
                                    >
                                        {socials[key].icon({
                                            className: 'm-auto w-8 h-8',
                                        })}
                                    </motion.a>
                                );
                            })}
                    </AnimatePresence>
                </motion.div>
            </div>
        </LayoutGroup>
    );
}
