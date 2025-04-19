import { motion } from 'motion/react';
import { Minus, Plus } from '@icons/ProductCardIcons';

interface Props {
    isActive: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function Toggle({ isActive, onClick }: Props) {
    return (
        <motion.button
            layout
            onClick={(e) => onClick(e)}
            className='bg-primary text-sw-secondary z-10 h-10 w-10 rounded-full border-none p-3'
            aria-label='Redes sociais'
        >
            {isActive ? <Minus className='m-auto h-4 w-4' /> : <Plus className='m-auto h-4 w-4' />}
        </motion.button>
    );
}
