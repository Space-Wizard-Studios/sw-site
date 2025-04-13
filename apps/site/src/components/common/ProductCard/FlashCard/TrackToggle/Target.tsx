import { motion } from 'motion/react';
import { Planet } from '@icons/ProductCardIcons';

interface Props {
    isOpen: boolean;
    targetRef: React.Ref<HTMLDivElement>;
}

export function Target({ isOpen, targetRef }: Props) {
    return (
        <motion.div
            ref={targetRef}
            animate={{ opacity: isOpen ? 0 : 1 }}
            className='bg-sw-secondary-900 dark:bg-sw-primary-900 absolute bottom-0 right-0 m-2 h-12 w-12 rounded-full p-2.5'
        >
            <Planet className='text-sw-primary dark:text-sw-secondary absolute bottom-0 left-0 right-0 top-0 m-auto h-8 w-8' />
        </motion.div>
    );
}
