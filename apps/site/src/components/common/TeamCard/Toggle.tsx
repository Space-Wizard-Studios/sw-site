import { motion } from 'motion/react';
import { Minus, Plus } from '@icons/UI';

interface Props {
    isActive: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function Toggle({ isActive, onClick }: Props) {
    return (
        <motion.button
            layout
            onClick={(e) => onClick(e)}
            className='bg-surface-container-low text-on-container z-10 h-10 w-10 cursor-pointer rounded-full border-none p-2'
            aria-label='Redes sociais'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
        >
            {isActive ? <Minus className='m-auto h-6 w-6' /> : <Plus className='m-auto h-6 w-6' />}
        </motion.button>
    );
}
