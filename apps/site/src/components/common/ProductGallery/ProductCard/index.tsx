import { motion } from 'motion/react';
import { Planet } from '@icons/UI';
import { ProductFront } from './ProductFront';
import { ProductBack } from './ProductBack';
import { cn } from '@lib/utils';

import type { ProcessedProduct } from '@lib/collections/productHelpers';
import { useRef, type RefObject } from 'react';

interface Props {
    index: number;
    product: ProcessedProduct;
    isActive: boolean;
    setActiveCard: (index: number, target: RefObject<HTMLDivElement>) => void;
}

export function ProductCard({ index, product, isActive, setActiveCard }: Props) {
    const targetRef = useRef<HTMLDivElement>(null);
    const { title, summary = '', description = '' } = product;

    return (
        <motion.div
            className={cn('relative flex', 'min-h-72')}
            animate={{
                scale: isActive ? 1.05 : 1,
                zIndex: isActive ? 10 : 0,
            }}
            transition={{ duration: 0.3 }}
        >
            <div
                className={cn(
                    'flex h-full w-full flex-col justify-between gap-2 overflow-hidden rounded-2xl',
                    'bg-radial-[at_15%_15%]',
                    'text-on-surface border-1 border-surface/60 from-surface-container-low/60 to-surface-container/60 backdrop-blur-md',
                    'transition-shadow duration-300',
                    isActive ? 'shadow-primary/15 shadow-md' : 'hover:shadow-primary/10 shadow-xl',
                )}
            >
                <ProductFront isActive={!isActive} title={title} summary={summary} />
                <ProductBack isActive={isActive} description={description} />

                <div className='absolute bottom-0 left-0 right-0 flex h-14 flex-row justify-center p-2'>
                    <div className='bg-surface-container-lowest flex flex-wrap items-center justify-center gap-2 rounded-full'>
                        <motion.div
                            ref={targetRef}
                            onClick={() => setActiveCard(index, targetRef)}
                            className={cn(
                                'z-0 flex h-10 w-10 cursor-pointer flex-row items-center justify-center rounded-full border-none p-2',
                                isActive
                                    ? 'bg-inverse-surface text-inverse-on-surface'
                                    : 'bg-surface-container-low text-on-container',
                            )}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 1.1 }}
                        >
                            <div className='h-6 w-6'>
                                <Planet />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
