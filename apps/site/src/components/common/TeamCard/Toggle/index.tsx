import { motion } from 'motion/react';
import { Minus, Plus } from '@icons/ProductCardIcons';

interface Props {
    isOpen: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function Toggle({ isOpen, onClick }: Props) {
    return (
        <motion.button
            layout
            onClick={(e) => onClick(e)}
            className='bg-sw-navy dark:bg-sw-flamingo text-sw-secondary dark:text-sw-primary z-10 h-10 w-10 rounded-full border-none p-3'
            aria-label='Redes sociais'
        >
            {isOpen ? <Minus className='m-auto h-4 w-4' /> : <Plus className='m-auto h-4 w-4' />}
        </motion.button>
    );
}
